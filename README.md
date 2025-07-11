# 🏛️ Agarwal Sabha Platform

A modern, comprehensive community management platform built specifically for the Agarwal Sabha community.

## 🚀 Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env.local
   # Update .env.local with your database URL and other credentials
   ```

3. **Set up database:**
   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   npx prisma db seed
   ```

4. **Start development server:**
   ```bash
   npm run dev
   ```

## 🔑 Default Login Credentials

**Admin Access:**
- Email: `admin@agarwalsabha.com`
- Password: `Admin@123`

**Test Member:**
- Email: `rajesh@example.com`  
- Password: `Admin@123`

## 🛠️ Tech Stack

- **Frontend:** Next.js 14 + React 18 + TypeScript
- **Database:** PostgreSQL + Prisma ORM
- **Authentication:** JWT with admin approval
- **UI:** Tailwind CSS + Shadcn/UI
- **State Management:** Zustand
- **Deployment:** Vercel

## 📁 Project Structure

```
src/
├── app/                    # Next.js app directory
├── components/            # Reusable components
├── lib/                   # Utility functions
├── stores/               # Zustand stores
└── types/                # TypeScript types
```

## 🌐 Free Deployment Stack

- **Hosting:** Vercel (free tier)
- **Database:** Neon PostgreSQL (free 3GB)
- **File Storage:** Cloudinary (free 25GB)
- **Total Cost:** $0/month

## 📋 Remaining Setup

See `FILES_TO_CREATE.md` for the complete list of files to create for full functionality.

## ✨ Features

- Admin approval workflow
- Member management
- Event management
- News & announcements
- Gallery management
- Role-based access control
- Responsive design
- Dark/light theme

Built with ❤️ for the Agarwal Sabha community.
