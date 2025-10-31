import { MetadataRoute } from 'next';
import { hydra } from '@/lib/hydra-client';

// Force dynamic
export const dynamic = 'force-dynamic';
export const revalidate = 3600; // 1 hour

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.SITE_URL || 'http://localhost:3000';

  try {
    // ดึงข้อมูล sitemap จาก Hydra API
    const [contentSitemap, episodeSitemap] = await Promise.all([
      hydra.sitemap.getContent({ page: 1, limit: 500 }),
      hydra.sitemap.getEpisodes({ page: 1, limit: 500 }),
    ]);

    // Static pages
    const staticPages: MetadataRoute.Sitemap = [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1,
      },
      {
        url: `${baseUrl}/trending`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.9,
      },
      {
        url: `${baseUrl}/recommended`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.9,
      },
      {
        url: `${baseUrl}/search`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.8,
      },
      {
        url: `${baseUrl}/bookmarks`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.5,
      },
    ];

    // Content pages (การ์ตูนทั้งหมด)
    const contentPages: MetadataRoute.Sitemap = contentSitemap.data.map((item) => ({
      url: `${baseUrl}/manga/${item.slug}`,
      lastModified: item.lastEpisodeAt ? new Date(item.lastEpisodeAt) : new Date(),
      changeFrequency: item.changefreq,
      priority: item.priority,
    }));

    // Episode pages (ตอนทั้งหมด)
    const episodePages: MetadataRoute.Sitemap = episodeSitemap.data.map((item) => ({
      url: `${baseUrl}/read/${item.slug}/${item.no}`,
      lastModified: item.publishedAt ? new Date(item.publishedAt) : new Date(),
      changeFrequency: item.changefreq,
      priority: item.priority,
    }));

    return [...staticPages, ...contentPages, ...episodePages];
  } catch (error) {
    console.error('Sitemap generation error:', error);
    
    // Fallback to static sitemap
    return [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1,
      },
      {
        url: `${baseUrl}/trending`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.9,
      },
      {
        url: `${baseUrl}/search`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.8,
      },
    ];
  }
}
