// frontend/src/modules/dictation/CustomVideoImporterModal.tsx
// Modal Thiết Lập Nhanh Bài Luyện Chép Chính Tả YouTube Tùy Chỉnh (Quick Setup Drawer)

import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  X,
  Youtube,
  Sparkles,
  FileText,
  Upload,
  Play,
  Loader2,
  CheckCircle2,
  Clock,
  Layers,
  Wand2,
} from 'lucide-react';
import {
  DictationCefrLevel,
  DictationLesson,
  DictationSentence,
  DictationTopic,
} from './types';
import { parseCustomTranscriptInput, mergeSentencesByChunkSize } from './diffEngine';
import { mockDictationLessons } from './mockDictationData';

interface CustomVideoImporterModalProps {
  videoId: string;
  initialUrl: string;
  onClose: () => void;
  onConfirmLesson: (lesson: DictationLesson) => void;
}

const SAMPLE_TIMESTAMP_TEXT = `00:07 - 00:16: It's 4 a.m., and the big test is in eight hours, followed by a piano recital.
00:16 - 00:22: You've been studying and playing for days, but you still don't feel ready for either.
00:22 - 00:28: So, what can you do? Well, you can drink another cup of coffee and spend the next few hours cramming and practicing,
00:28 - 00:36: but believe it or not, you might be better off closing the books, putting away the music, and going to sleep.
00:36 - 00:43: Sleep occupies nearly a third of our lives, but many of us give surprisingly little attention and care to it.
00:43 - 00:52: This neglect is often the result of a major misunderstanding. Sleep isn't lost time, or just a way to rest when all our important work is done.`;

