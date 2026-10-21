import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageSquare,
  X,
  RotateCcw,
  Send,
  Mic,
  MicOff,
  Sparkles,
  Plus,
  Check,
  Volume2,
  BookOpen,
  Wand2,
  MessageCircle,
  BookmarkPlus,
} from 'lucide-react';
import { Screen } from '../../types';
import { useAnki } from '../../context/AnkiContext';
import { useVocabularyVault } from '../../context/VocabularyVaultContext';

export type ChatMode = 'tips' | 'upgrade' | 'speaking' | 'anki';

export interface ChatVocabItem {
  word: string;
  ipa: string;
  pos: string;
  meaningVi: string;
  exampleSentence: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: string;
  vocabItems?: ChatVocabItem[];
}

interface AiTutorFloatingChatbotProps {
  currentScreen: Screen;
  onNotify?: (message: string, type?: 'success' | 'error' | 'info') => void;
}

const MODE_TABS: Array<{
  id: ChatMode;
  label: string;
  shortDesc: string;
  placeholder: string;
  icon: React.ReactNode;
}> = [
  {
    id: 'tips',
    label: 'Hỏi đáp mẹo thi',
    shortDesc: 'Giải đáp nhanh mẹo làm bài Reading, Listening, ngữ pháp và cách chia thời gian.',
    placeholder: 'Nhập câu hỏi về mẹo thi, ngữ pháp...',
    icon: <BookOpen size={13} />,
  },
  {
    id: 'upgrade',
    label: 'Nâng cấp câu',
    shortDesc: 'Nhập 1 câu tiếng Anh đơn giản, AI sẽ viết lại ở 3 mức: 6.5, 7.5 và 8.5+.',
    placeholder: 'Nhập câu muốn nâng cấp (VD: Technology is important)...',
    icon: <Wand2 size={13} />,
  },
  {
    id: 'speaking',
    label: 'Luyện nói Speaking',
    shortDesc: 'Đóng vai Giám khảo hỏi Speaking Part 1 & 3. Bấm nút Mic để nói hoặc gõ câu trả lời.',
    placeholder: 'Trả lời tiếng Anh hoặc bấm Mic để nói...',
    icon: <MessageCircle size={13} />,
  },
  {
    id: 'anki',
    label: 'Lưu từ vào Anki',
    shortDesc: 'Tra nghĩa từ vựng hoặc xin cụm từ theo chủ đề và lưu 1-click vào Flashcard Anki.',
    placeholder: 'Nhập từ vựng hoặc chủ đề muốn học...',
    icon: <BookmarkPlus size={13} />,
  },
];

const QUICK_CHIPS: Array<{ text: string; targetMode?: ChatMode }> = [
  { text: 'Mẹo phân biệt False và Not Given', targetMode: 'tips' },
  { text: 'Nâng cấp câu: "Money is important"', targetMode: 'upgrade' },
  { text: 'Cho 5 cụm từ hay chủ đề Môi trường', targetMode: 'anki' },
  { text: 'Hỏi tôi 1 câu Speaking Part 1', targetMode: 'speaking' },
];

