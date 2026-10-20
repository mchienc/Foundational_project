import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { AnkiCard, AnkiDeck, AnkiRating } from '../types';
import {
  loadUserCardsFromStorage,
  saveUserCardsToStorage,
  loadUserDecksFromStorage,
  saveUserDecksToStorage,
  calculateSm2,
  isCardDue,
  mockAnkiCards,
  mockAnkiDecks,
} from '../store/ankiStore';
import {
  saveWordToDatabaseAnki,
  submitAnkiReviewToDatabase,
} from '../services/cambridgeApi';
import { useAuth } from './AuthContext';

interface AnkiContextType {
  cards: AnkiCard[];
  decks: AnkiDeck[];
  activeDeckId: string | null;
  setActiveDeckId: (deckId: string | null) => void;
  addCardToPersonalDeck: (data: {
    word: string;
    ipa?: string;
    pos?: string;
    definitionEn?: string;
    definitionVi: string;
    contextSentence: string;
    source: string;
    backExtra?: string;
    tags?: string;
    customCloze?: string;
    deckId?: string;
  }) => boolean;
  createDeck: (title: string, description: string, iconName?: string) => AnkiDeck;
  deleteDeck: (deckId: string) => boolean;
  deleteCard: (cardId: string) => void;
  loadSampleDecks: () => void;
  rateCard: (cardId: string, rating: AnkiRating) => void;
  getDueCardsForDeck: (deckId?: string) => AnkiCard[];
  getCardsForDeck: (deckId: string) => AnkiCard[];
  isWordSavedInAnki: (word: string) => boolean;
  totalDueCount: number;
}

const AnkiContext = createContext<AnkiContextType | undefined>(undefined);

