// Friend Chat - backup route to the key keeper (a Netlify Edge Function)
//
// Some internet providers in Spain block Cloudflare addresses during football
// matches, and the key keeper runs on Cloudflare. When the app can't reach it
// directly, it sends its requests here instead and this passes them on to the
// key keeper unchanged, from a network that isn't blocked.
//
// It holds NO keys and no settings: your keys stay in Cloudflare. Nothing to
// fill in. If your key keeper has a different address, change KEY_KEEPER below
// (or add a KEY_KEEPER environment variable in Netlify).

const KEY_KEEPER = "https://friend-chat-keys.golshanamir.workers.dev";

const PREFIX = "/keys";
const PASS_ON = ["origin", "content-type", "accept", "x-invite-code", "x-owner-code", "access-control-request-method", "access-control-request-headers"];
const DROP = new Set([
  "content-encoding",
  "content-length",
  "transfer-encoding",
  "connection",
  "keep-alive",
  "set-cookie",
  "alt-svc",
  "nel",
  "report-to",
  "server",
  "cf-ray",
  "cf-cache-status",
]);

function keyKeeper() {
  let configured = "";
  try {
    configured = globalThis.Netlify?.env?.get?.("KEY_KEEPER") || "";
  } catch {
    // No environment access: use the address above.
  }
  return String(configured || KEY_KEEPER).trim().replace(/\/+$/, "");
}

function problem(request, status, message) {
  return new Response(JSON.stringify({ error: { message } }), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
      "Access-Control-Allow-Origin": request.headers.get("origin") || "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, X-Invite-Code, X-Owner-Code",
      Vary: "Origin",
    },
  });
}

export default async (request) => {
  const url = new URL(request.url);
  let rest = url.pathname.startsWith(PREFIX) ? url.pathname.slice(PREFIX.length) : url.pathname;
  if (!rest.startsWith("/")) rest = `/${rest}`;

  if ((request.headers.get("upgrade") || "").toLowerCase() === "websocket") {
    return problem(request, 501, "Live video isn't available through the backup route.");
  }

  const headers = new Headers();
  for (const name of PASS_ON) {
    const value = request.headers.get(name);
    if (value) headers.set(name, value);
  }
  const hasBody = !["GET", "HEAD", "OPTIONS"].includes(request.method);

  let upstream;
  try {
    upstream = await fetch(keyKeeper() + rest + url.search, {
      method: request.method,
      headers,
      body: hasBody ? await request.arrayBuffer() : undefined,
      redirect: "manual",
    });
  } catch {
    return problem(request, 502, "The backup route couldn't reach the key keeper.");
  }

  // Opened directly in a browser: show that this route works, and what the key keeper reports.
  if (!request.headers.get("origin") && request.method === "GET" && (rest === "/" || rest === "/status")) {
    let keyKeeperReport;
    try {
      keyKeeperReport = await upstream.json();
    } catch {
      keyKeeperReport = { answered: upstream.status };
    }
    return new Response(JSON.stringify({ backupRoute: "running", keyKeeper: keyKeeperReport }, null, 2), {
      headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
    });
  }

  const out = new Headers();
  upstream.headers.forEach((value, name) => {
    if (!DROP.has(name.toLowerCase())) out.set(name, value);
  });
  out.set("Cache-Control", "no-store");
  const noBody = [101, 204, 205, 304].includes(upstream.status);
  return new Response(noBody ? null : upstream.body, { status: upstream.status, headers: out });
};

export const config = { path: ["/keys", "/keys/*"] };
