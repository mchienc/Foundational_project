import React, { useState, useMemo } from 'react';
import { useVocabularyVault } from '../../context/VocabularyVaultContext';
import { VocabItem } from '../../types';
import { playSpeech, soundEffects, triggerConfetti } from '../../utils/audioUtils';
import {
  Bookmark,
  Search,
  Volume2,
  Trash2,
  BrainCircuit,
  Sparkles,
  ArrowLeft,
  CheckCircle2,
  XCircle,
  Layers,
  Award,
  ChevronRight,
  RotateCcw,
  BookOpen,
  CalendarClock,
} from 'lucide-react';

interface VocabularyVaultProps {
  onBackToLibrary: () => void;
  onOpenArticle: (articleId: string) => void;
  onEarnXp?: (amount: number, reason: string) => void;
}

export const VocabularyVault: React.FC<VocabularyVaultProps> = ({
  onBackToLibrary,
  onOpenArticle,
  onEarnXp,
}) => {
  const { savedWords, removeWord, updateMastery, getDueWords } = useVocabularyVault();

  // Active view: 'catalog' | 'srs'
  const [activeTab, setActiveTab] = useState<'catalog' | 'srs'>('catalog');

  // Search and filter for Catalog tab
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMasteryFilter, setSelectedMasteryFilter] = useState<'all' | 'due' | 'learning' | 'mastered'>('all');

  // SRS Practice session state
  const [srsIndex, setSrsIndex] = useState(0);
  const [inputAnswer, setInputAnswer] = useState('');
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [srsCompleted, setSrsCompleted] = useState(false);
  const [sessionCorrectCount, setSessionCorrectCount] = useState(0);

  // Due words list
  const dueWords = useMemo(() => getDueWords(), [savedWords]);

  // SRS words queue (prioritizing due words first, then lowest srsLevel)
  const srsWords = useMemo(() => {
    return [...savedWords].sort((a, b) => (a.srsLevel || 1) - (b.srsLevel || 1));
  }, [savedWords]);

  const currentSrsWord: VocabItem | undefined = srsWords[srsIndex];

  // Filtered words for Catalog tab
  const filteredWords = useMemo(() => {
    const now = new Date();
    return savedWords.filter((item) => {
      const meaning = item.contextMeaning || (item as any).definitionVi || '';
      const defEn = item.definitionEn || '';
      const sentence = item.contextSentence || '';
      const title = item.sourceArticleTitle || (item as any).articleTitle || '';
      const srsLvl = item.srsLevel || (item as any).masteryLevel || 1;

      const matchQuery =
        !searchQuery.trim() ||
        item.word.toLowerCase().includes(searchQuery.toLowerCase()) ||
        meaning.toLowerCase().includes(searchQuery.toLowerCase()) ||
        defEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sentence.toLowerCase().includes(searchQuery.toLowerCase()) ||
        title.toLowerCase().includes(searchQuery.toLowerCase());

      const isDue = item.nextReviewDate ? new Date(item.nextReviewDate) <= now : false;

      const matchMastery =
        selectedMasteryFilter === 'all' ||
        (selectedMasteryFilter === 'due' && isDue) ||
        (selectedMasteryFilter === 'learning' && srsLvl < 4) ||
        (selectedMasteryFilter === 'mastered' && srsLvl >= 4);

      return matchQuery && matchMastery;
    });
  }, [savedWords, searchQuery, selectedMasteryFilter]);

  // Pronounce word
  const handlePronounce = (word: string) => {
    playSpeech(word, 'en-US');
  };

  // Check SRS Cloze answer
  const handleCheckAnswer = () => {
    if (!currentSrsWord || isAnswerChecked) return;

    const trimmed = inputAnswer.trim().toLowerCase();
    const expected = currentSrsWord.word.trim().toLowerCase();
    const correct = trimmed === expected;

    setIsCorrect(correct);
    setIsAnswerChecked(true);

    if (correct) {
      soundEffects.playSuccess();
      updateMastery(currentSrsWord.id, true);
      setSessionCorrectCount((prev) => prev + 1);
      if (onEarnXp) {
        onEarnXp(15, `SRS Hoàn thành xuất sắc: "${currentSrsWord.word}"`);
      }
    } else {
      soundEffects.playError();
      updateMastery(currentSrsWord.id, false);
    }
  };

  // Next SRS Word
  const handleNextSrsWord = () => {
    if (srsIndex + 1 < srsWords.length) {
      setSrsIndex((prev) => prev + 1);
      setInputAnswer('');
      setIsAnswerChecked(false);
      setIsCorrect(false);
      setShowHint(false);
    } else {
      setSrsCompleted(true);
      triggerConfetti();
      soundEffects.playSuccess();
    }
  };

  // Restart SRS
  const handleRestartSrs = () => {
    setSrsIndex(0);
    setInputAnswer('');
    setIsAnswerChecked(false);
    setIsCorrect(false);
    setShowHint(false);
    setSrsCompleted(false);
    setSessionCorrectCount(0);
  };

  // Helper to render context sentence with highlighted target word
  const renderContextSentence = (sentence: string, targetWord: string) => {
    const regex = new RegExp(`(\\b${targetWord}\\b)`, 'gi');
    const parts = sentence.split(regex);

    return (
      <span>
        {parts.map((part, idx) => {
          if (part.toLowerCase() === targetWord.toLowerCase()) {
            return (
              <span
                key={idx}
                className="bg-amber-100 text-amber-950 font-bold px-1 rounded underline decoration-amber-500 decoration-2 underline-offset-2"
              >
                {part}
              </span>
            );
          }
          return <span key={idx}>{part}</span>;
        })}
      </span>
    );
  };

  // Mastery statistics
  const masteredCount = savedWords.filter((w) => (w.srsLevel || (w as any).masteryLevel || 1) >= 4).length;
  const learningCount = savedWords.filter((w) => (w.srsLevel || (w as any).masteryLevel || 1) < 4).length;

  return (
    <div className="min-h-screen bg-transparent text-stone-900 pb-24 pt-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* ================= TOP NAVIGATION BAR ================= */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <button
            onClick={onBackToLibrary}
            className="inline-flex items-center gap-2 text-stone-600 hover:text-[#064E3B] font-medium text-sm transition-colors py-1.5 px-3 rounded-xl hover:bg-stone-200/60"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Thư viện bài đọc</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-stone-500">
              Tổng số từ trong Vault: <strong className="text-stone-900">{savedWords.length}</strong>
            </span>
          </div>
        </div>

        {/* ================= HERO HEADER & STATS ================= */}
        <div className="bg-white rounded-3xl border border-stone-200/90 p-6 sm:p-8 shadow-xs mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full mb-3">
                <BrainCircuit className="w-3.5 h-3.5 text-amber-600" />
                Spaced Repetition System (SRS)
              </div>
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#064E3B]">
                Sổ Tay Từ Vựng & Ngữ Cảnh Bài Đọc
              </h1>
              <p className="text-stone-600 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
                Học từ vựng gắn liền với ngữ cảnh câu văn thực tế trong bài đọc.
                Luyện phản xạ ghi nhớ chủ động qua bài tập điền từ theo chu kỳ 5 cấp độ lặp lại.
              </p>
            </div>

            {/* Quick Stats Grid */}
            <div className="flex items-center gap-3 shrink-0">
              <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4 text-center min-w-[90px]">
                <div className="text-2xl font-serif font-bold text-[#064E3B]">{savedWords.length}</div>
                <div className="text-[11px] font-semibold text-stone-500 mt-0.5">Tổng từ đã lưu</div>
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-center min-w-[90px]">
                <div className="text-2xl font-serif font-bold text-amber-700">{learningCount}</div>
                <div className="text-[11px] font-semibold text-amber-900 mt-0.5">Đang củng cố</div>
              </div>
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-center min-w-[90px]">
                <div className="text-2xl font-serif font-bold text-emerald-800">{masteredCount}</div>
                <div className="text-[11px] font-semibold text-emerald-900 mt-0.5">Đã làm chủ (★)</div>
              </div>
            </div>
          </div>

          {/* Tab Switcher */}
          <div className="mt-8 pt-6 border-t border-stone-100 flex items-center gap-2">
            <button
              onClick={() => setActiveTab('catalog')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-all ${
                activeTab === 'catalog'
                  ? 'bg-[#064E3B] text-white shadow-sm'
                  : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Kho từ vựng ({savedWords.length})</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('srs');
                handleRestartSrs();
              }}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-all ${
                activeTab === 'srs'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>Ôn tập SRS Ngữ Cảnh (Cloze Test)</span>
            </button>
          </div>
        </div>

        {/* ================= TAB 1: VOCABULARY CATALOG ================= */}
        {activeTab === 'catalog' && (
          <div>
            {/* Search & Mastery Filters */}
            <div className="bg-white rounded-2xl border border-stone-200/90 p-4 mb-6 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tìm từ vựng, nghĩa tiếng Việt, hoặc câu ví dụ ngữ cảnh..."
                  className="w-full pl-10 pr-4 py-2 rounded-xl border border-stone-200 bg-stone-50 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#064E3B] focus:bg-white text-stone-900"
                />
              </div>

              <div className="flex flex-wrap items-center gap-1.5 bg-stone-100 p-1 rounded-xl border border-stone-200 shrink-0">
                <button
                  onClick={() => setSelectedMasteryFilter('all')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                    selectedMasteryFilter === 'all'
                      ? 'bg-[#064E3B] text-white shadow-xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  Tất cả ({savedWords.length})
                </button>
                <button
                  onClick={() => setSelectedMasteryFilter('due')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 ${
                    selectedMasteryFilter === 'due'
                      ? 'bg-[#D97706] text-white shadow-xs'
                      : 'text-amber-800 hover:text-amber-950'
                  }`}
                >
                  <CalendarClock className="w-3.5 h-3.5" />
                  <span>Cần ôn hôm nay ({dueWords.length})</span>
                </button>
                <button
                  onClick={() => setSelectedMasteryFilter('learning')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                    selectedMasteryFilter === 'learning'
                      ? 'bg-amber-600 text-white shadow-xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  Đang củng cố (Lvl 1-3)
                </button>
                <button
                  onClick={() => setSelectedMasteryFilter('mastered')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                    selectedMasteryFilter === 'mastered'
                      ? 'bg-emerald-700 text-white shadow-xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  Đã làm chủ (Lvl 4-5)
                </button>
              </div>
            </div>

            {/* Word List */}
            {filteredWords.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl border border-stone-200 p-8">
                <Bookmark className="w-12 h-12 text-stone-300 mx-auto mb-3" />
                <h3 className="text-lg font-serif font-bold text-stone-800">
                  {savedWords.length === 0
                    ? 'Sổ tay hiện chưa có từ vựng nào'
                    : 'Không tìm thấy từ vựng phù hợp'}
                </h3>
                <p className="text-stone-500 text-xs mt-1 max-w-sm mx-auto">
                  {savedWords.length === 0
                    ? 'Hãy truy cập Thư viện bài đọc, chọn bài và bấm lưu các từ vựng bạn muốn học.'
                    : 'Thử điều chỉnh từ khóa tìm kiếm hoặc chuyển sang bộ lọc khác.'}
                </p>
                <button
                  onClick={onBackToLibrary}
                  className="mt-4 px-4 py-2 bg-[#064E3B] hover:bg-[#043d2e] text-white text-xs font-semibold rounded-xl"
                >
                  Khám phá bài đọc ngay
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredWords.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-2xl border border-stone-200/90 p-5 sm:p-6 shadow-xs hover:border-amber-500/40 transition-all group"
                  >
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                      {/* Left: Word Meta */}
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-1.5">
                          <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#064E3B]">
                            {item.word}
                          </h3>
                          <span className="text-[11px] font-semibold uppercase tracking-wider bg-stone-100 text-stone-600 px-2 py-0.5 rounded-full border border-stone-200">
                            {item.pos || (item as any).partOfSpeech}
                          </span>
                          <span className="font-mono text-xs text-stone-500 ml-1">
                            {item.ipa}
                          </span>
                          <button
                            onClick={() => handlePronounce(item.word)}
                            className="p-1 rounded-full text-stone-400 hover:text-emerald-700 hover:bg-stone-100 transition-colors"
                            title="Nghe phát âm chuẩn US"
                          >
                            <Volume2 className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Meanings */}
                        <div className="text-sm font-semibold text-stone-900 mb-1">
                          {item.contextMeaning || (item as any).definitionVi}
                        </div>
                        {item.definitionEn && (
                          <div className="text-xs text-stone-500 italic mb-3 font-sans">
                            "{item.definitionEn}"
                          </div>
                        )}

                        {/* Collocations */}
                        {item.collocations && item.collocations.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mb-4">
                            {item.collocations.map((col, cIdx) => (
                              <span
                                key={cIdx}
                                className="text-xs bg-amber-50 text-amber-900 border border-amber-200/80 px-2 py-0.5 rounded-md font-medium"
                              >
                                {col}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Original Context Sentence Box */}
                        <div className="bg-stone-50/80 border border-stone-200 rounded-xl p-3.5 text-xs sm:text-sm text-stone-800 leading-relaxed">
                          <div className="text-[10px] font-bold uppercase tracking-wider text-amber-800 mb-1 flex items-center gap-1.5">
                            <BookOpen className="w-3 h-3 text-amber-600" />
                            Câu trích đoạn ví dụ:
                          </div>
                          <div className="font-serif italic">
                            "{renderContextSentence(item.contextSentence, item.word)}"
                          </div>
                        </div>

                        {/* Source Article Link & Next Review Date */}
                        <div className="mt-3 text-[11px] text-stone-400 flex flex-wrap items-center justify-between gap-2">
                          <span>
                            Trích dẫn từ bài đọc:{' '}
                            <button
                              onClick={() => onOpenArticle(item.articleId || 'ai-cognitive-architecture')}
                              className="font-semibold text-stone-700 hover:text-[#064E3B] underline underline-offset-2"
                            >
                              {item.sourceArticleTitle || (item as any).articleTitle || 'Bài đọc'}
                            </button>
                          </span>
                          <span>Đã ôn: {item.reviewCount || 0} lần</span>
                        </div>
                      </div>

                      {/* Right: SRS Level Badge & Actions */}
                      <div className="flex md:flex-col items-center md:items-end justify-between gap-3 shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-stone-100">
                        {/* Mastery level meter */}
                        <div className="text-right">
                          <div className="text-[10px] uppercase font-bold text-stone-400 mb-1">
                            Cấp độ SRS ({item.srsLevel || (item as any).masteryLevel || 1}/5)
                          </div>
                          <div className="flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map((lvl) => (
                              <div
                                key={lvl}
                                className={`w-3.5 h-3.5 rounded-md text-[10px] font-bold flex items-center justify-center transition-colors ${
                                  lvl <= (item.srsLevel || (item as any).masteryLevel || 1)
                                    ? (item.srsLevel || (item as any).masteryLevel || 1) >= 4
                                      ? 'bg-emerald-700 text-white'
                                      : 'bg-[#D97706] text-white'
                                    : 'bg-stone-200 text-stone-400'
                                }`}
                              >
                                {lvl}
                              </div>
                            ))}
                          </div>
                          {item.nextReviewDate && (
                            <div className="text-[10px] text-amber-800 font-medium mt-1">
                              Ôn lại: {new Date(item.nextReviewDate).toLocaleDateString('vi-VN')}
                            </div>
                          )}
                        </div>

                        <button
                          onClick={() => removeWord(item.id)}
                          className="text-stone-400 hover:text-red-600 p-1.5 rounded-lg hover:bg-stone-100 transition-colors text-xs inline-flex items-center gap-1"
                          title="Xóa từ khỏi sổ tay"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">Xóa</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ================= TAB 2: SRS CONTEXTUAL CLOZE TEST ================= */}
        {activeTab === 'srs' && (
          <div>
            {srsWords.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl border border-stone-200 p-8">
                <Sparkles className="w-12 h-12 text-stone-300 mx-auto mb-3" />
                <h3 className="text-lg font-serif font-bold text-stone-800">
                  Chưa có từ vựng nào trong danh sách ôn tập
                </h3>
                <p className="text-stone-500 text-xs mt-1">
                  Hãy vào bài đọc và lưu các từ vựng mới để bắt đầu phiên ôn tập SRS.
                </p>
                <button
                  onClick={onBackToLibrary}
                  className="mt-4 px-4 py-2 bg-[#064E3B] text-white text-xs font-semibold rounded-xl"
                >
                  Khám phá bài đọc ngay
                </button>
              </div>
            ) : srsCompleted ? (
              /* Completion Screen */
              <div className="bg-white rounded-3xl border border-stone-200/90 p-8 sm:p-12 text-center max-w-xl mx-auto shadow-sm">
                <div className="w-16 h-16 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center mx-auto mb-4 text-emerald-800">
                  <Award className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-serif font-bold text-[#064E3B] mb-2">
                  Hoàn Thành Phiên Ôn Tập Spaced Repetition!
                </h2>
                <p className="text-stone-600 text-sm mb-6 leading-relaxed">
                  Bạn đã xuất sắc hoàn tất chu kỳ ôn luyện ngữ cảnh hôm nay với{' '}
                  <strong className="text-emerald-800">{sessionCorrectCount} / {srsWords.length}</strong>{' '}
                  từ trả lời chính xác. Mức độ ghi nhớ các từ đã được cập nhật tự động.
                </p>

                <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200 mb-6 inline-flex items-center gap-6">
                  <div>
                    <div className="text-2xl font-serif font-bold text-amber-600">
                      {sessionCorrectCount} từ
                    </div>
                    <div className="text-[11px] text-stone-500 font-semibold uppercase">Đã thuộc lòng</div>
                  </div>
                  <div className="h-8 w-px bg-stone-200" />
                  <div>
                    <div className="text-2xl font-serif font-bold text-emerald-800">
                      {Math.round((sessionCorrectCount / srsWords.length) * 100)}%
                    </div>
                    <div className="text-[11px] text-stone-500 font-semibold uppercase">Độ chuẩn xác</div>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-3">
                  <button
                    onClick={handleRestartSrs}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs sm:text-sm font-semibold shadow-sm transition-all"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Ôn tập lại từ đầu</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('catalog')}
                    className="px-5 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs sm:text-sm font-semibold transition-all"
                  >
                    Về kho từ vựng
                  </button>
                </div>
              </div>
            ) : currentSrsWord ? (
              /* Active Cloze Question */
              <div className="bg-white rounded-3xl border border-stone-200/90 p-6 sm:p-10 shadow-sm max-w-2xl mx-auto">
                {/* Progress & Header */}
                <div className="flex items-center justify-between gap-4 mb-6 pb-4 border-b border-stone-100">
                  <div className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                    Câu {srsIndex + 1} / {srsWords.length}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs text-stone-500 font-medium">Cấp độ hiện tại:</span>
                    <span className="text-xs font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                      Cấp {currentSrsWord.srsLevel || (currentSrsWord as any).masteryLevel || 1}/5
                    </span>
                  </div>
                </div>

                {/* Question Prompt */}
                <div className="mb-6">
                  <div className="text-xs font-bold uppercase tracking-wider text-amber-800 mb-2">
                    Điền từ còn thiếu vào câu trích đoạn sau:
                  </div>

                  {/* Context sentence with Blank */}
                  <div className="bg-[#F9F9F6] border-l-4 border-amber-500 rounded-r-2xl p-5 border-stone-200 border text-base sm:text-lg font-serif text-stone-800 leading-relaxed mb-4">
                    {(() => {
                      const regex = new RegExp(`(\\b${currentSrsWord.word}\\b)`, 'gi');
                      const parts = currentSrsWord.contextSentence.split(regex);
                      return parts.map((part, idx) => {
                        if (part.toLowerCase() === currentSrsWord.word.toLowerCase()) {
                          return (
                            <span
                              key={idx}
                              className="font-mono font-bold text-amber-800 bg-amber-100/80 px-2 py-0.5 rounded border border-dashed border-amber-400 mx-1"
                            >
                              [ ________ ]
                            </span>
                          );
                        }
                        return <span key={idx}>{part}</span>;
                      });
                    })()}
                  </div>

                  {/* Hint Drawer */}
                  <div className="bg-stone-50 rounded-xl p-3 border border-stone-200 text-xs text-stone-600 flex items-center justify-between gap-2">
                    <div>
                      <span className="font-semibold text-stone-800">Gợi ý nghĩa:</span>{' '}
                      {currentSrsWord.contextMeaning || (currentSrsWord as any).definitionVi} ({currentSrsWord.pos || (currentSrsWord as any).partOfSpeech})
                    </div>
                    {!showHint && (
                      <button
                        onClick={() => setShowHint(true)}
                        className="text-amber-800 hover:underline font-semibold shrink-0"
                      >
                        Hiện ký tự đầu
                      </button>
                    )}
                    {showHint && (
                      <span className="font-mono font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded">
                        Bắt đầu bằng: "{currentSrsWord.word.slice(0, 2)}..."
                      </span>
                    )}
                  </div>
                </div>

                {/* Input Area */}
                <div className="mb-6">
                  <label className="block text-xs font-semibold text-stone-700 mb-2">
                    Nhập từ vựng tiếng Anh chính xác:
                  </label>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (!isAnswerChecked) {
                        handleCheckAnswer();
                      } else {
                        handleNextSrsWord();
                      }
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="text"
                        autoFocus
                        disabled={isAnswerChecked}
                        value={inputAnswer}
                        onChange={(e) => setInputAnswer(e.target.value)}
                        placeholder="Nhập từ cần điền..."
                        className={`flex-1 px-4 py-3 rounded-xl border font-mono text-base focus:outline-none transition-all ${
                          isAnswerChecked
                            ? isCorrect
                              ? 'border-emerald-500 bg-emerald-50 text-emerald-950 font-bold'
                              : 'border-red-500 bg-red-50 text-red-950'
                            : 'border-stone-300 focus:border-[#064E3B] focus:ring-2 focus:ring-emerald-800/20'
                        }`}
                      />

                      {!isAnswerChecked ? (
                        <button
                          type="submit"
                          disabled={!inputAnswer.trim()}
                          className="px-6 py-3 rounded-xl bg-[#064E3B] hover:bg-[#043d2e] disabled:opacity-40 text-white font-semibold text-sm shadow-sm transition-all"
                        >
                          Kiểm tra
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={handleNextSrsWord}
                          className="px-6 py-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-sm shadow-sm transition-all flex items-center gap-1.5"
                        >
                          <span>Câu tiếp theo</span>
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </form>
                </div>

                {/* Feedback Result Banner */}
                {isAnswerChecked && (
                  <div
                    className={`rounded-2xl p-4 border animate-in fade-in duration-200 ${
                      isCorrect
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                        : 'bg-red-50 border-red-300 text-red-950'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-2">
                        {isCorrect ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-700" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-700" />
                        )}
                        <span className="font-bold text-sm">
                          {isCorrect
                            ? 'Chính xác tuyệt đối! (Tăng bậc SRS)'
                            : `Chưa chính xác! Đáp án đúng: "${currentSrsWord.word}"`}
                        </span>
                      </div>

                      <button
                        onClick={() => handlePronounce(currentSrsWord.word)}
                        className="text-stone-700 hover:text-emerald-900 flex items-center gap-1 text-xs font-semibold p-1"
                      >
                        <Volume2 className="w-4 h-4" />
                        <span>Nghe</span>
                      </button>
                    </div>

                    <div className="mt-2 text-xs opacity-90">
                      <strong>Phiên âm:</strong> {currentSrsWord.ipa} •{' '}
                      <strong>Định nghĩa:</strong> {currentSrsWord.contextMeaning || (currentSrsWord as any).definitionVi}
                    </div>
                  </div>
                )}
              </div>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
};
