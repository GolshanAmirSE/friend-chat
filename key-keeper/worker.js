// Friend Chat - key keeper (a Cloudflare Worker)
//
// Keeps your AI keys secret. The app on your website talks to the AI services
// through this small service, which adds your keys on its side, so visitors
// never see a key and never have to type one.
//
// It also holds your OWNER CONTROLS (in the app: Settings -> Owner controls):
// which AI service answers - Microsoft Azure or OpenAI - and at which level
// (Saver, Best or Ultrafast). It picks the newest AI models by itself.
//
// Add these in Cloudflare > Workers & Pages > (this worker) > Settings >
// Variables and Secrets. Use type "Secret" for keys and codes.
//
//   ALLOWED_ORIGINS  Text    Your app's address, without a path. Example: https://yourname.github.io
//   GEMINI_KEY       Secret  Google Gemini key (optional)
//   OPENAI_KEY       Secret  OpenAI key (optional when Azure is used)
//   AZURE_ENDPOINT   Text    Your Microsoft Foundry resource (Sweden Central): live video friends, and all AI when Azure is chosen
//                            Example: https://your-resource.services.ai.azure.com/
//   AZURE_KEY        Secret  Its key
//   INVITE_CODE      Secret  A code your friends type once in the app (optional, recommended)
//   OWNER_CODE       Secret  Your own code for the owner controls in the app
//
// Settings > Bindings > Add > KV namespace, variable name FRIEND_KV: remembers the owner controls.
//
// Optional - automatic model updates on Azure (the key keeper deploys the newest models itself).
// The one-line Azure Cloud Shell command in the README prints these four values:
//   AZURE_TENANT_ID, AZURE_CLIENT_ID, AZURE_CLIENT_SECRET (Secret), AZURE_RESOURCE_ID
//
// Optional starting choices (the owner controls override them):
//   AI_PROVIDER = azure | openai      AI_LEVEL = saver | best | ultrafast
//
// Claude (Anthropic) models: deploy them on the same Microsoft Foundry resource (Azure pay-as-you-go
// needed) and they work with no extra settings. Only if they are on ANOTHER Foundry resource, add:
//   CLAUDE_ENDPOINT  Text    That resource's address, e.g. https://other-resource.services.ai.azure.com/
//   CLAUDE_KEY       Secret  Its key
//
// Never put keys into the app files or the GitHub repository.

const VOICE_LIVE_API_VERSION = "2026-04-10";
const ARM_API_VERSION = "2025-06-01";
const KEEPER_VERSION = "2026-11-06b (owner controls, Azure or OpenAI, background jobs, Claude first with GPT as backup, Azure priority for Ultrafast)";

// Only what the app needs, so the keys can't be used for anything else through this service.
const GEMINI_PATH = /^v1beta\/models\/([A-Za-z0-9._-]+):generateContent$/;
const GEMINI_MODELS = /^(gemini-flash-latest|gemini-flash-lite-latest|gemini-\d+(\.\d+)?-flash(-lite)?)$/;
// Microsoft live video friends (Voice Live).
const AZURE_MODELS = /^(gpt-realtime(-\d+(\.\d+)*)?(-mini)?|gpt-4\.1(-mini)?|gpt-4o(-mini)?)$/;
// Azure's older per-deployment addresses.
const AZURE_DEPLOYMENT_API = "2025-04-01-preview";
// Background jobs: GET (state and answer), DELETE (once collected), POST …/cancel.
const JOB_PATH = /^openai\/v1\/responses\/([A-Za-z0-9_-]{1,200})(\/cancel)?$/;
const AI_PATHS = new Set([
  "v1/chat/completions",
  "v1/responses",
  "v1/audio/speech",
  "v1/audio/transcriptions",
  "v1/realtime/client_secrets",
  "v1/live/sessions",
]);
// Tools the app uses (web search, pictures); nothing else gets through.
const TOOL_TYPES = new Set(["web_search", "web_search_preview", "image_generation"]);

// ------------------------------------------------------------------ Models
// Kinds of models; the number in a name says how new it is (gpt-6.1-sol is newer than gpt-6-sol).
const FAMILIES = {
  chat: /^(?:gpt-)?chat-latest$/, // ChatGPT's newest chat model (always the newest by itself)
  sol: /^gpt-(\d+(?:\.\d+)*)-sol$/, // the strongest everyday reasoning model
  luna: /^gpt-(\d+(?:\.\d+)*)-luna$/, // fast and inexpensive
  live: /^gpt-live-(\d+(?:\.\d+)*)$/, // ChatGPT Voice (GPT-Live)
  realtime: /^gpt-realtime(?:-(\d+(?:\.\d+)*))?$/, // the live voice that also sees the camera
  realtimeMini: /^gpt-realtime(?:-(\d+(?:\.\d+)*))?-mini$/,
  transcribe: /^gpt-transcribe(?:-(\d+(?:\.\d+)*))?$/, // writing out speech
  transcribeMini: /^gpt-4o-mini-transcribe$/,
  speech: /^gpt-4o-mini-tts$|^gpt-(?:(\d+(?:\.\d+)*)-)?tts$/, // text to speech
  audio: /^gpt-audio(?:-(\d+(?:\.\d+)*))?$/, // voice model that can read text aloud
  audioMini: /^gpt-audio(?:-(\d+(?:\.\d+)*))?-mini$/,
  sunburst: /^gpt-image-(\d+(?:\.\d+)*)-sunburst$/, // the most precise picture model
  flare: /^gpt-image-(\d+(?:\.\d+)*)-flare$/, // the fast, cheaper picture model
  // Claude (Anthropic) on Azure: claude-opus-5-5 is newer than claude-opus-5
  opusFast: /^claude-opus-(\d+(?:-\d+)*)-fast$/, // Claude Opus at top speed (higher price)
  opus: /^claude-opus-(\d+(?:-\d+)*)$/, // Claude's most capable model
  sonnet: /^claude-sonnet-(\d+(?:-\d+)*)$/, // strong and quicker: writing, long texts, code
  haiku: /^claude-haiku-(\d+(?:-\d+)*)$/, // quick and inexpensive
};

// The newest models known when this key keeper was written (used until newer ones are found).
const KNOWN = {
  chat: { openai: "chat-latest", azure: "gpt-chat-latest" },
  sol: "gpt-6.1-sol",
  luna: "gpt-6-luna",
  live: "gpt-live-1",
  realtime: "gpt-realtime-2.1",
  realtimeMini: "gpt-realtime-2.1-mini",
  transcribe: "gpt-transcribe",
  transcribeMini: "gpt-4o-mini-transcribe",
  speech: "gpt-4o-mini-tts",
  audio: "gpt-audio-1.5",
  audioMini: "gpt-audio-mini",
  sunburst: "gpt-image-2.5-sunburst",
  flare: "gpt-image-2.5-flare",
  opusFast: "claude-opus-5-5-fast",
  opus: "claude-opus-5-5",
  sonnet: "claude-sonnet-5-5",
  haiku: "claude-haiku-5-5",
};

// What each part of the app uses at each level: kinds of model, in the order to try them.
//   chat        text chat and typed translations
//   deep        questions about files, presentations, meeting notes
//   task        memory notes, key points, the camera, look-ups, reading PDFs
//   helper      the model ChatGPT Voice hands questions to
//   picture     photo edits and new pictures
//   speech      reading aloud (Azure Sweden Central has no text-to-speech model: GPT-Audio reads instead)
//   transcribe  writing out what you say
//   realtime    the Translator's voice, and voice calls when ChatGPT Voice can't be used
//   live        ChatGPT Voice calls
const BEST = {
  chat: ["chat", "luna"],
  deep: ["sol", "luna"],
  task: ["luna"],
  helper: ["luna"],
  picture: ["sunburst", "flare"],
  speech: { openai: ["speech", "audio"], azure: ["audio", "speech", "audioMini"] },
  transcribe: ["transcribe", "transcribeMini"],
  realtime: ["realtime", "realtimeMini"],
  live: ["live"],
};
const PLANS = {
  saver: {
    chat: ["luna", "chat"],
    deep: ["luna", "sol"],
    task: ["luna"],
    helper: ["luna"],
    picture: ["flare", "sunburst"],
    speech: { openai: ["speech", "audioMini"], azure: ["audioMini", "speech", "audio"] },
    transcribe: ["transcribeMini", "transcribe"],
    realtime: ["realtimeMini", "realtime"],
    live: ["live"],
  },
  best: BEST,
  ultrafast: BEST, // plus the fastest mode for "deep" work, where the service offers it
};
const LEVELS = Object.keys(PLANS);
const PROVIDERS = ["azure", "openai"];
const ROLES_SHOWN = ["chat", "deep", "task", "live", "realtime", "transcribe", "speech", "picture"];
// Azure: deploy in the EU data zone where possible (processed in the EU), else globally.
const SKU_ORDER = ["DataZoneStandard", "GlobalStandard"];
const HOUR = 3_600_000;

// Kept while this copy of the key keeper runs (Cloudflare starts new copies now and then).
const memory = {
  owner: null,
  ownerAt: 0,
  azure: null, // { region, deployments: { model: { deployment, version, sku, state } }, syncedAt, errors, catalog }
  azureLoaded: false,
  openaiModels: null, // { ids, at }
  missing: new Map(), // "provider|target" -> when it was refused
  tier: { openai: { supported: true, checkedAt: 0 }, azure: { supported: null, checkedAt: 0 } },
  arm: null,
  syncing: null,
  refreshing: null,
};

function familyOf(name) {
  for (const [family, pattern] of Object.entries(FAMILIES)) if (pattern.test(name)) return family;
  return null;
}

