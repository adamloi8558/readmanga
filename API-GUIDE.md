# 📡 Hydra API Integration Guide

## 🔑 API Configuration

### Base URL
```
https://v1.hydr4.me/v1
```

### Authentication
ใช้ Bearer Token ใน Authorization Header:
```
Authorization: Bearer your-api-key-here
```

## 🚀 Quick Start

### 1. ขอ API Key

1. ไปที่ https://v1.hydr4.me
2. สมัครสมาชิก (ฟรี)
3. Dashboard → API Keys → Create New
4. คัดลอก API Key

### 2. ตั้งค่า Environment

สร้างไฟล์ `.env.local`:

```env
BACKEND_API_URL=https://v1.hydr4.me/v1
API_KEY=sk_live_abc123...
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 3. ทดสอบ Connection

```bash
curl -H "Authorization: Bearer your-api-key" \
  https://v1.hydr4.me/v1/genre
```

## 📚 API Endpoints

### Genre API

#### GET /genre
ดึงรายการหมวดหมู่ทั้งหมด

**Response:**
```json
{
  "data": [
    {
      "id": "1",
      "name": "แอคชั่น",
      "slug": "action"
    }
  ]
}
```

---

### Content API

#### GET /content
ค้นหา/ดึงรายการเนื้อหา

**Query Parameters:**
- `q` (string): คำค้นหา
- `genre` (string): slug ของหมวดหมู่
- `sort` (string): relevance | popularity | rating | recent | alphabetical
- `page` (number): หน้าที่ต้องการ (default: 1)
- `limit` (number): จำนวนต่อหน้า (max: 100, default: 20)

**Example:**
```
GET /content?q=dragon&sort=popularity&page=1&limit=20
```

**Response:**
```json
{
  "data": [
    {
      "id": "123",
      "name": "Dragon Devouring Mage",
      "slug": "dragon-devouring-mage",
      "type": "MANGA",
      "thumbnailImage": "https://...",
      "genres": [...],
      "episodes": [...]
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "totalPages": 5
  }
}
```

#### GET /content/:slug
ดึงรายละเอียดเนื้อหา

**Response:**
```json
{
  "data": {
    "id": "123",
    "name": "Dragon Devouring Mage",
    "slug": "dragon-devouring-mage",
    "description": "...",
    "type": "MANGA",
    "completionStatus": "ONGOING",
    "episodes": [
      {
        "id": "1",
        "no": 1,
        "name": "ตอนที่ 1",
        "data": {
          "images": ["url1", "url2"]
        }
      }
    ],
    "genres": [...]
  }
}
```

#### GET /content/search/suggestions
ดึงคำแนะนำการค้นหา

**Query Parameters:**
- `q` (string, required): คำค้นหา (min: 2 chars)
- `limit` (number): จำนวน (max: 20, default: 10)

**Response:**
```json
{
  "data": ["Dragon Ball", "Dragon Quest", "Dragon Devouring Mage"],
  "query": "drag"
}
```

#### GET /content/stats
ดึงสถิติเนื้อหา

**Query Parameters:**
- `sort` (string): rating | like | bookmark | view
- `genre` (string): slug ของหมวดหมู่
- `startDate` (date): วันที่เริ่ม
- `endDate` (date): วันที่สิ้นสุด
- `page` (number)
- `limit` (number)

#### POST /content/:slug/view
บันทึกการดู

**Response:**
```json
{
  "message": "View recorded"
}
```

#### POST /content/:slug/star
ให้คะแนน/ดาว

**Response:**
```json
{
  "message": "Star recorded"
}
```

#### POST /content/:slug/bookmark
บันทึกบุ๊คมาร์ค

**Response:**
```json
{
  "message": "Bookmark recorded"
}
```

---

### Episode API

#### GET /content/:slug/:no
ดึงข้อมูลตอน

**Response:**
```json
{
  "data": {
    "id": "ep-1",
    "no": 1,
    "name": "ตอนที่ 1",
    "data": {
      "images": ["url1", "url2", "url3"]
    },
    "content": {
      "id": "123",
      "name": "Dragon Devouring Mage",
      "slug": "dragon-devouring-mage"
    }
  }
}
```

**Episode Data Types:**
- **MANGA:** `{ images: string[] }`
- **NOVEL:** `{ content: string }`

#### POST /content/:slug/:no/view
บันทึกการดูตอน

**Response:**
```json
{
  "message": "Episode view recorded"
}
```

## 🔒 Error Handling

### HTTP Status Codes

- `200` - Success
- `400` - Bad Request (invalid parameters)
- `401` - Unauthorized (invalid API key)
- `404` - Not Found
- `429` - Too Many Requests (rate limit)
- `500` - Internal Server Error

### Error Response Format

```json
{
  "error": "Error message description"
}
```

### Rate Limiting

- **Free Tier:** 100 requests/hour
- **Pro Tier:** 10,000 requests/hour

เมื่อเกิน limit จะได้ status `429` และต้องรอ 1 ชั่วโมง

## 💡 Best Practices

### 1. Caching
ใช้ Next.js caching:
```typescript
fetch(url, {
  next: { revalidate: 60 } // Cache 60 seconds
})
```

### 2. Error Handling
```typescript
try {
  const data = await api.getContent(slug)
} catch (error) {
  if (error.response?.status === 404) {
    // Not found
  } else if (error.response?.status === 429) {
    // Rate limited
  }
}
```

### 3. Security
- ✅ ใช้ `API_KEY` (server-side only)
- ❌ ห้ามใช้ `NEXT_PUBLIC_API_KEY`
- ✅ เก็บ API Key ใน `.env.local`
- ❌ ห้าม commit API Key ลง Git

## 📊 Rate Limit Optimization

### วิธีลด API Calls

1. **ใช้ Next.js Caching**
   ```typescript
   // Cache 5 minutes
   { next: { revalidate: 300 } }
   ```

2. **Bundle Requests**
   ```typescript
   // ดึงพร้อมกัน
   const [content, genres] = await Promise.all([
     api.getContent(),
     api.getGenres()
   ])
   ```

3. **Client-side Caching**
   - ใช้ React Query
   - ใช้ SWR
   - ใช้ localStorage สำหรับ static data

## 🔗 Resources

- **API Documentation:** https://v1.hydr4.me/docs
- **Dashboard:** https://v1.hydr4.me/dashboard
- **Support:** https://v1.hydr4.me/support
- **Status Page:** https://status.hydr4.me

## ❓ FAQs

### Q: API Key หมดอายุไหม?
A: ไม่หมดอายุ แต่สามารถ revoke ได้ใน Dashboard

### Q: สามารถใช้หลาย API Key ได้ไหม?
A: ได้ สร้างได้ไม่จำกัด (แต่มี rate limit รวมต่อ account)

### Q: มี webhook หรือ real-time updates ไหม?
A: ยังไม่มี แต่กำลังพัฒนา

### Q: รองรับ CORS ไหม?
A: ใช่ รองรับทุก origin

### Q: มี sandbox/test environment ไหม?
A: ไม่มี แต่มี test API Key ที่ limit น้อยกว่า

