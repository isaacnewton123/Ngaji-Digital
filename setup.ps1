# NgajiDigital Frontend Setup Script for Windows

Write-Host "Menyiapkan NgajiDigital Frontend..." -ForegroundColor Cyan

# Install dependencies if node_modules doesn't exist
if (-not (Test-Path node_modules)) {
    Write-Host "Menginstall dependencies..." -ForegroundColor Cyan
    npm install
    Write-Host "Dependencies berhasil diinstall!" -ForegroundColor Green
}
else {
    Write-Host "Dependencies sudah terinstall." -ForegroundColor Yellow
    $reinstall = Read-Host "Apakah Anda ingin menginstall ulang dependencies? (y/n)"
    if ($reinstall -eq "y") {
        Write-Host "Menginstall ulang dependencies..." -ForegroundColor Cyan
        npm install
        Write-Host "Dependencies berhasil diinstall ulang!" -ForegroundColor Green
    }
}

# Remind about backend
Write-Host "`nPenting: Pastikan backend sudah dijalankan sebelum menjalankan frontend." -ForegroundColor Yellow
Write-Host "Untuk menjalankan backend:"
Write-Host "1. Buka terminal baru" 
Write-Host "2. Navigasi ke Backend/ngaji-digital-api" 
Write-Host "3. Jalankan 'npm run dev'"

Write-Host "`nSetup selesai!" -ForegroundColor Cyan
Write-Host "Untuk menjalankan frontend, ketik: npm start" -ForegroundColor White 