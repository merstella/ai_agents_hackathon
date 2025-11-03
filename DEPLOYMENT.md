# Deployment Guide for AI Agents Banking Application

## Architecture Overview

This application consists of two main parts:
1. **Frontend (Next.js)** - React application with API routes
2. **Backend (Python Agents)** - Multiple AI agent services

## Issues with Netlify-Only Deployment

❌ **Netlify alone cannot host this application** because:
- The frontend API routes require backend Python services running on ports 8081-8090
- Netlify is a static/JAMstack host and cannot run Python backend services
- The agents need to be accessible from the internet, not just `localhost`

## Recommended Deployment Strategy

### Option 1: Split Deployment (Recommended)

#### Frontend on Netlify
1. Deploy the Next.js frontend to Netlify
2. Configure environment variables in Netlify dashboard

#### Backend on Cloud Provider
Deploy Python agents to one of these services:
- **Google Cloud Run** (recommended for AI workloads)
- **Railway** (easy deployment)
- **Render** (free tier available)
- **Fly.io** (global deployment)

### Option 2: All-in-One Deployment

Deploy everything to a platform that supports both:
- **Vercel** (Next.js + Serverless Functions with Python support)
- **Google Cloud Platform** (App Engine or Cloud Run)
- **AWS** (Amplify + Lambda or ECS)

## Step-by-Step: Netlify + Separate Backend

### 1. Deploy Backend Agents First

Each agent needs to be deployed separately or together:

**Agents to deploy:**
- Chat Agent (port 8090)
- Spending Snapshot Agent (port 8081)
- Perks Snapshot Agent (port 8082)
- Portfolio Snapshot Agent (port 8083)
- Advisors Snapshot Agent (port 8085)

**For each agent (example: spending_snapshot_agent):**

```bash
cd agents/spending_snapshot_agent
# Follow your cloud provider's deployment instructions
```

Get the deployed URL for each agent (e.g., `https://spending-api.your-domain.com`)

### 2. Configure Netlify

#### In Netlify Dashboard:

1. **Build Settings:**
   - Base directory: `frontend`
   - Build command: `npm run build`
   - Publish directory: `frontend/.next`

2. **Environment Variables:**
   Add these in Site settings → Environment variables:
   ```
   NEXT_PUBLIC_CHAT_API_URL=https://your-chat-api.com
   NEXT_PUBLIC_SPENDING_API_URL=https://your-spending-api.com
   NEXT_PUBLIC_PERKS_API_URL=https://your-perks-api.com
   NEXT_PUBLIC_PORTFOLIO_API_URL=https://your-portfolio-api.com
   NEXT_PUBLIC_ADVISORS_API_URL=https://your-advisors-api.com
   ```

3. **Deploy:**
   - Connect your GitHub repository
   - Netlify will automatically deploy when you push changes

### 3. Local Development

Create `frontend/.env.local`:
```env
NEXT_PUBLIC_CHAT_API_URL=http://localhost:8090
NEXT_PUBLIC_SPENDING_API_URL=http://localhost:8081
NEXT_PUBLIC_PERKS_API_URL=http://localhost:8082
NEXT_PUBLIC_PORTFOLIO_API_URL=http://localhost:8083
NEXT_PUBLIC_ADVISORS_API_URL=http://localhost:8085
```

Run locally:
```bash
# Terminal 1: Start all agents
cd agents
make start

# Terminal 2: Start frontend
cd frontend
npm install
npm run dev
```

## Quick Deploy: Railway Example

Railway supports both Python and Next.js:

1. **Deploy Backend:**
   ```bash
   # Install Railway CLI
   npm i -g @railway/cli
   
   # Login
   railway login
   
   # Create new project
   railway init
   
   # Deploy each agent
   cd agents/spending_snapshot_agent
   railway up
   ```

2. **Deploy Frontend:**
   ```bash
   cd frontend
   railway init
   railway up
   ```

3. **Link services:**
   - Set environment variables in Railway dashboard
   - Connect frontend to backend URLs

## Troubleshooting

### "Failed to fetch" errors
- ✅ Ensure all backend services are deployed and running
- ✅ Check environment variables are set correctly
- ✅ Verify backend URLs are accessible (test with curl/Postman)

### Build fails on Netlify
- ✅ Check build logs in Netlify dashboard
- ✅ Ensure `netlify.toml` points to correct directory
- ✅ Verify all dependencies are in `package.json`

### CORS errors
- ✅ Add CORS headers to your backend API responses
- ✅ Whitelist your Netlify domain in backend CORS configuration

## Current Status

✅ **Fixed:**
- All API routes now use environment variables
- Created `netlify.toml` with correct configuration
- Added `.env.example` for reference

❌ **Still Needed:**
- Deploy Python backend agents to a hosting service
- Configure Netlify environment variables with backend URLs
- Update backend agents to accept connections from Netlify domain

## Next Steps

1. Choose a backend hosting provider
2. Deploy all 5 Python agents
3. Get deployment URLs for each agent
4. Configure environment variables in Netlify
5. Test the full application

## Alternative: Frontend-Only Demo

If you want to deploy just the frontend as a demo without backend:
- Remove or mock the API calls
- Use static data instead of live agents
- Add a banner explaining backend is required for full functionality
