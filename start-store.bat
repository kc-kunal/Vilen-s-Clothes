@echo off
title Vilen's Clothes - Dev Server
echo ========================================================
echo         VILEN'S CLOTHES - E-COMMERCE STORE
echo ========================================================
echo Starting development server on http://localhost:5173 ...
cd /d "%~dp0"
start http://localhost:5173
call npm run dev
pause
