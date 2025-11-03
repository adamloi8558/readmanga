'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  baseUrl: string;
  className?: string;
}

/**
 * Pagination Component
 * - แสดงปุ่มเลขหน้า
 * - กรอกเลขหน้าได้
 * - รองรับ query params
 */
export function Pagination({ currentPage, totalPages, baseUrl, className = '' }: PaginationProps) {
  const [jumpPage, setJumpPage] = useState('');

  // สร้างเลขหน้าที่จะแสดง
  const getPageNumbers = () => {
    const delta = 2; // แสดงซ้าย-ขวาอย่างละ 2 หน้า
    const pages: (number | string)[] = [];
    
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 || // หน้าแรก
        i === totalPages || // หน้าสุดท้าย
        (i >= currentPage - delta && i <= currentPage + delta) // ใกล้ๆ หน้าปัจจุบัน
      ) {
        pages.push(i);
      } else if (
        i === currentPage - delta - 1 || 
        i === currentPage + delta + 1
      ) {
        pages.push('...');
      }
    }
    
    // ลบ ... ที่ซ้ำ
    return pages.filter((page, index, arr) => {
      if (page === '...') {
        return arr[index - 1] !== '...';
      }
      return true;
    });
  };

  const handleJumpPage = (e: React.FormEvent) => {
    e.preventDefault();
    const pageNum = parseInt(jumpPage);
    if (pageNum >= 1 && pageNum <= totalPages) {
      window.location.href = `${baseUrl}page=${pageNum}`;
    }
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className={`flex flex-col gap-4 items-center ${className}`}>
      {/* Pagination Buttons */}
      <nav className="flex flex-wrap items-center justify-center gap-2" aria-label="Pagination">
        {/* First Page */}
        {currentPage > 1 && (
          <a
            href={`${baseUrl}page=1`}
            className="inline-flex items-center justify-center h-10 w-10 rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-primary hover:text-white hover:border-primary transition-all"
            title="หน้าแรก"
          >
            <ChevronsLeft className="h-4 w-4" />
          </a>
        )}

        {/* Previous Page */}
        {currentPage > 1 && (
          <a
            href={`${baseUrl}page=${currentPage - 1}`}
            rel="prev"
            className="inline-flex items-center justify-center h-10 px-4 rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-primary hover:text-white hover:border-primary transition-all"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            ก่อนหน้า
          </a>
        )}

        {/* Page Numbers */}
        {pageNumbers.map((page, index) => {
          if (page === '...') {
            return (
              <span key={`ellipsis-${index}`} className="px-2 text-gray-500">
                ...
              </span>
            );
          }

          const isActive = page === currentPage;
          
          if (isActive) {
            return (
              <span
                key={page}
                className="inline-flex items-center justify-center h-10 w-10 rounded-lg bg-primary text-white font-bold shadow-lg"
              >
                {page}
              </span>
            );
          }
          
          return (
            <a
              key={page}
              href={`${baseUrl}page=${page}`}
              className="inline-flex items-center justify-center h-10 w-10 rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-primary hover:text-white hover:border-primary transition-all"
            >
              {page}
            </a>
          );
        })}

        {/* Next Page */}
        {currentPage < totalPages && (
          <a
            href={`${baseUrl}page=${currentPage + 1}`}
            rel="next"
            className="inline-flex items-center justify-center h-10 px-4 rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-primary hover:text-white hover:border-primary transition-all"
          >
            ถัดไป
            <ChevronRight className="h-4 w-4 ml-1" />
          </a>
        )}

        {/* Last Page */}
        {currentPage < totalPages && (
          <a
            href={`${baseUrl}page=${totalPages}`}
            className="inline-flex items-center justify-center h-10 w-10 rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-primary hover:text-white hover:border-primary transition-all"
            title="หน้าสุดท้าย"
          >
            <ChevronsRight className="h-4 w-4" />
          </a>
        )}
      </nav>

      {/* Jump to Page */}
      <form onSubmit={handleJumpPage} className="flex items-center gap-2">
        <span className="text-sm text-gray-600 dark:text-gray-400">ไปหน้า:</span>
        <Input
          type="number"
          min="1"
          max={totalPages}
          value={jumpPage}
          onChange={(e) => setJumpPage(e.target.value)}
          placeholder={`1-${totalPages}`}
          className="w-20 h-9 text-center"
        />
        <Button type="submit" size="sm" className="h-9">
          ไป
        </Button>
      </form>
    </div>
  );
}

