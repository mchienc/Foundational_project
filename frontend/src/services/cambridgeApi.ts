// frontend/src/services/cambridgeApi.ts
// Service kết nối React Frontend với RESTful API Backend (MySQL Database)

import {
  CambridgeReadingPassage,
  CambridgeListeningTest,
  AnkiDeck,
} from '../types';
import {
  mockReadingPassages,
  mockListeningTests,
  mockAnkiDecks,
} from '../data/cambridgeMockData';

const API_BASE = ((import.meta as any).env?.VITE_API_URL as string) || ((import.meta as any).env?.DEV ? 'http://localhost:3000/api/cambridge' : '/api/cambridge');

// Kiểm tra trạng thái kết nối tới Cơ sở dữ liệu MySQL
export async function checkDatabaseHealth(): Promise<{
  connected: boolean;
  message: string;
}> {
  try {
    const res = await fetch(`${API_BASE}/reading`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    if (res.ok) {
      return { connected: true, message: 'Đã kết nối CSDL MySQL (online_learning)' };
    }
    return { connected: false, message: 'CSDL chưa phản hồi, sử dụng bộ nhớ đệm' };
  } catch {
    return { connected: false, message: 'Đang chạy chế độ đệm an toàn (Local Fallback)' };
  }
}

// ==================== 1. READING API ====================

// Lấy danh sách toàn bộ bài đọc từ MySQL (kèm fallback)
export async function getReadingPassages(): Promise<CambridgeReadingPassage[]> {
  try {
    const res = await fetch(`${API_BASE}/reading`);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const json = await res.json();
    if (json.success && Array.isArray(json.data) && json.data.length > 0) {
      // Kết hợp dữ liệu danh sách với chi tiết đoạn văn có sẵn nếu cần
      return json.data.map((dbPassage: any) => {
        const local = mockReadingPassages.find((p) => p.id === dbPassage.id);

        let passageNum: 1 | 2 | 3 = 1;
        if (dbPassage.id.endsWith('-p2') || dbPassage.id.includes('passage-2') || dbPassage.id.includes('p2')) passageNum = 2;
        else if (dbPassage.id.endsWith('-p3') || dbPassage.id.includes('passage-3') || dbPassage.id.includes('p3')) passageNum = 3;
        else if (local?.passageNumber) passageNum = local.passageNumber;

        let levelVal: 'Passage 1 (Cơ bản)' | 'Passage 2 (Trung cấp)' | 'Passage 3 (Nâng cao)' = 'Passage 1 (Cơ bản)';
        if (dbPassage.difficulty && dbPassage.difficulty.includes('Passage')) {
          levelVal = dbPassage.difficulty;
        } else if (passageNum === 2) {
          levelVal = 'Passage 2 (Trung cấp)';
        } else if (passageNum === 3) {
          levelVal = 'Passage 3 (Nâng cao)';
        } else if (local?.level) {
          levelVal = local.level;
        }

        let srcType: 'cambridge' | 'actual_test' = 'cambridge';
        if (dbPassage.source?.toLowerCase().includes('actual')) srcType = 'actual_test';
        if (local?.sourceType) srcType = local.sourceType;

        const qCount = dbPassage.questionCount || local?.questions?.length || 13;
        const twCount = dbPassage.targetWordCount || local?.targetWords?.length || 4;
        const offset = passageNum === 2 ? 13 : passageNum === 3 ? 26 : 0;

        const dummyQuestions = local?.questions && local.questions.length > 0 
          ? local.questions 
          : Array.from({ length: qCount }, (_, i) => ({ id: `${dbPassage.id}-q-${offset + i + 1}`, number: offset + i + 1 } as any));
        const dummyWords = local?.targetWords && local.targetWords.length > 0
          ? local.targetWords
          : Array.from({ length: twCount }, (_, i) => ({ id: `${dbPassage.id}-tw-${i + 1}`, word: 'C1-C2' } as any));

        return {
          id: dbPassage.id,
          source: dbPassage.source || local?.source || 'Cambridge IELTS',
          sourceType: srcType,
          passageNumber: passageNum,
          title: dbPassage.title,
          subtitle: dbPassage.subtitle || local?.subtitle,
          topic: dbPassage.topic,
          level: levelVal,
          estimatedMinutes: dbPassage.estimatedMinutes || 20,
          wordCount: dbPassage.wordCount || 900,
          paragraphs: local?.paragraphs || [],
          questions: dummyQuestions,
          targetWords: dummyWords,
        };
      });
    }
    return mockReadingPassages;
  } catch (err) {
    console.warn('⚠️ Không thể kết nối API Reading, sử dụng mockData:', err);
    return mockReadingPassages;
  }
}

// Lấy chi tiết bài đọc (đầy đủ 13-14 câu hỏi, đoạn văn, từ vựng) từ MySQL
export async function getReadingPassageById(id: string): Promise<CambridgeReadingPassage> {
  try {
    const res = await fetch(`${API_BASE}/reading/${id}`);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const json = await res.json();
    if (json.success && json.data) {
      const p = json.data;
      const local = mockReadingPassages.find((m) => m.id === id);

      let passageNum: 1 | 2 | 3 = 1;
      if (p.id.endsWith('-p2') || p.id.includes('passage-2') || p.id.includes('p2')) passageNum = 2;
      else if (p.id.endsWith('-p3') || p.id.includes('passage-3') || p.id.includes('p3')) passageNum = 3;
      else if (local?.passageNumber) passageNum = local.passageNumber;

      let levelVal: 'Passage 1 (Cơ bản)' | 'Passage 2 (Trung cấp)' | 'Passage 3 (Nâng cao)' = 'Passage 1 (Cơ bản)';
      if (p.difficulty && p.difficulty.includes('Passage')) {
        levelVal = p.difficulty;
      } else if (passageNum === 2) {
        levelVal = 'Passage 2 (Trung cấp)';
      } else if (passageNum === 3) {
        levelVal = 'Passage 3 (Nâng cao)';
      } else if (local?.level) {
        levelVal = local.level;
      }

      let srcType: 'cambridge' | 'actual_test' = 'cambridge';
      if (p.source?.toLowerCase().includes('actual')) srcType = 'actual_test';
      if (local?.sourceType) srcType = local.sourceType;

      return {
        id: p.id,
        source: p.source,
        sourceType: srcType,
        passageNumber: passageNum,
        title: p.title,
        subtitle: p.subtitle,
        topic: p.topic,
        level: levelVal,
        estimatedMinutes: p.estimatedMinutes,
        wordCount: p.wordCount,
        paragraphs: (p.paragraphs || []).map((par: any) => ({
          letter: par.label || par.letter || 'A',
          text: par.content || par.text || '',
        })),
        questions: (p.questions || []).map((q: any) => {
          let normalizedOptions = undefined;
          if (q.options && Array.isArray(q.options)) {
            normalizedOptions = q.options.map((opt: any, optIdx: number) => {
              if (typeof opt === 'string') {
                const optTrimmed = opt.trim();
                if (['TRUE', 'FALSE', 'NOT GIVEN', 'YES', 'NO'].includes(optTrimmed.toUpperCase())) {
                  return {
                    id: `${q.id}-opt-${optTrimmed.toLowerCase()}`,
                    label: optTrimmed.toUpperCase(),
                    text: optTrimmed.toUpperCase(),
                  };
                }
                const match = optTrimmed.match(/^([A-E])\.\s*(.*)$/);
                if (match) {
                  return {
                    id: `${q.id}-opt-${match[1]}`,
                    label: match[1],
                    text: match[2],
                  };
                }
                const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
                return {
                  id: `${q.id}-opt-${optIdx}`,
                  label: letters[optIdx] || String(optIdx + 1),
                  text: optTrimmed,
                };
              }
              return opt;
            });
          }

          return {
            id: q.id,
            number: q.number,
            type: q.type,
            groupHeader: q.groupHeader,
            groupInstruction: q.groupInstruction,
            question: q.prompt || q.question,
            options: normalizedOptions,
            correctAnswer: q.correctAnswer,
            acceptableAnswers: q.acceptableAnswers || [],
            explanation: q.academicExplanation || q.explanation,
            referenceParagraph: q.paragraphRef || q.referenceParagraph,
          };
        }),
        targetWords: (p.targetWords || []).map((tw: any) => ({
          id: tw.id,
          word: tw.word,
          partOfSpeech: tw.partOfSpeech,
          ipa: tw.ipa,
          definitionVi: tw.meaningVi || tw.definitionVi,
          definitionEn: tw.meaningEn || tw.definitionEn,
          collocations: tw.collocations || [],
          contextSentence: tw.contextSentence,
          explanation: tw.meaningVi || '',
        })),
      };
    }
    return mockReadingPassages.find((p) => p.id === id) || mockReadingPassages[0];
  } catch (err) {
    console.warn(`⚠️ Lỗi lấy bài đọc ${id} từ API, fallback sang mockData:`, err);
    return mockReadingPassages.find((p) => p.id === id) || mockReadingPassages[0];
  }
}

// Chấm điểm bài thi ngầm ở server và lưu vào CSDL
export async function submitReadingExamToDatabase(
  passageId: string,
  userAnswers: Record<string, string>,
  timeTakenSeconds: number
): Promise<{
  correctCount: number;
  totalCount: number;
  bandScore: number;
  percentage: number;
  xpEarned: number;
} | null> {
  try {
    const res = await fetch(`${API_BASE}/reading/${passageId}/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userAnswers, timeTakenSeconds }),
    });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const json = await res.json();
    if (json.success && json.data) {
      return json.data;
    }
    return null;
  } catch (err) {
    console.warn('⚠️ Lỗi gửi bài thi lên server MySQL:', err);
    return null;
  }
}

// ==================== 2. LISTENING API ====================

// Lấy danh sách toàn bộ bài nghe từ MySQL
export async function getListeningTests(): Promise<CambridgeListeningTest[]> {
  try {
    const res = await fetch(`${API_BASE}/listening`);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const json = await res.json();
    if (json.success && Array.isArray(json.data) && json.data.length > 0) {
      return json.data.map((dbTest: any) => {
        const local = mockListeningTests.find((t) => t.id === dbTest.id);
        return {
          id: dbTest.id,
          title: dbTest.title,
          source: dbTest.source,
          part: dbTest.part,
          partLabel: local?.partLabel || `Part ${dbTest.part}: Luyện Nghe Học Thuật`,
          topic: local?.topic || 'Academic Topic',
          speaker: local?.speaker || 'Senior Speaker',
          wpm: dbTest.wpm || 145,
          accent: (dbTest.speakerAccent || 'British') as any,
          phoneticFocus: dbTest.instructions || local?.phoneticFocus || '',
          totalSentences: dbTest.sentenceCount || local?.totalSentences || 5,
          sentences: local?.sentences || [],
        };
      });
    }
    return mockListeningTests;
  } catch (err) {
    console.warn('⚠️ Lỗi lấy danh sách Listening từ API, fallback sang mockData:', err);
    return mockListeningTests;
  }
}

// ==================== 3. ANKI SRS API ====================

// Lấy danh sách các bộ bài Anki Decks
export async function getAnkiDecks(): Promise<AnkiDeck[]> {
  try {
    const res = await fetch(`${API_BASE}/anki/decks`);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const json = await res.json();
    if (json.success && Array.isArray(json.data) && json.data.length > 0) {
      return json.data.map((d: any) => {
        const local = mockAnkiDecks.find((m) => m.id === d.id);
        return {
          id: d.id,
          title: d.name || local?.title || 'Anki Deck',
          description: d.description || local?.description || '',
          category: local?.category || 'Cambridge Vocabulary',
          isPersonal: d.id === 'deck-personal',
          totalCards: Number(d.totalCards) || local?.totalCards || 0,
          dueTodayCount: Number(d.dueCount) || local?.dueTodayCount || 0,
          learningCount: Number(d.learningCount) || local?.learningCount || 0,
          masteredCount: Number(d.masteredCount) || local?.masteredCount || 0,
          iconName: local?.iconName || 'BookOpen',
        };
      });
    }
    return mockAnkiDecks;
  } catch (err) {
    console.warn('⚠️ Lỗi lấy Anki Decks từ API, fallback sang mockData:', err);
    return mockAnkiDecks;
  }
}

// Lưu 1 thẻ mới vào Deck Cá Nhân trên MySQL
export async function saveWordToDatabaseAnki(card: {
  word: string;
  partOfSpeech: string;
  ipa: string;
  meaningVi: string;
  meaningEn: string;
  contextSentence: string;
  source: string;
  deckId?: string;
}): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE}/anki/cards`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(card),
    });
    const json = await res.json();
    return !!json.success;
  } catch (err) {
    console.warn('⚠️ Lỗi lưu thẻ Anki vào MySQL:', err);
    return false;
  }
}

// Cập nhật tiến độ SM-2 sau khi học viên bấm 1, 2, 3, 4
export async function submitAnkiReviewToDatabase(
  cardId: string,
  rating: 1 | 2 | 3 | 4
): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE}/anki/cards/${cardId}/review`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ rating }),
    });
    const json = await res.json();
    return !!json.success;
  } catch (err) {
    console.warn('⚠️ Lỗi cập nhật SM-2 lên MySQL:', err);
    return false;
  }
}
