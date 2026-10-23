import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  RotateCcw,
  Send,
  Mic,
  MicOff,
  Bot,
  Plus,
  Check,
  Volume2,
  BookOpen,
} from 'lucide-react';
import { Screen } from '../../types';
import { useAnki } from '../../context/AnkiContext';
import { useVocabularyVault } from '../../context/VocabularyVaultContext';
import { useAuth } from '../../context/AuthContext';

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

const STARTER_PROMPTS = [
  '💡 Phân biệt FALSE và NOT GIVEN trong Reading',
  '✨ Nâng cấp câu: "Education is very important"',
  '📚 Cho 4 collocations hay về chủ đề Environment',
  '🎤 Gợi ý câu trả lời Speaking Part 1 chủ đề Hometown',
];

export const AiTutorFloatingChatbot: React.FC<AiTutorFloatingChatbotProps> = ({
  currentScreen: _currentScreen,
  onNotify,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [savedWordsMap, setSavedWordsMap] = useState<Record<string, boolean>>({});

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const recognitionRef = useRef<any>(null);

  // Context lưu thẻ vào Anki
  const { addCardToPersonalDeck } = useAnki();
  const { saveAiGeneratedWord } = useVocabularyVault();
  const { isAuthenticated, requireAuth } = useAuth();

  // Tự động cuộn xuống cuối khi có tin nhắn mới
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 250);
    }
  }, [isOpen, messages]);

  // Khởi tạo Web Speech API cho Voice Input (Nhận diện giọng nói)
  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          setInputText((prev) => (prev ? `${prev} ${transcript}` : transcript));
        }
        setIsRecording(false);
      };

      recognition.onerror = () => {
        setIsRecording(false);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognitionRef.current = recognition;
    }

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch {}
      }
    };
  }, []);

  // Gửi câu hỏi tới Backend /api/chat ("Hỏi gì đáp đó")
  const sendMessage = async (textToSend?: string) => {
    if (!isAuthenticated) {
      requireAuth('Trợ Lý Học Tập AI');
      return;
    }
    const cleanText = (textToSend !== undefined ? textToSend : inputText).trim();
    if (!cleanText || isLoading) return;

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
    } catch {
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

  // Bật / Tắt thu âm giọng nói
  const handleToggleMic = () => {
    if (isRecording) {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch {}
      }
      setIsRecording(false);
    } else {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.start();
          setIsRecording(true);
        } catch {
          setIsRecording(false);
          onNotify?.('Không thể mở micro. Bạn vui lòng cấp quyền micro cho trình duyệt nhé.', 'error');
        }
      } else {
        onNotify?.('Trình duyệt hiện tại chưa hỗ trợ nhận diện giọng nói Web Speech.', 'info');
      }
    }
  };

  // Phát âm từ vựng
  const handlePronounce = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utter = new SpeechSynthesisUtterance(text);
      utter.lang = 'en-GB';
      utter.rate = 0.95;
      window.speechSynthesis.speak(utter);
    }
  };

  // Lưu từ vựng 1-click vào Flashcard Anki
  const handleSaveToAnki = (item: ChatVocabItem) => {
    if (savedWordsMap[item.word]) {
      onNotify?.(`Từ "${item.word}" đã có trong bộ thẻ Anki rồi bạn nhé!`, 'info');
      return;
    }

    try {
      addCardToPersonalDeck({
        word: item.word,
        ipa: item.ipa,
        pos: item.pos,
        definitionVi: item.meaningVi,
        contextSentence: item.exampleSentence,
        source: 'Trợ Lý AI EduFlow',
      });

      saveAiGeneratedWord({
        word: item.word,
        clozeText: item.exampleSentence,
        backExtra: item.meaningVi,
        tags: 'AI-Tutor',
        contextSentence: item.exampleSentence,
        sourceArticleTitle: 'Trợ Lý AI EduFlow',
        ipa: item.ipa,
        pos: item.pos,
        contextMeaning: item.meaningVi,
      });

      setSavedWordsMap((prev) => ({ ...prev, [item.word]: true }));
      onNotify?.(`Đã lưu "${item.word}" vào Flashcard Anki thành công!`, 'success');
    } catch {
      onNotify?.('Không thể lưu thẻ vào Anki. Vui lòng thử lại sau.', 'error');
    }
  };

  // Định dạng hiển thị tin nhắn (hỗ trợ in đậm và gạch đầu dòng)
  const renderMessageContent = (text: string) => {
    const lines = text.split('\n');
    return (
      <div className="space-y-1 text-xs leading-relaxed font-sans">
        {lines.map((line, idx) => {
          if (!line.trim()) {
            return <div key={idx} className="h-1.5" />;
          }

          const parts = line.split(/(\*\*.*?\*\*)/g);

          return (
            <p key={idx} className={line.startsWith('•') || line.startsWith('-') ? 'pl-2' : ''}>
              {parts.map((part, pIdx) => {
                if (part.startsWith('**') && part.endsWith('**')) {
                  return (
                    <strong key={pIdx} className="font-bold text-[#064E3B]">
                      {part.slice(2, -2)}
                    </strong>
                  );
                }
                return <span key={pIdx}>{part}</span>;
              })}
            </p>
          );
        })}
      </div>
    );
  };

  return (
    <>
      {/* 1. NÚT BONG BÓNG CHAT NỔI (FLOATING BUTTON GÓC DƯỚI BÊN PHẢI) */}
      <div className="fixed bottom-6 right-6 z-40 select-none">
        <button
          type="button"
          onClick={() => {
            if (!isAuthenticated) {
              requireAuth('Trợ Lý Học Tập AI');
              return;
            }
            setIsOpen(!isOpen);
          }}
          className="group relative flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#064E3B] text-white shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 border-2 border-amber-400/50 transition-all duration-300 cursor-pointer"
          title="Mở Trợ Lý Học Tập AI"
        >
          <div className="relative">
            <Bot className="w-5 h-5 text-amber-300" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400" />
          </div>
          <span className="text-xs font-bold font-sans text-stone-100 hidden sm:inline">
            Hỏi Trợ Lý AI
          </span>
        </button>
      </div>

      {/* 2. CỬA SỔ HỘI THOẠI (CHAT WIDGET MODAL) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-20 right-4 sm:right-6 z-50 w-[92vw] sm:w-[420px] h-[560px] max-h-[82vh] rounded-3xl bg-white border border-stone-200/90 shadow-2xl flex flex-col overflow-hidden text-stone-800"
          >
            {/* Header */}
            <div className="bg-[#064E3B] px-4 py-3.5 flex items-center justify-between text-white shrink-0 border-b border-emerald-900/60">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#022C22] text-amber-300 border border-amber-400/40 flex items-center justify-center shadow-xs">
                  <Bot size={16} />
                </div>
                <div>
                  <h3 className="text-sm font-bold font-serif tracking-tight text-white flex items-center gap-1.5">
                    Trợ Lý Học Tập AI
                  </h3>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[10px] text-emerald-200/90 font-sans">
                      Chuyên sâu Tiếng Anh &amp; IELTS
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1">
                {messages.length > 0 && (
                  <button
                    type="button"
                    onClick={handleResetChat}
                    className="p-1.5 rounded-lg text-emerald-200 hover:text-white hover:bg-emerald-900/60 transition-colors cursor-pointer"
                    title="Làm mới cuộc trò chuyện"
                  >
                    <RotateCcw size={15} />
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg text-emerald-200 hover:text-white hover:bg-emerald-900/60 transition-colors cursor-pointer"
                  title="Đóng cửa sổ chat"
                >
                  <X size={17} />
                </button>
              </div>
            </div>

            {/* Khu vực tin nhắn */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#FAFAF9]/70">
              {messages.length === 0 ? (
                <div className="h-full flex flex-col justify-between py-2">
                  <div className="bg-white border border-stone-200/90 rounded-2xl p-4 shadow-2xs space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-[#064E3B]">
                      <Bot size={15} className="text-amber-600" />
                      <span>Gia sư AI luôn sẵn sàng hỗ trợ bạn</span>
                    </div>
                    <p className="text-xs text-stone-600 leading-relaxed font-sans">
                      Bạn có thể hỏi bất kỳ câu hỏi nào về từ vựng, ngữ pháp, mẹo giải đề thi Cambridge IELTS hoặc gửi câu tiếng Anh để mình nâng cấp lên Band cao hơn nhé!
                    </p>
                  </div>

                  {/* Starter Prompts */}
                  <div className="space-y-1.5 mt-4">
                    <p className="text-[11px] font-bold text-stone-500 uppercase tracking-wider px-1 font-mono">
                      Gợi ý câu hỏi thường gặp:
                    </p>
                    <div className="flex flex-col gap-1.5">
                      {STARTER_PROMPTS.map((promptText, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => sendMessage(promptText.replace(/^[^\s]+\s/, ''))}
                          className="text-left px-3.5 py-2.5 rounded-xl bg-white hover:bg-emerald-50/70 border border-stone-200 hover:border-[#064E3B]/40 text-xs font-medium text-stone-800 hover:text-[#064E3B] transition-all flex items-center justify-between group cursor-pointer shadow-2xs"
                        >
                          <span>{promptText}</span>
                          <span className="text-[10px] text-[#D97706] font-bold opacity-70 group-hover:opacity-100 shrink-0 ml-2">
                            Hỏi ngay →
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
                          <div className="space-y-2">
                            {renderMessageContent(msg.content)}

                            {/* Danh sách từ vựng gợi ý lưu vào Anki (nếu có) */}
                            {msg.vocabItems && msg.vocabItems.length > 0 && (
                              <div className="mt-3 pt-2.5 border-t border-stone-200 space-y-2">
                                <div className="text-[11px] font-bold text-[#064E3B] flex items-center gap-1 font-sans">
                                  <BookOpen size={13} className="text-amber-600" />
                                  <span>Từ vựng hữu ích vừa nhắc tới:</span>
                                </div>
                                <div className="space-y-1.5">
                                  {msg.vocabItems.map((vocab, vIdx) => {
                                    const isSaved = !!savedWordsMap[vocab.word];
                                    return (
                                      <div
                                        key={vIdx}
                                        className="p-2 rounded-xl bg-stone-50 border border-stone-200/80 flex items-center justify-between gap-2"
                                      >
                                        <div className="min-w-0">
                                          <div className="flex items-center gap-1.5 flex-wrap">
                                            <span className="font-bold text-stone-900 font-sans">
                                              {vocab.word}
                                            </span>
                                            <span className="text-[10px] text-stone-500 font-mono">
                                              {vocab.ipa}
                                            </span>
                                            <button
                                              type="button"
                                              onClick={() => handlePronounce(vocab.word)}
                                              className="p-0.5 rounded text-amber-700 hover:text-amber-900 hover:bg-amber-100/60"
                                              title="Nghe phát âm UK"
                                            >
                                              <Volume2 size={12} />
                                            </button>
                                          </div>
                                          <div className="text-[11px] text-stone-600 truncate font-sans">
                                            {vocab.meaningVi}
                                          </div>
                                        </div>

                                        <button
                                          type="button"
                                          onClick={() => handleSaveToAnki(vocab)}
                                          disabled={isSaved}
                                          className={`shrink-0 px-2.5 py-1 rounded-lg text-[10px] font-bold flex items-center gap-1 transition-colors cursor-pointer ${
                                            isSaved
                                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                                              : 'bg-[#064E3B] hover:bg-[#032B20] text-amber-300 shadow-2xs'
                                          }`}
                                        >
                                          {isSaved ? (
                                            <>
                                              <Check size={11} />
                                              Đã lưu
                                            </>
                                          ) : (
                                            <>
                                              <Plus size={11} />
                                              Lưu Anki
                                            </>
                                          )}
                                        </button>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                      <span className="text-[9px] text-stone-400 mt-1 px-1 font-mono">
                        {msg.timestamp}
                      </span>
                    </div>
                  ))}

                  {/* Trạng thái AI đang suy nghĩ */}
                  {isLoading && (
                    <div className="flex items-center gap-2 text-xs text-stone-500 bg-white border border-stone-200/80 rounded-2xl px-3.5 py-2 w-fit shadow-2xs">
                      <Bot size={13} className="text-amber-600" />
                      <span className="font-sans">Trợ lý AI đang suy nghĩ câu trả lời...</span>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </>
              )}
            </div>

            {/* Khung nhập câu hỏi (Input Bar) */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage();
              }}
              className="p-3 bg-white border-t border-stone-200 shrink-0 space-y-1.5"
            >
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Hỏi về từ vựng, ngữ pháp, mẹo thi IELTS..."
                    disabled={isLoading}
                    className="w-full pl-3.5 pr-10 py-2.5 rounded-xl border border-stone-200 text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#064E3B] bg-stone-50/60 font-sans"
                  />

                  {/* Nút thu âm giọng nói */}
                  <button
                    type="button"
                    onClick={handleToggleMic}
                    className={`absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-lg transition-colors cursor-pointer ${
                      isRecording
                        ? 'bg-rose-500 text-white animate-pulse'
                        : 'text-stone-400 hover:text-[#064E3B] hover:bg-stone-100'
                    }`}
                    title={isRecording ? 'Đang nghe... Bấm để dừng' : 'Bấm để nói bằng giọng nói'}
                  >
                    {isRecording ? <MicOff size={14} /> : <Mic size={14} />}
                  </button>
                </div>

                {/* Nút gửi */}
                <button
                  type="submit"
                  disabled={!inputText.trim() || isLoading}
                  className={`p-2.5 rounded-xl transition-all cursor-pointer ${
                    !inputText.trim() || isLoading
                      ? 'bg-stone-100 text-stone-400 cursor-not-allowed'
                      : 'bg-[#064E3B] hover:bg-[#032B20] text-amber-300 shadow-sm active:scale-95'
                  }`}
                  title="Gửi câu hỏi"
                >
                  <Send size={15} />
                </button>
              </div>

              <div className="flex items-center justify-between px-1">
                <span className="text-[10px] text-stone-400 font-sans">
                  Chuyên môn: Tiếng Anh &amp; Luyện thi Cambridge IELTS
                </span>
                {isRecording && (
                  <span className="text-[10px] text-rose-600 font-semibold flex items-center gap-1 font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
                    Đang nghe giọng nói của bạn...
                  </span>
                )}
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
