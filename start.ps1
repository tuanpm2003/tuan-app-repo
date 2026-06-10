# AI Study Buddy - Quick Start Script

Write-Host "==================================" -ForegroundColor Cyan
Write-Host "AI Study Buddy - Setup & Start" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan
Write-Host ""

# Check if node_modules exists
if (-Not (Test-Path "node_modules")) {
    Write-Host "Installing dependencies..." -ForegroundColor Yellow
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Error installing dependencies!" -ForegroundColor Red
        exit 1
    }
    Write-Host "Dependencies installed successfully!" -ForegroundColor Green
} else {
    Write-Host "Dependencies already installed." -ForegroundColor Green
}

Write-Host ""

# Clean .next folder if exists
if (Test-Path ".next") {
    Write-Host "Cleaning build cache..." -ForegroundColor Yellow
    Remove-Item -Recurse -Force .next
}

Write-Host ""
Write-Host "Starting development server..." -ForegroundColor Yellow
Write-Host "Please wait, first build may take 1-2 minutes..." -ForegroundColor Yellow
Write-Host ""
Write-Host "Once ready, open: http://localhost:3000" -ForegroundColor Green
Write-Host ""
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Gray
Write-Host ""

npm run dev