/** How new a model is, from the numbers in its name (gpt-6.1-sol -> [6, 1]). */
function rankOf(name) {
  const family = familyOf(name);
  const match = family ? FAMILIES[family].exec(name) : null;
  const numbers = match ? match.slice(1).filter(Boolean).join(".") : "";
  return numbers ? numbers.split(/[.-]/).map(Number) : [0];
}

/** Newest first. */
function byNewest(a, b) {
  const x = rankOf(a);
  const y = rankOf(b);
  for (let i = 0; i < Math.max(x.length, y.length); i++) {
    const difference = (y[i] ?? 0) - (x[i] ?? 0);
    if (difference) return difference;
  }
  return 0;
}

function knownModel(family, provider) {
  const known = KNOWN[family];
  return typeof known === "string" ? known : known?.[provider] || "";
}

function planFamilies(level, role, provider) {
  const plan = PLANS[level] || BEST;
  const families = plan[role] || [];
  return Array.isArray(families) ? families : families[provider] || [];
}

/** Which part of the app a request is for. */
function roleOf(path, model) {
  if (path === "v1/audio/transcriptions") return "transcribe";
  if (path === "v1/audio/speech") return "speech";
  if (path === "v1/realtime/client_secrets") return "realtime";
  if (path === "v1/live/sessions") return "live";
  const family = familyOf(model);
  if (family === "chat" || family === "sonnet" || family === "haiku") return "chat";
  if (family === "opus" || family === "opusFast") return "deep";
  if (family === "sol" || /^gpt-\d+(\.\d+)*-astra$/.test(model)) return "deep";
  if (family === "luna" || /^gpt-4\.1(-mini|-nano)?$/.test(model) || /^gpt-4o(-mini)?$/.test(model)) return "task";
  return null;
}

/** Newer OpenAI models think before they answer: they take a thinking effort instead of a temperature. */
function thinks(model) {
  return /^(gpt-([5-9]|\d{2})|o\d)/i.test(model) && !/chat-latest|audio|image|realtime|live|transcribe|tts/i.test(model);
}
/** Models that can answer without thinking at all (quickest). */
function canSkipThinking(model) {
  return /-luna$/i.test(model) || /^gpt-5\.[1-9]/i.test(model);
}

// ------------------------------------------------------------ Owner controls
function azureReady(env) {
  return Boolean(env.AZURE_ENDPOINT && env.AZURE_KEY);
}
function armReady(env) {
  return Boolean(env.AZURE_TENANT_ID && env.AZURE_CLIENT_ID && env.AZURE_CLIENT_SECRET && env.AZURE_RESOURCE_ID);
}
function azureName(env) {
  try {
    return new URL(String(env.AZURE_ENDPOINT)).hostname.split(".")[0];
  } catch {
    return "";
  }
}
/** Azure's OpenAI-style address for this resource (https://name.openai.azure.com/openai/v1). */
function azureBase(env) {
  const custom = String(env.AZURE_OPENAI_ENDPOINT || "").trim().replace(/\/+$/, "");
  if (custom) return /\/openai\/v1$/.test(custom) ? custom : `${custom}/openai/v1`;
  return `https://${azureName(env)}.openai.azure.com/openai/v1`;
}

