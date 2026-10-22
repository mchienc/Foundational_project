// frontend/src/modules/pro/useProStore.ts
// Quản lý trạng thái gói Pro và hạn mức miễn phí (Freemium Quota & VietQR Payment)

import { create } from 'zustand';

interface ProState {
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

const STORAGE_KEY = 'eduflow_pro_quota';

const getTodayString = (): string => {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
};

const loadInitialState = () => {
  const today = getTodayString();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      const isDailyNew = parsed.lastResetDate !== today;
      return {
        isPro: Boolean(parsed.isPro),
        writingQuotaLeft: isDailyNew ? 1 : (typeof parsed.writingQuotaLeft === 'number' ? parsed.writingQuotaLeft : 1),
        speakingQuotaLeft: isDailyNew ? 1 : (typeof parsed.speakingQuotaLeft === 'number' ? parsed.speakingQuotaLeft : 1),
        lastResetDate: today,
        isUpgradeModalOpen: false,
        planName: parsed.planName || 'EduFlow Pro',
        packageId: parsed.packageId || 'month',
        packageExpiry: parsed.packageExpiry || 'Vĩnh viễn',
        lastOrderId: parsed.lastOrderId || '',
      };
    }
  } catch (e) {
    console.warn('Lỗi đọc quota từ localStorage:', e);
  }

  return {
    isPro: false,
    writingQuotaLeft: 1,
    speakingQuotaLeft: 1,
    lastResetDate: today,
    isUpgradeModalOpen: false,
    planName: 'EduFlow Pro',
    packageId: 'month',
    packageExpiry: 'Chưa kích hoạt',
    lastOrderId: '',
  };
};

export const useProStore = create<ProState>((set, get) => {
  const initial = loadInitialState();

  const syncToStorage = (state: Partial<ProState>) => {
    try {
      const current = {
        isPro: state.isPro ?? get().isPro,
        writingQuotaLeft: state.writingQuotaLeft ?? get().writingQuotaLeft,
        speakingQuotaLeft: state.speakingQuotaLeft ?? get().speakingQuotaLeft,
        lastResetDate: state.lastResetDate ?? get().lastResetDate,
        planName: state.planName ?? get().planName,
        packageId: state.packageId ?? get().packageId,
        packageExpiry: state.packageExpiry ?? get().packageExpiry,
        lastOrderId: state.lastOrderId ?? get().lastOrderId,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
    } catch (e) {
      console.warn('Lỗi ghi quota vào localStorage:', e);
    }
  };

  return {
    ...initial,

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
        planName: planName || 'EduFlow Pro',
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
        planName: 'EduFlow Pro Demo VIP',
        packageId: 'demo',
        packageExpiry: 'Trải nghiệm không giới hạn',
        lastOrderId: 'DEMO-1CLICK',
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
