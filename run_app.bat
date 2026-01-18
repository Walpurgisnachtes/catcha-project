@echo off
echo ====================================================
echo   Starting Full Stack Application (Expo + FastAPI)
echo ====================================================

:: 1. 啟動後端 (Backend)
echo [1/2] Starting Backend Server...
start "Backend (FastAPI)" cmd /k "cd backend && ..\.venv\Scripts\python.exe -m uvicorn app:app --host 0.0.0.0 --port 8000 --reload"

:: 2. 啟動前端 (Frontend)
echo [2/2] Starting Frontend App...
start "Frontend (Expo)" cmd /k "cd frontend && npx expo start"

echo.
echo Both servers are starting in separate windows.
echo Please check the new windows for logs.
echo ====================================================
pause