async function kvGet(env, key) {
  try {
    const value = await env.FRIEND_KV?.get(key);
    return value ? JSON.parse(value) : null;
  } catch {
    return null;
  }
}
async function kvPut(env, key, value) {
  try {
    if (!env.FRIEND_KV) return false;
    await env.FRIEND_KV.put(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

function defaultOwner(env) {
  return {
    provider: PROVIDERS.includes(env.AI_PROVIDER) ? env.AI_PROVIDER : azureReady(env) ? "azure" : "openai",
    level: LEVELS.includes(env.AI_LEVEL) ? env.AI_LEVEL : "best",
    autoUpdate: true,
    backup: true,
    claude: true, // Claude models from Azure join the automatic choice (when deployed)
    choose: true, // people may choose a model in Settings (within the level)
    updatedAt: null,
  };
}

function cleanOwner(value, base) {
  const out = { ...base };
  if (value && typeof value === "object") {
    if (PROVIDERS.includes(value.provider)) out.provider = value.provider;
    if (LEVELS.includes(value.level)) out.level = value.level;
    if (typeof value.autoUpdate === "boolean") out.autoUpdate = value.autoUpdate;
    if (typeof value.backup === "boolean") out.backup = value.backup;
    if (typeof value.claude === "boolean") out.claude = value.claude;
    if (typeof value.choose === "boolean") out.choose = value.choose;
    if (typeof value.updatedAt === "string") out.updatedAt = value.updatedAt;
  }
  return out;
}

async function getOwner(env) {
  if (memory.owner && Date.now() - memory.ownerAt < 20_000) return memory.owner;
  memory.owner = cleanOwner(await kvGet(env, "owner"), defaultOwner(env));
  memory.ownerAt = Date.now();
  return memory.owner;
}

/** The service that answers: the owner's choice, if it's set up (else the other one). */
function activeProvider(owner, env) {
  const ready = { azure: azureReady(env), openai: Boolean(env.OPENAI_KEY) };
  if (ready[owner.provider]) return owner.provider;
  return ready.azure ? "azure" : ready.openai ? "openai" : null;
}

// ------------------------------------------------------- Finding new models
function stale(when, maxAge) {
  const time = typeof when === "number" ? when : Date.parse(when || "");
  return !time || Date.now() - time > maxAge;
}

async function loadAzureState(env) {
  if (memory.azureLoaded) return;
  memory.azureLoaded = true;
  const saved = await kvGet(env, "azure-state");
  if (saved && typeof saved === "object" && !memory.azure) memory.azure = saved;
}

/** Looks for newer models now and then (and deploys them on Azure when it may). Never slows a request. */
function refreshCatalogs(env, owner, force = false) {
  if (memory.refreshing && !force) return memory.refreshing;
  const jobs = [];
  if (env.OPENAI_KEY && (force || stale(memory.openaiModels?.at, 6 * HOUR))) jobs.push(refreshOpenAI(env));
  if (azureReady(env)) {
    jobs.push(
      loadAzureState(env).then(() => (armReady(env) && (force || stale(memory.azure?.syncedAt, 6 * HOUR)) ? azureSync(env, owner) : null)),
    );
  }
  const run = Promise.allSettled(jobs).finally(() => {
    if (memory.refreshing === run) memory.refreshing = null;
  });
  memory.refreshing = run;
  return run;
}

async function refreshOpenAI(env) {
  const response = await fetch("https://api.openai.com/v1/models", { headers: { Authorization: `Bearer ${env.OPENAI_KEY}` } });
  if (!response.ok) throw new Error(`OpenAI model list: ${response.status}`);
  const data = await response.json();
  const ids = Array.isArray(data?.data) ? data.data.map((m) => String(m?.id || "")).filter((id) => familyOf(id)) : [];
  memory.openaiModels = { ids, at: Date.now() };
}

/** The models each kind has on this service, newest first (only when automatic updates are on). */
function discovered(provider, owner) {
  if (!owner.autoUpdate) return {};
  let names = [];
  if (provider === "azure") {
    const deployments = memory.azure?.deployments || {};
    names = Object.entries(deployments)
      .filter(([, d]) => !d.state || /succeeded|creating|accepted|updating/i.test(d.state))
      .map(([model]) => model);
  } else {
    names = memory.openaiModels?.ids || [];
  }
  const found = {};
  for (const name of names) {
    const family = familyOf(name);
    if (family) (found[family] ||= []).push(name);
  }
  for (const list of Object.values(found)) list.sort(byNewest);
  return found;
}

function azureDeploymentFor(model) {
  return memory.azure?.deployments?.[model]?.deployment || model;
}

function markMissing(provider, target) {
  memory.missing.set(`${provider}|${target}`, Date.now());
}
function isMissing(provider, target) {
  const when = memory.missing.get(`${provider}|${target}`);
  return Boolean(when && Date.now() - when < 20 * 60_000);
}

/** The models to try for one part of the app, best first: { family, model, target }. */
function candidates(role, provider, owner) {
  const found = discovered(provider, owner);
  const list = [];
  for (const family of planFamilies(owner.level, role, provider)) {
    const names = (found[family]?.length ? found[family] : [knownModel(family, provider)]).filter(Boolean);
    for (const model of names) {
      const target = provider === "azure" ? azureDeploymentFor(model) : model;
      if (!list.some((c) => c.target === target)) list.push({ family, model, target });
    }
  }
  // Ones refused a moment ago go last (they may be back by now).
  return [...list.filter((c) => !isMissing(provider, c.target)), ...list.filter((c) => isMissing(provider, c.target))];
}

/** What answers each part of the app, as the owner sees it (with Claude where it's chosen). */
function shownModels(provider, owner, env) {
  const out = modelsInUse(provider, owner);
  const on = claudeState(env, owner) === "on";
  out.chat = textCandidates("everyday", provider, owner, "auto", on, env, "chat")[0]?.model || out.chat;
  out.writing = textCandidates("long", provider, owner, "auto", on, env, "chat")[0]?.model || "";
  out.deep = textCandidates("deep", provider, owner, "auto", on, env, "deep")[0]?.model || out.deep;
  return out;
}

function modelsInUse(provider, owner) {
  const out = {};
  if (!provider) return out;
  for (const role of ROLES_SHOWN) out[role] = candidates(role, provider, owner)[0]?.model || "";
  return out;
}

function fastModeUsable(provider) {
  const tier = memory.tier[provider];
  return !(tier && tier.supported === false && Date.now() - tier.checkedAt < 6 * HOUR);
}
function markFastMode(provider, supported) {
  memory.tier[provider] = { supported, checkedAt: Date.now() };
}
/** Ultrafast: "on" (in use), "waiting" (chosen, but the service doesn't offer it yet) or "off". */
function ultrafastState(provider, owner, env) {
  if (owner.level !== "ultrafast" || !provider) return "off";
  // Claude Opus Fast on Azure gives Ultrafast answers for files and presentations right away.
  if (env && claudeState(env, owner) === "on" && !isMissing("claude", azureDeploymentFor(knownModel("opusFast", "azure")))) return "on";
  const tier = memory.tier[provider];
  if (provider === "openai") return tier?.supported === false ? "waiting" : "on";
  // Azure: priority processing on a Global Standard GPT deployment.
  if (!fastModeUsable("azure")) return "waiting";
  return priorityTargets(env).length ? "on" : "waiting";
}

// ------------------------------------------------------------- Claude (Anthropic) on Azure
// Claude models run on your Microsoft Foundry resource too (Azure pay-as-you-go needed), through
// Anthropic's own "Messages" address. The key keeper turns the app's requests into that format and
// the answers back, so the app doesn't need to know which company's model answered.
const CLAUDE_FAMILIES = ["opusFast", "opus", "sonnet", "haiku"];
const CLAUDE_API_VERSION = "2023-06-01";
// What people may choose in Settings ("Model for answers"), per level. "auto" = the app decides.
const PICKS = {
  saver: ["auto", "gpt", "haiku"],
  best: ["auto", "gpt", "haiku", "sonnet", "opus"],
  ultrafast: ["auto", "gpt", "haiku", "sonnet", "opus", "opusFast"],
};
// Automatic choice: the kinds of model to try for each kind of task, best first.
//   everyday  short chat messages and short typed translations
//   long      long texts: writing, rewriting, long translations, code
//   deep      files, presentations and meeting notes (the app's "deep" work)
const AUTO = {
  // Claude first at every level when the owner's "Claude first" switch is on; GPT is the backup.
  // When the switch is off, every level works exactly as before (GPT only, see PLANS).
  saver: { everyday: ["haiku", "luna", "chat"], long: ["haiku", "luna", "chat"], deep: ["haiku", "luna", "sol"] },
  best: { everyday: ["sonnet", "chat", "luna"], long: ["sonnet", "chat", "luna"], deep: ["opus", "sol", "luna"] },
  ultrafast: { everyday: ["sonnet", "chat", "luna"], long: ["sonnet", "chat", "luna"], deep: ["opusFast", "opus", "sol", "luna"] },
};
// A model the person chose goes first; the automatic list follows as the backup.
const PICK_FAMILIES = {
  gpt: { everyday: ["chat", "luna"], long: ["chat", "luna"], deep: ["sol", "luna"] },
  haiku: { everyday: ["haiku"], long: ["haiku"], deep: ["haiku"] },
  sonnet: { everyday: ["sonnet"], long: ["sonnet"], deep: ["sonnet"] },
  opus: { everyday: ["opus"], long: ["opus"], deep: ["opus"] },
  opusFast: { everyday: ["opusFast"], long: ["opusFast"], deep: ["opusFast"] },
};
const SAVER_PICK = { gpt: { everyday: ["luna"], long: ["luna"], deep: ["luna"] } };

function isClaudeFamily(family) {
  return CLAUDE_FAMILIES.includes(family);
}
function claudeKey(env) {
  return env.CLAUDE_KEY || env.AZURE_KEY || "";
}
/** Where Claude answers: CLAUDE_ENDPOINT if set, else the same Foundry resource as AZURE_ENDPOINT. */
function claudeUrl(env) {
  const custom = String(env.CLAUDE_ENDPOINT || "").trim().replace(/\/+$/, "");
  if (custom) {
    if (/\/v1\/messages$/.test(custom)) return custom;
    if (/\/anthropic$/.test(custom)) return `${custom}/v1/messages`;
    try {
      return `https://${new URL(custom).hostname.split(".")[0]}.services.ai.azure.com/anthropic/v1/messages`;
    } catch {
      return "";
    }
  }
  const name = azureName(env);
  return name ? `https://${name}.services.ai.azure.com/anthropic/v1/messages` : "";
}
function claudeReady(env) {
  return Boolean(claudeUrl(env) && claudeKey(env));
}
/** "on", "off" (the owner switched it off) or "none" (not set up). */
function claudeState(env, owner) {
  if (!claudeReady(env)) return "none";
  return owner.claude === false ? "off" : "on";
}
function allowedPicks(env, owner) {
  if (claudeState(env, owner) !== "on" || owner.choose === false) return [];
  return PICKS[owner.level] || PICKS.best;
}
function claudeDeployed() {
  return Object.keys(memory.azure?.deployments || {}).filter((name) => isClaudeFamily(familyOf(name)));
}

/** What kind of task a request is (only plain text answers can go to Claude). */
function textTask(path, body, role) {
  if (path !== "v1/responses") return null;
  if (!["chat", "deep", "task"].includes(role)) return null;
  const tools = Array.isArray(body.tools) ? body.tools : [];
  // Web search works with Claude too (Anthropic's own search); pictures stay with GPT.
  if (tools.some((tool) => !["web_search", "web_search_preview"].includes(tool?.type))) return null;
  if (tools.length && memory.claudeSearch === false && Date.now() - memory.claudeSearchAt < 6 * HOUR) return null;
  if (body.tool_choice || body.text?.format?.type === "json_schema" || body.text?.format?.type === "json_object") return null;
  if (body.previous_response_id || body.conversation) return null;
  const items = typeof body.input === "string" ? [{ role: "user", content: body.input }] : Array.isArray(body.input) ? body.input : null;
  if (!items) return null;
  let last = "";
  let total = String(body.instructions || "").length;
  for (const item of items) {
    if (!item || typeof item !== "object") return null;
    if (item.type && item.type !== "message") return null;
    const parts = typeof item.content === "string" ? [{ type: "input_text", text: item.content }] : Array.isArray(item.content) ? item.content : null;
    if (!parts) return null;
    let text = "";
    for (const part of parts) {
      if (["input_text", "output_text", "text"].includes(part?.type)) text += String(part.text || "");
      else if (part?.type === "input_image") {
        if (!claudeImage(part)) return null;
      } else return null; // files, sound: GPT
    }
    total += text.length;
    if (item.role === "user") last = text;
  }
  if (role === "deep") return "deep";
  const code = /```|^\s*(def |class |function |const |import |SELECT |<\w+[^>]*>)/m.test(last);
  return code || last.length >= 700 || total >= 12000 ? "long" : "everyday";
}

function claudeImage(part) {
  const url = typeof part.image_url === "string" ? part.image_url : part.image_url?.url;
  if (typeof url !== "string") return null;
  const data = /^data:(image\/(?:jpeg|jpg|png|gif|webp));base64,(.+)$/i.exec(url);
  if (data) return { type: "image", source: { type: "base64", media_type: data[1].toLowerCase().replace("jpg", "jpeg"), data: data[2] } };
  if (/^https:\/\//i.test(url)) return { type: "image", source: { type: "url", url } };
  return null;
}

/** The kinds of model (GPT and Claude) to try for a text task, best first. */
function textFamilies(level, task, pick, claudeOn) {
  const auto = (AUTO[level] || AUTO.best)[task] || [];
  const chosen = pick && pick !== "auto" ? ((level === "saver" && SAVER_PICK[pick]) || PICK_FAMILIES[pick])?.[task] || [] : [];
  const list = [...new Set([...chosen, ...auto])];
  return claudeOn && pick !== "gpt" ? list : list.filter((f) => !isClaudeFamily(f));
}

function claudeCandidate(family, owner) {
  const found = owner.autoUpdate ? claudeDeployed().filter((n) => familyOf(n) === family).sort(byNewest) : [];
  const names = found.length ? found : [knownModel(family, "azure")];
  return names.filter(Boolean).map((model) => ({ family, model, target: azureDeploymentFor(model), api: "claude" }));
}

/** Everything to try for a text task: { family, model, target, api }. */
function textCandidates(task, provider, owner, pick, claudeOn, env, role) {
  // Claude switched off (or not set up): the levels work exactly as before, GPT only.
  if (!claudeOn) return withPriority(candidates(role || (task === "deep" ? "deep" : "chat"), provider, owner).map((c) => ({ ...c, api: provider })), task === "deep" ? "deep" : role, provider, owner, env);
  const list = [];
  const found = discovered(provider, owner);
  for (const family of textFamilies(owner.level, task, pick, claudeOn)) {
    const options = isClaudeFamily(family)
      ? claudeCandidate(family, owner)
      : (found[family]?.length ? found[family] : [knownModel(family, provider)])
          .filter(Boolean)
          .map((model) => ({ family, model, target: provider === "azure" ? azureDeploymentFor(model) : model, api: provider }));
    for (const c of options) if (!list.some((x) => x.api === c.api && x.target === c.target)) list.push(c);
  }
  const gone = (c) => isMissing(c.api === "claude" ? "claude" : provider, c.target);
  return withPriority([...list.filter((c) => !gone(c)), ...list.filter(gone)], task === "deep" ? "deep" : role, provider, owner, env);
}

// ------------------------------------------------------------- Azure priority processing (Ultrafast)
// Azure has no "Ultrafast" mode like OpenAI's own service. Its fast lane is "priority processing"
// (about twice the price, a set speed), on Global Standard deployments of the models Microsoft lists.
// At the Ultrafast level, deep work (files, presentations, meeting notes) on GPT asks for it.
const PRIORITY_SKUS = ["GlobalStandard"];
function priorityName(env) {
  return String((env && env.AZURE_PRIORITY_DEPLOYMENT) || "gpt-6-sol-priority").trim();
}
/** Azure deployments that can answer with priority processing, newest first. */
function priorityTargets(env) {
  const out = [];
  for (const [model, d] of Object.entries(memory.azure?.deployments || {})) {
    if (familyOf(model) !== "sol" || !PRIORITY_SKUS.includes(d.sku)) continue;
    if (d.state && !/succeeded/i.test(d.state)) continue;
    out.push({ model, target: d.deployment || model });
  }
  out.sort((a, b) => byNewest(a.model, b.model));
  const named = priorityName(env);
  if (named && !out.some((c) => c.target === named)) out.push({ model: named.replace(/-priority$/, ""), target: named });
  return out.filter((c) => !isMissing("azure", c.target));
}
/** Puts the priority (fast) GPT deployments where GPT starts in the list, for Ultrafast deep work on Azure. */
function withPriority(list, role, provider, owner, env) {
  if (provider !== "azure" || role !== "deep" || owner.level !== "ultrafast" || !fastModeUsable("azure")) return list;
  const fast = priorityTargets(env).map((c) => ({ family: "sol", model: c.model, target: c.target, api: "azure", priority: true }));
  if (!fast.length) return list;
  let at = list.findIndex((c) => c.api !== "claude");
  if (at < 0) at = list.length;
  return [...list.slice(0, at), ...fast, ...list.slice(at)];
}

/** How hard Claude thinks, per task and level. */
function claudeThinking(task, level, family, effortAsked) {
  if (effortAsked === "none" || effortAsked === "minimal") return { thinking: false };
  if (task === "everyday") return { thinking: false, effort: family === "opus" || family === "opusFast" ? "low" : undefined };
  if (task === "long") return { thinking: true, effort: "low" };
  return { thinking: true, effort: level === "saver" ? "low" : level === "ultrafast" ? "medium" : "medium" };
}

/** The app's request (OpenAI "Responses" format) as a Claude "Messages" request. */
function toClaude(body, target, task, level, family) {
  const system = [];
  if (body.instructions) system.push(String(body.instructions));
  const messages = [];
  const items = typeof body.input === "string" ? [{ role: "user", content: body.input }] : body.input;
  for (const item of items) {
    const parts = typeof item.content === "string" ? [{ type: "input_text", text: item.content }] : item.content;
    if (item.role === "system" || item.role === "developer") {
      system.push(parts.map((p) => String(p.text || "")).join("\n"));
      continue;
    }
    const role = item.role === "assistant" ? "assistant" : "user";
    const content = [];
    for (const part of parts) {
      if (part.type === "input_image") content.push(claudeImage(part));
      else if (String(part.text || "").trim()) content.push({ type: "text", text: String(part.text) });
    }
    if (!content.length) continue;
    const previous = messages[messages.length - 1];
    if (previous && previous.role === role) previous.content.push(...content);
    else messages.push({ role, content });
  }
  if (!messages.length || messages[0].role !== "user") messages.unshift({ role: "user", content: [{ type: "text", text: "(The conversation starts here.)" }] });
  if (messages[messages.length - 1].role !== "user") messages.push({ role: "user", content: [{ type: "text", text: "(Please continue.)" }] });
  const plan = claudeThinking(task, level, family, body.reasoning?.effort);
  const asked = Math.max(256, Math.min(Number(body.max_output_tokens) || 4000, 64000));
  const out = {
    model: target,
    max_tokens: plan.thinking ? Math.min(asked + 6000, 64000) : asked,
    messages,
    ...(system.length ? { system: system.join("\n\n") } : {}),
  };
  if (Array.isArray(body.tools) && body.tools.length) {
    out.tools = [{ type: "web_search_20250305", name: "web_search", max_uses: 3 }];
    out.system = `${out.system ? `${out.system}\n\n` : ""}If you use web search, search first and write nothing before it; then write only your reply.`;
  }
  if (plan.thinking) out.thinking = { type: "adaptive" };
  else out.thinking = { type: "disabled" };
  if (plan.effort) out.output_config = { effort: plan.effort };
  return out;
}

function claudeText(message) {
  return (Array.isArray(message?.content) ? message.content : [])
    .filter((b) => b?.type === "text" && typeof b.text === "string")
    .map((b) => b.text)
    .join("");
}

function newId(prefix) {
  const bytes = crypto.getRandomValues(new Uint8Array(12));
  return `${prefix}${[...bytes].map((b) => b.toString(16).padStart(2, "0")).join("")}`;
}

/** A finished Claude answer in the "Responses" shape the app reads. */
function responseObject(id, model, text, stopReason, usage, status) {
  const done = status || (stopReason === "max_tokens" ? "incomplete" : "completed");
  return {
    id,
    object: "response",
    created_at: Math.floor(Date.now() / 1000),
    status: done,
    model,
    ...(done === "incomplete" ? { incomplete_details: { reason: "max_output_tokens" } } : {}),
    output: [
      {
        type: "message",
        id: id.replace(/^resp_/, "msg_"),
        status: "completed",
        role: "assistant",
        content: [{ type: "output_text", text, annotations: [] }],
      },
    ],
    output_text: text,
    usage: {
      input_tokens: Number(usage?.input_tokens) || 0,
      output_tokens: Number(usage?.output_tokens) || 0,
      total_tokens: (Number(usage?.input_tokens) || 0) + (Number(usage?.output_tokens) || 0),
    },
  };
}

/** Background jobs Claude answered: kept for an hour in FRIEND_KV, read by the app with GET. */
async function saveJob(env, id, value) {
  try {
    await env.FRIEND_KV?.put(`job:${id}`, JSON.stringify(value), { expirationTtl: 3600 });
  } catch {
    // Not kept: the app asks again.
  }
}
async function serveClaudeJob(id, action, env) {
  if (action === "DELETE" || action === "cancel") {
    try {
      await env.FRIEND_KV?.delete(`job:${id}`);
    } catch {
      // Gone already.
    }
    return new Response(JSON.stringify({ id, deleted: true, status: "cancelled" }), { headers: { "Content-Type": "application/json" } });
  }
  const saved = await kvGet(env, `job:${id}`);
  if (!saved) return jsonError(404, "That answer is no longer here. Ask again.");
  if (saved.status === "in_progress" && Date.now() - (saved.startedAt || 0) > 10 * 60_000) {
    return new Response(JSON.stringify({ id, status: "failed", error: { message: "The answer was cut off. Ask again." } }), {
      headers: { "Content-Type": "application/json" },
    });
  }
  return new Response(JSON.stringify(saved), { headers: { "Content-Type": "application/json" } });
}

async function claudeFetch(env, request) {
  return fetch(claudeUrl(env), {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-api-key": claudeKey(env), "anthropic-version": CLAUDE_API_VERSION },
    body: JSON.stringify(request),
  });
}

/** Sends to Claude, dropping settings a model doesn't take (thinking, effort). */
async function claudeSend(env, request) {
  let response;
  let text = "";
  for (let attempt = 0; attempt < 4; attempt++) {
    response = await claudeFetch(env, request);
    if (response.ok) return { response, text: "" };
    text = await errorText(response);
    if (response.status !== 400) break;
    if (request.output_config && /output_config|effort/i.test(text)) {
      delete request.output_config;
      continue;
    }
    if (request.tools && /web_search|\btools?\b/i.test(text)) {
      // Claude's web search isn't offered on this resource: GPT answers questions that need it.
      memory.claudeSearch = false;
      memory.claudeSearchAt = Date.now();
      break;
    }
    if (request.thinking && /thinking|budget/i.test(text)) {
      if (request.thinking.type === "disabled") request.thinking = { type: "adaptive" };
      else delete request.thinking;
      continue;
    }
    break;
  }
  return { response, text };
}

/** One Claude answer, streamed or whole, in the app's format. null + error when it didn't work. */
async function serveClaude(env, ctx, body, candidate, task, owner) {
  const request = toClaude(body, candidate.target, task, owner.level, candidate.family);
  const stream = body.stream === true;
  const keep = body.background === true && Boolean(env.FRIEND_KV);
  const model = candidate.model;

  if (!stream) {
    const id = newId("resp_cl");
    let done = false;
    let pending = null; // the "still working" note, when the answer takes longer than the app waits
    const work = (async () => {
      const { response, text } = await claudeSend(env, request);
      if (!response.ok) return { error: copyResponse(response, text), status: response.status, text };
      const data = await response.json().catch(() => null);
      if (!data || data.stop_reason === "refusal") return { error: jsonError(502, "Claude didn't answer this one."), status: 502, text: "refusal" };
      return { answer: responseObject(id, model, claudeText(data), data.stop_reason, data.usage) };
    })().then(async (result) => {
      done = true;
      if (pending) {
        await pending;
        const final = result.answer || { id, object: "response", status: "failed", model, error: { message: "Claude couldn't answer this one. Ask again." } };
        await saveJob(env, id, final);
      } else if (keep && result.answer) {
        await saveJob(env, id, result.answer);
      }
      return result;
    });
    let result;
    if (keep && ctx?.waitUntil) {
      let timer;
      result = await Promise.race([work, new Promise((resolve) => (timer = setTimeout(() => resolve(null), 50_000)))]);
      clearTimeout(timer);
      if (result === null && !done) {
        // The app stops waiting after a minute: hand it a job to check on, and finish in the background.
        const started = { id, object: "response", status: "in_progress", model, created_at: Math.floor(Date.now() / 1000), output: [] };
        pending = saveJob(env, id, { ...started, startedAt: Date.now() });
        await pending;
        ctx.waitUntil(work.catch(() => undefined));
        return { response: new Response(JSON.stringify(started), { headers: { "Content-Type": "application/json" } }) };
      }
      if (result === null) result = await work;
    } else {
      result = await work;
    }
    if (result.error) return { error: result.error, status: result.status, text: result.text };
    return { response: new Response(JSON.stringify(result.answer), { headers: { "Content-Type": "application/json" } }) };
  }

  request.stream = true;
  const { response, text } = await claudeSend(env, request);
  if (!response.ok) return { error: copyResponse(response, text), status: response.status, text };
  const id = newId("resp_cl");

  // Streaming: Claude's events become the "Responses" events the app reads.
  const { readable, writable } = new TransformStream();
  const writer = writable.getWriter();
  const encoder = new TextEncoder();
  let clientGone = false;
  const send = async (event) => {
    if (clientGone) return;
    try {
      await writer.write(encoder.encode(typeof event === "string" ? event : `event: ${event.type}\ndata: ${JSON.stringify(event)}\n\n`));
    } catch {
      clientGone = true; // the app went away: keep going so the answer is kept for it
    }
  };
  const pump = (async () => {
    const started = { id, object: "response", status: "in_progress", model, created_at: Math.floor(Date.now() / 1000), output: [] };
    if (keep) await saveJob(env, id, { ...started, startedAt: Date.now() });
    await send({ type: "response.created", sequence_number: 0, response: started });
    await send({ type: "response.in_progress", sequence_number: 1, response: started });
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";
    let answer = "";
    let stop = "";
    let usage = {};
    let failure = "";
    let seq = 2;
    const item = id.replace(/^resp_/, "msg_");
    try {
      for (;;) {
        const { value, done } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true }).replace(/\r\n/g, "\n");
        let cut = buffer.indexOf("\n\n");
        while (cut >= 0) {
          const block = buffer.slice(0, cut);
          buffer = buffer.slice(cut + 2);
          cut = buffer.indexOf("\n\n");
          const data = block
            .split("\n")
            .filter((line) => line.startsWith("data:"))
            .map((line) => line.slice(5).trimStart())
            .join("\n");
          if (!data) continue;
          let event;
          try {
            event = JSON.parse(data);
          } catch {
            continue;
          }
          if (event.type === "message_start") usage = { ...usage, ...(event.message?.usage || {}) };
          else if (event.type === "content_block_start" && event.content_block?.type === "server_tool_use") {
            await send({ type: "response.web_search_call.in_progress", sequence_number: seq++, output_index: 0, item_id: `ws_${seq}` });
            await send({ type: "response.web_search_call.searching", sequence_number: seq++, output_index: 0, item_id: `ws_${seq}` });
          } else if (event.type === "content_block_start" && event.content_block?.type === "web_search_tool_result") {
            await send({ type: "response.web_search_call.completed", sequence_number: seq++, output_index: 0, item_id: `ws_${seq}` });
          }
          else if (event.type === "content_block_delta" && event.delta?.type === "text_delta" && event.delta.text) {
            answer += event.delta.text;
            await send({ type: "response.output_text.delta", sequence_number: seq++, item_id: item, output_index: 0, content_index: 0, delta: event.delta.text });
          } else if (event.type === "message_delta") {
            if (event.delta?.stop_reason) stop = event.delta.stop_reason;
            usage = { ...usage, ...(event.usage || {}) };
          } else if (event.type === "error") {
            failure = String(event.error?.message || "Claude stopped answering.");
          } else {
            await send(": thinking\n\n"); // keeps the app's line open while Claude thinks
          }
        }
      }
    } catch {
      failure = failure || "Claude stopped answering.";
    }
    if (stop === "refusal" && !answer) failure = "Claude didn't answer this one.";
    if (failure) {
      const failed = { ...started, status: "failed", error: { message: failure } };
      await send({ type: "response.failed", sequence_number: seq++, response: failed });
      if (keep) await saveJob(env, id, failed);
    } else {
      const finished = responseObject(id, model, answer, stop, usage);
      await send({ type: "response.output_text.done", sequence_number: seq++, item_id: item, output_index: 0, content_index: 0, text: answer });
      await send({ type: finished.status === "incomplete" ? "response.incomplete" : "response.completed", sequence_number: seq++, response: finished });
      if (keep) await saveJob(env, id, finished);
    }
    try {
      await writer.close();
    } catch {
      // Already closed.
    }
  })();
  ctx?.waitUntil?.(pump.catch(() => undefined));
  return {
    response: new Response(readable, {
      headers: { "Content-Type": "text/event-stream; charset=utf-8", "Cache-Control": "no-cache" },
    }),
  };
}

// ---------------------------------------------------------- Talking to the AI
function upstream(provider, env, path, init) {
  const headers = { ...(init.headers || {}) };
  if (provider === "azure") {
    headers["api-key"] = env.AZURE_KEY;
    return fetch(`${azureBase(env)}/${path.replace(/^v1\//, "")}`, { ...init, headers });
  }
  headers.Authorization = `Bearer ${env.OPENAI_KEY}`;
  return fetch(`https://api.openai.com/${path}`, { ...init, headers });
}

/** Azure's older per-deployment address (some features are only there on some resources). */
function azureDeploymentCall(env, deployment, path, init) {
  const root = azureBase(env).replace(/\/openai\/v1$/, "");
  return fetch(`${root}/openai/deployments/${encodeURIComponent(deployment)}/${path}?api-version=${AZURE_DEPLOYMENT_API}`, {
    ...init,
    headers: { ...(init.headers || {}), "api-key": env.AZURE_KEY },
  });
}

/**
 * A background job (a long answer the service works on by itself, so leaving the app doesn't
 * stop it): its state and answer, deleting it once collected, or cancelling it. It lives with the
 * service that started it: the chosen one, else the other one (the backup may have taken it).
 */
async function serveJob(id, action, env) {
  if (id.startsWith("resp_cl")) return serveClaudeJob(id, action, env);
  const owner = await getOwner(env);
  const primary = activeProvider(owner, env);
  if (!primary) return jsonError(404, "No AI service is set up in the key keeper.");
  const ready = { azure: azureReady(env), openai: Boolean(env.OPENAI_KEY) };
  const order = [primary, ...PROVIDERS.filter((p) => p !== primary && ready[p])];
  let last = null;
  for (const provider of order) {
    const response = await upstream(provider, env, `v1/responses/${id}${action === "cancel" ? "/cancel" : ""}`, {
      method: action === "cancel" ? "POST" : action,
    });
    if (response.ok) return response;
    const text = await errorText(response);
    last = copyResponse(response, text);
    if (![400, 404].includes(response.status)) return last;
  }
  return last || jsonError(404, "That job wasn't found.");
}

async function errorText(response) {
  try {
    return await response.clone().text();
  } catch {
    return "";
  }
}

function errorParam(text) {
  try {
    const data = JSON.parse(text);
    return typeof data?.error?.param === "string" ? data.error.param : "";
  } catch {
    return "";
  }
}

/** The service doesn't have this model (not deployed on Azure, no access on OpenAI). */
function notThere(status, text) {
  if (![400, 403, 404].includes(status)) return false;
  if (/unsupported[_ ]parameter|unsupported[_ ]value/i.test(text)) return false;
  return /DeploymentNotFound|model_not_found|not_found_error|deployment[^"]{0,120}?(does not exist|doesn't exist|not found)|model[^"]{0,120}?(does not exist|doesn't exist|isn't available|is not available|not found)|(do|does|don't|doesn't) (not )?have access to (the )?model|unknown model|invalid model/i.test(
    text,
  );
}

/** Busy or a passing problem: another model (or service) may answer instead. */
function busy(status) {
  return status === 429 || status >= 500;
}

function copyResponse(response, text) {
  return new Response(text, { status: response.status, headers: { "Content-Type": response.headers.get("Content-Type") || "application/json" } });
}

function jsonError(status, message) {
  return new Response(JSON.stringify({ error: { message } }), { status, headers: { "Content-Type": "application/json" } });
}

/** Settings the chosen model takes (a thinking model takes an effort, not a temperature). */
function adaptText(path, original, model, role, fast, tier = "ultrafast") {
  const body = structuredClone(original);
  if (thinks(model)) {
    delete body.temperature;
    delete body.top_p;
    const chat = path === "v1/chat/completions";
    if (chat && body.max_tokens != null) {
      body.max_completion_tokens = body.max_tokens;
      delete body.max_tokens;
    }
    let effort = chat ? body.reasoning_effort : body.reasoning?.effort;
    if (!effort) effort = canSkipThinking(model) ? "none" : "low";
    else if ((effort === "none" || effort === "minimal") && !canSkipThinking(model)) effort = "low";
    if (chat) body.reasoning_effort = effort;
    else body.reasoning = { ...(body.reasoning || {}), effort };
  } else {
    delete body.reasoning;
    delete body.reasoning_effort;
  }
  if (fast && role === "deep") body.service_tier = tier;
  else delete body.service_tier;
  return body;
}

/** Sends a request, fixing settings the model doesn't take (at most a few times). */
async function sendFixing(provider, env, path, body, headers, onFast) {
  let response;
  let text = "";
  for (let attempt = 0; attempt < 4; attempt++) {
    response = await upstream(provider, env, path, { method: "POST", headers, body: JSON.stringify(body) });
    if (response.ok) {
      if (body.service_tier === "ultrafast" || body.service_tier === "priority") onFast(true);
      return { response, text: "" };
    }
    text = await errorText(response);
    if (response.status !== 400) break;
    if (body.service_tier && /service_tier|ultrafast|priority|\btier\b/i.test(text)) {
      onFast(false);
      delete body.service_tier;
      continue;
    }
    if ((body.reasoning || body.reasoning_effort) && /reasoning|effort/i.test(text)) {
      delete body.reasoning;
      delete body.reasoning_effort;
      continue;
    }
    const param = errorParam(text);
    if (param && Object.prototype.hasOwnProperty.call(body, param) && !["model", "input", "messages", "tools", "instructions"].includes(param)) {
      delete body[param];
      continue;
    }
    break;
  }
  return { response, text };
}

async function serveText(provider, path, body, env, owner, extra = {}) {
  const requested = String(body.model || "");
  const tools = Array.isArray(body.tools) ? body.tools : [];
  if (tools.some((tool) => !TOOL_TYPES.has(tool?.type))) return { response: jsonError(400, "That tool isn't available here.") };
  const imageTool = path === "v1/responses" && tools.some((tool) => tool?.type === "image_generation");
  const role = roleOf(path, requested);
  if (!role) return { response: jsonError(404, `The model ${requested} isn't available here.`) };
  // Plain text answers: the automatic choice by kind of task (GPT or Claude), or the person's own pick.
  const task = textTask(path, body, role);
  const claudeOn = Boolean(extra.primary) && claudeState(env, owner) === "on";
  const mains = task
    ? textCandidates(task, provider, owner, extra.pick || "auto", claudeOn, env, role)
    : withPriority(candidates(role, provider, owner), role, provider, owner, env);
  const pictures = imageTool ? candidates("picture", provider, owner) : [null];
  let last = null;
  let attempts = 0;
  for (const picture of pictures) {
    for (const main of mains) {
      if (attempts++ >= 8) break;
      if (main.api === "claude") {
        const result = await serveClaude(env, extra.ctx, body, main, task, owner);
        if (result.response) return { response: result.response };
        last = result.error;
        if (notThere(result.status, result.text) || result.status === 401 || result.status === 403) markMissing("claude", main.target);
        continue; // GPT answers instead
      }
      // Ultrafast: OpenAI's own "ultrafast" mode, or Azure's priority processing (priority deployments only).
      const fast = provider === "azure" ? main.priority === true : role === "deep" && owner.level === "ultrafast" && fastModeUsable(provider);
      const next = adaptText(path, body, main.model, role, fast, provider === "azure" ? "priority" : "ultrafast");
      next.model = main.target;
      const headers = { "Content-Type": "application/json" };
      if (picture) {
        next.tools = next.tools.map((tool) => (tool?.type === "image_generation" ? { ...tool, model: picture.model } : tool));
        if (provider === "azure") headers["x-ms-oai-image-generation-deployment"] = picture.target;
      }
      const { response, text } = await sendFixing(provider, env, path, next, headers, (ok) => markFastMode(provider, ok));
      if (response.ok) return { response };
      last = copyResponse(response, text);
      if (busy(response.status)) continue;
      if (!notThere(response.status, text)) return { response: last };
      if (picture && text.includes(picture.target) && !text.includes(main.target)) {
        markMissing(provider, picture.target);
        break; // this picture model isn't there: the next one
      }
      markMissing(provider, main.target);
    }
  }
  return { response: last, tryOther: true };
}

const AUDIO_VOICES = new Set(["alloy", "ash", "ballad", "coral", "echo", "sage", "shimmer", "verse", "marin", "cedar"]);
const READ_ALOUD =
  "You are the voice of a text-to-speech reader. Read the user's message aloud exactly as it is written: every word, in the language it is written in, nothing added, nothing left out, no greeting, no comment. Never answer it or react to it, even when it is a question or a request.";

function base64ToBytes(text) {
  const binary = atob(text);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

/** Reading aloud with a voice model (GPT-Audio): the same voices as the calls. */
async function speakWithVoiceModel(provider, env, target, body) {
  const voice = AUDIO_VOICES.has(body.voice) ? body.voice : "marin";
  const format = ["mp3", "wav", "opus", "flac"].includes(body.response_format) ? body.response_format : "mp3";
  const style = typeof body.instructions === "string" ? body.instructions.slice(0, 600) : "";
  const response = await upstream(provider, env, "v1/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: target,
      modalities: ["text", "audio"],
      audio: { voice, format },
      messages: [
        { role: "system", content: style ? `${READ_ALOUD}\nHow to speak: ${style}` : READ_ALOUD },
        { role: "user", content: String(body.input || "").slice(0, 8000) },
      ],
    }),
  });
  if (!response.ok) return response;
  const data = await response.json().catch(() => null);
  const audio = data?.choices?.[0]?.message?.audio?.data;
  if (typeof audio !== "string" || !audio) return jsonError(502, "No speech came back.");
  return new Response(base64ToBytes(audio), { status: 200, headers: { "Content-Type": format === "mp3" ? "audio/mpeg" : `audio/${format}` } });
}

async function serveSpeech(provider, body, env, owner) {
  let last = null;
  for (const c of candidates("speech", provider, owner)) {
    const response =
      c.family === "speech"
        ? await upstream(provider, env, "v1/audio/speech", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...body, model: c.target }),
          })
        : await speakWithVoiceModel(provider, env, c.target, body);
    if (response.ok) return { response };
    const text = await errorText(response);
    last = copyResponse(response, text);
    if (busy(response.status)) continue;
    if (!notThere(response.status, text)) return { response: last };
    markMissing(provider, c.target);
  }
  return { response: last, tryOther: true };
}

