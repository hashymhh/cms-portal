# Run Guide – College Management System

This guide gives you copy–paste steps to get the project running (development & lightweight production style) on your local Windows machine.

---
## 1. Prerequisites
Install first (verify with the commands):

| Tool | Required Version (Min) | Check Command |
|------|------------------------|---------------|
| Node.js | 16+ (18+ recommended) | `node -v` |
| npm | 8+ | `npm -v` |
| MongoDB (optional) | 5+ | `mongod --version` |

MongoDB is optional because the backend auto–falls back to an *in‑memory* MongoDB (mongodb-memory-server) if it cannot connect to your local instance. Data in memory mode is lost when you stop the backend.

---
## 2. Clone & Install Dependencies
```powershell
git clone <repository-url>
cd College-Management-System-master

# Backend deps
cd backend
npm install

# Frontend deps
cd ../frontend
npm install
```

---
## 3. Environment Files
Sample env templates are provided:

`backend/.env.example`
```env
MONGODB_URI=mongodb://127.0.0.1:27017/College-Management-System
PORT=4000
FRONTEND_API_LINK=http://localhost:3000
JWT_SECRET=THISISSECRET
NODEMAILER_EMAIL=
NODEMAILER_PASS=
```

`frontend/.env.example`
```env
REACT_APP_APILINK=http://localhost:4000/api
REACT_APP_MEDIA_LINK=http://localhost:4000/media
```

Create actual `.env` files (or let `run-dev.ps1` copy them for you):
```powershell
Copy-Item backend/.env.example backend/.env
Copy-Item frontend/.env.example frontend/.env
```

If you want persistent data, start your local MongoDB service before running the backend.

---
## 4. Seeding Data
There are two seed mechanisms:
- `admin-seeder.js` (script via `npm run seed`) – creates only the initial admin if missing.
- `tools/startup-seed.js` – runs automatically on server start and creates: admin, branch, subject, faculty, material (idempotent).

So after first install you can optionally run:
```powershell
cd backend
npm run seed   # optional (startup seed will also provision)
```

### Default Seeded Credentials
| Role | Email | Password |
|------|-------|----------|
| Admin | admin@gmail.com | admin123 |
| Faculty | tempfaculty@example.com | faculty123 |
| Student (you create) | (see below) | student123 |

Students are NOT auto-created. Create one through the API (multipart form). Example (PowerShell using curl style):
```powershell
curl -Method Post -Uri http://localhost:4000/api/student/register -Form @{
  firstName='Test'; middleName='S'; lastName='User'; phone='1234567890';
  semester='1'; branchId='64a1b2c3d4e5f67890123456'; gender='male'; dob='2000-01-01';
  address='Some Addr'; city='City'; state='State'; pincode='123456'; country='India';
  file=Get-Item backend/media/Faculty_Profile_123456.jpg
}
```
The backend will auto-generate an enrollment number and derive the email: `<enrollmentNo>@gmail.com`. Password defaults to `student123`.

---
## 5. Run in Development
Open two terminals OR use the helper script.

Manual method:
```powershell
# Terminal 1 – backend
cd backend
npm run dev

# Terminal 2 – frontend
cd frontend
npm start
```
Access:
- Backend health: http://localhost:4000/
- Frontend app: http://localhost:3000/

Helper script ( launches both ): 
```powershell
powershell -ExecutionPolicy Bypass -File .\run-dev.ps1
```

---
## 6. Production-Style (Local) Build & Serve
Build the React frontend and serve it with a simple static server while the backend runs.
```powershell
# Build frontend
cd frontend
npm run build

# Option A: use provided simple server
node simple-static-server.js  # serves build on port 3000

# Option B: install a lightweight static server
npm install -g serve
serve -s build -p 3000
```

Backend (in another terminal):
```powershell
cd backend
npm start
```

---
## 7. Common Issues & Fixes
| Problem | Cause | Fix |
|---------|-------|-----|
| `EADDRINUSE: :4000` | Port busy | Kill process using port: `Get-NetTCPConnection -LocalPort 4000 | Select OwningProcess` then `Stop-Process -Id <pid>` |
| `connect ECONNREFUSED 127.0.0.1:27017` then fallback message | MongoDB not running | This is fine: in-memory fallback engaged (data temporary). Start MongoDB for persistence. |
| Frontend shows blank / fails to fetch | Wrong API base | Check `frontend/.env` REACT_APP_APILINK matches backend port. Re-run `npm start` after change. |
| CORS blocked | FRONTEND_API_LINK mismatch | Ensure backend `.env` FRONTEND_API_LINK equals the URL you load in browser (http://localhost:3000). Restart backend. |
| JSON parse error on login | Incorrect curl quoting on Windows | Use a file (`-d @file.json`) or PowerShell hashtable with `Invoke-RestMethod`. |

---
## 8. Testing Auth Quickly
```powershell
# Admin Login
curl -Method Post -Uri http://localhost:4000/api/admin/login -ContentType 'application/json' -Body '{"email":"admin@gmail.com","password":"admin123"}'

# Faculty Login
curl -Method Post -Uri http://localhost:4000/api/faculty/login -ContentType 'application/json' -Body '{"email":"tempfaculty@example.com","password":"faculty123"}'
```

Copy the `data.token` from responses for authorized calls:
```powershell
$token = 'PASTE_JWT_HERE'
curl -Headers @{ Authorization = "Bearer $token" } http://localhost:4000/api/subject
```

---
## 9. Project Lifecycle Summary
1. Install deps
2. Create / confirm `.env` files
3. Start backend (auto-seeds core data)
4. Create student(s) via API (optional)
5. Start frontend
6. Login with seeded credentials
7. (Optional) Build & serve static build

---
## 10. Support
If emails (Nodemailer) are needed, fill `NODEMAILER_EMAIL` / `NODEMAILER_PASS` then restart backend.

Enjoy building! 🚀
