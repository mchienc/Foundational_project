import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Screen, Course, User, ToastMessage } from './types';
import { sampleCourses, initialUserStats } from './data/mockData';
import { Navbar } from './components/common/Navbar';
import { ToastContainer } from './components/common/ToastContainer';
import { AuthModal } from './components/auth/AuthModal';
import { CertificateModal } from './components/common/CertificateModal';
import { Dashboard } from './components/dashboard/Dashboard';
import { Profile } from './components/profile/Profile';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { FlashcardPlayer } from './components/english/FlashcardPlayer';
import { PronunciationStudio } from './components/english/PronunciationStudio';
import { ListeningPlayer } from './components/english/ListeningPlayer';
import { SentenceBuilder } from './components/english/SentenceBuilder';
import { LeaderboardModal } from './components/english/LeaderboardModal';
import { sampleFlashcards } from './data/englishMockData';

const defaultStudentUser: User = {
  id: 'user-student-3',
  email: 'dangchien2005@gmail.com',
  full_name: 'Minh Chiến Đặng',
  role: 'student',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80',
};

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
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
            >
              Tải lại trang web
            </button>
            <button
              onClick={() => this.setState({ hasError: false, error: null })}
              className="px-4 py-2 bg-white border border-red-300 text-red-700 hover:bg-red-50 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
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

