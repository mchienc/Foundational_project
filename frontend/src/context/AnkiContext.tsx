import React, { createContext, useContext, useState, useEffect } from 'react';
import { AnkiCard, AnkiDeck, AnkiRating } from '../types';
import {
  loadCardsFromStorage,
  saveCardsToStorage,
  loadDecksFromStorage,
  saveDecksToStorage,
  calculateSm2,
  isCardDue,
} from '../store/ankiStore';
import {
  saveWordToDatabaseAnki,
  submitAnkiReviewToDatabase,
} from '../services/cambridgeApi';

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
  }) => boolean;
  rateCard: (cardId: string, rating: AnkiRating) => void;
  getDueCardsForDeck: (deckId?: string) => AnkiCard[];
  getCardsForDeck: (deckId: string) => AnkiCard[];
  isWordSavedInAnki: (word: string) => boolean;
  totalDueCount: number;
}

const AnkiContext = createContext<AnkiContextType | undefined>(undefined);

export const AnkiProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cards, setCards] = useState<AnkiCard[]>(() => loadCardsFromStorage());
  const [decks, setDecks] = useState<AnkiDeck[]>(() => loadDecksFromStorage(loadCardsFromStorage()));
  const [activeDeckId, setActiveDeckId] = useState<string | null>(null);

  // Sync decks and persist when cards change
  useEffect(() => {
    saveCardsToStorage(cards);
    const updatedDecks = loadDecksFromStorage(cards);
    setDecks(updatedDecks);
    saveDecksToStorage(updatedDecks);
  }, [cards]);

  const addCardToPersonalDeck = (data: {
    word: string;
    ipa?: string;
    pos?: string;
    definitionEn?: string;
    definitionVi: string;
    contextSentence: string;
    source: string;
  }): boolean => {
    const cleanWord = data.word.trim();
    if (!cleanWord) return false;

    // Check if already in personal deck
    const existing = cards.find(
      (c) => c.deckId === 'deck-personal' && c.word.toLowerCase() === cleanWord.toLowerCase()
    );
    if (existing) return false;

    // Mask the target word in the sentence for the cloze prompt
    // Use regex word boundary or literal replacement
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
      deckId: 'deck-personal',
      word: cleanWord,
      ipa: data.ipa || '/.../',
      pos: data.pos || 'vocabulary',
      definitionEn: data.definitionEn || cleanWord,
      definitionVi: data.definitionVi,
      clozeSentence,
      fullSentence: data.contextSentence,
      source: data.source,
      repetitions: 0,
      interval: 0,
      easeFactor: 2.5,
      nextReviewDate: new Date().toISOString(), // Due immediately
      status: 'new',
      createdDate: new Date().toISOString(),
    };

    setCards((prev) => [newCard, ...prev]);

    // Tự động đồng bộ lên Cơ sở dữ liệu MySQL
    saveWordToDatabaseAnki({
      word: cleanWord,
      partOfSpeech: data.pos || 'vocabulary',
      ipa: data.ipa || '',
      meaningVi: data.definitionVi,
      meaningEn: data.definitionEn || cleanWord,
      contextSentence: data.contextSentence,
      source: data.source,
      deckId: 'deck-personal',
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