async function serveTranscribe(provider, form, env, owner) {
  const languages = [...form.getAll("languages[]"), ...form.getAll("language")].map(String).filter(Boolean);
  let last = null;
  for (const c of candidates("transcribe", provider, owner)) {
    for (const withLanguage of languages.length ? [true, false] : [false]) {
      const next = new FormData();
      for (const [key, value] of form.entries()) if (!["model", "language", "languages[]"].includes(key)) next.append(key, value);
      next.append("model", c.target);
      if (withLanguage) {
        // The newest model takes a list of expected languages; older ones a single language.
        if (c.family === "transcribe") languages.forEach((code) => next.append("languages[]", code));
        else next.append("language", languages[0]);
      }
      let response = await upstream(provider, env, "v1/audio/transcriptions", { method: "POST", body: next });
      if (!response.ok && provider === "azure" && notThere(response.status, await errorText(response))) {
        // Some Azure resources only write out speech through the older per-deployment address.
        const older = await azureDeploymentCall(env, c.target, "audio/transcriptions", { method: "POST", body: next });
        if (older.ok || !notThere(older.status, await errorText(older))) response = older;
      }
      if (response.ok) return { response };
      const text = await errorText(response);
      last = copyResponse(response, text);
      if (withLanguage && response.status === 400 && /language/i.test(text)) continue;
      if (busy(response.status)) break;
      if (!notThere(response.status, text)) return { response: last };
      markMissing(provider, c.target);
      break;
    }
  }
  return { response: last, tryOther: true };
}

