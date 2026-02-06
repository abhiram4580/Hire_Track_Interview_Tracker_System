# SaaS Interview Tracker System

A comprehensive, full-stack application designed to help job seekers track their interview applications, visualize progress, and analyze performance metrics.

![Interview Tracker Dashboard](frontend/public/dashboard-preview.png)
*(Note: Add a screenshot of the dashboard here)*

## 🚀 Key Features

-   **Kanban Board**: Drag-and-drop interface to manage applications across stages (Applied, Shortlisted, Interview, Offered, etc.).
-   **Interview Reviews**: Save and view detailed interview experiences with difficulty ratings.
-   **Analytics Dashboard**: Visual charts (Pie & Bar) to track application insights and offer rates.
-   **Secure Authentication**: User registration and login with JWT-based protection.
-   **Vibrant UI**: Modern, responsive design with glassmorphism and animated themes.

## 🛠️ Tech Stack

### Frontend
-   **Framework**: [Next.js 13+](https://nextjs.org/) (App Directory)
-   **Language**: TypeScript
-   **State/Data**: Apollo Client (GraphQL)
-   **Styling**: CSS Modules, Glassmorphism design system
-   **Charts**: Chart.js / React-Chartjs-2

### Backend
-   **Runtime**: Node.js
-   **API**: GraphQL (GraphQL Yoga / Apollo Server)
-   **Database**: PostgreSQL
-   **ORM**: Prisma
-   **Auth**: JWT (JSON Web Tokens)

## 📦 Project Structure

```bash
├── frontend/          # Next.js Application
│   ├── app/           # App Router Pages & Layouts
│   ├── components/    # Reusable UI Components
│   ├── graphql/       # GraphQL Queries & Mutations
│   └── styles/        # Global CSS & Modules
│
└── backend/           # Node.js GraphQL Server
    ├── src/           # Resolvers, Schema, Context
    └── prisma/        # Database Schema & Migrations
```

## ⚡ Getting Started

### Prerequisites
-   Node.js (v16+)
-   PostgreSQL installed and running

### 1. Backend Setup

```bash
cd backend
npm install

# Configure Environment Variables
# Create .env and add: DATABASE_URL="postgresql://user:password@localhost:5432/interview_tracker"

# Run Migrations
npx prisma migrate dev --name init

# Start Server
npm run dev
```

### 2. Frontend Setup

```bash
cd frontend
npm install

# Start Development Server
npm run dev
```

Visit `http://localhost:3000` to view the application.

## 🎨 Themes

The application features distinct themes for different sections:
-   **Home**: Deep Space (Blue/Purple)
-   **Dashboard**: Sunset (Orange/Pink)
-   **Analytics**: Neon (Emerald/Teal)
