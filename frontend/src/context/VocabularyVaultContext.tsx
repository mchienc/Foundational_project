import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { VocabItem, TargetWord } from '../types';
import { useAuth } from './AuthContext';

interface VocabularyVaultContextType {
  savedWords: VocabItem[];
  saveWord: (word: TargetWord, articleId: string, articleTitle: string) => boolean;
  saveAiGeneratedWord: (data: {
    word: string;
    clozeText: string;
    backExtra: string;
    tags: string;
    contextSentence?: string;
    sourceArticleTitle?: string;
    ipa?: string;
    pos?: string;
    contextMeaning?: string;
  }) => boolean;
  removeWord: (id: string) => void;
  updateMastery: (id: string, isCorrect: boolean) => void;
  isWordSaved: (word: string) => boolean;
  getSavedWord: (word: string) => VocabItem | undefined;
  getDueWords: () => VocabItem[];
  totalSavedCount: number;
}

// Spaced repetition interval schedule (in days)
const SRS_INTERVAL_DAYS: Record<number, number> = {
  1: 1,  // Review next day
  2: 3,  // Review in 3 days
  3: 7,  // Review in 1 week
  4: 14, // Review in 2 weeks
  5: 30, // Review in 1 month (Mastered)
};

const calculateNextReviewDate = (level: number): string => {
  const days = SRS_INTERVAL_DAYS[level] || 1;
  const next = new Date();
  next.setDate(next.getDate() + days);
  return next.toISOString();
};

const VocabularyVaultContext = createContext<VocabularyVaultContextType | undefined>(undefined);

export const VocabularyVaultProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const userKey = user?.id || user?.email ? `user_${user.id || user.email}` : 'guest';
  const storageKey = `eduflow_vault_vocab_${userKey}`;

  const loadUserVocab = (key: string): VocabItem[] => {
    try {
      const stored = localStorage.getItem(`eduflow_vault_vocab_${key}`);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Failed to load vocabulary vault:', e);
    }
    return [];
  };

  const [savedWords, setSavedWords] = useState<VocabItem[]>(() => loadUserVocab(userKey));
  const prevUserKeyRef = useRef(userKey);

  // Khi chuyển đổi User, tải đúng kho từ vựng của user đó
  useEffect(() => {
    if (prevUserKeyRef.current !== userKey) {
      prevUserKeyRef.current = userKey;
      setSavedWords(loadUserVocab(userKey));
    }
  }, [userKey]);

  // Persist to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(savedWords));
    } catch (e) {
      console.error('Failed to sync vocabulary vault:', e);
    }
  }, [savedWords, storageKey]);

  const isWordSaved = (word: string): boolean => {
    const clean = word.toLowerCase().trim();
    return savedWords.some((item) => item.word.toLowerCase().trim() === clean);
  };

  const getSavedWord = (word: string): VocabItem | undefined => {
    const clean = word.toLowerCase().trim();
    return savedWords.find((item) => item.word.toLowerCase().trim() === clean);
  };

  const saveWord = (word: TargetWord, articleId: string, articleTitle: string): boolean => {
    if (isWordSaved(word.word)) {
      return false;
    }

    const newItem: VocabItem = {
      id: `vocab-${Date.now()}-${word.word.toLowerCase()}`,
      word: word.word,
      pos: word.partOfSpeech,
      ipa: word.ipa,
      contextMeaning: word.definitionVi,
      contextSentence: word.contextSentence,
      sourceArticleTitle: articleTitle,
      srsLevel: 1,
      nextReviewDate: calculateNextReviewDate(1),
      collocations: word.collocations || [],
      definitionEn: word.definitionEn || '',
      articleId,
      savedAt: new Date().toISOString(),
      reviewCount: 0,
    };

    setSavedWords((prev) => [newItem, ...prev]);
    return true;
  };

  const saveAiGeneratedWord = (data: {
    word: string;
    clozeText: string;
    backExtra: string;
    tags: string;
    contextSentence?: string;
    sourceArticleTitle?: string;
    ipa?: string;
    pos?: string;
    contextMeaning?: string;
  }): boolean => {
    const cleanWord = data.word.trim();
    if (!cleanWord) return false;

    const existingIndex = savedWords.findIndex(
      (item) => item.word.toLowerCase().trim() === cleanWord.toLowerCase()
    );

    if (existingIndex !== -1) {
      setSavedWords((prev) =>
        prev.map((item, idx) =>
          idx === existingIndex
            ? {
                ...item,
                clozeText: data.clozeText,
                backExtra: data.backExtra,
                tags: data.tags,
                contextSentence: data.contextSentence || item.contextSentence,
              }
            : item
        )
      );
      return true;
    }

    const newItem: VocabItem = {
      id: `ai-vocab-${Date.now()}-${cleanWord.toLowerCase().replace(/\s+/g, '-')}`,
      word: cleanWord,
      pos: data.pos || 'academic phrase',
      ipa: data.ipa || '',
      contextMeaning: data.contextMeaning || (data.backExtra.split('\n')[0] || ''),
      contextSentence: data.contextSentence || data.clozeText.replace(/\{\{c1::(.*?)(?:::.*?)?\}\}/g, '$1'),
      sourceArticleTitle: data.sourceArticleTitle || 'Gemini IELTS 9.0 Coach',
      srsLevel: 1,
      nextReviewDate: calculateNextReviewDate(1),
      savedAt: new Date().toISOString(),
      reviewCount: 0,
      clozeText: data.clozeText,
      backExtra: data.backExtra,
      tags: data.tags,
    };

    setSavedWords((prev) => [newItem, ...prev]);
    return true;
  };

  const removeWord = (id: string) => {
    setSavedWords((prev) => prev.filter((item) => item.id !== id));
  };

  const updateMastery = (id: string, isCorrect: boolean) => {
    setSavedWords((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        const currentLevel = item.srsLevel || 1;
        const newLevel = isCorrect
          ? Math.min(5, currentLevel + 1)
          : 1; // Reset to 1 on failure for reinforcement

        return {
          ...item,
          srsLevel: newLevel,
          nextReviewDate: calculateNextReviewDate(newLevel),
          reviewCount: (item.reviewCount || 0) + 1,
        };
      })
    );
  };

  const getDueWords = (): VocabItem[] => {
    const now = new Date();
    return savedWords.filter((w) => new Date(w.nextReviewDate) <= now);
  };

  return (
    <VocabularyVaultContext.Provider
      value={{
        savedWords,
        saveWord,
        saveAiGeneratedWord,
        removeWord,
        updateMastery,
        isWordSaved,
        getSavedWord,
        getDueWords,
        totalSavedCount: savedWords.length,
      }}
    >
      {children}
    </VocabularyVaultContext.Provider>
  );
};

export const useVocabularyVault = () => {
  const context = useContext(VocabularyVaultContext);
  if (!context) {
    throw new Error('useVocabularyVault must be used within a VocabularyVaultProvider');
  }
  return context;
};
