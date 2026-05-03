# Cherry Mart Deployment Guide

## Project Structure

- `/client` - Next.js Frontend (deployed to **Vercel**)
- `/server` - Node.js/Express Backend (deployed to **Render**)
- `/admin` - Admin Panel (Next.js)

## Prerequisites

1. MongoDB Atlas cluster accessible
2. Vercel account (for frontend)
3. Render account (for backend)
4. GitHub repository with your code

---

## Step 1: Deploy Backend to Render

### Option A: Using Render Dashboard (Recommended)

1. Go to [render.com](https://render.com) and create a new Web Service
2. Connect your GitHub repository
3. Configure the service:
   - **Name**: `cherry-mart-api`
   - **Runtime**: Node
   - **Build Command**: `cd server && npm install`
   - **Start Command**: `cd server && npm start`
   - **Plan**: Free

4. Add Environment Variables in Render Dashboard:
   ```
   PORT=8080
   MONGO_URI=mongodb://Cherry_Mart_DB:Cherry_Mart_Pass@ac-avftq92-shard-00-00.fbbc1tz.mongodb.net:27017,ac-avftq92-shard-00-01.fbbc1tz.mongodb.net:27017,ac-avftq92-shard-00-02.fbbc1tz.mongodb.net:27017/?ssl=true&replicaSet=atlas-7sbrex-shard-0&authSource=admin&appName=Cluster0
   JWT_SECRET=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNzc3NjYyMDQ0LCJleHAiOjE3Nzc2NjU2NDR9.ZXlKaGJHY2lPaUpJVXpJMU5pSXNJblI1Y0NJNklrcFh
   NODE_ENV=production
   ```
5. Deploy and copy the live URL (e.g., `https://cherry-mart-api.onrender.com`)

### Option B: Using render.yaml (Blueprints)

The `render.yaml` file is included in the root directory. You can use Render's Blueprint feature for infrastructure-as-code deployment.

---

## Step 2: Deploy Frontend to Vercel

### Option A: Using Vercel Dashboard (Recommended)

1. Go to [vercel.com](https://vercel.com) and create a new project
2. Import your GitHub repository
3. Configure the project:
   - **Framework Preset**: Next.js
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: Leave as default (Automatic)

4. Add Environment Variable:

   ```
   NEXT_PUBLIC_API_URL=https://your-render-backend-url.onrender.com
   ```

   (Replace with your actual Render backend URL from Step 1)

5. Deploy!

### Option B: Using Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Navigate to client folder and deploy
cd client
vercel --prod
```

---

## Step 3: Update Backend CORS

After the frontend is deployed:

1. Go back to your Render dashboard
2. Add the `FRONTEND_URL` environment variable:
   ```
   FRONTEND_URL=https://your-cherry-mart.vercel.app
   ```
3. Redeploy the backend service

---

## Step 4: Update Frontend Runtime Config (If Needed)

The frontend has a runtime config file at `client/public/api-config.js`. If you need to change the API URL after deployment without rebuilding:

1. Go to your Vercel dashboard
2. Navigate to your project settings
3. Update the `NEXT_PUBLIC_API_URL` environment variable
4. Redeploy

---

## Environment Variables Summary

### Backend (Render)

| Variable     | Value                            | Description                          |
| ------------ | -------------------------------- | ------------------------------------ |
| PORT         | 8080                             | Server port                          |
| MONGO_URI    | MongoDB connection string        | Database URL                         |
| JWT_SECRET   | Secret key                       | For token signing                    |
| NODE_ENV     | production                       | Production mode                      |
| FRONTEND_URL | https://your-frontend.vercel.app | For CORS (add after frontend deploy) |

### Frontend (Vercel)

| Variable            | Value                             | Description  |
| ------------------- | --------------------------------- | ------------ |
| NEXT_PUBLIC_API_URL | https://your-backend.onrender.com | API base URL |

---

## Live URLs (Fill after deployment)

- **Frontend**: https://cherry-mart.vercel.app
- **Backend**: https://cherry-mart-api.onrender.com
- **Admin Panel**: (deploy separately if needed)

---

## Troubleshooting

### CORS Errors

If you see CORS errors in the browser console:

1. Verify `FRONTEND_URL` is set correctly in Render environment variables
2. Ensure it matches exactly (including `https://` and no trailing slash)
3. Redeploy the backend

### API Not Connecting

1. Check that `NEXT_PUBLIC_API_URL` in Vercel matches your Render backend URL
2. Verify the backend is running (visit the backend URL directly)
3. Check the `/api/health` endpoint: `https://your-backend.onrender.com/api/health`

### Build Failures

1. Ensure Vercel "Output Directory" is set to default (Automatic)
2. Check that all dependencies are in `package.json`
3. Verify Node.js version compatibility (Next.js 16 requires Node 18+)
