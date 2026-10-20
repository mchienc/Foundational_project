import React, { createContext, useContext, useState, useEffect } from 'react';
import { VocabItem, TargetWord } from '../types';

interface VocabularyVaultContextType {
  savedWords: VocabItem[];
  saveWord: (word: TargetWord, articleId: string, articleTitle: string) => boolean;
  removeWord: (id: string) => void;
  updateMastery: (id: string, isCorrect: boolean) => void;
  isWordSaved: (word: string) => boolean;
  getSavedWord: (word: string) => VocabItem | undefined;
  getDueWords: () => VocabItem[];
  totalSavedCount: number;
}

const STORAGE_KEY = 'eduflow_vault_vocab_v2';

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

// Seed words for new learners
const seedInitialVocab = (): VocabItem[] => {
  return [
    {
      id: 'seed-ubiquitous-0',
      word: 'ubiquitous',
      pos: 'adjective',
      ipa: '/juːˈbɪk.wɪ.təs/',
      contextMeaning: 'Có mặt ở khắp mọi nơi, phổ biến rộng rãi trong đời sống.',
      contextSentence: 'The ubiquitous deployment of generative artificial intelligence has ignited debate.',
      articleId: 'sample-ai',
      sourceArticleTitle: 'Cognitive Architecture of AI',
      savedAt: new Date().toISOString(),
      srsLevel: 1,
      nextReviewDate: calculateNextReviewDate(1),
      reviewCount: 0,
collocations: ['ubiquitous deployment', 'become ubiquitous'],
    },
    {
      id: 'seed-stochastic-1',
      word: 'stochastic',
      pos: 'adjective',
      ipa: '/stəˈkæs.tɪk/',
      contextMeaning: 'Có tính chất ngẫu nhiên, phỏng đoán theo phân phối xác suất.',
      contextSentence: 'Transformer models operate via stochastic patterns.',
      articleId: 'sample-ai',
      sourceArticleTitle: 'Cognitive Architecture of AI',
      savedAt: new Date().toISOString(),
      srsLevel: 1,
      nextReviewDate: calculateNextReviewDate(1),
      reviewCount: 0,
collocations: ['stochastic process', 'stochastic gradient descent'],
    },
  ];
};

const VocabularyVaultContext = createContext<VocabularyVaultContextType | undefined>(undefined);

export const VocabularyVaultProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [savedWords, setSavedWords] = useState<VocabItem[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
      // Migrate legacy storage if exists
      const legacyStored = localStorage.getItem('eduflow_vault_words');
      if (legacyStored) {
        const legacyParsed = JSON.parse(legacyStored);
        if (Array.isArray(legacyParsed) && legacyParsed.length > 0) {
          return legacyParsed.map((item: any) => ({
            id: item.id || `legacy-${item.word}`,
            word: item.word,
            pos: item.pos || item.partOfSpeech || 'noun',
            ipa: item.ipa || '',
            contextMeaning: item.contextMeaning || item.definitionVi || '',
            contextSentence: item.contextSentence || '',
            sourceArticleTitle: item.sourceArticleTitle || item.articleTitle || 'Học thuật EduFlow',
            srsLevel: item.srsLevel || item.masteryLevel || 1,
            nextReviewDate: item.nextReviewDate || calculateNextReviewDate(item.srsLevel || item.masteryLevel || 1),
            collocations: item.collocations || [],
            definitionEn: item.definitionEn || '',
            articleId: item.articleId || 'ai-cognitive-architecture',
            savedAt: item.savedAt || new Date().toISOString(),
            reviewCount: item.reviewCount || 0,
          }));
        }
      }
      const initial = seedInitialVocab();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
      return initial;
    } catch {
      return seedInitialVocab();
    }
  });

  // Persist to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(savedWords));
    } catch (e) {
      console.error('Failed to sync vocabulary vault:', e);
    }
  }, [savedWords]);

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
