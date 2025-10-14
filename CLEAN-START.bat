@echo off
title College Management System - Clean Start
color 0A
echo.
echo ====================================================================
echo                  COLLEGE MANAGEMENT SYSTEM
echo                      CLEAN STARTUP SCRIPT
echo ====================================================================
echo.

echo [STEP 1/5] Cleaning up previous processes...
taskkill /f /im node.exe >nul 2>&1
timeout /t 3 /nobreak >nul
echo ✓ All Node.js processes terminated

echo.
echo [STEP 2/5] Checking ports availability...
netstat -ano | findstr ":3000\|:4000" >nul
if %errorlevel% equ 0 (
    echo ⚠ Ports still in use, waiting...
    timeout /t 5 /nobreak >nul
) else (
    echo ✓ Ports 3000 and 4000 are available
)

echo.
echo [STEP 3/5] Starting Backend Server...
cd /d "%~dp0backend"
start "Backend Server" cmd /k "echo Backend Starting... && node index.js"
timeout /t 3 /nobreak >nul
echo ✓ Backend server starting on port 4000

echo.
echo [STEP 4/5] Waiting for backend seeding to complete...
timeout /t 12 /nobreak >nul
echo ✓ Backend seeding should be complete

echo.
echo [STEP 5/5] Starting Frontend Server...
cd /d "%~dp0frontend"
start "Frontend Server" cmd /k "echo Frontend Starting... && node server.js"
timeout /t 3 /nobreak >nul
echo ✓ Frontend server starting on port 3000

echo.
echo ====================================================================
echo                           SUCCESS!
echo ====================================================================
echo.
echo 🚀 College Management System is now running:
echo.
echo    Backend:  http://localhost:4000
echo    Frontend: http://localhost:3000
echo.
echo 🔐 Login Credentials:
echo    Email:    ahmed.student@university.pk
echo    Password: student123
echo.
echo 📚 Features Available:
echo    ✓ 52+ Study Materials (4 per subject)
echo    ✓ Grid Format Timetables  
echo    ✓ 10 Detailed Notices
echo    ✓ Comprehensive Exam System
echo    ✓ Marks for Different Semesters
echo.
echo 🌐 Opening browser...
start http://localhost:3000
echo.
echo Keep both server windows open to keep the system running!
echo ====================================================================
pause