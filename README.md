# 🔐 ApniSec – Security Issue Management Platform

ApniSec is a full-stack security issue tracking platform that allows users to register, authenticate, create, manage, and track security issues (Cloud Security, VAPT, Red Team, etc.) with proper authentication, authorization, email notifications, and search/filter capabilities.

This project is built with a **clean backend architecture**, secure authentication, and a modern frontend UI.

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

### 🔍 Search & Filters
- Full-text search (regex based)
- Combined filters (type + status + search)
- Server-side filtering (secure & efficient)

---

## 🧠 Project Architecture

### Backend Architecture (Layered + OOP)