const TRANSCRIPTION_BACKUPS = ["gpt-4o-mini-transcribe", "whisper-1", null];

async function serveRealtimeSecret(provider, body, env, owner) {
  let last = null;
  for (const c of candidates("realtime", provider, owner)) {
    const next = structuredClone(body);
    next.session = { ...(next.session || {}), model: c.target };
    let response = await upstream(provider, env, "v1/realtime/client_secrets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(next),
    });
    let text = response.ok ? "" : await errorText(response);
    // The model that writes out what's said isn't taken: another one, then none.
    const input = next.session?.audio?.input;
    if (!response.ok && response.status === 400 && input?.transcription && /transcri/i.test(text)) {
      for (const backup of TRANSCRIPTION_BACKUPS) {
        if (backup === input.transcription.model) continue;
        if (backup) input.transcription = { model: backup, ...(input.transcription.language ? { language: input.transcription.language } : {}) };
        else delete input.transcription;
        response = await upstream(provider, env, "v1/realtime/client_secrets", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(next),
        });
        text = response.ok ? "" : await errorText(response);
        if (response.ok || !(response.status === 400 && /transcri/i.test(text))) break;
      }
    }
    if (response.ok) {
      const data = await response.json();
      // Where the app sends its connection offer with this session's key.
      data.calls_url = provider === "azure" ? `${azureBase(env)}/realtime/calls` : "https://api.openai.com/v1/realtime/calls";
      return { response: new Response(JSON.stringify(data), { status: 200, headers: { "Content-Type": "application/json" } }) };
    }
    last = copyResponse(response, text);
    if (busy(response.status)) continue;
    if (!notThere(response.status, text)) return { response: last };
    markMissing(provider, c.target);
  }
  return { response: last, tryOther: true };
}

