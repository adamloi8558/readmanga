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
          <Button
            asChild
            variant="outline"
            size="icon"
            className="h-10 w-10"
            title="หน้าแรก"
          >
            <a href={`${baseUrl}page=1`}>
              <ChevronsLeft className="h-4 w-4" />
            </a>
          </Button>
        )}

        {/* Previous Page */}
        {currentPage > 1 && (
          <Button
            asChild
            variant="outline"
            className="h-10 px-4"
          >
            <a href={`${baseUrl}page=${currentPage - 1}`} rel="prev">
              <ChevronLeft className="h-4 w-4 mr-1" />
              ก่อนหน้า
            </a>
          </Button>
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
          
          return (
            <Button
              key={page}
              asChild={!isActive}
              variant={isActive ? 'default' : 'outline'}
              size="icon"
              className={`h-10 w-10 ${isActive ? 'bg-primary text-white' : ''}`}
            >
              {isActive ? (
                <span>{page}</span>
              ) : (
                <a href={`${baseUrl}page=${page}`}>{page}</a>
              )}
            </Button>
          );
        })}

        {/* Next Page */}
        {currentPage < totalPages && (
          <Button
            asChild
            variant="outline"
            className="h-10 px-4"
          >
            <a href={`${baseUrl}page=${currentPage + 1}`} rel="next">
              ถัดไป
              <ChevronRight className="h-4 w-4 ml-1" />
            </a>
          </Button>
        )}

        {/* Last Page */}
        {currentPage < totalPages && (
          <Button
            asChild
            variant="outline"
            size="icon"
            className="h-10 w-10"
            title="หน้าสุดท้าย"
          >
            <a href={`${baseUrl}page=${totalPages}`}>
              <ChevronsRight className="h-4 w-4" />
            </a>
          </Button>
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

