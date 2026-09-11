import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Screen, Course, User, ToastMessage, ReadingSessionConfig, ListeningExamResult } from './types';
import { sampleCourses, initialUserStats } from './data/mockData';
import { Navbar } from './components/common/Navbar';
import { ToastContainer } from './components/common/ToastContainer';
import { AcademicAuthModal } from './components/auth/AcademicAuthModal';
import { CertificateModal } from './components/common/CertificateModal';
import { Profile } from './components/profile/Profile';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { ReadingLibrary, CambridgeTestGroup } from './modules/reading/ReadingLibrary';
import { ReadingTestRoom } from './modules/reading/ReadingTestRoom';
import { IELTSComputerExamRoom } from './modules/exam/IELTSComputerExamRoom';
import { MistakeVaultView } from './modules/mistakes/MistakeVaultView';
import { mockReadingPassages } from './data/cambridgeMockData';
import { mockListeningFullTests } from './data/mockListeningTests';
import { ListeningLibrary } from './modules/listening/ListeningLibrary';
import { ListeningDictationRoom } from './modules/listening/ListeningDictationRoom';
import { IELTSListeningExamRoom } from './modules/listening-exam/IELTSListeningExamRoom';
import { ListeningReviewRoom } from './modules/listening-exam/ListeningReviewRoom';
import { AnkiWorkspace } from './modules/anki/AnkiWorkspace';
import { AnkiFlashcardPlayer } from './modules/anki/AnkiFlashcardPlayer';
import { WritingTask1Studio } from './modules/writing/WritingTask1Studio';
import { SpeakingMockRoom } from './modules/speaking/SpeakingMockRoom';
import { AcademicLandingPage } from './components/marketing/AcademicLandingPage';
import { englishApi } from './services/englishApi';
import { AuthProvider, useAuth } from './context/AuthContext';
import { VocabularyVaultProvider } from './context/VocabularyVaultContext';
import { AnkiProvider } from './context/AnkiContext';
import { SmoothScrollProvider } from './context/SmoothScrollProvider';

// Error Boundary to prevent white screen crashes
interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('EduFlow ErrorBoundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="max-w-2xl mx-auto my-12 p-6 bg-red-50 border border-red-200 rounded-3xl text-red-900 shadow-sm">
          <h2 className="text-lg font-bold text-red-700 mb-2">
            Đã xảy ra sự cố khi tải phân hệ học tập
          </h2>
          <p className="text-xs text-red-600 mb-4">
            Vui lòng nhấn nút thử lại bên dưới hoặc quay lại trang chủ.
          </p>
          <pre className="text-xs bg-white p-4 rounded-xl border border-red-200 overflow-x-auto text-red-800 font-mono mb-4">
            {this.state.error?.message}
          </pre>
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                this.setState({ hasError: false, error: null });
                window.location.reload();
              }}
              className="px-4 py-2 bg-forest-950 hover:bg-forest-900 text-gold-300 rounded-xl text-xs font-bold transition-colors cursor-pointer"
            >
              Tải lại trang web
            </button>
            <button
              onClick={() => this.setState({ hasError: false, error: null })}
              className="px-4 py-2 bg-white border border-stone-300 text-stone-700 hover:bg-stone-50 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
            >
              Thử lại ngay
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

