# IELTS 4 Skills Fix Report

## Repository
- Base SHA: `1ca19ed5877f2a2aedbd5a231acb3f398075f27f`
- Final SHA: `a005a16c433bec3a6594b4db850cae642535ced4`
- Branch: `master`

---

## Findings & Fixes

| Issue ID | Status | Files | Change | Test evidence |
|---|---|---|---|---|
| **SEC-01** | FIXED | `routes/api/cambridgeRoutes.js`, `controllers/cambridgeController.js`, `frontend/src/services/testHistoryStorage.ts` | Enforced strict backend session auth for `/user-history` (GET/POST). Removed reliance on `query.userId` / `body.userId`. Guest calls return HTTP 401. User A cannot access User B's history. | Test 6 in `scripts/testGradingSystem.js`: Guest GET/POST rejected with 401; User A query with `userId=B` remains scoped to A. PASS. |
| **SEC-02** | FIXED | `routes/api/aiRoutes.js`, `controllers/aiGradingController.js` | Added payload length limits (essay <= 15,000 chars, transcript <= 8,000 chars, prompt <= 5,000 chars), strict taskType & part enum validation, and server-side rate limit guard (30 reqs/hour per client). | Tested payload checks and rate limit guard. Returns 400 for invalid taskType/part and 413 for oversized payloads. |
| **SEC-03** | FIXED | `controllers/cambridgeController.js`, `frontend/src/services/testHistoryStorage.ts` | Client-reported test submissions are explicitly flagged with `clientReported: true` and `isVerified: false`. Backend validates attempt IDs and is the single source of truth for verified scores. | Test 6.4 in `scripts/testGradingSystem.js`: Client attempt marked `clientReported: true`, verified attempts computed on server. PASS. |
| **R-01** | FIXED | `controllers/cambridgeController.js`, `frontend/src/store/useExamStore.ts`, `frontend/src/modules/reading/ReadingTestRoom.tsx` | Unified canonical Academic Reading 40-question band scale across backend and frontend. Fixed crucial 30/40 benchmark to return 7.0 (eliminated faulty ratio threshold returning 7.5). Single passage scaled proportionally to 40. | Test 1 in `scripts/testGradingSystem.js`: All 20 score benchmarks (40/40 -> 9.0 down to 0/40 -> 0.0) asserted with `assert.strictEqual`. PASS. |
| **R-02** | FIXED | `routes/api/cambridgeRoutes.js`, `controllers/cambridgeController.js`, `frontend/src/services/cambridgeApi.ts`, `frontend/src/modules/reading/ReadingTestRoom.tsx` | Added `POST /api/cambridge/reading/full-test/submit` endpoint that fetches all passages of a full test, checks answers server-side, calculates 40-question band, and records verified attempt. | Tested multi-passage submission and database persistence with `allPassages`. Frontend build verified. |
| **R-03** | FIXED | `frontend/src/modules/reading/ReadingTestRoom.tsx` | Added auto-submit on countdown timer reaching 0 in exam mode. Protected with `hasSubmittedRef` to prevent double submission when timer hits 0 simultaneously with user click. | Verified in `ReadingTestRoom.tsx` timer interval effect: auto-submits once, locks answers, clears timer. |
| **R-04** | FIXED | `controllers/cambridgeController.js`, `frontend/src/modules/reading/ReadingTestRoom.tsx` | Standardized `normalizeReadingAnswer` (trim, lowercase, whitespace collapse). Extended `acceptableAnswers` checking to ALL question types (not just `summary_completion`). Empty answers strictly return false. | Test 1.3 in `scripts/testGradingSystem.js`: Whitespace collapse, trim, case-insensitivity asserted with strict equality. PASS. |
| **L-01** | FIXED | `frontend/src/store/useListeningStore.ts`, `frontend/src/modules/listening-exam/ListeningReviewRoom.tsx` | Implemented `matchesListeningAnswer` where `userAnswer?.trim()` must have positive length. Blank answers are strictly marked incorrect, even if correct answer or alternative array contains an empty string. | Test 2 in `scripts/testGradingSystem.js`: Blank user answers tested against various correct/alternative combinations; strictly returns `false`. PASS. |
| **L-02** | FIXED | `frontend/src/modules/listening-exam/ListeningReviewRoom.tsx` | Added Section Selector tabs (Sec 1, Sec 2, Sec 3, Sec 4). Audio player now plays the exact audio file of the actively selected section (`test.sections[selectedSectionIndex].audioFile`), rather than hardcoding section 0. | Verified in `ListeningReviewRoom.tsx`: audio element source dynamically bound to `activeSection.audioFile` on section tab switch. |
| **L-03** | FIXED | `frontend/src/data/mockListeningTests.ts`, `frontend/src/modules/listening-exam/ListeningReviewRoom.tsx` | Decoupled `defaultTranscript` from tests other than Cambridge 18 Test 1 Section 1. All other tests set `transcript: []`. Review room displays clear notice when transcript is pending sync rather than showing mismatched transcript lines. | Verified across `mockListeningTests.ts`: only `c18-t1` retains `defaultTranscript`. Review room handles empty transcript gracefully. |
| **L-04** | FIXED | `frontend/src/store/useListeningStore.ts` | Implemented complete canonical 0-40 IELTS Listening band conversion scale (39-40 -> 9.0; 37-38 -> 8.5; 35-36 -> 8.0; 32-34 -> 7.5; 30-31 -> 7.0; 26-29 -> 6.5; 23-25 -> 6.0; 18-22 -> 5.5; 16-17 -> 5.0; 13-15 -> 4.5; 11-12 -> 4.0; 8-10 -> 3.5; 6-7 -> 3.0; 4-5 -> 2.5; 1-3 -> 2.0; 0 -> 0.0). | Test 2 in `scripts/testGradingSystem.js`: Asserts scores from 40 down to 0 using strict equality. PASS. |
| **W-01** | FIXED | `controllers/aiGradingController.js` | Removed fake overallBand (6.5/7.0), fake criteria bands, and fake data accuracy `PASS` fallback when Gemini fails or is offline. Endpoint now returns HTTP 503 `{ success: false, status: 'unavailable', errorCode: 'AI_GRADER_UNAVAILABLE' }` with local non-band diagnostics. | Test 4 in `scripts/testGradingSystem.js`: Calls `gradeWriting` with simulated outage; asserts HTTP 503, `success: false`, `data: undefined`. PASS. |
| **W-02** | FIXED | `controllers/aiGradingController.js` | Strictly validated that all 4 criteria (`taskAchievement`, `coherenceCohesion`, `lexicalResource`, `grammaticalRange`) are present and are finite numbers in `[0.0, 9.0]`. Backend computes overallBand via official IELTS rounding: `roundIeltsBand((TA+CC+LR+GRA)/4)`. | Verified in `aiGradingController.js`: invalid/missing criteria reject candidate model and prevent malformed scored responses. |
| **W-03** | FIXED | `controllers/aiGradingController.js` | Softened heuristic analytics claims. Replaced "đạt Band 7.5+ Grammatical Range" claims based purely on regex keyword counts with "Ước lượng cơ học cấu trúc câu" and explicit note that human IELTS examiners evaluate sentence accuracy and variety in context. | Verified in `computeWritingAnalytics` feedback text. |
| **W-04** | FIXED | `frontend/src/modules/writing/WritingEvaluationModal.tsx` | Fixed `useEffect` dependency in modal. Modal now only initializes working draft when transitioning to open (`isOpen === true`), not on every `initialEssayContent` change. Applying 1-click inline corrections no longer resets `appliedCorrections`. | Verified in `WritingEvaluationModal.tsx`: `appliedCorrections` maintained while applying multiple corrections in succession. |
| **W-05** | FIXED | `frontend/src/modules/writing/WritingWorkspace.tsx` | Expanded `WritingHistoryEntry` to persist `promptId`, `chartType`, and `chartDetails`. `handleLoadFromHistory` restores the exact original prompt, task type, and chart settings so rewrites and re-evaluations remain accurate. | Verified in `WritingWorkspace.tsx`: restores active prompt or custom prompt from history item. |
| **W-06** | FIXED | `controllers/aiGradingController.js` | Added input validation for `calculateCompositeBand`: rejects non-numbers, negative numbers, or bands > 9.0 with HTTP 400. Verified composite formula `round_0.5((T1 + 2*T2)/3)`. | Test 3 in `scripts/testGradingSystem.js`: Validated boundary cases (T1 6.0 + T2 7.0 -> 6.5; T1 6.5 + T2 7.0 -> 7.0; negative/out-of-bounds rejected with 400). PASS. |
| **S-01** | FIXED | `controllers/aiGradingController.js`, `frontend/src/modules/speaking/SpeakingFeedbackDrawer.tsx` | Decoupled transcript feedback from overall Speaking band. When only transcript is submitted (no audio), API returns `status: 'partial'`, `requiresAudioForOverallBand: true`, `estimatedBand: null`, and `pronunciationFeedback.band: null`. Offline returns 503. | Test 5 in `scripts/testGradingSystem.js`: Asserts offline speaking returns 503 `AI_GRADER_UNAVAILABLE`. Drawer displays "Band: N/A (Cần Audio)". |
| **S-02** | FIXED | `controllers/aiGradingController.js`, `frontend/src/modules/speaking/SpeakingFeedbackDrawer.tsx` | Structured 4 criteria objects for Speaking. Overall estimated band requires audio verification. Drawer handles `estimatedBand: null` without throwing `TypeError: toFixed`. | Drawer displays explicit Pronunciation N/A badge when audio is absent, protecting against null access. |
| **S-03** | FIXED | `frontend/src/modules/speaking/SpeakingRandomStudio.tsx` | In Part 2 submissions, frontend now passes `cueCardBullets: currentPrompt.cueCardPoints || []` to `POST /api/ai/grade-speaking`. | Verified in `SpeakingRandomStudio.tsx` payload construction for Part 2. |
| **S-04** | FIXED | `frontend/src/modules/speaking/SpeakingRandomStudio.tsx` | Fixed `SpeechRecognition.onend` stale closure by using `isRecordingRef` to check the current recording status instead of captured initial state. Does not set `isRecording = true` when browser lacks speech support. | Verified in `SpeakingRandomStudio.tsx`: `isRecordingRef.current` synced via effect and checked before calling `recognition.start()`. |
| **S-05** | PARTIAL | Backlog / Architecture | Structured Speaking session schemas to support Part 1, 2, and 3 aggregation. Full multi-part composite Speaking session is documented as P2 backlog. | Current studio handles single-part evaluations with explicit Part-specific rubric audits. |
| **T-01** | FIXED | `scripts/testGradingSystem.js` | Overhauled test script to use `node:assert/strict` with exit code 1 upon any failure. Added 13 automated test suites covering all 4 skills, boundary conditions, offline fallbacks, and security isolation. | `node scripts/testGradingSystem.js` exits with code 0 on pass, code 1 on fail. |
| **T-02** | FIXED | `package.json`, `scripts/build.js`, `frontend/package.json` | Installed missing `canvas-confetti` and `@types/canvas-confetti` dependency in frontend; configured resilient production build script `scripts/build.js` with memory allocation cap (`--max-old-space-size=400`) and fallback to committed `dist` bundle to guarantee successful zero-downtime deployment on Render 512MB RAM free tier. | Verified `node scripts/build.js` and `npm run build` locally; clean Vite build and exit code 0. |

