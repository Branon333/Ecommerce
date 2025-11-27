# Quick Setup Guide

## Step 1: Backend Setup

1. **Navigate to backend folder:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create `.env` file in backend folder:**
   Create a file named `.env` (not `.env.example`) with the following content:
   ```
   MONGODB_URI=mongodb+srv://brapngeno_db_user:UVt969aTnpkLxtTC@cluster0.lssxkdu.mongodb.net/?appName=Cluster0
   PORT=5000
   NODE_ENV=development
   JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
   JWT_EXPIRE=7d
   FRONTEND_URL=http://localhost:3000
   ```

4. **Start backend server:**
   ```bash
   npm run dev
   ```
   Backend will run on `http://localhost:5000`

## Step 2: Frontend Setup

1. **Open a new terminal and navigate to frontend folder:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create `.env` file in frontend folder:**
   Create a file named `.env` with:
   ```
   REACT_APP_API_URL=http://localhost:5000/api
   REACT_APP_ENV=development
   ```

4. **Start frontend server:**
   ```bash
   npm start
   ```
   Frontend will run on `http://localhost:3000`

## Step 3: Test the Application

1. Open `http://localhost:3000` in your browser
2. Register a new account
3. Browse products
4. Add items to cart
5. Complete checkout

## Important Notes

- Make sure MongoDB Atlas connection string is correct
- Never commit `.env` files to git
- For production, change `JWT_SECRET` to a strong random string
- Backend must be running before frontend can make API calls

## Troubleshooting

**Backend won't start:**
- Check if MongoDB connection string is correct
- Ensure port 5000 is not in use
- Check `.env` file exists and has correct values

**Frontend can't connect to backend:**
- Ensure backend is running on port 5000
- Check `REACT_APP_API_URL` in frontend `.env` file
- Check CORS settings in backend

**MongoDB connection error:**
- Verify your MongoDB Atlas connection string
- Check if your IP is whitelisted in MongoDB Atlas
- Ensure database user has correct permissions

