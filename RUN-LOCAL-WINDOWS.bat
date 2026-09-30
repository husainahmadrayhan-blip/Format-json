@echo off
setlocal
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
  echo Node.js is missing. Install Node.js 20 or newer.
  pause
  exit /b 1
)
where py >nul 2>nul
if not errorlevel 1 (
  set "PYTHON_RUN=py -3"
) else (
  where python >nul 2>nul
  if errorlevel 1 (
    echo Python 3 is missing. Install Python 3.10 or newer.
    pause
    exit /b 1
  )
  set "PYTHON_RUN=python"
)
if not exist "node_modules\vite\bin\vite.js" (
  call npm ci
  if errorlevel 1 goto :failed
)
call npm run build
if errorlevel 1 goto :failed
echo The browser will open automatically. Keep this window open.
%PYTHON_RUN% server.py
if errorlevel 1 goto :failed
exit /b 0
:failed
echo Startup failed. Read the message above.
pause
exit /b 1