export const AnkiProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const userKey = user?.id || user?.email ? `user_${user.id || user.email}` : 'guest';

  const [cards, setCards] = useState<AnkiCard[]>(() => loadUserCardsFromStorage(userKey));
  const [decks, setDecks] = useState<AnkiDeck[]>(() => loadUserDecksFromStorage(userKey, loadUserCardsFromStorage(userKey)));
  const [activeDeckId, setActiveDeckId] = useState<string | null>(null);

  const prevUserKeyRef = useRef(userKey);

  // Khi chuyển đổi User (login/logout/đổi tài khoản), nạp lại bảng thẻ riêng của user đó
  useEffect(() => {
    if (prevUserKeyRef.current !== userKey) {
      prevUserKeyRef.current = userKey;
      const loadedCards = loadUserCardsFromStorage(userKey);
      const loadedDecks = loadUserDecksFromStorage(userKey, loadedCards);
      setCards(loadedCards);
      setDecks(loadedDecks);
      setActiveDeckId(null);
    }
  }, [userKey]);

  // Đồng bộ thẻ và số liệu bộ bài khi cards thay đổi
  useEffect(() => {
    saveUserCardsToStorage(userKey, cards);
    const updatedDecks = loadUserDecksFromStorage(userKey, cards);
    setDecks(updatedDecks);
    saveUserDecksToStorage(userKey, updatedDecks);
  }, [cards, userKey]);

  // Tạo bộ bài mới do người dùng tự đặt tên
  const createDeck = (title: string, description: string, iconName: string = 'Bookmark'): AnkiDeck => {
    const cleanTitle = title.trim();
    const newDeckId = `deck-custom-${Date.now()}`;
    const newDeck: AnkiDeck = {
      id: newDeckId,
      title: cleanTitle,
      description: description.trim() || 'Bộ bài tự tạo bởi người dùng',
      category: 'TỰ TẠO',
      isPersonal: true,
      totalCards: 0,
      dueTodayCount: 0,
      learningCount: 0,
      masteredCount: 0,
      iconName,
    };

    setDecks((prev) => {
      const updated = [...prev, newDeck];
      saveUserDecksToStorage(userKey, updated);
      return updated;
    });

    return newDeck;
  };

  // Xóa bộ bài tự tạo
  const deleteDeck = (deckId: string): boolean => {
    if (deckId === 'deck-personal') return false; // Không xóa deck mặc định

    setDecks((prev) => {
      const updated = prev.filter((d) => d.id !== deckId);
      saveUserDecksToStorage(userKey, updated);
      return updated;
    });

    // Xóa luôn các thẻ thuộc bộ bài đó
    setCards((prev) => prev.filter((c) => c.deckId !== deckId));
    return true;
  };

  // Xóa thẻ đơn lẻ
  const deleteCard = (cardId: string) => {
    setCards((prev) => prev.filter((c) => c.id !== cardId));
  };

  // Nạp bộ thẻ mẫu Cambridge Core 500 & AWL (Tùy chọn dành cho học viên muốn ôn tập thêm)
  const loadSampleDecks = () => {
    const existingDeckIds = new Set(decks.map((d) => d.id));
    const sampleDecksToAdd = mockAnkiDecks.filter((d) => !existingDeckIds.has(d.id));
    
    // Thêm các thẻ mẫu không trùng
    const existingCardWords = new Set(cards.map((c) => c.word.toLowerCase()));
    const sampleCardsToAdd = mockAnkiCards.filter(
      (c) => c.deckId !== 'deck-personal' && !existingCardWords.has(c.word.toLowerCase())
    );

    const mergedDecks = [...decks, ...sampleDecksToAdd];
    const mergedCards = [...cards, ...sampleCardsToAdd];

    setCards(mergedCards);
    setDecks(mergedDecks);
    saveUserCardsToStorage(userKey, mergedCards);
    saveUserDecksToStorage(userKey, mergedDecks);
  };

  const addCardToPersonalDeck = (data: {
    word: string;
    ipa?: string;
    pos?: string;
    definitionEn?: string;
    definitionVi: string;
    contextSentence: string;
    source: string;
    backExtra?: string;
    tags?: string;
    customCloze?: string;
    deckId?: string;
  }): boolean => {
    const cleanWord = data.word.trim();
    if (!cleanWord) return false;

    const targetDeckId = data.deckId || 'deck-personal';

    // Kiểm tra trùng lặp trong bộ bài mục tiêu
    const existing = cards.find(
      (c) => c.deckId === targetDeckId && c.word.toLowerCase() === cleanWord.toLowerCase()
    );
    if (existing) return false;

    // Mask the target word in the sentence for the cloze prompt
    let clozeSentence = data.contextSentence;
    try {
      const regex = new RegExp(`\\b${cleanWord}\\b`, 'gi');
      if (regex.test(clozeSentence)) {
        clozeSentence = clozeSentence.replace(regex, '[ ________ ]');
      } else {
        clozeSentence = `[ ________ ] : ${data.contextSentence}`;
      }
    } catch {
      clozeSentence = `[ ________ ] : ${data.contextSentence}`;
    }

    const newCard: AnkiCard = {
      id: `card-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
      deckId: targetDeckId,
      word: cleanWord,
      ipa: data.ipa || '/.../',
      pos: data.pos || 'vocabulary',
      definitionEn: data.definitionEn || cleanWord,
      definitionVi: data.definitionVi,
      clozeSentence: data.customCloze || clozeSentence,
      fullSentence: data.contextSentence,
      backExtra: data.backExtra,
      tags: data.tags,
      source: data.source,
      repetitions: 0,
      interval: 0,
      easeFactor: 2.5,
      nextReviewDate: new Date().toISOString(), // Due immediately
      status: 'new',
      createdDate: new Date().toISOString(),
    };

    setCards((prev) => [newCard, ...prev]);

    // Tự động đồng bộ lên Cơ sở dữ liệu MySQL ngầm nếu có kết nối
    saveWordToDatabaseAnki({
      word: cleanWord,
      partOfSpeech: data.pos || 'vocabulary',
      ipa: data.ipa || '',
      meaningVi: data.definitionVi,
      meaningEn: data.definitionEn || cleanWord,
      contextSentence: data.contextSentence,
      source: data.source,
      deckId: targetDeckId,
    }).catch((err) => console.warn('Sync card to MySQL failed:', err));

    return true;
  };

  const rateCard = (cardId: string, rating: AnkiRating) => {
    // Cập nhật lên CSDL MySQL ngầm
    const ratingNumericMap: Record<AnkiRating, 1 | 2 | 3 | 4> = {
      again: 1,
      hard: 2,
      good: 3,
      easy: 4,
    };
    submitAnkiReviewToDatabase(cardId, ratingNumericMap[rating]).catch((err) =>
      console.warn('Sync review to MySQL failed:', err)
    );

    setCards((prev) =>
      prev.map((c) => {
        if (c.id !== cardId) return c;
        const sm2Result = calculateSm2(c, rating);
        return {
          ...c,
          ...sm2Result,
          lastReviewedDate: new Date().toISOString(),
        };
      })
    );
  };

  const getCardsForDeck = (deckId: string): AnkiCard[] => {
    return cards.filter((c) => c.deckId === deckId);
  };

  const getDueCardsForDeck = (deckId?: string): AnkiCard[] => {
    const list = deckId ? cards.filter((c) => c.deckId === deckId) : cards;
    return list.filter((c) => isCardDue(c));
  };

  const isWordSavedInAnki = (word: string): boolean => {
    const cleanWord = word.trim().toLowerCase();
    return cards.some((c) => c.word.toLowerCase() === cleanWord);
  };

  const totalDueCount = cards.filter((c) => isCardDue(c)).length;

  return (
    <AnkiContext.Provider
      value={{
        cards,
        decks,
        activeDeckId,
        setActiveDeckId,
        addCardToPersonalDeck,
        createDeck,
        deleteDeck,
        deleteCard,
        loadSampleDecks,
        rateCard,
        getDueCardsForDeck,
        getCardsForDeck,
        isWordSavedInAnki,
        totalDueCount,
      }}
    >
      {children}
    </AnkiContext.Provider>
  );
};

export const useAnki = (): AnkiContextType => {
  const context = useContext(AnkiContext);
  if (!context) {
    throw new Error('useAnki must be used within an AnkiProvider');
  }
  return context;
};
