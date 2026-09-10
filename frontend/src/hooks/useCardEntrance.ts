// frontend/src/hooks/useCardEntrance.ts
// Hook quản lý hiệu ứng Stagger Entrance và Micro-interactions (hover lift, gold border, arrow quickTo)
// Tuân thủ triệt để gsap-react (useGSAP), gsap-performance (force3D, GPU properties)

import { RefObject } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface UseCardEntranceOptions {
  cardSelector?: string;
  arrowSelector?: string;
  stagger?: number;
  yOffset?: number;
  duration?: number;
}

export function useCardEntrance(
  containerRef: RefObject<HTMLElement | null>,
  deps: any[] = [],
  options: UseCardEntranceOptions = {}
) {
  const {
    cardSelector = '.test-card',
    arrowSelector = '.card-arrow',
    stagger = 0.08,
    yOffset = 25,
    duration = 0.6,
  } = options;

  useGSAP(
    () => {
      const container = containerRef.current;
      if (!container) return;

      const cards = container.querySelectorAll<HTMLElement>(cardSelector);
      if (!cards.length) return;

      // 1. Entrance Stagger mượt mà 60fps khi danh sách xuất hiện
      gsap.from(cards, {
        y: yOffset,
        autoAlpha: 0,
        duration,
        ease: 'power2.out',
        stagger,
        force3D: true,
        clearProps: 'opacity,visibility',
      });

      // 2. Micro-interactions: Nhấc nhẹ card, sáng viền Vàng hổ phách (#D97706), mũi tên trượt 4px
      cards.forEach((card) => {
        const arrow = card.querySelector<HTMLElement>(arrowSelector);

        // Sử dụng quickTo để tối ưu hóa hiệu năng render 60fps khi chuột di chuyển
        const setCardY = gsap.quickTo(card, 'y', { duration: 0.25, ease: 'power2.out' });
        const setArrowX = arrow
          ? gsap.quickTo(arrow, 'x', { duration: 0.25, ease: 'power2.out' })
          : null;

        const handleMouseEnter = () => {
          setCardY(-4);
          gsap.to(card, {
            borderColor: '#D97706',
            boxShadow: '0 12px 28px -6px rgba(217, 119, 6, 0.15), 0 4px 12px -2px rgba(6, 78, 59, 0.08)',
            duration: 0.25,
            ease: 'power2.out',
          });
          if (setArrowX) setArrowX(4);
        };

        const handleMouseLeave = () => {
          setCardY(0);
          gsap.to(card, {
            borderColor: '#E7E5E4', // stone-200
            boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
            duration: 0.25,
            ease: 'power2.out',
          });
          if (setArrowX) setArrowX(0);
        };

        card.addEventListener('mouseenter', handleMouseEnter);
        card.addEventListener('mouseleave', handleMouseLeave);
      });
    },
    { scope: containerRef, dependencies: deps }
  );
}
