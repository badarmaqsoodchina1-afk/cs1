# Prof. Chongsheng Zhang — Academic Homepage

Clean, professional homepage. **Auto-updates** when you edit data files.
No HTML knowledge needed for everyday updates.

## 📁 What's inside

```
zhang-homepage/
├── index.html             ← Home page (don't edit)
├── research.html          ← Research themes
├── publications.html      ← Publications page (don't edit — auto-loads from BibTeX)
├── team.html, services.html, awards.html
├── css/style.css          ← Colors, fonts (rarely edited)
├── images/profile.jpeg    ← Profile photo
├── js/                    ← Code that loads BibTeX (don't edit)
└── data/                  ← ⭐ THIS IS WHAT YOU EDIT ⭐
    ├── publications.bib   ← Add/remove papers here (BibTeX format)
    ├── news.txt           ← Add/remove news items here
    └── CV.pdf             ← Drop the CV here for download button
```

## ⚡ How to edit (super easy)

You only ever need to touch **3 files** in the `data/` folder:

| To update | Edit this file | How |
|---|---|---|
| Add a new paper | `data/publications.bib` | Paste a BibTeX entry at the top |
| Add a news item | `data/news.txt` | Add one line at the top |
| Update the CV | `data/CV.pdf` | Replace the PDF |

That's it. The website regenerates automatically in ~1 minute after committing.

See **`HOW-TO-UPDATE.md`** for copy-paste examples.

## 🚀 First-time deployment to GitHub Pages

If this is your first time setting up:

1. Go to **https://github.com** and sign in.
2. Create a new repository named: **`USERNAME.github.io`** (replace USERNAME with your GitHub username — example: if username is `czhang1`, repo is `czhang1.github.io`).
3. Set **Public** ✓, click **Create repository**.
4. Click **Add file** → **Upload files** → drag in **everything** from this folder.
5. Scroll down → **Commit changes**.
6. Go to **Settings** → **Pages** → confirm Source is **"Deploy from a branch / main / root"**.
7. Wait ~2 minutes. Your site is live at `https://USERNAME.github.io` 🎉

## 🔄 To update an EXISTING site

You already have the site live. To replace it with this new version:

1. Go to your repo on GitHub.
2. **Delete the old files** (or skip this — uploads will overwrite them).
3. Click **Add file** → **Upload files** → drag in the **new** files from this folder.
4. **Commit changes**.
5. Wait ~1 minute, hard-refresh your site (Ctrl+Shift+R).

> ⚠️ Important: Don't forget to upload the `data/` and `js/` folders — those are new and required for the auto-loading magic to work.

## 📷 To replace the photo

Replace `images/profile.jpeg` with the new photo, keeping the same filename.

## 🎨 To change colors

Open `css/style.css`, look at the top section (`:root { ... }`). Change a color value, save. All pages update.