async function serveLive(provider, body, env, owner) {
  const session = body?.session;
  if (!session || body?.transport?.type !== "webrtc" || typeof body?.transport?.sdp !== "string") {
    return { response: jsonError(400, "The request wasn't valid.") };
  }
  const helper = candidates("helper", provider, owner)[0];
  let last = null;
  for (const c of candidates("live", provider, owner)) {
    const next = structuredClone(body);
    next.session.model = c.target;
    const delegation = next.session.delegation;
    if (delegation?.type === "responses" && delegation.responses) {
      if (helper) delegation.responses.model = helper.target;
      if (Array.isArray(delegation.responses.tools)) delegation.responses.tools = delegation.responses.tools.filter((tool) => TOOL_TYPES.has(tool?.type));
    }
    const response = await upstream(provider, env, "v1/live/sessions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(next),
    });
    if (response.ok) return { response };
    const text = await errorText(response);
    last = copyResponse(response, text);
    if (busy(response.status)) continue;
    // A refused helper is answered by the app itself (it starts again without one).
    if (!notThere(response.status, text) || /delegation|helper|responses/i.test(text)) return { response: last };
    markMissing(provider, c.target);
  }
  return { response: last, tryOther: true };
}

async function serveAi(path, request, env, ctx) {
  const owner = await getOwner(env);
  const asked = String(request.headers.get("X-Friend-Model") || "auto");
  const pick = allowedPicks(env, owner).includes(asked) ? asked : "auto";
  const primary = activeProvider(owner, env);
  if (!primary) return jsonError(404, "No AI service is set up in the key keeper.");
  ctx?.waitUntil?.(refreshCatalogs(env, owner).catch(() => undefined));
  await loadAzureState(env);
  let input;
  if (path === "v1/audio/transcriptions") {
    try {
      input = await request.formData();
    } catch {
      return jsonError(400, "The request wasn't valid.");
    }
  } else {
    try {
      input = await request.json();
    } catch {
      return jsonError(400, "The request wasn't valid.");
    }
    if (!input || typeof input !== "object") return jsonError(400, "The request wasn't valid.");
  }
  const order = [primary];
  // Backup: OpenAI answers what Azure can't (a model that isn't deployed there yet, or Azure is busy).
  if (primary === "azure" && owner.backup && env.OPENAI_KEY) order.push("openai");
  let last = null;
  for (const provider of order) {
    let result;
    if (path === "v1/audio/transcriptions") result = await serveTranscribe(provider, input, env, owner);
    else if (path === "v1/audio/speech") result = await serveSpeech(provider, input, env, owner);
    else if (path === "v1/realtime/client_secrets") result = await serveRealtimeSecret(provider, input, env, owner);
    else if (path === "v1/live/sessions") result = await serveLive(provider, input, env, owner);
    else result = await serveText(provider, path, input, env, owner, { primary: provider === primary, pick, ctx });
    if (result.response && !result.tryOther) return result.response;
    last = result.response || last;
  }
  return last || jsonError(404, "That model isn't available here.");
}

