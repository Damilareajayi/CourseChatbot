# Files to Include in GitHub Repository

This document lists all the files you should include when pushing to GitHub.

## ✅ Source Code Files

### Frontend (`client/` directory)
```
client/
├── src/
│   ├── components/
│   │   ├── ChatHistory.tsx
│   │   ├── ChatInput.tsx
│   │   ├── ChatMessage.tsx
│   │   ├── CourseSidebar.tsx
│   │   ├── TypingIndicator.tsx
│   │   ├── WelcomeScreen.tsx
│   │   └── ui/ (all shadcn components)
│   ├── pages/
│   │   └── ChatPage.tsx
│   ├── lib/
│   │   ├── queryClient.ts
│   │   └── utils.ts
│   ├── hooks/
│   │   └── use-toast.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
└── index.html
```

### Backend (`server/` directory)
```
server/
├── gemini.ts          # AI integration
├── pdfExtractor.ts    # PDF processing
├── routes.ts          # API routes
├── storage.ts         # Session storage
├── index.ts           # Server entry
└── vite.ts           # Vite integration
```

### Shared (`shared/` directory)
```
shared/
└── schema.ts         # TypeScript types and Zod schemas
```

### Assets (`attached_assets/` directory)
```
attached_assets/
└── Robert, G. et al. (2024). Trends and Issues in Instructional Design 1_1761520802485.pdf
```

**Note:** You can choose to exclude the PDF if it's copyrighted. If excluded, update README.md with instructions on where to obtain it.

## ✅ Configuration Files

### Required
```
package.json           # Dependencies and scripts
package-lock.json      # Lock file (if using npm)
tsconfig.json         # TypeScript config
vite.config.ts        # Vite config
tailwind.config.ts    # Tailwind config
```

### Optional
```
postcss.config.js     # PostCSS config (if exists)
```

## ✅ Documentation Files

```
README.md             # Main documentation
DEPLOYMENT.md         # Deployment guide
CONTRIBUTING.md       # Contribution guidelines
GITHUB_SETUP.md       # GitHub setup instructions
LICENSE               # MIT License
.env.example          # Environment variable template
FILES_TO_INCLUDE.md   # This file
```

## ✅ Git Files

```
.gitignore           # Files to exclude from git
```

## ❌ Files to EXCLUDE

### Automatically excluded by .gitignore
```
node_modules/        # Dependencies (reinstall with npm install)
dist/                # Build output
.env                 # Your secrets (NEVER commit!)
tmp/                 # Temporary files
*.log                # Log files
```

### Replit-specific (exclude from GitHub)
```
.replit              # Replit config
replit.nix           # Nix config
.config/             # Replit configuration
.upm/                # Replit package manager
.cache/              # Cache files
```

## 📋 Checklist Before Pushing

- [ ] All source code files are included
- [ ] `.env` is NOT included (check .gitignore)
- [ ] `.env.example` IS included
- [ ] README.md is complete and accurate
- [ ] No API keys or secrets in the code
- [ ] No Replit-specific files
- [ ] LICENSE file is included
- [ ] .gitignore is properly configured

## 🚀 How to Push

### Option 1: Simple Method

```bash
# From your project root directory

# Initialize git
git init

# Add all files (gitignore will exclude unwanted files)
git add .

# Commit
git commit -m "Initial commit: EME 5608 Course Assistant"

# Add your GitHub repository
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git

# Push
git push -u origin main
```

### Option 2: Using GitHub CLI

```bash
# From your project root directory

# Initialize git
git init

# Add and commit
git add .
git commit -m "Initial commit: EME 5608 Course Assistant"

# Create repo and push (one command!)
gh repo create eme5608-course-assistant --public --source=. --push
```

## 📁 Final Directory Structure on GitHub

```
eme5608-course-assistant/
├── client/
├── server/
├── shared/
├── attached_assets/
├── package.json
├── package-lock.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.ts
├── README.md
├── DEPLOYMENT.md
├── CONTRIBUTING.md
├── GITHUB_SETUP.md
├── LICENSE
├── .gitignore
├── .env.example
└── FILES_TO_INCLUDE.md
```

## 🔍 Verification

After pushing, verify on GitHub:

1. ✅ README.md displays on the repository homepage
2. ✅ All source code folders are visible
3. ✅ `.env` is NOT visible (should be excluded)
4. ✅ node_modules/ is NOT visible (should be excluded)
5. ✅ License badge appears
6. ✅ File count matches expected files

## 📚 Additional Resources

- See **GITHUB_SETUP.md** for detailed GitHub setup instructions
- See **DEPLOYMENT.md** for deployment options
- See **CONTRIBUTING.md** for contribution guidelines

---

**Ready to push?** Follow the instructions in **GITHUB_SETUP.md**!
