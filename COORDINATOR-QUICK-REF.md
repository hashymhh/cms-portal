# Quick Reference - Coordinator System

## 🚀 Quick Start

### Login as Coordinator
```bash
curl -X POST http://localhost:4000/api/coordinator/login \
  -H "Content-Type: application/json" \
  -d '{"email":"coordinator@example.com","password":"coordinator123"}'
```

### Get All Coordinators (with auth)
```bash
curl -X GET http://localhost:4000/api/coordinator/ \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## 🔑 Credentials

| Role | Email | Password |
|------|-------|----------|
| Coordinator | coordinator@example.com | coordinator123 |
| Admin | admin@gmail.com | admin123 |
| Faculty | tempfaculty@example.com | faculty123 |
| Student | ahmed.student@university.pk | student123 |

## 🛡️ Permissions Matrix

| Action | Admin | Coordinator | Faculty | Student |
|--------|-------|-------------|---------|---------|
| Manage Coordinators | ✅ | ❌ | ❌ | ❌ |
| View Coordinators | ✅ | ✅ | ❌ | ❌ |
| Manage Timetables | ✅ | ✅* | ❌ | ❌ |
| Manage Exams | ✅ | ✅* | ❌ | ❌ |
| Manage Notices | ✅ | ✅* | ❌ | ❌ |
| Manage Materials | ✅ | ✅* | ❌ | ❌ |
| View Reports | ✅ | ✅* | ❌ | ❌ |

*Subject to coordinator permissions

## 📁 Key Files

```
backend/
├── models/details/coordinator-details.model.js
├── controllers/details/coordinator-details.controller.js
├── routes/details/coordinator-details.route.js
└── middlewares/auth.middleware.js (enhanced)
```

## 🔧 Status Check

```bash
# Check if servers are running
cd "d:\openedu\krish\College-Management-System-master"
.\CHECK-STATUS.bat

# Restart if needed
.\CLEAN-START.bat
```

## 🌐 Access URLs

- Frontend: http://localhost:3000
- Backend API: http://localhost:4000
- Coordinator API: http://localhost:4000/api/coordinator/