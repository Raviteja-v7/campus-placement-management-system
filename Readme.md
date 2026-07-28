# 🎓 Campus Placement Management System

A full-stack Campus Placement Management System that streamlines the recruitment process for students, recruiters, and placement administrators. The platform enables job postings, applications, profile management, resume uploads, role-based access control, and AI-powered job recommendations.

---

## 🚀 Features

### 👨‍🎓 Student

- Register & Login using JWT Authentication
- Complete and update profile
- Upload profile picture to AWS S3
- Upload resume (PDF) to AWS S3
- Browse available job opportunities
- View job details
- Apply for jobs
- Track application status
- AI-based job recommendations based on skills

---

### 🏢 Recruiter / Admin

- Secure Login
- Create new job postings
- Edit existing jobs
- Delete jobs
- View all applicants
- Update application status
- Dashboard with placement statistics

---

### 🔐 Authentication & Authorization

- JWT Authentication
- HTTP-only Cookies
- Protected Routes
- Role-Based Access Control (RBAC)

Roles:

- Student
- Admin

---

## 📂 File Uploads

- Profile Image Upload
- Resume Upload (PDF)
- AWS S3 Object Storage
- Secure File Access

---

### 🤖 AI Recommendation System

Uses Google's Gemini Embedding Model to generate semantic embeddings of:

- Student Skills
- Job Requirements

Embeddings are stored in **Qdrant Vector Database** to perform similarity search and recommend the most relevant jobs to students.

---

## 🛠 Tech Stack

### Frontend
- React 19
- TypeScript
- React Router
- Tailwind CSS
- Formik
- Yup
- Axios
- React Toastify

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- Multer
- AWS S3
- AWS SDK v3

### AI & Search
- Google Gemini Embeddings
- Qdrant Vector Database

### Authentication
- JWT
- HTTP-only Cookies

---

### AI

- Google Gemini Embeddings
- Qdrant Vector Database

---

## 📁 Project Structure

```
Campus Placement Management System
│
├── frontend
│   ├── src
│   │   ├── api
│   │   ├── components
│   │   ├── context
│   │   ├── hooks
│   │   ├── layouts
│   │   ├── pages
│   │   ├── routes
│   │   ├── types
│   │   ├── validation
│   │   └── utils
│   │
│   └── package.json
│
├── backend
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── services
│   ├── utils
│   ├── uploads
│   ├── config
│   └── server.js
│
└── README.md
```

---

## 🗄 Database Schema

### User

- Username
- Email
- Password
- Role

---

### Student Profile

- Department
- CGPA
- Phone
- Experience
- Skills
- Avatar URL
- Resume URL

---

### Job

- Title
- Company
- Location
- Salary
- Description
- Requirements
- Skills Required
- Eligible Branches
- Minimum CGPA
- Deadline
- Created By

---

### Application

- Student
- Job
- Status
- Applied At

Unique Constraint:

```
(Student, Job)
```

to prevent duplicate applications.

---

## 🔐 Role-Based Access

### Student

✅ View Jobs

✅ Apply for Jobs

✅ View Applications

✅ Manage Profile

---

### Admin

✅ Create Job

✅ Edit Job

✅ Delete Job

✅ View Applicants

✅ Update Application Status

---

## REST API

### Authentication

```
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/logout
GET    /api/auth/profile
```

---

### Student Profile

```
GET    /api/profile/me
POST   /api/profile
PUT    /api/profile
POST   /api/profile/avatar
POST   /api/profile/resume
```

---

### Jobs

```
GET    /api/jobs
GET    /api/jobs/:id
POST   /api/jobs
PUT    /api/jobs/:id
DELETE /api/jobs/:id
```

---

### Applications

```
POST   /api/applications/:jobId
GET    /api/applications/my
GET    /api/applications/job/:jobId
PATCH  /api/applications/:id/status
```

---

## Installation

### Clone Repository

```bash
git clone https://github.com/yourusername/campus-placement-management-system.git
```

---

### Backend

```bash
cd backend

npm install

npm run dev
```

---

### Frontend

```bash
cd frontend

npm install

npm run dev
```

---

## ✨ Key Features

- JWT Authentication using HTTP-only Cookies
- Role-Based Access Control (Student/Admin)
- Profile & Resume Management
- AWS S3 Integration for File Storage
- Job Management (CRUD)
- Application Tracking
- Duplicate Application Prevention
- AI-powered Job Recommendation using Gemini Embeddings + Qdrant
- Semantic Vector Search
- Form Validation with Formik & Yup
- Responsive UI with Tailwind CSS

## Environment Variables

### Backend (.env)

```env
PORT=5000

MONGODB_URI=

JWT_SECRET=

AWS_REGION=

AWS_ACCESS_KEY_ID=

AWS_SECRET_ACCESS_KEY=

S3_BUCKET_NAME=

GEMINI_API_KEY=

QDRANT_URL=

QDRANT_API_KEY=
```

---

### Frontend (.env)

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

---

## Screenshots

- Login
- Student Dashboard
- Admin Dashboard
- Profile Page
- Job Listings
- Job Details
- Application Management

(Add screenshots here)

---

## Future Enhancements

- Email Notifications
- Interview Scheduling
- Company Portal
- Student Analytics Dashboard
- Resume Parsing
- AI Resume Feedback
- Placement Statistics
- Dark Mode
- Pagination & Filtering
- Real-time Notifications

---

## Learning Outcomes

- Full Stack MERN Development
- Authentication using JWT
- Role-Based Access Control
- File Uploads using AWS S3
- AWS SDK Integration
- REST API Design
- MongoDB Schema Design
- Form Validation using Formik & Yup
- React Context API
- Protected Routing
- AI-powered Semantic Search using Embeddings
- Vector Database Integration

---

## License

This project is developed for educational purposes.