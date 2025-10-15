# College Management System

[![MERN Stack](https://img.shields.io/badge/Stack-MERN-blue)](https://www.mongodb.com/mern-stack)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-v16+-green)](https://nodejs.org)
[![React](https://img.shields.io/badge/React-v17+-blue)](https://reactjs.org)

A comprehensive MERN stack-based College Management System that helps manage academic activities, student information, faculty details, and administrative tasks. This system streamlines the management of educational institutions by providing a centralized platform for administrators, faculty, and students.

## Features

### Admin Features

- Manage faculty accounts with detailed profiles and emergency contacts
- Manage student accounts with enrollment numbers and academic details
- Manage academic branches
- Handle subject/course management by semester and branch
- Generate and manage notices for students and faculty
- Upload and manage timetables by branch and semester
- Profile management and password updates

### Faculty Features

- View and manage personal profile with emergency contacts
- Upload and manage study materials (notes, assignments, syllabus)
- Filter and organize materials by subject, semester, and type
- Upload and manage timetables for their branches
- Search and view student information by enrollment, name, or semester
- View and respond to notices
- Update profile and credentials
- Password management and reset functionality

### Student Features

- View personal profile and academic details
- Access study materials filtered by subject and type
- View class timetables with download option
- Access notices and announcements
- Update profile information
- Password management and reset functionality

## Tech Stack

- Frontend: React.js
- Backend: Node.js, Express.js
- Database: MongoDB
- Authentication: JWT

## Prerequisites

- Node.js
- MongoDB
- npm

## Setup Instructions

Sample .env files are included in both backend and frontend (as `.env.example`). Copy those variables to create `.env` in both folders and then follow the steps below.

1. Clone the repository:

```powershell
git clone <repository-url>
cd College-Management-System-master
```

2. Install dependencies:

```powershell
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

3. Create a `.env` file in the backend directory with the following variables:

```
MONGODB_URI =mongodb://127.0.0.1:27017/College-Management-System
PORT = 4000
FRONTEND_API_LINK = http://localhost:3000
JWT_SECRET = THISISSECRET

NODEMAILER_EMAIL =
NODEMAILER_PASS =
```

4. Create a `.env` file in the frontend directory:

```env
REACT_APP_APILINK = http://localhost:4000/api

REACT_APP_MEDIA_LINK = http://localhost:4000/media

```

5. Start the development servers:

```powershell
# Start backend server (from backend directory)
npm run dev

# Start frontend server (from frontend directory)
npm start
```

## Seed Data

The backend automatically seeds core data at startup (admin, branch, subjects, faculty, materials, notices, exams, timetables, and marks). Admin login: admin@gmail.com / admin123. Students are not auto-created; you can add them via the API.

## Project Structure

```
college-management-system/
├── backend/
│   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middlewares/
│   │   ├── utils/
│   │   └── media/
│   └── README.md
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   └── utils/
│   └── public/
└── README.md
```

## For Any Doubt Feel Free To Contact Me 🚀

- [My Website](http://krishjotaniya.netlify.app/)
- [Linkedin](https://www.linkedin.com/in/krishjotaniya/)
- [krishjotaniya71@gmail.com](mailto:krishjotaniya71@gmail.com)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
