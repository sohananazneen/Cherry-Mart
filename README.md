# Cherry Mart 🍒
---

## ��🔗 Relevant Links

- 🌐 Live Project: https://cherry-mart.vercel.app/
- 📁 Repository: https://github.com/sohananazneen/Cherry-Mart.git

---
## About Project
Cherry Mart is a comprehensive, full-stack e-commerce platform built with modern technologies. It features a robust Next.js frontend and a powerful Express/Node.js backend, providing a seamless shopping experience for users and an efficient management system for administrators.

## 🚀 Features

### For Users
- **Secure Authentication**: Register and login with JWT-based sessions or Firebase synchronization.
- **Product Discovery**: Browse products with advanced filtering (category, brand, price, rating), sorting, and search capabilities.
- **Product Details**: View detailed information, high-quality images, and customer reviews.
- **Reviews & Ratings**: Share feedback on products with a 1-5 star rating system.
- **User Dashboard**: Manage profiles and track activities.
- **Secure Payments**: Integrated with Stripe for safe and reliable transactions.
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices.

### For Admins
- **Admin Dashboard**: Overview of platform performance with real-time statistics.
- **Product Management**: Full CRUD operations for products, including featured, new arrival, and sale status.
- **User Management**: Monitor user activity and roles.
- **Media Handling**: Seamless image uploads powered by Cloudinary.

## 🛠️ Tech Stack

### Frontend
- **Framework**: [Next.js 16+](https://nextjs.org/)
- **Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Charts**: [Chart.js](https://www.chartjs.org/) & [Recharts](https://recharts.org/)
- **State Management/Auth**: [Firebase](https://firebase.google.com/) & Context API

### Backend
- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express 5](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
- **Authentication**: JWT (JSON Web Tokens) & Bcryptjs

## 📂 Project Structure

```text
Cherry-Mart/
├── client/              # Next.js frontend application
│   ├── src/
│   │   ├── app/         # App router (pages and layouts)
│   │   ├── components/  # Reusable UI components
│   │   └── lib/         # Utilities and API clients
├── server/              # Express.js backend API
│   ├── config/          # Database and service configurations
│   ├── controllers/     # Route logic handlers
│   ├── models/          # Mongoose schemas
│   ├── routes/          # API endpoint definitions
│   └── middleware/      # Auth and error handling
└── render.yaml          # Deployment configuration
```

## ⚙️ Setup & Installation

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas account or local MongoDB
- Cloudinary account
- Stripe account
- Firebase project

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/sohananazneen/Cherry-Mart.git
   cd Cherry-Mart
   ```

2. **Setup the Server**:
   ```bash
   cd server
   npm install
   ```
   Create a `.env` file in the `server` directory and add the following:
   ```env
   PORT=8080
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   JWT_EXPIRE=30d
   ADMIN_SECRET_KEY=your_admin_secret
   CLOUDINARY_CLOUD_NAME=your_name
   CLOUDINARY_API_KEY=your_key
   CLOUDINARY_API_SECRET=your_secret
   STRIPE_SECRET_KEY=your_stripe_key
   ```

3. **Setup the Client**:
   ```bash
   cd ../client
   npm install
   ```
   Create a `.env.local` file in the `client` directory:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8080/api
   NEXT_PUBLIC_FIREBASE_API_KEY=your_key
   # ... other firebase config
   ```

### Running the Application

- **Server**: `npm run dev` (inside `/server`)
- **Client**: `npm run dev` (inside `/client`)



---
Developed by [Sohana Nazneen](https://github.com/sohananazneen)
