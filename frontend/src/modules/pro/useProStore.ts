// frontend/src/modules/pro/useProStore.ts
// Quản lý trạng thái gói Pro và hạn mức miễn phí (Freemium Quota & User Isolation)

import { create } from 'zustand';
import { User } from '../../types';

interface ProState {
  currentUserEmail: string | null;
  isPro: boolean;
  writingQuotaLeft: number;
  speakingQuotaLeft: number;
  lastResetDate: string;
  isUpgradeModalOpen: boolean;

  // Thông tin gói thanh toán
  planName: string;
  packageId: string;
  packageExpiry: string;
  lastOrderId: string;

  // Actions
  syncWithUser: (user: User | null) => void;
  checkAndResetDailyQuota: () => void;
  consumeWritingQuota: () => boolean;
  consumeSpeakingQuota: () => boolean;
  activateProPackage: (data: {
    packageId: string;
    planName: string;
    expiryDate: string;
    orderId?: string;
  }) => void;
  activateProDemo: () => void;
  openUpgradeModal: () => void;
  closeUpgradeModal: () => void;
  resetToFree: () => void;
}

const getTodayString = (): string => {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
};

const getStorageKey = (email?: string | null): string => {
  if (email && email.trim()) {
    return `eduflow_pro_user_${email.trim().toLowerCase()}`;
  }
  return 'eduflow_pro_user_guest';
};

// Đọc dữ liệu riêng biệt của từng tài khoản
const loadUserState = (email?: string | null, userObj?: User | null) => {
  const today = getTodayString();
  const key = getStorageKey(email);

  try {
    const raw = localStorage.getItem(key);
    if (raw) {
      const parsed = JSON.parse(raw);
      const isDailyNew = parsed.lastResetDate !== today;

      // Giữ nguyên trạng thái Pro nếu tài khoản này đã có Pro (từ userObj hoặc từ lịch sử localStorage)
      const effectiveIsPro = Boolean(userObj?.isPro) || Boolean(parsed?.isPro);

      return {
        currentUserEmail: email ? email.trim().toLowerCase() : null,
        isPro: effectiveIsPro,
        writingQuotaLeft: effectiveIsPro ? 999 : (isDailyNew ? 1 : (typeof parsed.writingQuotaLeft === 'number' ? parsed.writingQuotaLeft : 1)),
        speakingQuotaLeft: effectiveIsPro ? 999 : (isDailyNew ? 1 : (typeof parsed.speakingQuotaLeft === 'number' ? parsed.speakingQuotaLeft : 1)),
        lastResetDate: today,
        isUpgradeModalOpen: false,
        planName: (userObj?.isPro && userObj?.proPackage) || parsed.planName || (effectiveIsPro ? 'eng4u Pro' : 'Tài khoản miễn phí'),
        packageId: (userObj?.isPro && userObj?.proPackage) || parsed.packageId || 'month',
        packageExpiry: (userObj?.isPro && userObj?.proExpiry) || parsed.packageExpiry || (effectiveIsPro ? 'Vĩnh viễn' : 'Hết hạn'),
        lastOrderId: parsed.lastOrderId || '',
      };
    }
  } catch (e) {
    console.warn('Lỗi đọc quota người dùng từ localStorage:', e);
  }

  // Nếu chưa có lịch sử, khởi tạo mặc định cho người dùng này
  const effectiveIsPro = Boolean(userObj?.isPro);
  return {
    currentUserEmail: email ? email.trim().toLowerCase() : null,
    isPro: effectiveIsPro,
    writingQuotaLeft: 1,
    speakingQuotaLeft: 1,
    lastResetDate: today,
    isUpgradeModalOpen: false,
    planName: userObj?.proPackage || (effectiveIsPro ? 'eng4u Pro' : 'Tài khoản miễn phí'),
    packageId: userObj?.proPackage || 'month',
    packageExpiry: userObj?.proExpiry || (effectiveIsPro ? 'Vĩnh viễn' : 'Hết hạn'),
    lastOrderId: '',
  };
};

// Khởi tạo ban đầu từ tài khoản đang đăng nhập hiện tại
const getInitialUser = (): User | null => {
  try {
    const saved = localStorage.getItem('eduflow_current_user');
    return saved ? JSON.parse(saved) : null;
  } catch (e) {
    return null;
  }
};

