import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';

interface AuthModalConfig {
  isOpen: boolean;
  tab: 'login' | 'register';
  title: string;
  subtitle: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User, isNewRegistration?: boolean) => void;
  logout: () => void;
  requireAuth: (actionName?: string) => boolean;
  openAuthModal: (
    tab?: 'login' | 'register',
    title?: string,
    subtitle?: string
  ) => void;
  closeAuthModal: () => void;
  authModalConfig: AuthModalConfig;
  onNotify?: (message: string, type?: 'success' | 'error' | 'info') => void;
  setNotifyHandler: (handler: (message: string, type?: 'success' | 'error' | 'info') => void) => void;
}

const defaultUserStudent: User = {
  id: 'user-student-3',
  email: 'dangchien2005@gmail.com',
  full_name: 'Minh Chiến Đặng',
  role: 'student',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80',
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('eduflow_current_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [authModalConfig, setAuthModalConfig] = useState<AuthModalConfig>({
    isOpen: false,
    tab: 'login',
    title: 'Đăng nhập để bắt đầu học và lưu kết quả',
    subtitle: 'Đăng nhập để lưu tiến độ luyện thi Cambridge IELTS và từ vựng Anki của bạn.',
  });

  const [notifyHandler, setNotifyHandler] = useState<
    ((message: string, type?: 'success' | 'error' | 'info') => void) | null
  >(null);

  // Sync to localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem('eduflow_current_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('eduflow_current_user');
    }
  }, [user]);

  const login = (userData: User, isNewRegistration?: boolean) => {
    setUser(userData);
    setAuthModalConfig((prev) => ({ ...prev, isOpen: false }));

    if (notifyHandler) {
      if (isNewRegistration) {
        notifyHandler(
          `Đăng ký tài khoản thành công! Chào mừng ${userData.full_name}`,
          'success'
        );
      } else {
        notifyHandler(
          `Chào mừng ${userData.full_name} (${userData.role === 'admin' ? 'Quản trị viên' : 'Học viên'})!`,
          'success'
        );
      }
    }
  };

  const logout = () => {
    setUser(null);
    if (notifyHandler) {
      notifyHandler('Đã đăng xuất thành công.', 'info');
    }
  };

  const openAuthModal = (
    tab: 'login' | 'register' = 'login',
    title?: string,
    subtitle?: string
  ) => {
    setAuthModalConfig({
      isOpen: true,
      tab,
      title: title || (tab === 'login' ? 'Đăng nhập để bắt đầu học và lưu kết quả' : 'Đăng ký tài khoản học viên'),
      subtitle: subtitle || (tab === 'login'
        ? 'Đăng nhập để lưu tiến độ luyện thi Cambridge IELTS và từ vựng Anki của bạn.'
        : 'Tạo tài khoản học viên miễn phí để luyện đề thi, nghe chép chính tả và học từ vựng.'),
    });
  };

  const closeAuthModal = () => {
    setAuthModalConfig((prev) => ({ ...prev, isOpen: false }));
  };

  const requireAuth = (actionName?: string): boolean => {
    if (user) return true;

    if (notifyHandler) {
      notifyHandler('Vui lòng đăng nhập để tiếp tục tính năng này', 'info');
    }

    openAuthModal(
      'login',
      actionName
        ? `Đăng nhập để: ${actionName}`
        : 'Đăng nhập để bắt đầu học và lưu kết quả',
      'Đăng nhập để lưu tiến độ làm bài và đồng bộ thẻ từ vựng Anki của bạn.'
    );

    return false;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        requireAuth,
        openAuthModal,
        closeAuthModal,
        authModalConfig,
        setNotifyHandler: (handler) => setNotifyHandler(() => handler),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { defaultUserStudent };
