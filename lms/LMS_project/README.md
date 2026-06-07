# LearnFlow LMS — Enhanced

A full-stack Learning Management System built with Node.js (Express) backend and React (Vite) frontend.

## New Features Added

### 🛡️ Admin Login System
- Admin login via **username + password** OR **email + password**
- Secure token-based admin sessions
- Role-based access (superadmin / admin)

### 📊 Admin Dashboard
- Overview stats: total courses, open/closed, lessons, enrollments
- Manage all courses with full lesson details
- View student enrollment and progress data
- Edit lesson **notes** and **video links** directly from the dashboard
- Toggle course open/closed status
- Add new courses
- Admin accounts viewer (superadmin only)

### 📚 Notes & Video Links per Lesson
- Every lesson now has `notes` (text) and `videoLink` (YouTube URL)
- Admins can view and edit notes/video links for each lesson
- Students see lesson chips on their enrolled courses

## Default Admin Credentials

| Username | Email | Password | Role |
|---|---|---|---|
| admin | admin@learnflow.com | Admin@123 | superadmin |
| teacher | teacher@learnflow.com | Teacher@123 | admin |

## Running the Project

### Backend
```bash
cd backend
npm install
node api-server.js    # Starts REST API on http://localhost:5000
```

### Frontend
```bash
cd frontend
npm install
npm run dev           # Starts Vite dev server on http://localhost:5173
```

## Project Structure

```
LMS_ENHANCED/
├── backend/
│   ├── admins.js         # Admin credentials store
│   ├── api-server.js     # Express REST API (user + admin routes)
│   ├── courses.js        # Course data with lesson notes & video links
│   ├── enroll.js         # Enrollment logic
│   ├── events.js         # EventEmitter setup
│   ├── index.js          # CLI version (original)
│   ├── progress.js       # Lesson completion logic
│   ├── user.js           # User state
│   ├── validator.js      # Input validator
│   └── withdraw.js       # Withdraw logic
└── frontend/
    └── src/
        ├── App.jsx        # Full React app (Student + Admin)
        ├── main.jsx       # Entry point
        └── style.css      # All styles
```
