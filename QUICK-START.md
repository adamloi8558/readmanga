# ⚡ Quick Start - เริ่มใช้งานใน 5 นาที

## 🚨 เจอ 500 Error? ทำตามนี้เลย!

### ขั้นที่ 1: สร้างไฟล์ `.env.local`

สร้างไฟล์ชื่อ `.env.local` ใน root folder (ข้างๆ `package.json`):

```env
BACKEND_API_URL=https://v1.hydr4.me/v1
API_KEY=sk_test_1234567890abcdefghijklmnopqrstuvwxyz
SITE_URL=http://localhost:3000
```

### ขั้นที่ 2: ขอ API Key (ฟรี!)

1. **เปิด:** https://v1.hydr4.me
2. **สมัครสมาชิก** (ใช้เวลา 1 นาที)
3. **ไปที่ Dashboard** → API Keys
4. **คลิก "Create New API Key"**
5. **คัดลอก Key** ที่ได้ (จะแสดงครั้งเดียว!)
6. **ใส่ใน `.env.local`:**
   ```env
   API_KEY=sk_live_abc123xyz...
   ```

### ขั้นที่ 3: รีสตาร์ท Dev Server

```bash
# กด Ctrl+C เพื่อหยุด server
# จากนั้นรันใหม่
npm run dev
```

### ขั้นที่ 4: เปิดเว็บ

เปิด browser: http://localhost:3000

## ✅ เช็คว่าได้ผลหรือยัง

### ทดสอบ API Key

```bash
# Windows PowerShell
$headers = @{ 'Authorization' = 'Bearer your-api-key' }
Invoke-RestMethod -Uri 'https://v1.hydr4.me/v1/genre' -Headers $headers

# Mac/Linux
curl -H "Authorization: Bearer your-api-key" https://v1.hydr4.me/v1/genre
```

ถ้าได้ JSON กลับมา = **API Key ใช้ได้!** ✅

## 🐛 ยังเจอปัญหา?

### Error: 401 Unauthorized
→ API Key ผิดหรือหมดอายุ ลองสร้างใหม่

### Error: 404 Not Found  
→ URL ผิด ต้องเป็น `https://v1.hydr4.me/v1` (ไม่มี `/` ท้าย)

### Error: 500 Internal Server Error
→ ยังไม่มี `.env.local` หรือ API Key ไม่ถูกต้อง

### หน้าว่างเปล่า
→ รีสตาร์ท dev server (Ctrl+C และ `npm run dev` ใหม่)

## 📞 ขอความช่วยเหลือ

- **Hydra Support:** https://v1.hydr4.me/support
- **Documentation:** https://v1.hydr4.me/docs
- **ดู Error Message:** เปิด Browser DevTools (F12) → Console tab

---

💡 **Tip:** คัดลอกไฟล์ `.env.local.example` เป็น `.env.local` แล้วแก้ API_KEY ก็ได้!

```bash
Copy-Item .env.local.example .env.local
# แล้วแก้ API_KEY ในไฟล์
```

