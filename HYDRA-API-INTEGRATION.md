# 🔌 Hydra API Integration - เอกสารการใช้งาน

## ✅ สิ่งที่ได้ทำแล้ว

เว็บไซต์นี้ integrate กับ **Hydra API** อย่างเป็นทางการแล้ว โดยใช้:

### 1. Official Hydra API Client
- ✅ คัดลอก `API/schemas/` → `src/schemas/`
- ✅ คัดลอก `API/services/` → `src/services/`
- ✅ ใช้ Type-safe API client พร้อม Zod validation

### 2. Services ที่ใช้งาน

```typescript
import { hydra } from '@/lib/hydra-client';

// Content Service
await hydra.content.list({ q: 'dragon', sort: 'popularity' })
await hydra.content.getBySlug('one-piece')
await hydra.content.recordView('one-piece')
await hydra.content.recordStar('one-piece')
await hydra.content.recordBookmark('one-piece')

// Episode Service
await hydra.episode.getBySlugAndNo('one-piece', 1)
await hydra.episode.recordView('one-piece', 1)

// Genre Service
await hydra.genre.list()
```

### 3. Type Safety

ทุก API call มี type safety:

```typescript
// ตัวอย่าง: Content Detail
const { data: content } = await hydra.content.getBySlug('slug');

content.id              // string
content.name            // string
content.type            // 'MANGA' | 'NOVEL'
content.completionStatus // 'ONGOING' | 'COMPLETED' | 'HIATUS' | 'CANCELLED'
content.episodes        // EpisodeDetail[]
content.genres          // Genre[]

// Episode data type discrimination
content.episodes.forEach((episode) => {
  if ('images' in episode.data) {
    // Type: EpisodeMangaData
    episode.data.images.forEach((url) => {
      console.log('Image:', url) // string
    })
  } else {
    // Type: EpisodeNovelData
    console.log('Content:', episode.data.content) // string
  }
})
```

### 4. Zod Validation

ทุก request/response validated อัตโนมัติ:

```typescript
import { contentListRequestSchema } from '@/schemas';

// Validate request parameters
const validatedParams = contentListRequestSchema.parse({
  q: 'dragon',
  page: 1,
  limit: 20,
  sort: 'popularity',
});

// ถ้า validation ผ่าน → type-safe parameters
// ถ้า validation ไม่ผ่าน → throw ZodError
```

## 📂 โครงสร้างไฟล์

### Schemas (src/schemas/)
```
schemas/
├── common.ts       # Pagination, API Response wrappers
├── content.ts      # Content schemas
├── episode.ts      # Episode schemas
├── genre.ts        # Genre schemas
├── config.ts       # Config schemas
├── stats.ts        # Stats schemas
└── index.ts        # Export ทั้งหมด
```

### Services (src/services/)
```
services/
├── api.ts          # API client factory (createApiClient)
├── content.ts      # ContentService
├── episode.ts      # EpisodeService
├── genre.ts        # GenreService
├── config.ts       # ConfigService
└── index.ts        # HydraApiClient + exports
```

### Integration Layer (src/lib/)
```
lib/
├── hydra-client.ts  # Hydra API instance (singleton)
└── api-adapter.ts   # Adapter สำหรับ Next.js
```

### Hooks (src/hooks/)
```
hooks/
├── useHydraContent.ts  # Content API hooks (Client-side)
└── useHydraEpisode.ts  # Episode API hooks (Client-side)
```

## 🎯 การใช้งานในโปรเจ็กต์

### Server Components (SSR)

```typescript
// src/app/page.tsx
import { apiAdapter } from '@/lib/api-adapter';

export default async function HomePage() {
  // ดึงข้อมูลฝั่ง server
  const contentData = await apiAdapter.getContentList({
    sort: 'popularity',
    page: 1,
    limit: 20,
  });

  return <ContentGrid content={contentData.data} />;
}
```

### Client Components

```typescript
'use client';

import { useContentList } from '@/hooks/useHydraContent';

export function ContentList() {
  const { data, isLoading } = useContentList({
    sort: 'popularity',
    page: 1,
  });

  if (isLoading) return <div>Loading...</div>;
  
  return <ContentGrid content={data?.data || []} />;
}
```

