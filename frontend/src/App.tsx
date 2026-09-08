import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Screen, Course, User, ToastMessage } from './types';
import { sampleCourses, initialUserStats } from './data/mockData';
import { Navbar } from './components/common/Navbar';
import { ToastContainer } from './components/common/ToastContainer';
import { AcademicAuthModal } from './components/auth/AcademicAuthModal';
import { CertificateModal } from './components/common/CertificateModal';
import { Dashboard } from './components/dashboard/Dashboard';
import { Profile } from './components/profile/Profile';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { FlashcardPlayer } from './components/english/FlashcardPlayer';
import { PronunciationStudio } from './components/english/PronunciationStudio';
import { ListeningPlayer } from './components/english/ListeningPlayer';
import { SentenceBuilder } from './components/english/SentenceBuilder';
import { AcademicWritingStudio } from './components/english/AcademicWritingStudio';
import { LeaderboardModal } from './components/english/LeaderboardModal';
import { AcademicLandingPage } from './components/marketing/AcademicLandingPage';
import { sampleFlashcards } from './data/englishMockData';
import { englishApi } from './services/englishApi';
import { AuthProvider, useAuth } from './context/AuthContext';
import { SoftAtmosphereBackground } from './components/common/SoftAtmosphereBackground';

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
            Vui lòng nhấn nút thử lại bên dưới hoặc quay lại trang chủ Lộ Trình.
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

  // Navigation Screen State: Guests land on 'landing', authenticated students go to 'dashboard'
  const [currentScreen, setCurrentScreen] = useState<Screen>(() => {
    const saved = localStorage.getItem('eduflow_current_user');
    return saved ? 'dashboard' : 'landing';
  });

  // Courses list
  const [courses, setCourses] = useState<Course[]>(sampleCourses);

  // Certificate Modal State
  const [showCertModal, setShowCertModal] = useState<boolean>(false);
  const [certCourseTitle, setCertCourseTitle] = useState<string>(sampleCourses[0].title);

  // User Learning Stats
  const [stats, setStats] = useState(initialUserStats);

  // Gamification XP State & Leaderboard Modal
  const [xp, setXp] = useState<number>(() => {
    const saved = localStorage.getItem('eduflow_xp');
    return saved ? parseInt(saved, 10) : 2250;
  });
  const [showLeaderboardModal, setShowLeaderboardModal] = useState<boolean>(false);

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

  const handleEarnXp = (amount: number, reason: string) => {
    setXp((prev) => {
      const next = prev + amount;
      localStorage.setItem('eduflow_xp', next.toString());
      return next;
    });
    setStats((prev) => ({
      ...prev,
      hoursLearned: Math.round((prev.hoursLearned + 0.15) * 10) / 10,
    }));
    addToast(reason, 'success');
  };

  // Sync user learning stats & XP from MySQL Database
  useEffect(() => {
    if (!user) return;

    let isMounted = true;
    const userId = 3; // Minh Chiến Đặng
    englishApi
      .getUserStats(userId)
      .then((dbStats) => {
        if (isMounted && dbStats) {
          if (dbStats.xp_this_week) {
            setXp(dbStats.xp_this_week);
            localStorage.setItem('eduflow_xp', dbStats.xp_this_week.toString());
          }
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
    'dashboard',
    'vocab-srs',
    'speaking',
    'listening',
    'sentence-builder',
    'writing',
    'profile',
    'admin',
  ];

  // Auth Guard Navigation Handler
  const handleScreenNavigate = (screen: Screen) => {
    if (screen === 'leaderboard') {
      setShowLeaderboardModal(true);
      return;
    }

    if (screen === 'landing') {
      setCurrentScreen('landing');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // Intercept if guest attempts to access protected screens
    if (!isAuthenticated && protectedScreens.includes(screen)) {
      requireAuth(
        screen === 'dashboard'
          ? 'Bàn Học Cá Nhân'
          : screen === 'vocab-srs'
          ? 'Thẻ Từ Vựng 3D'
          : screen === 'speaking'
          ? 'Phòng Thu Phát Âm Waveform AI'
          : screen === 'listening'
          ? 'Luyện Nghe Dictation A-B Loop'
          : screen === 'sentence-builder'
          ? 'Kiến Trúc Cú Pháp Câu'
          : screen === 'writing'
          ? 'Chấm Luận Văn IELTS AI'
          : 'Phân Hệ Nghiên Cứu'
      );
      return;
    }

    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAuthSuccess = (userData: User, isNewRegistration?: boolean) => {
    login(userData, isNewRegistration);

    if (userData.role === 'admin') {
      setCurrentScreen('admin');
    } else {
      setCurrentScreen('dashboard');
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
      title: newCourseData.title || 'Khóa học học thuật mới',
      headline: newCourseData.headline || 'Khóa học chuyên sâu chất lượng cao',
      description: 'Chương trình đào tạo thực chiến được biên soạn bởi hội đồng khảo thí.',
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
        name: user?.full_name || 'Hội đồng Khảo thí',
        role: 'Giảng viên chuyên môn',
        avatar:
          'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&auto=format&fit=crop&q=80',
        bio: 'Chuyên gia đào tạo với nhiều năm kinh nghiệm nghiên cứu ngôn ngữ.',
        coursesCount: 1,
        rating: 5.0,
      },
      learningOutcomes: [
        'Nắm vững cấu trúc câu phức và từ vựng học thuật C1-C2.',
        'Luyện tập phát âm chuẩn âm vị IPA và phản xạ giao tiếp quốc tế.',
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

      case 'dashboard':
        return (
          <Dashboard
            stats={stats}
            currentUser={user}
            onOpenAuth={openAuthModal}
            onNavigateScreen={handleScreenNavigate}
          />
        );

      case 'vocab-srs':
        return (
          <FlashcardPlayer
            cards={sampleFlashcards}
            onEarnXp={handleEarnXp}
            onBackToDashboard={() => handleScreenNavigate('dashboard')}
          />
        );

      case 'speaking':
        return (
          <PronunciationStudio
            onEarnXp={handleEarnXp}
            onBackToDashboard={() => handleScreenNavigate('dashboard')}
          />
        );

      case 'listening':
        return (
          <ListeningPlayer
            onEarnXp={handleEarnXp}
            onBackToDashboard={() => handleScreenNavigate('dashboard')}
          />
        );

      case 'sentence-builder':
        return (
          <SentenceBuilder
            onEarnXp={handleEarnXp}
            onBackToDashboard={() => handleScreenNavigate('dashboard')}
          />
        );

      case 'writing':
        return (
          <AcademicWritingStudio
            onEarnXp={handleEarnXp}
            onBackToDashboard={() => handleScreenNavigate('dashboard')}
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
          <Dashboard
            stats={stats}
            currentUser={user}
            onOpenAuth={openAuthModal}
            onNavigateScreen={handleScreenNavigate}
          />
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAF9] text-stone-900 selection:bg-gold-600 selection:text-white font-sans antialiased relative">
      {/* Dynamic Customizable Soft Atmosphere Background */}
      <SoftAtmosphereBackground />

      {/* Student LMS Navigation: Only displayed in authenticated workspace */}
      {currentScreen !== 'landing' && (
        <Navbar
          currentScreen={currentScreen}
          onSelectScreen={handleScreenNavigate}
          stats={stats}
          currentUser={user}
          onOpenAuth={openAuthModal}
          onLogout={handleLogout}
          xp={xp}
          onOpenLeaderboard={() => setShowLeaderboardModal(true)}
        />
      )}

      {/* Dynamic Screen Routing with ErrorBoundary & AnimatePresence */}
      <main className="flex-1">
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

      {/* Weekly Gamification Leaderboard Modal */}
      <LeaderboardModal
        isOpen={showLeaderboardModal}
        onClose={() => setShowLeaderboardModal(false)}
        currentUserXp={xp}
      />

      {/* Global Toast Notifications Container */}
      <ToastContainer toasts={toasts} onDismiss={removeToast} />

      {/* Student LMS Workspace Footer */}
      {currentScreen !== 'landing' && (
        <footer className="mt-auto border-t border-stone-300 bg-white py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
            <div className="flex items-center gap-3 font-sans">
              <span className="font-bold text-forest-950">EduFlow Institute</span>
              <span>•</span>
              <span className="font-sans">Hệ Thống Quản Lý Bàn Học Nghiên Cứu Toàn Diện</span>
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
      <AppContent />
    </AuthProvider>
  );
};

export default App;