export const CustomVideoImporterModal: React.FC<CustomVideoImporterModalProps> = ({
  videoId,
  initialUrl,
  onClose,
  onConfirmLesson,
}) => {
  const [title, setTitle] = useState<string>(`Bài luyện YouTube (${videoId})`);
  const [channel, setChannel] = useState<string>('YouTube Academic');
  const [level, setLevel] = useState<DictationCefrLevel>('B2');
  const [topic, setTopic] = useState<DictationTopic>('Khoa học');

  // Nguồn kịch bản: 'auto' (Tự động hút phụ đề YouTube / AI) | 'manual' (Nạp JSON / WebVTT / Dán text)
  const [sourceMode, setSourceMode] = useState<'auto' | 'manual'>('auto');

  // Độ dài đoạn chép khi tạo bài: 1 (Câu chuẩn 8-14s) | 2 (Gộp 2 câu ~16-25s) | 3 (Đoạn văn gộp 3 ~25-40s)
  const [importChunkSize, setImportChunkSize] = useState<1 | 2 | 3>(1);

  const [isExtracting, setIsExtracting] = useState<boolean>(true);
  const [extractSourceLabel, setExtractSourceLabel] = useState<string>('');
  const [autoSentences, setAutoSentences] = useState<DictationSentence[]>([]);

  const [manualText, setManualText] = useState<string>(SAMPLE_TIMESTAMP_TEXT);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Tự động gọi Backend trích xuất Tiêu đề + Phụ đề thật của Video YouTube
  useEffect(() => {
    let isMounted = true;
    setIsExtracting(true);

    const matchedCurated = mockDictationLessons.find(
      (l) => l.youtubeId.toLowerCase() === videoId.toLowerCase()
    );

    fetch('/api/dictation/extract-youtube', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ videoId, url: initialUrl }),
    })
      .then((r) => (r.ok ? r.json() : null))
      .then((json) => {
        if (!isMounted) return;
        const payload = json?.data || json;
        if (matchedCurated && (!payload?.sentences || payload.sentences.length < 10)) {
          setTitle(matchedCurated.title);
          setChannel(matchedCurated.channel);
          setAutoSentences(matchedCurated.sentences);
          setExtractSourceLabel('YouTube Official Captions');
        } else if (payload && Array.isArray(payload.sentences) && payload.sentences.length > 0) {
          if (payload.title) setTitle(payload.title);
          if (payload.channel) setChannel(payload.channel);
          setAutoSentences(payload.sentences);
          setExtractSourceLabel(
            json?.source ||
              (payload.sourceType === 'youtube_official_captions'
                ? 'YouTube Official Captions'
                : payload.sourceType === 'youtube_auto_captions'
                ? 'YouTube Auto Captions'
                : 'YouTube Captions')
          );
        } else if (matchedCurated) {
          setTitle(matchedCurated.title);
          setChannel(matchedCurated.channel);
          setAutoSentences(matchedCurated.sentences);
          setExtractSourceLabel('YouTube Official Captions');
        } else {
          setAutoSentences(parseCustomTranscriptInput(SAMPLE_TIMESTAMP_TEXT));
          setExtractSourceLabel('Bộ phân đoạn mẫu');
        }
      })
      .catch(() => {
        if (!isMounted) return;
        if (matchedCurated) {
          setTitle(matchedCurated.title);
          setChannel(matchedCurated.channel);
          setAutoSentences(matchedCurated.sentences);
          setExtractSourceLabel('YouTube Official Captions');
        } else {
          setAutoSentences(parseCustomTranscriptInput(SAMPLE_TIMESTAMP_TEXT));
          setExtractSourceLabel('Bộ phân đoạn mẫu (Offline)');
        }
      })
      .finally(() => {
        if (isMounted) setIsExtracting(false);
      });

    return () => {
      isMounted = false;
    };
  }, [videoId, initialUrl]);

  const parsedManualSentences = useMemo(
    () => parseCustomTranscriptInput(manualText),
    [manualText]
  );

  const baseSentences = sourceMode === 'auto' ? autoSentences : parsedManualSentences;
  const activeSentences = useMemo(
    () => mergeSentencesByChunkSize(baseSentences, importChunkSize),
    [baseSentences, importChunkSize]
  );

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
      const content = String(ev.target?.result || '');
      if (content.trim()) {
        setManualText(content);
        setSourceMode('manual');
      }
    };
    reader.readAsText(file);
  };

  const formatSec = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleStartPractice = () => {
    const finalSentences =
      activeSentences.length > 0
        ? activeSentences
        : parseCustomTranscriptInput(SAMPLE_TIMESTAMP_TEXT);
    const lastEnd = finalSentences[finalSentences.length - 1]?.end || 180;

    const newLesson: DictationLesson = {
      id: `custom-${videoId}-${Date.now()}`,
      youtubeId: videoId,
      title: title.trim() || `YouTube Dictation (${videoId})`,
      channel: channel.trim() || 'YouTube Creator',
      level,
      topic,
      duration: formatSec(lastEnd),
      description: 'Bài luyện nghe chép chính tả tùy chỉnh được khởi tạo từ đường dẫn YouTube.',
      sentences: finalSentences,
      isCustom: true,
    };

    onConfirmLesson(newLesson);
  };

  return (
    <div
      data-lenis-prevent="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-xs animate-in fade-in duration-150"
    >
      <div className="bg-[#FAFAF9] border border-[#E7E5E4] rounded-3xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden text-stone-900">
        {/* Modal Header */}
        <div className="px-6 py-4 bg-[#064E3B] text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-300">
              <Youtube size={20} />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base sm:text-lg leading-tight">
                Thiết Lập Bài Luyện Chép Chính Tả YouTube
              </h3>
              <p className="text-[11px] text-emerald-200 font-sans">
                Kiểm tra thông tin video &amp; cấu hình độ dài phân đoạn câu trước khi vào phòng Focus
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-emerald-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div
          data-lenis-prevent="true"
          className="flex-1 overflow-y-auto overscroll-contain p-6 space-y-5 font-sans"
        >
          {/* 1. Video Preview Card */}
          <div className="bg-white rounded-2xl border border-[#E7E5E4] p-4 flex flex-col sm:flex-row gap-4 items-start shadow-2xs">
            <div className="relative w-full sm:w-48 aspect-video rounded-xl overflow-hidden bg-stone-900 shrink-0 border border-stone-200">
              <img
                src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
                alt={title}
                className="w-full h-full object-cover"
              />
              <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/80 text-white font-mono text-[10px] font-bold">
                ID: {videoId}
              </span>
            </div>

            <div className="flex-1 w-full space-y-3">
              <div>
                <label className="block text-[11px] font-mono font-bold uppercase text-stone-500 mb-1">
                  Tiêu đề bài luyện
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 bg-[#FAFAF9] text-sm font-semibold text-[#064E3B] focus:outline-none focus:border-[#064E3B]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <div>
                  <label className="block text-[10px] font-mono font-bold uppercase text-stone-500 mb-1">
                    Kênh / Nguồn
                  </label>
                  <input
                    type="text"
                    value={channel}
                    onChange={(e) => setChannel(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-xl border border-stone-300 bg-white text-xs text-stone-800 focus:outline-none focus:border-[#064E3B]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono font-bold uppercase text-stone-500 mb-1">
                    Cấp độ CEFR
                  </label>
                  <select
                    value={level}
                    onChange={(e) => setLevel(e.target.value as DictationCefrLevel)}
                    className="w-full px-2.5 py-1.5 rounded-xl border border-stone-300 bg-white text-xs font-bold text-[#064E3B] focus:outline-none"
                  >
                    <option value="B1">B1 Trung cấp</option>
                    <option value="B2">B2 Nâng cao</option>
                    <option value="C1">C1 Thành thạo</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-mono font-bold uppercase text-stone-500 mb-1">
                    Chủ đề học thuật
                  </label>
                  <select
                    value={topic}
                    onChange={(e) => setTopic(e.target.value as DictationTopic)}
                    className="w-full px-2.5 py-1.5 rounded-xl border border-stone-300 bg-white text-xs font-semibold text-stone-800 focus:outline-none"
                  >
                    <option value="Khoa học">Khoa học</option>
                    <option value="Xã hội">Xã hội</option>
                    <option value="Công nghệ">Công nghệ</option>
                    <option value="Kinh tế">Kinh tế</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* 2. Transcript Source Selector & Segment Length Selector */}
          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <label className="block text-xs font-mono font-bold uppercase text-stone-600">
                Chọn Nguồn Kịch Bản Phụ Đề (Transcript Source):
              </label>

              {/* Segment Length Selector inside Importer */}
              <div className="flex items-center gap-1.5 bg-white px-2.5 py-1 rounded-xl border border-[#E7E5E4] text-xs">
                <span className="text-[11px] font-bold text-stone-500 mr-1">Độ dài mỗi đoạn:</span>
                {([
                  { size: 1 as const, label: 'Câu chuẩn (~10s)' },
                  { size: 2 as const, label: 'Đoạn dài (Gộp 2 ~20s)' },
                  { size: 3 as const, label: 'Đoạn văn (Gộp 3 ~30s)' },
                ]).map((opt) => (
                  <button
                    key={opt.size}
                    type="button"
                    onClick={() => setImportChunkSize(opt.size)}
                    className={`px-2 py-0.5 rounded-lg text-[11px] font-bold transition-colors cursor-pointer ${
                      importChunkSize === opt.size
                        ? 'bg-[#D97706] text-white'
                        : 'text-stone-600 hover:bg-stone-100'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setSourceMode('auto')}
                className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex items-start gap-3 ${
                  sourceMode === 'auto'
                    ? 'bg-emerald-50/70 border-2 border-[#064E3B] shadow-xs'
                    : 'bg-white border-[#E7E5E4] hover:border-stone-300'
                }`}
              >
                <div className="w-8 h-8 rounded-xl bg-[#064E3B] text-amber-300 flex items-center justify-center shrink-0 mt-0.5">
                  <Wand2 size={16} />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-[#064E3B]">
                      Cách 1: Tự Động Trích Xuất Phụ Đề Gốc
                    </span>
                    <span className="px-1.5 py-0.2 rounded bg-amber-100 text-amber-900 text-[9px] font-mono font-bold">
                      Khuyên dùng
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-600 mt-0.5 leading-relaxed">
                    Hút trực tiếp phụ đề chuẩn từ YouTube InnerTube API &amp; gộp thành các câu dài tự nhiên.
                  </p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setSourceMode('manual')}
                className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex items-start gap-3 ${
                  sourceMode === 'manual'
                    ? 'bg-emerald-50/70 border-2 border-[#064E3B] shadow-xs'
                    : 'bg-white border-[#E7E5E4] hover:border-stone-300'
                }`}
              >
                <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-900 border border-amber-300 flex items-center justify-center shrink-0 mt-0.5">
                  <FileText size={16} />
                </div>
                <div>
                  <span className="text-xs font-bold text-stone-900 block">
                    Cách 2: Nạp File JSON / WebVTT / Dán Text
                  </span>
                  <p className="text-[11px] text-stone-600 mt-0.5 leading-relaxed">
                    Tải lên file phụ đề (.vtt, .srt, .json) hoặc dán văn bản có mốc `00:12 - 00:18: Câu...`
                  </p>
                </div>
              </button>
            </div>
          </div>

          {/* 3. Content Area based on Source Mode */}
          {sourceMode === 'auto' ? (
            <div className="bg-white rounded-2xl border border-[#E7E5E4] p-4 space-y-3">
              <div className="flex items-center justify-between border-b border-stone-100 pb-2.5">
                <div className="flex items-center gap-2">
                  <Sparkles size={15} className="text-[#D97706]" />
                  <span className="text-xs font-bold text-[#064E3B]">
                    Danh Sách Đoạn Đã Trích Xuất ({activeSentences.length} đoạn)
                  </span>
                </div>
                {extractSourceLabel && (
                  <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-[#064E3B] border border-emerald-200 text-[10px] font-mono font-bold">
                    Nguồn: {extractSourceLabel}
                  </span>
                )}
              </div>

              {isExtracting ? (
                <div className="py-8 flex flex-col items-center justify-center gap-2 text-stone-500">
                  <Loader2 size={22} className="animate-spin text-[#064E3B]" />
                  <span className="text-xs font-medium">
                    Đang đồng bộ phụ đề gốc và phân tích mốc thời gian từ YouTube...
                  </span>
                </div>
              ) : (
                <div className="max-h-52 overflow-y-auto space-y-2 pr-1">
                  {activeSentences.map((s, idx) => (
                    <div
                      key={s.id || idx}
                      className="p-2.5 rounded-xl bg-[#FAFAF9] border border-stone-200/80 flex items-start gap-3 text-xs"
                    >
                      <span className="px-2 py-0.5 rounded bg-[#064E3B] text-amber-300 font-mono text-[10px] font-bold shrink-0">
                        #{idx + 1} • {formatSec(s.start)} - {formatSec(s.end)}
                      </span>
                      <p className="text-stone-800 font-medium leading-relaxed flex-1">{s.text}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-[#E7E5E4] p-4 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-bold text-[#064E3B] flex items-center gap-1.5">
                  <FileText size={14} className="text-[#D97706]" />
                  Dán Kịch Bản Có Mốc Thời Gian Hoặc Tải File Phụ Đề:
                </span>

                <div className="flex items-center gap-2">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".vtt,.srt,.json,.txt"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-3 py-1 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 border border-stone-300 text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors"
                  >
                    <Upload size={13} />
                    <span>Tải file .VTT / .SRT / .JSON</span>
                  </button>
                </div>
              </div>

              <textarea
                rows={5}
                value={manualText}
                onChange={(e) => setManualText(e.target.value)}
                placeholder="Ví dụ:&#10;00:12 - 00:18: Sentence one text here.&#10;00:19 - 00:25: Sentence two text here."
                className="w-full p-3 rounded-xl border border-stone-300 bg-[#FAFAF9] font-mono text-xs text-stone-800 focus:outline-none focus:border-[#064E3B] leading-relaxed"
              />

              <div className="flex items-center justify-between text-[11px] text-stone-500">
                <span className="flex items-center gap-1 text-emerald-800 font-semibold">
                  <CheckCircle2 size={13} className="text-emerald-600" />
                  Đã nhận diện hợp lệ: <strong>{activeSentences.length} đoạn</strong>
                </span>
                <span>Hỗ trợ định dạng: `MM:SS - MM:SS: Nội dung`, WebVTT, SRT, JSON</span>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-white border-t border-[#E7E5E4] flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3 text-xs text-stone-600 font-mono">
            <span className="flex items-center gap-1">
              <Layers size={14} className="text-[#064E3B]" />
              <strong>{activeSentences.length}</strong> đoạn chép
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock size={14} className="text-[#D97706]" />
              Cấp độ <strong>{level}</strong>
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-stone-300 text-stone-700 hover:bg-stone-100 text-xs font-bold font-sans cursor-pointer transition-colors"
            >
              Hủy Bỏ
            </button>
            <button
              type="button"
              onClick={handleStartPractice}
              disabled={isExtracting && sourceMode === 'auto'}
              className="px-5 py-2.5 rounded-xl bg-[#064E3B] hover:bg-[#043327] text-white text-xs font-bold font-sans flex items-center gap-2 shadow-md cursor-pointer transition-all disabled:opacity-50"
            >
              <Play size={14} className="fill-amber-300 text-amber-300" />
              <span>Vào Phòng Chép Chính Tả ({activeSentences.length} đoạn)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
