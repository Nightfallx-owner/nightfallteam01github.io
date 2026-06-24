import time
import pychromecast
try:
    from pychromecast.controllers.youtube import YouTubeController
except ModuleNotFoundError:
    from pychromecast.apps.youtube import YouTubeController

# 1. Qurilmalarni qidirish
chromecasts, browser = pychromecast.get_chromecasts()

if not chromecasts:
    print("[-] Televizor topilmadi.")
    exit()

cast = chromecasts[0]
cast.wait()

yt_status = YouTubeController()
cast.register_handler(yt_status)

# Ijro etiladigan video va vaqt balansi
video_id = "KCVN-SuBBWM" 
KUTISH_SEKUNDI = 15  # Shu vaqt o'tgach, o'zi avtomat chiqadi

print(f"[*] Video qo'yilmoqda. Taymer ishga tushdi: {KUTISH_SEKUNDI} soniya.")
yt_status.play_video(video_id)

# 2. Ekrandagi vaqt taymeri (Terminalda kuzatib turish uchun)
for sekund in range(KUTISH_SEKUNDI, 0, -1):
    print(f"\r[+] Avtomatik chiqishga qoldi: {sekund} soniya...", end="")
    time.sleep(1)

print("\n\n[*] Vaqt tugadi! Televizorga chiqish buyrug'i yuborilmoqda...")

# 3. Videoni to'xtatish va YouTube ilovasidan mutloq chiqib ketish
try:
    media_ctrl = cast.media_controller
    media_ctrl.stop()  # Videoni to'xtatadi
    cast.quit_app()    # Ilovani yopib, TV bosh sahifasiga qaytaradi
    print("[+] TV muvaffaqiyatli eski holatiga qaytarildi.")
except Exception as e:
    print(f"[-] Chiqishda xatolik: {e}")

# Qidiruv xizmatini to'xtatish
pychromecast.discovery.stop_discovery(browser)
