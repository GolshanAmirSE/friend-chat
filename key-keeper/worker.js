// Friend Chat — key keeper (a Cloudflare Worker)
//
// Keeps your AI keys secret. The app on your website talks to the AI services
// through this small service, which adds your keys on its side, so visitors
// never see a key and never have to type one.
//
// Add these in Cloudflare → Workers & Pages → (this worker) → Settings →
// Variables and Secrets. Use type "Secret" for keys and the invite code.
//
//   ALLOWED_ORIGINS  Text    Your app's address, without a path. Example: https://yourname.github.io
//   GEMINI_KEY       Secret  Google Gemini key — text chat, voice and answers from the internet
//   OPENAI_KEY       Secret  OpenAI key — natural voices and live, ChatGPT-style calls (optional)
//   AZURE_ENDPOINT   Text    Microsoft Foundry endpoint — live video friends (optional)
//                            Example: https://your-resource.services.ai.azure.com/
//   AZURE_KEY        Secret  Microsoft Foundry key (optional)
//   INVITE_CODE      Secret  A code your friends type once in the app (optional, recommended)
//
// Never put keys into the app files or the GitHub repository.

const VOICE_LIVE_API_VERSION = "2026-04-10";

// Only what the app needs, so the keys can't be used for anything else through this service.
const GEMINI_PATH = /^v1beta\/models\/([A-Za-z0-9._-]+):generateContent$/;
const GEMINI_MODELS = /^(gemini-flash-latest|gemini-flash-lite-latest|gemini-3(\.\d+)?-flash(-lite)?|gemini-2\.5-flash(-lite)?)$/;
const OPENAI_JSON_PATHS = new Set(["v1/chat/completions", "v1/responses", "v1/audio/speech", "v1/realtime/client_secrets"]);
const OPENAI_MODELS =
  /^(gpt-4\.1-mini|gpt-4o-mini-tts|gpt-4o-mini-transcribe|gpt-transcribe|gpt-live-transcribe|gpt-realtime(-2\.1)?(-mini)?)$/;
