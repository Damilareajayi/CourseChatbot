# Deployment Guide

This guide covers deploying the EME 5608 Course Assistant to various platforms.

## Table of Contents
- [Environment Variables](#environment-variables)
- [Deploying to Replit](#deploying-to-replit)
- [Deploying to Vercel](#deploying-to-vercel)
- [Deploying to Railway](#deploying-to-railway)
- [Deploying to Render](#deploying-to-render)
- [Deploying to Heroku](#deploying-to-heroku)
- [Docker Deployment](#docker-deployment)

## Environment Variables

All platforms require these environment variables:

| Variable | Description | Example |
|----------|-------------|---------|
| `GEMINI_API_KEY` | Google Gemini API key | `AIza...` |
| `SESSION_SECRET` | Random secret for sessions | `random-string-here` |
| `NODE_ENV` | Environment mode | `production` |

## Deploying to Replit

### Method 1: Import from GitHub

1. Go to [Replit](https://replit.com)
2. Click "Create Repl"
3. Select "Import from GitHub"
4. Paste your repository URL
5. Click "Import from GitHub"

### Method 2: Manual Setup

1. Create a new Node.js Repl
2. Upload your project files
3. The `.replit` file will be auto-detected

### Configure Secrets

1. Click the lock icon (🔒) in the sidebar
2. Add secrets:
   - `GEMINI_API_KEY`: Your Google Gemini API key
   - `SESSION_SECRET`: A random string

### Run

Click the "Run" button. The app will be available at your Repl URL.

---

## Deploying to Vercel

Vercel is great for frontend deployments but requires serverless function setup for the backend.

### Prerequisites
- Vercel account
- Vercel CLI: `npm install -g vercel`

### Setup

1. **Create `vercel.json`:**

```json
{
  "version": 2,
  "builds": [
    {
      "src": "server/index.ts",
      "use": "@vercel/node"
    },
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "server/index.ts"
    },
    {
      "src": "/(.*)",
      "dest": "/dist/$1"
    }
  ],
  "env": {
    "NODE_ENV": "production"
  }
}
```

2. **Update `package.json`:**

```json
{
  "scripts": {
    "vercel-build": "npm run build"
  }
}
```

3. **Deploy:**

```bash
vercel
```

4. **Set Environment Variables:**

```bash
vercel env add GEMINI_API_KEY
vercel env add SESSION_SECRET
```

5. **Redeploy:**

```bash
vercel --prod
```

---

## Deploying to Railway

Railway provides an easy deployment with automatic scaling.

### Using Railway CLI

1. **Install Railway CLI:**

```bash
npm install -g @railway/cli
```

2. **Login:**

```bash
railway login
```

3. **Initialize:**

```bash
railway init
```

4. **Set Environment Variables:**

```bash
railway variables set GEMINI_API_KEY=your_key_here
railway variables set SESSION_SECRET=your_secret_here
railway variables set NODE_ENV=production
```

5. **Deploy:**

```bash
railway up
```

### Using Railway Dashboard

1. Go to [Railway](https://railway.app)
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Choose your repository
5. Add environment variables in the Variables tab
6. Railway will auto-deploy

---

## Deploying to Render

Render offers free hosting with automatic deployments.

### Setup

1. Go to [Render](https://render.com)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name:** `eme5608-assistant`
   - **Environment:** `Node`
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm start`

5. Add Environment Variables:
   - `GEMINI_API_KEY`
   - `SESSION_SECRET`
   - `NODE_ENV=production`

6. Click "Create Web Service"

### Custom Domain (Optional)

1. Go to Settings → Custom Domain
2. Add your domain
3. Update DNS records as instructed

---

## Deploying to Heroku

### Prerequisites
- Heroku account
- Heroku CLI: `npm install -g heroku`

### Setup

1. **Create `Procfile`:**

```
web: npm start
```

2. **Login to Heroku:**

```bash
heroku login
```

3. **Create App:**

```bash
heroku create eme5608-assistant
```

4. **Set Environment Variables:**

```bash
heroku config:set GEMINI_API_KEY=your_key_here
heroku config:set SESSION_SECRET=your_secret_here
heroku config:set NODE_ENV=production
```

5. **Deploy:**

```bash
git push heroku main
```

6. **Open App:**

```bash
heroku open
```

---

## Docker Deployment

### Create Dockerfile

```dockerfile
FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Expose port
EXPOSE 5000

# Set environment to production
ENV NODE_ENV=production

# Start the server
CMD ["npm", "start"]
```

### Create `.dockerignore`

```
node_modules
dist
.env
.git
.gitignore
README.md
*.log
tmp/
```

### Build and Run

```bash
# Build image
docker build -t eme5608-assistant .

# Run container
docker run -p 5000:5000 \
  -e GEMINI_API_KEY=your_key \
  -e SESSION_SECRET=your_secret \
  eme5608-assistant
```

### Docker Compose

Create `docker-compose.yml`:

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "5000:5000"
    environment:
      - GEMINI_API_KEY=${GEMINI_API_KEY}
      - SESSION_SECRET=${SESSION_SECRET}
      - NODE_ENV=production
    restart: unless-stopped
```

Run with:

```bash
docker-compose up -d
```

---

## Post-Deployment Checklist

- [ ] Environment variables are set correctly
- [ ] PDF file is included in the deployment
- [ ] HTTPS is enabled (most platforms do this automatically)
- [ ] Custom domain is configured (if needed)
- [ ] Application loads without errors
- [ ] PDF extraction works (test with first question)
- [ ] Chat history persists during the session
- [ ] Page references display correctly

## Troubleshooting

### PDF Not Found Error

**Problem:** "Textbook PDF not found"

**Solution:** Ensure the PDF is in `attached_assets/` and the path matches in `server/pdfExtractor.ts`

### Build Failures

**Problem:** Build fails during deployment

**Solutions:**
- Check Node.js version (should be 18+)
- Verify all dependencies are in `package.json`
- Check build logs for specific errors

### Memory Issues

**Problem:** Application crashes due to memory

**Solutions:**
- PDF extraction is memory-intensive
- Increase memory allocation on your platform
- For Railway/Render: upgrade to a paid plan
- For Vercel: use Pro plan for more memory

### Session Storage Lost

**Problem:** Chat history disappears on restart

**Solution:** Current implementation uses in-memory storage. To persist:
1. Add a database (Postgres, MongoDB, etc.)
2. Update `server/storage.ts` to use the database
3. Run migrations to create tables

---

## Performance Optimization

### For Production

1. **Enable Compression:**

Add to `server/index.ts`:
```typescript
import compression from 'compression';
app.use(compression());
```

2. **Add Caching:**

```typescript
app.use(express.static('dist', {
  maxAge: '1d',
  etag: true
}));
```

3. **Use CDN:**

Upload static assets to a CDN (Cloudflare, AWS CloudFront)

4. **Database Migration:**

Replace in-memory storage with PostgreSQL or MongoDB

---

## Monitoring

### Add Logging

Use a logging service:
- [LogRocket](https://logrocket.com/)
- [Sentry](https://sentry.io/)
- [Datadog](https://www.datadoghq.com/)

### Analytics

Track usage with:
- Google Analytics
- Plausible
- PostHog

---

## Security Checklist

- [ ] Environment variables are never committed
- [ ] API keys are stored securely
- [ ] HTTPS is enforced
- [ ] CORS is properly configured
- [ ] Rate limiting is implemented (optional)
- [ ] Input validation is in place

---

For more help, open an issue on GitHub or consult your platform's documentation.
