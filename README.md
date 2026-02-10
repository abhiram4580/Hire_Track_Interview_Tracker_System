# Interview Tracker System

> A complete web application that helps job seekers organize and manage their interview applications from start to finish.

---

## What This Project Does

This is a **full-stack web application** that solves a real problem: keeping track of multiple job applications during a job search. Instead of using spreadsheets or scattered notes, users can manage everything in one organized platform.

**Main Purpose:** Help job seekers track where each application stands, see upcoming interviews, analyze their job search progress, and learn from past interview experiences.

---

## Key Features Explained

### 1. Application Dashboard
Think of this as a **digital job board** where you can see all your applications organized by stage:
- **Applied** - Just sent the application
- **Shortlisted** - Company showed interest
- **Online Test** - Scheduled for coding test or assessment
- **Technical Interview** - Technical round scheduled
- **HR Round** - Final HR discussion
- **Offered** - Got the job offer!
- **Rejected** - Application didn't move forward

**What makes it special:** You can drag and drop applications between stages (like moving sticky notes on a board). You can also add which company, what role, and when the interview is scheduled.

### 2. Interview Calendar
A dedicated page that shows **all your upcoming interviews in one place**. This helps you:
- Never miss an interview
- See what's coming up this week
- Plan your preparation time
- Track interview dates as you schedule them

### 3. Analytics and Statistics
Visual charts and graphs that show your job search progress:
- **Total applications sent** - How many companies you've applied to
- **Offer rate** - What percentage resulted in offers (helps you improve)
- **Stage breakdown** - See how many applications are at each stage
- **Charts** - Pie charts and bar graphs for easy visualization

This helps you understand patterns, like "I get to technical rounds often but need to improve my final interviews."

### 4. Goal Tracking
Set targets for yourself:
- "Apply to 10 companies this week"
- "Get 3 interviews this month"
- "Receive 1 offer by end of quarter"

The system shows progress bars so you can see how close you are to your goals.