export const useProStore = create<ProState>((set, get) => {
  const initialUser = getInitialUser();
  const initial = loadUserState(initialUser?.email, initialUser);

  const syncToStorage = (state: Partial<ProState>) => {
    try {
      const email = state.currentUserEmail !== undefined ? state.currentUserEmail : get().currentUserEmail;
      const key = getStorageKey(email);

      const current = {
        isPro: state.isPro !== undefined ? state.isPro : get().isPro,
        writingQuotaLeft: state.writingQuotaLeft !== undefined ? state.writingQuotaLeft : get().writingQuotaLeft,
        speakingQuotaLeft: state.speakingQuotaLeft !== undefined ? state.speakingQuotaLeft : get().speakingQuotaLeft,
        lastResetDate: state.lastResetDate !== undefined ? state.lastResetDate : get().lastResetDate,
        planName: state.planName !== undefined ? state.planName : get().planName,
        packageId: state.packageId !== undefined ? state.packageId : get().packageId,
        packageExpiry: state.packageExpiry !== undefined ? state.packageExpiry : get().packageExpiry,
        lastOrderId: state.lastOrderId !== undefined ? state.lastOrderId : get().lastOrderId,
      };

      localStorage.setItem(key, JSON.stringify(current));

      // Đồng bộ vào eduflow_current_user nếu đang đăng nhập
      const userJson = localStorage.getItem('eduflow_current_user');
      if (userJson) {
        try {
          const parsedUser = JSON.parse(userJson);
          if (parsedUser && (!email || parsedUser.email?.toLowerCase() === email.toLowerCase())) {
            parsedUser.isPro = current.isPro;
            parsedUser.proPackage = current.packageId;
            parsedUser.proExpiry = current.packageExpiry;
            localStorage.setItem('eduflow_current_user', JSON.stringify(parsedUser));
          }
        } catch (err) {}
      }
    } catch (e) {
      console.warn('Lỗi ghi quota người dùng vào localStorage:', e);
    }
  };

  return {
    ...initial,

    // Đồng bộ trạng thái khi đăng nhập / chuyển đổi tài khoản
    syncWithUser: (user: User | null) => {
      const email = user?.email || null;
      const nextState = loadUserState(email, user);
      set(nextState);
      syncToStorage(nextState);
    },

    checkAndResetDailyQuota: () => {
      const today = getTodayString();
      if (get().lastResetDate !== today) {
        const next = {
          writingQuotaLeft: 1,
          speakingQuotaLeft: 1,
          lastResetDate: today,
        };
        set(next);
        syncToStorage(next);
      }
    },

    consumeWritingQuota: () => {
      get().checkAndResetDailyQuota();
      if (get().isPro) return true;

      const current = get().writingQuotaLeft;
      if (current > 0) {
        const next = { writingQuotaLeft: current - 1 };
        set(next);
        syncToStorage(next);
        return true;
      }

      set({ isUpgradeModalOpen: true });
      return false;
    },

    consumeSpeakingQuota: () => {
      get().checkAndResetDailyQuota();
      if (get().isPro) return true;

      const current = get().speakingQuotaLeft;
      if (current > 0) {
        const next = { speakingQuotaLeft: current - 1 };
        set(next);
        syncToStorage(next);
        return true;
      }

      set({ isUpgradeModalOpen: true });
      return false;
    },

    activateProPackage: ({ packageId, planName, expiryDate, orderId }) => {
      const next = {
        isPro: true,
        writingQuotaLeft: 999,
        speakingQuotaLeft: 999,
        planName: planName || 'eng4u Pro',
        packageId: packageId || 'month',
        packageExpiry: expiryDate || 'Vĩnh viễn',
        lastOrderId: orderId || '',
        isUpgradeModalOpen: false,
      };
      set(next);
      syncToStorage(next);
    },

    activateProDemo: () => {
      const next = {
        isPro: true,
        writingQuotaLeft: 999,
        speakingQuotaLeft: 999,
        planName: 'eng4u Pro VIP',
        packageId: 'lifetime',
        packageExpiry: 'Vĩnh viễn không giới hạn',
        lastOrderId: 'DEMO-VIP',
        isUpgradeModalOpen: false,
      };
      set(next);
      syncToStorage(next);
    },

    openUpgradeModal: () => set({ isUpgradeModalOpen: true }),
    closeUpgradeModal: () => set({ isUpgradeModalOpen: false }),

    resetToFree: () => {
      const next = {
        isPro: false,
        writingQuotaLeft: 1,
        speakingQuotaLeft: 1,
        lastResetDate: getTodayString(),
        planName: 'Tài khoản miễn phí',
        packageId: '',
        packageExpiry: 'Hết hạn',
        lastOrderId: '',
        isUpgradeModalOpen: false,
      };
      set(next);
      syncToStorage(next);
    },
  };
});
