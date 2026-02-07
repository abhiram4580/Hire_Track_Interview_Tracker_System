# 📊 SaaS Interview Tracker System

> A full-stack web application to help job seekers manage their interview applications, track progress, and analyze performance metrics with beautiful visualizations.

[![Next.js](https://img.shields.io/badge/Next.js-16.1-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)
[![GraphQL](https://img.shields.io/badge/GraphQL-16.0-E10098?logo=graphql)](https://graphql.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Latest-336791?logo=postgresql)](https://www.postgresql.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

## ✨ Features

### 📝 Application Management
- **Kanban Board**: Drag-and-drop interface to move applications through stages
  - Applied → Shortlisted → Online Test → Technical Interview → HR → Offered/Rejected
- **Create & Track**: Add company name, role, status, and interview dates
- **Quick Actions**: Update status, delete applications, and edit details

### 📊 Analytics & Insights
- **Visual Charts**: Pie and bar charts showing application distribution
- **Key Metrics**: Total applications, offers received, and offer rate percentage
- **Status Breakdown**: See how many applications are at each stage

### 📅 Interview Calendar
- **Upcoming Interviews**: View all scheduled interviews in one place
- **Date Tracking**: Never miss an interview with organized date management

### 🎯 Goal Setting
- **Track Progress**: Set application targets (weekly/monthly/total)
- **Progress Bars**: Visual representation of goals vs. actual applications
- **Goal Management**: Create, update, and delete goals

### 💬 Interview Reviews
- **Share Experiences**: Document interview experiences with company, topics, and difficulty
- **Review History**: Browse all past interview reviews
- **Difficulty Ratings**: Easy, Medium, Hard classifications

### 🔐 Secure Authentication
- **User Registration**: Create account with email, username, and password
- **JWT Authentication**: Secure token-based authentication
- **Protected Routes**: Middleware-protected pages and API endpoints

### 🎨 Beautiful UI
- **Glassmorphism Design**: Modern, frosted-glass aesthetic
- **Responsive Layout**: Works seamlessly on desktop, tablet, and mobile
- **Animated Themes**: Different color schemes for each section
  - Home: Deep Space (Blue/Purple)
  - Dashboard: Sunset (Orange/Pink)
  - Analytics: Neon (Emerald/Teal)

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| [Next.js 16.1](https://nextjs.org/) | React framework with App Router |
| [TypeScript](https://www.typescriptlang.org/) | Type-safe development |
| [Apollo Client](https://www.apollographql.com/docs/react/) | GraphQL client for data fetching |
| [Chart.js](https://www.chartjs.org/) | Interactive data visualizations |
| CSS Modules | Scoped component styling |

### Backend
| Technology | Purpose |
|------------|---------|
| [Node.js](https://nodejs.org/) | JavaScript runtime |
| [Apollo Server](https://www.apollographql.com/docs/apollo-server/) | GraphQL API server |
| [Prisma](https://www.prisma.io/) | Next-generation ORM |
| [PostgreSQL](https://www.postgresql.org/) | Relational database |
| [JWT](https://jwt.io/) | Secure authentication tokens |
| [bcryptjs](https://github.com/dcodeIO/bcrypt.js) | Password hashing |

---

## 📦 Project Structure

```bash
interview-tracker/
├── frontend/                 # Next.js Frontend Application
│   ├── app/                  # App Router Pages
│   │   ├── dashboard/        # Main Kanban dashboard
│   │   ├── analytics/        # Charts & statistics
│   │   ├── calendar/         # Interview calendar view
│   │   ├── goals/            # Goal tracking page
│   │   ├── profile/          # User profile
│   │   ├── login/            # Login page
│   │   └── register/         # Registration page
│   ├── components/           # Reusable UI Components
│   │   ├── KanbanBoard.tsx   # Drag-and-drop board
│   │   ├── Navbar.tsx        # Navigation bar
│   │   └── StatCard.tsx      # Metric display cards
│   ├── graphql/              # GraphQL Operations
│   │   ├── queries/          # Query definitions
│   │   └── mutations/        # Mutation definitions
│   ├── apollo/               # Apollo Client configuration
│   └── lib/                  # Utility functions
│
└── backend/                  # Node.js Backend API
    ├── src/
    │   ├── graphql/
    │   │   ├── typeDefs.js   # GraphQL schema
    │   │   └── resolvers/    # Query & mutation resolvers
    │   ├── middleware/
    │   │   └── auth.js       # JWT authentication
    │   ├── prisma.js         # Prisma client instance
    │   └── index.js          # Server entry point
    └── prisma/
        └── schema.prisma     # Database schema
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v16 or higher
- **PostgreSQL** installed and running
- **Git** for version control

### 1️⃣ Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/Hire_Track_Interview_Tracker_System.git
cd Hire_Track_Interview_Tracker_System
```

### 2️⃣ Backend Setup

```bash
cd backend
npm install

# Create .env file
echo 'DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/interview_tracker"
JWT_SECRET="your-super-secret-jwt-key"
PORT=4000' > .env

# Run database migrations
npx prisma migrate dev --name init

# Generate Prisma client
npx prisma generate

# Start backend server
npm run dev
```

Backend will run on `http://localhost:4000/graphql`

### 3️⃣ Frontend Setup

```bash
cd ../frontend
npm install

# Create .env.local (optional)
echo 'NEXT_PUBLIC_API_URL=http://localhost:4000/graphql' > .env.local

# Start frontend server
npm run dev
```

Frontend will run on `http://localhost:3000`

### 4️⃣ Access Application

Open your browser and navigate to:
```
http://localhost:3000
```

**First-time setup:**
1. Click "Register" to create an account
2. Fill in your details (email, username, password, age, gender)
3. Login with your credentials
4. Start tracking your interviews!

---

## 🌐 Deployment

### Deploy to Render (Backend) + Vercel (Frontend) - 100% Free

Detailed deployment guides available:
- [Render + Vercel Guide](docs/render-vercel-deployment.md) - **Recommended (Free)**
- [Railway + Vercel Guide](docs/railway-vercel-deployment.md)

**Quick Deploy:**

#### Backend on Render
1. Create PostgreSQL database on Render
2. Create Web Service from GitHub repo
3. Set root directory: `backend`
4. Set build command: `npm install && npx prisma generate && npx prisma migrate deploy`
5. Add environment variables: `DATABASE_URL`, `JWT_SECRET`, `NODE_ENV=production`

#### Frontend on Vercel
1. Import GitHub repository
2. Set root directory: `frontend`
3. Add environment variable: `NEXT_PUBLIC_API_URL=<your-render-backend-url>`
4. Deploy!

---

## 📸 Screenshots

### Dashboard - Kanban Board
![Dashboard](docs/screenshots/dashboard.png)
*Drag-and-drop interface for managing applications*

### Analytics
![Analytics](docs/screenshots/analytics.png)
*Visual insights with pie and bar charts*

### Interview Calendar
![Calendar](docs/screenshots/calendar.png)
*Never miss an upcoming interview*

---

## 🗄️ Database Schema

```prisma
model User {
  id           String        @id @default(cuid())
  email        String        @unique
  username     String        @unique
  password     String
  age          Int
  gender       Gender
  applications Application[]
  goals        Goal[]
  reviews      Review[]
}

model Application {
  id            String            @id @default(cuid())
  company       String
  role          String
  status        ApplicationStatus
  interviewDate DateTime?
  userId        String
  user          User              @relation(fields: [userId], references: [id])
}

enum ApplicationStatus {
  APPLIED
  SHORTLISTED
  ONLINE_TEST
  TECHNICAL_INTERVIEW
  HR
  OFFERED
  REJECTED
}
```

---

## 🔑 Environment Variables

### Backend (.env)
```bash
DATABASE_URL="postgresql://user:password@host:5432/dbname"
JWT_SECRET="your-random-secret-key-change-this"
NODE_ENV="development"
PORT=4000
```

### Frontend (.env.local)
```bash
NEXT_PUBLIC_API_URL="http://localhost:4000/graphql"
```

---

## 📝 Available Scripts

### Backend
```bash
npm run dev      # Start development server with nodemon
npm start        # Start production server
npm run build    # Generate Prisma client
```

### Frontend
```bash
npm run dev      # Start Next.js dev server
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run ESLint
```

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👤 Author

**Your Name**
- GitHub: [@YOUR_USERNAME](https://github.com/YOUR_USERNAME)
- LinkedIn: [Your LinkedIn](https://www.linkedin.com/in/your-profile)

---

## 🙏 Acknowledgments

- **Chart.js** for beautiful data visualizations
- **Prisma** for the amazing developer experience
- **Next.js Team** for the incredible framework
- **Vercel** & **Render** for free hosting

---

## 📊 Project Status

✅ **Version**: 1.0.0  
✅ **Status**: Active Development  
✅ **Last Updated**: February 2026

---

<div align="center">

### ⭐ Star this repo if it helped you!

Made with ❤️ by [Your Name](https://github.com/YOUR_USERNAME)

</div>
