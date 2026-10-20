// frontend/src/modules/dictation/CustomVideoImporterModal.tsx
// Modal Thiết Lập Nhanh Bài Luyện Chép Chính Tả YouTube Tùy Chỉnh (Quick Setup Drawer)

import React, { useState, useEffect, useRef } from 'react';
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
import { parseCustomTranscriptInput } from './diffEngine';

interface CustomVideoImporterModalProps {
  videoId: string;
  initialUrl: string;
  onClose: () => void;
  onConfirmLesson: (lesson: DictationLesson) => void;
}

const SAMPLE_TIMESTAMP_TEXT = `00:05 - 00:11: Welcome to our academic lecture on sustainable urban architecture.
00:12 - 00:19: Modern cities face unprecedented challenges due to rapid population growth and climate change.
00:20 - 00:27: Architects are now integrating renewable energy systems directly into building facades.
00:28 - 00:35: Furthermore, vertical forests help reduce the urban heat island effect and improve air quality.
00:36 - 00:43: By reimagining public spaces, we can create resilient communities for future generations.`;

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

  const [isExtracting, setIsExtracting] = useState<boolean>(true);
  const [extractSourceLabel, setExtractSourceLabel] = useState<string>('');
  const [autoSentences, setAutoSentences] = useState<DictationSentence[]>([]);

  const [manualText, setManualText] = useState<string>(SAMPLE_TIMESTAMP_TEXT);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Tự động gọi Backend trích xuất Tiêu đề + Phụ đề thật của Video YouTube
  useEffect(() => {
    let isMounted = true;
    setIsExtracting(true);

    fetch('/api/dictation/extract-youtube', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ videoId, url: initialUrl }),
    })
      .then((r) => (r.ok ? r.json() : null))
      .then((json) => {
        if (!isMounted) return;
        if (json?.success && json?.data) {
          if (json.data.title) setTitle(json.data.title);
          if (json.data.channel) setChannel(json.data.channel);
          if (Array.isArray(json.data.sentences) && json.data.sentences.length > 0) {
            setAutoSentences(json.data.sentences);
          }
          setExtractSourceLabel(json.source || 'YouTube Captions');
        } else {
          setAutoSentences(parseCustomTranscriptInput(SAMPLE_TIMESTAMP_TEXT));
          setExtractSourceLabel('Bộ phân đoạn mẫu');
        }
      })
      .catch(() => {
        if (!isMounted) return;
        setAutoSentences(parseCustomTranscriptInput(SAMPLE_TIMESTAMP_TEXT));
        setExtractSourceLabel('Bộ phân đoạn mẫu (Offline)');
      })
      .finally(() => {
        if (isMounted) setIsExtracting(false);
      });

    return () => {
      isMounted = false;
    };
  }, [videoId, initialUrl]);

  const parsedManualSentences = parseCustomTranscriptInput(manualText);
  const activeSentences = sourceMode === 'auto' ? autoSentences : parsedManualSentences;

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
    const finalSentences = activeSentences.length > 0 ? activeSentences : parseCustomTranscriptInput(SAMPLE_TIMESTAMP_TEXT);
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
                Kiểm tra thông tin video &amp; cấu hình phân đoạn câu trước khi vào phòng Focus
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
          className="flex-1 overflow-y-auto overscroll-contain p-6 space-y-6 font-sans"
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

          {/* 2. Transcript Source Selector */}
          <div className="space-y-3">
            <label className="block text-xs font-mono font-bold uppercase text-stone-600">
              Chọn Nguồn Kịch Bản Phụ Đề (Transcript Source):
            </label>

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
                      Cách 1: Tự Động Trích Xuất &amp; Phân Đoạn
                    </span>
                    <span className="px-1.5 py-0.2 rounded bg-amber-100 text-amber-900 text-[9px] font-mono font-bold">
                      Khuyên dùng
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-600 mt-0.5 leading-relaxed">
                    Tự động hút phụ đề gốc từ YouTube hoặc dùng AI tách câu theo mốc thời gian thực.
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
                    Danh Sách Câu Đã Trích Xuất ({autoSentences.length} câu)
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
                    Đang đồng bộ phụ đề và phân tích mốc thời gian từ YouTube...
                  </span>
                </div>
              ) : (
                <div className="max-h-52 overflow-y-auto space-y-2 pr-1">
                  {autoSentences.map((s, idx) => (
                    <div
                      key={s.id || idx}
                      className="p-2.5 rounded-xl bg-[#FAFAF9] border border-stone-200/80 flex items-start gap-3 text-xs"
                    >
                      <span className="px-2 py-0.5 rounded bg-[#064E3B] text-amber-300 font-mono text-[10px] font-bold shrink-0">
                        {formatSec(s.start)} - {formatSec(s.end)}
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
                  Đã nhận diện hợp lệ: <strong>{parsedManualSentences.length} câu</strong>
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
              <strong>{activeSentences.length}</strong> câu chép
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
              <span>Vào Phòng Chép Chính Tả ({activeSentences.length} câu)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
