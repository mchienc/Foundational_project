// frontend/src/modules/dictation/diffEngine.ts
// Thuật toán So Khớp Chính Tả Quy Hoạch Động (LCS + Levenshtein Distance <= 1) & Bộ Phân Tích Phụ Đề

import { DiffCheckResult, DictationSentence, WordDiffItem } from './types';

// Bảng quy đổi các từ viết tắt & chữ số phổ biến để không chấm sai oan học viên
const CONTRACTION_MAP: Record<string, string> = {
  "don't": 'do not',
  "doesn't": 'does not',
  "didn't": 'did not',
  "can't": 'cannot',
  "won't": 'will not',
  "isn't": 'is not',
  "aren't": 'are not',
  "wasn't": 'was not',
  "weren't": 'were not',
  "haven't": 'have not',
  "hasn't": 'has not',
  "hadn't": 'had not',
  "wouldn't": 'would not',
  "couldn't": 'could not',
  "shouldn't": 'should not',
  "i'm": 'i am',
  "you're": 'you are',
  "we're": 'we are',
  "they're": 'they are',
  "it's": 'it is',
  "that's": 'that is',
  "there's": 'there is',
  "what's": 'what is',
  "who's": 'who is',
  "i've": 'i have',
  "you've": 'you have',
  "we've": 'we have',
  "they've": 'they have',
  "i'll": 'i will',
  "you'll": 'you will',
  "we'll": 'we will',
  "they'll": 'they will',
  "i'd": 'i would',
  "you'd": 'you would',
  "we'd": 'we would',
  "they'd": 'they would',
};

const NUMBER_EQUIVALENTS: Record<string, string> = {
  '1': 'one',
  '2': 'two',
  '3': 'three',
  '4': 'four',
  '5': 'five',
  '6': 'six',
  '7': 'seven',
  '8': 'eight',
  '9': 'nine',
  '10': 'ten',
  '20': 'twenty',
  '30': 'thirty',
  '40': 'forty',
  '50': 'fifty',
  '100': 'one hundred',
};

// Làm sạch dấu câu đầu/cuối của một từ nhưng giữ lại từ gốc để hiển thị
export function cleanSingleWord(word: string): string {
  const normalized = word
    .toLowerCase()
    .replace(/[’‘]/g, "'")
    .replace(/^[^a-z0-9']+|[^a-z0-9']+$/gi, '')
    .replace(/['"]/g, '');

  return NUMBER_EQUIVALENTS[normalized] || normalized;
}

// Chuẩn hóa chuỗi văn bản thành mảng từ (mở rộng cả từ viết tắt nếu cần)
function tokenizeAndExpand(text: string): { displayWords: string[]; cleanWords: string[] } {
  // Chuẩn hóa dấu nháy đơn thông minh
  let processed = text.trim().replace(/[’‘]/g, "'");

  // Mở rộng các từ viết tắt phổ biến để "don't" khớp với "do not"
  Object.entries(CONTRACTION_MAP).forEach(([shortForm, expandedForm]) => {
    const regex = new RegExp(`\\b${shortForm}\\b`, 'gi');
    processed = processed.replace(regex, expandedForm);
  });

  const rawTokens = processed
    .replace(/[—–-]/g, ' ')
    .split(/\s+/)
    .filter(Boolean);

  const displayWords: string[] = [];
  const cleanWords: string[] = [];

  for (const token of rawTokens) {
    const cleaned = cleanSingleWord(token);
    if (cleaned.length > 0) {
      // Nếu là số nhiều chữ (vd '100' -> 'one hundred'), tách thành các từ đơn
      if (cleaned.includes(' ')) {
        const subParts = cleaned.split(/\s+/);
        for (const sp of subParts) {
          displayWords.push(sp);
          cleanWords.push(sp);
        }
      } else {
        displayWords.push(token);
        cleanWords.push(cleaned);
      }
    }
  }

  return { displayWords, cleanWords };
}

// Tính khoảng cách Levenshtein an toàn (Dùng Array.from thay vì .split(''))
export function calculateLevenshtein(a: string, b: string): number {
  if (a === b) return 0;
  const charsA = Array.from(a);
  const charsB = Array.from(b);
  const m = charsA.length;
  const n = charsB.length;

  if (m === 0) return n;
  if (n === 0) return m;

  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = charsA[i - 1] === charsB[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,      // xóa
        dp[i][j - 1] + 1,      // chèn
        dp[i - 1][j - 1] + cost // thay thế
      );
    }
  }

  return dp[m][n];
}

