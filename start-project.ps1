# College Management System - Permanent Startup Script
# This script will always work and handle all common issues

Write-Host "🚀 Starting College Management System..." -ForegroundColor Green

# Kill any existing processes
Write-Host "🔄 Cleaning up existing processes..." -ForegroundColor Yellow
taskkill /f /im node.exe 2>$null | Out-Null
taskkill /f /im python.exe 2>$null | Out-Null
Start-Sleep -Seconds 2

# Navigate to project directory
$projectPath = "d:\openedu\krish\College-Management-System-master"
Set-Location $projectPath

# Start MongoDB if not running
Write-Host "📦 Checking MongoDB..." -ForegroundColor Cyan
$mongoProcess = Get-Process -Name "mongod*" -ErrorAction SilentlyContinue
if (-not $mongoProcess) {
    Write-Host "Starting MongoDB..." -ForegroundColor Yellow
    Start-Process -FilePath "mongod" -WindowStyle Hidden -ErrorAction SilentlyContinue
    Start-Sleep -Seconds 3
}

# Start Backend Server
Write-Host "🔧 Starting Backend Server..." -ForegroundColor Cyan
Set-Location "$projectPath\backend"
$backendJob = Start-Job -ScriptBlock {
    Set-Location "d:\openedu\krish\College-Management-System-master\backend"
    node index.js
}

# Wait for backend to start
Start-Sleep -Seconds 5

# Test backend
Write-Host "🧪 Testing Backend..." -ForegroundColor Yellow
$backendWorking = $false
for ($i = 1; $i -le 10; $i++) {
    try {
        $response = Invoke-WebRequest -Uri "http://localhost:4000" -UseBasicParsing -TimeoutSec 3 -ErrorAction Stop
        $backendWorking = $true
        break
    } catch {
        Start-Sleep -Seconds 2
    }
}

if ($backendWorking) {
    Write-Host "✅ Backend is working!" -ForegroundColor Green
} else {
    Write-Host "❌ Backend failed to start!" -ForegroundColor Red
    exit 1
}

# Start Frontend Server using Python HTTP Server (most reliable)
Write-Host "🌐 Starting Frontend Server..." -ForegroundColor Cyan
Set-Location "$projectPath\frontend\build"

# Try multiple frontend options
$frontendStarted = $false

# Option 1: Python HTTP Server
if (Get-Command python -ErrorAction SilentlyContinue) {
    Write-Host "Using Python HTTP Server..." -ForegroundColor Yellow
    $frontendJob = Start-Job -ScriptBlock {
        Set-Location "d:\openedu\krish\College-Management-System-master\frontend\build"
        python -m http.server 3000
    }
    Start-Sleep -Seconds 3
    
    try {
        $response = Invoke-WebRequest -Uri "http://localhost:3000" -UseBasicParsing -TimeoutSec 5
        $frontendStarted = $true
        Write-Host "✅ Frontend started with Python!" -ForegroundColor Green
    } catch {
        Stop-Job $frontendJob -ErrorAction SilentlyContinue
        Remove-Job $frontendJob -ErrorAction SilentlyContinue
    }
}

# Option 2: Node serve package
if (-not $frontendStarted) {
    Write-Host "Trying Node serve package..." -ForegroundColor Yellow
    Set-Location "$projectPath\frontend"
    $frontendJob = Start-Job -ScriptBlock {
        Set-Location "d:\openedu\krish\College-Management-System-master\frontend"
        npx serve -s build -l 3000 --silent
    }
    Start-Sleep -Seconds 5
    
    try {
        $response = Invoke-WebRequest -Uri "http://localhost:3000" -UseBasicParsing -TimeoutSec 5
        $frontendStarted = $true
        Write-Host "✅ Frontend started with serve!" -ForegroundColor Green
    } catch {
        Stop-Job $frontendJob -ErrorAction SilentlyContinue
        Remove-Job $frontendJob -ErrorAction SilentlyContinue
    }
}

