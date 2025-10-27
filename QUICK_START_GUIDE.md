# 🚀 Quick Start Guide

Get your EME 5608 Course Assistant on GitHub in 5 minutes!

## Step 1: Prepare Your Environment (1 min)

Make sure you have:
- [x] Git installed ([download](https://git-scm.com/downloads))
- [x] GitHub account ([sign up](https://github.com/signup))
- [x] This project code

## Step 2: Check Your Files (1 min)

From your terminal in the project directory, verify everything is ready:

```bash
# Check if git is installed
git --version

# Check if node modules exist (if not, run: npm install)
ls node_modules

# Verify your source code is here
ls client server shared
```

You should see all three directories.

## Step 3: Push to GitHub (3 mins)

### Method A: Using GitHub CLI (Fastest) ⚡

```bash
# Install GitHub CLI first if you haven't
# macOS: brew install gh
# Windows: winget install --id GitHub.cli

# Login to GitHub
gh auth login

# Initialize, commit, and push in one go!
git init
git add .
git commit -m "Initial commit: EME 5608 Course Assistant"
gh repo create eme5608-course-assistant --public --source=. --push
```

Done! Your repo is live at: `https://github.com/YOUR-USERNAME/eme5608-course-assistant`

### Method B: Using GitHub Website (Traditional) 🌐

**Create repo on GitHub first:**
1. Go to [github.com/new](https://github.com/new)
2. Name it: `eme5608-course-assistant`
3. **Don't** initialize with README
4. Click "Create repository"

**Push your code:**
```bash
git init
git add .
git commit -m "Initial commit: EME 5608 Course Assistant"
git remote add origin https://github.com/YOUR-USERNAME/eme5608-course-assistant.git
git push -u origin main
```

Replace `YOUR-USERNAME` with your GitHub username!

## Step 4: Verify & Celebrate! 🎉

Visit your repository on GitHub and check:
- ✅ README.md displays nicely
- ✅ All folders are there (client, server, shared)
- ✅ .env is NOT visible (good!)
- ✅ License shows "MIT"

## What's Next?

### Share Your Project
```
https://github.com/YOUR-USERNAME/eme5608-course-assistant
```

### Deploy It Live

**Quick Deploy to Replit:**
1. Go to [replit.com](https://replit.com)
2. Click "Create Repl" → "Import from GitHub"
3. Paste your repo URL
4. Add secrets: `GEMINI_API_KEY`, `SESSION_SECRET`
5. Click Run!

**Other Options:**
- See **DEPLOYMENT.md** for Railway, Render, Vercel, etc.

### Customize It

Edit these files:
- `client/src/components/CourseSidebar.tsx` - Course info
- `client/src/index.css` - Colors and theme
- `server/pdfExtractor.ts` - PDF path
- `README.md` - Project description

### Keep Updating

```bash
# After making changes
git add .
git commit -m "feat: add new feature"
git push
```

## Troubleshooting

**Error: "permission denied"**
```bash
# You need to authenticate
gh auth login
# Or use HTTPS with personal access token
```

**Error: "remote origin already exists"**
```bash
git remote remove origin
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
```

**Error: "failed to push"**
```bash
git pull origin main --rebase
git push
```

## Need More Details?

- **GitHub Setup:** See `GITHUB_SETUP.md`
- **Deployment:** See `DEPLOYMENT.md`
- **Contributing:** See `CONTRIBUTING.md`
- **File List:** See `FILES_TO_INCLUDE.md`

## Getting Help

- Open an issue on GitHub
- Check existing issues for solutions
- Read the full documentation in README.md

---

**Success?** Don't forget to:
- Add a description to your repo
- Add topics: `ai`, `chatbot`, `education`, `typescript`
- Star your own repo ⭐ (why not!)
- Share it with your classmates

Happy coding! 🎓
