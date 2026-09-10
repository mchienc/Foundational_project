import { AnkiCard, AnkiDeck, AnkiRating } from '../types';
import { mockAnkiCards, mockAnkiDecks } from '../data/cambridgeMockData';

const ANKI_CARDS_STORAGE_KEY = 'eduflow_anki_cards_v1';
const ANKI_DECKS_STORAGE_KEY = 'eduflow_anki_decks_v1';

/**
 * SuperMemo-2 (SM-2) Spaced Repetition calculation
 */
export function calculateSm2(
  card: AnkiCard,
  rating: AnkiRating
): {
  repetitions: number;
  interval: number;
  easeFactor: number;
  nextReviewDate: string;
  status: AnkiCard['status'];
} {
  let { repetitions, interval, easeFactor } = card;
  let status: AnkiCard['status'] = card.status;

  switch (rating) {
    case 'again':
      repetitions = 0;
      interval = 1 / (24 * 60); // ~ 1 minute
      easeFactor = Math.max(1.3, easeFactor - 0.2);
      status = 'learning';
      break;

    case 'hard':
      if (repetitions === 0) {
        interval = 0.5; // 12 hours
      } else {
        interval = Math.max(0.5, Math.round(interval * 1.2 * 10) / 10);
      }
      easeFactor = Math.max(1.3, easeFactor - 0.15);
      status = 'learning';
      break;

    case 'good':
      if (repetitions === 0) {
        interval = 1; // 1 day
      } else if (repetitions === 1) {
        interval = 3; // 3 days
      } else {
        interval = Math.max(1, Math.round(interval * easeFactor));
      }
      repetitions += 1;
      status = repetitions >= 3 ? 'mastered' : 'review';
      break;

    case 'easy':
      if (repetitions === 0) {
        interval = 4; // 4 days
      } else {
        interval = Math.max(4, Math.round(interval * easeFactor * 1.3));
      }
      repetitions += 1;
      easeFactor += 0.15;
      status = 'mastered';
      break;
  }

  const nextDate = new Date(Date.now() + interval * 24 * 3600 * 1000);

  return {
    repetitions,
    interval,
    easeFactor: Math.round(easeFactor * 100) / 100,
    nextReviewDate: nextDate.toISOString(),
    status,
  };
}

/**
 * Compute friendly human-readable next review time for the 4 Anki buttons
 */
export function getButtonIntervalLabels(card: AnkiCard): Record<AnkiRating, string> {
  const againResult = calculateSm2(card, 'again');
  const hardResult = calculateSm2(card, 'hard');
  const goodResult = calculateSm2(card, 'good');
  const easyResult = calculateSm2(card, 'easy');

  return {
    again: formatIntervalLabel(againResult.interval),
    hard: formatIntervalLabel(hardResult.interval),
    good: formatIntervalLabel(goodResult.interval),
    easy: formatIntervalLabel(easyResult.interval),
  };
}

function formatIntervalLabel(days: number): string {
  if (days < 0.01) return '< 1m';
  if (days < 1) {
    const hours = Math.round(days * 24);
    return `${hours || 12}h`;
  }
  const roundedDays = Math.round(days);
  return `${roundedDays}d`;
}

/**
 * Check if a card is currently due for review
 */
export function isCardDue(card: AnkiCard): boolean {
  return new Date(card.nextReviewDate).getTime() <= Date.now();
}

/**
 * Load cards from LocalStorage, falling back to seed mock data
 */
export function loadCardsFromStorage(): AnkiCard[] {
  try {
    const raw = localStorage.getItem(ANKI_CARDS_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.warn('Failed to load Anki cards from LocalStorage:', err);
  }
  return mockAnkiCards;
}

/**
 * Save cards to LocalStorage
 */
export function saveCardsToStorage(cards: AnkiCard[]): void {
  try {
    localStorage.setItem(ANKI_CARDS_STORAGE_KEY, JSON.stringify(cards));
  } catch (err) {
    console.error('Failed to save Anki cards to LocalStorage:', err);
  }
}

/**
 * Load decks from LocalStorage, syncing counts with cards
 */
export function loadDecksFromStorage(cards: AnkiCard[]): AnkiDeck[] {
  let baseDecks: AnkiDeck[] = mockAnkiDecks;
  try {
    const raw = localStorage.getItem(ANKI_DECKS_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        baseDecks = parsed;
      }
    }
  } catch (err) {
    console.warn('Failed to load Anki decks from LocalStorage:', err);
  }

  // Update counts dynamically based on cards in store
  return baseDecks.map((deck) => {
    const deckCards = cards.filter((c) => c.deckId === deck.id);
    const dueTodayCount = deckCards.filter((c) => isCardDue(c)).length;
    const learningCount = deckCards.filter((c) => c.status === 'learning' || c.status === 'new').length;
    const masteredCount = deckCards.filter((c) => c.status === 'mastered').length;

    return {
      ...deck,
      totalCards: deckCards.length,
      dueTodayCount,
      learningCount,
      masteredCount,
    };
  });
}

/**
 * Save decks to LocalStorage
 */
export function saveDecksToStorage(decks: AnkiDeck[]): void {
  try {
    localStorage.setItem(ANKI_DECKS_STORAGE_KEY, JSON.stringify(decks));
  } catch (err) {
    console.error('Failed to save Anki decks to LocalStorage:', err);
  }
}

