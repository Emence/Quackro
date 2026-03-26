# Build VSIX for bmd-macro-language
# Usage: .\build-vsix.ps1

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

# --- paths ---
$ExtDir  = $PSScriptRoot
$NodeDir = 'D:\#mcp\node-v24.14.0-win-x64'

# Add Node to PATH for this session
$env:PATH = "$NodeDir;$env:PATH"

# --- read version from package.json ---
$pkg     = Get-Content "$ExtDir\package.json" -Raw | ConvertFrom-Json
$version = $pkg.version
$name    = $pkg.name

Write-Host "Packaging $name v$version ..." -ForegroundColor Cyan

Set-Location $ExtDir

# --- run vsce ---
$vsceCmd = "$NodeDir\vsce.cmd"
if (-not (Test-Path $vsceCmd)) {
    Write-Host "vsce not found, installing globally ..." -ForegroundColor Yellow
    & "$NodeDir\npm.cmd" install -g @vscode/vsce
}

& $vsceCmd package --allow-missing-repository --out "$ExtDir\$name-$version.vsix"

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "Done! Created: $name-$version.vsix" -ForegroundColor Green
} else {
    Write-Host "Packaging failed." -ForegroundColor Red
    exit 1
}
