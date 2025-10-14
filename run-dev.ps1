<#!
.SYNOPSIS
  Convenience script to start backend & frontend dev servers for the College Management System.

.DESCRIPTION
  - Ensures .env files exist (copies from .env.example if missing)
  - Starts Mongo-backed (or in-memory fallback) backend on port 4000
  - Starts React dev server on port 3000
  - Streams logs (press Ctrl+C to stop a side; use Stop-Job to terminate a specific job)

.USAGE
  powershell -ExecutionPolicy Bypass -File .\run-dev.ps1
!#>

Write-Host "=== College Management System Dev Runner ===" -ForegroundColor Cyan

function Ensure-EnvFile {
  param(
    [Parameter(Mandatory)][string]$Path,
    [Parameter(Mandatory)][string]$ExamplePath
  )
  if (-not (Test-Path $Path)) {
    if (Test-Path $ExamplePath) {
      Copy-Item $ExamplePath $Path
      Write-Host "Created $(Split-Path -Leaf $Path) from example." -ForegroundColor Yellow
    } else {
      Write-Warning "Missing example env: $ExamplePath"
    }
  }
}

Push-Location $PSScriptRoot
try {
  Ensure-EnvFile -Path "backend/.env" -ExamplePath "backend/.env.example"
  Ensure-EnvFile -Path "frontend/.env" -ExamplePath "frontend/.env.example"

  if (-not (Get-Command npm -ErrorAction SilentlyContinue)) {
    Write-Error "npm not found in PATH. Install Node.js first."; exit 1
  }

  # Start backend
  Write-Host "Starting backend (port 4000)..." -ForegroundColor Green
  $backendJob = Start-Job -Name cms-backend -ScriptBlock {
    Set-Location $using:PSScriptRoot/backend
    npm run dev
  }

  # Start frontend
  Write-Host "Starting frontend (port 3000)..." -ForegroundColor Green
  $frontendJob = Start-Job -Name cms-frontend -ScriptBlock {
    Set-Location $using:PSScriptRoot/frontend
    npm start
  }

  Write-Host "Both jobs started. Streaming logs..." -ForegroundColor Cyan
  Write-Host "(Use Get-Job to list, Receive-Job -Name cms-backend to view buffered output.)" -ForegroundColor DarkGray

  while ($true) {
    if ($backendJob.State -ne 'Running' -or $frontendJob.State -ne 'Running') {
      Write-Warning "One of the jobs stopped. Exiting tail loop."; break
    }
    Start-Sleep -Seconds 5
  }
}
finally {
  Pop-Location
}
