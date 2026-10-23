// frontend/src/modules/pro/useProStore.ts
// Quản lý trạng thái gói Pro và hạn mức miễn phí (Freemium Quota & User Isolation)

import { create } from 'zustand';
import { User } from '../../types';

export interface ProExpiryDetails {
  isExpired: boolean;
  isLifetime: boolean;
  daysLeft: number;
  displayText: string;
}

// Helper phân tích ngày hết hạn và tính chính xác số ngày còn lại (tự trừ khi qua ngày)
export const getProExpiryDetails = (expiryStr?: string | null): ProExpiryDetails => {
  if (!expiryStr || expiryStr === 'Hết hạn') {
    return { isExpired: true, isLifetime: false, daysLeft: 0, displayText: 'Đã hết hạn' };
  }
  const str = String(expiryStr).trim().toLowerCase();
  if (str.includes('vĩnh viễn') || str.includes('lifetime')) {
    return { isExpired: false, isLifetime: true, daysLeft: 99999, displayText: 'Vĩnh viễn không giới hạn' };
  }

  let expDate: Date | null = null;
  if (expiryStr.includes('/')) {
    const parts = expiryStr.split('/');
    if (parts.length === 3) {
      expDate = new Date(Number(parts[2]), Number(parts[1]) - 1, Number(parts[0]), 23, 59, 59);
    }
  } else if (expiryStr.includes('-')) {
    expDate = new Date(expiryStr);
    expDate.setHours(23, 59, 59, 999);
  }

  if (!expDate || isNaN(expDate.getTime())) {
    const numMatch = expiryStr.match(/(\d+)\s*ngày/);
    if (numMatch) {
      const days = parseInt(numMatch[1], 10);
      return { isExpired: false, isLifetime: false, daysLeft: days, displayText: `Còn ${days} ngày` };
    }
    return { isExpired: false, isLifetime: false, daysLeft: 30, displayText: expiryStr };
  }

  const now = new Date();
  const diffTime = expDate.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays <= 0) {
    return { isExpired: true, isLifetime: false, daysLeft: 0, displayText: 'Đã hết hạn' };
  }

  return {
    isExpired: false,
    isLifetime: false,
    daysLeft: diffDays,
    displayText: `Còn ${diffDays} ngày (${expiryStr})`,
  };
};

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
  daysLeft: number;
  expiryDisplayText: string;
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

      const rawExpiry = (userObj?.isPro && userObj?.proExpiry) || parsed?.packageExpiry;
      const expiryInfo = getProExpiryDetails(rawExpiry);
      const effectiveIsPro = (Boolean(userObj?.isPro) || Boolean(parsed?.isPro)) && !expiryInfo.isExpired;

      return {
        currentUserEmail: email ? email.trim().toLowerCase() : null,
        isPro: effectiveIsPro,
        writingQuotaLeft: effectiveIsPro ? 999 : (isDailyNew ? 1 : (typeof parsed.writingQuotaLeft === 'number' ? parsed.writingQuotaLeft : 1)),
        speakingQuotaLeft: effectiveIsPro ? 999 : (isDailyNew ? 1 : (typeof parsed.speakingQuotaLeft === 'number' ? parsed.speakingQuotaLeft : 1)),
        lastResetDate: today,
        isUpgradeModalOpen: false,
        planName: (userObj?.isPro && userObj?.proPackage) || parsed.planName || (effectiveIsPro ? 'eng4u Pro' : 'Tài khoản miễn phí'),
        packageId: (userObj?.isPro && userObj?.proPackage) || parsed.packageId || 'month',
        packageExpiry: effectiveIsPro ? (rawExpiry || '30 ngày') : 'Hết hạn',
        daysLeft: effectiveIsPro ? expiryInfo.daysLeft : 0,
        expiryDisplayText: effectiveIsPro ? expiryInfo.displayText : 'Hết hạn',
        lastOrderId: parsed.lastOrderId || '',
      };
    }
  } catch (e) {
    console.warn('Lỗi đọc quota người dùng từ localStorage:', e);
  }

  // Nếu chưa có lịch sử, khởi tạo mặc định cho người dùng này
  const rawExpiry = userObj?.proExpiry;
  const expiryInfo = getProExpiryDetails(rawExpiry);
  const effectiveIsPro = Boolean(userObj?.isPro) && !expiryInfo.isExpired;

  return {
    currentUserEmail: email ? email.trim().toLowerCase() : null,
    isPro: effectiveIsPro,
    writingQuotaLeft: effectiveIsPro ? 999 : 1,
    speakingQuotaLeft: effectiveIsPro ? 999 : 1,
    lastResetDate: today,
    isUpgradeModalOpen: false,
    planName: userObj?.proPackage || (effectiveIsPro ? 'eng4u Pro' : 'Tài khoản miễn phí'),
    packageId: userObj?.proPackage || 'month',
    packageExpiry: effectiveIsPro ? (rawExpiry || 'Vĩnh viễn') : 'Hết hạn',
    daysLeft: effectiveIsPro ? expiryInfo.daysLeft : 0,
    expiryDisplayText: effectiveIsPro ? expiryInfo.displayText : 'Hết hạn',
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
      const currentExpiry = get().packageExpiry;
      const expiryInfo = getProExpiryDetails(currentExpiry);

      // Nếu tài khoản Pro đã qua ngày hết hạn -> Tự động hạ cấp về Free
      if (get().isPro && expiryInfo.isExpired) {
        get().resetToFree();
        return;
      }

      // Cập nhật lại số ngày còn lại (tự động giảm dần theo ngày)
      if (get().isPro && !expiryInfo.isLifetime) {
        set({
          daysLeft: expiryInfo.daysLeft,
          expiryDisplayText: expiryInfo.displayText,
        });
      }

      if (get().lastResetDate !== today) {
        const next = {
          writingQuotaLeft: get().isPro ? 999 : 1,
          speakingQuotaLeft: get().isPro ? 999 : 1,
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
      let resolvedExpiry = expiryDate;
      if (!resolvedExpiry || resolvedExpiry === '30 ngày' || resolvedExpiry === '180 ngày' || resolvedExpiry === '365 ngày') {
        if (packageId === 'lifetime') {
          resolvedExpiry = 'Vĩnh viễn';
        } else {
          const now = new Date();
          if (packageId === '6months') now.setDate(now.getDate() + 180);
          else if (packageId === 'year') now.setDate(now.getDate() + 365);
          else now.setDate(now.getDate() + 30);
          resolvedExpiry = now.toLocaleDateString('vi-VN');
        }
      }

      const expiryInfo = getProExpiryDetails(resolvedExpiry);
      const next = {
        isPro: true,
        writingQuotaLeft: 999,
        speakingQuotaLeft: 999,
        planName: planName || 'eng4u Pro',
        packageId: packageId || 'month',
        packageExpiry: resolvedExpiry,
        daysLeft: expiryInfo.daysLeft,
        expiryDisplayText: expiryInfo.displayText,
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
        daysLeft: 99999,
        expiryDisplayText: 'Vĩnh viễn không giới hạn',
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
        daysLeft: 0,
        expiryDisplayText: 'Đã hết hạn',
        lastOrderId: '',
        isUpgradeModalOpen: false,
      };
      set(next);
      syncToStorage(next);
    },
  };
});
