# Vercel Deployment Guide

## Quick Setup Steps

### 1. Import Project to Vercel
1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New Project"
3. Import your Git repository

### 2. Configure Project Settings

**If deploying ONLY the frontend:**

1. In Vercel project settings, go to "Settings" → "General"
2. Set **Root Directory** to: `frontend`
3. Framework Preset: **Create React App**
4. Build Command: `npm run build`
5. Output Directory: `build`
6. Install Command: `npm install`

**If deploying from root (monorepo):**

1. Root Directory: Leave as root (`.`)
2. Framework Preset: **Other**
3. Build Command: `cd frontend && npm install && npm run build`
4. Output Directory: `frontend/build`
5. Install Command: `cd frontend && npm install`

### 3. Environment Variables

Add these in Vercel Dashboard → Settings → Environment Variables:

```
REACT_APP_API_URL=your_backend_api_url
REACT_APP_ENV=production
```

### 4. Deploy

Click "Deploy" and Vercel will:
- Install dependencies
- Run the build command
- Deploy your React app

## Troubleshooting 404 Errors

If you see 404 errors:

1. ✅ Make sure `vercel.json` exists in your deployment root
2. ✅ Check that the rewrites rule is present:
   ```json
   {
     "rewrites": [
       {
         "source": "/(.*)",
         "destination": "/index.html"
       }
     ]
   }
   ```
3. ✅ Verify the Root Directory setting matches your project structure
4. ✅ Ensure the Output Directory points to the `build` folder

## Files Created

- `frontend/vercel.json` - Use this if Root Directory is set to `frontend`
- `vercel.json` - Use this if deploying from root

## After Deployment

1. Check your deployment URL
2. Test all routes (/, /products, /login, etc.)
3. Verify API connections if backend is deployed separately

