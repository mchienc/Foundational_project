import React, { useState, useEffect, useMemo } from 'react';
import {
  Youtube,
  Sparkles,
  Play,
  Clock,
  BookOpen,
  Filter,
  Search,
  CheckCircle2,
  Trash2,
  Headphones,
  Keyboard,
  Layers,
  AlertCircle,
  ArrowRight,
  Link2,
} from 'lucide-react';
import { DictationLesson, DictationCefrLevel, DictationTopic } from './types';
import { mockDictationLessons } from './mockDictationData';
import { extractYouTubeVideoId } from './diffEngine';
import { CustomVideoImporterModal } from './CustomVideoImporterModal';
import { YouTubeFocusRoom } from './YouTubeFocusRoom';

const CUSTOM_LESSONS_STORAGE_KEY = 'eduflow_custom_dictation_lessons_v2';
const COMPLETED_LESSONS_STORAGE_KEY = 'eduflow_completed_dictation_ids_v2';

const LEVEL_FILTERS: { id: 'ALL' | DictationCefrLevel; label: string; badge?: string }[] = [
  { id: 'ALL', label: 'Tất cả cấp độ' },
  { id: 'B1', label: 'B1 Trung cấp', badge: 'Intermediate' },
  { id: 'B2', label: 'B2 Nâng cao', badge: 'Upper-Int' },
  { id: 'C1', label: 'C1 Thành thạo', badge: 'Academic' },
];

const TOPIC_FILTERS: { id: 'ALL' | DictationTopic; label: string }[] = [
  { id: 'ALL', label: 'Tất cả chủ đề' },
  { id: 'Khoa học', label: 'Khoa học' },
  { id: 'Xã hội', label: 'Xã hội' },
  { id: 'Công nghệ', label: 'Công nghệ' },
  { id: 'Kinh tế', label: 'Kinh tế' },
];

const QUICK_SAMPLE_LINKS = [
  {
    label: 'TED-Ed: How stress affects your brain',
    url: 'https://www.youtube.com/watch?v=WuyPuH9ojCE',
  },
  {
    label: 'TED-Ed: Why do we dream?',
    url: 'https://www.youtube.com/watch?v=2W85Dwxx218',
  },
  {
    label: 'BBC: How to speak with confidence',
    url: 'https://youtu.be/eIho2S0ZahI',
  },
];

