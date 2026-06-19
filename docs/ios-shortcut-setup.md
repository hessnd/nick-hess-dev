# Posting the Song of the Day from iOS

The fastest way to set the [Song of the Day](https://nickhess.dev/song) is an iOS
Shortcut that posts a shared Apple Music link straight to `POST /api/song`. Once
built, posting is a single tap from the Apple Music share sheet.

Apple doesn't allow distributing a ready-made `.shortcut` file (they're signed
per-device), so this is a one-time manual build — about 3 minutes. For desktop
posting, use [`scripts/post-song.sh`](../scripts/post-song.sh) instead.

## Prerequisites

- `SONG_API_SECRET` is set in Vercel **production** and the site is redeployed.
- You have the secret value handy (1Password item `SONG_API_SECRET`).
- The endpoint is live: `https://www.nickhess.dev/api/song`.

## Build the Shortcut

1. Open the **Shortcuts** app → tap **+** (top right) to create a new shortcut.
2. Tap the name at the top → **Rename** → **Song of the Day**. (This exact name
   is what appears in the share sheet.)
3. Add each action below in order. Tap **Search Actions**, type the name, tap it,
   then configure:

   | Order | Search for | Configuration |
   |-------|-----------|---------------|
   | 1 | **Get URLs from Input** | Leave input as **Shortcut Input**. Extracts a clean URL whether Music shares a link or text. |
   | 2 | **Text** | Paste your secret as the entire contents. |
   | 3 | **Get Contents of URL** | See detailed config below. |
   | 4 | **Get Dictionary Value** | Get **Value** for key **`song`** in **Contents of URL**. |
   | 5 | **Show Notification** | `✓ Posted: ` then insert the **Dictionary Value** variable. |

4. **Configure action 3 (Get Contents of URL)** — tap **Show More** to expand:
   - **URL:** `https://www.nickhess.dev/api/song`
   - **Method:** `POST`
   - **Headers** (Add new header twice):
     - `Authorization` → type `Bearer ` (trailing space), then insert the
       **Text** variable from action 2.
     - `Content-Type` → `application/json`
   - **Request Body:** `JSON` → Add new field → type **Text**, key **`url`**,
     value = the **URLs** variable from action 1.

## Enable the share sheet

5. Tap the **ⓘ** (info icon) at the bottom of the editor.
6. Turn on **Show in Share Sheet**.
7. Tap **Share Sheet Types** → turn **off everything except URLs and Text** → back.
8. Tap **Done** to save.

## First run (grant permission)

The first use shows a one-time prompt — *"Song of the Day" would like to send
data to nickhess.dev*. Tap **Allow** (or **Always Allow** so it never asks again).

## Posting a song

1. In **Apple Music**, open the song (or tap **•••**).
2. Tap **Share** → scroll the app row → tap **Song of the Day**.
3. You'll see **✓ Posted** with the track title.

## Troubleshooting

- **No notification / nothing happens** — re-check action 3's URL and that the
  `Authorization` header is `Bearer ` + the secret *variable* (not literal text).
- **Notification shows "Posted: " with no title** — the request failed. Re-run the
  same link from a laptop with `./scripts/post-song.sh "<url>"`; it prints the
  server's exact error message.
- **Shortcut missing from the share sheet** — re-check the share sheet types
  (URLs + Text must be enabled).

## How auth works

The endpoint accepts a single writer authenticated by a bearer token
(`SONG_API_SECRET`). The token lives in two places only: 1Password (your copy,
used by the shell script) and inside this Shortcut (used on-device). The secret
is never committed to the repo and never leaves the device except over HTTPS to
your own API.
