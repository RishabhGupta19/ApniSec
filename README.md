# 🔐 ApniSec – Security Issue Management Platform

ApniSec is a full-stack security issue tracking platform that allows users to register, authenticate, create, manage, and track security issues (Cloud Security, VAPT, Red Team, etc.) with proper authentication, authorization, email notifications, and advanced search/filter capabilities.

The backend is built using a **strict Object-Oriented Programming (OOP) architecture** following **SOLID principles**, with clear separation of concerns across Controllers, Services, Repositories, Validators, and Middleware. The application uses secure authentication mechanisms and a modern, responsive frontend UI for an end-to-end production-ready experience.


---

## 📌 Features

### 🔑 Authentication & Authorization
- User registration & login (JWT based)
- Protected routes using middleware
- Fetch current logged-in user (`/auth/me`)
- Logout support
- Password hashing using bcrypt
- Token expiration handling

### 🔁 Password Reset Flow
- Forgot password via email (Resend)
- Secure reset token with expiry
- Reset password using email link
- Confirmation email after successful reset

### 🧑‍💼 User Profile
- View profile
- Update profile
- Change password (with old password validation)

### 🐞 Issue Management
- Create security issues
- Update issues
- Delete issues
- View individual issue
- List all issues for logged-in user only
- Issues sorted by **most recently updated**
- Search issues by title or description
- Filter by type, status, priority

### 📧 Email Integration (Resend)
- Welcome email on registration
- Password reset email
- Password reset success notification
- Profile updated notification
- Issue creation notification
- ** Please check the spam folder if mail not found**

### 🔍 Search & Filters
- Full-text search (regex based)
- Combined filters (type + status + search)
- Server-side filtering (secure & efficient)

---


✔ Centralized API service  
✔ Global auth state via Context  
✔ Protected routes  
✔ Reusable UI components  

---

## 🧰 Tech Stack

### Frontend
- React (Vite)
- TypeScript
- Tailwind CSS
- React Router
- Context API
- Fetch API

### Backend
- Node.js
- Express.js
- TypeScript
- MongoDB + Mongoose
- JWT (jsonwebtoken)
- bcrypt
- Resend (Email service)

### Tools & DevOps
- MongoDB Atlas
- Postman
- Nodemon
- ESLint
- dotenv

---

## 🔐 Security Practices Implemented

- Password hashing (bcrypt)
- JWT authentication
- Token expiry handling
- Protected API routes
- User-scoped data access (no cross-user access)
- Reset token validation + expiry
- Server-side filtering (no client trust)

---

## ⚙️ Environment Variables

### Backend (`.env`)

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=1d

RESEND_API_KEY=your_resend_api_key
EMAIL_FROM=no-reply@rishabhs.xyz
FRONTEND_URL=http://localhost:8080

🚀 Setup Instructions
1️⃣ Clone the repository
git clone https://github.com/RishabhGupta19/ApniSec
cd apnisec

2️⃣ Backend Setup
cd Backend
npm install
npm run build
npm run start

3️⃣ Frontend Setup
cd Frontend
npm install
npm run dev

4️⃣ Access the app
Frontend → http://localhost:8080
Backend  → http://localhost:5000

🔁 API Overview
Auth

POST /api/auth/register

POST /api/auth/login

GET /api/auth/me

POST /api/auth/forgot-password

POST /api/auth/reset-password

User

GET /api/users/profile

PUT /api/users/profile

PUT /api/users/change-password

Issues

GET /api/issues

POST /api/issues

GET /api/issues/:id

PUT /api/issues/:id

DELETE /api/issues/:id

📬 Email Events

User registered → Welcome email

Forgot password → Reset link email

Password reset success → Confirmation email

Profile updated → Notification email

Issue created → Issue details email

🧪 Status

✔ Authentication complete
✔ Issue management complete
✔ Email integration complete
✔ Search & filters working
✔ Ready for deployment

👤 Author

Rishabh Gupta
Full-Stack Developer
Domain: https://rishabhs.xyz
