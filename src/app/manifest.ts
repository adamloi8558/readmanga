import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'อ่านมังงะ - อ่านการ์ตูนและนิยายออนไลน์',
    short_name: 'อ่านมังงะ',
    description: 'แพลตฟอร์มอ่านการ์ตูนและนิยายออนไลน์ฟรี อัพเดทตอนใหม่ทุกวัน',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#3b82f6',
  };
}

