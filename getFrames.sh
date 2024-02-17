wget https://ia802905.us.archive.org/19/items/TouhouBadApple/Touhou%20-%20Bad%20Apple.mp4
mkdir splitVideo
mv "Touhou - Bad Apple.mp4" splitVideo/bad_apple.mp4
ffmpeg -i splitVideo/bad_apple.mp4 splitVideo/%04d.png