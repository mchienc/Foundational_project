import { AnkiCard, AnkiDeck, AnkiRating } from '../types';
import { mockAnkiCards, mockAnkiDecks } from '../data/cambridgeMockData';

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
 * Default clean initial deck for a user
 */
export const getDefaultUserDecks = (): AnkiDeck[] => [
  {
    id: 'deck-personal',
    title: 'Deck Cá Nhân (Từ Vựng Đã Lưu)',
    description: 'Tập hợp từ vựng bạn đã lưu từ bài đọc Cambridge và bài tập chép chính tả',
    category: 'CÁ NHÂN HÓA',
    isPersonal: true,
    totalCards: 0,
    dueTodayCount: 0,
    learningCount: 0,
    masteredCount: 0,
    iconName: 'Bookmark',
  },
];

/**
 * Load cards for a specific user from LocalStorage.
 * New users start with an empty card set (0 cards).
 */
export function loadUserCardsFromStorage(userKey: string = 'guest'): AnkiCard[] {
  try {
    const raw = localStorage.getItem(`eduflow_anki_cards_${userKey}`);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
  } catch (err) {
    console.warn(`Failed to load Anki cards for user ${userKey}:`, err);
  }
  return [];
}

/**
 * Save cards for a specific user to LocalStorage
 */
export function saveUserCardsToStorage(userKey: string = 'guest', cards: AnkiCard[]): void {
  try {
    localStorage.setItem(`eduflow_anki_cards_${userKey}`, JSON.stringify(cards));
  } catch (err) {
    console.error(`Failed to save Anki cards for user ${userKey}:`, err);
  }
}

/**
 * Load decks for a specific user, syncing counts with current cards
 */
export function loadUserDecksFromStorage(userKey: string = 'guest', cards: AnkiCard[]): AnkiDeck[] {
  let baseDecks: AnkiDeck[] = getDefaultUserDecks();
  try {
    const raw = localStorage.getItem(`eduflow_anki_decks_${userKey}`);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        baseDecks = parsed;
      }
    }
  } catch (err) {
    console.warn(`Failed to load Anki decks for user ${userKey}:`, err);
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
 * Save decks for a specific user to LocalStorage
 */
export function saveUserDecksToStorage(userKey: string = 'guest', decks: AnkiDeck[]): void {
  try {
    localStorage.setItem(`eduflow_anki_decks_${userKey}`, JSON.stringify(decks));
  } catch (err) {
    console.error(`Failed to save Anki decks for user ${userKey}:`, err);
  }
}

// Backward compatible aliases
export function loadCardsFromStorage(): AnkiCard[] {
  return loadUserCardsFromStorage('guest');
}

export function saveCardsToStorage(cards: AnkiCard[]): void {
  saveUserCardsToStorage('guest', cards);
}

export function loadDecksFromStorage(cards: AnkiCard[]): AnkiDeck[] {
  return loadUserDecksFromStorage('guest', cards);
}

export function saveDecksToStorage(decks: AnkiDeck[]): void {
  saveUserDecksToStorage('guest', decks);
}

export { mockAnkiCards, mockAnkiDecks };
