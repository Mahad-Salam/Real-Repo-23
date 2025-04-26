# PowerShell script to update DigiPak and Lighting Plan images

# 1. Copy DigiPak image from WhatsApp image
$digipakSource = "src\WhatsApp Image 2025-04-26 at 03.06.14_c532b9ed.jpg"
$digipakDest = "public\images\blogs\digipak.jpg"

Write-Host "Copying DigiPak image from $digipakSource to $digipakDest"
Copy-Item -Path $digipakSource -Destination $digipakDest -Force
Write-Host "DigiPak image copied successfully"

# 2. Download a new lighting plan image
$lightingPlanDest = "public\images\blogs\lighting-plan.jpg"
$lightingPlanUrl = "https://images.unsplash.com/photo-1545147986-a9d6f2ab03b5?q=80&w=800&auto=format&fit=crop"

Write-Host "Downloading new lighting plan image from $lightingPlanUrl"
Invoke-WebRequest -Uri $lightingPlanUrl -OutFile $lightingPlanDest
Write-Host "Lighting plan image downloaded successfully"

Write-Host "Image updates completed!" 