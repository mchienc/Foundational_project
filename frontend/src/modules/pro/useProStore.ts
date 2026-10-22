// frontend/src/modules/pro/useProStore.ts
// Quản lý trạng thái gói Pro và hạn mức miễn phí (Freemium Quota)

import { create } from 'zustand';

interface ProState {
  isPro: boolean;
  writingQuotaLeft: number;
  speakingQuotaLeft: number;
  lastResetDate: string;
  isUpgradeModalOpen: boolean;

  // Actions
  checkAndResetDailyQuota: () => void;
  consumeWritingQuota: () => boolean;
  consumeSpeakingQuota: () => boolean;
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
      if (parsed.lastResetDate !== today) {
        // Ngày mới: Reset quota nhưng giữ nguyên trạng thái isPro nếu đã kích hoạt
        return {
          isPro: Boolean(parsed.isPro),
          writingQuotaLeft: 1,
          speakingQuotaLeft: 1,
          lastResetDate: today,
          isUpgradeModalOpen: false,
        };
      }
      return {
        isPro: Boolean(parsed.isPro),
        writingQuotaLeft: typeof parsed.writingQuotaLeft === 'number' ? parsed.writingQuotaLeft : 1,
        speakingQuotaLeft: typeof parsed.speakingQuotaLeft === 'number' ? parsed.speakingQuotaLeft : 1,
        lastResetDate: parsed.lastResetDate || today,
        isUpgradeModalOpen: false,
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

    activateProDemo: () => {
      const next = {
        isPro: true,
        writingQuotaLeft: 999,
        speakingQuotaLeft: 999,
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
        isUpgradeModalOpen: false,
      };
      set(next);
      syncToStorage(next);
    },
  };
});
