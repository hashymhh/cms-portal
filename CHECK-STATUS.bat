@echo off
title System Status Check
color 0B
echo.
echo ====================================================
echo           COLLEGE MANAGEMENT SYSTEM
echo               STATUS VERIFICATION
echo ====================================================
echo.

echo Checking Backend Server (Port 4000)...
curl -s http://localhost:4000 >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Backend: RUNNING
) else (
    echo ❌ Backend: NOT RUNNING
)

echo.
echo Checking Frontend Server (Port 3000)...
curl -s http://localhost:3000 >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Frontend: RUNNING
) else (
    echo ❌ Frontend: NOT RUNNING
)

echo.
echo ====================================================
echo If both show RUNNING, your system is ready!
echo Open: http://localhost:3000
echo Login: ahmed.student@university.pk / student123
echo ====================================================
echo.
pause