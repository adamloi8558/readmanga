# 🏢 Tenant System Documentation

## ภาพรวมระบบ Multi-Tenant

โปรเจคนี้รองรับระบบ **Multi-tenant** โดยส่ง tenant information ไปยัง Hydra API ผ่าน HTTP headers:

- `X-HYDRA-HOST`: Hostname ของผู้ใช้ (เช่น example.com)
- `X-HYDRA-IP`: IP address ของผู้ใช้
- `X-HYDRA-USER-AGENT`: User agent ของ browser

## 🔧 การใช้งาน

### 1. ใน Server Components (Next.js App Router)

```typescript
import { createHydraClientAsync } from '@/lib/hydra-client';

export default async function HomePage() {
  // สร้าง Hydra Client จาก request headers ปัจจุบัน
  const hydra = await createHydraClientAsync();
  
  // ใช้งาน services
  const content = await hydra.content.list({
    page: 1,
    limit: 20,
    sort: 'popularity',
  });

  return <div>...</div>;
}
```

### 2. ใน API Routes (Next.js Route Handlers)

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { createHydraClient } from '@/lib/hydra-client';
import { getTenantInfo } from '@/lib/tenant';

export async function GET(request: NextRequest) {
  // ดึงข้อมูล tenant จาก request
  const tenant = getTenantInfo(request);
  
  // สร้าง Hydra Client
  const hydra = createHydraClient(
    tenant.hostname,
    tenant.ipAddress,
    tenant.userAgent
  );

  // ใช้งาน services
  const data = await hydra.content.list({ page: 1, limit: 20 });
  
  return NextResponse.json(data);
}
```

### 3. ผ่าน API Adapter (แนะนำสำหรับ Server Components)

```typescript
import { apiAdapter } from '@/lib/api-adapter';

export default async function ContentPage() {
  // ApiAdapter จะสร้าง tenant-aware client อัตโนมัติ
  const content = await apiAdapter.getContentList({
    page: 1,
    limit: 20,
    sort: 'popularity',
  });

  return <div>...</div>;
}
```

## 📊 Header Detection

ระบบจะดึงข้อมูลจาก headers ตามลำดับความสำคัญ:

### Hostname
1. `x-forwarded-host` (จาก reverse proxy)
2. `host` (จาก request)
3. `localhost:3000` (default)

### IP Address
1. `cf-connecting-ip` (Cloudflare)
2. `x-forwarded-for` (reverse proxy)
3. `x-real-ip` (nginx)
4. `x-client-ip`
5. `127.0.0.1` (default)

### User Agent
1. `user-agent` (จาก request)
2. `HydraClient/1.0` (default)

## 🎯 ฟังก์ชัน Helper

### `createHydraClient(hostname, ipAddress, userAgent)`

สร้าง HydraClient แบบ manual โดยระบุข้อมูล tenant

**Parameters:**
- `hostname`: string - Domain name (เช่น "example.com")
- `ipAddress`: string - IP address
- `userAgent`: string - User agent string

**Returns:** `HydraClient`

### `createHydraClientAsync()`

สร้าง HydraClient โดยดึงข้อมูลจาก request headers ปัจจุบัน

**Returns:** `Promise<HydraClient>`

**ใช้ใน:** Server Components, Server Actions

### `getTenantInfo(request)`

ดึงข้อมูล tenant จาก NextRequest

**Parameters:**
- `request`: NextRequest - Next.js request object

**Returns:** `TenantInfo` object

```typescript
interface TenantInfo {
  hostname: string;
  ipAddress: string;
  userAgent: string;
}
```

**ใช้ใน:** API Routes

## ⚠️ สิ่งที่ต้องระวัง

### ❌ อย่าใช้ singleton `hydra` ใน production

```typescript
// ❌ ไม่แนะนำ - ไม่รองรับ tenant
import { hydra } from '@/lib/hydra-client';
const data = await hydra.content.list();
```

```typescript
// ✅ แนะนำ - รองรับ tenant
import { createHydraClientAsync } from '@/lib/hydra-client';
const hydra = await createHydraClientAsync();
const data = await hydra.content.list();
```

### 🔒 ใช้เฉพาะ Server-side

```typescript
// ❌ ห้ามใช้ใน Client Components
'use client';
import { createHydraClientAsync } from '@/lib/hydra-client'; // Error!
```

```typescript
// ✅ ใช้ใน Server Components เท่านั้น
import { createHydraClientAsync } from '@/lib/hydra-client'; // OK

