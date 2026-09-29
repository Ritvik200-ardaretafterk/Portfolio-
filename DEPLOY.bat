@echo off
title Deploy Portfolio to GitHub Pages
color 0A

echo ============================================================
echo    RITVIK PORTFOLIO ^| GitHub Pages Auto-Deploy Script
echo ============================================================
echo.
echo Step 1 of 3: Creating GitHub repository...
echo.
echo ACTION REQUIRED:
echo    Open this URL in your browser NOW:
echo    https://github.com/new
echo.
echo Fill in:
echo    Repository name: portfolio
echo    Description:     My Personal Portfolio
echo    Visibility:      Public
echo    (Leave all checkboxes UNCHECKED)
echo    Click: Create repository
echo.
pause

echo.
echo Step 2 of 3: Connecting and pushing your code...
git remote add origin https://github.com/Ritvik200-ardaretafterk/portfolio.git
git branch -M main
git push -u origin main

if %ERRORLEVEL% EQU 0 (
    echo.
    echo Step 3 of 3: Enabling GitHub Pages...
    echo.
    echo ACTION REQUIRED:
    echo    Open: https://github.com/Ritvik200-ardaretafterk/portfolio/settings/pages
    echo.
    echo    Under "Build and deployment":
    echo       Source  = Deploy from a branch
    echo       Branch  = main
    echo       Folder  = / (root)
    echo    Click: Save
    echo.
    echo ============================================================
    echo    YOUR PORTFOLIO LINK (live in ~1 minute):
    echo    https://ritvik200-ardaretafterk.github.io/portfolio/
    echo ============================================================
    start https://ritvik200-ardaretafterk.github.io/portfolio/
) else (
    echo.
    echo ERROR: Push failed. Make sure you:
    echo   1. Created the repo at github.com/new  
    echo   2. Are logged in to GitHub on this PC
    echo.
    echo If asked for username/password:
    echo   Username: Ritvik200-ardaretafterk
    echo   Password: Your GitHub Personal Access Token
    echo   (Get one at: https://github.com/settings/tokens/new)
)

echo.
pause
