import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Star,
  Users,
  Clock,
  Award,
  Check,
  PlayCircle,
  ChevronDown,
  ShieldCheck,
  Infinity as InfinityIcon,
  Smartphone,
  FileCode,
  Share2,
  Heart,
} from 'lucide-react';
import { Course } from '../../types';
import { Button } from '../common/Button';
import { accordionVariants, EASE_OUT } from '../../styles/motion';

interface CourseDetailsProps {
  course: Course;
  onEnroll: () => void;
  onStartLearning: () => void;
  onPreviewLesson?: (lessonId: string) => void;
  onNotify: (msg: string, type?: 'success' | 'error' | 'info') => void;
}

export const CourseDetails: React.FC<CourseDetailsProps> = ({
  course,
  onEnroll,
  onStartLearning,
  onPreviewLesson,
  onNotify,
}) => {
  const [expandedModules, setExpandedModules] = useState<string[]>([course.modules[0]?.id || '']);
  const [isWishlisted, setIsWishlisted] = useState<boolean>(false);

  const toggleModule = (id: string) => {
    setExpandedModules((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    );
  };

  const handleToggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    if (!isWishlisted) {
      onNotify(`Đã lưu "${course.title}" vào danh sách yêu thích!`, 'success');
    } else {
      onNotify(`Đã xóa khỏi danh sách yêu thích.`, 'info');
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    onNotify('Đã sao chép liên kết khóa học vào bộ nhớ tạm!', 'success');
  };

  const handleGift = () => {
    onNotify('Mã ưu đãi tặng bạn bè: EDUGIFT2026 (Giảm 20%)', 'info');
  };

  const totalLessonsCount = course.modules.reduce((acc, m) => acc + m.lessons.length, 0);

  return (
    <div className="space-y-10 pb-16">
      {/* Hero Banner Section */}
      <div className="bg-slate-900 text-white py-12 lg:py-16 relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-blue-600/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-indigo-600/20 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 border border-blue-400/30 text-blue-300">
                  {course.category}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-mono bg-slate-800 text-slate-300">
                  Cấp độ: {course.level}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  Cập nhật lần cuối: {course.updatedAt}
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
                {course.title}
              </h1>

              <p className="text-base text-slate-300 leading-relaxed max-w-3xl">
                {course.headline}
              </p>

              {/* Social Proof & Instructor Row */}
              <div className="flex flex-wrap items-center gap-6 pt-2 text-sm">
                <div className="flex items-center gap-1.5 text-amber-400 font-bold">
                  <Star size={16} className="fill-amber-400" />
                  <span>{course.rating.toFixed(1)}</span>
                  <span className="text-slate-400 font-normal underline cursor-pointer">
                    ({course.reviewsCount} đánh giá)
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-slate-300">
                  <Users size={16} className="text-blue-400" />
                  <span>{course.studentsCount.toLocaleString()} học viên đã tham gia</span>
                </div>

                <div className="flex items-center gap-2">
                  <img
                    src={course.instructor.avatar}
                    alt={course.instructor.name}
                    className="w-7 h-7 rounded-full object-cover border border-slate-700"
                  />
                  <span className="text-slate-300">
                    Giảng dạy bởi <strong className="text-white">{course.instructor.name}</strong>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content & Sticky Purchase Card */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* ================= LEFT ================= */}
          <div className="lg:col-span-8 space-y-10">
            {/* What you'll learn Box */}
            <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xs">
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                Bạn sẽ học được gì từ khóa học này?
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                {course.learningOutcomes.map((outcome, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                      <Check size={13} strokeWidth={2.5} />
                    </div>
                    <span className="text-sm text-slate-700 leading-relaxed">{outcome}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Course Content / Syllabus Accordion */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                    Nội dung khóa học (Đề cương chi tiết)
                  </h2>
                  <p className="text-xs text-slate-500 font-mono mt-0.5">
                    {course.modules.length} chương • {totalLessonsCount} bài giảng • Tổng thời lượng {course.duration}
                  </p>
                </div>

                <button
                  onClick={() => {
                    if (expandedModules.length === course.modules.length) {
                      setExpandedModules([]);
                    } else {
                      setExpandedModules(course.modules.map((m) => m.id));
                    }
                  }}
                  className="text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors cursor-pointer self-start sm:self-auto"
                >
                  {expandedModules.length === course.modules.length
                    ? 'Thu gọn tất cả'
                    : 'Mở rộng tất cả'}
                </button>
              </div>

              {/* Syllabus Accordion Cards */}
              <div className="border border-slate-200/80 rounded-2xl overflow-hidden divide-y divide-slate-200 bg-white shadow-xs">
                {course.modules.map((module) => {
                  const isExpanded = expandedModules.includes(module.id);

                  return (
                    <div key={module.id} className="transition-colors">
                      <button
                        onClick={() => toggleModule(module.id)}
                        className="w-full p-5 flex items-center justify-between text-left hover:bg-slate-50/80 transition-colors cursor-pointer select-none"
                      >
                        <div className="space-y-1">
                          <span className="text-sm font-bold text-slate-900 block">
                            {module.title}
                          </span>
                          <span className="text-xs text-slate-400 font-mono">
                            {module.lessons.length} bài giảng
                          </span>
                        </div>

                        <motion.div
                          animate={{ rotate: isExpanded ? 180 : 0 }}
                          transition={{ duration: 0.25, ease: EASE_OUT }}
                          className="text-slate-400 shrink-0 ml-4"
                        >
                          <ChevronDown size={18} />
                        </motion.div>
                      </button>

                      <AnimatePresence initial={false}>
                        {isExpanded && (
                          <motion.div
                            variants={accordionVariants}
                            initial="collapsed"
                            animate="expanded"
                            exit="collapsed"
                            className="overflow-hidden bg-slate-50/50 divide-y divide-slate-100"
                          >
                            {module.lessons.map((lesson) => (
                              <div
                                key={lesson.id}
                                onClick={() => {
                                  if (onPreviewLesson) {
                                    onPreviewLesson(lesson.id);
                                  } else {
                                    onStartLearning();
                                  }
                                }}
                                className="p-4 pl-6 flex items-center justify-between gap-4 text-xs sm:text-sm hover:bg-white transition-colors cursor-pointer group"
                              >
                                <div className="flex items-center gap-3">
                                  <PlayCircle size={17} className="text-blue-600 shrink-0 group-hover:scale-110 transition-transform" />
                                  <span className="font-medium text-slate-800 group-hover:text-blue-600 transition-colors">
                                    {lesson.title}
                                  </span>
                                </div>

                                <div className="flex items-center gap-3 shrink-0">
                                  {lesson.preview && (
                                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 text-emerald-700">
                                      Học thử
                                    </span>
                                  )}
                                  <span className="text-slate-400 font-mono text-xs flex items-center gap-1">
                                    <Clock size={12} />
                                    {lesson.duration}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Instructor Profile Card */}
            <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xs">
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">Giảng Viên</h2>

              <div className="flex flex-col sm:flex-row items-start gap-5 pt-2">
                <img
                  src={course.instructor.avatar}
                  alt={course.instructor.name}
                  className="w-20 h-20 rounded-2xl object-cover border-2 border-slate-200 shrink-0"
                />

                <div className="space-y-2">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">
                      {course.instructor.name}
                    </h3>
                    <p className="text-xs text-blue-600 font-semibold">{course.instructor.role}</p>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {course.instructor.bio}
                  </p>

                  <div className="flex items-center gap-4 text-xs text-slate-500 font-mono pt-1">
                    <span>{course.instructor.coursesCount} khóa học</span>
                    <span>•</span>
                    <span className="flex items-center gap-1 text-amber-500">
                      <Star size={13} className="fill-amber-400" /> {course.instructor.rating}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ================= RIGHT: Sticky Card ================= */}
          <div className="lg:col-span-4 sticky top-20">
            <div className="bg-white border border-slate-200/90 rounded-3xl overflow-hidden shadow-xl shadow-slate-200/50 space-y-6 p-6">
              {/* Preview with click */}
              <div
                className="relative rounded-2xl overflow-hidden aspect-video bg-slate-100 group cursor-pointer"
                onClick={onStartLearning}
              >
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-slate-950/25 flex items-center justify-center group-hover:bg-slate-950/40 transition-colors">
                  <div className="w-14 h-14 rounded-full bg-white/95 text-blue-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <PlayCircle size={32} className="fill-blue-600 text-white" />
                  </div>
                </div>
                <div className="absolute bottom-2.5 inset-x-0 text-center">
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-slate-900/80 text-white backdrop-blur-xs">
                    Xem trước bài học số 1
                  </span>
                </div>
              </div>

              {/* Pricing */}
              <div className="space-y-1">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-extrabold font-mono text-slate-900 tracking-tight">
                    {course.price.toLocaleString('vi-VN')} đ
                  </span>
                  {course.originalPrice > course.price && (
                    <span className="text-base text-slate-400 line-through font-mono">
                      {course.originalPrice.toLocaleString('vi-VN')} đ
                    </span>
                  )}
                </div>
                <p className="text-xs text-rose-500 font-semibold">
                  Tiết kiệm 40% — Ưu đãi kết thúc trong 2 ngày tới
                </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full py-3.5 text-base font-bold shadow-lg shadow-blue-500/25"
                  onClick={() => {
                    onEnroll();
                    onStartLearning();
                  }}
                >
                  Bắt Đầu Học Ngay
                </Button>

                <Button
                  variant={isWishlisted ? 'secondary' : 'outline'}
                  size="md"
                  className="w-full flex items-center justify-center gap-2"
                  icon={
                    <Heart
                      size={15}
                      className={isWishlisted ? 'fill-rose-500 text-rose-500' : 'text-slate-500'}
                    />
                  }
                  onClick={handleToggleWishlist}
                >
                  {isWishlisted ? 'Đã Lưu Yêu Thích' : 'Thêm Vào Yêu Thích'}
                </Button>
              </div>

              {/* Features List */}
              <div className="pt-4 border-t border-slate-100 space-y-3 text-xs text-slate-600">
                <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                  Khóa học bao gồm:
                </h4>
                <div className="space-y-2.5">
                  <div className="flex items-center gap-2.5">
                    <Clock size={15} className="text-blue-600" />
                    <span>28 giờ video bài giảng theo yêu cầu</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <FileCode size={15} className="text-blue-600" />
                    <span>Mã nguồn & 12 dự án bài tập thực hành</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <InfinityIcon size={15} className="text-blue-600" />
                    <span>Quyền truy cập học tập trọn đời</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Smartphone size={15} className="text-blue-600" />
                    <span>Học trên máy tính, máy tính bảng và điện thoại</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Award size={15} className="text-blue-600" />
                    <span>Cấp Chứng chỉ Hoàn thành khóa học</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <ShieldCheck size={15} className="text-emerald-600" />
                    <span>Cam kết hoàn tiền trong 30 ngày nếu không hài lòng</span>
                  </div>
                </div>
              </div>

              {/* Share & Gift */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-around text-xs text-slate-500 font-medium">
                <button
                  onClick={handleShare}
                  className="flex items-center gap-1.5 hover:text-blue-600 transition-colors cursor-pointer"
                >
                  <Share2 size={14} /> Chia sẻ
                </button>
                <span className="text-slate-200">|</span>
                <button
                  onClick={handleGift}
                  className="flex items-center gap-1.5 hover:text-rose-500 transition-colors cursor-pointer"
                >
                  <Heart size={14} /> Tặng bạn bè
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
