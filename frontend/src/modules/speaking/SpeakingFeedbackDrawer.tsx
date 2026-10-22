// frontend/src/modules/speaking/SpeakingFeedbackDrawer.tsx
// Bảng nhận xét chi tiết bài thi Speaking từ Giám khảo AI (Gemini)

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Sparkles,
  CheckCircle,
  AlertCircle,
  Volume2,
  BookOpen,
  ArrowRight,
  Copy,
  Check,
} from 'lucide-react';

export interface SpeakingFeedbackData {
  estimatedBand: number;
  criteria: {
    fluencyCoherence: { band: number; comment: string };
    lexicalResource: { band: number; comment: string };
    grammaticalRange: { band: number; comment: string };
    pronunciationFeedback: { comment: string };
  };
  strengths: string[];
  weaknesses: string[];
  upgradedAnswer: string;
  keyVocabulary: {
    word: string;
    ipa: string;
    meaning: string;
    exampleInAnswer: string;
  }[];
}

interface SpeakingFeedbackDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  feedback: SpeakingFeedbackData | null;
  topicTitle: string;
  spokenText: string;
  durationSeconds: number;
}

export const SpeakingFeedbackDrawer: React.FC<SpeakingFeedbackDrawerProps> = ({
  isOpen,
  onClose,
  feedback,
  topicTitle,
  spokenText,
  durationSeconds,
}) => {
  const [copiedAnswer, setCopiedAnswer] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'criteria' | 'upgrade' | 'vocab'>('criteria');

  if (!isOpen || !feedback) return null;

  const handleCopyUpgraded = async () => {
    try {
      await navigator.clipboard.writeText(feedback.upgradedAnswer);
      setCopiedAnswer(true);
      setTimeout(() => setCopiedAnswer(false), 2000);
    } catch (e) {
      console.warn('Không thể copy:', e);
    }
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.95;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-stone-900/70 backdrop-blur-sm overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          className="relative w-full max-w-3xl bg-[#FAFAF9] border border-stone-300 rounded-3xl shadow-2xl overflow-hidden my-6 flex flex-col max-h-[92vh]"
        >
          {/* Header */}
          <div className="bg-[#064E3B] text-white px-6 py-5 flex items-center justify-between shrink-0 border-b border-emerald-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center border border-amber-400/30">
                <Sparkles size={20} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg sm:text-xl font-serif font-bold text-white tracking-tight">
                    Đánh Giá Bài Nói &bull; AI Speaking Coach
                  </h3>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-400 text-stone-900">
                    IELTS 8.5+
                  </span>
                </div>
                <p className="text-xs text-emerald-200 truncate max-w-md mt-0.5">
                  Chủ đề: {topicTitle}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-stone-300 hover:text-white hover:bg-emerald-800/60 rounded-full transition-colors cursor-pointer"
              aria-label="Đóng bảng đánh giá"
            >
              <X size={20} />
            </button>
          </div>

          {/* Subheader: Score Ribbon */}
          <div className="bg-white border-b border-stone-200 px-6 py-4 flex flex-wrap items-center justify-between gap-4 shrink-0">
            <div className="flex items-center gap-4">
              <div className="flex items-baseline gap-1.5">
                <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
                  Band Nói Ước Lượng:
                </span>
                <span className="text-3xl font-serif font-bold text-[#064E3B]">
                  {feedback.estimatedBand.toFixed(1)}
                </span>
                <span className="text-xs text-stone-400">/ 9.0</span>
              </div>

              <div className="h-6 w-px bg-stone-200 hidden sm:block" />

              <span className="text-xs text-stone-600">
                Thời lượng nói: <strong className="text-stone-900">{durationSeconds} giây</strong>
              </span>
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-xl border border-stone-200 text-xs font-semibold">
              <button
                onClick={() => setActiveTab('criteria')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  activeTab === 'criteria'
                    ? 'bg-white text-[#064E3B] shadow-xs font-bold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Nhận Xét &amp; Tiêu Chí
              </button>
              <button
                onClick={() => setActiveTab('upgrade')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  activeTab === 'upgrade'
                    ? 'bg-white text-[#064E3B] shadow-xs font-bold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Câu Trả Lời Nâng Cấp
              </button>
              <button
                onClick={() => setActiveTab('vocab')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1 ${
                  activeTab === 'vocab'
                    ? 'bg-white text-[#064E3B] shadow-xs font-bold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <span>Từ Vựng Đắt Giá (IPA)</span>
                <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-amber-100 text-amber-800">
                  {feedback.keyVocabulary?.length || 0}
                </span>
              </button>
            </div>
          </div>

          {/* Body Content */}
          <div className="p-6 overflow-y-auto space-y-6">
            {/* Student's Transcribed Speech Box */}
            <div className="p-3.5 rounded-2xl bg-stone-100/80 border border-stone-200 text-xs">
              <span className="font-bold text-stone-600 block mb-1 uppercase tracking-wide">
                Bản gỡ băng giọng nói của bạn:
              </span>
              <p className="text-stone-800 italic leading-relaxed">
                "{spokenText || 'Chưa ghi nhận giọng nói'}"
              </p>
            </div>

            {/* TAB 1: Criteria & Strengths/Weaknesses */}
            {activeTab === 'criteria' && (
              <div className="space-y-5">
                {/* Strengths & Weaknesses */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Strengths */}
                  <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-2">
                    <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs uppercase tracking-wider">
                      <CheckCircle size={15} />
                      <span>Điểm sáng trong bài nói</span>
                    </div>
                    <ul className="text-xs text-stone-700 space-y-1.5 list-disc pl-4 leading-relaxed">
                      {feedback.strengths.map((str, idx) => (
                        <li key={idx}>{str}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Weaknesses */}
                  <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 space-y-2">
                    <div className="flex items-center gap-2 text-amber-800 font-bold text-xs uppercase tracking-wider">
                      <AlertCircle size={15} />
                      <span>Điểm cần khắc phục</span>
                    </div>
                    <ul className="text-xs text-stone-700 space-y-1.5 list-disc pl-4 leading-relaxed">
                      {feedback.weaknesses.map((w, idx) => (
                        <li key={idx}>{w}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* 4 Criteria Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-1">
                  <div className="p-3.5 rounded-xl bg-white border border-stone-200 shadow-xs space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-stone-800">1. Fluency &amp; Coherence</span>
                      <span className="px-2 py-0.5 rounded-full font-bold bg-emerald-100 text-emerald-900 text-[11px]">
                        Band {feedback.criteria.fluencyCoherence.band.toFixed(1)}
                      </span>
                    </div>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      {feedback.criteria.fluencyCoherence.comment}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white border border-stone-200 shadow-xs space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-stone-800">2. Lexical Resource</span>
                      <span className="px-2 py-0.5 rounded-full font-bold bg-emerald-100 text-emerald-900 text-[11px]">
                        Band {feedback.criteria.lexicalResource.band.toFixed(1)}
                      </span>
                    </div>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      {feedback.criteria.lexicalResource.comment}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white border border-stone-200 shadow-xs space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-stone-800">3. Grammatical Range</span>
                      <span className="px-2 py-0.5 rounded-full font-bold bg-emerald-100 text-emerald-900 text-[11px]">
                        Band {feedback.criteria.grammaticalRange.band.toFixed(1)}
                      </span>
                    </div>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      {feedback.criteria.grammaticalRange.comment}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white border border-stone-200 shadow-xs space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-stone-800">4. Pronunciation &amp; Intonation</span>
                      <span className="px-2 py-0.5 rounded-full font-bold bg-amber-100 text-amber-900 text-[11px]">
                        Ngữ điệu
                      </span>
                    </div>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      {feedback.criteria.pronunciationFeedback.comment}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: Upgraded Model Answer */}
            {activeTab === 'upgrade' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BookOpen size={18} className="text-[#064E3B]" />
                    <h4 className="text-sm font-bold text-stone-900">
                      Gợi ý câu trả lời nâng cấp Band 7.5 - 8.0
                    </h4>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => speakText(feedback.upgradedAnswer)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-50 hover:bg-emerald-100 text-[#064E3B] transition-colors cursor-pointer border border-emerald-200"
                    >
                      <Volume2 size={14} />
                      <span>Nghe phát âm</span>
                    </button>

                    <button
                      onClick={handleCopyUpgraded}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors cursor-pointer"
                    >
                      {copiedAnswer ? (
                        <>
                          <Check size={14} className="text-emerald-600" />
                          <span className="text-emerald-700 font-bold">Đã sao chép!</span>
                        </>
                      ) : (
                        <>
                          <Copy size={14} />
                          <span>Sao chép</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-inner font-sans text-stone-800 text-sm leading-relaxed whitespace-pre-line select-text">
                  {feedback.upgradedAnswer}
                </div>
              </div>
            )}

            {/* TAB 3: Key Vocabulary & IPA */}
            {activeTab === 'vocab' && (
              <div className="space-y-3">
                <p className="text-xs text-stone-600">
                  Các từ vựng và cụm từ học thuật đắt giá giúp nâng tầm band điểm phát âm và vốn từ:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {feedback.keyVocabulary?.map((v, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-1.5"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-[#064E3B]">{v.word}</span>
                          <span className="text-xs text-amber-700 font-mono bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                            {v.ipa}
                          </span>
                        </div>
                        <button
                          onClick={() => speakText(v.word)}
                          className="p-1 hover:bg-stone-100 rounded text-stone-500 hover:text-emerald-700"
                          title="Nghe phát âm từ"
                        >
                          <Volume2 size={14} />
                        </button>
                      </div>

                      <p className="text-xs font-medium text-stone-800">
                        {v.meaning}
                      </p>

                      <p className="text-[11px] text-stone-500 italic">
                        "{v.exampleInAnswer}"
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="bg-stone-100 px-6 py-4 border-t border-stone-200 flex items-center justify-end gap-3 shrink-0">
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl font-bold text-xs bg-[#064E3B] hover:bg-[#043327] text-white shadow-sm transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <span>Tiếp tục luyện nói đề khác</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
