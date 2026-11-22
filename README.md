# Portfolio site (GitHub Pages)

A static site, no build step. Three looks are built in (3 a.m., album, tape); visitors can switch with the small buttons at the top.

## Put it online (free)

1. Create a GitHub account and click **New repository**.
   - Name it `yourusername.github.io` for the address `https://yourusername.github.io`, or any name for `https://yourusername.github.io/that-name`.
   - Make it **Public**.
2. On the new repository page choose **uploading an existing file** and drag in everything from this folder (`index.html`, `style.css`, `script.js`, `projects.js`, `assets/`). Click **Commit changes**.
3. Open **Settings > Pages**. Under **Build and deployment**, set Source to **Deploy from a branch**, branch **main**, folder **/ (root)**, then Save.
4. Wait one to two minutes. The address appears at the top of that Pages screen.

## Make it yours

- **Your name, bio, email, links:** open `index.html` and replace everything in [square brackets], plus `you@example.com`, the Vimeo and Instagram links, and the page `<title>`.
- **Projects:** edit `projects.js`. Add a YouTube or Vimeo link in `video` and the card becomes playable. Cards with no link show "video soon".
- **Thumbnails:** put images in `assets/thumbs/` and point `thumb` at them, e.g. `"assets/thumbs/static-lullaby.jpg"`. Aim for about 1200 px wide, under 300 KB each. Grade them in your look (muted, grainy) before uploading.
- **Colours and fonts:** the top of `style.css` holds each theme's palette.
- **Keep only one look:** in `index.html` delete the whole `<div class="themes">` block and change `data-theme="night"` on the first line to `album` or `tape`.

## Videos

Upload edits to YouTube (unlisted works) or Vimeo and paste the link. Only YouTube and Vimeo links are accepted. Fan edits use footage you don't own, so keep the `credit` line filled in.
