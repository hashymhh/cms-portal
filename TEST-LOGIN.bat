@echo off
echo ====================================================
echo    Quick Login Test - College Management System
echo ====================================================
echo.
echo Opening the College Management System in your browser...
echo.
echo Use these login credentials:
echo.
echo Email: ahmed.student@university.pk
echo Password: student123
echo.
echo After logging in, check these sections:
echo 1. Timetable - Should show grid format
echo 2. Materials - Should show multiple materials per subject  
echo 3. Notices - Should show 10 detailed notices
echo 4. Exam - Should show exam details
echo 5. View Marks - Should show marks for different semesters (mids/finals)
echo.
echo ====================================================

start http://localhost:3000

pause