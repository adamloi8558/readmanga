# 🔒 Security Best Practices

## ⚠️ สิ่งสำคัญที่ต้องรู้

### Environment Variables

#### ✅ ใช้ Server-side (ปลอดภัย)

```env
# ✅ ถูกต้อง - อยู่ฝั่ง server เท่านั้น
API_KEY=sk_live_abc123...
BACKEND_API_URL=https://v1.hydr4.me/v1
SITE_URL=https://yourdomain.com
DATABASE_URL=postgresql://...
```

**ใช้ได้ใน:**
- Server Components (default ใน Next.js 14)
- API Routes
- Server Actions
- Middleware

**Browser มองไม่เห็น!** ✅

#### ❌ ห้ามใช้ NEXT_PUBLIC_* สำหรับความลับ

```env
# ❌ ผิด - จะถูกส่งไปที่ browser!
NEXT_PUBLIC_API_KEY=sk_live_abc123...      # อันตราย!
NEXT_PUBLIC_DATABASE_URL=postgresql://...  # อันตราย!
```

**อันตราย:**
- ทุกคนเห็นได้ใน browser source code
- แฮกเกอร์เอา API Key ไปใช้ได้
- ถูก bundle เข้าไปใน JavaScript

**ใช้ได้กับ:**
- Public URLs (Site URL, CDN URL)
- Feature flags ที่ไม่เป็นความลับ
- Analytics IDs (Google Analytics, Facebook Pixel)

## 🔍 ตรวจสอบความปลอดภัย

### วิธีเช็คว่า API Key รั่วหรือไม่

1. **Build โปรเจ็กต์:**
   ```bash
   npm run build
   ```

2. **เช็ค build output:**
   ```bash
   # Windows
   Select-String -Path ".next\static\chunks\*.js" -Pattern "sk_live"
   
   # Mac/Linux
   grep -r "sk_live" .next/static/chunks/
   ```

3. **ถ้าเจอ API Key** = **รั่วไหล!** ⚠️
   - แก้ไข: ลบ `NEXT_PUBLIC_` prefix
   - เปลี่ยน API Key ใหม่ทันที

4. **ถ้าไม่เจอ** = **ปลอดภัย!** ✅

### วิธีเช็คใน Browser

1. เปิด DevTools (F12)
2. ไปที่ tab **Sources**
3. ค้นหา "API_KEY" หรือ "sk_live"
4. **ไม่ควรเจอ!**

## 🛡️ Security Checklist

### Environment Variables
- [ ] ✅ API Key ใช้ `API_KEY` (ไม่ใช้ `NEXT_PUBLIC_API_KEY`)
- [ ] ✅ Database URLs ไม่มี `NEXT_PUBLIC_`
- [ ] ✅ Secret keys อยู่ server-side เท่านั้น
- [ ] ✅ `.env.local` อยู่ใน `.gitignore`

### API Security
- [ ] ✅ ใช้ HTTPS (https://v1.hydr4.me/v1)
- [ ] ✅ API calls จาก server เท่านั้น
- [ ] ✅ Validate inputs ด้วย Zod
- [ ] ✅ Handle errors อย่างเหมาะสม

### Code Security
- [ ] ✅ ไม่ hardcode API keys
- [ ] ✅ ไม่ commit `.env.local`
- [ ] ✅ Type-safe API calls
- [ ] ✅ Input sanitization

## 📝 โครงสร้างที่ปลอดภัย

```typescript
// ✅ ถูกต้อง - Server Component
// src/app/page.tsx (ไม่มี 'use client')
import { apiAdapter } from '@/lib/api-adapter';

export default async function HomePage() {
  // API Key ใช้ฝั่ง server เท่านั้น ✅
  const data = await apiAdapter.getContentList();
  return <div>{/* ... */}</div>;
}

// ❌ ผิด - Client Component
'use client';

export default function HomePage() {
  // ห้าม! API Key จะรั่วไปที่ browser
  const apiKey = process.env.API_KEY; // undefined!
  const publicKey = process.env.NEXT_PUBLIC_API_KEY; // รั่วไหล!
}
```

## 🔐 Best Practices

### 1. ใช้ Adapter Pattern

```typescript
// src/lib/api-adapter.ts (Server-side)
import { hydra } from './hydra-client';

export class ApiAdapter {
  async getContent(slug: string) {
    // API Key ใช้ที่นี่ (server-side)
    return hydra.content.getBySlug(slug);
  }
}
```

### 2. React Query สำหรับ Client

```typescript
// Client Component
'use client';

import { useQuery } from '@tanstack/react-query';

export function useContent(slug: string) {
  // เรียก API ผ่าน Next.js API route (ไม่ใช่โดยตรง)
  return useQuery({
    queryKey: ['content', slug],
    queryFn: async () => {
      const res = await fetch(`/api/content/${slug}`);
      return res.json();
    },
  });
}
```

### 3. Server Actions (Next.js 14)

```typescript
// Server Action
'use server';

import { hydra } from '@/lib/hydra-client';

export async function recordView(slug: string) {
  // API Key ปลอดภัยที่นี่
  return hydra.content.recordView(slug);
}

// Client Component
'use client';

import { recordView } from './actions';

export function Button({ slug }: { slug: string }) {
  return (
    <button onClick={() => recordView(slug)}>
      Record View
    </button>
  );
}
```

## ⚠️ สิ่งที่ห้ามทำ

### ❌ ห้าม: ใช้ API Key ฝั่ง Client

```typescript
// ❌ อันตราย!
'use client';

const API_KEY = process.env.NEXT_PUBLIC_API_KEY; // รั่วไหล!

fetch('https://api.example.com', {
  headers: { Authorization: `Bearer ${API_KEY}` }
});
```

### ❌ ห้าม: Commit API Key

```bash
# ❌ อันตราย!
git add .env.local
git commit -m "add config"

# ถ้าทำไปแล้ว:
# 1. ลบ API Key จาก Git history
# 2. เปลี่ยน API Key ใหม่ทันที!
```

### ❌ ห้าม: Hardcode Secrets

```typescript
// ❌ อันตราย!
const API_KEY = 'sk_live_abc123...'; // ห้าม!

// ✅ ถูกต้อง
const API_KEY = process.env.API_KEY; // ดี!
```

## ✅ ตรวจสอบ Security Score

```bash
# Run security audit
npm audit

# Check for leaked secrets
git secrets --scan

# Lint
npm run lint

# Type check
npx tsc --noEmit
```

## 🆘 ถ้า API Key รั่วไหล

1. **Revoke API Key ทันที** ที่ Hydra Dashboard
2. **สร้าง API Key ใหม่**
3. **อัพเดท `.env.local`**
4. **ตรวจสอบ Git history** (ถ้า commit ไป)
5. **Rotate secrets ทั้งหมด**

## 📊 Summary

| Variable | Type | ใช้ที่ | Browser เห็นไหม? |
|----------|------|--------|------------------|
| `API_KEY` | Server | SSR, API Routes | ❌ ไม่เห็น ✅ |
| `BACKEND_API_URL` | Server | SSR, API Routes | ❌ ไม่เห็น ✅ |
| `SITE_URL` | Server | Metadata | ❌ ไม่เห็น ✅ |
| `NEXT_PUBLIC_*` | Client | Everywhere | ✅ เห็นได้ ⚠️ |

---

🔒 **โปรเจ็กต์นี้ปลอดภัยแล้ว - ไม่มี secrets รั่วไหล!**

