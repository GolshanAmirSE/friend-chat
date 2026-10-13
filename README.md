# Friend Chat

A close friend you can **text, call or video call** — in 23 languages, including Persian (فارسی) and Kurdish Sorani (کوردی).
Your friend chats naturally, remembers what you talked about, answers your questions and can check things on the internet for you.

**Open the app:** `https://<your-github-name>.github.io/<repository-name>/`

---

## What it does

- **Text chat, voice calls and video calls** with a friend who talks like a real person, not an assistant.
- **The latest ChatGPT model for chat:** replies come from `chat-latest` (the newest model used in ChatGPT) and appear word by word as they're written; your friend searches the web by itself when a question needs it (about 1 US cent per message, plus about 1 cent per web search, from your OpenAI credit). If the key keeper doesn't allow it yet, the app uses `gpt-4.1-mini` instead.
- **Voice calls with ChatGPT Voice:** voice calls use OpenAI's **GPT-Live** (`gpt-live-1`), the same voice model as ChatGPT Voice. Your friend listens while talking, says "mm-hmm", lets you cut in at any moment and answers faster. When a question needs the internet or more thought (weather, news, prices, advice), they hand it to a helper model (`gpt-6-luna` with web search) and keep talking while it works. About USD 0.05 per minute of call, plus the helper's searches. Settings → **ChatGPT Voice on voice calls** switches back to the earlier live voice; if ChatGPT Voice can't start, the call uses the earlier voice by itself.
- **Video calls on OpenAI's live voice model** (`gpt-realtime-2.1`) with live video friends (ChatGPT Voice doesn't take camera pictures, so video calls keep this model).
- **Eight friends who look and act like real people:** Celine, Nia, Lori, Meg, Malik, Rowan, Harry and Max appear as real-time, full-body video on video calls — they talk, smile, move and react while you talk. Four of them were filmed from real people. Each has their own voice (a different OpenAI natural voice for each friend) and their own way of speaking, so each sounds like themselves in text, voice and video calls.
- **Choosing a friend:** each one has a real photo, a short description and a Hear button to listen to their voice first. You also choose the conversation language and the friend's personality.
- **Calls without text on screen:** the conversation is still saved in the chat. The Captions button (on larger screens) shows it during a call if you want.
- **Reset app** (in Settings) deletes everything on the device and starts again like the first time; you'll need the invite code again.
- **Memory:** your friend remembers what you shared and picks up where you left off.
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

## Update the key keeper (once, for ChatGPT Voice)

The key keeper only lets through the models the app needs. This version adds **ChatGPT Voice** (GPT-Live) for voice calls (and includes the latest ChatGPT model for chat). To update it:

1. Open <https://dash.cloudflare.com> → **Workers & Pages** → your worker (for example `friend-chat-keys`) → **Edit code**.
2. Select all the code, delete it, and paste the whole of `key-keeper/worker.js` from this folder.
3. Select **Deploy**. Your keys and invite code stay as they are (they're kept in **Settings → Variables and Secrets**, not in the code).

If Cloudflare says the worker is connected to a GitHub repository (it was created with the Deploy button), replace `worker.js` in that repository instead and commit; Cloudflare deploys it by itself.

To check: open your key keeper's address in a browser (for example `https://friend-chat-keys.<your-name>.workers.dev`). You should see `"chatgptVoice": true`.

**ChatGPT Voice check:** in the app, **Settings → Check ChatGPT Voice** makes a short test call with your microphone (like a real call; on a computer without a microphone it sends silence) and hangs up once your friend has said hello. Settings keeps two logs, **Latest call** and the check, showing whether OpenAI answered, the connection, sound sent and received, and whether your friend talked; **Copy log** copies one so you can send it for help. If ChatGPT Voice can't connect or stays silent during a call, the app switches to the earlier live voice by itself after about 10 seconds.

Until you do this, everything still works: voice calls use the earlier live voice (the app tells you once), and chat may use the smaller `gpt-4.1-mini` model. The backup route (Netlify) needs no change. ChatGPT Voice needs a paid OpenAI account (it isn't available on OpenAI's free tier).

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

- Keys, conversations and memories are stored **only in your own browser** on your device. Nothing is stored on GitHub or on any server of ours.
- Messages go only to the AI service you choose.
- **Camera on video calls:** the video itself stays on your device. While you talk on a video call, your friend gets a photo from your camera (only when the picture changed); OpenAI (or Gemini) turns the photo into a short description for your friend. Turn the camera off with the camera button at any time.
- With the key keeper, your keys stay in your Cloudflare account and are never sent to visitors. Without it, **don't share your keys** — each person adds their own.
- The friends are AI: Microsoft's digital people, four of them filmed from real actors. Their photos are Microsoft's official pictures (Microsoft Learn, CC BY 4.0), loaded from Microsoft's documentation. If you sincerely ask, your friend says honestly that they are an AI friend.
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

1. Make sure the newest version runs (the version is at the bottom of **Settings**). Since 13 October, calls on iPhone use only the phone's own call audio: the app's own sound mixer stays off during calls, because a running mixer can make the friend's voice crackle like an old record.
2. **AirPods or other Bluetooth earphones:** while the microphone is on, iPhones switch them to "phone call" sound, which is thinner than music. Try the phone's loudspeaker or wired earphones to compare.
3. After a call, **Settings → Voice and listening → Latest call** shows a sound report. If *patched* is above about 2%, sound arrived late or got lost on the way: a stronger Wi-Fi or mobile signal fixes that. If it still crackles, select **Copy log** and send it.

## Kurdish (Sorani)

Choose **کوردی سۆرانی · Kurdish (Sorani)** in the language menu at the top (or in the first-time setup). Your friend then writes and speaks everyday Central Kurdish in the Kurdish alphabet, and answers in Persian or any other language when you switch.

- Text chat works best; the AI models write Sorani well.
- Calls speak Sorani with the friend's natural voice. Sorani is a less common language for these voices, so the accent can sound less native than in Persian.
- Phones and browsers have no Kurdish speech recognition or Kurdish voices of their own, so the app uses AI transcription and AI voices for Sorani.

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

**دیدن با دوربین:** در تماس تصویری، چیزی را جلوی دوربین بگیرید و بپرسید «این چیه؟» — وقتی حرف می‌زنید، دوستتان یک عکس تازه از دوربین شما می‌گیرد و می‌بیند چه نشانش می‌دهید (روی تصویر دوربین شما نوشته می‌شود «… can see this»). با دکمه‌ی چرخش دوربین بین دوربین جلو و پشت جابه‌جا شوید. برنامه هر بار که باز می‌شود خودش را به‌روز می‌کند؛ نسخه را در پایین تنظیمات (Settings) ببینید.
