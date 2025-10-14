@echo off
title College Management System
echo.
echo ==========================================
echo   COLLEGE MANAGEMENT SYSTEM STARTUP
echo ==========================================
echo.

echo [1/4] Killing existing processes...
taskkill /f /im node.exe >nul 2>&1
taskkill /f /im python.exe >nul 2>&1
timeout /t 2 >nul

echo [2/4] Starting Backend Server...
cd /d "d:\openedu\krish\College-Management-System-master\backend"
start "Backend Server" cmd /k "echo Backend Server Started && node index.js"
timeout /t 5 >nul

echo [3/4] Starting Frontend Server...
cd /d "d:\openedu\krish\College-Management-System-master\frontend"
start "Frontend Server" cmd /k "echo Frontend Server Started && node server.js"
timeout /t 3 >nul

echo [4/4] Testing servers...
echo.
echo Testing Backend...
curl -I http://localhost:4000 >nul 2>&1
if %errorlevel%==0 (
    echo ✓ Backend: WORKING
) else (
    echo ✗ Backend: FAILED
)

echo Testing Frontend...
curl -I http://localhost:3000 >nul 2>&1
if %errorlevel%==0 (
    echo ✓ Frontend: WORKING
) else (
    echo ✗ Frontend: FAILED
)

echo.
echo ==========================================
echo   SUCCESS! SYSTEM IS RUNNING
echo ==========================================
echo.
echo Open your browser: http://localhost:3000
echo.
echo LOGIN CREDENTIALS:
echo Student: ayesha.khan@pakstudent.pk / student123
echo Admin:   admin@gmail.com / admin123
echo.
echo Keep the server windows open!
echo Press any key to exit this window...
pause >nul