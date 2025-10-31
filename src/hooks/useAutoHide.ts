import { useEffect, useState } from 'react';

export function useAutoHide(delay = 2000) {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    let hideTimeout: NodeJS.Timeout;
    let scrollTimeout: NodeJS.Timeout;

    // ซ่อน UI หลังจากโหลดหน้าเสร็จ
    hideTimeout = setTimeout(() => {
      setIsVisible(false);
    }, delay);

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // ถ้ากำลังเลื่อน = ซ่อน UI ทันที
      setIsVisible(false);
      
      clearTimeout(scrollTimeout);
      clearTimeout(hideTimeout);

      // เมื่อหยุดเลื่อน 1 วินาที = แสดง UI กลับมา
      scrollTimeout = setTimeout(() => {
        setIsVisible(true);
        
        // แล้วซ่อนอีกครั้งหลัง delay
        hideTimeout = setTimeout(() => {
          setIsVisible(false);
        }, delay);
      }, 1000);

      setLastScrollY(currentScrollY);
    };

    const handleMouseMove = () => {
      // แสดง UI เมื่อเมาส์ขยับ
      setIsVisible(true);
      
      clearTimeout(hideTimeout);

      // ซ่อนอีกครั้งหลัง delay
      hideTimeout = setTimeout(() => {
        setIsVisible(false);
      }, delay);
    };

    // แสดง UI เมื่อกด keyboard
    const handleKeyDown = () => {
      setIsVisible(true);
      clearTimeout(hideTimeout);

      hideTimeout = setTimeout(() => {
        setIsVisible(false);
      }, delay);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('keydown', handleKeyDown);
      clearTimeout(scrollTimeout);
      clearTimeout(hideTimeout);
    };
  }, [delay, lastScrollY]);

  return { 
    isVisible, 
    show: () => setIsVisible(true),
    hide: () => setIsVisible(false),
  };
}

