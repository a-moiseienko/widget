@echo off
rem Start the widget dev server on http://localhost:5173 (needs Node.js and npm).
cd /d "%~dp0.."
if not exist node_modules call npm ci
call npm run dev
