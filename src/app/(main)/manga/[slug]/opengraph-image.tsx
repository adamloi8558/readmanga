import { ImageResponse } from 'next/og';
import { apiAdapter } from '@/lib/api-adapter';

// Open Graph Image สำหรับแชร์ Social Media
export const runtime = 'edge';
export const alt = 'Hydra Manga';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image({ params }: { params: { slug: string } }) {
  try {
    const { data: content } = await apiAdapter.getContentBySlug(params.slug);

    return new ImageResponse(
      (
        <div
          style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '40px',
            }}
          >
            {/* Cover Image */}
            {content.thumbnailImage && (
              <img
                src={content.thumbnailImage}
                alt={content.name}
                width="300"
                height="450"
                style={{
                  borderRadius: '20px',
                  objectFit: 'cover',
                }}
              />
            )}

            {/* Text Content */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                maxWidth: '600px',
              }}
            >
              <div
                style={{
                  fontSize: 60,
                  fontWeight: 900,
                  color: 'white',
                  lineHeight: 1.2,
                }}
              >
                {content.name}
              </div>

              <div
                style={{
                  fontSize: 24,
                  color: 'rgba(255,255,255,0.9)',
                  display: 'flex',
                  gap: '20px',
                }}
              >
                <span>⭐ {Number(content.ratingValue || 0).toFixed(1)}</span>
                <span>👁️ {content.viewTotal.toLocaleString()}</span>
              </div>

              <div
                style={{
                  fontSize: 20,
                  color: 'rgba(255,255,255,0.8)',
                  padding: '15px 25px',
                  background: 'rgba(255,255,255,0.1)',
                  borderRadius: '10px',
                  display: 'inline-block',
                }}
              >
                อ่านบน Hydra
              </div>
            </div>
          </div>
        </div>
      ),
      {
        ...size,
      }
    );
  } catch {
    // Fallback image
    return new ImageResponse(
      (
        <div
          style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div style={{ fontSize: 80, fontWeight: 900, color: 'white' }}>
            Hydra
          </div>
        </div>
      ),
      {
        ...size,
      }
    );
  }
}