export const AiTutorFloatingChatbot: React.FC<AiTutorFloatingChatbotProps> = ({
  currentScreen,
  onNotify,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activeMode, setActiveMode] = useState<ChatMode>('tips');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [savedWordsMap, setSavedWordsMap] = useState<Record<string, boolean>>({});

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { addCardToPersonalDeck, isWordSavedInAnki } = useAnki();
  const { saveAiGeneratedWord, isWordSaved } = useVocabularyVault();

  // Kiểm tra người dùng có đang trong phòng thi bấm giờ hay không
  const isInTimedExam =
    currentScreen === 'computer-exam' ||
    currentScreen === 'listening-exam' ||
    (typeof window !== 'undefined' && window.location.pathname.startsWith('/exam'));

  // Tự động cuộn xuống tin nhắn mới nhất
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isLoading]);

  // Dừng ghi âm nếu đóng khung chat
  useEffect(() => {
    if (!isOpen && isRecording && recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {}
      setIsRecording(false);
    }
  }, [isOpen, isRecording]);

  // Gửi tin nhắn tới Backend /api/chat
  const sendMessage = async (textToSend?: string, overrideMode?: ChatMode) => {
    const cleanText = (textToSend !== undefined ? textToSend : inputText).trim();
    if (!cleanText || isLoading) return;

    const modeToUse = overrideMode || activeMode;
    if (overrideMode && overrideMode !== activeMode) {
      setActiveMode(overrideMode);
    }

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: cleanText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const updatedHistory = [...messages, userMessage];
    setMessages(updatedHistory);
    if (textToSend === undefined) {
      setInputText('');
    }
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode: modeToUse,
          messages: updatedHistory.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      const data = await response.json();

      if (response.ok && data.success && data.reply) {
        const aiMessage: ChatMessage = {
          id: `ai-${Date.now()}`,
          role: 'model',
          content: data.reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          vocabItems: Array.isArray(data.vocabItems) ? data.vocabItems : [],
        };
        setMessages((prev) => [...prev, aiMessage]);
      } else {
        const errorMsg: ChatMessage = {
          id: `err-${Date.now()}`,
          role: 'model',
          content:
            data.message ||
            'Hiện tại mình chưa phản hồi được ngay. Bạn vui lòng thử lại sau vài giây nhé!',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, errorMsg]);
      }
    } catch (error) {
      const netErr: ChatMessage = {
        id: `err-${Date.now()}`,
        role: 'model',
        content: 'Không thể kết nối tới máy chủ. Vui lòng kiểm tra mạng và thử lại nhé!',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, netErr]);
    } finally {
      setIsLoading(false);
    }
  };

  // Làm mới đoạn hội thoại
  const handleResetChat = () => {
    setMessages([]);
    setInputText('');
    if (isRecording && recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {}
      setIsRecording(false);
    }
  };

  // Bật / Tắt thu âm giọng nói bằng Web Speech API
  const handleToggleMic = () => {
    if (isRecording) {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch {}
      }
      setIsRecording(false);
      return;
    }

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      onNotify?.(
        'Trình duyệt của bạn chưa hỗ trợ thu âm giọng nói. Hãy dùng Google Chrome hoặc Edge nhé!',
        'info'
      );
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-US';
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => {
        setIsRecording(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results?.[0]?.[0]?.transcript;
        if (transcript) {
          setInputText((prev) => (prev ? `${prev} ${transcript}` : transcript));
          inputRef.current?.focus();
        }
      };

      recognition.onerror = () => {
        setIsRecording(false);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch {
      setIsRecording(false);
    }
  };

  // Phát âm từ vựng tiếng Anh
  const speakEnglishText = (text: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-GB';
    utterance.rate = 0.92;
    window.speechSynthesis.speak(utterance);
  };

  // Lưu 1-Click từ vựng vào bộ thẻ Flashcard Anki & Sổ tay
  const handleSaveVocabToAnki = (item: ChatVocabItem) => {
    const cleanWord = item.word.trim();
    const key = cleanWord.toLowerCase();

    // Lưu vào AnkiContext
    addCardToPersonalDeck({
      word: cleanWord,
      ipa: item.ipa || '/.../',
      pos: item.pos || 'vocab',
      definitionEn: item.meaningVi,
      definitionVi: item.meaningVi,
      contextSentence: item.exampleSentence || `Example with ${cleanWord}.`,
      source: 'Trợ Lý AI EduFlow',
      backExtra: `${item.ipa || ''} • (${item.pos || 'vocab'}) — ${item.meaningVi}`,
      tags: 'AI_Tutor EduFlow',
    });

    // Đồng bộ vào VocabularyVaultContext
    saveAiGeneratedWord({
      word: cleanWord,
      clozeText: (item.exampleSentence || cleanWord).replace(
        new RegExp(cleanWord.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i'),
        `{{c1::${cleanWord}::${item.meaningVi}}}`
      ),
      backExtra: `${item.ipa || ''} • (${item.pos || 'vocab'}) — ${item.meaningVi}`,
      tags: 'AI_Tutor EduFlow',
      contextSentence: item.exampleSentence,
      sourceArticleTitle: 'Trợ Lý AI EduFlow',
      ipa: item.ipa,
      pos: item.pos,
      contextMeaning: item.meaningVi,
    });

    setSavedWordsMap((prev) => ({ ...prev, [key]: true }));
    onNotify?.('Đã lưu vào bộ thẻ của bạn!', 'success');
  };

  // Hiển thị nội dung tin nhắn có định dạng in đậm (**text**) tự nhiên
  const renderFormattedContent = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, lineIdx) => {
      const parts = line.split(/(\*\*.*?\*\*)/g);
      return (
        <p
          key={lineIdx}
          className={`${line.trim() === '' ? 'h-2' : 'leading-relaxed mb-1 last:mb-0'}`}
        >
          {parts.map((part, partIdx) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return (
                <strong key={partIdx} className="font-bold text-[#064E3B]">
                  {part.slice(2, -2)}
                </strong>
              );
            }
            return <span key={partIdx}>{part}</span>;
          })}
        </p>
      );
    });
  };

  const currentTabInfo = MODE_TABS.find((t) => t.id === activeMode) || MODE_TABS[0];

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      <AnimatePresence mode="wait">
        {isOpen ? (
          /* CỬA SỔ KHUNG CHAT */
          <motion.div
            key="chat-window"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            data-lenis-prevent="true"
            className="w-[380px] max-w-[calc(100vw-32px)] h-[560px] max-h-[calc(100vh-48px)] rounded-2xl border border-stone-200 bg-white shadow-2xl flex flex-col overflow-hidden"
          >
            {/* 1. HEADER */}
            <div className="bg-[#064E3B] text-white px-4 py-3 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-white/10 border border-[#D97706]/50 flex items-center justify-center text-[#D97706]">
                  <Sparkles size={16} />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-sm tracking-wide text-white leading-tight">
                    Trợ Lý AI EduFlow
                  </h3>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[11px] text-emerald-100/90 font-medium">
                      Đang hoạt động
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={handleResetChat}
                  title="Làm mới đoạn chat"
                  className="p-2 rounded-lg text-emerald-100 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <RotateCcw size={15} />
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  title="Đóng"
                  className="p-2 rounded-lg text-emerald-100 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <X size={17} />
                </button>
              </div>
            </div>

            {/* 2. 4 TABS CHẾ ĐỘ CHUYÊN BIỆT */}
            <div className="bg-[#FAFAF9] border-b border-stone-200 px-2.5 py-2 shrink-0">
              <div className="grid grid-cols-2 gap-1.5">
                {MODE_TABS.map((tab) => {
                  const isActive = activeMode === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveMode(tab.id)}
                      className={`px-2.5 py-1.5 rounded-xl text-[11px] font-bold flex items-center gap-1.5 transition-all cursor-pointer truncate ${
                        isActive
                          ? 'bg-[#064E3B] text-amber-300 shadow-xs'
                          : 'bg-white text-stone-700 border border-stone-200/80 hover:bg-stone-100'
                      }`}
                    >
                      <span className="shrink-0">{tab.icon}</span>
                      <span className="truncate">{tab.label}</span>
                    </button>
                  );
                })}
              </div>
              <p className="text-[11px] text-stone-500 mt-1.5 px-1 leading-snug">
                {currentTabInfo.shortDesc}
              </p>
            </div>

            {/* 3. KHU VỰC TIN NHẮN & GỢI Ý NHANH */}
            <div className="flex-1 overflow-y-auto p-3.5 space-y-3 bg-[#FAFAF9]/60">
              {messages.length === 0 ? (
                <div className="h-full flex flex-col justify-between py-2">
                  <div className="bg-white border border-stone-200/90 rounded-2xl p-3.5 shadow-2xs">
                    <p className="text-xs font-bold text-[#064E3B] mb-1">
                      👋 Xin chào! Mình có thể giúp gì cho bạn hôm nay?
                    </p>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      Bạn có thể chọn chế độ ở trên, tự gõ câu hỏi hoặc bấm vào một trong các gợi ý nhanh bên dưới để bắt đầu ngay:
                    </p>
                  </div>

                  {/* 4 QUICK CHIPS */}
                  <div className="space-y-1.5 mt-3">
                    <p className="text-[11px] font-bold text-stone-500 uppercase tracking-wider px-1">
                      Gợi ý thử nhanh (1-Click):
                    </p>
                    <div className="flex flex-col gap-1.5">
                      {QUICK_CHIPS.map((chip, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => sendMessage(chip.text, chip.targetMode)}
                          className="text-left px-3 py-2 rounded-xl bg-white hover:bg-emerald-50/70 border border-stone-200 hover:border-[#064E3B]/40 text-xs font-medium text-stone-800 hover:text-[#064E3B] transition-all flex items-center justify-between group cursor-pointer shadow-2xs"
                        >
                          <span>{chip.text}</span>
                          <span className="text-[10px] text-[#D97706] font-bold opacity-70 group-hover:opacity-100">
                            Thử ngay →
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${
                        msg.role === 'user' ? 'items-end' : 'items-start'
                      }`}
                    >
                      <div
                        className={`max-w-[88%] rounded-2xl px-3.5 py-2.5 text-xs ${
                          msg.role === 'user'
                            ? 'bg-[#064E3B] text-white rounded-br-xs shadow-xs'
                            : 'bg-white text-stone-800 border border-stone-200/90 rounded-bl-xs shadow-2xs'
                        }`}
                      >
                        {msg.role === 'user' ? (
                          <p className="leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                        ) : (
                          <div className="space-y-1">{renderFormattedContent(msg.content)}</div>
                        )}
                      </div>

                      {/* DANH SÁCH TỪ VỰNG KÈM NÚT LƯU 1-CLICK VÀO ANKI */}
                      {msg.role === 'model' &&
                        msg.vocabItems &&
                        msg.vocabItems.length > 0 && (
                          <div className="mt-2 w-[92%] space-y-1.5">
                            {msg.vocabItems.map((vocab, vIdx) => {
                              const wordKey = vocab.word.toLowerCase().trim();
                              const alreadySaved =
                                savedWordsMap[wordKey] ||
                                isWordSavedInAnki(vocab.word) ||
                                isWordSaved(vocab.word);

                              return (
                                <div
                                  key={vIdx}
                                  className="p-2.5 rounded-xl bg-amber-50/70 border border-amber-200/90 text-xs space-y-1.5"
                                >
                                  <div className="flex items-center justify-between gap-2">
                                    <div className="flex items-center gap-1.5 min-w-0">
                                      <span className="font-bold text-[#064E3B] truncate">
                                        {vocab.word}
                                      </span>
                                      {vocab.ipa && (
                                        <span className="text-[11px] font-mono text-stone-500 shrink-0">
                                          {vocab.ipa}
                                        </span>
                                      )}
                                      <button
                                        type="button"
                                        onClick={() => speakEnglishText(vocab.word)}
                                        title="Nghe phát âm"
                                        className="p-1 rounded-md hover:bg-amber-200/60 text-stone-600 cursor-pointer shrink-0"
                                      >
                                        <Volume2 size={12} />
                                      </button>
                                    </div>
                                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white border border-amber-200 text-amber-900 shrink-0">
                                      {vocab.pos}
                                    </span>
                                  </div>

                                  <p className="text-[11px] text-stone-700 font-medium">
                                    Nghĩa: {vocab.meaningVi}
                                  </p>

                                  <button
                                    type="button"
                                    disabled={alreadySaved}
                                    onClick={() => handleSaveVocabToAnki(vocab)}
                                    className={`w-full py-1.5 px-2.5 rounded-lg text-[11px] font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                                      alreadySaved
                                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 cursor-default'
                                        : 'bg-[#064E3B] hover:bg-[#043327] text-amber-300 shadow-2xs'
                                    }`}
                                  >
                                    {alreadySaved ? (
                                      <>
                                        <Check size={12} />
                                        <span>Đã lưu vào bộ thẻ của bạn!</span>
                                      </>
                                    ) : (
                                      <>
                                        <Plus size={12} />
                                        <span>+ Lưu vào Flashcard Anki</span>
                                      </>
                                    )}
                                  </button>
                                </div>
                              );
                            })}
                          </div>
                        )}

                      <span className="text-[10px] text-stone-400 mt-1 px-1">
                        {msg.timestamp}
                      </span>
                    </div>
                  ))}

                  {isLoading && (
                    <div className="flex items-start">
                      <div className="bg-white border border-stone-200 rounded-2xl rounded-bl-xs px-3.5 py-2.5 text-xs text-stone-600 flex items-center gap-2 shadow-2xs">
                        <span className="w-2 h-2 rounded-full bg-[#064E3B] animate-bounce" />
                        <span
                          className="w-2 h-2 rounded-full bg-[#D97706] animate-bounce"
                          style={{ animationDelay: '0.15s' }}
                        />
                        <span
                          className="w-2 h-2 rounded-full bg-[#064E3B] animate-bounce"
                          style={{ animationDelay: '0.3s' }}
                        />
                        <span className="text-[11px] font-medium text-stone-500 ml-1">
                          Trợ lý đang trả lời...
                        </span>
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </>
              )}
            </div>

            {/* 4. THANH GỢI Ý NHỎ KHI ĐANG CHAT */}
            {messages.length > 0 && (
              <div className="px-3 py-1.5 bg-[#FAFAF9] border-t border-stone-200/70 flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0">
                {QUICK_CHIPS.map((chip, idx) => (
                  <button
                    key={idx}
                    type="button"
                    disabled={isLoading}
                    onClick={() => sendMessage(chip.text, chip.targetMode)}
                    className="px-2.5 py-1 rounded-full bg-white hover:bg-emerald-50 border border-stone-200 text-[11px] text-stone-700 hover:text-[#064E3B] whitespace-nowrap transition-colors cursor-pointer shrink-0"
                  >
                    {chip.text}
                  </button>
                ))}
              </div>
            )}

            {/* 5. Ô NHẬP TIN NHẮN & NÚT MIC */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage();
              }}
              className="p-2.5 bg-white border-t border-stone-200 flex items-center gap-1.5 shrink-0"
            >
              <button
                type="button"
                onClick={handleToggleMic}
                title={isRecording ? 'Dừng nói' : 'Bấm để nói tiếng Anh (Speaking)'}
                className={`p-2.5 rounded-xl border transition-all cursor-pointer shrink-0 ${
                  isRecording
                    ? 'bg-rose-600 text-white border-rose-600 animate-pulse'
                    : 'bg-stone-100 hover:bg-stone-200 text-stone-700 border-stone-200'
                }`}
              >
                {isRecording ? <MicOff size={15} /> : <Mic size={15} />}
              </button>

              <input
                ref={inputRef}
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={
                  isRecording ? 'Đang nghe bạn nói tiếng Anh...' : currentTabInfo.placeholder
                }
                className="flex-1 px-3 py-2 rounded-xl border border-stone-200 bg-[#FAFAF9] text-xs text-stone-900 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#D97706] transition-all"
              />

              <button
                type="submit"
                disabled={!inputText.trim() || isLoading}
                title="Gửi tin nhắn"
                className="p-2.5 rounded-xl bg-[#064E3B] hover:bg-[#043327] text-amber-300 disabled:opacity-40 transition-all cursor-pointer shrink-0"
              >
                <Send size={15} />
              </button>
            </form>
          </motion.div>
        ) : isInTimedExam ? (
          /* CHẾ ĐỘ THU NHỎ KHI ĐANG TRONG PHÒNG THI TÍNH GIỜ */
          <motion.button
            key="exam-minimized-dot"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            type="button"
            onClick={() => setIsOpen(true)}
            title="Mở Trợ lý AI EduFlow"
            className="w-9 h-9 bg-[#064E3B]/40 hover:bg-[#064E3B] text-white rounded-full shadow-md flex items-center justify-center transition-all cursor-pointer ring-1 ring-[#D97706]/30"
          >
            <MessageSquare size={15} />
          </motion.button>
        ) : (
          /* NÚT MỞ CHAT BONG BÓNG NỔI BÌNH THƯỜNG */
          <motion.button
            key="floating-button"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            type="button"
            onClick={() => setIsOpen(true)}
            title="Trợ Lý AI EduFlow"
            className="w-14 h-14 bg-[#064E3B] text-white rounded-full shadow-xl ring-2 ring-[#D97706]/40 flex items-center justify-center hover:scale-105 transition-all cursor-pointer group relative"
          >
            <MessageSquare size={24} className="text-amber-300 group-hover:scale-110 transition-transform" />
            <span className="absolute -top-1 -right-1 px-1.5 py-0.5 rounded-full bg-[#D97706] text-white text-[9px] font-extrabold tracking-tight shadow-xs">
              AI
            </span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};