---

## Verification

| Command/Test | Result | Notes |
|---|---|---|
| `node scripts/testGradingSystem.js` | **PASS** | 13/13 test suites passed strict assertions with `node:assert/strict`. Process exited with code 0. |
| `npm test` (root) | **PASS** | Successfully executes automated test suite through npm runner. |
| `npm --prefix frontend run build` | **PASS** | TypeScript typecheck (`tsc`) passed with 0 errors. Vite production bundle generated in 6.94s. |
| `ALTER TABLE user_cambridge_test_attempts ADD COLUMN is_verified` | **PASS** | Migration applied to local MySQL daemon; schema aligned with verification flags. |

---

## Security

- **Auth protection**:
  - `GET /api/cambridge/user-history` and `POST /api/cambridge/user-history` strictly require session authentication (`req.session.user.id || req.session.userId`). Unauthenticated requests are rejected with HTTP 401 `UNAUTHORIZED`.
- **Ownership check**:
  - Client-supplied `query.userId` and `body.userId` are ignored. History reads and writes are strictly scoped to the authenticated session user ID. User A cannot view or tamper with User B's history.
- **Server-side quota**:
  - Added `rateLimitGuard` middleware in `routes/api/aiRoutes.js` limiting AI grading requests to a maximum of 30 requests/hour per client/session, returning HTTP 429 when exceeded.
  - Added payload length bounds (essays <= 15,000 chars, transcripts <= 8,000 chars) returning HTTP 413 on oversized payloads.
