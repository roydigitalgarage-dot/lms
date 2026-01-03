import React, { useRef, useEffect } from 'react';

interface TouchGesturesProps {
  children: React.ReactNode;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  onPinch?: (scale: number) => void;
  className?: string;
}

export default function TouchGestures({
  children,
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
  onSwipeDown,
  onPinch,
  className = ''
}: TouchGesturesProps) {
  const touchRef = useRef<HTMLDivElement>(null);
  const startTouch = useRef<{ x: number; y: number; time: number } | null>(null);
  const lastPinchDistance = useRef<number>(0);

  useEffect(() => {
    const element = touchRef.current;
    if (!element) return;

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        startTouch.current = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
          time: Date.now()
        };
      } else if (e.touches.length === 2 && onPinch) {
        const distance = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
        lastPinchDistance.current = distance;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 2 && onPinch && lastPinchDistance.current > 0) {
        const distance = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
        const scale = distance / lastPinchDistance.current;
        onPinch(scale);
        lastPinchDistance.current = distance;
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!startTouch.current || e.touches.length > 0) return;

      const endTouch = e.changedTouches[0];
      const deltaX = endTouch.clientX - startTouch.current.x;
      const deltaY = endTouch.clientY - startTouch.current.y;
      const deltaTime = Date.now() - startTouch.current.time;

      // Only trigger swipe if it's fast enough and long enough
      if (deltaTime < 300 && (Math.abs(deltaX) > 50 || Math.abs(deltaY) > 50)) {
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
          // Horizontal swipe
          if (deltaX > 0 && onSwipeRight) {
            onSwipeRight();
          } else if (deltaX < 0 && onSwipeLeft) {
            onSwipeLeft();
          }
        } else {
          // Vertical swipe
          if (deltaY > 0 && onSwipeDown) {
            onSwipeDown();
          } else if (deltaY < 0 && onSwipeUp) {
            onSwipeUp();
          }
        }
      }

      startTouch.current = null;
      lastPinchDistance.current = 0;
    };

    element.addEventListener('touchstart', handleTouchStart, { passive: true });
    element.addEventListener('touchmove', handleTouchMove, { passive: true });
    element.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchmove', handleTouchMove);
      element.removeEventListener('touchend', handleTouchEnd);
    };
  }, [onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown, onPinch]);

  return (
    <div ref={touchRef} className={className}>
      {children}
    </div>
  );
}