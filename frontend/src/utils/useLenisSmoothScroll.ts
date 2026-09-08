// frontend/src/utils/useLenisSmoothScroll.ts
// Hook quản lý cuộn mượt (Smooth Scroll) bằng Lenis và đồng bộ với GSAP ScrollTrigger

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useLenisSmoothScroll(enabled = true) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (!enabled) return;

    // Khởi tạo Lenis với thông số tối ưu cho cảm giác cuộn cao cấp
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential ease out
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    // 1. Đồng bộ sự kiện cuộn của Lenis với ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // 2. Chuyển cơ chế requestAnimationFrame của Lenis vào GSAP ticker để đảm bảo cùng xung nhịp 60/120fps
    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);

    // Tắt lagSmoothing để ngăn giật khựng khi chuyển cảnh
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [enabled]);

  return lenisRef;
}
