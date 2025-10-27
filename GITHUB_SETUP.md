# GitHub Setup Guide

Follow these steps to push this project to your GitHub repository.

## Prerequisites

- Git installed on your computer
- GitHub account created
- GitHub CLI (optional but recommended)

## Option 1: Using GitHub Web Interface (Easiest)

### Step 1: Create a New Repository on GitHub

1. Go to [GitHub](https://github.com)
2. Click the "+" icon in the top right
3. Select "New repository"
4. Fill in the details:
   - **Repository name:** `eme5608-course-assistant` (or your preferred name)
   - **Description:** "AI-powered chatbot for EME 5608 course with textbook citations"
   - **Visibility:** Choose Public or Private
   - **DO NOT** initialize with README, .gitignore, or license (we already have these)
5. Click "Create repository"

### Step 2: Push Your Code

GitHub will show you commands to run. Use the "push an existing repository" option:

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit your code
git commit -m "Initial commit: EME 5608 Course Assistant"

# Add GitHub as remote (replace YOUR-USERNAME and YOUR-REPO)
git remote add origin https://github.com/YOUR-USERNAME/eme5608-course-assistant.git

# Push to GitHub
git branch -M main
git push -u origin main
```

**Important:** Replace `YOUR-USERNAME` with your GitHub username!

### Step 3: Verify

1. Refresh your GitHub repository page
2. You should see all your files uploaded
3. Check that README.md displays correctly

---

## Option 2: Using GitHub CLI (Recommended)

### Step 1: Install GitHub CLI

**macOS:**
```bash
brew install gh
```

**Windows:**
```bash
winget install --id GitHub.cli
```

**Linux:**
```bash
# See: https://github.com/cli/cli/blob/trunk/docs/install_linux.md
```

### Step 2: Authenticate

```bash
gh auth login
```

Follow the prompts to authenticate with your GitHub account.

### Step 3: Create and Push

```bash
# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: EME 5608 Course Assistant"

# Create GitHub repo and push
gh repo create eme5608-course-assistant --public --source=. --push
```

Or for a private repository:
```bash
gh repo create eme5608-course-assistant --private --source=. --push
```

---

## Option 3: From Replit to GitHub

### Step 1: Connect Replit to GitHub

1. In your Replit project, click the version control icon (Git branch icon)
2. Click "Connect to GitHub"
3. Authorize Replit to access your GitHub
4. Create a new repository or connect to an existing one

### Step 2: Commit and Push

1. Stage all your changes in the Replit Git panel
2. Write a commit message: "Initial commit"
3. Click "Commit & Push"

---

## After Pushing to GitHub

### 1. Update Repository Settings

Go to your repository settings and:

- Add a description
- Add topics: `ai`, `chatbot`, `education`, `typescript`, `react`, `gemini`
- Add a website (if deployed)

### 2. Configure Secrets (for GitHub Actions - Optional)

If you want to set up CI/CD:

1. Go to Settings → Secrets and variables → Actions
2. Add repository secrets:
   - `GEMINI_API_KEY`
   - `SESSION_SECRET`

### 3. Add Branch Protection (Optional)

For collaborative projects:

1. Go to Settings → Branches
2. Add a branch protection rule for `main`
3. Enable:
   - Require pull request reviews
   - Require status checks to pass

### 4. Enable GitHub Pages (Optional)

If you want to host documentation:

1. Go to Settings → Pages
2. Select source: `Deploy from a branch`
3. Choose branch: `main` and folder: `/docs`

---

## Keeping Your Repository Updated

### After Making Changes

```bash
# Check what changed
git status

# Add specific files
git add client/src/components/NewComponent.tsx

# Or add all changes
git add .

# Commit with a descriptive message
git commit -m "feat: add new component for feature X"

# Push to GitHub
git push
```

### Pulling Changes (if working with others)

```bash
# Get latest changes
git pull origin main
```

---

## Best Practices

### Commit Messages

Use conventional commits:

```bash
git commit -m "feat: add chat export feature"
git commit -m "fix: resolve timestamp serialization bug"
git commit -m "docs: update deployment guide"
git commit -m "refactor: extract PDF utilities"
```

### .gitignore

Already set up to exclude:
- `node_modules/`
- `.env` (secrets)
- `dist/` (build files)
- Replit-specific files

### Branches

For new features:

```bash
# Create and switch to a new branch
git checkout -b feature/new-feature-name

# Work on your feature...

# Push the branch
git push -u origin feature/new-feature-name

# Create a pull request on GitHub
```

---

## Troubleshooting

### Error: "remote origin already exists"

```bash
# Remove existing remote
git remote remove origin

# Add your GitHub remote
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
```

### Error: "failed to push"

```bash
# Pull first to sync
git pull origin main --rebase

# Then push
git push origin main
```

### Large Files Warning

GitHub has a 100MB file size limit. If you have large files:

1. Use Git LFS for large files:
   ```bash
   git lfs install
   git lfs track "*.pdf"
   git add .gitattributes
   ```

2. Or exclude large PDFs and document where to get them

---

## Making Your Repository Public

### What to Check Before Going Public

- [ ] Remove any API keys from code
- [ ] Environment variables are in `.env` (not committed)
- [ ] No personal information in commits
- [ ] README is complete and helpful
- [ ] License is appropriate
- [ ] .gitignore excludes sensitive files

### How to Make Public

1. Go to Settings
2. Scroll to "Danger Zone"
3. Click "Change visibility"
4. Select "Public"
5. Confirm

---

## Cloning Your Repository

Others (or you on a different machine) can clone with:

```bash
git clone https://github.com/YOUR-USERNAME/eme5608-course-assistant.git
cd eme5608-course-assistant
npm install
```

Then follow the README.md setup instructions.

---

## Quick Reference

```bash
# Check status
git status

# Add files
git add .

# Commit
git commit -m "message"

# Push
git push

# Pull
git pull

# Create branch
git checkout -b branch-name

# Switch branch
git checkout main

# View remote
git remote -v
```

---

## Need Help?

- GitHub Docs: https://docs.github.com
- Git Guide: https://git-scm.com/doc
- GitHub Community: https://github.community

---

Happy coding! 🚀