### 5. Interview Review System
After each interview, you can save notes about:
- Which company it was
- What topics they asked about
- Your experience (what went well, what didn't)
- Difficulty level (Easy, Medium, Hard)

**Why this matters:** When preparing for similar companies or roles, you can review what worked before.

**Why this matters:** When preparing for similar companies or roles, you can review what worked before.



### 6. User Accounts and Security
- Each user has their own private account
- Password protection (passwords are encrypted and stored securely)
- Only you can see your data
- Login/logout functionality

---

## Technologies Used

This project demonstrates proficiency in modern web development:

### Frontend (What Users See)
- **Next.js** - A popular React framework for building fast websites
- **TypeScript** - JavaScript with type checking to prevent bugs
- **Apollo Client** - Handles communication between frontend and backend
- **Chart.js** - Creates the graphs and charts
- **CSS Modules** - Styles the pages to look professional

### Backend (Server and Database)
- **Node.js** - JavaScript runtime for the server
- **GraphQL** - Modern way to build APIs (more efficient than traditional REST)
- **PostgreSQL** - Professional database that stores all the data
- **Prisma** - Tool that makes database operations easier and safer
- **JWT (JSON Web Tokens)** - Industry-standard method for secure login
- **bcrypt** - Encrypts passwords so they're never stored as plain text

### Why These Choices Matter:
- **Next.js** is used by companies like Netflix, Uber, and Hulu
- **PostgreSQL** is trusted by major companies for reliable data storage
- **GraphQL** was developed by Facebook and is used by GitHub, Shopify, and Twitter
- **TypeScript** reduces bugs by 15% according to research, showing attention to code quality

---

## Project Architecture

This is a **full-stack application** with three main parts:

### 1. Frontend Application
The user interface where people interact with the system. Built with modern React patterns.

**What it contains:**
- Login and registration pages
- Dashboard for managing applications
- Analytics page with charts
- Calendar view for interviews
- Goals page for tracking targets
- Profile page for user information

### 2. Backend API Server
The "brain" of the application that processes requests and manages data.

**What it does:**
- Handles user authentication (login/register)
- Processes all data operations (create, read, update, delete)
- Protects routes (only logged-in users can access their data)
- Connects to the database
- Validates all incoming data

### 3. Database
PostgreSQL database that stores:
- User accounts and profiles
- All job applications
- Interview dates and details
- Goals and progress
- Interview reviews

**Database relationships:** The database is properly designed with relationships (one user can have many applications, many goals, many reviews).

### UI/UX Improvements
- **Optimistic UI Updates:** Experience instant feedback when dragging applications or updating goal progress. No more loading spinners for small actions!
- **Glassmorphism Design:** A modern, sleek interface with blur effects and smooth animations.

---

## How to Run This Project Locally

If a recruiter or developer wants to test this project:

### Step 1: Requirements
- Node.js version 16 or newer installed
- PostgreSQL database installed
- Git installed

### Step 2: Get the Code
```bash
git clone https://github.com/abhiram4580/Hire_Track_Interview_Tracker_System.git
cd Hire_Track_Interview_Tracker_System
```

### Step 3: Set Up Backend
```bash
cd backend
npm install

# Create a .env file with these settings:
DATABASE_URL="postgresql://username:password@localhost:5432/interview_tracker"
JWT_SECRET="your-secret-key-here"
PORT=4000

# Set up the database
npx prisma migrate dev --name init
npx prisma generate

# Start the server
npm run dev
```

The backend will run on `http://localhost:4000`

### Step 4: Set Up Frontend
```bash
cd frontend
npm install

# Optionally create .env.local with:
NEXT_PUBLIC_API_URL=http://localhost:4000/graphql

# Start the application
npm run dev
```

The application will open on `http://localhost:3000`

### Step 5: Test the Application
1. Open your browser to `http://localhost:3000`
2. Click "Register" and create a test account
3. Login with your credentials
4. Add a sample job application
5. Try moving it between stages
6. Check the analytics page to see charts

---

## Live Deployment

This application can be deployed to the cloud for **completely free** using:

### Backend: Render.com
- Free PostgreSQL database
- Free Node.js hosting
- Automatic deployment from GitHub

### Frontend: Vercel
**Live App:** [https://hire-track-interview-tracker-system-rosy.vercel.app](https://hire-track-interview-tracker-system-rosy.vercel.app)
- Free Next.js hosting
- Automatic deployment from GitHub
- Fast global CDN (Content Delivery Network)

### Cost: $0/month for development and portfolio use

**Deployment steps available in separate documentation files.**

---

## Technical Skills Demonstrated

This project showcases the following abilities:

### Full-Stack Development
- ✅ Can build user interfaces with React/Next.js
- ✅ Can create backend APIs with Node.js and GraphQL
- ✅ Can design and work with databases (PostgreSQL)
- ✅ Can connect frontend and backend

### Software Engineering Practices
- ✅ Code organization (separated frontend/backend)
- ✅ Security implementation (password encryption, authentication)
- ✅ Database design (proper relationships and structure)
- ✅ Type safety with TypeScript
- ✅ Version control with Git

### Problem Solving
- ✅ Identified a real-world problem (tracking job applications)
- ✅ Designed a complete solution
- ✅ Implemented features that add real value

### Modern Web Standards
- ✅ RESTful API alternative (GraphQL)
- ✅ Responsive design (works on all devices)
- ✅ Secure authentication (industry standards)
- ✅ Clean, maintainable code structure

---

## Database Design

The database has four main tables:

### Users Table
Stores user account information:
- Email (unique)
- Username (unique)
- Password (encrypted)
- Age, gender, and other profile data

### Applications Table
One user can have many applications. Each application stores:
- Company name
- Job role/position
- Current status (Applied, Shortlisted, etc.)
- Interview date (if scheduled)
- Which user it belongs to

### Goals Table
Tracks user-defined targets:
- Type of goal (weekly, monthly, total)
- Target number
- Current progress
- Which user set the goal

### Reviews Table
Interview experience notes:
- Company name
- Topics discussed
- User's experience
- Difficulty rating
- Interview date
- Which user wrote it

**Why this matters:** Proper database design prevents data loss and makes the application scalable.

---

## Security Features

This project implements real-world security practices:

### Password Security
- Passwords are **never stored as plain text**
- Uses bcrypt hashing (industry standard)
- Salt rounds = 10 (recommended security level)

### Authentication
- JWT (JSON Web Tokens) for session management
- Tokens expire after 7 days
- Protected routes - users can only access their own data

### Backend Validation
- All user inputs are validated
- Database queries are protected against SQL injection
- Middleware checks authentication on every request

---

## What Makes This Project Stand Out

### 1. Addresses a Real Need
Not just a todo app or calculator - this solves an actual problem job seekers face.

### 2. Production-Ready Tech Stack
Uses the same technologies that companies like Netflix, Airbnb, and Uber use.

### 3. Complete Feature Set
- User authentication
- Data visualization
- CRUD operations (Create, Read, Update, Delete)
- Calendar functionality
- Goal tracking
- Review system

### 4. Professional Code Organization
- Clear separation of concerns
- Reusable components
- Modular structure
- Environment configuration

### 5. Can Be Deployed Live
Not just runs on localhost - can be deployed to production for free.

---

## Future Enhancements (Potential)

Ideas for expanding this project:
- Resume builder integration
- Job search aggregation from multiple sites
- Interview preparation resources
- Networking contacts tracker
- Salary tracking and comparison

---

## 👤 Authors

**Abhiram Naidu, Likith Varun Sai**
- GitHub: [abhiram4580](https://github.com/abhiram4580)
- LinkedIn: [Abhiram Naidu](https://www.linkedin.com/in/abhiram-naidu-453174229/)
- GitHub: [likhith1072](https://github.com/likhith1072)
- LinkedIn: [Likith Varun Sai](https://linkedin.com/in/likhith-varun-sai-a71bb6253)

---

## Project Information

**Status:** Completed and functional  
**Version:** 1.0.0  
**Last Updated:** February 2026  
**License:** MIT

---

<div align="center">

### Questions About This Project?

Feel free to explore the code, test the application, or reach out with any questions!

Made by [Abhiram](https://github.com/abhiram4580) and Likith Varun Sai

</div>
