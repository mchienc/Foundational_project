import React, { useState, useEffect } from 'react';
import {
  Layers,
  BookOpen,
  Bookmark,
  Flame,
  Clock,
  CheckCircle2,
  Play,
  Search,
  ArrowRight,
  Download,
  Sparkles,
  Plus,
  Trash2,
  Library,
  X,
} from 'lucide-react';
import { useAnki } from '../../context/AnkiContext';
import { AudioPlayButton } from '../../components/shared/AudioPlayButton';
import { AnkiExportPanel } from './AnkiExportPanel';
import { GeminiAnkiCardGenerator } from './GeminiAnkiCardGenerator';

interface AnkiWorkspaceProps {
  onStartStudy: (deckId?: string) => void;
  onNavigateReading?: () => void;
  onNavigateListening?: () => void;
}

export const AnkiWorkspace: React.FC<AnkiWorkspaceProps> = ({
  onStartStudy,
  onNavigateReading,
  onNavigateListening,
}) => {
  const {
    decks,
    cards,
    totalDueCount,
    getCardsForDeck,
    createDeck,
    deleteDeck,
    deleteCard,
    loadSampleDecks,
  } = useAnki();

  const [selectedDeckForPreview, setSelectedDeckForPreview] = useState<string>('deck-personal');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showExport, setShowExport] = useState<boolean>(false);
  const [showAiGenerator, setShowAiGenerator] = useState<boolean>(true);

  // Modal tạo bộ bài mới
  const [showCreateDeckModal, setShowCreateDeckModal] = useState<boolean>(false);
  const [newDeckTitle, setNewDeckTitle] = useState<string>('');
  const [newDeckDescription, setNewDeckDescription] = useState<string>('');
  const [newDeckIcon, setNewDeckIcon] = useState<string>('Bookmark');

  // Đảm bảo selectedDeckForPreview luôn trỏ vào một deck hợp lệ
  useEffect(() => {
    if (decks.length > 0 && !decks.some((d) => d.id === selectedDeckForPreview)) {
      setSelectedDeckForPreview(decks[0].id);
    }
  }, [decks, selectedDeckForPreview]);

  const totalLearningCount = cards.filter(
    (c) => c.status === 'learning' || c.status === 'new'
  ).length;
  const totalMasteredCount = cards.filter((c) => c.status === 'mastered').length;

  const currentDeck = decks.find((d) => d.id === selectedDeckForPreview) || decks[0];

  const previewCards = getCardsForDeck(selectedDeckForPreview).filter((card) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      card.word.toLowerCase().includes(q) ||
      card.definitionVi.toLowerCase().includes(q) ||
      card.source.toLowerCase().includes(q)
    );
  });

  const getDeckIcon = (iconName?: string) => {
    switch (iconName) {
      case 'BookOpen':
        return <BookOpen size={22} className="text-amber-300" />;
      case 'Layers':
        return <Layers size={22} className="text-amber-300" />;
      case 'Sparkles':
        return <Sparkles size={22} className="text-amber-300" />;
      case 'Flame':
        return <Flame size={22} className="text-amber-300" />;
      default:
        return <Bookmark size={22} className="text-amber-300" />;
    }
  };

  const handleCreateDeckSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDeckTitle.trim()) return;

    const created = createDeck(newDeckTitle.trim(), newDeckDescription.trim(), newDeckIcon);
    setSelectedDeckForPreview(created.id);
    setNewDeckTitle('');
    setNewDeckDescription('');
    setShowCreateDeckModal(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Editorial Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-stone-200">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#064E3B] text-amber-300 text-xs font-mono font-bold tracking-normal uppercase shadow-xs">
            <Layers size={13} className="text-amber-300" />
            <span>Thuật Toán Giãn Cách Spaced Repetition (Anki SM-2)</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#064E3B] tracking-tight leading-tight">
            Sổ Tay Từ Vựng &amp; Flashcard Anki
          </h1>
          <p className="text-sm text-stone-600 font-sans max-w-2xl leading-relaxed">
            Chống lại đường cong lãng quên tự nhiên của não bộ. Mọi từ vựng được lưu trữ nguyên vẹn kèm câu văn trích từ đề thi Cambridge,
            tự động lập lịch ôn tập theo 4 cấp độ SM-2 (Again, Hard, Good, Easy) kích hoạt vùng ghi nhớ ngữ cảnh sâu.
          </p>
        </div>

        {/* Actions: Study All & Export Anki */}
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            onClick={() => setShowAiGenerator(!showAiGenerator)}
            className={`inline-flex items-center gap-2 px-5 py-3.5 rounded-2xl text-xs sm:text-sm font-bold uppercase tracking-normal transition-all cursor-pointer border ${
              showAiGenerator
                ? 'bg-[#064E3B] text-amber-300 border-[#064E3B] shadow-xs'
                : 'bg-white hover:bg-stone-100 border-stone-200 text-stone-700 shadow-xs'
            }`}
          >
            <Sparkles size={16} className={showAiGenerator ? 'text-amber-300' : 'text-amber-600'} />
            <span>{showAiGenerator ? 'Ẩn Trình Tạo AI' : '✨ Tạo Thẻ Gemini 9.0'}</span>
          </button>
          <button
            onClick={() => setShowExport(!showExport)}
            className={`inline-flex items-center gap-2 px-5 py-3.5 rounded-2xl text-xs sm:text-sm font-bold uppercase tracking-normal transition-all cursor-pointer border ${
              showExport
                ? 'bg-amber-100 border-amber-300 text-amber-900 shadow-xs'
                : 'bg-white hover:bg-stone-100 border-stone-200 text-stone-700 shadow-xs'
            }`}
          >
            <Download size={16} className={showExport ? 'text-amber-800' : 'text-stone-500'} />
            <span>{showExport ? 'Ẩn Xuất Dữ Liệu' : 'Xuất Thẻ Anki'}</span>
          </button>

          {totalDueCount > 0 ? (
            <button
              onClick={() => onStartStudy()}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-[#D97706] hover:bg-[#B45309] text-white text-xs sm:text-sm font-bold uppercase tracking-normal shadow-md shadow-amber-600/20 active:scale-95 transition-all cursor-pointer"
            >
              <Play size={16} className="fill-white" />
              <span>Ôn Tập Tất Cả Thẻ Đến Hạn ({totalDueCount})</span>
            </button>
          ) : (
            <button
              onClick={() => onStartStudy()}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-[#064E3B] hover:bg-[#022C22] text-amber-300 text-xs sm:text-sm font-bold uppercase tracking-normal shadow-xs active:scale-95 transition-all cursor-pointer"
            >
              <Play size={16} className="fill-amber-300" />
              <span>Ôn Luyện Tự Do (Tất Cả Bộ Bài)</span>
            </button>
          )}
        </div>
      </div>

      {/* Gemini Anki Cloze Generator (Conditional) */}
      {showAiGenerator && (
        <div className="animate-in fade-in slide-in-from-top-4 duration-300">
          <GeminiAnkiCardGenerator />
        </div>
      )}

      {/* Anki Export Panel (Conditional) */}
      {showExport && (
        <div className="animate-in fade-in slide-in-from-top-4 duration-300">
          <AnkiExportPanel />
        </div>
      )}

      {/* Global Learning Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0 border border-amber-200">
            <Flame size={22} className="text-amber-600" />
          </div>
          <div>
            <span className="text-[11px] font-mono text-stone-500 uppercase font-bold block">
              Cần ôn hôm nay
            </span>
            <span className="text-2xl sm:text-3xl font-serif font-bold text-amber-700">
              {totalDueCount}
            </span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0 border border-blue-200">
            <Clock size={22} className="text-blue-600" />
          </div>
          <div>
            <span className="text-[11px] font-mono text-stone-500 uppercase font-bold block">
              Đang củng cố
            </span>
            <span className="text-2xl sm:text-3xl font-serif font-bold text-stone-800">
              {totalLearningCount}
            </span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 border border-emerald-200">
            <CheckCircle2 size={22} className="text-emerald-600" />
          </div>
          <div>
            <span className="text-[11px] font-mono text-stone-500 uppercase font-bold block">
              Đã làm chủ (Mastered)
            </span>
            <span className="text-2xl sm:text-3xl font-serif font-bold text-[#064E3B]">
              {totalMasteredCount}
            </span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-stone-100 text-stone-700 flex items-center justify-center shrink-0 border border-stone-200">
            <Layers size={22} className="text-stone-700" />
          </div>
          <div>
            <span className="text-[11px] font-mono text-stone-500 uppercase font-bold block">
              Tổng số thẻ
            </span>
            <span className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
              {cards.length}
            </span>
          </div>
        </div>
      </div>

      {/* Decks Section */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-serif font-bold text-[#064E3B]">
              Danh Mục Bộ Bài Anki (Decks)
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              {decks.length} bộ bài trong tài khoản của bạn • Quản lý độc lập theo từng học viên
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowCreateDeckModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#064E3B] hover:bg-[#053d2e] text-white text-xs font-bold transition-all shadow-xs cursor-pointer active:scale-95"
            >
              <Plus size={15} className="text-amber-300" />
              <span>Tạo Bộ Thẻ Mới</span>
            </button>

            <button
              onClick={loadSampleDecks}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white hover:bg-stone-50 border border-stone-200 text-stone-700 text-xs font-semibold transition-all cursor-pointer"
              title="Tải thêm bộ từ vựng mẫu Cambridge Core 500 & AWL"
            >
              <Library size={14} className="text-stone-500" />
              <span>Nạp Bộ Thẻ Mẫu</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {decks.map((deck) => (
            <div
              key={deck.id}
              className={`bg-white rounded-3xl border p-6 shadow-xs flex flex-col justify-between space-y-5 transition-all ${
                selectedDeckForPreview === deck.id
                  ? 'border-amber-500 ring-2 ring-amber-400/20 shadow-md'
                  : 'border-stone-200 hover:border-stone-300'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-11 h-11 rounded-xl bg-[#064E3B] flex items-center justify-center shadow-xs">
                    {getDeckIcon(deck.iconName)}
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded uppercase font-bold ${
                        deck.isPersonal
                          ? 'bg-amber-100 text-amber-900 border border-amber-300'
                          : 'bg-stone-100 text-stone-600'
                      }`}
                    >
                      {deck.category}
                    </span>

                    {/* Cho phép xóa bộ bài tự tạo */}
                    {deck.id !== 'deck-personal' && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (
                            confirm(
                              `Bạn có chắc chắn muốn xóa bộ bài "${deck.title}" và toàn bộ thẻ bên trong?`
                            )
                          ) {
                            deleteDeck(deck.id);
                          }
                        }}
                        className="p-1 rounded-md text-stone-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                        title="Xóa bộ bài này"
                      >
                        <Trash2 size={13} />
                      </button>
                    )}
                  </div>
                </div>

                <h3 className="text-lg font-serif font-bold text-[#064E3B] leading-snug">
                  {deck.title}
                </h3>

                <p className="text-xs text-stone-600 font-sans leading-relaxed line-clamp-2">
                  {deck.description}
                </p>
              </div>

              {/* Counts Badge Bar */}
              <div className="space-y-3 pt-2 border-t border-stone-100">
                <div className="grid grid-cols-3 gap-2 text-center text-[11px] font-mono">
                  <div className="p-2 rounded-xl bg-amber-50 border border-amber-200/80">
                    <span className="text-amber-800 font-bold block">{deck.dueTodayCount}</span>
                    <span className="text-stone-500 text-[10px]">Cần ôn</span>
                  </div>
                  <div className="p-2 rounded-xl bg-stone-50 border border-stone-200">
                    <span className="text-stone-800 font-bold block">{deck.learningCount}</span>
                    <span className="text-stone-500 text-[10px]">Đang học</span>
                  </div>
                  <div className="p-2 rounded-xl bg-emerald-50 border border-emerald-200/80">
                    <span className="text-emerald-800 font-bold block">{deck.masteredCount}</span>
                    <span className="text-stone-500 text-[10px]">Đã thuộc</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={() => onStartStudy(deck.id)}
                    disabled={deck.totalCards === 0}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-[#064E3B] hover:bg-[#022C22] text-amber-300 hover:text-white font-sans font-bold text-xs uppercase tracking-wide flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer active:scale-95 border border-emerald-800 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <Play size={13} className="fill-current" />
                    <span>Học Bộ Bài Này</span>
                  </button>

                  <button
                    onClick={() => setSelectedDeckForPreview(deck.id)}
                    className={`py-2.5 px-3 rounded-xl font-sans text-xs font-semibold transition-colors cursor-pointer border ${
                      selectedDeckForPreview === deck.id
                        ? 'bg-stone-200 text-stone-900 border-stone-300'
                        : 'bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100'
                    }`}
                    title="Xem trước các thẻ"
                  >
                    Xem thẻ ({deck.totalCards})
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Selected Deck Cards Preview Table */}
      <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-7 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-4">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase text-stone-400">
              Chi tiết bộ bài:
            </span>
            <h3 className="text-lg font-serif font-bold text-[#064E3B]">
              {currentDeck?.title || 'Bộ Bài'} ({previewCards.length} thẻ)
            </h3>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 w-4 h-4" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm từ vựng trong bộ bài..."
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-stone-200 bg-[#FAFAF9] text-xs font-sans text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
            />
          </div>
        </div>

        {previewCards.length === 0 ? (
          <div className="text-center py-12 px-4 space-y-3 bg-[#FAFAF9] rounded-2xl border border-dashed border-stone-300">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center">
              <BookOpen size={22} className="text-amber-600" />
            </div>
            <div className="space-y-1">
              <h4 className="font-serif font-bold text-stone-800 text-base">
                Bộ bài này hiện chưa có từ vựng nào
              </h4>
              <p className="text-xs text-stone-500 max-w-md mx-auto leading-relaxed">
                Tài khoản mới bắt đầu với bộ thẻ trắng. Bạn có thể tự tạo thẻ bằng công cụ Gemini 9.0 phía trên hoặc bôi đen từ khi luyện đọc bài Cambridge!
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setShowAiGenerator(true)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#064E3B] text-amber-300 text-xs font-bold hover:bg-[#053d2e] cursor-pointer shadow-xs"
              >
                <Sparkles size={14} />
                <span>Tạo Thẻ Anki Bằng AI</span>
              </button>
              {onNavigateReading && (
                <button
                  onClick={onNavigateReading}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-stone-200 text-stone-700 text-xs font-semibold hover:bg-stone-50 cursor-pointer"
                >
                  <span>Luyện Đọc Cambridge</span>
                  <ArrowRight size={13} />
                </button>
              )}
              {onNavigateListening && (
                <button
                  onClick={onNavigateListening}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-stone-200 text-stone-700 text-xs font-semibold hover:bg-stone-50 cursor-pointer"
                >
                  <span>Luyện Nghe Dictation</span>
                  <ArrowRight size={13} />
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {previewCards.map((c) => (
              <div
                key={c.id}
                className="p-4 rounded-2xl bg-[#FAFAF9] border border-stone-200 hover:border-amber-300 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs"
              >
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-[#064E3B] font-sans">
                      {c.word}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-stone-200 text-stone-700">
                      {c.pos}
                    </span>
                    <span className="text-stone-500 font-mono font-ipa text-[11px]">
                      {c.ipa}
                    </span>
                  </div>

                  <p className="text-stone-700 font-sans">
                    <strong>Nghĩa:</strong> {c.definitionVi}
                  </p>

                  <p className="text-stone-600 font-serif italic line-clamp-2 border-l-2 border-amber-500 pl-2">
                    "{(c.clozeSentence || c.fullSentence).replace(/\{\{c\d+::(.*?)(?:::.*?)?\}\}/g, '$1')}"
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0 self-end md:self-auto">
                  <AudioPlayButton text={c.word} variant="icon" />

                  <span
                    className={`text-[10px] font-mono px-2.5 py-1 rounded-full font-bold uppercase ${
                      c.status === 'mastered'
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : c.status === 'review'
                        ? 'bg-blue-100 text-blue-800 border border-blue-300'
                        : 'bg-amber-100 text-amber-900 border border-amber-300'
                    }`}
                  >
                    {c.status}
                  </span>

                  <button
                    onClick={() => {
                      if (confirm(`Bạn có chắc muốn xóa thẻ "${c.word}" khỏi bộ bài?`)) {
                        deleteCard(c.id);
                      }
                    }}
                    className="p-1.5 rounded-lg text-stone-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                    title="Xóa thẻ này"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal Tạo Bộ Bài Mới */}
      {showCreateDeckModal && (
        <div className="fixed inset-0 z-50 bg-stone-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-stone-200 shadow-2xl w-full max-w-md p-6 space-y-5 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
                  <Plus size={16} />
                </div>
                <h3 className="text-base font-serif font-bold text-[#064E3B]">
                  Tạo Bộ Bài Anki Mới
                </h3>
              </div>
              <button
                onClick={() => setShowCreateDeckModal(false)}
                className="p-1 rounded-lg text-stone-400 hover:text-stone-600 hover:bg-stone-100 transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateDeckSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Tên Bộ Bài <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={newDeckTitle}
                  onChange={(e) => setNewDeckTitle(e.target.value)}
                  placeholder="Ví dụ: Cambridge 18 Reading, Collocations Writing Task 2..."
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#064E3B]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Mô Tả Bộ Bài
                </label>
                <textarea
                  rows={2}
                  value={newDeckDescription}
                  onChange={(e) => setNewDeckDescription(e.target.value)}
                  placeholder="Ví dụ: Tổng hợp các cụm từ đắt giá cho đề thi Cambridge và bài viết task 2..."
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#064E3B]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Biểu Tượng
                </label>
                <div className="flex items-center gap-2">
                  {(['Bookmark', 'BookOpen', 'Layers', 'Sparkles', 'Flame'] as const).map((icon) => (
                    <button
                      key={icon}
                      type="button"
                      onClick={() => setNewDeckIcon(icon)}
                      className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                        newDeckIcon === icon
                          ? 'bg-[#064E3B] text-amber-300 border-[#064E3B] shadow-xs'
                          : 'bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100'
                      }`}
                    >
                      {getDeckIcon(icon)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setShowCreateDeckModal(false)}
                  className="px-4 py-2 text-xs font-semibold rounded-xl text-stone-600 hover:bg-stone-100 transition-colors cursor-pointer"
                >
                  Hủy Bỏ
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold rounded-xl bg-[#064E3B] hover:bg-[#053d2e] text-white shadow-xs cursor-pointer transition-all"
                >
                  Tạo Bộ Bài
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