### Mutations (Client-side)

```typescript
'use client';

import { useRecordView } from '@/hooks/useHydraContent';

export function ViewButton({ slug }: { slug: string }) {
  const recordView = useRecordView();

  const handleClick = () => {
    recordView.mutate(slug);
  };

  return <button onClick={handleClick}>บันทึกการดู</button>;
}
```

## 🔑 Authentication

Hydra API ใช้ **Bearer Token** authentication:

```typescript
// ตั้งค่าใน hydra-client.ts
const axiosClient = createApiClient({
  baseURL: 'https://v1.hydr4.me/v1',
  apiKey: process.env.API_KEY, // ← จาก .env.local
  timeout: 30000,
});

// axios จะเพิ่ม header อัตโนมัติ:
// Authorization: Bearer your-api-key
```

## ⚠️ สิ่งสำคัญ

### 1. API Key Security

```env
# ✅ ถูกต้อง - Server-side only
API_KEY=sk_live_abc123...

# ❌ ผิด - จะถูกส่งไป client
NEXT_PUBLIC_API_KEY=sk_live_abc123...
```

### 2. Error Handling

```typescript
try {
  const content = await hydra.content.getBySlug('slug');
} catch (error) {
  if (axios.isAxiosError(error)) {
    if (error.response?.status === 404) {
      // Not found
      notFound(); // Next.js not-found
    } else if (error.response?.status === 429) {
      // Rate limited
      console.error('Rate limit exceeded');
    }
  }
}
```

### 3. Rate Limiting

- **Free Tier:** 100 requests/hour
- **Pro Tier:** 10,000 requests/hour

**Optimization:**
- ใช้ Next.js caching (revalidate)
- ใช้ React Query caching (staleTime)
- Bundle requests ด้วย Promise.all()

## 📊 Caching Strategy

### Server-side (Next.js)

```typescript
// ใน api-adapter.ts
fetch(url, {
  next: {
    revalidate: 60, // Cache 60 seconds
  },
});
```

### Client-side (React Query)

```typescript
// ใน useHydraContent.ts
useQuery({
  queryKey: ['genres'],
  queryFn: () => hydra.genre.list(),
  staleTime: 1000 * 60 * 60, // Cache 1 hour
});
```

## 🧪 Testing API

### ทดสอบด้วย curl

```bash
curl -H "Authorization: Bearer your-api-key" \
  https://v1.hydr4.me/v1/genre
```

### ทดสอบด้วย PowerShell

```powershell
$headers = @{
    'Authorization' = 'Bearer your-api-key'
}
Invoke-RestMethod -Uri 'https://v1.hydr4.me/v1/genre' -Headers $headers
```

## 📚 Type Definitions

### Content Types

```typescript
import type { Content, ContentDetail, ContentSearch } from '@/schemas';

interface Content {
  id: string;
  name: string;
  slug: string;
  type: 'MANGA' | 'NOVEL';
  completionStatus: 'ONGOING' | 'COMPLETED' | 'HIATUS' | 'CANCELLED';
  // ... more fields
}
```

### Episode Types

```typescript
import type { Episode, EpisodeDetail, EpisodeWithContent } from '@/schemas';

// Episode data is discriminated union
type EpisodeData = 
  | { images: string[] }        // Manga
  | { content: string };        // Novel
```

## 🔗 Resources

- **Hydra API:** https://v1.hydr4.me/v1
- **Dashboard:** https://v1.hydr4.me/dashboard
- **Documentation:** https://v1.hydr4.me/docs
- **Support:** https://v1.hydr4.me/support

## 💡 Tips & Best Practices

1. **ใช้ Server Components** สำหรับ initial data fetching
2. **ใช้ Client Components** สำหรับ interactions เท่านั้น
3. **Cache aggressively** - ลด API calls
4. **Handle errors gracefully** - แสดง UI ที่เป็นมิตร
5. **Validate inputs** - ใช้ Zod schemas
6. **Monitor rate limits** - ติดตาม usage
7. **Use TypeScript** - ป้องกัน bugs

---

✨ **พร้อมใช้งาน Hydra API แล้ว!**

