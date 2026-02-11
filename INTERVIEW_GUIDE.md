# HIRE TRACK: Technical Interview Guide 🚀

This guide is designed to help you explain your "Interview Tracker System" project during a technical interview. It covers the **Architecture**, **Tech Stack Decisions**, and a **Deep Dive** into the code.

---

## 1. The "Elevator Pitch" (Project Overview)

**"What is this project?"**
> "Hire Track is a full-stack web application designed to help job seekers organize their entire interview process. It solves the problem of scattered applications by providing a centralized dashboard to track application statuses (Applied, Interviewing, Offered), schedule upcoming interviews, set job search goals, and analyze performance metrics through data visualization."

---

## 2. Architecture & Tech Stack (The "Why")

Interviewers effectively always ask: *"Why did you choose this stack?"* avoiding "because it's popular" is key.

### **Frontend: Next.js (App Router) + TypeScript**
*   **Why Next.js over React (CRA/Vite)?**
    *   **Routing:** Leveraging the file-system based App Router (`app/` directory) simplifies navigation logic compared to setting up `react-router-dom` manually.
    *   **Performance:** Next.js offers automatic code splitting and image optimization.
    *   **Server-Side Rendering (SSR) Capabilities:** Crucial for initial page loads and SEO, ensuring the user sees content faster than a pure client-side SPA.
*   **Why TypeScript?**
    *   **Type Safety:** Prevents entire classes of runtime errors (like `undefined is not a function`) by catching them at compile time.
    *   **Developer Experience:** Provides better autocomplete and self-documentation for component props and API responses.

### **Backend: Node.js + Apollo Server (GraphQL)**
*   **Why GraphQL over REST?**
    *   **No Over-fetching:** The frontend requests *exactly* the data it needs (e.g., just the `company` and `status` for the dashboard card), reducing payload size.
    *   **Single Endpoint:** Instead of managing endpoints like `/api/applications`, `/api/users`, `/api/stats`, we have one `/graphql` endpoint that handles flexible queries.
    *   **Strongly Typed Schema:** The `typeDefs` act as a contract between frontend and backend, ensuring clear communication.

### **Database: PostgreSQL + Prisma ORM**
*   **Why SQL (Postgres) over NoSQL (MongoDB)?**
    *   **Relational Data:** An interview tracker relies on structured relationships: One `User` has many `Applications`, `Goals`, and `Interviews`. SQL handles these relations (Foreign Keys) much better than NoSQL documents.
    *   **Data Integrity:** ACID compliance ensures that financial or strict data (like interview dates) is stored reliably.
*   **Why Prisma?**
    *   It treats your database schema as code (`schema.prisma`), making migrations and schema updates safe and version-controlled.
    *   It provides a type-safe client, so `d.user.findUnique()` creates TypeScript types automatically based on your database schema.

---

## 3. End-to-End Workflow & Code Walkthrough

Let's walk through the request flow: **Client -> Apollo -> Server -> Resolver -> Prisma -> DB**.

### **A. Authentication (Login/Register)**
*   **User Action:** User enters email/password.
*   **Frontend Code:** `app/login/page.tsx` calls a GraphQL Mutation `LOGIN_USER`.
*   **Backend Logic:**
    *   `resolvers.js`: Checks if user exists.
    *   **Security:** Compares hashed password using `bcryptjs`.
    *   **Token:** Generates a **JWT (JSON Web Token)** containing the `userId`.
*   **State:** The frontend stores this JWT (usually in `localStorage`) to authenticate future requests.

### **B. The Dashboard (Main Feature)**
*   **The View:** A Kanban-style board or list of job applications.
*   **Frontend Code (`frontend/app/dashboard`):**
    *   Uses `ApolloClient` `useQuery` to fetch `GET_APPLICATIONS`.
    *   **Optimistic UI:** When you drag a card from "Applied" to "Interview", the UI updates *instantly* before the server responds. If the server fails, it snaps back.
*   **Backend Logic (`backend/src/graphql/resolvers`):**
    *   `Query.applications`: The resolver uses `context.user` (from the JWT) to find *only* that user's applications via `prisma.application.findMany({ where: { userId } })`.

### **C. Analytics Page**
*   **The View:** Charts showing "Applications per Month" or "Status Breakdown".
*   **Frontend Code:** Uses `Chart.js` or generic HTML/CSS bars.
*   **Backend Optimization:**
    *   Instead of fetching 1000 applications and calculating stats in React (slow), the Backend does the heavy lifting.
    *   **Aggregation:** Prisma uses `groupBy` or `count` to return just the numbers (e.g., `{ status: 'Rejected', count: 12 }`).

---

## 4. Key Challenges & How You Solved Them (STAR Method)

Be ready to discuss these "War Stories":

### **Challenge 1: Handling "Environment Variables" across Deployments**
*   **Situation:** The app worked locally but failed on Render/Vercel with 404s or 405s.
*   **Task:** Ensure the frontend points to the correct backend URL in production.
*   **Action:**
    *   Created `render.yaml` to define backend variables (`DATABASE_URL`, `JWT_SECRET`).
    *   Used `NEXT_PUBLIC_API_URL` in the frontend to switch between `localhost:4000` (dev) and `https://render-backend.com/graphql` (prod).
*   **Result:** Seamless deployment where environment-specific configs are handled automatically.

### **Challenge 2: Deployment & Database Migrations**
*   **Situation:** The production database didn't have the tables created locally.
*   **Action:** Modified the `start` script on Render to run `prisma migrate deploy` before starting the server.
*   **Result:** This ensures that every time we push code changes, the production database schema is automatically updated to match.

### **Challenge 3: CORS (Cross-Origin Resource Sharing)**
*   **Situation:** The frontend (hosted on Vercel) couldn't talk to the backend (hosted on Render) due to browser security policies.
*   **Action:** Configured the `cors` middleware in `index.js` to explicitly allow the Vercel domain (`https://hire-track...vercel.app`) to make requests.

---

## 5. File Structure Cheat Sheet

If asked "Where is X code located?":

*   `frontend/lib/apolloClient.ts`: **The Bridge**. Sets up the connection to the backend and attaches the JWT token to headers.
*   `backend/prisma/schema.prisma`: **The Blueprint**. Defines your User, Application, and Goal data models.
*   `backend/src/graphql/typeDefs.js`: **The Contract**. Defines what data is available (Queries) and what actions can be performed (Mutations).
*   `backend/src/graphql/resolvers/`: **The Logic**. The actual functions that run when a query is made.
