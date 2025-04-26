@echo off
echo Updating DigiPak and Lighting Plan images...

REM Copy DigiPak image from WhatsApp image
copy "src\WhatsApp Image 2025-04-26 at 03.06.14_c532b9ed.jpg" "public\images\blogs\digipak.jpg"
echo DigiPak image updated.

REM Use a copy of an existing working image for the lighting plan
copy "public\images\blogs\music-video-concept.jpg" "public\images\blogs\lighting-plan.jpg"
echo Lighting Plan image updated.

echo Image updates completed! 