const AZURE_MODELS = /^(gpt-realtime(-2\.1)?(-mini)?|gpt-4\.1(-mini)?|gpt-4o(-mini)?)$/;

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const origin = request.headers.get("Origin") || "";
    const allowed = String(env.ALLOWED_ORIGINS || "")
      .split(",")
      .map((value) => value.trim().replace(/\/+$/, ""))
      .filter(Boolean);
    const originOk = allowed.includes(origin);
    const cors = {
      "Access-Control-Allow-Origin": originOk ? origin : "null",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, X-Invite-Code",
      "Access-Control-Max-Age": "86400",
      Vary: "Origin",
    };
    const reply = (status, message, extra) =>
      new Response(JSON.stringify(extra ?? { error: { message } }), {
        status,
        headers: { ...cors, "Content-Type": "application/json" },
      });

    if (request.method === "OPTIONS") return new Response(null, { status: originOk ? 204 : 403, headers: cors });
    if (!originOk) return reply(403, "This address isn't allowed to use the key keeper. Add it to ALLOWED_ORIGINS.");

    const code = request.headers.get("X-Invite-Code") || url.searchParams.get("invite") || "";
    const inviteOk = !env.INVITE_CODE || code === env.INVITE_CODE;
    const path = url.pathname.replace(/^\/+/, "");

    if (path === "status") {
      return reply(200, "", {
        gemini: Boolean(env.GEMINI_KEY),
        openai: Boolean(env.OPENAI_KEY),
        azure: Boolean(env.AZURE_KEY && env.AZURE_ENDPOINT),
        invite: Boolean(env.INVITE_CODE),
        inviteOk,
      });
    }
    if (!inviteOk) return reply(401, "Invite code needed.");

    // ---------------------------------------------------------------- Gemini
    if (path.startsWith("gemini/")) {
      const rest = path.slice("gemini/".length);
      const match = rest.match(GEMINI_PATH);
      if (!env.GEMINI_KEY || request.method !== "POST" || !match) return reply(404, "Not available.");
      if (!GEMINI_MODELS.test(match[1])) return reply(404, `The model ${match[1]} isn't available here.`);
      const upstream = await fetch(`https://generativelanguage.googleapis.com/${rest}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-goog-api-key": env.GEMINI_KEY },
        body: await request.text(),
      });
      return relay(upstream, cors);
    }

    // ---------------------------------------------------------------- OpenAI
    if (path.startsWith("openai/")) {
      const rest = path.slice("openai/".length);
      if (!env.OPENAI_KEY || request.method !== "POST") return reply(404, "Not available.");
      const auth = { Authorization: `Bearer ${env.OPENAI_KEY}` };
      if (rest === "v1/audio/transcriptions") {
        const form = await request.formData();
        if (!OPENAI_MODELS.test(String(form.get("model") || ""))) return reply(404, "That model isn't available here.");
        const upstream = await fetch(`https://api.openai.com/${rest}`, { method: "POST", headers: auth, body: form });
        return relay(upstream, cors);
      }
      if (!OPENAI_JSON_PATHS.has(rest)) return reply(404, "Not available.");
      let body;
      try {
        body = await request.json();
      } catch {
        return reply(400, "The request wasn't valid.");
      }
      const model = rest === "v1/realtime/client_secrets" ? body?.session?.model : body?.model;
      if (!OPENAI_MODELS.test(String(model || ""))) return reply(404, `The model ${model} isn't available here.`);
      const upstream = await fetch(`https://api.openai.com/${rest}`, {
        method: "POST",
        headers: { ...auth, "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      return relay(upstream, cors);
    }

    // ------------------------------------------------- Microsoft live video
    if (path === "azure/realtime") {
      if (!env.AZURE_KEY || !env.AZURE_ENDPOINT) return reply(404, "Not available.");
      if (request.headers.get("Upgrade") !== "websocket") return reply(426, "Expected a WebSocket connection.");
      const model = url.searchParams.get("model") || "gpt-realtime";
      if (!AZURE_MODELS.test(model)) return reply(404, `The model ${model} isn't available here.`);
      const target = new URL(env.AZURE_ENDPOINT);
      target.protocol = "https:";
      target.pathname = "/voice-live/realtime";
      target.search = "";
      target.searchParams.set("api-version", VOICE_LIVE_API_VERSION);
      target.searchParams.set("model", model);
      const upstream = await fetch(target.toString(), { headers: { Upgrade: "websocket", "api-key": env.AZURE_KEY } });
      const service = upstream.webSocket;
      if (!service) return reply(502, `Microsoft live video refused the connection (${upstream.status}).`);
      const [client, worker] = Object.values(new WebSocketPair());
      service.accept();
      worker.accept();
      let open = true;
      const closeBoth = () => {
        if (!open) return;
        open = false;
        try {
          worker.close(1000, "Closed");
        } catch {
          // Already closed.
        }
        try {
          service.close(1000, "Closed");
        } catch {
          // Already closed.
        }
      };
      worker.addEventListener("message", (event) => {
        try {
          service.send(event.data);
        } catch {
          closeBoth();
        }
      });
      service.addEventListener("message", (event) => {
        try {
          worker.send(event.data);
        } catch {
          closeBoth();
        }
      });
      worker.addEventListener("close", closeBoth);
      service.addEventListener("close", closeBoth);
      worker.addEventListener("error", closeBoth);
      service.addEventListener("error", closeBoth);
      return new Response(null, { status: 101, webSocket: client });
    }

    return reply(404, "Not found.");
  },
};

function relay(upstream, cors) {
  const headers = new Headers(cors);
  const type = upstream.headers.get("Content-Type");
  if (type) headers.set("Content-Type", type);
  return new Response(upstream.body, { status: upstream.status, headers });
}
