# Campus Placement Management System

A production-style full-stack web application for managing campus placements with role-based access for admins, students, and recruiters.

## Tech Stack

- Frontend: React + Vite + Tailwind CSS
- Backend: Node.js + Express.js
- Database: MySQL
- ORM: Prisma
- Authentication: JWT + bcrypt
- File Uploads: Multer

## Features

- Register and login with `STUDENT` and `RECRUITER` roles
- Seeded `ADMIN` account for platform administration
- Student profile management with resume upload
- Job posting, application workflow, and status tracking
- Recruiter applicant review and status updates
- Admin dashboards for students, recruiters, applications, and overall stats
- Protected routes and role-based access control

## Project Structure

```text
client/
server/
  prisma/
  src/
    config/
    controllers/
    middleware/
    routes/
    uploads/
    utils/
```

## MySQL Schema

Create the database:

```sql
CREATE DATABASE campus_placement_db;
```

The Prisma schema lives in `server/prisma/schema.prisma`.

## Setup

1. Copy `server/.env.example` to `server/.env`.
2. Copy `client/.env.example` to `client/.env`.
3. Install dependencies:

```bash
cd server
npm install

cd ../client
npm install
```

4. Generate Prisma client and run migrations:

```bash
cd server
npx prisma generate
npx prisma migrate dev --name init
npm run prisma:seed
```

5. Start the app in two terminals:

```bash
cd server
npm run dev
```

```bash
cd client
npm run dev
```

Frontend: `http://localhost:5173`

Backend: `http://localhost:5000`

## Default Admin Login

- Email: `admin@campusplacement.com`
- Password: `Admin@123`

## API Highlights

- Auth: `POST /api/auth/register`, `POST /api/auth/login`, `GET /api/auth/me`
- Student aliases: `GET /api/jobs`, `POST /api/apply/:jobId`, `GET /api/applications`
- Recruiter aliases: `POST /api/jobs`, `GET /api/applicants/:jobId`, `PUT /api/application/status`
- Role-scoped routes also exist under `/api/student/*`, `/api/recruiter/*`, and `/api/admin/*`

## Notes

- Resume uploads are limited to PDF files up to 5 MB.
- Recruiter registration creates a recruiter profile and company identity.
- A dedicated `Recruiter` model is included so recruiter ownership of jobs and admin management remain clean and secure.
