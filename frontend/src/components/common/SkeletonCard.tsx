import React from 'react';

export const SkeletonCard: React.FC = () => {
  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden p-5 space-y-4 shadow-xs">
      {/* Thumbnail skeleton with shimmer sweep */}
      <div className="relative w-full h-44 rounded-xl bg-slate-200 overflow-hidden skeleton-shimmer" />

      <div className="space-y-3">
        {/* Category badge skeleton */}
        <div className="w-20 h-5 rounded-full bg-slate-200 skeleton-shimmer" />

        {/* Title skeleton (2 lines) */}
        <div className="space-y-2">
          <div className="w-full h-5 rounded bg-slate-200 skeleton-shimmer" />
          <div className="w-3/4 h-5 rounded bg-slate-200 skeleton-shimmer" />
        </div>

        {/* Description skeleton */}
        <div className="w-full h-3.5 rounded bg-slate-200 skeleton-shimmer" />

        {/* Instructor & rating row skeleton */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-slate-200 skeleton-shimmer" />
            <div className="w-24 h-3.5 rounded bg-slate-200 skeleton-shimmer" />
          </div>
          <div className="w-12 h-3.5 rounded bg-slate-200 skeleton-shimmer" />
        </div>

        {/* Progress & button skeleton */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
          <div className="w-24 h-4 rounded bg-slate-200 skeleton-shimmer" />
          <div className="w-28 h-8 rounded-full bg-slate-200 skeleton-shimmer" />
        </div>
      </div>
    </div>
  );
};