// ------------------------------------------------ Azure: deploying new models
async function armToken(env) {
  if (memory.arm && memory.arm.expires > Date.now() + 60_000) return memory.arm.token;
  const form = new URLSearchParams({
    client_id: env.AZURE_CLIENT_ID,
    client_secret: env.AZURE_CLIENT_SECRET,
    grant_type: "client_credentials",
    scope: "https://management.azure.com/.default",
  });
  const response = await fetch(`https://login.microsoftonline.com/${encodeURIComponent(env.AZURE_TENANT_ID)}/oauth2/v2.0/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: form.toString(),
  });
  if (!response.ok) throw new Error(`Azure sign-in failed (${response.status}). Check AZURE_TENANT_ID, AZURE_CLIENT_ID and AZURE_CLIENT_SECRET.`);
  const data = await response.json();
  memory.arm = { token: data.access_token, expires: Date.now() + (Number(data.expires_in) || 3000) * 1000 };
  return memory.arm.token;
}

function normalizeModel(item) {
  const m = item && typeof item.model === "object" && item.model ? { ...item, ...item.model } : item || {};
  const skus = Array.isArray(m.skus) ? m.skus : [];
  return {
    name: String(m.name || ""),
    version: String(m.version || ""),
    format: String(m.format || ""),
    status: String(m.lifecycleStatus || ""),
    isDefault: m.isDefaultVersion === true ? 1 : 0,
    retires: String(m.deprecation?.inference || ""),
    skus: skus.map((s) => ({
      name: String(s?.name || ""),
      def: Number(s?.capacity?.default) || 0,
      max: Number(s?.capacity?.maximum) || 0,
      retires: String(s?.deprecationDate || ""),
    })),
  };
}

function usableModel(m) {
  if (!m.name) return false;
  if (m.format && m.format !== "OpenAI" && !(m.format === "Anthropic" && isClaudeFamily(familyOf(m.name)))) return false;
  if (/deprecat|retir/i.test(m.status)) return false;
  const soon = Date.now() + 14 * 24 * HOUR;
  if (m.retires && Date.parse(m.retires) < soon) return false;
  return m.skus.some((s) => SKU_ORDER.includes(s.name) && !(s.retires && Date.parse(s.retires) < soon));
}

async function deployModel(base, token, name, model, currentSku) {
  const skus = model.skus
    .filter((s) => SKU_ORDER.includes(s.name))
    .sort((a, b) => (b.name === currentSku) - (a.name === currentSku) || SKU_ORDER.indexOf(a.name) - SKU_ORDER.indexOf(b.name));
  let problem = "";
  for (const sku of skus) {
    const sizes = [...new Set([sku.def || 50, 50, 10, 1])].filter((n) => n > 0 && (!sku.max || n <= sku.max));
    for (const capacity of sizes) {
      const response = await fetch(`${base}/deployments/${encodeURIComponent(name)}?api-version=${ARM_API_VERSION}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          sku: { name: sku.name, capacity },
          properties: {
            model: { format: model.format || "OpenAI", name: model.name, version: model.version },
            versionUpgradeOption: "OnceNewDefaultVersionAvailable",
          },
        }),
      });
      if (response.ok) return { ok: true, sku: sku.name, capacity };
      problem = `${response.status} ${(await response.text()).slice(0, 180)}`;
      if (!/quota|capacity|exceed|insufficient/i.test(problem)) break;
    }
  }
  return { ok: false, problem: problem || "no deployment type available in this region" };
}

/** Deploys the newest model of each kind the app uses (and updates versions). */
async function azureSync(env, owner) {
  if (memory.syncing) return memory.syncing;
  memory.syncing = (async () => {
    const token = await armToken(env);
    const id = String(env.AZURE_RESOURCE_ID).trim().replace(/\/+$/, "");
    const base = `https://management.azure.com${id.startsWith("/") ? id : `/${id}`}`;
    const get = async (url) => {
      const response = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
      if (!response.ok) throw new Error(`Azure answered ${response.status}: ${(await response.text()).slice(0, 180)}`);
      return response.json();
    };
    const account = await get(`${base}?api-version=${ARM_API_VERSION}`).catch(() => null);
    const models = [];
    let next = `${base}/models?api-version=${ARM_API_VERSION}`;
    for (let page = 0; next && page < 20; page++) {
      const data = await get(next);
      models.push(...(Array.isArray(data?.value) ? data.value : []));
      next = typeof data?.nextLink === "string" ? data.nextLink : "";
    }
    const listed = await get(`${base}/deployments?api-version=${ARM_API_VERSION}`);
    const deployments = {};
    for (const d of Array.isArray(listed?.value) ? listed.value : []) {
      const model = d?.properties?.model;
      if (!model?.name) continue;
      const existing = deployments[model.name];
      if (existing && existing.deployment === model.name) continue; // the one named like the model wins
      deployments[model.name] = {
        deployment: String(d.name),
        version: String(model.version || ""),
        sku: String(d?.sku?.name || ""),
        state: String(d?.properties?.provisioningState || ""),
      };
    }
    const catalog = models.map(normalizeModel).filter(usableModel);
    const wanted = [];
    const families = new Set();
    for (const level of LEVELS) for (const role of Object.keys(BEST)) planFamilies(level, role, "azure").forEach((f) => families.add(f));
    // Claude: newer versions of the kinds you already deployed (each needs its Azure Marketplace terms accepted once).
    for (const name of Object.keys(deployments)) if (isClaudeFamily(familyOf(name))) families.add(familyOf(name));
    for (const family of families) {
      const ofFamily = catalog.filter((m) => familyOf(m.name) === family);
      if (!ofFamily.length) continue;
      const names = [...new Set(ofFamily.map((m) => m.name))].sort(byNewest);
      const known = knownModel(family, "azure");
      const pick = owner.autoUpdate || !names.includes(known) ? names[0] : known;
      const versions = ofFamily.filter((m) => m.name === pick).sort((a, b) => b.version.localeCompare(a.version) || b.isDefault - a.isDefault);
      wanted.push(versions[0]);
    }
    const problems = [];
    const done = [];
    for (const model of wanted) {
      const have = deployments[model.name];
      if (have && have.version === model.version && !/failed/i.test(have.state)) continue;
      const name = have?.deployment || model.name;
      const result = await deployModel(base, token, name, model, have?.sku);
      if (result.ok) {
        deployments[model.name] = { deployment: name, version: model.version, sku: result.sku, state: "Creating" };
        done.push(`${model.name} ${model.version}`);
      } else {
        problems.push(`${model.name}: ${result.problem}`);
      }
    }
    memory.azure = {
      region: String(account?.location || memory.azure?.region || ""),
      deployments,
      syncedAt: new Date().toISOString(),
      deployedNow: done,
      problems,
      newest: wanted.map((m) => `${m.name} ${m.version}`),
    };
    memory.azureLoaded = true;
    await kvPut(env, "azure-state", memory.azure);
    return memory.azure;
  })().finally(() => {
    memory.syncing = null;
  });
  return memory.syncing;
}

// ------------------------------------------------------------ Owner reports
/** The Azure region: read from Azure when automatic deployment is set up, else AZURE_REGION (for example "swedencentral"). */
function azureRegion(env) {
  return String(memory.azure?.region || env.AZURE_REGION || "")
    .toLowerCase()
    .replace(/\s+/g, "");
}

