# Oinama landing

Static site: index.html, style.css, app.js, _headers. No build step.

Deploy: Cloudflare Pages or Netlify (uses `_headers` for CSP and security headers) or GitHub Pages
(GitHub Pages ignores `_headers`, so the CSP is not applied there).

Download button: set `DOWNLOAD_URL` at the top of `app.js` to the public https link of the .exe.
