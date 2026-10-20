// frontend/src/context/SmoothScrollProvider.tsx
// Cấu hình Lenis Smooth Scroll đồng bộ với GSAP Ticker & ScrollTrigger chuẩn 60/120FPS

import React, { createContext, useContext, useEffect, useRef, useState, useCallback, useMemo } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SmoothScrollContextValue {
  lenis: Lenis | null;
  scrollTo: (target: string | HTMLElement | number, options?: Record<string, any>) => void;
  stop: () => void;
  start: () => void;
  resize: () => void;
}

const SmoothScrollContext = createContext<SmoothScrollContextValue>({
  lenis: null,
  scrollTo: () => {},
  stop: () => {},
  start: () => {},
  resize: () => {},
});

export const useSmoothScroll = () => useContext(SmoothScrollContext);

interface SmoothScrollProviderProps {
  children: React.ReactNode;
  enabled?: boolean;
}

export const SmoothScrollProvider: React.FC<SmoothScrollProviderProps> = ({
  children,
  enabled = true,
}) => {
  const lenisRef = useRef<Lenis | null>(null);
  const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null);

  useEffect(() => {
    if (!enabled || typeof window === 'undefined') return;

    // Khởi tạo Lenis với easing exponential mượt mà chuẩn Academic Forest
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.2,
      infinite: false,
      autoResize: true,
      allowNestedScroll: true,
      prevent: (node: any) => {
        if (!node || !(node instanceof HTMLElement)) return false;
        // 1. Bỏ qua các phần tử hoặc cha có data-lenis-prevent
        if (node.hasAttribute('data-lenis-prevent') || Boolean(node.closest?.('[data-lenis-prevent]'))) {
          return true;
        }
        // 2. Bỏ qua mọi container có scroll tự nhiên (overflow auto/scroll)
        if (Boolean(node.closest?.('.overflow-y-auto, .overflow-x-auto, .overflow-auto, .overflow-y-scroll, .overflow-x-scroll, [data-scrollable="true"]'))) {
          return true;
        }
        // 3. Bỏ qua các modal, dialog, dropdown popovers
        if (Boolean(node.closest?.('[role="dialog"], .modal, [data-modal="true"]'))) {
          return true;
        }
        // 4. Kiểm tra computed overflow style nếu container có thể cuộn
        let curr: HTMLElement | null = node;
        while (curr && curr !== document.body && curr !== document.documentElement) {
          if (curr.scrollHeight > curr.clientHeight || curr.scrollWidth > curr.clientWidth) {
            const style = window.getComputedStyle(curr);
            const oy = style.overflowY;
            const ox = style.overflowX;
            if (oy === 'auto' || oy === 'scroll' || ox === 'auto' || ox === 'scroll') {
              return true;
            }
          }
          curr = curr.parentElement;
        }
        return false;
      },
    });

    lenisRef.current = lenis;
    setLenisInstance(lenis);

    // 1. Đồng bộ sự kiện cuộn giữa Lenis và GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // 2. Đồng bộ nhịp requestAnimationFrame của Lenis vào GSAP Ticker
    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);

    // 3. Tắt lagSmoothing để chống giật khựng khung hình khi chuyển cảnh
    gsap.ticker.lagSmoothing(0);

    // 4. Tự động cập nhật giới hạn cuộn khi chiều cao DOM thay đổi (ví dụ khi nạp đề thi từ API)
    const handleDomResize = () => {
      lenis.resize();
      ScrollTrigger.update();
      ScrollTrigger.refresh();
    };

    const resizeObserver = new ResizeObserver(() => {
      handleDomResize();
    });

    if (document.body) {
      resizeObserver.observe(document.body);
    }
    const rootEl = document.getElementById('root');
    if (rootEl) {
      resizeObserver.observe(rootEl);
    }

    // Cập nhật lại ScrollTrigger sau khi DOM ổn định
    handleDomResize();

    return () => {
      resizeObserver.disconnect();
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      lenisRef.current = null;
      setLenisInstance(null);
    };
  }, [enabled]);

  const scrollTo = useCallback((target: string | HTMLElement | number, options?: Record<string, any>) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, options);
    } else if (typeof target === 'number') {
      window.scrollTo({ top: target, behavior: 'smooth' });
    } else if (typeof target === 'string') {
      const el = document.querySelector(target);
      el?.scrollIntoView({ behavior: 'smooth' });
    } else if (target instanceof HTMLElement) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const stop = useCallback(() => {
    lenisRef.current?.stop();
  }, []);

  const start = useCallback(() => {
    lenisRef.current?.start();
  }, []);

  const resize = useCallback(() => {
    if (lenisRef.current) {
      lenisRef.current.resize();
      ScrollTrigger.update();
      ScrollTrigger.refresh();
    }
  }, []);

  const value = useMemo(() => ({
    lenis: lenisInstance,
    scrollTo,
    stop,
    start,
    resize,
  }), [lenisInstance, scrollTo, stop, start, resize]);

  return (
    <SmoothScrollContext.Provider value={value}>
      {children}
    </SmoothScrollContext.Provider>
  );
};