const AppContent: React.FC = () => {
  const {
    user,
    isAuthenticated,
    login,
    logout,
    requireAuth,
    openAuthModal,
    closeAuthModal,
    authModalConfig,
    setNotifyHandler,
  } = useAuth();

  // Navigation Screen State: Guests land on 'landing', authenticated students go to 'reading'
  const [currentScreen, setCurrentScreen] = useState<Screen>(() => {
    const saved = localStorage.getItem('eduflow_current_user');
    return saved ? 'reading' : 'landing';
  });

  // Active Cambridge Reading Passage ID & Session Config (Single Passage vs Full Test)
  const [selectedPassageId, setSelectedPassageId] = useState<string>('cambridge-18-test-2-p2');
  const [readingSession, setReadingSession] = useState<ReadingSessionConfig>({
    mode: 'single',
    passageId: 'cambridge-18-test-2-p2',
    testTitle: 'Cambridge 18 Test 2',
  });
  const [selectedComputerExamGroup, setSelectedComputerExamGroup] = useState<CambridgeTestGroup | null>(null);

  // Active Cambridge Listening Test ID
  const [selectedListeningTestId, setSelectedListeningTestId] = useState<string>('cambridge-18-listening-p4');
  const [selectedListeningFullTestId, setSelectedListeningFullTestId] = useState<string>('cam18-test1-listening');
  const [listeningExamResult, setListeningExamResult] = useState<ListeningExamResult | null>(null);

  // Active Anki Deck ID and Study mode
  const [selectedAnkiDeckId, setSelectedAnkiDeckId] = useState<string | null>(null);
  const [isStudyingAnki, setIsStudyingAnki] = useState<boolean>(false);

  // Courses list
  const [courses, setCourses] = useState<Course[]>(sampleCourses);

  // Certificate Modal State
  const [showCertModal, setShowCertModal] = useState<boolean>(false);
  const [certCourseTitle, setCertCourseTitle] = useState<string>(sampleCourses[0].title);

  // User Learning Stats
  const [stats, setStats] = useState(initialUserStats);

  // Global Toast Notifications
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3800);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Register toast notifier with AuthContext
  useEffect(() => {
    setNotifyHandler(addToast);
  }, [setNotifyHandler]);

  const handleEarnXp = (_amount: number, reason: string) => {
    setStats((prev) => ({
      ...prev,
      hoursLearned: Math.round((prev.hoursLearned + 0.15) * 10) / 10,
    }));
    const cleanMsg = reason.replace(/\s*\(\+?\d+\s*XP\)/gi, '').replace(/\+?\d+\s*XP/gi, '').trim();
    if (cleanMsg) {
      addToast(cleanMsg, 'success');
    }
  };

  // Sync user learning stats from MySQL Database
  useEffect(() => {
    if (!user) return;

    let isMounted = true;
    const userId = 3; // Minh Chiến Đặng
    englishApi
      .getUserStats(userId)
      .then((dbStats) => {
        if (isMounted && dbStats) {
          if (dbStats.streak_days) {
            setStats((prev) => ({
              ...prev,
              streakDays: dbStats.streak_days,
            }));
          }
        }
      })
      .catch((err) => console.warn('Could not sync user stats from MySQL:', err));

    return () => {
      isMounted = false;
    };
  }, [user]);

  // Protected screens requiring authentication
  const protectedScreens: Screen[] = [
    'reading',
    'reading-test',
    'computer-exam',
    'mistake-vault',
    'listening',
    'listening-test',
    'anki',
    'profile',
    'admin',
  ];

  // Auth Guard Navigation Handler
  const handleScreenNavigate = (screen: Screen) => {
    if (screen === 'landing') {
      setCurrentScreen('landing');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // Intercept if guest attempts to access protected screens
    if (!isAuthenticated && protectedScreens.includes(screen)) {
      requireAuth(
        screen === 'reading' || screen === 'reading-test' || screen === 'computer-exam'
          ? 'Phòng Thi Máy Tính & Luyện Đọc Cambridge'
          : screen === 'mistake-vault'
          ? 'Sổ Tay Câu Sai (Mistake Vault)'
          : screen === 'listening' || screen === 'listening-test'
          ? 'Luyện Nghe Dictation Audio Slicing'
          : screen === 'anki'
          ? 'Anki Flashcard Spaced Repetition'
          : 'Phân Hệ Nghiên Cứu'
      );
      return;
    }

    if (screen === 'anki') {
      setIsStudyingAnki(false);
    }

    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAuthSuccess = (userData: User, isNewRegistration?: boolean) => {
    login(userData, isNewRegistration);

    if (userData.role === 'admin') {
      setCurrentScreen('admin');
    } else {
      setCurrentScreen('reading');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = () => {
    logout();
    setCurrentScreen('landing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewCertificate = (courseOrTitle: Course | string) => {
    const title = typeof courseOrTitle === 'string' ? courseOrTitle : courseOrTitle.title;
    setCertCourseTitle(title);
    setShowCertModal(true);
  };

  const handleAddCourse = (newCourseData: Partial<Course>) => {
    const fullCourse: Course = {
      id: `course-${Date.now()}`,
      title: newCourseData.title || 'Khóa học mới',
      headline: newCourseData.headline || 'Khóa học chất lượng cao',
      description: 'Chương trình luyện thi thực chiến bám sát đề thi Cambridge.',
      category: newCourseData.category || 'Ngoại ngữ',
      level: 'Mọi cấp độ',
      duration: '18 giờ học',
      updatedAt: '09/2026',
      rating: 5.0,
      reviewsCount: 1,
      studentsCount: 1,
      price: newCourseData.price || 699000,
      originalPrice: (newCourseData.price || 699000) * 1.5,
      image:
        newCourseData.image ||
        'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80',
      instructor: {
        name: user?.full_name || 'Đội ngũ EduFlow',
        role: 'Ban chuyên môn',
        avatar:
          'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&auto=format&fit=crop&q=80',
        bio: 'Đội ngũ đồng hành luyện thi Cambridge IELTS.',
        coursesCount: 1,
        rating: 5.0,
      },
      learningOutcomes: [
        'Nắm vững cấu trúc câu và mở rộng vốn từ vựng Band 7.0+.',
        'Luyện tập phát âm chuẩn IPA và phản xạ giao tiếp tự tin.',
      ],
      features: ['Truy cập trọn đời', 'Chứng chỉ chuẩn hóa sau khi hoàn thành'],
      modules: [
        {
          id: `mod-new-${Date.now()}`,
          title: 'Chương 1: Khởi Động & Kiến Trúc Nền Tảng',
          orderIndex: 1,
          lessons: [
            {
              id: `les-new-1`,
              moduleId: `mod-new-${Date.now()}`,
              title: 'Bài 1: Tổng quan phương pháp luận',
              duration: '10:00',
              durationSeconds: 600,
              videoUrl:
                'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
              completed: false,
              orderIndex: 1,
              preview: true,
            },
          ],
        },
      ],
    };

    setCourses([fullCourse, ...courses]);
  };

  const handleDeleteCourse = (courseId: string) => {
    setCourses(courses.filter((c) => c.id !== courseId));
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'landing':
        return (
          <AcademicLandingPage
            currentUser={user}
            onOpenAuth={openAuthModal}
            onRequireAuth={(feat) => requireAuth(feat)}
            onNavigateScreen={handleScreenNavigate}
          />
        );

      case 'reading':
        return (
          <ReadingLibrary
            onStartSession={(config) => {
              setReadingSession(config);
              setSelectedPassageId(config.passageId);
              setCurrentScreen('reading-test');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onSelectPassage={(passageId) => {
              setSelectedPassageId(passageId);
              setReadingSession({
                mode: 'single',
                passageId,
                testTitle: 'Cambridge IELTS',
              });
              setCurrentScreen('reading-test');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onStartComputerExam={(group) => {
              setSelectedComputerExamGroup(group);
              setCurrentScreen('computer-exam');
            }}
            onNavigateMistakeVault={() => {
              setCurrentScreen('mistake-vault');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigateAnki={() => {
              setCurrentScreen('anki');
              setIsStudyingAnki(false);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        );

      case 'computer-exam': {
        const passagesToUse =
          selectedComputerExamGroup?.passages && selectedComputerExamGroup.passages.length > 0
            ? selectedComputerExamGroup.passages
            : mockReadingPassages.slice(0, 3);
        const titleToUse = selectedComputerExamGroup?.source || 'Cambridge 18 - Test 2';

        return (
          <IELTSComputerExamRoom
            passages={passagesToUse}
            testTitle={titleToUse}
            customTestId={selectedComputerExamGroup?.id}
            onExit={() => {
              setCurrentScreen('reading');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigateMistakeVault={() => {
              setCurrentScreen('mistake-vault');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        );
      }

      case 'mistake-vault':
        return (
          <MistakeVaultView
            onBackToLibrary={() => {
              setCurrentScreen('reading');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigateExam={() => {
              setCurrentScreen('reading');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        );

      case 'reading-test':
        return (
          <ReadingTestRoom
            passageId={selectedPassageId}
            sessionConfig={readingSession}
            onBackToLibrary={() => {
              setCurrentScreen('reading');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onEarnXp={handleEarnXp}
            onNavigateAnki={() => {
              setCurrentScreen('anki');
              setIsStudyingAnki(false);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        );

      case 'listening':
        return (
          <ListeningLibrary
            onSelectTest={(testId) => {
              setSelectedListeningTestId(testId);
              setCurrentScreen('listening-test');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onSelectFullTest={(testId) => {
              setSelectedListeningFullTestId(testId);
              setCurrentScreen('listening-exam');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigateAnki={() => {
              setCurrentScreen('anki');
              setIsStudyingAnki(false);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        );

      case 'listening-test':
        return (
          <ListeningDictationRoom
            testId={selectedListeningTestId}
            onBackToLibrary={() => {
              setCurrentScreen('listening');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onEarnXp={handleEarnXp}
            onNavigateAnki={() => {
              setCurrentScreen('anki');
              setIsStudyingAnki(false);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        );

      case 'listening-exam': {
        const listeningTest = mockListeningFullTests.find((t) => t.id === selectedListeningFullTestId) || mockListeningFullTests[0];
        return (
          <IELTSListeningExamRoom
            test={listeningTest}
            onExit={() => {
              setCurrentScreen('listening');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onSubmitComplete={(result) => {
              setListeningExamResult(result);
              setCurrentScreen('listening-review');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNotify={addToast}
          />
        );
      }

      case 'listening-review': {
        const listeningTest = mockListeningFullTests.find((t) => t.id === selectedListeningFullTestId) || mockListeningFullTests[0];
        if (!listeningExamResult) {
          setCurrentScreen('listening');
          return null;
        }
        return (
          <ListeningReviewRoom
            test={listeningTest}
            result={listeningExamResult}
            onBackToLibrary={() => {
              setCurrentScreen('listening');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onRetakeTest={() => {
              setListeningExamResult(null);
              setCurrentScreen('listening-exam');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        );
      }

      case 'writing':
        return (
          <WritingTask1Studio
            onBack={() => {
              setCurrentScreen('reading');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNotify={addToast}
          />
        );

      case 'speaking':
        return (
          <SpeakingMockRoom
            onBack={() => {
              setCurrentScreen('reading');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNotify={addToast}
          />
        );

      case 'anki':
        if (isStudyingAnki && selectedAnkiDeckId) {
          return (
            <AnkiFlashcardPlayer
              deckId={selectedAnkiDeckId}
              onBackToWorkspace={() => {
                setIsStudyingAnki(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onEarnXp={handleEarnXp}
            />
          );
        }
        return (
          <AnkiWorkspace
            onStartStudy={(deckId?: string) => {
              if (deckId) {
                setSelectedAnkiDeckId(deckId);
              } else {
                setSelectedAnkiDeckId('deck-personal');
              }
              setIsStudyingAnki(true);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigateReading={() => {
              setCurrentScreen('reading');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigateListening={() => {
              setCurrentScreen('listening');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        );

      case 'profile':
        if (!user) return null;
        return (
          <Profile
            user={user}
            stats={stats}
            courses={courses}
            onUpdateUser={(updated) => {
              login({ ...user, ...updated });
            }}
            onViewCertificate={(title) => handleViewCertificate(title)}
            onNotify={addToast}
          />
        );

      case 'admin':
        if (user?.role !== 'admin') return null;
        return (
          <AdminDashboard
            courses={courses}
            onAddCourse={handleAddCourse}
            onDeleteCourse={handleDeleteCourse}
            onNotify={addToast}
          />
        );

      default:
        return (
          <ReadingLibrary
            onSelectPassage={(passageId) => {
              setSelectedPassageId(passageId);
              setCurrentScreen('reading-test');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigateAnki={() => {
              setCurrentScreen('anki');
              setIsStudyingAnki(false);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAF9] text-stone-900 selection:bg-gold-600 selection:text-white font-sans antialiased relative">
      {/* Student LMS Navigation: Only displayed in authenticated workspace and outside of exam rooms */}
      {currentScreen !== 'landing' && currentScreen !== 'computer-exam' && currentScreen !== 'listening-exam' && (
        <Navbar
          currentScreen={currentScreen}
          onSelectScreen={handleScreenNavigate}
          stats={stats}
          currentUser={user}
          onOpenAuth={openAuthModal}
          onLogout={handleLogout}
        />
      )}

      {/* Dynamic Screen Routing with ErrorBoundary & AnimatePresence */}
      <main className="flex-1 relative z-10">
        <ErrorBoundary>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentScreen}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              {renderScreen()}
            </motion.div>
          </AnimatePresence>
        </ErrorBoundary>
      </main>

      {/* Academic European Styled Auth Modal */}
      <AcademicAuthModal
        isOpen={authModalConfig.isOpen}
        onClose={closeAuthModal}
        onSuccess={handleAuthSuccess}
        initialTab={authModalConfig.tab}
        title={authModalConfig.title}
        subtitle={authModalConfig.subtitle}
      />

      {/* Formal Certificate Modal with Print / PDF */}
      <CertificateModal
        isOpen={showCertModal}
        onClose={() => setShowCertModal(false)}
        courseTitle={certCourseTitle}
        studentName={user?.full_name || 'Đặng Minh Chiến'}
        studentEmail={user?.email || 'dangchien2005@gmail.com'}
      />

      {/* Global Toast Notifications Container */}
      <ToastContainer toasts={toasts} onDismiss={removeToast} />

      {/* Student LMS Workspace Footer */}
      {currentScreen !== 'landing' && currentScreen !== 'computer-exam' && currentScreen !== 'listening-exam' && (
        <footer className="mt-auto border-t border-stone-200/80 bg-white/85 backdrop-blur-md py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
            <div className="flex items-center gap-3 font-sans">
              <span className="font-bold text-forest-950">EduFlow</span>
              <span>•</span>
              <span className="font-sans">Hệ Thống Luyện Thi Cambridge IELTS &amp; Anki Spaced Repetition</span>
            </div>

            <div className="flex items-center gap-4 font-mono text-[11px]">
              <span className="inline-flex items-center gap-1.5 text-forest-800 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-600 inline-block animate-ping" />
                Academic Forest &amp; Warm Gold Engine Active
              </span>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <AnkiProvider>
        <VocabularyVaultProvider>
          <SmoothScrollProvider>
            <AppContent />
          </SmoothScrollProvider>
        </VocabularyVaultProvider>
      </AnkiProvider>
    </AuthProvider>
  );
};

export default App;
