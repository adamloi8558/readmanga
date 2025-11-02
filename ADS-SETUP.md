# 📢 คู่มือตั้งค่าโฆษณา A-Ads

## 🎯 วิธีใช้งาน

### ขั้นตอนที่ 1: เปิด/ปิดโฆษณา

แก้ไขไฟล์ `src/config/ads.ts`:

```typescript
export const ADS_CONFIG = {
  enabled: true,  // เปลี่ยนเป็น false = ปิดโฆษณาทั้งหมด
  
  positions: {
    homeTop: true,        // หน้าแรก - บนสุด
    homeGrid: false,      // หน้าแรก - ระหว่างการ์ตูน
    contentDetail: true,  // หน้ารายละเอียด - หลังรายการตอน
    readerTop: true,      // หน้าอ่าน - ก่อนภาพแรก
    readerMiddle: false,  // หน้าอ่าน - ระหว่างภาพ (ทุก 10 ภาพ)
    readerBottom: true,   // หน้าอ่าน - หลังภาพสุดท้าย
    sidebar: false,       // Sidebar ขวามือ
  },
  
  frequency: {
    homeGrid: 10,         // แสดงทุก 10 การ์ตูน
    readerMiddle: 10,     // แสดงทุก 10 ภาพ
  },
};
```

---

### ขั้นตอนที่ 2: เปลี่ยน Zone ID

แก้ไขไฟล์ `src/components/ads/AAds.tsx`:

```typescript
export const AD_ZONES = {
  HOME_TOP: '2373627',           // ← เปลี่ยนเป็น Zone ID ของคุณ
  HOME_GRID: '2373627',          
  CONTENT_DETAIL: '2373627',     
  READER_TOP: '2373627',         
  READER_MIDDLE: '2373627',      
  READER_BOTTOM: '2373627',      
  SIDEBAR: '2373627',            
};
```

**แต่ละ Zone สามารถใช้ Zone ID ต่างกันได้** เพื่อ track แยกกัน

---

## 📍 ตำแหน่งที่โฆษณาจะแสดง

### 1. **หน้าแรก (Home)**

#### `homeTop` - บนสุด (ก่อน Hero)
- ตำแหน่ง: `src/app/(main)/page.tsx`  
- แสดง: 1 ครั้ง ด้านบนสุด

#### `homeGrid` - ระหว่างการ์ตูน
- ตำแหน่ง: `src/components/content/ContentGrid.tsx`
- แสดง: ทุก 10 การ์ตูน (กำหนดได้ใน `frequency.homeGrid`)

---

### 2. **หน้ารายละเอียดการ์ตูน**

#### `contentDetail` - หลังรายการตอน  
- ตำแหน่ง: `src/components/content/ContentDetailClient.tsx`
- แสดง: หลังรายการตอน ก่อนส่วน Recommended

---

### 3. **หน้าอ่านการ์ตูน (Reader)** ⭐ สำคัญสุด

#### `readerTop` - ก่อนภาพแรก
- แสดงก่อนอ่าน ภาพที่ 1

#### `readerMiddle` - ระหว่างภาพ
- แสดงทุก 10 ภาพ (กำหนดได้)
- ตัวอย่าง: หลังภาพที่ 10, 20, 30...

#### `readerBottom` - หลังภาพสุดท้าย
- แสดงหลังอ่านจบ

---

### 4. **Sidebar**

#### `sidebar` - ขวามือ
- ตำแหน่ง: `src/components/layout/Sidebar.tsx`
- แสดง: ทุกหน้าที่มี Sidebar

---

## 🔧 ตัวอย่างการใช้งาน

### ใส่โฆษณาเอง (Custom):

```typescript
import { AAds } from '@/components/ads/AAds';

// ใส่ในหน้าใดก็ได้
<AAds 
  zoneId="2373627" 
  position="home-top"
  width="70%"  // กำหนดความกว้าง
/>
```

---

## 💰 กลยุทธ์แนะนำ (Maximize Revenue):

### **แบบเบา** (UX ดี):
```typescript
{
  homeTop: true,         // เปิด
  contentDetail: true,   // เปิด
  readerTop: true,       // เปิด
  readerBottom: true,    // เปิด
  // อื่นๆ ปิด
}
```

### **แบบกลาง** (สมดุล):
```typescript
{
  homeTop: true,
  homeGrid: true,          // เปิด
  contentDetail: true,
  readerTop: true,
  readerMiddle: false,     // ยังปิด (อาจรบกวนการอ่าน)
  readerBottom: true,
}
```

### **แบบเต็ม** (Revenue สูงสุด):
```typescript
{
  // เปิดทุกตัว
  homeTop: true,
  homeGrid: true,
  contentDetail: true,
  readerTop: true,
  readerMiddle: true,      // เปิด
  readerBottom: true,
  sidebar: true,
}
```

---

## 📝 หมายเหตุ:

1. **Zone ID**: สมัครที่ https://a-ads.com
2. **ความถี่**: แก้ใน `ADS_CONFIG.frequency`
3. **Adaptive Size**: A-Ads จะปรับขนาดให้อัตโนมัติ
4. **Performance**: ไม่กระทบความเร็วเว็บ

---

## 🚀 Deploy

หลังแก้เสร็จ:
```bash
git add -A
git commit -m "feat: add A-Ads integration"
git push
```

รอ deployment เสร็จ → โฆษณาจะแสดงตามที่ตั้งค่า!