export const App: React.FC = () => {
  // Navigation Screen State
  const [currentScreen, setCurrentScreen] = useState<Screen>('dashboard');

  // English Courses
  const [courses, setCourses] = useState<Course[]>(sampleCourses);

  // User & Authentication State
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('eduflow_current_user');
    return saved ? JSON.parse(saved) : defaultStudentUser;
  });

  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);
  const [authModalTab, setAuthModalTab] = useState<'login' | 'register'>('login');

  // Certificate Modal State
  const [showCertModal, setShowCertModal] = useState<boolean>(false);
  const [certCourseTitle, setCertCourseTitle] = useState<string>(sampleCourses[0].title);

  // User Learning Stats
  const [stats, setStats] = useState(initialUserStats);

  // Gamification XP State & Leaderboard Modal
  const [xp, setXp] = useState<number>(() => {
    const saved = localStorage.getItem('eduflow_xp');
    return saved ? parseInt(saved, 10) : 1980;
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

  // Persist Current User
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('eduflow_current_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('eduflow_current_user');
    }
  }, [currentUser]);

  // Auth Handlers
  const handleOpenAuth = (tab: 'login' | 'register' = 'login') => {
    setAuthModalTab(tab);
    setShowAuthModal(true);
  };

  const handleAuthSuccess = (user: User, isNewRegistration?: boolean) => {
    setCurrentUser(user);
    setShowAuthModal(false);
    if (isNewRegistration) {
      addToast(`Đăng ký tài khoản thành công! Chào mừng ${user.full_name}`, 'success');
    } else {
      addToast(`Đăng nhập thành công với vai trò: ${user.role === 'admin' ? 'Quản trị viên' : 'Học viên'}!`, 'success');
    }

    if (user.role === 'admin') {
      setCurrentScreen('admin');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentScreen('dashboard');
    addToast('Bạn đã đăng xuất khỏi hệ thống an toàn.', 'info');
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
      headline: newCourseData.headline || 'Khóa học chuyên sâu chất lượng cao',
      description: 'Chương trình đào tạo thực chiến được biên soạn bởi chuyên gia.',
      category: newCourseData.category || 'Lập trình',
      level: 'Mọi cấp độ',
      duration: '18 giờ học',
      updatedAt: '09/2026',
      rating: 5.0,
      reviewsCount: 1,
      studentsCount: 1,
      price: newCourseData.price || 699000,
      originalPrice: (newCourseData.price || 699000) * 1.5,
      image: newCourseData.image || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80',
      instructor: {
        name: currentUser?.full_name || 'Admin',
        role: 'Giảng viên chuyên môn',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&auto=format&fit=crop&q=80',
        bio: 'Chuyên gia đào tạo với nhiều năm kinh nghiệm.',
        coursesCount: 1,
        rating: 5.0,
      },
      learningOutcomes: [
        'Nắm vững kiến thức trọng tâm từ căn bản đến nâng cao.',
        'Thực hành các dự án bài tập thực tế chuẩn doanh nghiệp.',
      ],
      features: [
        'Truy cập trọn đời',
        'Chứng chỉ sau khi hoàn thành',
      ],
      modules: [
        {
          id: `mod-new-${Date.now()}`,
          title: 'Chương 1: Khởi Động & Kiến Thức Nền Tảng',
          orderIndex: 1,
          lessons: [
            {
              id: `les-new-1`,
              moduleId: `mod-new-${Date.now()}`,
              title: 'Bài 1: Giới thiệu khóa học',
              duration: '10:00',
              durationSeconds: 600,
              videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
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
      case 'dashboard':
        return (
          <Dashboard
            stats={stats}
            currentUser={currentUser}
            onOpenAuth={handleOpenAuth}
            onNavigateScreen={(screen) => {
              if (screen === 'leaderboard') {
                setShowLeaderboardModal(true);
              } else {
                setCurrentScreen(screen);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
          />
        );
      case 'vocab-srs':
        return (
          <FlashcardPlayer
            cards={sampleFlashcards}
            onEarnXp={handleEarnXp}
            onBackToDashboard={() => {
              setCurrentScreen('dashboard');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        );
      case 'speaking':
        return (
          <PronunciationStudio
            onEarnXp={handleEarnXp}
            onBackToDashboard={() => {
              setCurrentScreen('dashboard');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        );
      case 'listening':
        return (
          <ListeningPlayer
            onEarnXp={handleEarnXp}
            onBackToDashboard={() => {
              setCurrentScreen('dashboard');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        );
      case 'sentence-builder':
        return (
          <SentenceBuilder
            onEarnXp={handleEarnXp}
            onBackToDashboard={() => {
              setCurrentScreen('dashboard');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        );
      case 'profile':
        if (!currentUser) return null;
        return (
          <Profile
            user={currentUser}
            stats={stats}
            courses={courses}
            onUpdateUser={(updated) => {
              setCurrentUser({ ...currentUser, ...updated });
            }}
            onViewCertificate={(title) => handleViewCertificate(title)}
            onNotify={addToast}
          />
        );
      case 'admin':
        if (currentUser?.role !== 'admin') return null;
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
            currentUser={currentUser}
            onOpenAuth={handleOpenAuth}
            onNavigateScreen={(screen) => {
              if (screen === 'leaderboard') {
                setShowLeaderboardModal(true);
              } else {
                setCurrentScreen(screen);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
          />
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-blue-600 selection:text-white">
      {/* Modern Sticky Navigation */}
      <Navbar
        currentScreen={currentScreen}
        onSelectScreen={(screen) => {
          if (screen === 'leaderboard') {
            setShowLeaderboardModal(true);
          } else {
            setCurrentScreen(screen);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }}
        stats={stats}
        currentUser={currentUser}
        onOpenAuth={handleOpenAuth}
        onLogout={handleLogout}
        xp={xp}
        onOpenLeaderboard={() => setShowLeaderboardModal(true)}
      />

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

        {/* Authentication Modal */}
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          onSuccess={handleAuthSuccess}
          initialTab={authModalTab}
        />

        {/* Formal Certificate Modal with Print / PDF */}
        <CertificateModal
          isOpen={showCertModal}
          onClose={() => setShowCertModal(false)}
          courseTitle={certCourseTitle}
          studentName={currentUser?.full_name || 'Đặng Minh Chiến'}
          studentEmail={currentUser?.email || 'dangchien2005@gmail.com'}
        />

        {/* Weekly Gamification Leaderboard Modal */}
        <LeaderboardModal
          isOpen={showLeaderboardModal}
          onClose={() => setShowLeaderboardModal(false)}
          currentUserXp={xp}
        />

        {/* Global Toast Notifications Container */}
        <ToastContainer toasts={toasts} onDismiss={removeToast} />

        {/* Modern EdTech Footer */}
        <footer className="mt-auto border-t border-slate-200/90 bg-white py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <div className="flex items-center gap-3">
              <span className="font-bold text-slate-900">EduFlow LMS</span>
              <span>•</span>
              <span>Hệ Thống Quản Lý Học Tập Trực Tuyến Toàn Diện</span>
            </div>

            <div className="flex items-center gap-4 font-mono text-[11px]">
              <span className="inline-flex items-center gap-1.5 text-emerald-600 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-ping" />
                UI/UX Pro Max Motion & Full LMS Engine Active
              </span>
            </div>
          </div>
        </footer>
      </div>
  );
};

export default App;