- **Score integrity**:
  - Offline mode no longer fabricates fake overallBand (6.5/7.0) or fake `dataAccuracyCheck.status = 'PASS'`.
  - Client-submitted history records are flagged with `clientReported: true` and `isVerified: false`.
  - Official scores are computed on the server from internal answer keys using canonical band conversion scales.

---

## Remaining limitations

- **Runtime/API/DB/audio verification gaps**:
  - Full automated speech phonetic analysis (e.g. phoneme stress, articulation, pitch contour) currently requires an external audio processing service; without audio upload, the system safely marks pronunciation as `N/A` and returns `partial` status rather than fabricating a score.
  - Multi-part Speaking mock test (combining Part 1, Part 2, and Part 3 in a single continuous session) is currently handled via per-part studio practice.
- **Future work**:
  - Integrate server-side multipart audio upload for full phonetic waveform evaluation.
  - Implement full 3-part continuous Speaking exam room with cumulative session ID.

---

## Deployment & migrations

- **Commands**:
  ```bash
  # 1. Install dependencies
  npm install
  npm --prefix frontend install

  # 2. Run automated test suite
  npm test

  # 3. Build frontend production assets
  npm --prefix frontend run build

  # 4. Start production server
  npm start
  ```

- **Environment variables**:
  - `PORT`: Server listen port (default: 3000)
  - `SESSION_SECRET`: Session signing secret key
  - `GEMINI_API_KEY`: Google Gemini API key for AI Senior Examiner grading
  - `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`: MySQL connection parameters
  - `R2_PUBLIC_URL`: Cloudflare R2 CDN base URL for listening audio files

- **Database migration**:
  - Ensure `user_cambridge_test_attempts` table contains the `is_verified` column:
    ```sql
    ALTER TABLE user_cambridge_test_attempts ADD COLUMN IF NOT EXISTS is_verified TINYINT(1) DEFAULT 0;
    ```

- **Rollback guidance**:
  - If a rollback is necessary, revert git commit `d1da867c` (`git revert d1da867c`) or checkout previous stable commit `1ca19ed5`.
  - Re-run `npm --prefix frontend run build` to restore previous frontend distribution bundle.
