'use client';

import { useEffect, useRef } from 'react';

interface AAdsProps {
  /**
   * A-Ads Zone ID
   * ตัวอย่าง: '2373627'
   */
  zoneId: string;
  
  /**
   * ตำแหน่งที่แสดงโฆษณา (สำหรับ tracking)
   */
  position?: string;
  
  /**
   * ความกว้างของโฆษณา (%)
   * Default: 70%
   */
  width?: string;
  
  /**
   * CSS class เพิ่มเติม
   */
  className?: string;
}

/**
 * A-Ads Component
 * โฆษณาจาก A-Ads (Acceptable Ads)
 */
export function AAds({ 
  zoneId, 
  position = 'home-top',
  width = '70%',
  className = '' 
}: AAdsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Reload iframe เมื่อ component mount
    if (containerRef.current) {
      const iframe = containerRef.current.querySelector('iframe');
      if (iframe) {
        // Force reload
        iframe.src = iframe.src;
      }
    }
  }, [zoneId]);

  return (
    <div 
      ref={containerRef}
      className={`my-6 ${className}`}
      data-ad-position={position}
    >
      {/* กรอบโฆษณา */}
      <div className="rounded-2xl overflow-hidden border-2 border-gray-800 dark:border-gray-700 shadow-2xl bg-gradient-to-br from-gray-900 to-black p-4">
        {/* Label */}
        <div className="text-center mb-2">
          <span className="inline-block px-3 py-1 bg-gray-800 dark:bg-gray-700 text-gray-400 text-xs rounded-full">
            สนับสนุนเรา
          </span>
        </div>
        
        {/* Iframe โฆษณา */}
        <div style={{ width: '100%', margin: 'auto', position: 'relative', zIndex: 99998 }}>
          <iframe
            data-aa={zoneId}
            src={`//acceptable.a-ads.com/${zoneId}/?size=Adaptive`}
            style={{
              border: 0,
              padding: 0,
              width: width,
              height: 'auto',
              overflow: 'hidden',
              display: 'block',
              margin: 'auto',
              minHeight: '100px',
            }}
            title="Advertisement"
          />
        </div>
      </div>
    </div>
  );
}

// Export AD_ZONES from config file
export { AD_ZONES } from '@/config/ad-zones';

