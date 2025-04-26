# Direct method to update images
$webclient = New-Object System.Net.WebClient

# 1. Copy DigiPak image from WhatsApp image
$digipakSource = "src\WhatsApp Image 2025-04-26 at 03.06.14_c532b9ed.jpg"
$digipakDest = "public\images\blogs\digipak.jpg"
Copy-Item -Path $digipakSource -Destination $digipakDest -Force
Write-Output "DigiPak image updated"

# 2. Download new lighting plan image directly
$lightingPlanUrl = "https://images.unsplash.com/photo-1610060325112-be0812101767?q=80&w=800&auto=format&fit=crop"
$lightingPlanDest = "public\images\blogs\lighting-plan.jpg"

try {
    $webclient.DownloadFile($lightingPlanUrl, $lightingPlanDest)
    Write-Output "Lighting plan image downloaded successfully"
} catch {
    Write-Output "Error downloading lighting plan image: $_"
    # Fallback to using a known working image
    Copy-Item -Path "public\images\blogs\music-video-concept.jpg" -Destination $lightingPlanDest -Force
    Write-Output "Used fallback image for lighting plan"
}

Write-Output "Updates completed!" 