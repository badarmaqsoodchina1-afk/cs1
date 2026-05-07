# How to Update the Website

You only need to edit files in the **`data/`** folder. Everything else is automatic.

---

## ✏️ Add a new publication (paper)

**File to edit:** `data/publications.bib`

**Step 1:** Open the file on GitHub → click pencil icon (✏️).

**Step 2:** Paste this template at the **TOP** of the file (just under the header comments):

```bibtex
@article{shortkey2026,
  title    = {Your paper title here},
  author   = {Zhang, Chongsheng and Coauthor, Name},
  journal  = {Journal Name},
  volume   = {12},
  number   = {3},
  pages    = {100--200},
  year     = {2026},
  citations = {0}
}
```

**Step 3:** Change these fields:
- **shortkey2026** → unique label like `zhang2026newpaper`
- **title** → paper title
- **author** → list authors as `Last, First and Last, First and ...`
- **journal** → for journal papers (use `booktitle =` for conferences)
- **year** → publication year
- **citations** → optional, just leave `0` for new papers

**Step 4:** Scroll down → **Commit changes**. Done!

> 💡 Prof. Zhang's name is auto-bolded when written as `Zhang, Chongsheng`.

### Example for a conference paper:
```bibtex
@inproceedings{zhang2026new,
  title    = {New paper title},
  author   = {Zhang, Chongsheng and Other, Person},
  booktitle = {Proceedings of CVPR 2026},
  year     = {2026}
}
```

### Optional fields you can add:
```bibtex
  pdf      = {https://link-to-pdf.com/paper.pdf},
  code     = {https://github.com/user/repo},
  url      = {https://paper-website.com},
  doi      = {10.1109/example.2026.123456}
```
These automatically become clickable [PDF] [Code] [Link] [DOI] buttons.

---

## 📰 Add a news item

**File to edit:** `data/news.txt`

**Step 1:** Open the file → click pencil ✏️.

**Step 2:** Add ONE LINE at the **TOP** (under the comments):

```
2026-05 | Your news here. Use <em>italic</em> or <a href="https://link.com">links</a>.
```

Format: **`YYYY-MM | news text`** (just one line, no fancy formatting needed).

**Step 3:** Commit. Done.

---

## 📄 Add or update the CV

**File to add/replace:** `data/CV.pdf`

**Step 1:** Make sure your CV file is named exactly **`CV.pdf`** (capital letters matter).

**Step 2:** Go to the `data/` folder on GitHub → **Add file** → **Upload files**.

**Step 3:** Drag in `CV.pdf`. Commit.

The "📄 Download CV" button on the homepage will automatically link to it.

To update the CV later, just upload a new `CV.pdf` (same name) — it overwrites the old one.

---

## 📷 Change the profile photo

**File to replace:** `images/profile.jpeg`

Just upload a new photo with the same filename `profile.jpeg`. It overwrites the old one automatically.

---

## ⚠️ What NOT to touch

- The `js/` folder (this is the magic that loads everything)
- The `.html` files (only edit if you want to change the bio text on the homepage, or section descriptions on Research)
- The `css/` folder (only if you want to change colors — instructions in README.md)

---

## 🐛 If something breaks

1. Go to your repo → click **"commits"** (top of file list)
2. Find the last working version
3. Click on it, then **"Revert"** or just edit the broken file and fix it

Nothing is permanent — GitHub remembers every version.

---

## 🆘 Common problems

**"My new paper isn't showing up"**
→ Check that the `year` field is filled in correctly. Check that the BibTeX has `}` at the end of the entry. Wait 1 minute and hard-refresh (Ctrl+Shift+R).

**"News date format is weird"**
→ Make sure it's `YYYY-MM` then a space, then `|`, then a space, then text.

**"CV button gives 404"**
→ The `CV.pdf` file isn't in the `data/` folder yet. Upload it.

**"I see 'Loading publications...' forever"**
→ The BibTeX file has a syntax error. Check that every entry ends with `}` and every field has `=` and `{...},`.
