'use client';

import { useState } from 'react';
import { X, Star as StarIcon } from 'lucide-react';
import { StarRating } from '@/components/ui/StarRating';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

interface RatingModalProps {
  contentName: string;
  currentRating: number;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (rating: number) => void;
}

export function RatingModal({
  contentName,
  currentRating,
  isOpen,
  onClose,
  onSubmit,
}: RatingModalProps) {
  const [rating, setRating] = useState(currentRating || 0);

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (rating > 0) {
      onSubmit(rating);
      onClose();
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 animate-fade-in"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md animate-slide-up">
          <CardHeader className="relative">
            <button
              onClick={onClose}
              className="absolute right-4 top-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
            <CardTitle className="flex items-center gap-2 pr-12">
              <StarIcon className="h-6 w-6 text-yellow-500" />
              ให้คะแนนการ์ตูน
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <h3 className="font-semibold text-lg mb-2">{contentName}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                คุณคิดว่าการ์ตูนเรื่องนี้ดีแค่ไหน?
              </p>
            </div>

            <div className="flex flex-col items-center gap-4">
              <StarRating value={rating} onChange={setRating} size="lg" />
              <div className="text-center">
                {rating > 0 ? (
                  <p className="text-2xl font-bold text-primary">
                    {rating === 5 && '🤩 ยอดเยี่ยม!'}
                    {rating === 4 && '😍 ดีมาก!'}
                    {rating === 3 && '😊 ดี'}
                    {rating === 2 && '😐 พอใช้'}
                    {rating === 1 && '😞 ไม่ชอบ'}
                  </p>
                ) : (
                  <p className="text-sm text-gray-500">คลิกเพื่อให้คะแนน</p>
                )}
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={onClose}
              >
                ยกเลิก
              </Button>
              <Button
                className="flex-1 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600"
                onClick={handleSubmit}
                disabled={rating === 0}
              >
                ส่งคะแนน
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