export default async function Page() {
  const hydra = await createHydraClientAsync();
  // ...
}
```

## 🔄 Migration Guide

### จาก singleton → tenant-aware

**Before:**
```typescript
import { hydra } from '@/lib/hydra-client';

const data = await hydra.content.list();
```

**After (Server Component):**
```typescript
import { createHydraClientAsync } from '@/lib/hydra-client';

const hydra = await createHydraClientAsync();
const data = await hydra.content.list();
```

**After (API Route):**
```typescript
import { createHydraClient } from '@/lib/hydra-client';
import { getTenantInfo } from '@/lib/tenant';

export async function GET(request: NextRequest) {
  const tenant = getTenantInfo(request);
  const hydra = createHydraClient(
    tenant.hostname,
    tenant.ipAddress,
    tenant.userAgent
  );
  
  const data = await hydra.content.list();
  return NextResponse.json(data);
}
```

## 📝 ตัวอย่างการใช้งานจริง

### ตัวอย่าง 1: หน้า Content List

```typescript
// src/app/browse/page.tsx
import { createHydraClientAsync } from '@/lib/hydra-client';

export default async function BrowsePage() {
  const hydra = await createHydraClientAsync();
  
  const { data, pagination } = await hydra.content.list({
    page: 1,
    limit: 24,
    sort: 'popularity',
  });

  return (
    <div>
      {data.map(content => (
        <ContentCard key={content.id} content={content} />
      ))}
    </div>
  );
}
```

### ตัวอย่าง 2: API Route สำหรับ Search

```typescript
// src/app/api/search/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createHydraClient } from '@/lib/hydra-client';
import { getTenantInfo } from '@/lib/tenant';

export async function GET(request: NextRequest) {
  const tenant = getTenantInfo(request);
  const hydra = createHydraClient(
    tenant.hostname,
    tenant.ipAddress,
    tenant.userAgent
  );

  const query = request.nextUrl.searchParams.get('q') || '';
  
  const results = await hydra.content.list({
    q: query,
    page: 1,
    limit: 10,
  });

  return NextResponse.json(results);
}
```

### ตัวอย่าง 3: Server Action

```typescript
// src/app/actions/bookmark.ts
'use server';

import { createHydraClientAsync } from '@/lib/hydra-client';

export async function addBookmark(slug: string) {
  const hydra = await createHydraClientAsync();
  
  try {
    await hydra.content.recordBookmark(slug);
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Failed to bookmark' };
  }
}
```

## 🚀 Production Deployment

### Environment Variables

```bash
# .env.local
BACKEND_API_URL=https://v1.hydr4.me/v1
API_KEY=your-api-key-here
```

### Reverse Proxy Configuration

**Nginx:**
```nginx
location / {
    proxy_pass http://localhost:3000;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Host $host;
}
```

**Cloudflare:**
ไม่ต้องตั้งค่าเพิ่มเติม - Cloudflare จะส่ง `cf-connecting-ip` header อัตโนมัติ

## 📚 เพิ่มเติม

- ดู `src/lib/hydra-client.ts` สำหรับ implementation details
- ดู `src/lib/tenant.ts` สำหรับ tenant utilities
- ดู `src/lib/api-adapter.ts` สำหรับตัวอย่างการใช้งาน

## 🔗 Related Links

- [Hydra API Documentation](https://api.hydr4.me/docs)
- [Next.js Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components)
- [Next.js Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)