export const DictationStudioPage: React.FC = () => {
  // Custom lessons persisted in localStorage
  const [customLessons, setCustomLessons] = useState<DictationLesson[]>(() => {
    try {
      const raw = localStorage.getItem(CUSTOM_LESSONS_STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  const [completedIds, setCompletedIds] = useState<string[]>(() => {
    try {
      const raw = localStorage.getItem(COMPLETED_LESSONS_STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  // Combined vault lessons
  const allLessons = useMemo(
    () => [...customLessons, ...mockDictationLessons],
    [customLessons]
  );

  // Active Lesson ID for `/dictation/[id]` Full-screen Focus Room
  const [activeLessonId, setActiveLessonId] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      const match = window.location.pathname.match(/^\/dictation\/([^/]+)/);
      if (match && match[1]) {
        return decodeURIComponent(match[1]);
      }
    }
    return null;
  });

  // Sync browser URL with `/dictation` and `/dictation/[id]`
  useEffect(() => {
    const handlePopState = () => {
      const match = window.location.pathname.match(/^\/dictation\/([^/]+)/);
      if (match && match[1]) {
        setActiveLessonId(decodeURIComponent(match[1]));
      } else {
        setActiveLessonId(null);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const openLessonRoom = (lessonId: string) => {
    setActiveLessonId(lessonId);
    if (typeof window !== 'undefined') {
      window.history.pushState({ dictationId: lessonId }, '', `/dictation/${encodeURIComponent(lessonId)}`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const closeLessonRoom = () => {
    setActiveLessonId(null);
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', '/dictation');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Custom YouTube URL Input state
  const [youtubeUrlInput, setYoutubeUrlInput] = useState<string>('');
  const [urlError, setUrlError] = useState<string | null>(null);
  const [importerModalState, setImporterModalState] = useState<{
    isOpen: boolean;
    videoId: string;
    rawUrl: string;
  }>({
    isOpen: false,
    videoId: '',
    rawUrl: '',
  });

  // Vault Filters
  const [selectedLevel, setSelectedLevel] = useState<'ALL' | DictationCefrLevel>('ALL');
  const [selectedTopic, setSelectedTopic] = useState<'ALL' | DictationTopic>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleStartCustomImport = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setUrlError(null);

    const trimmed = youtubeUrlInput.trim();
    if (!trimmed) {
      setUrlError('Vui lòng dán đường dẫn video YouTube (vd: https://www.youtube.com/watch?v=...)');
      return;
    }

    const extractedId = extractYouTubeVideoId(trimmed);
    if (!extractedId) {
      setUrlError(
        'Không nhận diện được Video ID hợp lệ. Hỗ trợ: youtube.com/watch?v=ID, youtu.be/ID hoặc chuỗi 11 ký tự.'
      );
      return;
    }

    setImporterModalState({
      isOpen: true,
      videoId: extractedId,
      rawUrl: trimmed,
    });
  };

  const handleSaveCustomLesson = (newLesson: DictationLesson) => {
    const updated = [newLesson, ...customLessons.filter((item) => item.id !== newLesson.id)];
    setCustomLessons(updated);
    try {
      localStorage.setItem(CUSTOM_LESSONS_STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // ignore storage quota errors
    }
    setImporterModalState({ isOpen: false, videoId: '', rawUrl: '' });
    setYoutubeUrlInput('');
    openLessonRoom(newLesson.id);
  };

  const handleDeleteCustomLesson = (lessonId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = customLessons.filter((item) => item.id !== lessonId);
    setCustomLessons(updated);
    try {
      localStorage.setItem(CUSTOM_LESSONS_STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const markLessonCompleted = (lessonId: string) => {
    if (!completedIds.includes(lessonId)) {
      const updated = [...completedIds, lessonId];
      setCompletedIds(updated);
      try {
        localStorage.setItem(COMPLETED_LESSONS_STORAGE_KEY, JSON.stringify(updated));
      } catch {
        // ignore
      }
    }
  };

  const filteredLessons = useMemo(() => {
    return allLessons.filter((lesson) => {
      if (selectedLevel !== 'ALL' && lesson.level !== selectedLevel) return false;
      if (selectedTopic !== 'ALL' && lesson.topic !== selectedTopic) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = lesson.title.toLowerCase().includes(q);
        const matchChannel = lesson.channel.toLowerCase().includes(q);
        const matchDesc = (lesson.description || '').toLowerCase().includes(q);
        if (!matchTitle && !matchChannel && !matchDesc) return false;
      }
      return true;
    });
  }, [allLessons, selectedLevel, selectedTopic, searchQuery]);

  // Check if a lesson is active -> Render `/dictation/[id]` Full-screen Focus Room
  const activeLesson = useMemo(() => {
    if (!activeLessonId) return null;
    return allLessons.find((l) => l.id === activeLessonId) || null;
  }, [activeLessonId, allLessons]);

  if (activeLesson) {
    return (
      <YouTubeFocusRoom
        lesson={activeLesson}
        onExit={() => {
          markLessonCompleted(activeLesson.id);
          closeLessonRoom();
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAF9] text-stone-900 font-sans pb-20">
      {/* HERO & CUSTOM YOUTUBE IMPORTER BAR (PHẦN 1 & PHẦN 2) */}
      <section className="relative bg-white border-b border-[#E7E5E4] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#064E3B] text-amber-300 text-xs font-mono font-bold uppercase tracking-wider shadow-xs">
              <Headphones size={13} className="text-amber-300" />
              <span>Standalone YouTube Dictation Studio • /dictation</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#064E3B] tracking-tight leading-tight">
              Xưởng Luyện Nghe Chép Chính Tả YouTube &amp; Kho Bài Học Thuật
            </h1>

            <p className="text-sm sm:text-base text-stone-600 max-w-2xl mx-auto leading-relaxed">
              Rèn luyện kỹ năng nghe sâu (Deep Active Listening) qua phương pháp cắt lát câu thời gian thực
              <strong> Sentence-Slicing Audio</strong> và thuật toán so khớp từ vựng thông minh
              <strong> LCS + Levenshtein Diff Engine</strong>.
            </p>
          </div>

          {/* Custom YouTube URL Input Bar */}
          <div className="max-w-3xl mx-auto mt-8">
            <div className="bg-[#FAFAF9] p-3 sm:p-4 rounded-3xl border-2 border-[#064E3B]/20 shadow-md">
              <form onSubmit={handleStartCustomImport} className="flex flex-col sm:flex-row items-stretch gap-3">
                <div className="relative flex-1 flex items-center">
                  <div className="absolute left-4 flex items-center pointer-events-none text-red-600">
                    <Youtube size={22} />
                  </div>
                  <input
                    type="text"
                    value={youtubeUrlInput}
                    onChange={(e) => {
                      setYoutubeUrlInput(e.target.value);
                      if (urlError) setUrlError(null);
                    }}
                    placeholder="Dán link YouTube bất kỳ (vd: https://www.youtube.com/watch?v=gedoSfZvBgE)..."
                    className="w-full pl-12 pr-4 py-3.5 bg-white border border-[#E7E5E4] rounded-2xl text-sm text-stone-800 placeholder:text-stone-400 focus:outline-none focus:border-[#064E3B] focus:ring-2 focus:ring-[#064E3B]/15 font-sans transition-all"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-3.5 rounded-2xl bg-[#064E3B] hover:bg-[#043327] text-white text-sm font-bold flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer shrink-0"
                >
                  <Sparkles size={16} className="text-[#D97706]" />
                  <span>Bắt Đầu Chép</span>
                  <ArrowRight size={16} />
                </button>
              </form>

              {urlError && (
                <div className="mt-3 px-3.5 py-2 rounded-xl bg-red-50 border border-red-200 flex items-center gap-2 text-xs text-red-700 font-medium">
                  <AlertCircle size={14} className="shrink-0 text-red-600" />
                  <span>{urlError}</span>
                </div>
              )}

              {/* Quick Demo Links */}
              <div className="mt-3 pt-2.5 border-t border-[#E7E5E4] flex flex-wrap items-center gap-2 text-xs">
                <span className="text-stone-500 font-semibold flex items-center gap-1">
                  <Link2 size={12} className="text-[#D97706]" />
                  Thử nhanh link mẫu:
                </span>
                {QUICK_SAMPLE_LINKS.map((sample) => (
                  <button
                    key={sample.url}
                    type="button"
                    onClick={() => {
                      setYoutubeUrlInput(sample.url);
                      setUrlError(null);
                      const vid = extractYouTubeVideoId(sample.url);
                      if (vid) {
                        setImporterModalState({
                          isOpen: true,
                          videoId: vid,
                          rawUrl: sample.url,
                        });
                      }
                    }}
                    className="px-2.5 py-1 rounded-lg bg-white hover:bg-emerald-50 text-stone-700 hover:text-[#064E3B] border border-[#E7E5E4] hover:border-[#064E3B]/30 font-medium transition-colors cursor-pointer"
                  >
                    {sample.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Feature Pills below Importer */}
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-stone-600">
              <div className="flex items-center gap-2.5 bg-[#FAFAF9] px-3.5 py-2.5 rounded-2xl border border-[#E7E5E4]">
                <Keyboard size={16} className="text-[#064E3B] shrink-0" />
                <span>
                  Phím tắt rảnh tay: <code className="font-mono font-bold text-[#064E3B]">Tab</code> Nghe/Dừng,{' '}
                  <code className="font-mono font-bold text-[#064E3B]">Ctrl+H</code> Gợi ý
                </span>
              </div>
              <div className="flex items-center gap-2.5 bg-[#FAFAF9] px-3.5 py-2.5 rounded-2xl border border-[#E7E5E4]">
                <Layers size={16} className="text-[#D97706] shrink-0" />
                <span>
                  2 Chế độ: <strong>Chép toàn câu</strong> &amp; <strong>Điền từ khóa (Cloze)</strong>
                </span>
              </div>
              <div className="flex items-center gap-2.5 bg-[#FAFAF9] px-3.5 py-2.5 rounded-2xl border border-[#E7E5E4]">
                <CheckCircle2 size={16} className="text-[#064E3B] shrink-0" />
                <span>
                  Chấm điểm thông minh: Nhận diện từ viết tắt &amp; sai số chính tả nhẹ
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CURATED ACADEMIC VAULT (PHẦN 3: KHO VIDEO CHỌN LỌC SẴN) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider font-bold text-[#D97706]">
              <BookOpen size={14} />
              <span>Curated Academic Vault</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#064E3B] mt-1">
              Kho Video Học Thuật Chọn Lọc ({filteredLessons.length} bài)
            </h2>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm theo tên bài, kênh (TED-Ed, BBC)..."
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#E7E5E4] rounded-2xl text-xs text-stone-800 placeholder:text-stone-400 focus:outline-none focus:border-[#064E3B]"
            />
          </div>
        </div>

        {/* Filters Bar: CEFR Level & Academic Topic */}
        <div className="bg-white p-4 rounded-2xl border border-[#E7E5E4] shadow-2xs space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-stone-500 flex items-center gap-1.5 mr-2">
              <Filter size={13} className="text-[#064E3B]" />
              Cấp độ CEFR:
            </span>
            {LEVEL_FILTERS.map((lvl) => {
              const active = selectedLevel === lvl.id;
              return (
                <button
                  key={lvl.id}
                  onClick={() => setSelectedLevel(lvl.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    active
                      ? 'bg-[#064E3B] text-white shadow-xs'
                      : 'bg-[#FAFAF9] text-stone-700 hover:bg-stone-100 border border-[#E7E5E4]'
                  }`}
                >
                  <span>{lvl.label}</span>
                  {lvl.badge && (
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                        active ? 'bg-emerald-800 text-amber-300' : 'bg-stone-200/70 text-stone-600'
                      }`}
                    >
                      {lvl.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="pt-2 border-t border-stone-100 flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-stone-500 mr-2">Chủ đề học thuật:</span>
            {TOPIC_FILTERS.map((topic) => {
              const active = selectedTopic === topic.id;
              return (
                <button
                  key={topic.id}
                  onClick={() => setSelectedTopic(topic.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    active
                      ? 'bg-[#D97706] text-white shadow-xs'
                      : 'bg-[#FAFAF9] text-stone-700 hover:bg-stone-100 border border-[#E7E5E4]'
                  }`}
                >
                  {topic.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Dictation Cards Grid */}
        {filteredLessons.length === 0 ? (
          <div className="bg-white rounded-3xl border border-[#E7E5E4] p-12 text-center space-y-3">
            <p className="text-base font-serif font-bold text-stone-700">
              Không tìm thấy video phù hợp với bộ lọc hiện tại
            </p>
            <p className="text-xs text-stone-500">
              Hãy thử chọn lại cấp độ CEFR hoặc dán trực tiếp link YouTube vào thanh công cụ phía trên.
            </p>
            <button
              onClick={() => {
                setSelectedLevel('ALL');
                setSelectedTopic('ALL');
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded-xl bg-[#064E3B] text-white text-xs font-bold cursor-pointer"
            >
              Đặt lại bộ lọc
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLessons.map((lesson) => {
              const isCompleted = completedIds.includes(lesson.id);
              const levelColors: Record<DictationCefrLevel, string> = {
                B1: 'bg-emerald-50 text-[#064E3B] border-emerald-300',
                B2: 'bg-amber-50 text-[#D97706] border-amber-300',
                C1: 'bg-purple-50 text-purple-900 border-purple-300',
              };

              return (
                <div
                  key={lesson.id}
                  onClick={() => openLessonRoom(lesson.id)}
                  className="group bg-[#FFFFFF] rounded-3xl border border-[#E7E5E4] hover:border-[#064E3B]/50 shadow-xs hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col cursor-pointer"
                >
                  {/* Video Thumbnail & Badges */}
                  <div className="relative aspect-video bg-stone-900 overflow-hidden">
                    <img
                      src={`https://img.youtube.com/vi/${lesson.youtubeId}/hqdefault.jpg`}
                      alt={lesson.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

                    {/* Top Left Badges */}
                    <div className="absolute top-3 left-3 flex items-center gap-1.5">
                      <span
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold border shadow-xs ${levelColors[lesson.level]}`}
                      >
                        CEFR {lesson.level}
                      </span>
                      <span className="px-2.5 py-1 rounded-lg text-[11px] font-sans font-semibold bg-black/65 text-white backdrop-blur-xs">
                        {lesson.topic}
                      </span>
                      {lesson.isCustom && (
                        <span className="px-2 py-1 rounded-lg text-[10px] font-mono font-bold bg-[#D97706] text-white">
                          Tùy chỉnh
                        </span>
                      )}
                    </div>

                    {/* Delete button if custom */}
                    {lesson.isCustom && (
                      <button
                        type="button"
                        onClick={(e) => handleDeleteCustomLesson(lesson.id, e)}
                        title="Xóa video tùy chỉnh này"
                        className="absolute top-3 right-3 p-1.5 rounded-lg bg-black/60 hover:bg-red-600 text-white transition-colors cursor-pointer"
                      >
                        <Trash2 size={14} />
                      </button>
                    )}

                    {/* Bottom Right Duration & Sentence Count */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
                      <span className="font-sans font-semibold text-stone-200 truncate pr-2">
                        {lesson.channel}
                      </span>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <span className="px-2 py-0.5 rounded-md bg-black/75 font-mono text-[11px] font-semibold flex items-center gap-1">
                          <Clock size={11} className="text-amber-400" />
                          {lesson.duration}
                        </span>
                        <span className="px-2 py-0.5 rounded-md bg-[#064E3B] text-amber-300 font-mono text-[11px] font-bold">
                          {lesson.sentences.length} câu
                        </span>
                      </div>
                    </div>

                    {/* Center Play Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-12 h-12 rounded-full bg-[#064E3B]/90 text-white flex items-center justify-center shadow-lg border border-amber-400/50">
                        <Play size={20} className="ml-0.5 fill-current" />
                      </div>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-serif font-bold text-lg text-[#064E3B] group-hover:text-[#D97706] transition-colors line-clamp-2 leading-snug">
                          {lesson.title}
                        </h3>
                        {isCompleted && (
                          <span
                            title="Đã luyện tập"
                            className="shrink-0 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-[#064E3B] border border-emerald-200 text-[10px] font-bold"
                          >
                            <CheckCircle2 size={11} />
                            Đã học
                          </span>
                        )}
                      </div>

                      {lesson.description && (
                        <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                          {lesson.description}
                        </p>
                      )}
                    </div>

                    {/* Preview First Sentence + CTA */}
                    <div className="space-y-3 pt-2 border-t border-stone-100">
                      {lesson.sentences[0] && (
                        <div className="bg-[#FAFAF9] px-3 py-2 rounded-xl border border-[#E7E5E4] text-[11px] text-stone-500 font-mono truncate">
                          <span className="text-[#D97706] font-bold mr-1.5">#1:</span>
                          &ldquo;{lesson.sentences[0].text}&rdquo;
                        </div>
                      )}

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          openLessonRoom(lesson.id);
                        }}
                        className="w-full py-3 px-4 rounded-2xl bg-[#064E3B] hover:bg-[#043327] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
                      >
                        <Headphones size={15} className="text-amber-300" />
                        <span>Vào phòng chép chính tả</span>
                        <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Quick Setup Modal for Custom YouTube Link */}
      {importerModalState.isOpen && (
        <CustomVideoImporterModal
          videoId={importerModalState.videoId}
          initialUrl={importerModalState.rawUrl}
          onClose={() => setImporterModalState({ isOpen: false, videoId: '', rawUrl: '' })}
          onConfirmLesson={handleSaveCustomLesson}
        />
      )}
    </div>
  );
};

export default DictationStudioPage;