// Kiểm tra 2 từ có khớp hoàn toàn hoặc lỗi chính tả nhẹ (Levenshtein <= 1) hay không
function compareWords(userClean: string, targetClean: string): {
  matchType: 'exact' | 'typo' | 'none';
  distance: number;
} {
  if (!userClean || !targetClean) return { matchType: 'none', distance: 99 };
  if (userClean === targetClean) return { matchType: 'exact', distance: 0 };

  const dist = calculateLevenshtein(userClean, targetClean);
  // Chỉ tính là lỗi chính tả nhẹ (typo) khi từ mục tiêu dài từ 4 ký tự trở lên và khoảng cách <= 1
  if (targetClean.length >= 4 && dist <= 1) {
    return { matchType: 'typo', distance: dist };
  }

  return { matchType: 'none', distance: dist };
}

/**
 * Thuật toán So Khớp Chính Tả Quy Hoạch Động (LCS Alignment + Levenshtein)
 * Giúp học viên nếu gõ thiếu 1 từ ở giữa câu thì các từ đúng phía sau vẫn được tính điểm chính xác.
 */
export function evaluateDictationDiff(userInput: string, targetSentence: string): DiffCheckResult {
  const targetTokens = tokenizeAndExpand(targetSentence);
  const userTokens = tokenizeAndExpand(userInput);

  const T = targetTokens.cleanWords.length;
  const U = userTokens.cleanWords.length;

  if (T === 0) {
    return {
      items: [],
      extraWrongWords: [],
      accuracy: 100,
      correctCount: 0,
      typoCount: 0,
      totalWords: 0,
      isPassed: true,
    };
  }

  // Ma trận quy hoạch động LCS có trọng số (Exact match = 2 điểm, Typo match = 1.5 điểm)
  const dp: number[][] = Array.from({ length: T + 1 }, () => Array(U + 1).fill(0));

  for (let i = 1; i <= T; i++) {
    for (let j = 1; j <= U; j++) {
      const cmp = compareWords(userTokens.cleanWords[j - 1], targetTokens.cleanWords[i - 1]);
      let matchScore = 0;
      if (cmp.matchType === 'exact') matchScore = 2;
      else if (cmp.matchType === 'typo') matchScore = 1.5;

      if (matchScore > 0) {
        dp[i][j] = Math.max(dp[i - 1][j - 1] + matchScore, dp[i - 1][j], dp[i][j - 1]);
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  // Truy vết (Backtrack) để căn chỉnh từng từ trong câu mục tiêu
  let i = T;
  let j = U;
  const matchedTargetMap = new Map<number, { userIndex: number; matchType: 'exact' | 'typo'; distance: number }>();
  const usedUserIndices = new Set<number>();

  while (i > 0 && j > 0) {
    const cmp = compareWords(userTokens.cleanWords[j - 1], targetTokens.cleanWords[i - 1]);
    const score = cmp.matchType === 'exact' ? 2 : cmp.matchType === 'typo' ? 1.5 : 0;

    if (score > 0 && Math.abs(dp[i][j] - (dp[i - 1][j - 1] + score)) < 0.01) {
      matchedTargetMap.set(i - 1, {
        userIndex: j - 1,
        matchType: cmp.matchType as 'exact' | 'typo',
        distance: cmp.distance,
      });
      usedUserIndices.add(j - 1);
      i--;
      j--;
    } else if (dp[i - 1][j] >= dp[i][j - 1]) {
      i--;
    } else {
      j--;
    }
  }

  const items: WordDiffItem[] = [];
  let correctCount = 0;
  let typoCount = 0;

  for (let idx = 0; idx < T; idx++) {
    const targetDisplay = targetTokens.displayWords[idx];
    const matchInfo = matchedTargetMap.get(idx);

    if (matchInfo) {
      if (matchInfo.matchType === 'exact') {
        correctCount++;
        items.push({
          word: targetDisplay,
          targetWord: targetDisplay,
          status: 'correct',
          distance: 0,
        });
      } else {
        typoCount++;
        items.push({
          word: userTokens.displayWords[matchInfo.userIndex],
          targetWord: targetDisplay,
          status: 'typo',
          distance: matchInfo.distance,
        });
      }
    } else {
      items.push({
        word: targetDisplay,
        targetWord: targetDisplay,
        status: 'missing',
      });
    }
  }

  // Tìm các từ học viên gõ dư/sai hoàn toàn không khớp vào đâu
  const extraWrongWords: string[] = [];
  for (let uIdx = 0; uIdx < U; uIdx++) {
    if (!usedUserIndices.has(uIdx)) {
      extraWrongWords.push(userTokens.displayWords[uIdx]);
    }
  }

  // Công thức tính độ chính xác chuẩn xác:
  // Accuracy (%) = ((Số từ đúng + 0.5 * Số từ lỗi nhẹ) / Tổng số từ của câu) * 100%
  const rawAccuracy = ((correctCount + typoCount * 0.5) / T) * 100;
  const accuracy = Math.min(100, Math.max(0, Math.round(rawAccuracy)));

  return {
    items,
    extraWrongWords,
    accuracy,
    correctCount,
    typoCount,
    totalWords: T,
    isPassed: accuracy >= 90,
  };
}

/**
 * Trích xuất YouTube Video ID từ mọi định dạng URL phổ biến:
 * - https://www.youtube.com/watch?v=VIDEO_ID&t=12s
 * - https://youtu.be/VIDEO_ID?si=...
 * - https://www.youtube.com/embed/VIDEO_ID
 * - https://www.youtube.com/shorts/VIDEO_ID
 */
export function extractYouTubeVideoId(inputUrl: string): string | null {
  const trimmed = inputUrl.trim();
  if (!trimmed) return null;

  // Nếu người dùng nhập trực tiếp 11 ký tự ID
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
    return trimmed;
  }

  const regex =
    /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?|shorts)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = trimmed.match(regex);
  return match ? match[1] : null;
}

// Chuyển đổi chuỗi thời gian "01:25" hoặc "00:01:25.400" sang số giây
function parseTimeStringToSeconds(timeStr: string): number {
  const clean = timeStr.trim().replace(',', '.');
  const parts = clean.split(':').map(Number);
  if (parts.some(isNaN)) return 0;

  if (parts.length === 3) {
    return parts[0] * 3600 + parts[1] * 60 + parts[2];
  }
  if (parts.length === 2) {
    return parts[0] * 60 + parts[1];
  }
  return parts[0] || 0;
}

/**
 * Phân tích kịch bản phụ đề do người dùng dán hoặc tải lên:
 * Hỗ trợ 4 định dạng:
 * 1. JSON Array chuẩn [{ start, end, text }]
 * 2. Dạng dòng timestamp: "00:12 - 00:18: Sentence text" hoặc "[00:12] Sentence text"
 * 3. Định dạng phụ đề chuẩn WebVTT / SRT ("00:00:12,000 --> 00:00:18,000")
 * 4. Văn bản thuần (Plain text): Tự động tách theo dấu chấm câu và ước lượng thời gian đọc
 */
export function parseCustomTranscriptInput(rawInput: string): DictationSentence[] {
  const text = rawInput.trim();
  if (!text) return [];

  // 1. Thử parse JSON nếu bắt đầu bằng '['
  if (text.startsWith('[')) {
    try {
      const parsed = JSON.parse(text);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed.map((item, idx) => ({
          id: idx + 1,
          start: Number(item.start ?? idx * 6),
          end: Number(item.end ?? (Number(item.start ?? idx * 6) + 5)),
          text: String(item.text || '').trim(),
          translationVi: item.translationVi ? String(item.translationVi) : undefined,
        })).filter((s) => s.text.length > 0);
      }
    } catch {
      // Tiếp tục thử các định dạng text bên dưới
    }
  }

  // 2. Kiểm tra định dạng WebVTT / SRT (chứa mũi tên "-->")
  if (text.includes('-->')) {
    const blocks = text
      .replace(/^WEBVTT.*$/gim, '')
      .trim()
      .split(/\r?\n\r?\n+/);

    const vttSentences: DictationSentence[] = [];
    for (const block of blocks) {
      const lines = block.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
      const arrowLineIdx = lines.findIndex((l) => l.includes('-->'));
      if (arrowLineIdx !== -1) {
        const timeLine = lines[arrowLineIdx];
        const [startRaw, endRaw] = timeLine.split('-->');
        const startSec = Math.round(parseTimeStringToSeconds(startRaw) * 10) / 10;
        const endSec = Math.round(parseTimeStringToSeconds(endRaw.split(/\s+/)[0]) * 10) / 10;
        const contentLines = lines.slice(arrowLineIdx + 1).join(' ').replace(/<[^>]+>/g, '').trim();

        if (contentLines) {
          vttSentences.push({
            id: vttSentences.length + 1,
            start: startSec,
            end: Math.max(endSec, startSec + 1.5),
            text: contentLines,
          });
        }
      }
    }
    if (vttSentences.length > 0) {
      // Tự động gộp các dòng phụ đề ngắn của VTT/SRT thành câu dài chuẩn (12-25 từ)
      const mergedVtt: DictationSentence[] = [];
      let curText = '';
      let curStart: number | null = null;
      let curEnd = 0;

      for (const cue of vttSentences) {
        if (curStart === null) curStart = cue.start;
        curEnd = cue.end;
        curText = curText ? `${curText} ${cue.text}` : cue.text;

        const wc = curText.split(/\s+/).length;
        const endsWithPunct = /[.?!]["']?$/.test(cue.text);
        const dur = curEnd - curStart;

        if ((endsWithPunct && wc >= 12 && dur >= 5.5) || wc >= 24 || dur >= 14) {
          mergedVtt.push({
            id: mergedVtt.length + 1,
            start: Number(curStart.toFixed(1)),
            end: Number(curEnd.toFixed(1)),
            text: curText.replace(/\s+/g, ' ').trim(),
          });
          curText = '';
          curStart = null;
        }
      }
      if (curText && curStart !== null) {
        mergedVtt.push({
          id: mergedVtt.length + 1,
          start: Number(curStart.toFixed(1)),
          end: Number(curEnd.toFixed(1)),
          text: curText.replace(/\s+/g, ' ').trim(),
        });
      }
      return mergedVtt;
    }
  }

  // 3. Kiểm tra định dạng "00:12 - 00:18: Sentence text" trên từng dòng
  const lines = text.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
  const timestampedSentences: DictationSentence[] = [];
  const lineRegex = /^\[?(\d{1,2}:\d{2}(?::\d{2})?)\]?\s*(?:[-–—>to]+\s*\[?(\d{1,2}:\d{2}(?::\d{2})?)\]?)?\s*[:|-]?\s*(.+)$/i;

  for (const line of lines) {
    const match = line.match(lineRegex);
    if (match) {
      const startSec = parseTimeStringToSeconds(match[1]);
      const sentenceText = match[3].trim();
      const wordCount = sentenceText.split(/\s+/).length;
      const estimatedDur = Math.max(3, Math.ceil(wordCount * 0.45));
      const endSec = match[2] ? parseTimeStringToSeconds(match[2]) : startSec + estimatedDur;

      if (sentenceText) {
        timestampedSentences.push({
          id: timestampedSentences.length + 1,
          start: startSec,
          end: Math.max(endSec, startSec + 2),
          text: sentenceText,
        });
      }
    }
  }

  if (timestampedSentences.length > 0) {
    return timestampedSentences;
  }

  // 4. Heuristic / Smart Sentence Splitter cho đoạn văn bản thuần
  const rawSentences = text
    .split(/(?<=[.?!])\s+/)
    .map((s) => s.trim())
    .filter((s) => s.length >= 3);

  let currentClock = 5; // Bắt đầu từ giây thứ 5 sau phần intro
  return rawSentences.map((sentence, idx) => {
    const words = sentence.split(/\s+/).length;
    const duration = Math.max(4, Math.min(10, Math.ceil(words * 0.48)));
    const item: DictationSentence = {
      id: idx + 1,
      start: currentClock,
      end: currentClock + duration,
      text: sentence,
    };
    currentClock += duration + 1;
    return item;
  });
}

/**
 * Gộp danh sách câu theo hệ số độ dài đoạn chép (1 = Chuẩn, 2 = Gộp 2 câu dài, 3 = Gộp 3 câu thành đoạn văn)
 */
export function mergeSentencesByChunkSize(
  sentences: DictationSentence[],
  chunkSize: 1 | 2 | 3
): DictationSentence[] {
  if (chunkSize === 1 || sentences.length === 0) return sentences;
  const grouped: DictationSentence[] = [];
  for (let i = 0; i < sentences.length; i += chunkSize) {
    const slice = sentences.slice(i, i + chunkSize);
    if (slice.length === 0) continue;
    grouped.push({
      id: grouped.length + 1,
      start: slice[0].start,
      end: slice[slice.length - 1].end,
      text: slice.map((s) => s.text).join(' '),
      translationVi: slice
        .map((s) => s.translationVi)
        .filter(Boolean)
        .join(' ') || undefined,
    });
  }
  return grouped;
}