async function ownerReport(env) {
  const owner = await getOwner(env);
  await loadAzureState(env);
  const provider = activeProvider(owner, env);
  const levels = {};
  for (const level of LEVELS) levels[level] = provider ? shownModels(provider, { ...owner, level }, env) : {};
  const azure = memory.azure || {};
  return {
    keeper: KEEPER_VERSION,
    settings: owner,
    active: provider,
    storage: Boolean(env.FRIEND_KV),
    models: provider ? shownModels(provider, owner, env) : {},
    levels,
    ultrafast: ultrafastState(provider, owner, env),
    claude: {
      ready: claudeReady(env),
      state: claudeState(env, owner),
      where: claudeUrl(env) ? new URL(claudeUrl(env)).hostname.split(".")[0] : "",
      deployed: claudeDeployed(),
      missing: CLAUDE_FAMILIES.filter((f) => isMissing("claude", azureDeploymentFor(knownModel(f, "azure")))).map((f) => knownModel(f, "azure")),
      picks: allowedPicks(env, owner),
    },
    azure: {
      ready: azureReady(env),
      resource: azureName(env),
      region: azureRegion(env),
      autoDeploy: armReady(env),
      lastCheck: azure.syncedAt || null,
      deployed: Object.entries(azure.deployments || {}).map(([model, d]) => `${model}${d.version ? ` ${d.version}` : ""}${d.state && !/succeeded/i.test(d.state) ? ` (${d.state})` : ""}`),
      deployedNow: azure.deployedNow || [],
      problems: azure.problems || [],
    },
    openai: { ready: Boolean(env.OPENAI_KEY), lastCheck: memory.openaiModels?.at ? new Date(memory.openaiModels.at).toISOString() : null },
  };
}

function sameText(a, b) {
  const x = String(a);
  const y = String(b);
  let difference = x.length ^ y.length;
  for (let i = 0; i < Math.max(x.length, y.length); i++) difference |= (x.charCodeAt(i) || 0) ^ (y.charCodeAt(i) || 0);
  return difference === 0;
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const origin = request.headers.get("Origin") || "";
    const allowed = String(env.ALLOWED_ORIGINS || "")
      .split(",")
      .map((value) => value.trim().replace(/\/+$/, ""))
      .filter(Boolean);
    const originOk = allowed.includes(origin);
    const cors = {
      "Access-Control-Allow-Origin": originOk ? origin : "null",
      "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, X-Invite-Code, X-Owner-Code, X-Friend-Model",
      "Access-Control-Max-Age": "86400",
      Vary: "Origin",
    };
    const reply = (status, message, extra) =>
      new Response(JSON.stringify(extra ?? { error: { message } }), {
        status,
        headers: { ...cors, "Content-Type": "application/json" },
      });
    const path = url.pathname.replace(/^\/+/, "");

    // Opened directly in a browser: show whether the key keeper is set up (never shows the keys).
    if (!origin && request.method === "GET" && /^(status)?$/.test(path)) {
      const owner = await getOwner(env);
      await loadAzureState(env);
      const provider = activeProvider(owner, env);
      const setup = {
        keyKeeper: "running",
        version: KEEPER_VERSION,
        allowedOrigins: allowed,
        aiService: provider === "azure" ? `Microsoft Azure (${azureName(env)}${azureRegion(env) ? `, ${azureRegion(env)}` : ""})` : provider === "openai" ? "OpenAI" : "not set up",
        level: owner.level,
        automaticModelUpdates: owner.autoUpdate,
        azureDeploysModels: armReady(env),
        openaiBackup: owner.backup && Boolean(env.OPENAI_KEY),
        modelsInUse: modelsInUse(provider, owner),
        ultrafast: ultrafastState(provider, owner, env),
        claude: claudeState(env, owner),
        modelChoice: allowedPicks(env, owner),
        automaticChoice: provider ? shownModels(provider, owner, env) : {},
        gemini: Boolean(env.GEMINI_KEY),
        openai: Boolean(env.OPENAI_KEY),
        azure: azureReady(env),
        chatgptVoice: Boolean(provider),
        backgroundJobs: Boolean(provider),
        ownerControls: Boolean(env.OWNER_CODE),
        ownerStorage: Boolean(env.FRIEND_KV),
        inviteCode: Boolean(env.INVITE_CODE),
      };
      return new Response(JSON.stringify(setup, null, 2), { headers: { "Content-Type": "application/json" } });
    }

    if (request.method === "OPTIONS") return new Response(null, { status: originOk ? 204 : 403, headers: cors });
    if (!originOk) return reply(403, "This address isn't allowed to use the key keeper. Add it to ALLOWED_ORIGINS.");

    const code = request.headers.get("X-Invite-Code") || url.searchParams.get("invite") || "";
    const inviteOk = !env.INVITE_CODE || sameText(code, env.INVITE_CODE);

    if (path === "status") {
      const owner = await getOwner(env);
      await loadAzureState(env);
      const provider = activeProvider(owner, env);
      ctx?.waitUntil?.(refreshCatalogs(env, owner).catch(() => undefined));
      return reply(200, "", {
        gemini: Boolean(env.GEMINI_KEY),
        openai: Boolean(provider),
        azure: azureReady(env),
        gptLive: Boolean(provider),
        gpt6: Boolean(provider),
        jobs: Boolean(provider),
        provider: provider || "none",
        region: provider === "azure" ? azureRegion(env) : "",
        level: owner.level,
        autoUpdate: owner.autoUpdate,
        models: modelsInUse(provider, owner),
        routes: provider ? shownModels(provider, owner, env) : {},
        ultrafast: ultrafastState(provider, owner, env),
        claude: claudeState(env, owner),
        picks: allowedPicks(env, owner),
        owner: Boolean(env.OWNER_CODE),
        invite: Boolean(env.INVITE_CODE),
        inviteOk,
      });
    }

    // ----------------------------------------------------- Owner controls
    if (path === "owner" || path === "owner/sync") {
      if (!env.OWNER_CODE) return reply(404, "The owner controls aren't set up yet: add OWNER_CODE in Cloudflare.");
      if (!sameText(request.headers.get("X-Owner-Code") || "", env.OWNER_CODE)) return reply(401, "That owner code isn't right.");
      if (path === "owner" && request.method === "GET") return reply(200, "", await ownerReport(env));
      if (path === "owner" && request.method === "POST") {
        let change;
        try {
          change = await request.json();
        } catch {
          return reply(400, "The request wasn't valid.");
        }
        if (!env.FRIEND_KV) return reply(409, "The key keeper can't remember choices yet: add the FRIEND_KV storage in Cloudflare (see the README).");
        const owner = cleanOwner({ ...(await getOwner(env)), ...change, updatedAt: new Date().toISOString() }, defaultOwner(env));
        if (!(await kvPut(env, "owner", owner))) return reply(500, "The choice couldn't be saved. Try again.");
        memory.owner = owner;
        memory.ownerAt = Date.now();
        if (change?.autoUpdate === true || change?.provider === "azure") ctx?.waitUntil?.(refreshCatalogs(env, owner, true).catch(() => undefined));
        return reply(200, "", await ownerReport(env));
      }
      if (path === "owner/sync" && request.method === "POST") {
        const owner = await getOwner(env);
        const results = await refreshCatalogs(env, owner, true);
        const problems = results.filter((r) => r.status === "rejected").map((r) => String(r.reason?.message || r.reason).slice(0, 200));
        return reply(200, "", { ...(await ownerReport(env)), checkProblems: problems });
      }
      return reply(405, "Not allowed.");
    }

    if (!inviteOk) return reply(401, "Invite code needed.");

    // ---------------------------------------------------------------- Gemini
    if (path.startsWith("gemini/")) {
      const rest = path.slice("gemini/".length);
      const match = rest.match(GEMINI_PATH);
      if (!env.GEMINI_KEY || request.method !== "POST" || !match) return reply(404, "Not available.");
      if (!GEMINI_MODELS.test(match[1])) return reply(404, `The model ${match[1]} isn't available here.`);
      const upstreamResponse = await fetch(`https://generativelanguage.googleapis.com/${rest}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-goog-api-key": env.GEMINI_KEY },
        body: await request.text(),
      });
      return relay(upstreamResponse, cors);
    }

    // ------------------------------------------------------- Background jobs
    const job = path.match(JOB_PATH);
    if (job) {
      const action = job[2] ? (request.method === "POST" ? "cancel" : "") : ["GET", "DELETE"].includes(request.method) ? request.method : "";
      if (!action) return reply(405, "Not allowed.");
      return relay(await serveJob(job[1], action, env), cors);
    }

    // ---------------------------------------- OpenAI models (Azure or OpenAI)
    if (path.startsWith("openai/")) {
      const rest = path.slice("openai/".length);
      if (request.method !== "POST" || !AI_PATHS.has(rest)) return reply(404, "Not available.");
      return relay(await serveAi(rest, request, env, ctx), cors);
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
      const upstreamResponse = await fetch(target.toString(), { headers: { Upgrade: "websocket", "api-key": env.AZURE_KEY } });
      const service = upstreamResponse.webSocket;
      if (!service) return reply(502, `Microsoft live video refused the connection (${upstreamResponse.status}).`);
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

  // Optional: a daily Cron Trigger in Cloudflare looks for newer models even when nobody uses the app.
  async scheduled(event, env, ctx) {
    const owner = await getOwner(env);
    ctx.waitUntil(refreshCatalogs(env, owner, true));
  },
};

function relay(upstreamResponse, cors) {
  const headers = new Headers(cors);
  const type = upstreamResponse.headers.get("Content-Type");
  if (type) headers.set("Content-Type", type);
  return new Response(upstreamResponse.body, { status: upstreamResponse.status, headers });
}