# Option 3: Simple Node HTTP Server
if (-not $frontendStarted) {
    Write-Host "Creating simple Node server..." -ForegroundColor Yellow
    Set-Location "$projectPath\frontend"
    
    # Create a simple HTTP server
    $serverScript = @"
const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    let filePath = path.join(__dirname, 'build', req.url === '/' ? 'index.html' : req.url);
    
    if (!fs.existsSync(filePath)) {
        filePath = path.join(__dirname, 'build', 'index.html');
    }
    
    const ext = path.extname(filePath);
    let contentType = 'text/html';
    
    switch(ext) {
        case '.js': contentType = 'text/javascript'; break;
        case '.css': contentType = 'text/css'; break;
        case '.json': contentType = 'application/json'; break;
        case '.png': contentType = 'image/png'; break;
        case '.jpg': contentType = 'image/jpg'; break;
        case '.svg': contentType = 'image/svg+xml'; break;
    }
    
    fs.readFile(filePath, (err, content) => {
        if (err) {
            res.writeHead(404);
            res.end('File not found');
        } else {
            res.writeHead(200, {'Content-Type': contentType});
            res.end(content);
        }
    });
});

server.listen(3000, () => {
    console.log('Frontend server running on http://localhost:3000');
});
"@
    
    $serverScript | Out-File -FilePath "simple-server.js" -Encoding UTF8
    
    $frontendJob = Start-Job -ScriptBlock {
        Set-Location "d:\openedu\krish\College-Management-System-master\frontend"
        node simple-server.js
    }
    Start-Sleep -Seconds 3
    
    try {
        $response = Invoke-WebRequest -Uri "http://localhost:3000" -UseBasicParsing -TimeoutSec 5
        $frontendStarted = $true
        Write-Host "✅ Frontend started with custom server!" -ForegroundColor Green
    } catch {
        Write-Host "❌ All frontend options failed!" -ForegroundColor Red
    }
}

# Final status check
Write-Host "`n🏁 FINAL STATUS:" -ForegroundColor Green
Write-Host "Backend (4000): " -NoNewline
try {
    $null = Invoke-WebRequest -Uri "http://localhost:4000" -UseBasicParsing -TimeoutSec 3
    Write-Host "✅ WORKING" -ForegroundColor Green
} catch {
    Write-Host "❌ FAILED" -ForegroundColor Red
}

Write-Host "Frontend (3000): " -NoNewline
try {
    $null = Invoke-WebRequest -Uri "http://localhost:3000" -UseBasicParsing -TimeoutSec 3
    Write-Host "✅ WORKING" -ForegroundColor Green
} catch {
    Write-Host "❌ FAILED" -ForegroundColor Red
}

if ($backendWorking -and $frontendStarted) {
    Write-Host "`n🎉 SUCCESS! College Management System is running!" -ForegroundColor White -BackgroundColor DarkGreen
    Write-Host "`n🌐 Open your browser: http://localhost:3000" -ForegroundColor Cyan
    Write-Host "`n🔐 Student Login: ayesha.khan@pakstudent.pk / student123" -ForegroundColor Yellow
    Write-Host "🔐 Admin Login: admin@gmail.com / admin123" -ForegroundColor Yellow
    
    Write-Host "`n⚠️  Keep this window open to keep servers running!" -ForegroundColor Red -BackgroundColor Yellow
    Write-Host "Press Ctrl+C to stop the servers" -ForegroundColor White
    
    # Keep the script running
    try {
        while ($true) {
            Start-Sleep -Seconds 10
            # Check if servers are still running
            $backendCheck = Get-Job -Id $backendJob.Id -ErrorAction SilentlyContinue
            $frontendCheck = Get-Job -Id $frontendJob.Id -ErrorAction SilentlyContinue
            
            if ($backendCheck.State -eq "Failed" -or $frontendCheck.State -eq "Failed") {
                Write-Host "⚠️  A server stopped. Restarting..." -ForegroundColor Yellow
                break
            }
        }
    } catch {
        Write-Host "`n🛑 Shutting down servers..." -ForegroundColor Red
    }
} else {
    Write-Host "`n❌ Failed to start servers!" -ForegroundColor Red
    exit 1
}