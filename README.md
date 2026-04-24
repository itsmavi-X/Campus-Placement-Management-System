# Campus Placement Management System

A full-stack placement portal for colleges to manage students, recruiters, job openings, applications, and hiring status updates from one system.

Suggested GitHub description:
`Full-stack Campus Placement Management System built with React, Tailwind CSS, Node.js, Express, Prisma, and MySQL.`

## Overview

This project is designed for campus placement cells that need a centralized workflow for:

- student profile management
- recruiter job posting
- application tracking
- status updates
- admin monitoring and analytics

The platform uses role-based authentication so each user sees a dedicated dashboard and only the actions they are allowed to perform.

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

## Role Modules

### Student

- Create and update profile
- Upload PDF resume
- Browse available jobs
- Apply to jobs
- Track application status

### Recruiter

- Register with company identity
- Post job openings
- View applicants for each job
- Update candidate status

### Admin

- Monitor students
- Monitor recruiters
- Monitor all applications
- View dashboard statistics

## Screenshots

Add your screenshots inside `docs/screenshots/` and update the paths below.

### Login Page

![Login Page](docs/screenshots/login-page.png)

### Student Dashboard

![Student Dashboard](docs/screenshots/student-dashboard.png)

### Recruiter Dashboard

![Recruiter Dashboard](docs/screenshots/recruiter-dashboard.png)

### Admin Dashboard

![Admin Dashboard](docs/screenshots/admin-dashboard.png)

## Project Structure

```text
client/
  src/
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

Main models:

- `User`
- `Student`
- `Recruiter`
- `Company`
- `Application`

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

## Demo Credentials

## API Highlights

- Auth: `POST /api/auth/register`, `POST /api/auth/login`, `GET /api/auth/me`
- Student aliases: `GET /api/jobs`, `POST /api/apply/:jobId`, `GET /api/applications`
- Recruiter aliases: `POST /api/jobs`, `GET /api/applicants/:jobId`, `PUT /api/application/status`
- Role-scoped routes also exist under `/api/student/*`, `/api/recruiter/*`, and `/api/admin/*`

## Validation And Security

- Passwords are hashed using `bcryptjs`
- JWT is used for authentication
- Role-based middleware protects secure routes
- Resume upload accepts PDF files only
- File size is limited for uploads
- APIs return structured error messages

## Presentation Notes

- A short demo script is available in `DEMO_GUIDE.md`
- Use a recruiter account to create a job, then a student account to apply, then the admin account to present analytics
- The project has been tested through API flow and browser UI flow

## Notes

- Resume uploads are limited to PDF files up to 5 MB.
- Recruiter registration creates a recruiter profile and company identity.
- A dedicated `Recruiter` model is included so recruiter ownership of jobs and admin management remain clean and secure.
