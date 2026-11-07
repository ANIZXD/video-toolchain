# Video tools for the current PowerShell session.
# Usage:  . C:\Users\ay660\Tools\video\use-video-tools.ps1

$videoRoot = "C:\Users\ay660\Tools\video"

$env:Path = @(
  "$videoRoot\ffmpeg\ffmpeg-9.0.2-essentials_build\bin"
  "$videoRoot\yt-dlp"
  "$videoRoot\whisper\Release"
  $env:Path
) -join ';'

Write-Host "Video tools ready:"
& ffmpeg -version 2>&1 | Select-Object -First 1
& yt-dlp --version
& whisper-cli --help 2>&1 | Select-Object -First 1
