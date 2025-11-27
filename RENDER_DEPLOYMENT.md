# Render Deployment Guide for Backend

## Quick Setup Steps

### Option 1: Using render.yaml (Recommended - Automatic Configuration)

1. **The `render.yaml` file is already created in your repo root**
2. **In Render Dashboard:**
   - Go to your service → Settings → Apply Render Configuration File
   - Or create a new service and Render will auto-detect `render.yaml`
3. **Set Environment Variables in Render Dashboard:**
   - Go to your service → Environment
   - Add these variables:
     ```
     MONGODB_URI=your_mongodb_connection_string
     JWT_SECRET=your_super_secret_jwt_key
     FRONTEND_URL=https://your-vercel-app.vercel.app
     PORT=10000
     NODE_ENV=production
     JWT_EXPIRE=7d
     ```

### Option 2: Manual Configuration in Render Dashboard

If you prefer manual setup:

1. **Service Settings:**
   - **Root Directory:** `backend`
   - **Environment:** `Node`
   - **Build Command:** `npm install` (or leave empty)
   - **Start Command:** `npm start`
   - **Plan:** Free (or your preferred plan)

2. **Environment Variables:**
   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_super_secret_jwt_key
   FRONTEND_URL=https://your-vercel-app.vercel.app
   PORT=10000
   NODE_ENV=production
   JWT_EXPIRE=7d
   ```

## Common Issues Fixed

### ❌ Error: "Could not read package.json"
**Cause:** Render was looking in root directory instead of `backend/` folder
**Fix:** Set Root Directory to `backend` in Render settings

### ❌ Error: "npm run built" command not found
**Cause:** Typo in build command + backend doesn't need a build step
**Fix:** Remove build command or set to `npm install`

### ✅ Correct Configuration:
- **Root Directory:** `backend`
- **Build Command:** `npm install` (or empty)
- **Start Command:** `npm start`
- **No build script needed** - backend is a Node.js server, not a compiled app

## Important Notes

1. **Port:** Render automatically sets `PORT` environment variable. Your code already handles this with `process.env.PORT || 5000`

2. **CORS:** Make sure `FRONTEND_URL` matches your Vercel frontend URL exactly

3. **MongoDB:** Ensure your MongoDB Atlas connection string is correct and your IP is whitelisted (or use 0.0.0.0/0 for Render)

4. **JWT Secret:** Use a strong, random string for production

## After Deployment

1. Check your Render service URL (e.g., `https://ecommerce-0or2.onrender.com`)
2. Test the health endpoint: `https://ecommerce-0or2.onrender.com/api/health`
3. Update your frontend `REACT_APP_API_URL` to point to this URL
4. Test API calls from your frontend

## Troubleshooting

**Service won't start:**
- Check environment variables are set correctly
- Verify MongoDB connection string
- Check Render logs for specific errors

**CORS errors:**
- Ensure `FRONTEND_URL` matches your Vercel frontend URL exactly
- Check backend CORS configuration in `server.js`

**Database connection errors:**
- Verify MongoDB Atlas connection string
- Check IP whitelist in MongoDB Atlas (add 0.0.0.0/0 for Render)
- Ensure database user has correct permissions

