# Ecommerce Website

A full-stack ecommerce website built with React, Node.js, Express, MongoDB Atlas, and Tailwind CSS.

## Features

- 🔐 User Authentication (Register, Login, JWT)
- 🛍️ Product Catalog with Search & Filter
- 🛒 Shopping Cart Management
- 📦 Order Management
- 👤 User Profile
- 💳 Checkout Process
- 🔒 Secure API with Authentication & Authorization
- 📱 Responsive Design with Tailwind CSS

## Tech Stack

### Frontend
- React 18
- React Router DOM
- React Query
- Tailwind CSS
- Axios

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- Bcrypt for Password Hashing
- Express Validator
- Helmet (Security)
- CORS
- Rate Limiting

## Project Structure

```
Ecommerce/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── errorHandler.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Product.js
│   │   ├── Order.js
│   │   └── Cart.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── products.js
│   │   ├── orders.js
│   │   └── cart.js
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── utils/
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   └── tailwind.config.js
└── README.md
```

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB Atlas account

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory:
```env
MONGODB_URI=mongodb+srv://brapngeno_db_user:UVt969aTnpkLxtTC@cluster0.lssxkdu.mongodb.net/?appName=Cluster0
PORT=5000
NODE_ENV=development
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:3000
```

**⚠️ IMPORTANT:** 
- Replace `JWT_SECRET` with a strong random string in production
- Never commit your `.env` file to version control

4. Start the backend server:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the frontend directory:
```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_ENV=development
```

4. Start the frontend development server:
```bash
npm start
```

The frontend will run on `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Protected)

### Products
- `GET /api/products` - Get all products (with filters)
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (Admin only)
- `PUT /api/products/:id` - Update product (Admin only)
- `DELETE /api/products/:id` - Delete product (Admin only)

### Cart
- `GET /api/cart` - Get user's cart (Protected)
- `POST /api/cart/add` - Add item to cart (Protected)
- `PUT /api/cart/update/:itemId` - Update cart item (Protected)
- `DELETE /api/cart/remove/:itemId` - Remove item from cart (Protected)
- `DELETE /api/cart/clear` - Clear cart (Protected)

### Orders
- `POST /api/orders` - Create new order (Protected)
- `GET /api/orders` - Get user's orders (Protected)
- `GET /api/orders/:id` - Get single order (Protected)

## Security Features

- ✅ Password hashing with bcrypt
- ✅ JWT token authentication
- ✅ Protected routes with middleware
- ✅ Input validation with express-validator
- ✅ Helmet.js for security headers
- ✅ CORS configuration
- ✅ Rate limiting
- ✅ Environment variables for sensitive data
- ✅ `.gitignore` to prevent committing secrets

## Database Models

### User
- Authentication information
- Profile data
- Role (user/admin)

### Product
- Product details
- Images
- Stock management
- Categories

### Order
- Order items
- Shipping address
- Payment information
- Order status

### Cart
- User's cart items
- Quantity management
- Total price calculation

## Development Notes

1. **MongoDB Connection**: The connection string is stored in `.env` file. Make sure to keep it secure.

2. **JWT Secret**: Generate a strong random string for production. You can use:
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

3. **Admin Access**: To create an admin user, you can either:
   - Manually update the user in MongoDB
   - Create an admin registration endpoint (for development only)

4. **Image Upload**: Currently, product images are stored as URLs. For production, consider:
   - Cloudinary
   - AWS S3
   - MongoDB GridFS

## Next Steps

- [ ] Add payment integration (Stripe, PayPal)
- [ ] Implement image upload functionality
- [ ] Add product reviews and ratings
- [ ] Create admin dashboard
- [ ] Add email verification
- [ ] Implement password reset
- [ ] Add order tracking
- [ ] Create product search with advanced filters
- [ ] Add wishlist functionality
- [ ] Implement pagination
- [ ] Add unit and integration tests

## License

This project is open source and available under the MIT License.

## Support

For issues and questions, please open an issue on the repository.

