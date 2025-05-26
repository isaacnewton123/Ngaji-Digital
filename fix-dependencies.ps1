# Fix dependencies for NgajiDigital Frontend

Write-Host "Memulai perbaikan dependensi NgajiDigital Frontend..." -ForegroundColor Cyan

# Install specific versions of the required packages
Write-Host "Menginstall react-markdown dan remark-gfm..." -ForegroundColor Yellow
npm install react-markdown@8.0.7 remark-gfm@3.0.1 --save

# Check if installation was successful
if ($LASTEXITCODE -eq 0) {
    Write-Host "Package berhasil diinstall!" -ForegroundColor Green
    
    # Ask if user wants to restart the development server
    $restart = Read-Host "Apakah Anda ingin memulai ulang server development? (y/n)"
    if ($restart -eq "y") {
        Write-Host "Memulai ulang server development..." -ForegroundColor Yellow
        npm start
    } else {
        Write-Host "Instalasi selesai. Gunakan 'npm start' untuk memulai aplikasi." -ForegroundColor Cyan
    }
} else {
    Write-Host "Terjadi kesalahan saat menginstall package." -ForegroundColor Red
    Write-Host "Silakan coba cara manual:" -ForegroundColor Yellow
    Write-Host "1. npm install react-markdown@8.0.7 --save" -ForegroundColor White
    Write-Host "2. npm install remark-gfm@3.0.1 --save" -ForegroundColor White
} 