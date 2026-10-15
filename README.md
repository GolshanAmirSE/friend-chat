# Friend Chat

A close friend you can **text, call or video call** — in 23 languages, including Persian (فارسی) and Kurdish Sorani (کوردی).
Your friend chats naturally, remembers what you talked about, answers your questions and can check things on the internet for you.
And with **Listen**, Friend Chat writes down a meeting, class or talk in any language, then gives you the summary and key points in the language you choose.
The **Translator** translates what you type or say, in any language, like a real interpreter: only the translation — typed or spoken in your friend's voice.

Created by **Amir Golshan**.

**Open the app:** `https://<your-github-name>.github.io/<repository-name>/`

---

## What it does

- **Text chat, voice calls and video calls** with a friend who talks like a real person, not an assistant.
- **Translator (the 5th way):** the 文A button at the top, between Listen and the call buttons. Choose the language to translate into, then **Text** or **Voice**: whatever is typed or said, in any language or several mixed (recognised by itself), comes out as only its translation — the way a native speaker would say it, sayings and expressions included; answers go back into the language the conversation started in. Each time is a new conversation; earlier ones are kept to search, sum up and share. See **Translator** below.
- **Listen (the 4th way):** the ear button at the top writes down a meeting, class or talk — in any language, even several in the same meeting — while you just listen. Only the text is kept, never the sound. Afterwards: a summary, key points and tasks in any of the 23 languages, a translated transcript, your own questions about the meeting, and sharing by email, message, WhatsApp, the share menu or as a PDF. See **Listen: write down a meeting** below.
- **Photos and files in the chat:** tap **+** next to the message box to add photos, Word, Excel, PowerPoint, PDF or text files, and ask anything about them — a summary, the key points, what a table shows, what's in a photo. Ask for a **PowerPoint presentation** made from a file or a topic, or ask to **change a photo** (another background, other clothes, add or remove something) and get a new picture that keeps the faces as close to the original as possible. See **Photos, files, presentations and pictures** below.
- **Dictate and read aloud in the chat:** the microphone in the message box writes down what you say (ChatGPT's transcription). Like a call, it switches on when you tap it and off by itself as soon as you stop talking (about a second of quiet; the iPhone's microphone light goes out), then your words appear in the box to check, edit or send. Tap it again to add more, or tap it while you talk to stop early. It's always there next to Send — also when you've added a photo or file, so you can say your question instead of typing it. Tap **Send** while you're still talking and the message goes as soon as your words are written out. **Read aloud** reads what's in the message box in your friend's voice — or, when the box is empty, your friend's last reply. Tap it again to stop. (To have every reply read aloud automatically: Settings → Voice and listening → Read replies aloud.)
- **The whole app in your language:** choose **Your language** in the first setup step or in **Settings** — every screen, button and message follows it (23 languages), and Persian, Arabic, Urdu and Kurdish read right to left. Your friend talks with you in it too. See **Your language** below.
- **Looks like your device's own apps — or Friend Chat's own look:** on iPhone the chat looks like Messages, voice calls like the Phone app and video calls like FaceTime; on Android like Google Messages, the Phone app and Meet; on a **Mac**, a **Windows PC** or a **Chromebook** like that computer's own apps, with your friends and conversations in a side menu. **Lamplight** is Friend Chat's own warm look (dusk violet and marigold gold), and **Classic** is the earlier look. Each is picked automatically and can be changed in Settings → Look. It follows light or dark mode.
- **A new app icon:** a glowing marigold speech bubble with two friendly eyes on dusk violet.
- **The latest ChatGPT model for chat:** replies come from `chat-latest` (the newest model used in ChatGPT) and appear word by word as they're written; your friend searches the web by itself when a question needs it (about 1 US cent per message, plus about 1 cent per web search, from your OpenAI credit). If the key keeper doesn't allow it yet, the app uses `gpt-4.1-mini` instead.
- **Voice calls with ChatGPT Voice:** voice calls use OpenAI's **GPT-Live** (`gpt-live-1`), the same voice model as ChatGPT Voice. Your friend listens while talking, says "mm-hmm", lets you cut in at any moment and answers faster. When a question needs the internet or more thought (weather, news, prices, advice), they hand it to a helper model (`gpt-6-luna` with web search) and keep talking while it works. About USD 0.05 per minute of call, plus the helper's searches. Settings → **ChatGPT Voice on voice calls** switches back to the earlier live voice; if ChatGPT Voice can't start, the call uses the earlier voice by itself.
- **Video calls on OpenAI's live voice model** (`gpt-realtime-2.1`) with live video friends (ChatGPT Voice doesn't take camera pictures, so video calls keep this model).
- **OpenAI's newest models where they help (October 2026):**
  - **Questions about your files and presentations:** **GPT-6.1 Sol** (`gpt-6.1-sol`), OpenAI's newest reasoning model, in its **Ultrafast** mode — several times quicker, but about 6 times the normal price. **Settings → AI connection → Ultrafast answers about files** turns Ultrafast off (GPT-6.1 Sol then works at its usual speed, for about a sixth of the cost).
  - **Meeting notes and questions about a meeting (Listen):** GPT-6.1 Sol at its usual speed.
  - **Quick jobs** — memory notes, the diary, key points, looking at the camera, look-ups during calls, reading PDFs, translating meeting lines: **GPT-6 Luna** (`gpt-6-luna`), quicker and cheaper than the model before.
  - **Writing out what you say** (the chat microphone, Listen and the Translator): **GPT-Transcribe** (`gpt-transcribe`), OpenAI's newest transcription model — more accurate, also with accents and mixed languages.
  - **Photo edits and new pictures:** **GPT-Image-2.5 Sunburst**, OpenAI's newest picture model, which keeps faces and details better.
  - If your OpenAI account or your key keeper doesn't offer one of these yet, the app quietly uses the earlier model instead (`chat-latest`, `gpt-4.1-mini`, `gpt-4o-mini-transcribe`, OpenAI's earlier picture model) — nothing stops working.
  - **Calls keep their models and their sound:** GPT-Live 1 (voice calls) and GPT-Realtime-2.1 (video calls and the Translator's voice) are still OpenAI's newest live voice models. GPT-6.1 Sol and Ultrafast are text models, not live voice models.
- **Eight friends who look and act like real people:** Celine, Nia, Lori, Meg, Malik, Rowan, Harry and Max appear as real-time, full-body video on video calls — they talk, smile, move and react while you talk. Four of them were filmed from real people. Each has their own voice (a different OpenAI natural voice for each friend) and their own way of speaking, so each sounds like themselves in text, voice and video calls.
- **Choosing a friend:** each one has a real photo, a short description and a Hear button to listen to their voice first. You also choose the conversation language and the friend's personality.
- **Calls without text on screen:** everything said on calls is still saved in the chat (marked "Voice call with …" or "Video call with …"). The Captions button shows it during a call if you want.
- **Reset app** (in Settings) first shows exactly what will be deleted — all conversations, memories, settings, logs, and the invite code and keys — with **Save a copy of my conversations first**. Only **Delete everything and reset** deletes it; the app then starts like the first time and you'll need the invite code again.
- **One conversation, one memory:** all your friends share one conversation. Switching friends doesn't start an empty chat: texts, voice calls and video calls all stay in the chat until you delete them, and every friend remembers what you shared and picks up where you left off.
- **"Do you remember…?":** ask "what did we talk about last week?" or "do you remember what I said about my trip?" — in chat or on a call — and your friend looks back through your conversations and tells you what was said and when.
- **Search and share:** search everything you talked about, open any conversation, make its key points (in any of the 23 languages) and send them by email, text message, WhatsApp or any app on your phone.
- **Helpful:** answers questions, gives practical advice and looks up current things (news, weather, prices, opening hours) on the internet. It uses Google Search through Gemini when your Gemini key includes it (Gemini's free plan doesn't), and otherwise OpenAI's web search (about 1 US cent per search, from your OpenAI credit).
- **Sees your camera:** on a video call, hold something up and ask "what is this?". While you talk, your friend gets a short description of what your camera shows (OpenAI looks at the picture), and when you've just shown something new they wait a moment for it before answering, so they see what you show; "… can see this" appears on your camera preview. Switch between the front and back camera with the camera-switch button.
- **iPhone on silent:** the friend's voice still plays when the iPhone is on silent (iOS 17 or later), like a music app or a phone call.
- **Live calls (optional):** one natural, flowing conversation — you can interrupt at any moment, like ChatGPT voice.

Languages: English, Persian, Kurdish (Sorani), Spanish, French, German, Italian, Portuguese, Swedish, Norwegian, Danish, Finnish, Dutch, Turkish, Arabic, Russian, Ukrainian, Polish, Hindi, Urdu, Chinese, Japanese and Korean.

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

## Update the key keeper (once, for ChatGPT Voice and the GPT-6 models)

The key keeper only lets through the models the app needs. This version (October 2026) also lets through **GPT-6 Luna** and **GPT-6.1 Sol**, and includes **ChatGPT Voice** (GPT-Live) for voice calls and the latest ChatGPT model for chat. To update it:

1. Open <https://dash.cloudflare.com> → **Workers & Pages** → your worker (for example `friend-chat-keys`) → **Edit code**.
2. Select all the code, delete it, and paste the whole of `key-keeper/worker.js` from this folder.
3. Select **Deploy**. Your keys and invite code stay as they are (they're kept in **Settings → Variables and Secrets**, not in the code).

If Cloudflare says the worker is connected to a GitHub repository (it was created with the Deploy button), replace `worker.js` in that repository instead and commit; Cloudflare deploys it by itself.

To check: open your key keeper's address in a browser (for example `https://friend-chat-keys.<your-name>.workers.dev`). You should see `"chatgptVoice": true` and `"newestModels": "GPT-6 Luna and GPT-6.1 Sol allowed (October 2026 version)"`.

**ChatGPT Voice check:** in the app, **Settings → Check ChatGPT Voice** makes a short test call with your microphone (like a real call; on a computer without a microphone it sends silence) and hangs up once your friend has said hello. Settings keeps two logs, **Latest call** and the check, showing whether OpenAI answered, the connection, sound sent and received, and whether your friend talked; **Copy log** copies one so you can send it for help. If ChatGPT Voice can't connect or stays silent during a call, the app switches to the earlier live voice by itself after about 10 seconds.

Until you do this, everything still works: voice calls use the earlier live voice (the app tells you once), chat may use the smaller `gpt-4.1-mini` model, and the app uses the earlier models instead of GPT-6 (**Settings → AI connection** shows a note until the key keeper is updated). The backup route (Netlify) needs no change. ChatGPT Voice needs a paid OpenAI account (it isn't available on OpenAI's free tier).

## Make it ready to use — no keys for your visitors

Your keys must never go into `index.html`, `friend-config.json` or anywhere else in the repository: anyone can read a public website's files, and leaked keys get copied and misused (or automatically disabled). The key keeper holds them for you instead.

1. On a computer, open this link in Edge, Chrome or Firefox: **[Open the key keeper in Cloudflare](https://workers.cloudflare.com/playground#LYVwNgLglgDghgJwgegGYHsHALQBM4RwDcABAEbogB2+CAngLzbPYDqApmQNJQQBimYACFKNRHT4Io7GgGEAFgS7s6AZwBcLFh268BWEdVoSpM3AqUrVAWABQs9FQgyI2ACJRVMdKt5RH6iQYWHgExCRUcMDsDABE0YT4hLF2dgDe8XBQVAD6wOi44Oyx6rHZuOwAHgB0AFaqsQA0sQDG6MDw0GRQYLx0OUnFpQBMAAzDAKzYowCc0wCMsQC+dlrMOjz8goZi9JLScooQymp2Dk4u7p7evtABQYKhhKSR0XHlVXUNpKg9MlExMo0T71FL2RzOJzYAAqdBg7ECcBgMF6LQI-ioyFqcAAbnBVC0pDAIABqfKFMDsVK2ZDIEj7MwkCwQEjYEgAaxUHPY7HhCBIAAo4EywJRcKgwIh2CRWJhOQgAJQ05DKkjKXmqEh0Sj8gCCAEluWoSKp2IT2BBqiRofJpUiYCRHFqdSQAO6cW7SwhgdmaiDoEgQW0kA0m9gIHFQFrsVSqoMISgAc3kgfknhNwDgYDAYYjUfYjTdaZaKbguFwmu1IH5nONTt4mt8FULqgDkdumFjtIi7Bx4bDdqNJDgNB7ff5ij7gYDEDh0sc7GqytVuvLqZj0uyIrFEqlJAAfDK5eHNQAyEgABTgiZjB8FQfTruPirvAGULdAqInNfvVQA1RAoDgMhKU1EdcBId9zQgVQrQAVVNQM5xIWIoIQC1YgeGsrGHUcg03KhI2cEg2gqJdaVVEgQwAGWogB5VgAFE3ByOiACV9QAcX1AA5V8qOhKoWSokgAE0XXtAByMDy3Q1RVELV1eHkSgWWFTp5CtRjKiiFEERIeQIAgGANFpKsEFeRdE2UkAyGqfxKJITjGIAWV4-Uci4RjRJE3y0ItKjOPQdBE0pJz2GAbIoCHNlnEqFkSwIQscXQfNcIgkdVHdBBNVQBNgHXEhsmcCyLUcuiL0YniDU87zfJE-zhLo+EqFDWtWQiAhqyzEgUvzBSmSOTiL2hEg-1S6MSKzMBNQFYboWwaioD7BV0pIXopzRbNZvQYkMSzJVuyo3UAC04LYxiciqtwLzo3jRoEoTfJcqME1bVAWQEIx6BIMxvGKjqNulSMKgDPKDgrQVdruSIwEOul6sRpHkZIbTdMpQJDOM0zkHM7A5J1aNqlNPNo1grJqjgAAvatFzaYAVSOkMzou2qfKRxqqJewkfHQD76VEXAfvagVof2uHHN4v99WhS7ZDotxGMRzmQxIgppXMoJTBoP1kMcSat3w4dkShvbHCzQt0Pp6JgVweHVR43t+xgEAWVrTVipnYN7SCP5NUwQrON4AAJWySHQm5eEwOgl1sNoqFUFk-zu2RLuo-U-0u3ULw8zO2NffU6J4kgGBQsZhgANmmAAWbB5lGWIiFsVU6KoMA6CLAhCp9qgeQrFsveld2pqoSSWTIaUQFNCDglwugHy-X6Zq9eQExAZNU3TEnIyJuPHETpzXPcnIL11aFg5LkhkAAPRxeYJ8IAAdZByXYGbn4FABtXVsBOuBsCpqMbAMxqg5GwAAXRJAqdQN5e4IAIOwc4kIIAABJkBN3jgfZybkeIeRcgrRi1F+KlxvgKG8kUqBQGwLuVQ8hsCSmcInAAPuQqK1DJS0Pobwdg9CEHMNYZQ7AABmAUj9qiP1wFAgA-Ow-E8gBRcOcAqKRLCIpsOGGIqYND5GKPYMohUaCMH7xZBVKqNUABSr4i4nzPsHYhPZXSQQtF-WId9kCJRQPTPSMMGiFlcfMZAclvAJxjE0FCbi4AgFwP4ZAXgeQljCf4wJ7AszQGiO43oLgcimmgr48JASgaxJjL4fesRwEKiMQnExlVqp4IIUQkutgqKkI8bwxhEAWHEmwNXMR8xsAUKgJ01w1d0D9LYUZVQQzumjIGdgCA8CE6EigBPKZ8zMpLJWYmLpQM5kLIJFITZXT0KpKgNEBRGjqjzGUQogZ+jDF7yqczc6l18GKwaSQ6+ZCjkpMgKc9g5zenXLGZQ5RUyemXJuVFUFWzhnoEhSCqRBj0GqmZPNMaE1pRbRmoKeai1lp6MCEbPqk1X5gELOBQqpKPYskzB3RQo4ACOIAYw+OnEuTBLJ06ZxyK8wh9ib4wq4X2Ou9yOUkC5ZdYOhDKr50vgKrpVcBRgGoHAJhrY4b3NsFUbwSASAVFQJEyAJA0hNOHKoOgVAWhBAtCWAU6EmUssLDIHEq0TW+TFdWHMpde6OPOtRO17AHWJ2qJ6ippqqJiswFAayVBL72uZcG20ZYTzVBvBAAUsQ6JSBjbEVaTCmEoUbuGtWjzproHdBBUur55nZETAKZ11RdS0QYsxViHFuJ8RIPmwtSpEbExRLwDNzRe31WqJmGAAoBR4mVXokuh5p3MuqDW4AAoFTVAjpKaMApkDPxJGgvxuaR2+WqL8SA4YBQiHQJSEcYb3XGMdNm7IdF2SXzLRW+ylrlUVFUKLR9VBb0iTFW0HKl83X1ViLqFoZNVDYCQQmMA2BdTZnLdgLN0bsglAfehqgz6SBSKwzGkggRYhUHAGAJoxaqIQag8U2DEJ4OIeQ66bALkLQqQrJh2IzloSFluq+HjJAKrQkLnxCjiNqPQbo04BjSHRTMeDikioOVONIMuLCeEhYAAa2B9SEW4XRioYnwOQck3Bq9LG4CVEQzeTjAAOCu1dRgN0aJRsa4hiNoZzS53ySwm53seRujupcBSJy6gNaI8lrwFl+vFeBq0GC-kRj6kgbEYzBNNAKSxRdiY1q-FAVAdB62xeFFI-DaRfoIATAgQI5WIuqCiyQJYjWFSFjA4jULEAp7eaRkmpTGhjUkGqEN4DA1YiqahOpoYKF7SonRI4LErYqCYSWN1nzYbi3dmajIdgEFolWwgO3IqsbhRkATK6EmgRaHlqLGx-sRt2qcl5P2LeAUQAOgFL3ccJoVLncKu7Ndxb8uCgAIRRsI6ec88aWVjrYwUEuDBS5ccYtCTCEOr7X2flIkLhBOuqGUWgpdLKBSeuqBpSy67eSbv+TfXdyAD0KgZ8a1zYrTSdYdKXNr9Vazqj5MRhA1BKFfiM4jN9O3PPZH66L3Aq36oCKgIES916qD1sItUbBx8vKiRa65qiu1-jy5IIrlJyuG2mNqWzbXyNqa0wV8FJXKucSNpZpdTXJA0cNtOs8q6PEbp3R4tCS3SMPEwvGvmW3V7jcO+qGbmqmvA+I2yERRB6tw-24bVLGWcsCHx5Er51z6FOsWQcSltL+9-lZZ4jlqQeWCshYtG9wspHsyFmGC1gbvWTw1ZQuN1wk3OMzajHNzE9RHDLea353PzdfJA4DUGy0CR2Pw8R0JkTr5c3h3r0X5LqWvBl4+2R1rJocdT0CGDp9L78NjGrkRkgjmhGFg7zlQII3x+A9QCDs-OH2SrQL9WWNgWBQ78-EbR0wywhZikipVBR41ImMdtpwSAp4V4h4uRHs+QrRVwIJeB4Cm16ImIWJ2IuJeJXxqhc0m5i0gN1Y41A0E1LRH9YI00M1tNdMk8DNig80C0SdTREASwrx4FgB6DnEgQk919u1Ygi1-MD5E9uFcNS5gd08eJpZZYch5ZFYu0C1SJpQEdS55DFCs9FYJ8I170NJL4ScycAQKcUQ4At0adkASQ6ce0yDp938BRjCtCUIOsp519OcqJf8i8ACxhRgD1WsdcSA5dU9I8G11dcELcZdfI9dIgDcjcRwo8Y8PI49YiRJrd0JwjkiPdnc2Y3dzw8ivdrpbp7oc9fIYUlo+wciTdVdUiYiQipDnBaio8M8lCVDGIKiRJmj2Bn0MilgAMqIlg38Qdejn0f9N9-9KdCtHN5g-FmDuE1YKgewdsdsSD1tfJuw1gdjdi9j9iDjDi9jwoBlRiXCCBNJQskBVBWBlIM05dkBD0mdEYxU5IWRS4NJiZUR-lYgHjYhqhKQvwgwhjAN71MwIASwqDg1wTbUoiPJT5z4QSqIZ85DVc4SCju0odoTYcIJgcEcUI+MUc1CSBgcYT5BJjC9piURZjRhq4-EeJ0A1I8QehgJKQNiDCejnDgd0TeUiFCdE4BQyTP55hykKS-8N9qTADaTCwAADG0aUUlEgFBNIIUkUprTwaA4cZkyUECaUW0dCaoGUpEktA+N7ROY5AqUuOAV0LIFkVAG1eRGUrGEydQWkWBcMdEPsSUL8EAKLVNYKUKFJGATwaoemZAZUt4pYGU4I5GBfAoYjQk4XeqOgrvMbCENTOcfvZEWbGGBbUfPxKzRMAM7AJEKhWsTDSIo+aI13FbEIigXAOgREG0rArEy0OKdNbowYjknwqYjfSUQrM0+ZFJYAQsEbEEkYjbOkI46cmc2cg4wTFqA0M4z4q4mCW4oMDNeIrIR4xnbwk0lkN4y+Fc74zclqbc-4wExMYE7soqLk03GpWPOqTE6g6HOM3E-E2IRMsUvwmYqUuklCBkpkrIHUtk0g5ne9SJIMUDEMV2FSKQKmIfQIGUoQFJdCfkZU+8sxNI7yKMxrG8mfQ8twpJSJaJdAZANZRZIkHxLwkIsVYIS04cZsg8l84NeitwMIVdG85Erkho3k4g9pAUatavOtei1NQQ0lEQgtMQhnb8qk9uP84Ao4EgRUjUseLU4C1kvU8MRcMC5GD1EyIcqIV9Ji61CEx050nGUs6oLcqAUM9ocMtISM6MgbN8hMuifjMJFM4cWCwsesxsrCAqLskI3w6Y-s4nAyi00czsY0kYhPHih8jyCvGxc+YgxQH9N4xnEKiU+Sxzf82IQC9Slk3U9k1zSkceAoOgG8+ZDuPcqiPy4y20jfOfL4RwTi1zJrNEMy54pGLKgAxzQIlCeUpqmgt0fETU6dKAXAEqxGWK+qAillJffJZAQpU0eSDEBoV1EI7sVFEadFNKLFQlb2ZEaSEtXuFoGGR0VAe0-kIs28f0BcmQUMJSKC+7LkMAuA-UxcWi+9VakpWNUuPyqRYmYpDELi28kHCVHlepfionIS2tOvNaxwIGxU0Qw9WS7Kmk-8uU4MRU5U36jEZG9WMAdUqAtS3EDS3UgybSw040wwx5W0MAPkS+fGpG6oCoSkRMIfIG2ceERa2IIJMvBoPDMMRGqgNmt+dgTmmGCnXfEJVQQm9mm-MQsGmfBmpmtHYHSGqVaiGVGGgUuGr8AUNW8MGSjfSkjGhSkgbGhUompUtIY2hAEmzU8moqsKT6mmlW5wwGpdPZHVCAbm5CPExHd0U7CEzCbtHm9gPmcgCq7m32zAf24mXAB0IO9w3LRMdfXq38-qxS6UVs0a0mlkCaqa3S+qJrN+RCWq-c5S220uQij8txY5X5dJFoTJJwbJM0AvIW-Db2lmqgBWt+G-b20lT2kHXi6G-k9NA2utFGqStGs28Uvq6Uq2oa3GlUomp2sm7UzSqmg0o0m82aiQlkQci0hqrA+0sygUJ0oyF02kKymyuyhmCMllKMmMpGVygk9ylHDIqiLy8rIbSmHy7vdMibTM4jAfTqjEPMpbRrH+mOhswICvKvWtfLQrPyzs40rOsKk+4cqKnKccqfESbYuckh2ckgbmN6PmFkIGXqSaqO5ci4vmrI9gZJE5aIGiuKkHYo1mV3btVEx3T3VmUov3APBen8yU3K+kxkwqkCnS40+a5qugsS9NWIOCGARMeBQzVaVO2IEO1sFoTkCATO3svqyuPxbSeEc6uA4UHQV8dAAxgKeOM66W0uo+muxW0uTg1CngxAKIAQlRiS9glCQVJutJYofCrkwRl5CegS0lTKkx7O5e629xwe5U0lTeoC12rSve40sVQgBANNS+ZLP1KPKJ73X3coqqxANNUnBMf0NoL1FCCy0oKpgpi0UnC4yyS+WIZAYlHhQpUJv5cQ+qfJmprghASExHYZ3yUZ9p8Znxvg2CVnDNUs7AccP6sJZOfUVOHISG7OXORifOETY02Zy0eZ+QXgvx4GgJomsJOJm8-S804cs+u0h0gUU5pddAae1dQ-P+kgNRjR5NYjPR+xwxxJVZ8swIbhl3OqJrIKl4n68MHeTQhAiK4c6oEOuxhxiACJkHbefMdGgAiYcYWUih3mfmGhkGKOjfVARAiCI2Jxs0C6gUZUnBqIHLMLQYj28Cx5T+Vug4CARSZ8cBS+OiMgWoJl6oBdGMD7dgRxWx0Fi0K8KABAVdY0-FomKw6MYkNqxGJ8BAeUSmGjHV40sqx0FqS+eZZlB5+9VunwdgEQKC4LeLQ8KulE+I2SsG+Iy+A1ZeMG6q7q5GfVw1u1jLeuJzPxWQUUaeVxsuqaLqqu5pOkJDY5BskiaN9YkIw+kZn6RN3MZF0MjNgUcNgasbDN3AWNnzeNyEvN7sFNxTDuUNzN5GbN4Ym84N8MSmcsRiPsJwJaRObbVV+IYpKLMJetXtiAF1wNnNmqkIqiDVxcU0GgcdlwNmsIWmxratlMPNptx1+RDd1t1-drJF-MLt3AHtlwftyEc9YdyLGzQsFdpwKdqugNvNjthAYG5dp2JwNdwgA9rd6dl4jNvd3VpGQ9+F+qd9s9i9vtzwa9odptsJXdxk8km8hd6Didq9wdjNRD0c4DlD40qDsAmDiALDuBDNcMKrJD-D681zdD4jzDuD7D2ISjzAaj+1vdzB3s7fUvEJffZvAbDw-reueYt0TgLFwx5-NulkCD4Ywhns82pevKgqjAIwaa2B2wPPWwWly1C69CbBtFqIPBvHbqsVOgopuVkgBTZNHKAUMcifPJ5CTxwz4AaoJRhgtMi4UB+EUumfSO1aJR5Zzz5BGETMwsfzifLKnj2WjLNl1zvyw-ITwIOLjl3HB-RTE8V-EY1YNYDYPQbYQWcQBkQ4SwNQZgOwIAA)**
   The key keeper's code is already filled in — you don't need to copy or paste anything.
2. Select **Deploy** (top right). Sign up for a free Cloudflare account or sign in when asked, give the worker a name (for example `friend-chat-keys`) and confirm **Deploy**.
   *Without the link:* in the Cloudflare dashboard go to **Workers & Pages → Create application**, choose to start from scratch (**Start with Hello World!**), select **Deploy**, then **Edit code**, replace all the code with `key-keeper/worker.js` from this folder, and select **Deploy** again.
3. Open your worker: <https://dash.cloudflare.com> → **Workers & Pages** → `friend-chat-keys` → **Settings** → **Variables and Secrets** → **Add**. Add each of these, then select **Deploy**:

   | Name | Type | Value |
   | --- | --- | --- |
   | `ALLOWED_ORIGINS` | Text | Your app's address without a path, for example `https://yourname.github.io` |
   | `GEMINI_KEY` | Secret | Your Google Gemini key |
   | `OPENAI_KEY` | Secret | Your OpenAI key (optional) |
   | `AZURE_ENDPOINT` | Text | Your Microsoft Foundry endpoint (optional) |
   | `AZURE_KEY` | Secret | Your Microsoft Foundry key (optional) |
   | `INVITE_CODE` | Secret | A code you give your friends (recommended — it stops strangers from using your keys) |

4. Check it: open your worker's address with `/status` at the end (for example `https://friend-chat-keys.yourname.workers.dev/status`). You should see `"keyKeeper": "running"`, your app's address, and `true` next to each key you added. The keys themselves are never shown.
5. Copy the worker's address (for example `https://friend-chat-keys.yourname.workers.dev`).
6. In your GitHub repository, open `friend-config.json`, select the pencil (**Edit**), put the address between the quotes — `"keyService": "https://friend-chat-keys.yourname.workers.dev"` — and select **Commit changes**.

That's it: open your app link — it no longer asks for keys. If you set an invite code, the app asks for it once on each device.

Good to know:

- Text chat, voice, answers from the internet and live voice calls work on Cloudflare's free plan.
- **Live video friends** keep a connection open through the key keeper for the whole call, which can need Cloudflare's **Workers Paid** plan (about USD 5 a month).
- You pay for what your friends use. Set spending limits with each service (OpenAI usage limits, Google Cloud budget, Azure budget).
- To stop sharing at any time, change or delete the invite code, or remove a key, in the worker's settings.

## Privacy

- Keys, conversations and memories are stored **only in your own browser** on your device (conversations in the browser's database). Nothing is stored on GitHub or on any server of ours. Key points you share go only where you send them.
- Messages go only to the AI service you choose.
- **Camera on video calls:** the video itself stays on your device. While you talk on a video call, your friend gets a photo from your camera (only when the picture changed); OpenAI (or Gemini) turns the photo into a short description for your friend. Turn the camera off with the camera button at any time.
- **Photos and files you add:** kept on your device with the chat. Word, Excel, PowerPoint and text files are read on your device and only their text is sent to OpenAI with your message; photos and PDFs are sent to OpenAI with the message you send them in. Don't send documents you aren't allowed to share with an AI service.
- **Listen (meetings):** the sound is sent in short pieces to OpenAI to be written out and is not kept anywhere — not on your phone, not by Friend Chat. Only the text is saved, on your device. Let the people in the meeting know you're writing it down.
- With the key keeper, your keys stay in your Cloudflare account and are never sent to visitors. Without it, **don't share your keys** — each person adds their own.
- The friends are AI: Microsoft's digital people, four of them filmed from real actors. Their photos are Microsoft's official pictures (Microsoft Learn, CC BY 4.0), loaded from Microsoft's documentation. If you sincerely ask, your friend says honestly that they are an AI friend.
- AI can make mistakes. Check anything important.

## Put it on your phone like an app

- **iPhone / iPad:** open the link in **Safari** → **Share** → **Add to Home Screen**.
- **Android:** open the link in **Chrome** → **⋮** → **Install app** (or **Add to Home screen**).
- The installed app fills the screen exactly, from just under the clock to the bottom edge, and stays put: only the chat scrolls, never the whole page, so the top bar can't slide away. While you type, the top bar stays in view and the message box stays right on top of the keyboard until you close it: tap the keyboard's **✓** (Done), or tap anywhere above the keyboard (on the chat or the top bar).

## Microphone blocked?

In the app, **Settings → Check microphone** tells you what's blocking it. The usual fixes:

1. Open the website directly in Edge, Chrome or Safari — not inside a preview window.
2. Click the icon at the left of the address bar (a lock, an "i" or a camera), set **Microphone** to **Allow**, and reload the page.
3. **Windows:** Settings → Privacy & security → Microphone → turn on *Microphone access* and *Let desktop apps access your microphone*.
   **Mac:** System Settings → Privacy & Security → Microphone → turn on your browser.
4. Close other apps that may be using the microphone (for example Teams or Zoom).

## The screen turns off during a call?

Since 13 October the screen stays on during voice and video calls, because a phone stops the microphone as soon as its screen goes off. If you lock the phone yourself (side button) or switch to another app, the call picks up again when you come back: the microphone is opened again, or the call reconnects and your friend carries on where you left off. A call that stayed in the background for more than 15 minutes ends instead.

Needs iOS 16.4 or later in Safari (iOS 18.4 or later when opened from the Home Screen). On older phones the app says so during the call: touch the screen now and then, or set a longer Auto-Lock (Settings → Display & Brightness → Auto-Lock).

## Asked for the microphone and camera every time?

Only the browser can remember that you allowed them; a website can't give itself permanent access. Settings → Voice and listening → **Stop the permission questions** shows the steps for the phone or computer you're on. In short:

- **iPhone, in Safari:** tap the button at the left end of the address bar (older iPhones: **aA**), then **⋯** if you see it → **Website Settings** → Microphone and Camera: **Allow**. Safari never asks again for this website.
- **iPhone, from the Home Screen icon:** iPhone doesn't keep the answer for Home Screen web apps. Either use Friend Chat in Safari with the setting above, or allow every website: Settings app → Apps → Safari → Settings for Websites → Microphone and Camera: **Allow**.
- **Android / Chrome / Edge:** when asked, choose **Allow while visiting the site** (not "Allow this time").

Video calls now ask for the microphone and camera together, so there's one question instead of two. The app's **Reset** doesn't change these browser settings; change them back in the same place.

## Crackling or noisy sound on calls?

1. Make sure the newest version runs (the version is at the bottom of **Settings**). Since 13 October, calls on iPhone use only the phone's own call audio: the app's own sound mixer stays off during calls, because a running mixer can make the friend's voice crackle like an old record. Since 14 October (evening) **video calls** work the same way: the live video's sound uses the phone's own call audio too, and if a phone can't keep it clear, the video call carries on by itself with the same clear voice as voice calls (your friend's photo instead of the live video; your friend still sees your camera). To always use that clear voice on video calls, turn off **Settings → Voice and listening → Live video on video calls**.
2. **AirPods or other Bluetooth earphones:** while the microphone is on, iPhones switch them to "phone call" sound, which is thinner than music. Try the phone's loudspeaker or wired earphones to compare.
3. After a call, **Settings → Voice and listening → Latest call** shows a sound report. If *patched* is above about 2%, sound arrived late or got lost on the way: a stronger Wi-Fi or mobile signal fixes that. If it still crackles, select **Copy log** and send it.

## Kurdish (Sorani)

Choose **کوردی سۆرانی · Kurdish (Sorani)** in the language menu at the top (or in the first-time setup). Your friend then writes and speaks everyday Central Kurdish in the Kurdish alphabet, and answers in Persian or any other language when you switch.

- Text chat works best; the AI models write Sorani well.
- Calls speak Sorani with the friend's natural voice. Sorani is a less common language for these voices, so the accent can sound less native than in Persian.
- Phones and browsers have no Kurdish speech recognition or Kurdish voices of their own, so the app uses AI transcription and AI voices for Sorani.

## Your language

The first setup step asks **Which language do you speak?** — and you can change it any time in **Settings → Your language**. The whole app follows it at once: every screen, button, message and the Settings themselves (23 languages: English, Persian, Kurdish (Sorani), Spanish, French, German, Italian, Portuguese, Swedish, Norwegian, Danish, Finnish, Dutch, Turkish, Arabic, Russian, Ukrainian, Polish, Hindi, Urdu, Chinese, Japanese and Korean). In Persian, Arabic, Urdu and Kurdish everything reads right to left: menus open from the other side and arrows point the reading way.

- Your friend talks with you in your language (on calls too) and answers in whatever language you write. To practise another language, change the conversation language with the language button at the top of the chat — the app itself stays in your language, and Settings shows a button to go back.
- The Translator, Listen and key points start from your language too (you can still pick any other language each time).
- Dates and times are written the way your language writes them.

## Looks like your device's own apps

Friend Chat recognises the device it's opened on and dresses itself to match, so everything feels familiar:

| Device | Chat | Voice call | Video call |
|---|---|---|---|
| iPhone, iPad | like Messages (blue bubbles) | like the Phone app (round buttons, red end button) | like FaceTime (frosted controls at the bottom, so your friend's face stays free; your camera in the corner) |
| Android phone or tablet | like Google Messages | like the Google Phone app | like Google Meet (control bar at the bottom) |
| Mac | like macOS apps: frosted grey side menu with friends and conversations, blue and grey bubbles, San Francisco font | voice mode with a glowing light | full-screen video with a floating control bar |
| Windows PC | like Windows 11 apps: Mica grey, white message cards, the Windows blue accent, Segoe UI | voice mode with a glowing light | full-screen video with a floating control bar |
| Chromebook | like ChromeOS and Google's web apps: tonal surfaces, pill shapes, Google blue | voice mode with a glowing light | full-screen video with a floating control bar |
| Other computers | **Lamplight**, Friend Chat's own look | a warm lamp-like glow | full-screen video with a floating control bar |

- Call straight from the chat with the phone or camera icon at the top; hanging up takes you back to the chat. During a call, **messages** (iPhone) or **Chat** (Android) opens the conversation without ending the call.
- The **gear** at the top left opens **Settings** (change friend, run the setup again, conversations and memory, look, voice, AI connection, reset). The **magnifying glass** searches your conversations. Tap the friend's name at the top for all your conversations; the language under the name opens the language menu.
- **Settings → Look** changes it: *Automatic* (matches the device), *Lamplight* (Friend Chat's own look), *iPhone style*, *Android style*, *Mac style*, *Windows style*, *Chromebook style* or *Classic* (the earlier "Modern" look). Every look also works on phones; the looks with a side menu show the menu button at the top for friends and conversations. The choice is remembered on that device.
- **Lamplight** was designed after studying today's AI apps on phones and computers (ChatGPT, Claude, Gemini, Copilot, Perplexity, Meta AI, Pi, Replika and others) and taking the best of them for a companion app: a warm off-white (or deep violet at night) background, your messages in dusk-violet bubbles and your friend's in soft white ones, a floating rounded message box with a marigold send button, rounded headings, and a call screen that glows like a lamp. Its colours meet the WCAG AA contrast rules.
- Light and dark mode follow the phone's own setting, from the very first moment the app opens (no flash of the old green colours).

## Conversations, memory and sharing

- **One conversation with all friends.** Every message — typed, or said on a voice or video call — stays in the chat, whichever friend you talk to. Messages from another friend show that friend's name. Long chats show the latest part; **Show earlier messages** at the top brings back older ones.
- **Your friends remember.** They keep notes about you and a short diary of each conversation (what you talked about and when), shared by all friends. Ask "do you remember…?" any time, in chat or on a call; they look back through the chat history and answer with the day and what was said.
- **Search:** the magnifying glass at the top (or Settings → Conversations and memory → Search conversations). It finds words in any language, also Persian with or without the half-space (‌), and Arabic or Persian letter forms.
- **Key points and sharing:** open a conversation from the list or a search result, tap **Key points**, choose the language, edit if you like, then **Share…** (your phone's own share menu: Messages, Mail, WhatsApp, Telegram…), **Email**, **Message**, **WhatsApp** or **Copy**. **Share conversation** sends the whole conversation instead. Key points are written by ChatGPT (OpenAI); Google Gemini is only used if ChatGPT isn't available. Your friends' memory notes and diary are written the same way.
- **Save a copy:** Settings → Conversations and memory → Save a copy keeps all conversations as one text file (on iPhone: Save to Files, or send it to yourself).
- **Delete:** the bin icon in a conversation deletes just that one. **Clear memory** makes your friends forget (the conversations stay in the chat). **Delete all conversations** deletes conversations and memory. **Reset app** also deletes settings, logs and the invite code (it lists everything before deleting).
- **Keep them safe on iPhone:** Safari can remove a website's saved data when you haven't opened that site for about a week of using Safari. Apps opened from the **Home Screen icon** aren't affected, so use the icon, and **Save a copy** now and then for your own backup.
- Conversations from earlier versions (kept separately per friend) are joined into the one conversation automatically the first time this version opens.

## Photos, files, presentations and pictures

Tap **+** next to the message box (on a computer: the **+** at the bottom left of the box), choose photos or files, write your question — or nothing — and send. Up to 6 at a time.

- **Word** (.docx), **Excel** (.xlsx), **PowerPoint** (.pptx) and **text** files (.txt, .csv, .md, .json) are read on your phone itself; only their text goes to ChatGPT with your message. **PDF** files are read by ChatGPT (OpenAI). Older .doc, .xls and .ppt files aren't supported: save them as .docx, .xlsx or .pptx first.
- Ask anything: "Give me the key points", "Summarise this in Persian", "What are the totals per country?", "Which month was best, and why?", "Explain this contract simply". Your friend keeps the file in mind for the next questions too.
- **Excel:** every sheet is read as a table (up to 400 rows and 40 columns per sheet). Your friend works out totals, trends and comparisons from it; for numbers that really matter, check them in Excel.
- **Very long files:** the first part (about 60,000 characters, roughly 25–30 pages) is used.
- **Photos:** ask what's in them, to read a sign or a menu, to translate text in the photo, for advice ("which shirt goes better?")…
- **Make a presentation:** "Make a PowerPoint presentation from this file" (or "…about our trip to Rome"). A card appears with **Open or save**: on iPhone this opens the share menu — choose **PowerPoint** or **Keynote**, or **Save to Files**; on a computer it's saved to Downloads. The slides come with speaker notes, and Persian, Kurdish and Arabic slides are written right to left. **Slides** shows the list of slides.
- **Change a photo or make a picture:** send a photo with "put me on a beach", "change my clothes to a suit", "remove the car", "make the sky sunset" — or ask for a picture without a photo ("draw a cosy café in Barcelona"). It takes up to a minute. Faces are kept as close to the original as possible. Tap the picture to see it large; **Save or share** saves it to Photos/Files or sends it. If it doesn't work, the card says why and has **Try again**.
- **The first picture may need a one-time OpenAI check:** OpenAI may ask you to verify your organisation before its picture model can be used. The app tells you if so: on **platform.openai.com → Settings → Organization → General → Verify Organization** (a few minutes, with an ID). Nothing changes in the key keeper.
- Photos, pictures and files stay on this device with the chat (deleting a message, **Delete all conversations** or **Reset app** removes them). They are sent to OpenAI only with the message you send.
- Cost (from your OpenAI credit), with GPT-6.1 Sol in Ultrafast mode: a question about a short file about 9 US cents; about a long document about 30 cents; a presentation about 30–50 cents. With **Ultrafast answers about files** turned off: about 1.5 cents, 5 cents and 5–9 cents. A question about a photo about 1 cent; a new picture about 5–25 cents. (Estimates; OpenAI's price list has the exact prices.)

## Listen: write down a meeting

The **ear button** at the top (next to the call buttons), the menu's **Listen: write down a meeting**, or **Settings → Meetings (Listen)**.

1. Choose the language spoken — **Automatic** understands any language, even several in the same meeting — and tap **Start listening**.
2. Put the phone near the people talking. What's said appears on the screen every few seconds, with the time. **Pause** and **Resume** when you like; **Dark screen** turns the screen black to save battery while it keeps listening (tap to show it again).
3. **Stop & save.** Friend Chat writes the last words and opens the meeting with its **Summary**: a short summary, the key points, and the decisions and tasks (who does what).
4. **Language** (at the top of the meeting): show the summary and the whole transcript in any of the 23 languages.
5. **Ask:** ask anything about the meeting, any time later, in any language — "What did we decide about the budget?", "Who has to send what?" — and get the answer from the transcript, with the time it was said. Type the question, or tap the **microphone** and just say it: it's asked when you stop talking, and the answer is read to you (the speaker button next to an answer reads it again).
6. **Share or save as PDF:** choose what (Transcript, Summary, Key points or Everything) and the language in the same menu, edit if you like, then **Share…**, **Email**, **Message**, **WhatsApp**, **Copy** or **PDF** (on a phone the PDF opens the share menu; on a computer it's saved to Downloads). Persian, Kurdish and Arabic PDFs are written right to left.

Good to know:

- **Keep Friend Chat open with the screen on.** Phones don't let websites use the microphone while the screen is locked. Friend Chat keeps the screen awake while it listens; if the phone locks anyway or you switch apps, listening picks up again when you come back and the pause is marked in the transcript ("Paused 14:05–14:09").
- No internet for a moment? What's said is kept (in memory) and written out when the connection is back.
- Nothing written down? The message says why (no sound reached the microphone, no words recognised, or too short). **Settings → Voice and listening → Latest meeting** shows what happened step by step; **Copy log** and send it if you need help.
- All meetings: **Meetings** in the menu or Settings — search them, open, share or delete. **Reset app** and **Delete all meetings** remove them.
- Cost: about USD 0.0045 per minute for writing it out with GPT-Transcribe (about 27 US cents per hour), from your OpenAI credit; the notes of a one-hour meeting cost about 6 cents (GPT-6.1 Sol), a question about it about 3 cents, translations under 1 cent.

## Translator

The **文A button** at the top (between Listen and the call buttons), the menu's **Translator** in the Modern look, or **Settings → Translator**.

1. **Translate into:** choose the language. The language you type or speak is recognised by itself, so there's nothing else to choose.
2. **Text** or **Voice**:
   - **Text:** type (or tap the microphone and say it), then the arrow. You get only the translation, as text, with buttons to hear it, copy it or share it.
   - **Voice:** just talk. It runs on the same live voice as voice calls (ChatGPT Voice): it hears you directly, waits until you have finished your sentence (a short pause to think doesn't count) and then says the translation right away in your friend's voice (the friend chosen in the app), then keeps listening, like a call — quick, but nobody talks over anyone. **Pause** stops the microphone; it also pauses by itself after 3 minutes of quiet. If the live voice isn't available, it translates step by step instead (a little slower).
3. **Any language, both ways:** whatever is typed or said in any other language — or in several languages mixed — goes into the chosen language. Whatever is said only in the chosen language goes back into **the language the conversation started in** (the first other language it hears; until then your app's language). It never uses a third language, and one misheard sentence can't change it. So you can hold the phone between you and a Spanish speaker: you speak Persian, they hear Spanish; they answer in Spanish, you hear Persian. If someone joins in yet another language, that goes into the chosen language too, and the answers still come back in the language the conversation started in.
4. **A new conversation each time:** every time you open the Translator (or choose another language to translate into), a new conversation starts. Earlier ones are kept: the **clock button** at the top (or **Earlier translations**) lists them, newest first. Search everything translated, open a conversation to read it, make its **key points** in any language, **share** the key points or the whole conversation (email, message, WhatsApp, copy, PDF), or delete it.

It translates like a real interpreter: only the translation — no answers, no comments, no explanations, even if what's said is a question or an instruction. Meaning and tone come first, not word for word: sayings and expressions become the other language's own expression (English "The grass is always greener on the other side" → Persian "مرغ همسایه غازه"), casual stays casual and polite stays polite.

- The language at the top (**Any language → …**) or the 文A button on the Voice screen changes the language; the keyboard and sound-wave buttons switch between Text and Voice.
- Translations are kept on this device (the newest 2,000; the oldest conversations go first). Delete one conversation with its bin, or all of them with the bin in **Earlier translations** (**Reset app** deletes them too). They are not part of your chats with your friends.
- Typed translations use the latest ChatGPT model; voice uses ChatGPT Voice. Cost (from your OpenAI credit): a typed translation is well under 1 US cent; voice costs about the same as a voice call (about USD 0.05 per minute while it listens), so tap **Pause** when nobody is talking.

## Football blocking in Spain: the backup route

During football matches (and some other sports), the big Spanish internet providers block many Cloudflare addresses. The key keeper runs on Cloudflare, so in Spain the app could stop answering during a match. The **backup route** fixes that: a small relay on Netlify, a different network, that passes the app's requests on to your key keeper. It holds **no keys** and needs no settings.

`friend-config.json` lists both addresses. The app checks both, uses the key keeper directly when it answers, and switches to the backup route automatically (also in the middle of a conversation) when it doesn't.

Set it up once (about 5 minutes):

1. Put `netlify.toml` and the `netlify` folder in your repository (next to `index.html`), with the new `index.html` and `friend-config.json`, and push them.
2. Go to <https://app.netlify.com> and sign up with **GitHub**.
3. Select **Add new project → Import an existing project → GitHub**. If asked, allow Netlify to see your `friend-chat` repository, then pick it.
4. Set the **Project name** to `golshanamirse-friend-chat` (or change it afterwards under **Project configuration → Change project name**). Leave everything else as it is and select **Deploy**.
5. When it's done, open `https://golshanamirse-friend-chat.netlify.app/keys/status`. You should see `"backupRoute": "running"` and your key keeper's details.

If you used a different project name, put your address (ending in `/keys`) as the second entry in `friend-config.json`. Live video friends need the direct route; through the backup route the app uses a normal call instead.

## The page is blank or stays on "Loading Friend Chat…"?

1. Open your key keeper's address with **/status** at the end (for example `https://friend-chat-keys.<your-name>.workers.dev/status`) in the same browser. You should see `"keyKeeper": "running"`.
   - **It doesn't open:** this network may block Cloudflare workers (some work or school networks do). Try another network, for example your phone on mobile data.
   - **It shows an error:** the key keeper broke during a change. In Cloudflare, open **Workers & Pages → your worker → Deployments** and roll back to the last version that worked, or paste `key-keeper/worker.js` again and select **Deploy**.
2. The app stops waiting after a few seconds and tells you when its AI service can't be reached; it keeps trying in the background.
3. If you see **Friend Chat didn't start**, select **Reload**. If that doesn't help, select **Start fresh**: it resets the app on that device (your invite code stays, but chats saved on that device are cleared). The small *Details* line at the bottom says what went wrong.

## Publish your own copy on GitHub Pages (no coding needed)

1. Sign in to <https://github.com> (create a free account if you don't have one).
2. Select **New repository**, give it a name (for example `friend-chat`), choose **Public**, and select **Create repository**.
3. Select **uploading an existing file**, drag in **all the files in this folder**, then select **Commit changes**.
4. Open the repository's **Settings → Pages**. Under **Build and deployment**, set **Source** to **Deploy from a branch**, choose the **main** branch and the **/ (root)** folder, and select **Save**.
5. After a minute or two, the address of your app appears at the top of the **Pages** settings — for example `https://<your-github-name>.github.io/friend-chat/`. Share that link.

**To update the app later:** upload the new `index.html` (same name) to the repository and commit. The website updates within a few minutes, and the app on phones loads the new version the next time it's opened (or after a break of 30 minutes or more), never in the middle of a conversation. It then shows "Friend Chat was updated" once, with what's new; the version is at the bottom of Settings.

## Files

| File | What it is |
| --- | --- |
| `index.html` | The whole app in one file |
| `friend-config.json` | The address of your key keeper, then the backup route (empty = everyone adds their own keys). **Never put keys here.** |
| `key-keeper/worker.js` | The key keeper to paste into Cloudflare (no keys inside) |
| `netlify.toml`, `netlify/edge-functions/keys.js` | The backup route on Netlify (no keys inside) |
| `manifest.webmanifest`, `icon-192.png`, `icon-512.png`, `icon-maskable-512.png`, `apple-touch-icon.png` | App name and icons for phones |
| `README.md` | This page |

---

## راهنمای سریع (فارسی)

۱. لینک برنامه را در Edge، Chrome یا Safari باز کنید.
۲. زبان گفتگو، دوستتان (زن یا مرد، جوان‌تر یا مسن‌تر)، صدا و شخصیتش را انتخاب کنید.
۳. یک کلید رایگان Gemini از <https://aistudio.google.com/apikey> بگیرید و در مرحله‌ی آخر وارد کنید.
۴. برای تماس زنده و طبیعی (مثل ChatGPT) کلید OpenAI، و برای تماس تصویری زنده، اتصال Microsoft را در «تنظیمات» اضافه کنید.

کلیدها، گفتگوها و خاطرات فقط در مرورگر خودتان روی همین دستگاه ذخیره می‌شوند. اگر لینک را با کسی به اشتراک می‌گذارید، کلیدهایتان را به او ندهید.

**مسیر پشتیبان (برای اسپانیا):** هنگام مسابقه‌های فوتبال، اینترنت‌های بزرگ اسپانیا بعضی آدرس‌های Cloudflare را می‌بندند و برنامه جواب نمی‌دهد. پوشه‌ی `netlify` و فایل `netlify.toml` را به مخزن اضافه کنید، در app.netlify.com با GitHub وارد شوید، مخزن `friend-chat` را با نام `golshanamirse-friend-chat` اضافه کنید و Deploy بزنید. از آن به بعد برنامه خودش در صورت مسدود بودن مسیر اصلی، از مسیر پشتیبان استفاده می‌کند. هیچ کلیدی آنجا لازم نیست.

**حالت سایلنت آیفون و جستجو در اینترنت:** صدای دوست حتی وقتی آیفون روی سایلنت است پخش می‌شود (iOS 17 به بعد). برای سؤال‌هایی مثل آب‌وهوا و اخبار، برنامه اول با جستجوی گوگل (از طریق Gemini) امتحان می‌کند و اگر کلید رایگان Gemini اجازه ندهد، از جستجوی اینترنتی OpenAI استفاده می‌کند (حدود ۱ سنت برای هر جستجو).

**ChatGPT Voice در تماس صوتی:** تماس‌های صوتی حالا با GPT-Live انجام می‌شوند، همان مدل صدای ChatGPT Voice: دوستتان وقتی حرف می‌زند هم می‌شنود، «اوهوم» می‌گوید، می‌توانید هر لحظه وسط حرفش بپرید و سریع‌تر جواب می‌دهد. برای سؤال‌هایی مثل آب‌وهوا و اخبار، در حین صحبت در اینترنت جستجو می‌کند. یک بار کد key keeper را در Cloudflare به‌روز کنید (بخش «Update the key keeper» بالا). اگر فارسی‌اش را نپسندیدید، در تنظیمات گزینه‌ی «ChatGPT Voice on voice calls» را خاموش کنید.

**کردی سورانی:** زبان کردی سورانی اضافه شد. از منوی زبان بالای صفحه «کوردی سۆرانی» را انتخاب کنید؛ دوستتان به کردی سورانیِ روزمره (با الفبای کردی) می‌نویسد و حرف می‌زند. در تماس‌ها ممکن است لهجه‌ی صدا به خوبیِ فارسی نباشد، چون سورانی برای این صداها زبان کم‌کاربردتری است.

**خاموش شدن صفحه در تماس:** از نسخه‌ی ۱۳ اکتبر، صفحه‌ی گوشی در طول تماس صوتی و تصویری روشن می‌ماند، چون با خاموش شدن صفحه، گوشی میکروفون را قطع می‌کند. اگر خودتان گوشی را قفل کنید یا به برنامه‌ی دیگری بروید، وقتی برگردید تماس خودش دوباره وصل می‌شود و دوستتان از همان‌جا ادامه می‌دهد (اگر بیشتر از ۱۵ دقیقه بیرون بمانید، تماس تمام می‌شود).

**اجازه‌ی میکروفون و دوربین فقط یک بار:** فقط خود مرورگر می‌تواند این اجازه را به خاطر بسپارد. در Safari آیفون: دکمه‌ی سمت چپ نوار آدرس (در آیفون‌های قدیمی‌تر «aA») ← اگر «⋯» دیدید آن را بزنید ← Website Settings ← میکروفون و دوربین را روی Allow بگذارید. اگر برنامه را از آیکون صفحه‌ی اصلی (Home Screen) باز می‌کنید، آیفون این اجازه را نگه نمی‌دارد؛ یا برنامه را در Safari باز کنید، یا در تنظیمات آیفون: Apps ← Safari ← Microphone و Camera را روی Allow بگذارید (این برای همه‌ی سایت‌ها اعمال می‌شود). راهنمای کامل در تنظیمات برنامه، بخش «Stop the permission questions» است.

**صدای خش‌دار یا نویزدار در تماس:** از نسخه‌ی ۱۳ اکتبر، تماس‌ها در آیفون فقط از صدای تماسِ خودِ گوشی استفاده می‌کنند و میکسر صدای برنامه در طول تماس خاموش می‌ماند، چون روشن بودنش می‌تواند صدای دوستتان را مثل گرامافون قدیمی خش‌دار کند. اگر با ایرپاد یا هدفون بلوتوثی صحبت می‌کنید، آیفون در حالت تماس کیفیت صدا را پایین‌تر می‌آورد؛ برای مقایسه با بلندگوی گوشی امتحان کنید. بعد از هر تماس، در تنظیمات بخش «Latest call» گزارش صدا را نشان می‌دهد؛ اگر عدد «patched» بیشتر از حدود ۲٪ باشد، مشکل از اینترنت (وای‌فای یا موبایل) است.

**کل برنامه به زبان شما:** از نسخه‌ی ۱۵ اکتبر، اولین مرحله‌ی راه‌اندازی می‌پرسد «به چه زبانی صحبت می‌کنید؟» و هر وقت بخواهید می‌توانید آن را در «تنظیمات ← زبان شما» عوض کنید. همه‌ی صفحه‌ها، دکمه‌ها، پیام‌ها و خود تنظیمات فوراً به همان زبان درمی‌آیند (۲۳ زبان)، و در فارسی، عربی، اردو و کردی همه‌چیز از راست به چپ است. دوستتان هم به زبان شما با شما حرف می‌زند (در تماس هم). برای تمرین زبان دیگر، زبان گفتگو را با دکمه‌ی زبان بالای چت عوض کنید؛ خود برنامه به زبان شما می‌ماند.

**ظاهرهای تازه و آیکون جدید:** از نسخه‌ی ۱۵ اکتبر، روی مک، کامپیوتر ویندوز و کروم‌بوک هم برنامه خودش ظاهر همان دستگاه را می‌گیرد (منوی کناری برای دوستان و گفتگوها). «Lamplight» ظاهر مخصوص خود Friend Chat است: بنفش غروب و طلایی گرم، با حباب‌های پیام بنفش برای شما و سفید برای دوستتان و صفحه‌ی تماسی که مثل یک چراغ می‌درخشد؛ بعد از بررسی برنامه‌های معروف هوش مصنوعی روی گوشی و کامپیوتر طراحی شده است. ظاهر «Modern» قبلی حالا «Classic» نام دارد. آیکون برنامه هم عوض شده است: یک حباب گفتگوی طلایی درخشان با دو چشم مهربان روی زمینه‌ی بنفش. برای دیدن آیکون جدید در صفحه‌ی اصلی آیفون، برنامه را از صفحه‌ی اصلی حذف کنید و دوباره از Safari اضافه کنید (Share ← Add to Home Screen).

**ظاهر مثل برنامه‌های خود گوشی:** از نسخه‌ی ۱۴ اکتبر، برنامه تشخیص می‌دهد روی چه دستگاهی باز شده است. در آیفون، چت شبیه Messages، تماس صوتی شبیه برنامه‌ی Phone و تماس تصویری شبیه FaceTime است؛ در اندروید شبیه Google Messages، برنامه‌ی Phone و Meet. حالت روشن و تاریک هم از تنظیمات گوشی پیروی می‌کند. از آیکون تلفن یا دوربین بالای چت مستقیم تماس بگیرید؛ با قطع تماس به چت برمی‌گردید. در تنظیمات، بخش «Look» می‌توانید ظاهر را عوض کنید (Automatic، iPhone، Android یا Modern — ظاهر مدرن شبیه ChatGPT و دیگر برنامه‌های هوش مصنوعی، با منوی کناری برای دوستان و گفتگوها؛ جایگزین ظاهر سبز قدیمی). دکمه‌ی چرخ‌دنده (⚙️) بالا سمت چپ، «تنظیمات» را باز می‌کند (تغییر دوست، راه‌اندازی دوباره، گفتگوها و حافظه، ظاهر، صدا و …). از نسخه‌ی ۱۴ اکتبر (بعدازظهر)، برنامه از همان لحظه‌ی باز شدن با ظاهر گوشی شما شروع می‌شود و دیگر رنگ سبز قدیمی برای یک لحظه دیده نمی‌شود. دکمه‌ی «Hear» برای شنیدن صدای هر دوست هنگام انتخاب هم در آیفون درست شد.

**یک گفتگو و یک حافظه برای همه‌ی دوستان:** از نسخه‌ی ۱۴ اکتبر (عصر)، همه‌ی دوستان یک گفتگوی مشترک دارند: با عوض کردن دوست، چت خالی نمی‌شود و همه‌ی پیام‌ها — چه تایپی، چه در تماس صوتی یا تصویری — تا وقتی خودتان پاک نکنید در چت می‌مانند. همه‌ی دوستان هر چه گفته‌اید را به خاطر دارند. بپرسید «یادته هفته‌ی پیش درباره‌ی چی حرف زدیم؟» (در چت یا در تماس) تا دوستتان در گفتگوهای قبلی بگردد و بگوید چه گفتید و کی. با ذره‌بین بالای صفحه در همه‌ی گفتگوها جستجو کنید، یک گفتگو را باز کنید، «Key points» را بزنید تا نکات کلیدی‌اش (به هر زبانی که بخواهید) نوشته شود و آن را با ایمیل، پیامک، واتس‌اپ یا هر برنامه‌ی دیگری بفرستید. در «تنظیمات ← Conversations and memory» می‌توانید از همه‌ی گفتگوها نسخه‌ی پشتیبان بگیرید (Save a copy)، حافظه‌ی دوستان را پاک کنید (Clear memory، گفتگوها می‌مانند) یا همه‌ی گفتگوها را حذف کنید.

**نکات کلیدی و پاک کردن همه چیز:** نکات کلیدی هر گفتگو حالا با ChatGPT نوشته می‌شود (Gemini فقط اگر ChatGPT در دسترس نباشد). حافظه و دفترچه‌ی دوستان هم همین‌طور. با زدن «Reset app» در تنظیمات، اول پیامی باز می‌شود که دقیقاً می‌گوید چه چیزهایی پاک می‌شوند — همه‌ی گفتگوها، حافظه‌ها، تنظیمات، گزارش‌ها (لاگ‌ها) و کد دعوت — و می‌توانید اول از گفتگوها نسخه‌ی پشتیبان بگیرید. فقط با دکمه‌ی قرمز «Delete everything and reset» همه چیز پاک می‌شود.

**حالت «گوش دادن» (Listen) — نوشتن متن جلسه:** گزینه‌ی چهارم، کنار چت، تماس صوتی و تماس تصویری: دکمه‌ی گوش در بالای صفحه. زبان جلسه را انتخاب کنید («Automatic» هر زبانی را می‌فهمد، حتی چند زبان در یک جلسه) و «Start listening» را بزنید. گوشی را نزدیک کسانی که حرف می‌زنند بگذارید؛ متن هر چند ثانیه با ساعتش روی صفحه می‌آید. صدا ضبط و ذخیره نمی‌شود — فقط متن روی گوشی شما می‌ماند. دکمه‌ی «Dark screen» صفحه را برای صرفه‌جویی در باتری سیاه می‌کند و گوش دادن ادامه پیدا می‌کند. گوشی اجازه نمی‌دهد سایت‌ها وقتی صفحه قفل است از میکروفون استفاده کنند؛ برای همین برنامه صفحه را روشن نگه می‌دارد، و اگر صفحه قفل شد یا به برنامه‌ی دیگری رفتید، با برگشتن ادامه می‌دهد و فاصله در متن علامت می‌خورد. با «Stop & save» جلسه ذخیره می‌شود و خلاصه، نکات کلیدی و تصمیم‌ها و کارها نوشته می‌شود. از منوی «Language» خلاصه و کل متن را به هر کدام از ۲۳ زبان ببینید، در بخش «Ask» هر وقت خواستید درباره‌ی جلسه سؤال کنید، و با «Share or save as PDF» متن کامل، خلاصه یا نکات کلیدی را (به زبانی که انتخاب می‌کنید) با ایمیل، پیامک، واتس‌اپ یا به صورت فایل PDF بفرستید. هزینه حدود ۲۷ سنت برای هر ساعت است (با GPT-Transcribe).

**تماس تصویری در آیفون:** دکمه‌های تماس حالا پایین صفحه هستند تا صورت دوستتان همیشه دیده شود (اسم و زمان تماس کوچک در گوشه‌ی بالا).

**درست شدن «Listen» در آیفون:** اگر بعد از ضبط پیام «Nothing was written down» می‌آمد، به احتمال زیاد علتش این بود که آیفون سطح صدای میکروفون را برای برنامه درست گزارش نمی‌کرد و برنامه فکر می‌کرد کسی حرف نمی‌زند. حالا برنامه این حالت را تشخیص می‌دهد و همه‌ی صداها را برای نوشتن می‌فرستد. اگر باز هم چیزی نوشته نشد، پیام دلیلش را می‌گوید و در «Settings ← Voice and listening ← Latest meeting» گزارش کامل هست که می‌توانید با «Copy log» بفرستید.

**صدای تماس تصویری:** از نسخه‌ی ۱۴ اکتبر (شب)، صدای تماس تصویری هم مثل تماس صوتی فقط از صدای تماسِ خودِ آیفون استفاده می‌کند تا خش‌خش «گرامافونی» از بین برود. اگر گوشی نتواند صدای ویدیوی زنده را صاف نگه دارد، تماس خودش با همان صدای صاف تماس صوتی ادامه پیدا می‌کند (با عکس دوستتان به جای ویدیوی زنده؛ دوستتان همچنان دوربین شما را می‌بیند). در تنظیمات، «Live video on video calls» را خاموش کنید تا همیشه همین صدای صاف استفاده شود.

**میکروفون و «Read aloud» در چت:** میکروفونِ جعبه‌ی پیام دوباره کار می‌کند (حرف شما با ChatGPT نوشته می‌شود؛ پیام اشتباهِ «Voice input needs an internet connection» دیگر نمی‌آید). دکمه‌ی «Read aloud» متنی را که در جعبه‌ی پیام نوشته‌اید یا با میکروفون گفته‌اید با صدای دوستتان می‌خواند؛ اگر جعبه خالی باشد، آخرین جواب دوستتان را می‌خواند. برای قطع، دوباره بزنید.

**عکس و فایل در چت:** دکمه‌ی **+** کنار جعبه‌ی پیام را بزنید و عکس یا فایل Word، Excel، PowerPoint، PDF یا متنی اضافه کنید (تا ۶ تا با هم)، بعد هر سؤالی دارید بپرسید: «نکات کلیدی‌اش را بگو»، «به فارسی خلاصه کن»، «جمع فروش هر کشور چقدر است؟»، «توی این عکس چیه؟». فایل‌های Word، Excel، PowerPoint و متنی روی خود گوشی خوانده می‌شوند و فقط متنشان با پیام شما به ChatGPT می‌رود؛ PDF و عکس‌ها را ChatGPT (OpenAI) می‌خواند. فایل‌های قدیمی doc، xls و ppt پشتیبانی نمی‌شوند؛ اول آن‌ها را به docx، xlsx یا pptx تبدیل کنید. در Excel هر برگه به شکل جدول خوانده می‌شود (تا ۴۰۰ ردیف و ۴۰ ستون)؛ عددهای مهم را خودتان در Excel هم چک کنید.

**ساختن پاورپوینت:** بنویسید «از این فایل یک پاورپوینت بساز» (یا «یک ارائه درباره‌ی سفرمان به رم بساز»). کارتی با دکمه‌ی **Open or save** می‌آید: در آیفون منوی اشتراک باز می‌شود و می‌توانید **PowerPoint** یا **Keynote** را انتخاب کنید یا در **Files** ذخیره کنید. اسلایدها یادداشت سخنران هم دارند و اسلایدهای فارسی، کردی و عربی راست‌به‌چپ نوشته می‌شوند.

**تغییر عکس یا ساختن تصویر:** یک عکس بفرستید و بنویسید «من را کنار دریا بگذار»، «لباسم را کت‌وشلوار کن»، «ماشین را حذف کن» — یا بدون عکس بخواهید «یک کافه‌ی دنج در بارسلونا بکش». تا یک دقیقه طول می‌کشد و چهره‌ها تا جای ممکن همان‌طور که هستند می‌مانند. با **Save or share** تصویر را در Photos یا Files ذخیره کنید یا بفرستید. **بار اول ممکن است OpenAI بخواهد سازمان (Organization) شما را یک بار تأیید کند:** برنامه در این صورت خودش می‌گوید؛ در platform.openai.com ← Settings ← Organization ← General ← Verify Organization (چند دقیقه، با کارت شناسایی). هزینه: هر تصویر حدود ۵ تا ۲۵ سنت، هر سؤال درباره‌ی عکس حدود ۱ سنت؛ سؤال درباره‌ی فایل و پاورپوینت با GPT-6.1 Sol (پایین‌تر، بخش «جدیدترین مدل‌های OpenAI» را ببینید). در key keeper چیزی لازم نیست عوض شود.

**سؤال صوتی درباره‌ی جلسه:** در بخش «Ask» هر جلسه، حالا می‌توانید به جای تایپ، دکمه‌ی میکروفون را بزنید و سؤالتان را بگویید؛ وقتی حرفتان تمام شد خودش می‌پرسد و جواب را برایتان می‌خواند (دکمه‌ی بلندگو کنار هر جواب، دوباره می‌خواندش).

**میکروفون همراه با فایل و عکس:** دکمه‌ی میکروفون حالا همیشه کنار دکمه‌ی ارسال در جعبه‌ی پیام هست، حتی وقتی عکس یا فایلی اضافه کرده‌اید؛ پس می‌توانید سؤالتان را درباره‌ی فایل بگویید به جای اینکه تایپ کنید. اگر وسط حرف زدن دکمه‌ی ارسال را بزنید، پیام همین که حرفتان نوشته شد فرستاده می‌شود.

**میکروفون مثل تماس صوتی، خودکار روشن و خاموش می‌شود:** وقتی دکمه‌ی میکروفون را در جعبه‌ی پیام می‌زنید، میکروفون روشن می‌شود و همین که حرفتان تمام شد (حدود یک ثانیه سکوت) خودش خاموش می‌شود — چراغ میکروفون آیفون هم خاموش می‌شود و دیگر در حالت صرفه‌جویی هم روشن نمی‌ماند. بعد متن حرفتان در جعبه می‌آید تا بخوانید، ویرایش کنید یا بفرستید. برای اضافه کردن، دوباره میکروفون را بزنید.

**جعبه‌ی پیام روی کیبورد می‌ماند:** وقتی در جعبه‌ی پیام تایپ یا ویرایش می‌کنید، جعبه درست بالای کیبورد می‌ماند و دیگر به زیر کیبورد برنمی‌گردد. برای بستن کیبورد، علامت ✓ کیبورد را بزنید یا هر جای صفحه بالای کیبورد (روی چت یا نوار بالا) را لمس کنید.

**برنامه‌ی نصب‌شده روی گوشی دیگر جابه‌جا نمی‌شود:** وقتی برنامه را روی صفحه‌ی اصلی آیفون (یا اندروید) نصب کرده‌اید، حالا دقیقاً اندازه‌ی صفحه است — از زیر ساعت تا لبه‌ی پایین — و ثابت می‌ماند: فقط چت بالا و پایین می‌رود، نه کل صفحه، پس قسمت بالای برنامه دیگر از دید خارج نمی‌شود. وقتی تایپ می‌کنید، بالای برنامه دیده می‌شود و جعبه‌ی پیام درست روی کیبورد می‌نشیند.

**مترجم (گزینه‌ی پنجم):** دکمه‌ی 文A در بالای صفحه، بین «Listen» و دکمه‌های تماس. وقتی آن را می‌زنید، اول می‌پرسد به چه زبانی ترجمه شود (زبانی که می‌نویسید یا حرف می‌زنید خودش تشخیص داده می‌شود)، بعد یکی از دو حالت را انتخاب کنید:
- **Text (متن):** بنویسید یا با میکروفون بگویید؛ فقط ترجمه به صورت متن می‌آید، با دکمه‌های شنیدن، کپی و اشتراک‌گذاری.
- **Voice (صدا):** فقط حرف بزنید؛ با همان صدای زنده‌ی تماس صوتی (ChatGPT Voice) کار می‌کند: صدای شما را مستقیم می‌شنود، صبر می‌کند تا جمله‌تان تمام شود (مکث کوتاه برای فکر کردن حساب نمی‌شود) و بلافاصله ترجمه را با صدای دوستی که در برنامه انتخاب کرده‌اید می‌گوید و دوباره گوش می‌دهد، مثل یک مترجم واقعی در یک گفتگوی معمولی؛ سریع است، ولی کسی وسط حرف دیگری نمی‌پرد. دکمه‌ی توقف میکروفون را خاموش می‌کند (بعد از ۳ دقیقه سکوت هم خودش متوقف می‌شود). اگر صدای زنده در دسترس نباشد، مرحله به مرحله ترجمه می‌کند (کمی کندتر).

مترجم مثل یک مترجم واقعی فقط ترجمه می‌کند — بدون جواب دادن، توضیح یا نظر، حتی اگر جمله سؤال یا دستور باشد. معنی و لحن را منتقل می‌کند، نه کلمه به کلمه: ضرب‌المثل‌ها و اصطلاحات به معادل خودشان در زبان مقصد برگردانده می‌شوند (مثلاً «The grass is always greener on the other side» ← «مرغ همسایه غازه»)، و لحن خودمانی یا رسمی حفظ می‌شود. در گفتگو: هر چه به هر زبان دیگری (یا مخلوطی از چند زبان) نوشته یا گفته شود، به زبان مقصد ترجمه می‌شود؛ و هر چه فقط به زبان مقصد گفته شود، به زبانی برمی‌گردد که گفتگو با آن شروع شد (اولین زبان دیگری که می‌شنود؛ تا آن موقع زبان برنامه). هیچ‌وقت به زبان سوم ترجمه نمی‌کند و یک جمله‌ی اشتباه شنیده‌شده آن را عوض نمی‌کند. پس می‌توانید گوشی را بین خودتان و یک اسپانیایی‌زبان بگذارید: شما فارسی می‌گویید و او اسپانیایی می‌شنود، او اسپانیایی جواب می‌دهد و شما فارسی می‌شنوید. هر بار که مترجم را باز می‌کنید یک گفتگوی تازه شروع می‌شود و گفتگوهای قبلی نگه داشته می‌شوند: دکمه‌ی ساعت در بالا (یا «Earlier translations») فهرستشان را نشان می‌دهد — می‌توانید در همه‌ی ترجمه‌ها جستجو کنید، یک گفتگو را باز کنید، نکات کلیدی‌اش را به هر زبانی بگیرید، نکات کلیدی یا کل گفتگو را بفرستید (ایمیل، پیام، واتس‌اپ، کپی، PDF) یا پاکش کنید. ترجمه‌ها فقط روی همین گوشی می‌مانند («Reset app» هم پاکشان می‌کند). هزینه: هر ترجمه‌ی متنی کمتر از ۱ سنت؛ ترجمه‌ی صوتی تقریباً مثل تماس صوتی (حدود ۵ سنت برای هر دقیقه‌ای که گوش می‌دهد)، پس وقتی کسی حرف نمی‌زند دکمه‌ی توقف را بزنید. در اندروید و ظاهر مدرن روی گوشی، انتخاب زبان گفتگو حالا دکمه‌ی کره‌ی زمین (🌐) است.

**جدیدترین مدل‌های OpenAI (۱۵ اکتبر ۲۰۲۶):** برنامه حالا هر جا که فایده دارد از جدیدترین مدل‌ها استفاده می‌کند:
- **سؤال درباره‌ی فایل‌ها و ساختن پاورپوینت:** با **GPT-6.1 Sol**، جدیدترین مدل استدلالی OpenAI، در حالت **Ultrafast** — چند برابر سریع‌تر، ولی حدود ۶ برابر گران‌تر. در «تنظیمات ← AI connection ← Ultrafast answers about files» می‌توانید Ultrafast را خاموش کنید (آن‌وقت GPT-6.1 Sol با سرعت معمولی و حدود یک‌ششم هزینه کار می‌کند). هزینه‌ی تقریبی با Ultrafast: سؤال درباره‌ی یک فایل کوتاه حدود ۹ سنت، یک سند طولانی حدود ۳۰ سنت، یک پاورپوینت ۳۰ تا ۵۰ سنت؛ بدون Ultrafast: حدود ۱٫۵ سنت، ۵ سنت و ۵ تا ۹ سنت.
- **خلاصه و سؤال درباره‌ی جلسه (Listen):** GPT-6.1 Sol با سرعت معمولی.
- **کارهای سریع** (یادداشت‌های حافظه، دفترچه، نکات کلیدی، دیدن با دوربین، جستجو در حین تماس، خواندن PDF): **GPT-6 Luna**، سریع‌تر و ارزان‌تر از مدل قبلی.
- **نوشتن حرف‌های شما** (میکروفون چت، Listen و مترجم): **GPT-Transcribe**، جدیدترین مدل OpenAI برای تبدیل گفتار به متن — دقیق‌تر، حتی با لهجه و چند زبان با هم.
- **تغییر عکس و ساختن تصویر:** **GPT-Image-2.5 Sunburst**، جدیدترین مدل تصویر OpenAI که چهره‌ها و جزئیات را بهتر نگه می‌دارد.
- **تماس‌ها و صدایشان هیچ تغییری نکرده‌اند:** GPT-Live 1 (تماس صوتی) و GPT-Realtime-2.1 (تماس تصویری و صدای مترجم) هنوز جدیدترین مدل‌های صدای زنده‌ی OpenAI هستند. GPT-6.1 Sol و Ultrafast مدل‌های متنی‌اند، نه صدای زنده.
- **یک بار key keeper را به‌روز کنید:** فایل `key-keeper/worker.js` جدید را مثل دفعه‌ی قبل در Cloudflare جایگزین کنید و Deploy بزنید (بخش «Update the key keeper» بالا). تا آن موقع همه چیز کار می‌کند، فقط برنامه از مدل‌های قبلی استفاده می‌کند و در «تنظیمات ← AI connection» یک یادآوری نشان می‌دهد.

**دیدن با دوربین:** در تماس تصویری، چیزی را جلوی دوربین بگیرید و بپرسید «این چیه؟» — وقتی حرف می‌زنید، دوستتان یک عکس تازه از دوربین شما می‌گیرد و می‌بیند چه نشانش می‌دهید (روی تصویر دوربین شما نوشته می‌شود «… can see this»). با دکمه‌ی چرخش دوربین بین دوربین جلو و پشت جابه‌جا شوید. برنامه هر بار که باز می‌شود خودش را به‌روز می‌کند؛ نسخه را در پایین تنظیمات (Settings) ببینید.
