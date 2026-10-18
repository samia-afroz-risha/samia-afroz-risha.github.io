# Samia Afroz Risha — Portfolio

Personal portfolio site. Plain HTML/CSS/JS, no build step — works directly on GitHub Pages.

## Folder structure

```
samia-portfolio/
├── index.html                      # all page content (edit text here)
├── css/
│   └── style.css                   # colors, layout, light/dark theme
├── js/
│   └── main.js                     # typing effect, theme toggle, filters, node-network animation
├── assets/
│   ├── img/
│   │   └── favicon.svg             # browser tab icon
│   └── projects/                   # gallery screenshots (.jpg or .png)
│       ├── irrigation-robot.png
│       ├── microprocessor.png
│       ├── victim-alert.png
│       ├── pcosync.png
│       ├── movie-ticket.png
│       └── opengl-games.png
└── README.md
```

## Before publishing — edit these

- `index.html` → search `TODO`:
  - Microprocessor project description
- Each project's `Code` link → point to the real repo (currently your GitHub profile).

## Deploy on GitHub Pages

1. Sign in to GitHub as **Samia-Afroz**.
2. New repository → name it exactly **`samia-afroz.github.io`** → Public → Create.
3. Upload files (pick A or B):
   - **A. Browser:** repo page → *Add file → Upload files* → drag the *contents* of `samia-portfolio/`
     (index.html must be at the repo root, not inside a subfolder) → *Commit changes*.
   - **B. Git:**
     ```bash
     cd samia-portfolio
     git init
     git add .
     git commit -m "Initial portfolio"
     git branch -M main
     git remote add origin https://github.com/Samia-Afroz/samia-afroz.github.io.git
     git push -u origin main
     ```
4. Repo → *Settings → Pages* → Source: **Deploy from a branch** → Branch: `main`, folder `/ (root)` → Save.
5. Wait 1–3 minutes → open **https://samia-afroz.github.io**

Different repo name (e.g. `portfolio`) works too; URL becomes `https://samia-afroz.github.io/portfolio/`.

## Updating later

Edit file → commit/push (or upload again) → site refreshes in ~1 minute. Hard refresh (Ctrl+F5) if old version shows.
