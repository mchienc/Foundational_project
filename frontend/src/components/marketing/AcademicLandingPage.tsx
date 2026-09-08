import React from 'react';
import { AcademicRibbon } from './AcademicRibbon';
import { AcademicNavbar } from './AcademicNavbar';
import { AcademicHero } from './AcademicHero';
import { AcademicMetrics } from './AcademicMetrics';
import { AcademicChaptersScrolly } from './AcademicChaptersScrolly';
import { AcademicComparison } from './AcademicComparison';
import { AcademicPrograms } from './AcademicPrograms';
import { AcademicEvidence } from './AcademicEvidence';
import { AcademicFooter } from './AcademicFooter';
import { User, Screen } from '../../types';

interface AcademicLandingPageProps {
  currentUser: User | null;
  onOpenAuth: (tab: 'login' | 'register', context?: string) => void;
  onRequireAuth: (chapterTitle: string) => void;
  onNavigateScreen: (screen: Screen) => void;
}

export const AcademicLandingPage: React.FC<AcademicLandingPageProps> = ({
  currentUser,
  onOpenAuth,
  onRequireAuth,
  onNavigateScreen,
}) => {
  const handleExploreChapters = () => {
    const el = document.getElementById('chapters');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-transparent text-stone-900 selection:bg-gold-600 selection:text-white font-sans antialiased">
      {/* 1. Academic Research Bulletin Ribbon */}
      <AcademicRibbon onOpenAuth={onOpenAuth} />

      {/* 2. Academic Brand Mark Navbar */}
      <AcademicNavbar
        currentUser={currentUser}
        onOpenAuth={onOpenAuth}
        onNavigateScreen={onNavigateScreen}
      />

      {/* 3. Main Academic Content */}
      <main className="flex-1">
        {/* Editorial Hero with Bento Dossier */}
        <AcademicHero
          onOpenAuth={onOpenAuth}
          onExploreChapters={handleExploreChapters}
        />

        {/* 4 Scientific Metrics with GSAP Count-up */}
        <AcademicMetrics />

        {/* 5 Chapters Scrollytelling with GSAP ScrollTrigger Pinning */}
        <AcademicChaptersScrolly onRequireAuth={onRequireAuth} />

        {/* Rigorous Methodological Comparison */}
        <AcademicComparison />

        {/* 3 Scholarly Training Pathways */}
        <AcademicPrograms onOpenAuth={onOpenAuth} />

        {/* Empirical Evidence & Reviews */}
        <AcademicEvidence />
      </main>

      {/* 4. Academic Institution Footer */}
      <AcademicFooter onRequireAuth={onRequireAuth} />
    </div>
  );
};
