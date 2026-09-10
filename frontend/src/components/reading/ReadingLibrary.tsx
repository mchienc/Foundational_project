import React, { useState, useMemo } from 'react';
import { mockArticles } from '../../data/mockArticles';
import { useVocabularyVault } from '../../context/VocabularyVaultContext';
import {
  Search,
  BookOpen,
  Bookmark,
  Clock,
  ChevronRight,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';

interface ReadingLibraryProps {
  onSelectArticle: (articleId: string) => void;
  onNavigateVault: () => void;
}

export const ReadingLibrary: React.FC<ReadingLibraryProps> = ({
  onSelectArticle,
  onNavigateVault,
}) => {
  const { savedWords, isWordSaved } = useVocabularyVault();

  const [selectedTopic, setSelectedTopic] = useState<string>('all');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const topics = ['all', 'Khoa Học', 'Xã Hội', 'Kinh Tế'];
  const levels = ['all', 'B1', 'B2', 'C1', 'C2'];

  const filteredArticles = useMemo(() => {
    return mockArticles.filter((article) => {
      const matchTopic = selectedTopic === 'all' || article.topic === selectedTopic;
      const matchLevel = selectedLevel === 'all' || article.level === selectedLevel;
      const matchQuery =
        !searchQuery.trim() ||
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.targetWords.some((tw) =>
          tw.word.toLowerCase().includes(searchQuery.toLowerCase())
        );

      return matchTopic && matchLevel && matchQuery;
    });
  }, [selectedTopic, selectedLevel, searchQuery]);

  return (
    <div className="min-h-screen bg-transparent text-stone-900 pb-20 pt-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* ================= HERO INTRO ================= */}
        <div className="mb-10 bg-gradient-to-br from-[#064E3B] to-[#022C22] rounded-3xl p-8 sm:p-10 text-white shadow-xl relative overflow-hidden">
          {/* Subtle background decoration */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-emerald-400/10 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              Reading &amp; Vocabulary Vault
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight leading-tight mb-4">
              Thư Viện Bài Đọc &amp; Từ Vựng
            </h1>

            <p className="text-emerald-100 text-sm sm:text-base leading-relaxed mb-6 font-sans">
              Đọc bài tương tác, tra cứu nghĩa từ vựng theo ngữ cảnh thực tế và lưu vào Sổ tay để ôn tập theo phương pháp lặp lại ngắt quãng (SRS).
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onNavigateVault}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold text-sm shadow-md hover:shadow-lg transition-all"
              >
                <Bookmark className="w-4 h-4 text-stone-950" />
                <span>Mở Sổ Tay Từ Vựng ({savedWords.length} từ)</span>
              </button>

              <div className="text-xs text-emerald-200/90 font-medium">
                3 Chủ đề trọng tâm • 18 Từ vựng học thuật C1/C2 • 100% Khảo cứu học thuật
              </div>
            </div>
          </div>
        </div>

        {/* ================= SEARCH & FILTERS BAR ================= */}
        <div className="bg-white rounded-2xl border border-stone-200/90 p-4 sm:p-5 shadow-xs mb-8">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm theo tiêu đề, tác giả, hoặc từ vựng mục tiêu (vd: ubiquitous, stochastic)..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 bg-stone-50 text-sm focus:outline-none focus:ring-2 focus:ring-[#064E3B] focus:bg-white text-stone-900 transition-all placeholder:text-stone-400"
              />
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              {/* Topic Filters */}
              <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-xl border border-stone-200">
                {topics.map((t) => (
                  <button
                    key={t}
                    onClick={() => setSelectedTopic(t)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      selectedTopic === t
                        ? 'bg-[#064E3B] text-white shadow-xs'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    {t === 'all' ? 'Tất cả chủ đề' : t}
                  </button>
                ))}
              </div>

              {/* CEFR Level Filters */}
              <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-xl border border-stone-200">
                {levels.map((l) => (
                  <button
                    key={l}
                    onClick={() => setSelectedLevel(l)}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      selectedLevel === l
                        ? 'bg-amber-600 text-white shadow-xs'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    {l === 'all' ? 'Mọi bậc' : l}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ================= ARTICLE GRID ================= */}
        {filteredArticles.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-stone-200 p-8">
            <BookOpen className="w-12 h-12 text-stone-300 mx-auto mb-3" />
            <h3 className="text-lg font-serif font-bold text-stone-800">Không tìm thấy bài đọc phù hợp</h3>
            <p className="text-stone-500 text-xs mt-1">
              Thử tìm kiếm với từ khóa khác hoặc xóa bộ lọc để xem toàn bộ danh mục bài đọc.
            </p>
            <button
              onClick={() => {
                setSelectedTopic('all');
                setSelectedLevel('all');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold rounded-lg"
            >
              Đặt lại bộ lọc
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article) => {
              const savedInThisArticle = article.targetWords.filter((tw) =>
                isWordSaved(tw.word)
              ).length;

              return (
                <div
                  key={article.id}
                  className="bg-white rounded-2xl border border-stone-200/90 shadow-xs hover:shadow-md hover:border-amber-500/50 transition-all duration-200 flex flex-col overflow-hidden group"
                >
                  {/* Thumbnail Image */}
                  <div className="relative h-48 overflow-hidden bg-stone-100">
                    <img
                      src={article.thumbnail}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    {/* Badges on image */}
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <span
                        className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-xs uppercase tracking-wider border ${article.topicColor}`}
                      >
                        {article.topic}
                      </span>
                      <span
                        className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-xs uppercase tracking-wider border ${article.levelBadgeColor}`}
                      >
                        {article.level}
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
                      <span className="flex items-center gap-1 font-medium text-stone-200">
                        <Clock className="w-3.5 h-3.5" />
                        {article.readTimeMinutes} phút đọc
                      </span>
                      <span className="text-stone-300 font-medium">
                        {article.wordCount} từ
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 flex-1 flex flex-col">
                    <div className="text-[11px] text-stone-500 uppercase tracking-wider font-semibold mb-1 truncate">
                      {article.journal}
                    </div>

                    <h3
                      onClick={() => onSelectArticle(article.id)}
                      className="font-serif font-bold text-lg text-stone-900 group-hover:text-[#064E3B] transition-colors line-clamp-2 cursor-pointer mb-2"
                    >
                      {article.title}
                    </h3>

                    <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed mb-4 flex-1">
                      {article.summary}
                    </p>

                    {/* Target words preview */}
                    <div className="mb-4 pt-3 border-t border-stone-100">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-stone-400 mb-1.5 flex items-center justify-between">
                        <span>Từ vựng mục tiêu ({article.targetWords.length})</span>
                        {savedInThisArticle > 0 && (
                          <span className="text-emerald-700 font-semibold flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" /> {savedInThisArticle} đã lưu
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {article.targetWords.slice(0, 4).map((tw) => {
                          const saved = isWordSaved(tw.word);
                          return (
                            <span
                              key={tw.id}
                              className={`text-[11px] px-2 py-0.5 rounded font-mono ${
                                saved
                                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                                  : 'bg-stone-100 text-stone-700 border border-stone-200'
                              }`}
                            >
                              {tw.word}
                            </span>
                          );
                        })}
                        {article.targetWords.length > 4 && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-stone-50 text-stone-400">
                            +{article.targetWords.length - 4}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Author + Action CTA */}
                    <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
                      <div className="truncate text-xs text-stone-500">
                        Bởi <span className="font-semibold text-stone-700">{article.author.split(',')[0]}</span>
                      </div>

                      <button
                        onClick={() => onSelectArticle(article.id)}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#064E3B] hover:bg-[#043d2e] text-white text-xs font-semibold shadow-xs group-hover:bg-amber-600 transition-colors"
                      >
                        <span>Đọc sâu</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
