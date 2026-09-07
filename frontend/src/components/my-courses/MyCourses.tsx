import React, { useState } from 'react';
import { CheckCircle2, Play, Award, ArrowRight } from 'lucide-react';
import { Course } from '../../types';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { ProgressBar } from '../common/ProgressBar';

interface MyCoursesProps {
  courses: Course[];
  onContinueLearning: (course: Course) => void;
  onViewCertificate: (course: Course) => void;
  onExploreMore: () => void;
}

export const MyCourses: React.FC<MyCoursesProps> = ({
  courses,
  onContinueLearning,
  onViewCertificate,
  onExploreMore,
}) => {
  const [tab, setTab] = useState<'in-progress' | 'completed'>('in-progress');

  const inProgressCourses = courses.slice(0, 2);
  const completedCourses = courses.slice(2, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
            Học tập cá nhân
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Khóa Học Của Tôi
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Theo dõi tiến trình bài giảng và chứng chỉ đã đạt được của bạn.
          </p>
        </div>

        <Button variant="outline" size="sm" icon={<ArrowRight size={14} />} onClick={onExploreMore}>
          Khám Phá Khóa Mới
        </Button>
      </div>

      {/* Tabs Pill Switcher */}
      <div className="flex gap-2 border-b border-slate-200 pb-3">
        <button
          onClick={() => setTab('in-progress')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
            tab === 'in-progress'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          Đang Học ({inProgressCourses.length})
        </button>
        <button
          onClick={() => setTab('completed')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
            tab === 'completed'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          Đã Hoàn Thành ({completedCourses.length})
        </button>
      </div>

      {/* Tab 1: Đang Học */}
      {tab === 'in-progress' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {inProgressCourses.map((course, idx) => {
              const progress = idx === 0 ? 68 : 35;
              return (
                <Card key={course.id} hoverable className="flex flex-col justify-between p-5 space-y-4">
                  <div className="space-y-3">
                    <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-100">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-white/95 text-blue-700">
                        {course.category}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 line-clamp-2 leading-snug">
                      {course.title}
                    </h3>
                  </div>

                  <div className="space-y-3 pt-3 border-t border-slate-100">
                    <ProgressBar progress={progress} showLabel size="sm" />

                    <Button
                      variant="primary"
                      size="sm"
                      className="w-full"
                      icon={<Play size={14} className="fill-white" />}
                      onClick={() => onContinueLearning(course)}
                    >
                      Tiếp Tục Bài Học
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 2: Đã Hoàn Thành */}
      {tab === 'completed' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {completedCourses.map((course) => (
              <Card key={course.id} className="p-6 flex flex-col sm:flex-row items-center justify-between gap-5 border-emerald-200/80 bg-gradient-to-r from-emerald-50/40 via-white to-white">
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                    <CheckCircle2 size={24} />
                  </div>
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                        100% Hoàn Thành
                      </span>
                      <span className="text-xs text-slate-400 font-mono">
                        {course.duration}
                      </span>
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 truncate">
                      {course.title}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                  <Button
                    variant="outline"
                    size="sm"
                    icon={<Award size={14} className="text-amber-500" />}
                    onClick={() => onViewCertificate(course)}
                  >
                    Xem Chứng Chỉ
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onContinueLearning(course)}
                  >
                    Học Lại
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
