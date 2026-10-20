import React, { useState } from 'react';
import {
  Sparkles,
  Copy,
  Check,
  BookmarkPlus,
  Loader2,
  BookOpen,
  Tag,
  AlertCircle,
  Key,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { useVocabularyVault } from '../../context/VocabularyVaultContext';

interface GeminiAnkiCardGeneratorProps {
  initialWord?: string;
  initialSentence?: string;
  onSavedSuccess?: (msg: string) => void;
}

interface GeneratedCardData {
  text: string;
  backExtra: string;
  tags: string;
  raw: string;
}

export const GeminiAnkiCardGenerator: React.FC<GeminiAnkiCardGeneratorProps> = ({
  initialWord = '',
  initialSentence = '',
  onSavedSuccess,
}) => {
  const { saveAiGeneratedWord } = useVocabularyVault();

  const [inputWord, setInputWord] = useState(initialWord);
  const [inputSentence, setInputSentence] = useState(initialSentence);
  const [isGenerating, setIsGenerating] = useState(false);
  const [cardResult, setCardResult] = useState<GeneratedCardData | null>(null);
  const [generationSource, setGenerationSource] = useState<string>('');
  const [copiedSection, setCopiedSection] = useState<string | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Cấu hình API Key trực tiếp (lưu trong localStorage)
  const [customApiKey, setCustomApiKey] = useState<string>(
    () => localStorage.getItem('eduflow_gemini_key') || ''
  );
  const [showKeyConfig, setShowKeyConfig] = useState<boolean>(false);

  const handleSaveCustomKey = (val: string) => {
    setCustomApiKey(val);
    localStorage.setItem('eduflow_gemini_key', val.trim());
  };

  const handleGenerate = async () => {
    if (!inputWord.trim() && !inputSentence.trim()) {
      setErrorMessage('Vui lòng nhập ít nhất một từ vựng hoặc câu văn ngữ cảnh.');
      return;
    }

    setErrorMessage(null);
    setIsGenerating(true);
    setIsSaved(false);

    try {
      const res = await fetch('/api/anki/generate-cloze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          word: inputWord.trim(),
          sentence: inputSentence.trim(),
          customApiKey: customApiKey.trim() || undefined,
        }),
      });

      const data = await res.json();
      if (res.ok && data?.success && data?.data) {
        setCardResult(data.data);
        setGenerationSource(data.source || 'Gemini AI');
      } else {
        setErrorMessage(data?.message || 'Không thể tạo thẻ Anki AI.');
      }
    } catch {
      setErrorMessage('Lỗi kết nối máy chủ khi tạo thẻ Anki.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveToVault = () => {
    if (!cardResult) return;

    const saved = saveAiGeneratedWord({
      word: inputWord.trim() || cardResult.text.replace(/\{\{c1::(.*?)(?:::.*?)?\}\}/g, '$1').slice(0, 30),
      clozeText: cardResult.text,
      backExtra: cardResult.backExtra,
      tags: cardResult.tags,
      contextSentence: inputSentence.trim(),
      sourceArticleTitle: 'Gemini IELTS 9.0 Coach',
    });

    if (saved) {
      setIsSaved(true);
      onSavedSuccess?.(`Đã lưu thẻ Anki Cloze "${inputWord || 'từ mới'}" vào kho từ vựng thành công!`);
    }
  };

  const copyToClipboard = (content: string, sectionName: string) => {
    navigator.clipboard.writeText(content);
    setCopiedSection(sectionName);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  // Render text có bọc cloze {{c1::...::...}} nổi bật
  const renderHighlightedCloze = (rawText: string) => {
    const parts = [];
    const regex = /\{\{c1::(.*?)(?:::([^}]*))?\}\}/g;
    let lastIdx = 0;
    let match;

    while ((match = regex.exec(rawText)) !== null) {
      if (match.index > lastIdx) {
        parts.push(rawText.substring(lastIdx, match.index));
      }
      const collocation = match[1];
      const hint = match[2];
      parts.push(
        <span
          key={match.index}
          className="inline-flex items-baseline px-2 py-0.5 rounded-lg bg-amber-100 text-amber-950 font-bold border border-amber-300 mx-1 shadow-2xs"
        >
          <span>{collocation}</span>
          {hint && (
            <span className="ml-1 text-[11px] font-normal text-amber-800 italic">
              ({hint})
            </span>
          )}
        </span>
      );
      lastIdx = regex.lastIndex;
    }

    if (lastIdx < rawText.length) {
      parts.push(rawText.substring(lastIdx));
    }

    return parts;
  };

  const isOfflineSafe = generationSource.includes('offline-safe') || generationSource.includes('smart-academic-engine');

  return (
    <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-xs space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
        <div className="flex items-start gap-3">
          <div className="p-3 rounded-2xl bg-amber-50 text-[#D97706] shrink-0 mt-0.5">
            <Sparkles size={24} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg sm:text-xl font-bold font-serif text-[#064E3B]">
                Gemini IELTS 9.0 • AI Cloze Card Generator
              </h3>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#064E3B] text-amber-300">
                Band 8.0+ Collocation
              </span>
            </div>
            <p className="text-xs text-stone-500 mt-1 max-w-2xl leading-relaxed">
              Tự động phân tích từ vựng, bắt trọn cụm Collocation tự nhiên, sinh 3 dòng Back Extra súc tích
              (phiên âm, từ đồng nghĩa, bẫy danh từ hóa) và định dạng chuẩn Note Type <strong>Cloze</strong> của Anki.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-center">
          <button
            onClick={() => setShowKeyConfig(!showKeyConfig)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl border border-stone-200 hover:bg-stone-50 text-stone-700 transition-colors cursor-pointer"
            title="Xem hoặc dán trực tiếp API Key"
          >
            <Key size={13} className="text-amber-600" />
            <span>Cài đặt Key</span>
            {showKeyConfig ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
          </button>

          {generationSource && (
            <span
              className={`text-[11px] font-mono px-3 py-1 rounded-full border ${
                isOfflineSafe
                  ? 'text-amber-800 bg-amber-50 border-amber-300'
                  : 'text-emerald-800 bg-emerald-50 border-emerald-300 font-bold'
              }`}
            >
              {isOfflineSafe ? '⚠️ Mô hình: Dự phòng Offline' : `✨ ${generationSource}`}
            </span>
          )}
        </div>
      </div>

      {/* Cấu hình Key nhanh nếu muốn dán trực tiếp */}
      {showKeyConfig && (
        <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 text-xs space-y-2 animate-in fade-in duration-150">
          <div className="flex items-center justify-between">
            <span className="font-bold text-amber-900 flex items-center gap-1.5">
              <ShieldCheck size={14} className="text-emerald-700" />
              Google Gemini API Key
            </span>
            <span className="text-[11px] text-amber-700">
              (Mặc định đã nạp từ file .env. Bạn có thể dán đè key tại đây)
            </span>
          </div>
          <div className="flex gap-2">
            <input
              type="password"
              value={customApiKey}
              onChange={(e) => handleSaveCustomKey(e.target.value)}
              placeholder="Dán key AIzaSy... hoặc để trống nếu đã cấu hình trong .env"
              className="flex-1 px-3 py-2 text-xs rounded-xl border border-amber-300 bg-white focus:outline-none focus:ring-1 focus:ring-[#064E3B]"
            />
            {customApiKey && (
              <button
                onClick={() => handleSaveCustomKey('')}
                className="px-3 py-1.5 text-xs rounded-xl bg-white border border-stone-200 text-stone-600 hover:bg-stone-50 cursor-pointer"
              >
                Xóa Key
              </button>
            )}
          </div>
        </div>
      )}

      {/* Cảnh báo nếu đang chạy fallback */}
      {cardResult && isOfflineSafe && (
        <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-2.5 text-xs text-amber-900">
          <AlertCircle size={16} className="text-amber-700 shrink-0 mt-0.5" />
          <div>
            <strong>Lưu ý:</strong> Thẻ này đang được tạo bằng thuật toán nội bộ dự phòng do server Node.js chưa nhận diện được Gemini API Key (thường xảy ra nếu bạn chưa khởi động lại server sau khi sửa file .env). Bạn có thể bấm <strong>"Cài đặt Key"</strong> ở góc trên và dán mã key trực tiếp để kích hoạt Google AI thật ngay lập tức!
          </div>
        </div>
      )}

      {/* Input Form */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-stone-700 mb-1">
            Từ vựng / Cụm từ cần học <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            value={inputWord}
            onChange={(e) => setInputWord(e.target.value)}
            placeholder="Ví dụ: monarch, deter, ubiquitous, alleviate, sustainable..."
            className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-stone-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#064E3B]"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-stone-700 mb-1">
            Câu văn ngữ cảnh (Trích Cambridge hoặc The Economist)
          </label>
          <input
            type="text"
            value={inputSentence}
            onChange={(e) => setInputSentence(e.target.value)}
            placeholder="Ví dụ: A final observation concerns the author's emphasis on the 'invisibility' of the monarch."
            className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-stone-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#064E3B]"
          />
        </div>
      </div>

      {errorMessage && (
        <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700">
          <AlertCircle size={15} />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Action Submit */}
      <div className="flex items-center justify-between pt-1">
        <span className="text-[11px] text-stone-400">
          💡 Mẹo: Nhập cả câu văn gốc để Gemini đục lỗ nguyên cụm Collocation thay vì đục lỗ một từ đơn lẻ.
        </span>

        <button
          onClick={handleGenerate}
          disabled={isGenerating}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#064E3B] hover:bg-[#053d2e] text-white text-xs sm:text-sm font-bold uppercase tracking-wider transition-all cursor-pointer shadow-xs active:scale-95 disabled:opacity-50"
        >
          {isGenerating ? (
            <>
              <Loader2 size={16} className="animate-spin text-amber-300" />
              <span>Gemini Đang Tạo Thẻ...</span>
            </>
          ) : (
            <>
              <Sparkles size={16} className="text-amber-300" />
              <span>Tạo Thẻ Anki Chuẩn 9.0</span>
            </>
          )}
        </button>
      </div>

      {/* Result Card Preview */}
      {cardResult && (
        <div className="mt-6 rounded-2xl border-2 border-emerald-200 bg-emerald-50/40 p-5 sm:p-6 space-y-5 animate-in fade-in duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-emerald-200">
            <span className="text-xs font-mono font-bold text-emerald-900 flex items-center gap-1.5">
              <BookOpen size={14} /> Thẻ Anki Cloze Hoàn Chỉnh (3 Mục Chuẩn)
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={() => copyToClipboard(cardResult.raw, 'all')}
                className="inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-lg bg-white border border-stone-200 text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
              >
                {copiedSection === 'all' ? <Check size={12} className="text-emerald-600" /> : <Copy size={12} />}
                {copiedSection === 'all' ? 'Đã sao chép!' : 'Sao Chép Tất Cả'}
              </button>

              <button
                onClick={handleSaveToVault}
                disabled={isSaved}
                className={`inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                  isSaved
                    ? 'bg-emerald-600 text-white'
                    : 'bg-[#D97706] hover:bg-[#b45309] text-white shadow-xs'
                }`}
              >
                {isSaved ? <Check size={13} /> : <BookmarkPlus size={13} />}
                {isSaved ? 'Đã Lưu Vào Kho Từ Vựng' : 'Lưu Thẻ Vào Bộ Ôn Tập'}
              </button>
            </div>
          </div>

          {/* Section 1: [TEXT] */}
          <div className="space-y-1.5 bg-white p-4 rounded-xl border border-stone-200 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono font-bold text-amber-800 uppercase tracking-wider">
                [TEXT] Mặt Trước (Cloze Collocation)
              </span>
              <button
                onClick={() => copyToClipboard(cardResult.text, 'text')}
                className="text-[11px] text-stone-500 hover:text-stone-800 flex items-center gap-1 cursor-pointer"
              >
                {copiedSection === 'text' ? <Check size={11} className="text-emerald-600" /> : <Copy size={11} />}
                {copiedSection === 'text' ? 'Đã sao chép' : 'Copy'}
              </button>
            </div>
            <div className="text-sm font-serif leading-relaxed text-stone-900 pt-1">
              {renderHighlightedCloze(cardResult.text)}
            </div>
            <div className="text-[10px] font-mono text-stone-400 pt-1">
              Mã nguồn Anki: {cardResult.text}
            </div>
          </div>

          {/* Section 2: [BACK EXTRA] */}
          <div className="space-y-1.5 bg-white p-4 rounded-xl border border-stone-200 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono font-bold text-emerald-800 uppercase tracking-wider">
                [BACK EXTRA] Mặt Sau (3-4 Dòng Súc Tích Band 9.0)
              </span>
              <button
                onClick={() => copyToClipboard(cardResult.backExtra, 'back')}
                className="text-[11px] text-stone-500 hover:text-stone-800 flex items-center gap-1 cursor-pointer"
              >
                {copiedSection === 'back' ? <Check size={11} className="text-emerald-600" /> : <Copy size={11} />}
                {copiedSection === 'back' ? 'Đã sao chép' : 'Copy'}
              </button>
            </div>
            <div className="text-xs font-sans text-stone-800 whitespace-pre-line leading-relaxed pt-1 bg-stone-50 p-3 rounded-lg border border-stone-200 font-medium">
              {cardResult.backExtra}
            </div>
          </div>

          {/* Section 3: [TAGS] */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-white p-3 rounded-xl border border-stone-200 shadow-2xs">
            <div className="flex items-center gap-2">
              <Tag size={13} className="text-stone-400" />
              <span className="text-[11px] font-mono font-bold text-stone-600 uppercase">
                [TAGS]:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {cardResult.tags.split(/\s+/).filter(Boolean).map((t, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-stone-100 text-stone-700 border border-stone-200"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            </div>
            <button
              onClick={() => copyToClipboard(cardResult.tags, 'tags')}
              className="text-[11px] text-stone-500 hover:text-stone-800 flex items-center gap-1 cursor-pointer self-end sm:self-auto"
            >
              {copiedSection === 'tags' ? <Check size={11} className="text-emerald-600" /> : <Copy size={11} />}
              {copiedSection === 'tags' ? 'Đã sao chép' : 'Copy Tags'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
