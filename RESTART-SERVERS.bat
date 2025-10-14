@echo off
title College Management System - Server Restart
echo ====================================================
echo    College Management System - Server Restart
echo ====================================================
echo.

echo [1/3] Stopping all Node.js processes...
taskkill /f /im node.exe 2>nul
timeout /t 2 /nobreak >nul

echo [2/3] Starting Backend Server...
cd /d "%~dp0backend"
start "Backend Server" cmd /k "node index.js"

echo [3/3] Starting Frontend Server...
cd /d "%~dp0frontend"
start "Frontend Server" cmd /k "node server.js"

echo.
echo ====================================================
echo  Both servers are starting up...
echo  Backend: http://localhost:4000
echo  Frontend: http://localhost:3000 
echo  
echo  Login with these credentials:
echo  Email: ahmed.student@university.pk
echo  Password: student123
echo ====================================================
echo.
pause