# Hydra - เว็บอ่านการ์ตูนและนิยายออนไลน์ 🚀

แพลตฟอร์มอ่านการ์ตูนและนิยายออนไลน์ที่สวยงามและใช้งานง่าย สร้างด้วย **Next.js 14** พร้อม **Server-Side Rendering** และ **SEO Optimization**

เชื่อมต่อกับ **Hydra API** (https://v1.hydr4.me) - Type-safe API สำหรับการ์ตูนและนิยาย

## ✨ ฟีเจอร์หลัก

- 📚 **อ่านการ์ตูนและนิยาย** - รองรับทั้ง MANGA และ NOVEL
- 🚀 **Server-Side Rendering (SSR)** - โหลดเร็ว SEO ดีเยี่ยม
- 🔍 **ค้นหาอัจฉริยะ** - ค้นหาด้วยชื่อเรื่อง ผู้แต่ง หรือคำอธิบาย
- 🏷️ **กรองตามหมวดหมู่** - จัดหมวดหมู่ที่ชัดเจน
- 📊 **สถิติและอันดับ** - ดูการ์ตูนยอดนิยม คะแนนสูงสุด
- 🔖 **บุ๊คมาร์ค** - บันทึกเรื่องโปรดไว้อ่านภายหลัง
- 📖 **ประวัติการอ่าน** - ติดตามเรื่องที่คุณกำลังอ่าน
- ⭐ **ให้คะแนน** - รีวิวและให้คะแนนการ์ตูนที่ชอบ
- 🌓 **Dark Mode** - รองรับโหมดมืด (Light/Dark/System)
- 📱 **Responsive Design** - ใช้งานได้บนทุกอุปกรณ์
- 🎯 **SEO Optimized** - Meta tags, Open Graph, Sitemap, Robots.txt
- ⚡ **Performance** - Next.js Caching, Image Optimization
- 🔒 **Type-Safe** - ใช้ Zod validation และ TypeScript

## 🚀 เริ่มต้นใช้งาน

### ข้อกำหนดเบื้องต้น

- Node.js 18+ 
- npm หรือ yarn
- **Hydra API Key** - ขอฟรีได้จาก https://v1.hydr4.me

### การติดตั้ง

1. **Clone repository**

```bash
git clone <your-repo-url>
cd Hydra
```

2. **ติดตั้ง dependencies**

```bash
npm install
```

3. **ขอ API Key จาก Hydra**

   - ไปที่ https://v1.hydr4.me
   - สมัครสมาชิก (ฟรี)
   - Dashboard → API Keys → Create New
   - คัดลอก API Key

4. **สร้างไฟล์ `.env.local`**

```env
# Hydra API Configuration (Server-side only - ปลอดภัย)
BACKEND_API_URL=https://v1.hydr4.me/v1
API_KEY=sk_live_your-api-key-here

# Site URL (สำหรับ SEO - Server-side only)
SITE_URL=http://localhost:3000
```

5. **รันเว็บไซต์**

```bash
npm run dev
```

6. **เปิดเบราว์เซอร์:** http://localhost:3000

## 📁 โครงสร้างโปรเจ็กต์

```
Hydra/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── page.tsx           # หน้าแรก (SSR)
│   │   ├── search/            # หน้าค้นหา (SSR)
│   │   ├── trending/          # หน้ายอดนิยม (SSR)
│   │   ├── bookmarks/         # หน้าบุ๊คมาร์ค
│   │   ├── manga/[slug]/      # หน้ารายละเอียด (SSR + Dynamic Metadata)
│   │   ├── read/[slug]/[no]/  # หน้าอ่าน (SSR + SEO)
│   │   ├── robots.ts          # SEO: Robots.txt
│   │   ├── sitemap.ts         # SEO: Sitemap.xml
│   │   └── manifest.ts        # PWA: Manifest
│   ├── components/            # React Components
│   │   ├── ui/               # UI Components (Button, Card, Badge, Input)
│   │   ├── layout/           # Layout Components (Navbar, ThemeToggle)
│   │   ├── content/          # Content Components (Card, Grid, Detail)
│   │   ├── home/             # Home Page Components
│   │   ├── search/           # Search Page Components
│   │   ├── trending/         # Trending Page Components
│   │   ├── reader/           # Reader Components
│   │   └── bookmarks/        # Bookmarks Components
│   ├── hooks/                # Custom React Hooks
│   │   ├── useHydraContent.ts  # Hydra Content API hooks
│   │   ├── useHydraEpisode.ts  # Hydra Episode API hooks
│   │   ├── useTheme.ts         # Theme management
│   │   └── useDebounce.ts      # Debounce utility
│   ├── lib/                  # Utilities & API
│   │   ├── hydra-client.ts   # Hydra API Client (Official)
│   │   ├── api-adapter.ts    # API Adapter สำหรับ Next.js
│   │   └── utils.ts          # Helper functions
│   ├── store/                # Zustand State Management
│   │   ├── bookmarkStore.ts      # Bookmark management
│   │   └── readingHistoryStore.ts # Reading history
│   ├── core/                 # Core utilities
│   │   └── logger.ts         # Logging utility
│   ├── schemas/              # Zod Schemas (จาก Hydra API) ✅
│   │   ├── content.ts
│   │   ├── episode.ts
│   │   ├── genre.ts
│   │   ├── common.ts
│   │   ├── config.ts
│   │   └── stats.ts
│   └── services/             # API Services (จาก Hydra API) ✅
│       ├── api.ts            # API Client factory
│       ├── content.ts        # Content Service
│       ├── episode.ts        # Episode Service
│       ├── genre.ts          # Genre Service
│       ├── config.ts         # Config Service
│       └── index.ts          # Service exports
├── API/                      # Reference (Hydra API Client)
│   ├── schemas/              # Original schemas
│   └── services/             # Original services
├── routes/                   # Backend routes (Reference only)
└── schemas/                  # Backend schemas (Reference only)
```

## 🛠️ เทคโนโลยีที่ใช้

### Frontend
- **Framework:** Next.js 14 (App Router)
- **Rendering:** Server-Side Rendering (SSR) + React Server Components
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** Zustand (Client-side)
- **Data Fetching:** 
  - Server: Hydra API Client (Official) with Axios
  - Client: React Query + Hydra API Client
- **Validation:** Zod schemas (จาก Hydra API)
- **UI Components:** Custom (Shadcn/UI patterns)
- **Icons:** Lucide React
- **SEO:** Next.js Metadata API, Sitemap, Robots.txt

### API Integration
- **Hydra API Client** - Official type-safe client
- **Zod Validation** - Runtime type checking
- **Axios** - HTTP client with interceptors
- **Type Safety** - TypeScript + Zod schemas

## 📡 Hydra API

เว็บไซต์เชื่อมต่อกับ **Hydra API** (https://v1.hydr4.me/v1)

### API Endpoints

#### Content API
- `GET /content` - รายการเนื้อหา (search, filter, pagination)
- `GET /content/:slug` - รายละเอียด + ตอนทั้งหมด
- `GET /content/search/suggestions` - คำแนะนำการค้นหา
- `GET /content/stats` - สถิติเนื้อหายอดนิยม
- `POST /content/:slug/view` - บันทึกการดู
- `POST /content/:slug/star` - ให้คะแนน
- `POST /content/:slug/bookmark` - บุ๊คมาร์ค

#### Episode API
- `GET /content/:slug/:no` - ตอนเฉพาะ + ข้อมูลเนื้อหา
- `POST /content/:slug/:no/view` - บันทึกการดูตอน

#### Genre API
- `GET /genre` - รายการหมวดหมู่

📖 **API Documentation:** https://v1.hydr4.me/docs

## 🎨 คุณสมบัติ UI/UX

- **Modern Design:** ดีไซน์ทันสมัยและสวยงาม
- **Smooth Animations:** การเคลื่อนไหวที่ลื่นไหล
- **Loading States:** Suspense + Skeleton Loading
- **Error Handling:** จัดการ error อย่างเหมาะสม + Not Found pages
- **Responsive:** รองรับทุกขนาดหน้าจอ (Mobile, Tablet, Desktop)
- **Accessibility:** Semantic HTML, ARIA labels
- **Dark Mode:** 3 โหมด (Light/Dark/System) พร้อม smooth transition

## 🚀 Performance & SEO

### Server-Side Rendering
- ✅ ทุกหน้าใช้ SSR สำหรับ SEO ที่ดีขึ้น
- ✅ React Server Components ลด JavaScript bundle
- ✅ Streaming และ Suspense สำหรับ UX ที่ดีขึ้น
- ✅ Dynamic imports สำหรับ code splitting

### Caching Strategy
- **Static:** Sitemap, Robots.txt, Manifest
- **Revalidate 60s:** Content List
- **Revalidate 5min:** Content Detail, Episodes
- **Revalidate 1hr:** Genres
- **Client-side:** React Query caching

### SEO Features
- ✅ Dynamic Meta Tags (Title, Description, Keywords)
- ✅ Open Graph Tags (Facebook, LinkedIn)
- ✅ Twitter Card Tags
- ✅ Sitemap.xml (Auto-generated)
- ✅ Robots.txt
- ✅ Canonical URLs
- ✅ Image Optimization (Next.js Image)
- ✅ Mobile-friendly (Responsive)
- ✅ Fast Loading (SSR + Caching)
- ✅ Structured Data (Ready for Schema.org)

## 📝 การใช้งาน

### หน้าแรก (`/`)
- แสดงรายการการ์ตูนและนิยายทั้งหมด
- จัดเรียงตาม: ยอดนิยม, อัพเดทล่าสุด, คะแนนสูงสุด, ชื่อ
- กรองตามหมวดหมู่
- Pagination

### หน้าค้นหา (`/search`)
- ค้นหาแบบ real-time
- กรองตามหมวดหมู่และการจัดเรียง
- แสดงผลลัพธ์พร้อมไฮไลท์
- Sidebar filters

### หน้ายอดนิยม (`/trending`)
- แสดงการ์ตูนยอดนิยม
- จัดเรียงตามยอดดู, คะแนน, อัพเดทล่าสุด
- Card design สวยงาม

### หน้ารายละเอียด (`/manga/[slug]`)
- แสดงข้อมูลเนื้อหาแบบละเอียด
- รายการตอนทั้งหมด
- สถิติ (ยอดดู, คะแนน, บุ๊คมาร์ค)
- ปุ่มอ่านเลย และบันทึกบุ๊คมาร์ค
- SEO optimized (Dynamic metadata)

### หน้าอ่าน (`/read/[slug]/[no]`)
- **Manga Reader:** แสดงภาพแบบต่อเนื่อง (Vertical scroll)
- **Novel Reader:** แสดงข้อความแบบอ่านง่าย (Typography optimized)
- นำทางไปตอนก่อนหน้า/ถัดไป
- Sticky navigation bar
- บันทึกประวัติการอ่านอัตโนมัติ
- SEO optimized per episode

### หน้าบุ๊คมาร์ค (`/bookmarks`)
- แสดงรายการที่บันทึกไว้
- บันทึกใน localStorage
- Sync กับ Hydra API

## 🔧 Development

### Build สำหรับ Production

```bash
npm run build
```

### เริ่ม Production Server

```bash
npm start
```

### Lint Code

```bash
npm run lint
```

### Type Check

```bash
npx tsc --noEmit
```

## 🌐 การ Deploy

### Vercel (แนะนำ)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

**Environment Variables ที่ต้องตั้ง:**
```env
BACKEND_API_URL=https://v1.hydr4.me/v1
API_KEY=sk_live_your-production-key
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

### Docker

```dockerfile
FROM node:18-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM node:18-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV production
COPY --from=builder /app/next.config.mjs ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000
CMD ["npm", "start"]
```

## 🔑 Hydra API Integration

### Official API Client

โปรเจ็กต์ใช้ **Hydra API Client** อย่างเป็นทางการ:

```typescript
import { hydra } from '@/lib/hydra-client';

// Server-side
const content = await hydra.content.getBySlug('one-piece');
const genres = await hydra.genre.list();
const episode = await hydra.episode.getBySlugAndNo('one-piece', 1);
```

### Type Safety

ทุก API call มี type safety เต็มรูปแบบ:

```typescript
// TypeScript รู้ type ทุกอย่าง
const { data: content } = await hydra.content.getBySlug('slug');

content.name        // string
content.type        // 'MANGA' | 'NOVEL'
content.episodes    // EpisodeDetail[]

// Episode data แบบ type-safe
content.episodes.forEach((ep) => {
  if ('images' in ep.data) {
    // MANGA
    ep.data.images // string[]
  } else {
    // NOVEL  
    ep.data.content // string
  }
});
```

### Validation

ใช้ Zod schemas สำหรับ validation:

```typescript
import { contentListRequestSchema } from '@/schemas';

// Validate request
const params = contentListRequestSchema.parse({
  q: 'dragon',
  page: 1,
  limit: 20,
});
```

## 📖 เอกสารเพิ่มเติม

- **[SETUP.md](./SETUP.md)** - คู่มือการติดตั้งละเอียด + การแก้ปัญหา
- **[API-GUIDE.md](./API-GUIDE.md)** - Hydra API Documentation ครบถ้วน
- **[Hydra API Docs](https://v1.hydr4.me/docs)** - Official API Documentation

## 🎯 Features Checklist

### เสร็จแล้ว ✅
- [x] Server-Side Rendering (SSR)
- [x] Dynamic Metadata (SEO)
- [x] Sitemap.xml
- [x] Robots.txt
- [x] Open Graph tags
- [x] Dark Mode (Light/Dark/System)
- [x] Responsive Design
- [x] Search & Filter
- [x] Genre filtering
- [x] Pagination
- [x] Bookmark system
- [x] Reading history
- [x] Manga Reader (Image viewer)
- [x] Novel Reader (Text reader)
- [x] View tracking
- [x] Star/Rating
- [x] Type-safe API client
- [x] Zod validation
- [x] Loading states
- [x] Error handling
- [x] Not found pages

### อาจเพิ่มในอนาคต 🚧
- [ ] User authentication
- [ ] Comments system
- [ ] Reading progress tracking
- [ ] Offline reading (PWA)
- [ ] Push notifications
- [ ] Social sharing
- [ ] Analytics dashboard
- [ ] Admin panel

## 🔒 Security

- ✅ API Key เก็บ server-side เท่านั้น (ไม่ส่งไป client)
- ✅ Environment variables ไม่ commit ลง Git
- ✅ HTTPS only (Hydra API)
- ✅ Rate limiting (จาก Hydra API)
- ✅ Input validation (Zod schemas)

## 📊 Performance Metrics

- **First Contentful Paint:** < 1s
- **Time to Interactive:** < 2s
- **Lighthouse Score:** 95+ (Performance, SEO, Accessibility)
- **Bundle Size:** Optimized with code splitting
- **Image Loading:** Lazy loading + Next.js Image optimization

## 🌍 Browser Support

- Chrome (ล่าสุด)
- Firefox (ล่าสุด)
- Safari (ล่าสุด)
- Edge (ล่าสุด)
- Mobile browsers

## 📄 License

MIT License

## 👨‍💻 ผู้พัฒนา

สร้างด้วย ❤️ โดย Hydra Team

พัฒนาด้วย:
- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Hydra API](https://v1.hydr4.me/)

---

## 🎉 เริ่มต้นเลย!

```bash
# 1. ติดตั้ง
npm install

# 2. ตั้งค่า .env.local (ใส่ API Key)
cp .env.local.example .env.local

# 3. รันเว็บ
npm run dev

# 4. เปิด http://localhost:3000
```

สนุกกับการอ่านการ์ตูนและนิยาย! 📚✨
