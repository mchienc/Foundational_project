import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  MessageSquare,
  FileText,
  Info,
  Clock,
  Send,
  Heart,
  RotateCcw,
  HelpCircle,
  Trash2,
} from 'lucide-react';
import { Course, Lesson, Module, QnAComment, LessonNote } from '../../types';
import { sampleQnA, sampleNotes } from '../../data/mockData';
import { CheckboxItem } from '../common/CheckboxItem';
import { ProgressBar } from '../common/ProgressBar';
import { Button } from '../common/Button';
import { MilestoneModal } from '../common/MilestoneModal';
import {
  accordionVariants,
  videoControlsVariants,
  EASE_OUT,
} from '../../styles/motion';

interface CoursePlayerProps {
  course: Course;
  onBackToDashboard: () => void;
  onOpenQuiz?: () => void;
  onOpenCertificate?: (title: string) => void;
  onNotify?: (msg: string, type?: 'success' | 'error' | 'info') => void;
}

export const CoursePlayer: React.FC<CoursePlayerProps> = ({
  course,
  onBackToDashboard,
  onOpenQuiz,
  onOpenCertificate,
  onNotify = () => {},
}) => {
  const [modules, setModules] = useState<Module[]>(course.modules);
  const [activeLesson, setActiveLesson] = useState<Lesson>(
    course.modules[0]?.lessons[0] || ({} as Lesson)
  );

  const [expandedModules, setExpandedModules] = useState<string[]>(
    course.modules.map((m) => m.id)
  );

  const [activeTab, setActiveTab] = useState<'overview' | 'notes' | 'qna'>('overview');

  // Video Player state
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(525);
  const [showControls, setShowControls] = useState<boolean>(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const controlsTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [showMilestoneModal, setShowMilestoneModal] = useState<boolean>(false);

  const [comments, setComments] = useState<QnAComment[]>(sampleQnA);
  const [newQuestion, setNewQuestion] = useState<string>('');
  const [notes, setNotes] = useState<LessonNote[]>(sampleNotes);
  const [newNote, setNewNote] = useState<string>('');

  const allLessons = modules.flatMap((m) => m.lessons);
  const completedCount = allLessons.filter((l) => l.completed).length;
  const progressPercent = Math.round((completedCount / allLessons.length) * 100);

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
      }
    }, 2000);
  };

  useEffect(() => {
    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration || 525);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remaining = Math.floor(secs % 60);
    return `${mins.toString().padStart(2, '0')}:${remaining.toString().padStart(2, '0')}`;
  };

  const toggleModuleAccordion = (moduleId: string) => {
    setExpandedModules((prev) =>
      prev.includes(moduleId) ? prev.filter((id) => id !== moduleId) : [...prev, moduleId]
    );
  };

  const toggleLessonComplete = (lessonId: string, completed: boolean) => {
    let newlyAllCompleted = false;

    setModules((prevModules) => {
      const updated = prevModules.map((mod) => ({
        ...mod,
        lessons: mod.lessons.map((les) => {
          if (les.id === lessonId) {
            return { ...les, completed };
          }
          return les;
        }),
      }));

      const total = updated.flatMap((m) => m.lessons);
      if (total.every((l) => l.completed)) {
        newlyAllCompleted = true;
      }

      return updated;
    });

    if (completed) {
      onNotify('Đã đánh dấu hoàn thành bài học!', 'success');
    }

    if (newlyAllCompleted) {
      setTimeout(() => {
        setShowMilestoneModal(true);
      }, 350);
    }
  };

  const currentLessonIndex = allLessons.findIndex((l) => l.id === activeLesson.id);
  const prevLesson = currentLessonIndex > 0 ? allLessons[currentLessonIndex - 1] : null;
  const nextLesson =
    currentLessonIndex < allLessons.length - 1 ? allLessons[currentLessonIndex + 1] : null;

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestion.trim()) return;
    const item: QnAComment = {
      id: `qna-${Date.now()}`,
      author: 'Đặng Minh Chiến',
      role: 'student',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80',
      content: newQuestion.trim(),
      createdAt: 'Vừa xong',
      likes: 0,
    };
    setComments([item, ...comments]);
    setNewQuestion('');
    onNotify('Đã đăng câu hỏi thảo luận lên bài giảng!', 'success');
  };

  const handleLikeComment = (commentId: string) => {
    setComments((prev) =>
      prev.map((c) => (c.id === commentId ? { ...c, likes: c.likes + 1 } : c))
    );
    onNotify('Đã thả tim bình luận!', 'info');
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim()) return;
    const note: LessonNote = {
      id: `note-${Date.now()}`,
      lessonId: activeLesson.id,
      timestamp: formatTime(currentTime),
      content: newNote.trim(),
      createdAt: 'Vừa xong',
    };
    setNotes([note, ...notes]);
    setNewNote('');
    onNotify('Đã lưu ghi chú học tập thành công!', 'success');
  };

  const handleDeleteNote = (noteId: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== noteId));
    onNotify('Đã xóa ghi chú.', 'info');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Top Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            icon={<ChevronLeft size={14} />}
            onClick={onBackToDashboard}
          >
            Tổng quan
          </Button>
          <div className="h-4 w-px bg-slate-200" />
          <div className="min-w-0">
            <span className="text-xs text-slate-500 font-mono block truncate">
              {course.title}
            </span>
            <h1 className="text-base sm:text-lg font-bold text-slate-900 truncate">
              {activeLesson.title}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3 self-start sm:self-auto shrink-0">
          <div className="text-right hidden sm:block">
            <span className="text-xs font-semibold text-slate-800 block">
              {completedCount}/{allLessons.length} bài hoàn thành
            </span>
            <span className="text-[11px] font-mono text-slate-400">
              Tiến độ {progressPercent}%
            </span>
          </div>
          <div className="w-28">
            <ProgressBar progress={progressPercent} size="sm" />
          </div>
        </div>
      </div>

      {/* 2-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* ================= LEFT COLUMN ================= */}
        <div className="lg:col-span-8 space-y-6">
          {/* Custom Video Player */}
          <div
            onMouseMove={handleMouseMove}
            onMouseLeave={() => isPlaying && setShowControls(false)}
            className="relative aspect-video rounded-3xl overflow-hidden bg-slate-950 shadow-2xl border border-slate-800 select-none group"
          >
            <video
              ref={videoRef}
              src={activeLesson.videoUrl}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onClick={togglePlay}
              muted={isMuted}
              playsInline
              className="w-full h-full object-contain cursor-pointer"
            />

            {!isPlaying && (
              <div
                onClick={togglePlay}
                className="absolute inset-0 flex items-center justify-center bg-slate-950/30 backdrop-blur-[2px] cursor-pointer"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-18 h-18 rounded-full bg-blue-600/90 text-white flex items-center justify-center shadow-xl shadow-blue-600/40"
                >
                  <Play size={32} className="fill-white ml-1" />
                </motion.div>
              </div>
            )}

            <AnimatePresence>
              {showControls && (
                <motion.div
                  variants={videoControlsVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950/90 via-slate-950/60 to-transparent p-4 sm:p-5 space-y-3"
                >
                  <div className="relative flex items-center group/scrub">
                    <input
                      type="range"
                      min={0}
                      max={duration}
                      step={0.1}
                      value={currentTime}
                      onChange={handleSeek}
                      className="w-full h-1.5 bg-white/25 rounded-lg appearance-none cursor-pointer accent-blue-500 hover:h-2 transition-all"
                    />
                  </div>

                  <div className="flex items-center justify-between text-white text-xs">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <button
                        onClick={togglePlay}
                        className="p-1.5 hover:text-blue-400 transition-colors cursor-pointer"
                      >
                        {isPlaying ? <Pause size={18} /> : <Play size={18} className="fill-white" />}
                      </button>

                      <button
                        onClick={() => setIsMuted(!isMuted)}
                        className="p-1.5 hover:text-blue-400 transition-colors cursor-pointer"
                      >
                        {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                      </button>

                      <span className="font-mono text-[11px] text-slate-300">
                        {formatTime(currentTime)} / {formatTime(duration)}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => {
                          if (videoRef.current) videoRef.current.currentTime = 0;
                        }}
                        title="Xem lại từ đầu"
                        className="p-1.5 hover:text-blue-400 transition-colors cursor-pointer"
                      >
                        <RotateCcw size={16} />
                      </button>

                      <button
                        onClick={() => {
                          if (videoRef.current) {
                            if (document.fullscreenElement) {
                              document.exitFullscreen();
                            } else {
                              videoRef.current.requestFullscreen();
                            }
                          }
                        }}
                        className="p-1.5 hover:text-blue-400 transition-colors cursor-pointer"
                      >
                        <Maximize2 size={16} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Lesson Action Row */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
            <div className="flex items-center gap-3">
              <CheckboxItem
                checked={activeLesson.completed}
                onChange={(checked) => toggleLessonComplete(activeLesson.id, checked)}
                label={
                  <span className="text-sm font-semibold">
                    {activeLesson.completed ? 'Đã hoàn thành bài học này' : 'Đánh dấu đã học xong'}
                  </span>
                }
                sublabel="Hệ thống tự động cập nhật tiến độ vào chứng chỉ"
              />
            </div>

            <div className="flex items-center gap-2 self-end sm:self-auto">
              {onOpenQuiz && (
                <Button
                  variant="secondary"
                  size="sm"
                  icon={<HelpCircle size={14} className="text-purple-600" />}
                  onClick={onOpenQuiz}
                >
                  Làm Trắc Nghiệm
                </Button>
              )}

              <Button
                variant="outline"
                size="sm"
                disabled={!prevLesson}
                onClick={() => prevLesson && setActiveLesson(prevLesson)}
                icon={<ChevronLeft size={14} />}
              >
                Bài Trước
              </Button>
              <Button
                variant="primary"
                size="sm"
                disabled={!nextLesson}
                onClick={() => nextLesson && setActiveLesson(nextLesson)}
              >
                <span>Bài Sau</span>
                <ChevronRight size={14} />
              </Button>
            </div>
          </div>

          {/* Interactive Tabs */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 space-y-6 shadow-xs">
            <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
              {[
                { id: 'overview', label: 'Tổng Quan Bài Học', icon: <Info size={15} /> },
                { id: 'notes', label: `Ghi Chú (${notes.length})`, icon: <FileText size={15} /> },
                { id: 'qna', label: `Hỏi Đáp Thảo Luận (${comments.length})`, icon: <MessageSquare size={15} /> },
              ].map((tab) => {
                const active = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`relative px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer ${
                      active
                        ? 'text-blue-600 bg-blue-50/80'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    {tab.icon}
                    <span>{tab.label}</span>
                    {active && (
                      <motion.div
                        layoutId="activePlayerTab"
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                        className="absolute bottom-0 inset-x-2 h-0.5 bg-blue-600 rounded-full -mb-3"
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Tab 1: Overview */}
            {activeTab === 'overview' && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, ease: EASE_OUT }}
                className="space-y-4"
              >
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Nội dung trọng tâm của bài học
                  </h3>
                  <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                    {activeLesson.description ||
                      'Trong bài học này, bạn sẽ nắm bắt toàn bộ kỹ năng cốt lõi, thực hành code mẫu và hoàn thiện các bài tập trắc nghiệm củng cố kiến thức.'}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3">
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 space-y-1">
                    <span className="text-xs text-slate-500 font-mono">Thời lượng bài học</span>
                    <div className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                      <Clock size={15} className="text-blue-600" />
                      {activeLesson.duration}
                    </div>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 space-y-1">
                    <span className="text-xs text-slate-500 font-mono">Trạng thái hoàn thành</span>
                    <div className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                      <CheckCircle2
                        size={15}
                        className={activeLesson.completed ? 'text-emerald-600' : 'text-slate-400'}
                      />
                      {activeLesson.completed ? 'Đã hoàn thành' : 'Chưa hoàn thành'}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Tab 2: Notes */}
            {activeTab === 'notes' && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, ease: EASE_OUT }}
                className="space-y-5"
              >
                <form onSubmit={handleAddNote} className="space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>
                      Ghi chú tại thời điểm:{' '}
                      <strong className="text-blue-600 font-mono">{formatTime(currentTime)}</strong>
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newNote}
                      onChange={(e) => setNewNote(e.target.value)}
                      placeholder="Gõ ghi chú quan trọng cần nhớ..."
                      className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <Button variant="primary" size="sm" type="submit" icon={<Send size={14} />}>
                      Lưu
                    </Button>
                  </div>
                </form>

                <div className="space-y-3 pt-2">
                  {notes.map((note) => (
                    <div
                      key={note.id}
                      className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start justify-between gap-3 text-sm group"
                    >
                      <div className="space-y-1">
                        <span className="inline-block px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-mono text-xs font-semibold">
                          {note.timestamp}
                        </span>
                        <p className="text-slate-800">{note.content}</p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-[11px] font-mono text-slate-400">
                          {note.createdAt}
                        </span>
                        <button
                          onClick={() => handleDeleteNote(note.id)}
                          className="text-slate-300 hover:text-rose-500 transition-colors p-1 cursor-pointer"
                          title="Xóa ghi chú"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Tab 3: Q&A */}
            {activeTab === 'qna' && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, ease: EASE_OUT }}
                className="space-y-5"
              >
                <form onSubmit={handleAddComment} className="space-y-2">
                  <textarea
                    rows={2}
                    value={newQuestion}
                    onChange={(e) => setNewQuestion(e.target.value)}
                    placeholder="Đặt câu hỏi thắc mắc về nội dung này..."
                    className="w-full p-3.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="flex justify-end">
                    <Button variant="primary" size="sm" type="submit" icon={<Send size={13} />}>
                      Gửi Câu Hỏi
                    </Button>
                  </div>
                </form>

                <div className="space-y-4 pt-2 divide-y divide-slate-100">
                  {comments.map((c) => (
                    <div key={c.id} className="pt-4 first:pt-0 flex items-start gap-3.5">
                      <img
                        src={c.avatar}
                        alt={c.author}
                        className="w-9 h-9 rounded-full object-cover border border-slate-200 shrink-0"
                      />
                      <div className="flex-1 space-y-1.5">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-900">{c.author}</span>
                          {c.role === 'instructor' && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-purple-100 text-purple-700">
                              Hỗ trợ viên
                            </span>
                          )}
                          <span className="text-[11px] text-slate-400 font-mono">
                            {c.createdAt}
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                          {c.content}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-slate-400 pt-1">
                          <button
                            onClick={() => handleLikeComment(c.id)}
                            className="flex items-center gap-1 hover:text-rose-500 transition-colors cursor-pointer text-slate-500"
                          >
                            <Heart size={13} className="hover:fill-rose-500 hover:text-rose-500" />
                            <span>{c.likes}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* ================= RIGHT COLUMN: Syllabus Sidebar ================= */}
        <div className="lg:col-span-4 space-y-4 sticky top-20">
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h2 className="text-base font-bold text-slate-900 tracking-tight">
                Đề Cương Bài Học
              </h2>
              <span className="text-xs font-mono font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
                {allLessons.length} bài học
              </span>
            </div>

            <div className="space-y-3">
              {modules.map((module) => {
                const isExpanded = expandedModules.includes(module.id);
                const moduleLessons = module.lessons;
                const moduleCompleted = moduleLessons.filter((l) => l.completed).length;

                return (
                  <div
                    key={module.id}
                    className="border border-slate-200/80 rounded-xl overflow-hidden bg-slate-50/50"
                  >
                    <button
                      onClick={() => toggleModuleAccordion(module.id)}
                      className="w-full px-4 py-3 bg-slate-50 hover:bg-slate-100/80 flex items-center justify-between text-left transition-colors cursor-pointer select-none"
                    >
                      <div className="space-y-0.5 pr-2">
                        <span className="text-xs font-bold text-slate-900 block leading-tight">
                          {module.title}
                        </span>
                        <span className="text-[11px] font-mono text-slate-400">
                          {moduleCompleted}/{moduleLessons.length} hoàn thành
                        </span>
                      </div>

                      <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.25, ease: EASE_OUT }}
                        className="text-slate-400 shrink-0"
                      >
                        <ChevronDown size={16} />
                      </motion.div>
                    </button>

                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          variants={accordionVariants}
                          initial="collapsed"
                          animate="expanded"
                          exit="collapsed"
                          className="overflow-hidden bg-white divide-y divide-slate-100"
                        >
                          {moduleLessons.map((lesson) => {
                            const isActive = activeLesson.id === lesson.id;

                            return (
                              <div
                                key={lesson.id}
                                className={`relative flex items-center justify-between p-3 pl-4 transition-colors group cursor-pointer ${
                                  isActive ? 'bg-blue-50/60' : 'hover:bg-slate-50'
                                }`}
                                onClick={() => setActiveLesson(lesson)}
                              >
                                {isActive && (
                                  <motion.div
                                    layoutId="activeLessonIndicator"
                                    transition={{
                                      type: 'spring',
                                      stiffness: 450,
                                      damping: 35,
                                    }}
                                    className="absolute left-0 inset-y-0 w-1 bg-blue-600 rounded-r"
                                  />
                                )}

                                <div className="flex items-center gap-3 min-w-0 pr-2">
                                  <div onClick={(e) => e.stopPropagation()}>
                                    <CheckboxItem
                                      checked={lesson.completed}
                                      onChange={(checked) =>
                                        toggleLessonComplete(lesson.id, checked)
                                      }
                                    />
                                  </div>

                                  <span
                                    className={`text-xs font-medium line-clamp-2 leading-snug ${
                                      isActive
                                        ? 'text-blue-700 font-semibold'
                                        : 'text-slate-800 group-hover:text-blue-600'
                                    }`}
                                  >
                                    {lesson.title}
                                  </span>
                                </div>

                                <span className="text-[10px] font-mono text-slate-400 shrink-0 flex items-center gap-1">
                                  <Clock size={11} />
                                  {lesson.duration}
                                </span>
                              </div>
                            );
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Milestone Celebration Modal */}
      <MilestoneModal
        isOpen={showMilestoneModal}
        onClose={() => setShowMilestoneModal(false)}
        courseTitle={course.title}
        onViewCertificate={() => onOpenCertificate && onOpenCertificate(course.title)}
      />
    </div>
  );
};
