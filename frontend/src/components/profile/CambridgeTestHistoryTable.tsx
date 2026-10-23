import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  Headphones,
  RotateCcw,
  PlayCircle,
  ChevronDown,
  Layers,
  Laptop,
  FileText,
  Sparkles as _Sparkles,
} from 'lucide-react';
import {
  getTestHistory,
  getAttemptForTest,
  fetchUserTestHistoryFromServer,
  TestAttempt,
} from '../../services/testHistoryStorage';
import { Screen, User } from '../../types';

export interface CambridgeTestHistoryTableProps {
  currentUser?: User | null;
  onNavigateScreen?: (screen: Screen) => void;
  onStartReadingTest?: (book: string, testNumber: 1 | 2 | 3 | 4, mode?: 'full' | 'single') => void;
  onStartListeningTest?: (book: string, testNumber: 1 | 2 | 3 | 4, mode?: 'exam' | 'practice') => void;
}

export const CambridgeTestHistoryTable: React.FC<CambridgeTestHistoryTableProps> = ({
  currentUser,
  onNavigateScreen,
  onStartReadingTest,
  onStartListeningTest,
}) => {
  const books = [
    'Cambridge 20',
    'Cambridge 19',
    'Cambridge 18',
    'Cambridge 17',
    'Cambridge 16',
    'Cambridge 15',
    'Cambridge 14',
    'Cambridge 13',
  ];

  const currentUserId = currentUser?.id ? String(currentUser.id) : undefined;
  const [selectedBook, setSelectedBook] = useState<string>('Cambridge 18');
  const [history, setHistory] = useState<TestAttempt[]>(() => getTestHistory(currentUserId));
  const [activeDropdown, setActiveDropdown] = useState<{
    testNum: 1 | 2 | 3 | 4;
    skill: 'reading' | 'listening';
  } | null>(null);

  // Đồng bộ lịch sử riêng của tài khoản hiện tại từ database
  useEffect(() => {
    setHistory(getTestHistory(currentUserId));
    if (currentUserId) {
      fetchUserTestHistoryFromServer(currentUserId).then((serverData) => {
        if (serverData) setHistory(serverData);
      });
    }
  }, [currentUserId]);

  useEffect(() => {
    const handleUpdate = (e: any) => {
      const eventUserId = e?.detail?.userId;
      if (!eventUserId || eventUserId === currentUserId) {
        setHistory(getTestHistory(currentUserId));
      }
    };
    window.addEventListener('cambridge-history-updated', handleUpdate);
    return () => window.removeEventListener('cambridge-history-updated', handleUpdate);
  }, [currentUserId]);

  // Đóng dropdown khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.cambridge-dropdown-area')) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const tests: (1 | 2 | 3 | 4)[] = [1, 2, 3, 4];

  const handleAction = (
    skill: 'reading' | 'listening',
    testNum: 1 | 2 | 3 | 4,
    mode?: 'full' | 'single' | 'exam' | 'practice'
  ) => {
    setActiveDropdown(null);
    if (skill === 'reading') {
      if (onStartReadingTest) {
        onStartReadingTest(selectedBook, testNum, (mode as 'full' | 'single') || 'full');
      } else if (onNavigateScreen) {
        onNavigateScreen('reading');
      }
    } else {
      if (onStartListeningTest) {
        onStartListeningTest(selectedBook, testNum, (mode as 'exam' | 'practice') || 'exam');
      } else if (onNavigateScreen) {
        onNavigateScreen('listening');
      }
    }
  };

  const toggleDropdown = (testNum: 1 | 2 | 3 | 4, skill: 'reading' | 'listening', e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeDropdown?.testNum === testNum && activeDropdown?.skill === skill) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown({ testNum, skill });
    }
  };

  // Tính số bài đã làm trong cuốn sách này (tối đa 4 reading + 4 listening = 8)
  const bookAttempts = history.filter(
    (h) => h.book.toLowerCase() === selectedBook.toLowerCase()
  );

  return (
    <div className="space-y-6">
      {/* Book Tabs Selector */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="text-xs font-bold text-stone-700 uppercase tracking-normal flex items-center gap-2">
            <Layers size={14} className="text-[#064E3B]" />
            <span>Chọn Bộ Đề Cambridge</span>
          </div>
          <span className="text-[11px] font-mono text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 font-semibold">
            Tiến độ: {bookAttempts.length}/8 bài hoàn thành
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {books.map((b) => {
            const isSelected = selectedBook.toLowerCase() === b.toLowerCase();
            const countInBook = history.filter(
              (h) => h.book.toLowerCase() === b.toLowerCase()
            ).length;

            return (
              <button
                key={b}
                onClick={() => {
                  setSelectedBook(b);
                  setActiveDropdown(null);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-[#064E3B] text-amber-300 border border-emerald-800 shadow-sm'
                    : 'bg-white text-stone-700 hover:bg-stone-50 border border-stone-200'
                }`}
              >
                <span>{b}</span>
                {countInBook > 0 && (
                  <span
                    className={`w-4 h-4 rounded-full text-[10px] font-mono font-bold flex items-center justify-center ${
                      isSelected
                        ? 'bg-amber-400 text-stone-950'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    {countInBook}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Cambridge 4-Test Matrix Table (Matching User Screenshot) */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-visible">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="bg-[#F8F9FA] border-b border-stone-200 text-stone-800 text-xs font-bold uppercase tracking-wider">
                <th className="py-4 px-6 sm:px-8 w-1/4 text-stone-900 font-sans">
                  BÀI TEST
                </th>
                <th className="py-4 px-6 sm:px-8 w-3/8 text-center text-stone-900 font-sans">
                  READING
                </th>
                <th className="py-4 px-6 sm:px-8 w-3/8 text-center text-stone-900 font-sans">
                  LISTENING
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200/80">
              {tests.map((testNum) => {
                const readingAttempt = getAttemptForTest(
                  history,
                  selectedBook,
                  testNum,
                  'reading'
                );
                const listeningAttempt = getAttemptForTest(
                  history,
                  selectedBook,
                  testNum,
                  'listening'
                );

                const isReadingDropdownOpen =
                  activeDropdown?.testNum === testNum && activeDropdown?.skill === 'reading';
                const isListeningDropdownOpen =
                  activeDropdown?.testNum === testNum && activeDropdown?.skill === 'listening';

                return (
                  <tr
                    key={testNum}
                    className="hover:bg-stone-50/50 transition-colors"
                  >
                    {/* Test Label */}
                    <td className="py-6 px-6 sm:px-8 font-sans font-bold text-stone-800 text-sm align-middle">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-600/70" />
                        <span>Test {testNum}</span>
                      </div>
                    </td>

                    {/* READING CELL */}
                    <td className="py-6 px-6 sm:px-8 text-center align-middle">
                      <div className="flex flex-col items-center justify-center">
                        {readingAttempt ? (
                          <>
                            {/* Completed: Green Ring with Book & Band Score */}
                            <div className="w-14 h-14 rounded-full border-2 border-emerald-600 bg-white shadow-2xs flex flex-col items-center justify-center gap-0.5">
                              <BookOpen
                                size={14}
                                className="text-emerald-700"
                              />
                              <span className="text-sm sm:text-base font-bold font-mono text-emerald-700 leading-none">
                                {readingAttempt.bandScore.toFixed(1)}
                              </span>
                            </div>

                            {/* Re-take Button with Dropdown Trigger */}
                            <div className="cambridge-dropdown-area relative inline-block mt-2.5">
                              <div className="inline-flex items-center rounded-full border border-stone-200 bg-white hover:bg-emerald-50 hover:border-emerald-700 text-xs font-semibold text-stone-700 transition-colors shadow-2xs overflow-hidden">
                                <button
                                  type="button"
                                  onClick={() => handleAction('reading', testNum, 'full')}
                                  className="inline-flex items-center gap-1.5 pl-3.5 pr-2 py-1.5 cursor-pointer hover:text-emerald-800 transition-colors"
                                  title="Làm lại bài thi Reading này"
                                >
                                  <RotateCcw
                                    size={12}
                                    className="text-stone-500"
                                  />
                                  <span>Làm lại</span>
                                </button>
                                <button
                                  type="button"
                                  onClick={(e) => toggleDropdown(testNum, 'reading', e)}
                                  className="px-2 py-1.5 hover:bg-stone-100/80 cursor-pointer text-stone-400 hover:text-stone-700 border-l border-stone-200/80 transition-colors"
                                  title="Tùy chọn chế độ làm bài"
                                >
                                  <ChevronDown size={12} />
                                </button>
                              </div>

                              {/* Dropdown Menu */}
                              {isReadingDropdownOpen && (
                                <div className="absolute z-30 left-1/2 -translate-x-1/2 mt-1.5 w-56 bg-white rounded-xl shadow-xl border border-stone-200 py-1.5 text-left text-xs animate-in fade-in zoom-in-95 duration-100">
                                  <button
                                    type="button"
                                    onClick={() => handleAction('reading', testNum, 'full')}
                                    className="w-full px-3.5 py-2.5 hover:bg-emerald-50 text-stone-800 hover:text-emerald-950 flex items-center gap-2.5 cursor-pointer transition-colors"
                                  >
                                    <Laptop size={14} className="text-emerald-700 shrink-0" />
                                    <div>
                                      <div className="font-bold">Làm Full Test (60 phút)</div>
                                      <div className="text-[10px] text-stone-400">Thi máy tính CD-IELTS tính Band</div>
                                    </div>
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleAction('reading', testNum, 'single')}
                                    className="w-full px-3.5 py-2.5 hover:bg-emerald-50 text-stone-800 hover:text-emerald-950 flex items-center gap-2.5 cursor-pointer transition-colors border-t border-stone-100"
                                  >
                                    <FileText size={14} className="text-amber-600 shrink-0" />
                                    <div>
                                      <div className="font-bold">Luyện từng Passage</div>
                                      <div className="text-[10px] text-stone-400">Đọc &amp; tra cứu từ vựng Anki</div>
                                    </div>
                                  </button>
                                </div>
                              )}
                            </div>

                            <span className="text-[10px] text-stone-400 font-mono mt-1">
                              {readingAttempt.correctCount}/
                              {readingAttempt.totalQuestions} câu •{' '}
                              {readingAttempt.completedAt}
                            </span>
                          </>
                        ) : (
                          <>
                            {/* Incomplete: Grey Ring */}
                            <div className="w-14 h-14 rounded-full border-2 border-stone-200 bg-stone-50/60 flex items-center justify-center text-stone-400">
                              <BookOpen size={20} className="text-stone-400" />
                            </div>

                            {/* Start Test Button with Dropdown Trigger */}
                            <div className="cambridge-dropdown-area relative inline-block mt-2.5">
                              <div className="inline-flex items-center rounded-full border border-stone-200 bg-white hover:bg-emerald-50 hover:border-emerald-700 hover:text-emerald-800 text-xs font-semibold text-stone-700 transition-colors shadow-2xs overflow-hidden">
                                <button
                                  type="button"
                                  onClick={() => handleAction('reading', testNum, 'full')}
                                  className="inline-flex items-center gap-1.5 pl-3.5 pr-2 py-1.5 cursor-pointer hover:text-emerald-800 transition-colors"
                                  title="Bắt đầu làm bài thi Reading"
                                >
                                  <PlayCircle
                                    size={13}
                                    className="text-rose-600"
                                  />
                                  <span>Làm bài</span>
                                </button>
                                <button
                                  type="button"
                                  onClick={(e) => toggleDropdown(testNum, 'reading', e)}
                                  className="px-2 py-1.5 hover:bg-stone-100/80 cursor-pointer text-stone-400 hover:text-stone-700 border-l border-stone-200/80 transition-colors"
                                  title="Tùy chọn chế độ làm bài"
                                >
                                  <ChevronDown size={12} />
                                </button>
                              </div>

                              {/* Dropdown Menu */}
                              {isReadingDropdownOpen && (
                                <div className="absolute z-30 left-1/2 -translate-x-1/2 mt-1.5 w-56 bg-white rounded-xl shadow-xl border border-stone-200 py-1.5 text-left text-xs animate-in fade-in zoom-in-95 duration-100">
                                  <button
                                    type="button"
                                    onClick={() => handleAction('reading', testNum, 'full')}
                                    className="w-full px-3.5 py-2.5 hover:bg-emerald-50 text-stone-800 hover:text-emerald-950 flex items-center gap-2.5 cursor-pointer transition-colors"
                                  >
                                    <Laptop size={14} className="text-emerald-700 shrink-0" />
                                    <div>
                                      <div className="font-bold">Làm Full Test (60 phút)</div>
                                      <div className="text-[10px] text-stone-400">Thi máy tính CD-IELTS tính Band</div>
                                    </div>
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleAction('reading', testNum, 'single')}
                                    className="w-full px-3.5 py-2.5 hover:bg-emerald-50 text-stone-800 hover:text-emerald-950 flex items-center gap-2.5 cursor-pointer transition-colors border-t border-stone-100"
                                  >
                                    <FileText size={14} className="text-amber-600 shrink-0" />
                                    <div>
                                      <div className="font-bold">Luyện từng Passage</div>
                                      <div className="text-[10px] text-stone-400">Đọc &amp; tra cứu từ vựng Anki</div>
                                    </div>
                                  </button>
                                </div>
                              )}
                            </div>

                            <span className="text-[10px] text-stone-400 font-mono mt-1">
                              Chưa làm
                            </span>
                          </>
                        )}
                      </div>
                    </td>

                    {/* LISTENING CELL */}
                    <td className="py-6 px-6 sm:px-8 text-center align-middle">
                      <div className="flex flex-col items-center justify-center">
                        {listeningAttempt ? (
                          <>
                            {/* Completed: Green Ring with Headphones & Band Score */}
                            <div className="w-14 h-14 rounded-full border-2 border-emerald-600 bg-white shadow-2xs flex flex-col items-center justify-center gap-0.5">
                              <Headphones
                                size={14}
                                className="text-emerald-700"
                              />
                              <span className="text-sm sm:text-base font-bold font-mono text-emerald-700 leading-none">
                                {listeningAttempt.bandScore.toFixed(1)}
                              </span>
                            </div>

                            {/* Re-take Button with Dropdown Trigger */}
                            <div className="cambridge-dropdown-area relative inline-block mt-2.5">
                              <div className="inline-flex items-center rounded-full border border-stone-200 bg-white hover:bg-emerald-50 hover:border-emerald-700 text-xs font-semibold text-stone-700 transition-colors shadow-2xs overflow-hidden">
                                <button
                                  type="button"
                                  onClick={() => handleAction('listening', testNum, 'exam')}
                                  className="inline-flex items-center gap-1.5 pl-3.5 pr-2 py-1.5 cursor-pointer hover:text-emerald-800 transition-colors"
                                  title="Làm lại bài thi Listening này"
                                >
                                  <RotateCcw
                                    size={12}
                                    className="text-stone-500"
                                  />
                                  <span>Làm lại</span>
                                </button>
                                <button
                                  type="button"
                                  onClick={(e) => toggleDropdown(testNum, 'listening', e)}
                                  className="px-2 py-1.5 hover:bg-stone-100/80 cursor-pointer text-stone-400 hover:text-stone-700 border-l border-stone-200/80 transition-colors"
                                  title="Tùy chọn chế độ làm bài"
                                >
                                  <ChevronDown size={12} />
                                </button>
                              </div>

                              {/* Dropdown Menu */}
                              {isListeningDropdownOpen && (
                                <div className="absolute z-30 left-1/2 -translate-x-1/2 mt-1.5 w-56 bg-white rounded-xl shadow-xl border border-stone-200 py-1.5 text-left text-xs animate-in fade-in zoom-in-95 duration-100">
                                  <button
                                    type="button"
                                    onClick={() => handleAction('listening', testNum, 'exam')}
                                    className="w-full px-3.5 py-2.5 hover:bg-emerald-50 text-stone-800 hover:text-emerald-950 flex items-center gap-2.5 cursor-pointer transition-colors"
                                  >
                                    <Headphones size={14} className="text-emerald-700 shrink-0" />
                                    <div>
                                      <div className="font-bold">Làm Full Test (30 phút)</div>
                                      <div className="text-[10px] text-stone-400">4 Sections chuẩn thi Cambridge</div>
                                    </div>
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleAction('listening', testNum, 'practice')}
                                    className="w-full px-3.5 py-2.5 hover:bg-emerald-50 text-stone-800 hover:text-emerald-950 flex items-center gap-2.5 cursor-pointer transition-colors border-t border-stone-100"
                                  >
                                    <FileText size={14} className="text-amber-600 shrink-0" />
                                    <div>
                                      <div className="font-bold">Luyện Chép Chính Tả</div>
                                      <div className="text-[10px] text-stone-400">Dictation phòng nghe &amp; gõ</div>
                                    </div>
                                  </button>
                                </div>
                              )}
                            </div>

                            <span className="text-[10px] text-stone-400 font-mono mt-1">
                              {listeningAttempt.correctCount}/
                              {listeningAttempt.totalQuestions} câu •{' '}
                              {listeningAttempt.completedAt}
                            </span>
                          </>
                        ) : (
                          <>
                            {/* Incomplete: Grey Ring */}
                            <div className="w-14 h-14 rounded-full border-2 border-stone-200 bg-stone-50/60 flex items-center justify-center text-stone-400">
                              <Headphones
                                size={20}
                                className="text-stone-400"
                              />
                            </div>

                            {/* Start Test Button with Dropdown Trigger */}
                            <div className="cambridge-dropdown-area relative inline-block mt-2.5">
                              <div className="inline-flex items-center rounded-full border border-stone-200 bg-white hover:bg-emerald-50 hover:border-emerald-700 hover:text-emerald-800 text-xs font-semibold text-stone-700 transition-colors shadow-2xs overflow-hidden">
                                <button
                                  type="button"
                                  onClick={() => handleAction('listening', testNum, 'exam')}
                                  className="inline-flex items-center gap-1.5 pl-3.5 pr-2 py-1.5 cursor-pointer hover:text-emerald-800 transition-colors"
                                  title="Bắt đầu làm bài thi Listening"
                                >
                                  <PlayCircle
                                    size={13}
                                    className="text-rose-600"
                                  />
                                  <span>Làm bài</span>
                                </button>
                                <button
                                  type="button"
                                  onClick={(e) => toggleDropdown(testNum, 'listening', e)}
                                  className="px-2 py-1.5 hover:bg-stone-100/80 cursor-pointer text-stone-400 hover:text-stone-700 border-l border-stone-200/80 transition-colors"
                                  title="Tùy chọn chế độ làm bài"
                                >
                                  <ChevronDown size={12} />
                                </button>
                              </div>

                              {/* Dropdown Menu */}
                              {isListeningDropdownOpen && (
                                <div className="absolute z-30 left-1/2 -translate-x-1/2 mt-1.5 w-56 bg-white rounded-xl shadow-xl border border-stone-200 py-1.5 text-left text-xs animate-in fade-in zoom-in-95 duration-100">
                                  <button
                                    type="button"
                                    onClick={() => handleAction('listening', testNum, 'exam')}
                                    className="w-full px-3.5 py-2.5 hover:bg-emerald-50 text-stone-800 hover:text-emerald-950 flex items-center gap-2.5 cursor-pointer transition-colors"
                                  >
                                    <Headphones size={14} className="text-emerald-700 shrink-0" />
                                    <div>
                                      <div className="font-bold">Làm Full Test (30 phút)</div>
                                      <div className="text-[10px] text-stone-400">4 Sections chuẩn thi Cambridge</div>
                                    </div>
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleAction('listening', testNum, 'practice')}
                                    className="w-full px-3.5 py-2.5 hover:bg-emerald-50 text-stone-800 hover:text-emerald-950 flex items-center gap-2.5 cursor-pointer transition-colors border-t border-stone-100"
                                  >
                                    <FileText size={14} className="text-amber-600 shrink-0" />
                                    <div>
                                      <div className="font-bold">Luyện Chép Chính Tả</div>
                                      <div className="text-[10px] text-stone-400">Dictation phòng nghe &amp; gõ</div>
                                    </div>
                                  </button>
                                </div>
                              )}
                            </div>

                            <span className="text-[10px] text-stone-400 font-mono mt-1">
                              Chưa làm
                            </span>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
