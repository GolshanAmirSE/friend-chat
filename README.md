# Friend Chat

A close friend you can **text, call or video call** — in 22 languages, including Persian (فارسی).
Your friend chats naturally, remembers what you talked about, answers your questions and can check things on the internet for you.

**Open the app:** `https://<your-github-name>.github.io/<repository-name>/`

---

## What it does

- **Text chat, voice calls and video calls** with a friend who talks like a real person, not an assistant.
- **You choose** the conversation language, a woman or a man, younger or older, the voice, and the friend's personality.
- **Memory:** your friend remembers what you shared and picks up where you left off.
- **Helpful:** answers questions and looks up current things (news, weather, prices, opening hours) on the internet.
- **Live calls (optional):** one natural, flowing conversation — you can interrupt at any moment, like ChatGPT voice.
- **Live video friends (optional):** real-time, lifelike video people who talk, move and react on a video call.

Languages: English, Persian, Spanish, French, German, Italian, Portuguese, Swedish, Norwegian, Danish, Finnish, Dutch, Turkish, Arabic, Russian, Ukrainian, Polish, Hindi, Urdu, Chinese, Japanese and Korean.

## What you need

There are two ways to run it:

- **Ready to use (recommended for sharing):** you set up a small, free **key keeper** once (see below). Your keys stay there, hidden, and the people you share the app with **never see or type a key** — at most a short invite code.
- **Bring your own keys:** if `friend-config.json` is left empty, each person adds their own key in the last setup step (or later in **Settings → AI connection**).

The keys:

| For | You need | Where to get it |
| --- | --- | --- |
| Text chat, voice, answers from the internet | A free **Google Gemini** key | <https://aistudio.google.com/apikey> |
| The most natural voices and **live, ChatGPT-style calls** | An **OpenAI** key (paid) | <https://platform.openai.com/api-keys> |
| **Live video friends** | A **Microsoft Foundry** resource endpoint and key (paid), in the **Sweden Central** region | Azure portal → create a Microsoft Foundry resource → **Keys and Endpoint** |

Only the Gemini key is needed to start. The others are optional.

## Make it ready to use — no keys for your visitors

Your keys must never go into `index.html`, `friend-config.json` or anywhere else in the repository: anyone can read a public website's files, and leaked keys get copied and misused (or automatically disabled). The key keeper holds them for you instead.

1. Create a free account at <https://dash.cloudflare.com/sign-up>.
2. Go to **Workers & Pages → Create → Create Worker**, name it (for example `friend-chat-keys`) and select **Deploy**.
3. Select **Edit code**, replace everything with the contents of `key-keeper/worker.js` from this folder, and select **Deploy**.
4. Open the worker's **Settings → Variables and Secrets** and add:

   | Name | Type | Value |
   | --- | --- | --- |
   | `ALLOWED_ORIGINS` | Text | Your app's address without a path, for example `https://yourname.github.io` |
   | `GEMINI_KEY` | Secret | Your Google Gemini key |
   | `OPENAI_KEY` | Secret | Your OpenAI key (optional) |
   | `AZURE_ENDPOINT` | Text | Your Microsoft Foundry endpoint (optional) |
   | `AZURE_KEY` | Secret | Your Microsoft Foundry key (optional) |
   | `INVITE_CODE` | Secret | A code you give your friends (recommended — it stops strangers from using your keys) |

5. Copy the worker's address (for example `https://friend-chat-keys.yourname.workers.dev`).
6. In your GitHub repository, open `friend-config.json`, select the pencil (**Edit**), put the address between the quotes — `"keyService": "https://friend-chat-keys.yourname.workers.dev"` — and select **Commit changes**.

That's it: open your app link — it no longer asks for keys. If you set an invite code, the app asks for it once on each device.

Good to know:

- Text chat, voice, answers from the internet and live voice calls work on Cloudflare's free plan.
- **Live video friends** keep a connection open through the key keeper for the whole call, which can need Cloudflare's **Workers Paid** plan (about USD 5 a month).
- You pay for what your friends use. Set spending limits with each service (OpenAI usage limits, Google Cloud budget, Azure budget).
- To stop sharing at any time, change or delete the invite code, or remove a key, in the worker's settings.

## Privacy

- Keys, conversations and memories are stored **only in your own browser** on your device. Nothing is stored on GitHub or on any server of ours.
- Messages go only to the AI service you choose.
- With the key keeper, your keys stay in your Cloudflare account and are never sent to visitors. Without it, **don't share your keys** — each person adds their own.
- The friends are AI. The photos show fictional, AI-generated people; live video friends are Microsoft's digital people. If you sincerely ask, your friend says honestly that they are an AI friend.
- AI can make mistakes. Check anything important.

## Put it on your phone like an app

- **iPhone / iPad:** open the link in **Safari** → **Share** → **Add to Home Screen**.
- **Android:** open the link in **Chrome** → **⋮** → **Install app** (or **Add to Home screen**).

## Microphone blocked?

In the app, **Settings → Check microphone** tells you what's blocking it. The usual fixes:

1. Open the website directly in Edge, Chrome or Safari — not inside a preview window.
2. Click the icon at the left of the address bar (a lock, an "i" or a camera), set **Microphone** to **Allow**, and reload the page.
3. **Windows:** Settings → Privacy & security → Microphone → turn on *Microphone access* and *Let desktop apps access your microphone*.
   **Mac:** System Settings → Privacy & Security → Microphone → turn on your browser.
4. Close other apps that may be using the microphone (for example Teams or Zoom).

## Publish your own copy on GitHub Pages (no coding needed)

1. Sign in to <https://github.com> (create a free account if you don't have one).
2. Select **New repository**, give it a name (for example `friend-chat`), choose **Public**, and select **Create repository**.
3. Select **uploading an existing file**, drag in **all the files in this folder**, then select **Commit changes**.
4. Open the repository's **Settings → Pages**. Under **Build and deployment**, set **Source** to **Deploy from a branch**, choose the **main** branch and the **/ (root)** folder, and select **Save**.
5. After a minute or two, the address of your app appears at the top of the **Pages** settings — for example `https://<your-github-name>.github.io/friend-chat/`. Share that link.

**To update the app later:** upload the new `index.html` (same name) to the repository and commit. The website updates within a few minutes.

## Files

| File | What it is |
| --- | --- |
| `index.html` | The whole app in one file |
| `friend-config.json` | The address of your key keeper (empty = everyone adds their own keys). **Never put keys here.** |
| `key-keeper/worker.js` | The key keeper to paste into Cloudflare (no keys inside) |
| `manifest.webmanifest`, `icon-192.png`, `icon-512.png`, `icon-maskable-512.png`, `apple-touch-icon.png` | App name and icons for phones |
| `README.md` | This page |

---

## راهنمای سریع (فارسی)

۱. لینک برنامه را در Edge، Chrome یا Safari باز کنید.
۲. زبان گفتگو، دوستتان (زن یا مرد، جوان‌تر یا مسن‌تر)، صدا و شخصیتش را انتخاب کنید.
۳. یک کلید رایگان Gemini از <https://aistudio.google.com/apikey> بگیرید و در مرحله‌ی آخر وارد کنید.
۴. برای تماس زنده و طبیعی (مثل ChatGPT) کلید OpenAI، و برای تماس تصویری زنده، اتصال Microsoft را در «تنظیمات» اضافه کنید.

کلیدها، گفتگوها و خاطرات فقط در مرورگر خودتان روی همین دستگاه ذخیره می‌شوند. اگر لینک را با کسی به اشتراک می‌گذارید، کلیدهایتان را به او ندهید.
