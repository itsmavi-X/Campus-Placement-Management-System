# Campus Placement Management System Demo Guide

## Demo Goal

Show that the system supports the full campus placement workflow for three roles:

- Recruiter posts a job
- Student updates profile and applies
- Recruiter reviews the applicant and updates status
- Admin monitors overall platform activity

## Before You Start

Make sure these are running:

```bash
cd server
npm run dev
```

```bash
cd client
npm run dev
```

Open:

- Frontend: `http://localhost:5173`

## Demo Accounts

### Admin

- Email: `admin@campusplacement.com`
- Password: `Admin@123`

### Optional Fresh Test Accounts

You can create new accounts live during the demo:

- One recruiter account
- One student account

This usually looks better than using pre-existing test users.

## Recommended Demo Flow

### 1. Start With Login/Register

Say:

`This system supports three roles: Admin, Student, and Recruiter, each with a separate dashboard and permissions.`

Show:

- Register page
- Role selection during signup
- Login page

### 2. Recruiter Flow

Register or log in as a recruiter.

Show:

- Recruiter dashboard
- Sidebar navigation
- Job posting form

Create a job with:

- Role: `Frontend Developer`
- CGPA: `7.0`
- Package: `8 LPA`
- Location: `Bangalore`

Say:

`Recruiters can create opportunities, view applicants, and update selection status directly from their dashboard.`

### 3. Student Flow

Log out and register or log in as a student.

Go to:

- Profile page

Show:

- Profile update form
- Resume upload
- Skills, branch, CGPA fields

Then go to:

- Job Listings

Apply to the recruiter’s job.

Then go to:

- Applications page

Say:

`Students can maintain a complete placement profile, upload resumes, browse jobs, apply, and track progress in real time.`

### 4. Recruiter Reviews Applicant

Log back in as the recruiter.

Go to:

- Applicants page

Show:

- Applicant details
- Resume link
- Status dropdown

Update the student’s status to:

- `SHORTLISTED`

Say:

`Recruiters can evaluate applicants and move them through the hiring pipeline using simple status updates.`

### 5. Student Tracks Status

Log back in as the student.

Open:

- Applications page

Show that the status changed to:

- `SHORTLISTED`

Say:

`This confirms that the workflow is connected end to end and the student can immediately track application progress.`

### 6. Admin Overview

Log in as admin.

Go to:

- Admin dashboard
- Students page
- Recruiters page
- Applications page

Show:

- Total students
- Total recruiters
- Total jobs
- Total applications
- Recent application activity

Say:

`The admin has centralized visibility into all users, jobs, and application activity across the placement portal.`

## Short 2-Minute Demo Script

`This is a full-stack Campus Placement Management System built with React, Tailwind, Express, Prisma, and MySQL.`

`The platform supports Admin, Student, and Recruiter roles with JWT-based authentication and protected routes.`

`A recruiter can post job openings, students can update their profiles and upload resumes, and then apply for jobs.`

`Recruiters can review applicants and update statuses like Applied, Shortlisted, Rejected, and Selected.`

`Admins can monitor students, recruiters, jobs, and overall placement activity from one dashboard.`

## Tips For Presentation

- Use a fresh recruiter and student account during the demo
- Keep one job already posted as a backup
- Keep the admin login ready in case of time pressure
- Show the sidebar and role-based dashboard differences clearly
- Focus on workflow, not just forms

## If Someone Asks Technical Questions

You can say:

- Frontend uses `React + Vite + Tailwind CSS`
- Backend uses `Node.js + Express`
- Database is `MySQL`
- ORM is `Prisma`
- Authentication uses `JWT + bcrypt`
- Resume uploads use `Multer`
- Role-based authorization is implemented for admin, student, and recruiter
