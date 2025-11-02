/**
 * Ads Configuration
 * ตั้งค่าว่าจะแสดงโฆษณาที่ไหนบ้าง
 * 
 * ⚙️ แก้ true/false เพื่อเปิด/ปิดโฆษณาแต่ละตำแหน่ง
 */

export const ADS_CONFIG = {
  // 🔧 เปิด/ปิดโฆษณาทั้งหมด (Master Switch)
  enabled: true,  // false = ปิดทั้งหมดเลย

  // 📍 ตำแหน่งที่แสดงโฆษณา (เปิด/ปิดแยกกันได้)
  positions: {
    // === หน้าแรก ===
    homeBelowHero: true,        // ✅ ใต้ Hero Banner
    homeBelowSEO: false,        // ใต้ SEO Content Block
    homeAboveFilters: false,    // เหนือ Filters
    homeBeforeGrid: false,      // ก่อน Content Grid
    
    // === Sidebar ===
    sidebarTop: false,          // บนสุด Sidebar
    sidebarBottom: true,        // ✅ ล่างสุด Sidebar
    
    // === หน้ารายละเอียดการ์ตูน ===
    contentBelowCover: false,   // ใต้ Cover Image
    contentBelowDescription: true, // ✅ ใต้เรื่องย่อ
    contentAboveEpisodes: false,   // เหนือรายการตอน
    contentBelowEpisodes: false,   // ใต้รายการตอน
    
    // === หน้าอ่าน ===
    readerTop: true,            // ✅ บนสุด (ก่อนภาพแรก)
    readerMiddle: false,        // ระหว่างภาพ (ทุก 5 ภาพ)
    readerBottom: true,         // ✅ ล่างสุด (หลังภาพสุดท้าย)
    
    // === หน้าค้นหา ===
    searchTop: false,           // บนสุดหน้าค้นหา
    searchBelowFilters: false,  // ใต้ Filters
    
    // === อื่นๆ ===
    bookmarksTop: false,        // หน้า Bookmarks
    trendingTop: false,         // หน้า Trending
  },

  // ⚙️ ความถี่ในการแสดง
  frequency: {
    readerMiddle: 5,  // แสดงทุก 5 ภาพ (เปลี่ยนได้)
  },
} as const;

