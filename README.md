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

1. On a computer, open this link in Edge, Chrome or Firefox: **[Open the key keeper in Cloudflare](https://workers.cloudflare.com/playground#LYVwNgLglgDghgJwgegGYHsHALQBM4RwDcABAEbogB2+CAngLzbPYDqApmQNJQQBimYACFKNRHT4Io7GgGEAFgS7s6AZwBcLFh268BWEdVoSpM3AqUrVAWABQs9FQgyI2ACJRVMdKt5RH6iQYWHgExCRUcMDsDABE0YT4hLF2dgDe8XBQVAD6wOi44Oyx6rHZuOwAHgB0AFaqsQA0sQDG6MDw0GRQYLx0OUnFpQBMAAzDAKzYowCc0wCMsQC+dlrMOjz8goZi9JLScooQymp2Dk4u7p7evtABQYKhhKSR0XHlVXUNpKg9MlExMo0T71FL2RzOJzYAAqdBg7ECcBgMF6LQI-ioyFqcAAbnBVC0pDAIABqfKFMDsVK2ZDIEj7MwkCwQEjYEgAaxUHPY7HhCBIAAo4EywJRcKgwIh2CRWJhOQgAJQ05DKkjKXmqEh0Sj8gCCAEluWoSKp2IT2BBqiRofJpUiYCRHFqdSQAO6cW7SwhgdmaiDoEgQW0kA0m9gIHFQFrsVSqoMISgAc3kgfknhNwDgYDAYYjUfYjTdaZaKbguFwmu1IH5nONTt4mt8FULqgDkdumFjtIi7Bx4bDdqNJDgNB7ff5ij7gYDEDh0sc7GqytVuvLqZj0uyIrFEqlJAAfDK5eHNQAyEgABTgiZjB8FQfTruPirvAGULdAqInNfvVQA1RAoDgMhKU1EdcBId9zQgVQrQAVVNQM5xIWIoIQC1YgeGsrGHUcg03KhI2cEg2gqJdaVVEgQwAGWogB5VgAFE3ByOiACV9QAcX1AA5V8qOhKoWSokgAE0XXtAByMDy3Q1RVELV1eHkSgWWFTp5CtRjKiiFEERIeQIAgGANFpKsEFeRdE2UkAyGqfxKJITjGIAWV4-Uci4RjRJE3y0ItKjOPQdBE0pJz2GAbIoCHNlnEqFkSwIQscXQfNcIgkdVHdBBNVQBNgHXEhsmcCyLUcuiL0YniDU87zfJE-zhLo+EqFDWtWQiAhqyzEgUvzMDR16PtC2ZTiL2hbBVFnMK0WzTUBXQYkMSzJVuyo3UAC04LYxiciqtwLzo3joREwT4t8lyowTVtUBZAQjHoEgzG8YqOqG6VIwqAM8oOCtBUWu5IjAVa6XqsHwYhkhtN0ylAkM4zTOQczsDknVo2qU082jWCsmqOAAC9q0XNpgBVNaQy2nbap88HGqoy7CR8dBbvpURcEe9qFqWxwVsc3i-31aFdtkOi3EYsG6ZDEiCmlcyglMGg-WQxxoyKqhCvtf7uaBwt0JJ6JgVwEHVR43t+xgEAWVrTVipnYNNd+UDHX5fCnN4AAJWySHQm5eEwOgl1sNoqCmkg-yO2Rduo-U-123ULw82O2NffU6J4kgGBQsZhgANmmAAWbB5lGWIiFsVU6KoMA6CLAgNeRHt2ArFs7ela2SJHSSWTIaUQFNCDglwugHy-J6wEQ+MkxTB9G3DSN0aDxxQ+ctyeI8i9dWhd2M5IZAAD0cXmHvCAAHWQcl2HHs+BQAbV1bANrgbB8dGbAZmqHJsAAXRJBV1BvKg4YCDsHOJCCAAASZAZdg7L1cu5HILlRaMWovxTO+8BQ3kilQKA2BdyqHkNgSUzgpoAB9MFRVwZKfBhDeDsEIcA0h5DsHYAAMwChPtUE+uBf4AH5KH4nkAKGhzgFQ8LIRFChwwOFTDwYI4R7BREKkgdApeLIKpVRqgAKVfGnHIG8t6oJ7K6SCFpb6xEPsgRKKASZ6UBg0Qs5j5jIDkt4EOMYmgoQsXAEAuB-DIC8DyEsHjHHOPYFmaA0RLG9BcDkU00EGhfwVCokOajKrVQ8ogsWKCM62CougxMxJsD5w4fMbAWCoBkMKfndAZSKFGVUJU1w1TanMIgAgTKhIoA90adgNpHSpDdIKa4d6vT2kh06YMwp6FwlQGiEIqR1R5iiKEeUxRyjF4pIpttXamTkGGPyVMsJkBZnsHmSU5ZLSoCiJ6cUxZKyorXKGUU9A9zsFrKgeXKo3gkAkAqKgbxkASBpFycOVQdAqAtCCBaEsAp0IAEcQAxggIWGQOIFRApBVRGBLJqw5kzoA4x21qKwvYAipF1RcVJMxdLTZmAoDWXVpneFiKprVFtGWE81QbwQAFLEOiUgGWxHRSQkhKFS7UuxcObM6B3QQUzq+Np2REwClRdUXUtEGLMVYhxbifESAirFUqMGGMUS8F5c0I19VqiZhgAKAUeIwCIvRQwQ8DrEXVEVcAAUCpqg+0lNGAUyAz4kkgQ4oVlrfLVEdiVAUIh0CUhHFS3ykq6UMrouyHeWZRSyvshCx1FRVALQFdkJNIlJVtByjvYFYNYi6haNjVQ2BQEJjANgXU0rXTYH5fS7IJRnY9qoOmkgPD+0MpIIEWIVBwBgCaNSqitb60xkbc2+NbaO3YBchaFSFY+2xGctCQsh1XwHpIBVaEqc+KzprXWhtTaIQtrXdm7A7swkVByru0BlxYTwkLAADWwPqQitC70VCvfVBdt6V2tpcnASobaby7oABw53zqMEujQ51h3EBO7tgqMO+SWGXZNqjva8mrjvAUU0uoKRINEeS14CxPXiu051v4wYEpIGxGMrjTQCm0WnDGiqvxQFQHQFVzHhQ8JHWkJ6CAEwIECDJujqgGMkCWGphUhZq3gyoxAPu+HwbsrfRoIFJBqjmYrTR2In6oTfqGChe0qJ0SOCxK2KgmElgGYI1S6l3ZmoyCbr8qAesIDka3MKMgCZXSY0CPgmVRYt39ldu1TkvJ+zplNDih0ApAHjhNCpaLhVrY+upSJwUABCVNW5TznmZeShI26M4MEznuxi0JMI1d3nvM+PDKOED06oURkCPVIoFLi6oGlLK+rI3AAN+9g3IDDQqZbGKwaSsyyAB0mdtNg1rOqPkE6EDUGwV+MDYMs0yqbrh7IJmLuyq8-VJhUBAhxoTVQFVhFqgr3gV5USmnMNUUWv8Z7JBXthPe6q9R6Tqb-YhgTImL3gpvY+ziNVlNdq-ZIJ11Vm1tl7R4gdI6PFoSw-BtkIiICZaI-jeDlH1R+aC2Fkg0nBGiP1XQnpiyRjOPcaXqc-jPFBNSGE6JyjFpNuFindmQswxNOmaMyeRTKEbOuDs7uxzUZnOYnqI4DzGm2dUSWOXXyZWSVktZQ1goTWWtnova+IVpHOfqw41xrwfOcvTq0yafrfdAhVcHRmkdYx87jpIKhlhhYFc5UCJZ-XpXUAVf9+m9FHPqzqz9WJ8PDibTpjLOzJdRVVBUC7lK7NgX-QkD7l6YMKWeR8itKuCCvBpw0XokxFi7EuK8VfNUIVZcJUkdItKJlpKWWWij7BblvL-2AYpyB4owrRXjdNIgEsV52nAEn6YoEFOHcGtiOK4jmzye0KHZncrqqGdCxyCLMW+rRVD+t09T7V+mdiwNzS0OGkd7jcmwCabKIs2py82yAJIi2hq-eJuCeAo3+zWLWumfcDuO2IkqeXOGeAoYwowYaWmAOJAT21OyOqq32a8MOD2vkQOkQIOYOI4dOUONUv2LO9U8O6EBBtOOO6O1MWO547BeO+0h0x0jBJuQGzgrBNBl+PEAs1+t+jEghIkJ+zg6aZBceBG8eFW8h7AyejuaepGKImeow8wDis+tC0sFQjcFQuAvePmvk3Yawthdh9hDhjhTh9h4U5SqhMBBAmkVGSAqgrAykvKT2yA4aq29UkqckLImcGkGMqIpysQgRsQ1QlIX4QYpaR+ocmYEAJYO84R1qBAMKxB68m87sqRch0BF+n2BRnBBqdWFuW6Vu5WzWKER67W9+JA5WGRJYKe4uaBZGeh+cDiPE6AakeIPQwElIlhH+VEpu5WlRuyKCI2U0AoHR8gN88wiSXRTuOh1cAoqG-RJAAABjaNKBfDmOAmkMsasV-Opp4MXsMVkJKCBNKLaOhNUPsSUViiRptlNNMgVJnHAK6FkCyKgNCoIvsfDCZOoLSAAkAtAH2JKF+CAAxlysFKFGEjAJ4NUCTMgGceEUsPsTgRDJbrgBOs0WdvVBPkrtZhCF+nOOrsiE5oDK5rrg4nBomCidgEiDgrWH2kQXAiQZjp5rgRQLgHQIiACc3jUZaHFDyrIUsO8VoT0ZKGJl8W0mEsAIWJZiUUbr5nSM4XqfqQaY4aei1AaO4VEd4TBH4UGLyhQVkEEStsgR8ZsuETvOaTETaS1HaQkUkYmCkZMUVGUZDmkvQXVNUaPvVnURBA0S1qSRsdoegbsQMUMcOCMQ8eMX3phpKt4kGFWiGJbCpFIPjFroEPsUIGEuhPyGcUGRoh5L9niWpv6abi6XAZ4k4t4r4ugMgH0uMkSHYkgbgZKsEL8cOOKSyJKVGoIG4GEN6v6VMWUXQRkkgvMcQjygqsLsqkOVytvicXvqKgfstnGT0boTsaMHsbEDaHXCcYXrcSmfcWMU8eGIuBmRDJKiqT8ZmqOVCpkaCeCYjJydULaVAJie0NiWkLifiaZkSSSXRMeh4hScOPmYWMKaKVhAVHKbOQqenpfHAMqSZKqVEBqZ2PKUbmDNMQuTkALnokUT3ooIWuEStqgVhceYmShIMXcaMY8RMZhpSN3AUHQP6W0jXI6SJMhR+YCaRubpaDru9sRR3N+SEWDIxVsXoVgShEcRJWPm6PiDeQ6lABYc+fVCRaESRleSPqHC2SEtMscpEi0NEk4LEmaBzg0MOuQHxTwhjEuhiO5VeYEMhd5TLGAI2fOcGYuVkj3iuQKGuUqksQFa0fuQxd0UxdsSxYccGFeWcScdcUXiXriHeY8QZI+a8fKa+Xhe+X8Z+cCd+QKGCUZBCbSP+YBcBaTDiUiniQSeDFBU0TBe1koVRPBTJuZnjIhcrtSbZrSROhrmiIydJR5r1a5SKYEALkLkqiJmJshbKfKUpehEqWNqVWqYRTlFqcbiJDYYaWdQaSQAzNdMzCyO9L1HpewOgGaZ4U-rEMwewKEjMtEP2aRYGZ9rjlTJjgauUajgDbtHwUTiTphcpSeWeWxbeRxemfKU2eGayhPluTyrEHBDAImO0qBuitGShO6GQK2C0JyBAA7ltb0TsbnA4tpPCC0M4BlDKJwK+OgGTQFMHIAozRiFxWtiZbFZnMvuWWvogFEFvpjTuYvihE8lZREsUEFRVmDQgkueFaNicQlZsQmaeYWKlccbFRlQFVlTeblYjQ+S8W8f6ZKoQAgNyjvBxkSnTsrRDQIQJYgNyhNgmP6G0HiihL+aUG7bbRaBNp4ZZDvLEMgH1NGDQn2J9dZQrZhjbR7SvggFkS1ofvVEncHSnaLRvrBJlrypydgOOL4MyWHBHFHDHHHAnDkEnCnGnPKVnZaDnfIOvuLR5ZLQFR4hrVbZ8XtVEGJc3pVTCk3R6ugFFV+N6l7v1SQNjbjRyhOsTaTeTcEkXdyYEDwYDXVOpuhZmSRpjPPMPpXv3cANUMTWzRzRAIrQKOVgffmIeUlWJhMOMLrVdUzCzHdZ9I9aRqgFXhBK7FzWaIDIKGcW+WqYJtRnKUVb3ZsjfLZQcMim6M+F-DvHRGQLUEA9UG6jGDluwMYjoBfeTVeMFt6vKXfejLNtGMSDOZhk+AgPKHjIutQ-KTxY6C1DvG0oijA6HLZT4OwCIDmZnN6hnIeMJXOYni1A-RhRQTvP8uPOwBhYJQpeDHQww7w7xsXGhg4rIKKP3AZWDOplNVkWIydXSO2tMiKSRLo03EuBDEZWDEoyY1ROQ8TNYwKJo6pdZtY7gPo4ZXJcY7gXkmY2ABYzXOozY7gfYyJIRrQ8+HjOWIxH2E4NRJ4JCOGLyspgxh4iqkkxAKxso75I44E7mIfR5TQDky4NUEkHAPKYbv4ymE41Y3wwI4IrU2pphrvWDC4-E7gIky4Ck1NAFggBk0ulk4WBU04PkyY0U5DEg-Q+GGU7gBM5aNU204Y3kQ08U+Ey0zQ3Yx0-Kaows3nn08k6k0M7yuEx4ts0MfIGQ3PPmD0ycxAAM2k8M60NY1c9Yy0wc3E8c7ky8+c7EOGPJp880zc3c1jIuH8-02c4Am88C5gKC6aN8-6UpS7rzm4h7tLqZggSZsXAYW6KzezeTTHnZSyJ09E8dVRFTcxTraxcmRgEYHzWphhjE7YL-RCsA9tThbtd8ftdLIdSEZKhPvbXgyQC+hyjlAKJqWztbchELSfWyq+pylPlSRcGNfCAZabrOPCOiujQXWq2AjCLSYWDqwomzmi2K67jxqcmA1ENUMhV7ri4EHa6fbi5Hsq5WrvUbqsGsBsHoNsGzOIAyIcJYGoMwHYEAA)**
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
