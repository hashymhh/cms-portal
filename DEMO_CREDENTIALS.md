# College Management System - Demo Credentials

## 🌐 Application URLs
- **Frontend:** http://localhost:3001
- **Backend:** http://localhost:4000

---

## 🔐 Login Credentials

### Admin Account
- **Email:** `admin@gmail.com`
- **Password:** `admin123`
- **Employee ID:** 123456
- **Name:** Sundar Pichai
- **Access:** Full system administration

---

### Student Accounts (All passwords: `student123`)

#### Semester 1 Students
1. **Ayesha Khan Malik**
   - Email: `ayesha.khan@pakstudent.pk`
   - Enrollment: 2023001
   - Semester: 1

2. **Bilal Ahmed Sheikh**
   - Email: `bilal.ahmed@pakstudent.pk`
   - Enrollment: 2023002
   - Semester: 1

3. **Sana Riaz Ali**
   - Email: `sana.riaz@pakstudent.pk`
   - Enrollment: 2023003
   - Semester: 1

4. **Hassan Ali Raza**
   - Email: `hassan.raza@pakstudent.pk`
   - Enrollment: 2023004
   - Semester: 1

5. **Zainab Fatima Hussain**
   - Email: `zainab.hussain@pakstudent.pk`
   - Enrollment: 2023005
   - Semester: 1

#### Semester 3 Students
6. **Omar Tariq Khan**
   - Email: `omar.khan@pakstudent.pk`
   - Enrollment: 2022010
   - Semester: 3

7. **Fatima Noor Ahmad**
   - Email: `fatima.ahmad@pakstudent.pk`
   - Enrollment: 2022011
   - Semester: 3

#### Semester 5 Students
8. **Ali Hassan Butt**
   - Email: `ali.butt@pakstudent.pk`
   - Enrollment: 2021020
   - Semester: 5

---

### Faculty Accounts (All passwords: `faculty123`)

1. **Temp Faculty**
   - Email: `tempfaculty@example.com`
   - Employee ID: 999999

2. **Fatima Shah**
   - Email: `fatima.faculty@example.com`
   - Employee ID: 888888

3. **Zeeshan Khan**
   - Email: `zeeshan.faculty@example.com`
   - Employee ID: 777777

---

### Coordinator Accounts (All passwords: `coordinator123`)

1. **Ahmed Coordinator** (General)
   - Email: `coordinator@example.com`
   - Employee ID: 555555

2. **Sara Exam** (Exam Coordinator)
   - Email: `exam.coordinator@example.com`
   - Employee ID: 555556

3. **Zeeshan Placement** (Placement Coordinator)
   - Email: `placement.coordinator@example.com`
   - Employee ID: 555557

4. **Nadia Event** (Event Coordinator)
   - Email: `event.coordinator@example.com`
   - Employee ID: 555558

---

## 📊 Database Summary
- **Total Admins:** 1
- **Total Students:** 8 (across semesters 1, 3, and 5)
- **Total Faculty:** 3
- **Total Coordinators:** 4

---

## ✅ Testing Checklist

### Admin Panel
- [ ] Login with admin@gmail.com
- [ ] View all students, faculty, coordinators
- [ ] Manage branches, subjects, exams
- [ ] Upload notices, materials

### Student Panel
- [ ] Login with any student account
- [ ] View timetable for their semester
- [ ] Access study materials
- [ ] Check exam schedule
- [ ] View marks/grades

### Faculty Panel
- [ ] Login with any faculty account
- [ ] Upload study materials
- [ ] Manage timetables
- [ ] Add student marks
- [ ] View assigned subjects

### Coordinator Panel
- [ ] Login with any coordinator account
- [ ] View branch materials
- [ ] Access timetables
- [ ] Review exam schedules
- [ ] Monitor student progress

---

## 🚀 Quick Start

1. **Start MongoDB:**
   ```powershell
   cd mongodb-win32-x86_64-windows-8.2.1\bin
   .\mongod.exe --dbpath=..\data
   ```

2. **Start Backend (in PowerShell background job):**
   ```powershell
   cd backend
   Start-Job -ScriptBlock { Set-Location "D:\openedu\krish\College-Management-System-master\backend"; npm start }
   ```
   
   **OR** (if you want to see logs):
   ```powershell
   cd backend
   npm start
   ```

3. **Start Frontend:**
   ```powershell
   cd frontend
   npm start
   ```

4. **Access Application:**
   Open http://localhost:3001 in your browser

---

## 🔧 Troubleshooting

### "User not found" error
- Ensure MongoDB is running
- Restart backend server to trigger seed
- Verify users exist: `node backend/tools/list-users.js`

### Frontend not loading
- Clear browser cache
- Delete `frontend/node_modules/.cache`
- Restart React dev server

### Backend connection error
- Check MongoDB is running on port 27017
- Verify backend is running on port 4000
- Check CORS configuration in backend/index.js

---

**Last Updated:** October 16, 2025
