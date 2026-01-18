#!/bin/bash

echo "===================================================="
echo "   Starting Full Stack Application (Expo + FastAPI)"
echo "===================================================="

# 取得目前專案的絕對路徑
PROJECT_ROOT=$(pwd)

# 1. 啟動後端 (Backend)
echo "[1/2] Starting Backend Server..."
# 注意：macOS 通常路徑是 .venv/bin/python
osascript -e "tell application \"Terminal\" to do script \"cd '$PROJECT_ROOT/backend' && ../.venv/bin/python -m uvicorn app:app --host 0.0.0.0 --port 8000 --reload\""

# 2. 啟動前端 (Frontend)
echo "[2/2] Starting Frontend App..."
osascript -e "tell application \"Terminal\" to do script \"cd '$PROJECT_ROOT/frontend' && npx expo start\""

echo ""
echo "Both servers are starting in separate terminal windows."
echo "Please check the new windows for logs."
echo "===================================================="