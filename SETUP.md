# 🚀 วิธีการติดตั้งและรันโปรเจ็กต์

## ข้อกำหนดเบื้องต้น

- Node.js 18+
- npm หรือ yarn
- Hydra API Key (ขอฟรีได้จาก https://v1.hydr4.me)

## 📋 ขั้นตอนการติดตั้ง

### 1. ติดตั้ง Dependencies

```bash
npm install
```

### 2. ตั้งค่า Environment Variables

สร้างไฟล์ `.env.local`:

```env
# Hydra API URL (Server-side only)
BACKEND_API_URL=https://v1.hydr4.me/v1

# Hydra API Key (Server-side only - ห้ามใช้ NEXT_PUBLIC_!)
API_KEY=your-api-key-here

# Site URL (Server-side only)
SITE_URL=http://localhost:3000
```

### วิธีขอ API Key

1. **สมัครสมาชิก**
   - ไปที่ https://v1.hydr4.me
   - คลิก "Sign Up" หรือ "สมัครสมาชิก"
   - กรอกข้อมูล (ฟรี ไม่มีค่าใช้จ่าย)

2. **สร้าง API Key**
   - Login เข้าสู่ระบบ
   - ไปที่ Dashboard
   - คลิก "API Keys" หรือ "Create New Key"
   - ตั้งชื่อ Key (เช่น "My Hydra Web")
   - กด "Create"

3. **คัดลอก API Key**
   - **⚠️ สำคัญ:** คัดลอก Key ทันที (จะแสดงครั้งเดียว!)
   - เก็บไว้ในที่ปลอดภัย
   - ห้ามแชร์หรือ commit ลง Git

4. **ใส่ใน .env.local**
   ```env
   API_KEY=sk_live_abc123...
   ```

### 3. ทดสอบ API Connection

ตรวจสอบว่า API Key ทำงาน:

```bash
# Windows (PowerShell)
$headers = @{
    'Authorization' = 'Bearer your-api-key-here'
}
Invoke-RestMethod -Uri 'https://v1.hydr4.me/v1/genre' -Headers $headers

# Mac/Linux (curl)
curl -H "Authorization: Bearer your-api-key-here" https://v1.hydr4.me/v1/genre
```

ถ้าสำเร็จ จะได้ response JSON กลับมา:
```json
{
  "data": [
    { "id": "1", "name": "แอคชั่น", "slug": "action" },
    ...
  ]
}
```

### 4. รัน Frontend (Next.js)

```bash
npm run dev
```

เปิดเบราว์เซอร์: http://localhost:3000

## 🔧 ปัญหาที่พบบ่อย

### ❌ Error: API Error: 401 Unauthorized

**สาเหตุ:** API Key ไม่ถูกต้องหรือหมดอายุ

**วิธีแก้:**
1. ตรวจสอบ API Key ใน `.env.local`
2. ต้องมี prefix `API_KEY=` (ไม่ใช่ `NEXT_PUBLIC_API_KEY`)
3. ตรวจสอบว่า Key ยังใช้งานได้ที่ Dashboard
4. ลองสร้าง API Key ใหม่

### ❌ Error: API Error: 404

**สาเหตุ:** Endpoint ไม่ถูกต้องหรือเนื้อหาไม่พบ

**วิธีแก้:**
1. ตรวจสอบ `BACKEND_API_URL` ใน `.env.local`
2. ต้องเป็น `https://v1.hydr4.me/v1` (ไม่มี `/` ท้าย)
3. ตรวจสอบว่า slug ของเนื้อหาถูกต้อง

### ❌ Error: API Error: 429 Too Many Requests

**สาเหตุ:** เกิน rate limit ของ API

**วิธีแก้:**
1. รอ 1-2 นาที แล้วลองใหม่
2. ลด Next.js cache revalidate time
3. อัพเกรด API plan (ถ้ามี)

## 📡 Hydra API Endpoints

API Base URL: `https://v1.hydr4.me/v1`

### Content
- `GET /content` - รายการเนื้อหา (รองรับ search, filter, pagination)
- `GET /content/:slug` - รายละเอียดเนื้อหา พร้อมตอนทั้งหมด
- `GET /content/search/suggestions` - คำแนะนำการค้นหา
- `GET /content/stats` - สถิติเนื้อหายอดนิยม
- `POST /content/:slug/view` - บันทึกการดู
- `POST /content/:slug/star` - ให้คะแนน
- `POST /content/:slug/bookmark` - บุ๊คมาร์ค

### Episode
- `GET /content/:slug/:no` - ดูตอนเฉพาะ พร้อมข้อมูลเนื้อหา
- `POST /content/:slug/:no/view` - บันทึกการดูตอน

### Genre
- `GET /genre` - รายการหมวดหมู่ทั้งหมด

📖 **API Documentation:** https://v1.hydr4.me/docs

## 🌐 โครงสร้างการทำงาน

```
Browser (http://localhost:3000)
   ↓
Next.js Frontend (SSR)
   ↓ (Server-side fetch with Authorization Header)
Hydra API (https://v1.hydr4.me/v1)
   ↓
Hydra Database & CDN
```

### การทำงานของ SSR

1. **Browser** เข้าหน้าเว็บ
2. **Next.js Server** fetch ข้อมูลจาก Hydra API
3. **Render HTML** พร้อมข้อมูลส่งกลับ Browser
4. **Browser** แสดงผล (พร้อม SEO)

## 🚀 Production

### Build

```bash
npm run build
```

### Run Production

```bash
npm start
```

### Environment Variables สำหรับ Production

```env
# Hydra API (Production - Server-side only)
BACKEND_API_URL=https://v1.hydr4.me/v1
API_KEY=sk_live_your-production-api-key

# Your Domain (Server-side only)
SITE_URL=https://yourdomain.com
```

⚠️ **สำคัญ:** ห้าม commit `.env.local` ลง Git!

## 💡 Tips

1. **API Key Security:** 
   - ใช้ `API_KEY` (ไม่ใช่ `NEXT_PUBLIC_API_KEY`)
   - เก็บไว้ใน `.env.local` เท่านั้น
   - ห้าม commit ลง Git

2. **Caching:**
   - Next.js cache API responses อัตโนมัติ
   - Content List: 60 วินาที
   - Content Detail: 5 นาที
   - Genres: 1 ชั่วโมง

3. **Rate Limiting:**
   - Free tier: 100 requests/hour
   - Pro tier: 10,000 requests/hour
   - ถ้าเกินจะได้ 429 error

## 📞 ต้องการความช่วยเหลือ?

1. **ตรวจสอบ API Key:** ลองเรียก API ด้วย curl/Postman
2. **ตรวจสอบ .env.local:** ตั้งค่าถูกต้องหรือไม่
3. **เช็ค Network tab:** ใน Browser DevTools
4. **ดู Console:** มี error อะไรบ้าง
5. **Hydra Support:** https://v1.hydr4.me/support
6. **GitHub Issues:** รายงานปัญหาที่ repository

