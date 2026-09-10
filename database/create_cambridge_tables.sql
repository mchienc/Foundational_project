-- =====================================================================
-- EduFlow Cambridge IELTS & Anki SRS - Database Schema
-- Lưu trữ chuẩn hóa các bài thi Cambridge 16-19, Dictation và Anki SRS
-- =====================================================================

-- 1. Bảng Bài Đọc Cambridge (Reading Passages)
CREATE TABLE IF NOT EXISTS cambridge_reading_passages (
    id VARCHAR(100) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    subtitle VARCHAR(255),
    source VARCHAR(100) NOT NULL,
    topic VARCHAR(100) NOT NULL,
    difficulty VARCHAR(50) DEFAULT 'Band 7.0-8.0',
    estimated_minutes INT DEFAULT 20,
    word_count INT DEFAULT 900,
    paragraphs JSON NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_source (source),
    INDEX idx_difficulty (difficulty),
    INDEX idx_topic (topic)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. Bảng Câu Hỏi Khảo Thí Cambridge (13 - 14 câu hỏi mỗi bài)
CREATE TABLE IF NOT EXISTS cambridge_reading_questions (
    id VARCHAR(100) PRIMARY KEY,
    passage_id VARCHAR(100) NOT NULL,
    question_number INT NOT NULL,
    type ENUM('tfng', 'multiple_choice', 'summary_completion', 'matching_info') NOT NULL,
    group_header VARCHAR(100),
    group_instruction TEXT,
    prompt TEXT NOT NULL,
    options JSON,
    correct_answer VARCHAR(255) NOT NULL,
    acceptable_answers JSON,
    academic_explanation TEXT NOT NULL,
    paragraph_ref VARCHAR(10),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (passage_id) REFERENCES cambridge_reading_passages(id) ON DELETE CASCADE,
    INDEX idx_passage_qnum (passage_id, question_number)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. Bảng Từ Vựng Mục Tiêu Học Thuật C1-C2 (Target Vocabulary)
CREATE TABLE IF NOT EXISTS cambridge_target_words (
    id VARCHAR(100) PRIMARY KEY,
    passage_id VARCHAR(100),
    listening_id VARCHAR(100),
    word VARCHAR(100) NOT NULL,
    part_of_speech VARCHAR(30) NOT NULL,
    ipa VARCHAR(100) NOT NULL,
    meaning_en TEXT NOT NULL,
    meaning_vi TEXT NOT NULL,
    context_sentence TEXT NOT NULL,
    audio_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_word (word),
    INDEX idx_passage (passage_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. Bảng Bài Luyện Nghe Cambridge (Listening Tests)
CREATE TABLE IF NOT EXISTS cambridge_listening_tests (
    id VARCHAR(100) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    source VARCHAR(100) NOT NULL,
    part INT NOT NULL DEFAULT 1,
    speaker_accent VARCHAR(100) DEFAULT 'British English',
    wpm INT DEFAULT 145,
    estimated_minutes INT DEFAULT 15,
    audio_url VARCHAR(500) NOT NULL,
    instructions TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_source_part (source, part)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. Bảng Phân Đoạn Luyện Nghe & Chép Chính Tả (Dictation Sentences)
CREATE TABLE IF NOT EXISTS cambridge_dictation_sentences (
    id VARCHAR(100) PRIMARY KEY,
    test_id VARCHAR(100) NOT NULL,
    sentence_order INT NOT NULL,
    start_time_ms INT NOT NULL DEFAULT 0,
    end_time_ms INT NOT NULL DEFAULT 0,
    text_en TEXT NOT NULL,
    translation_vi TEXT NOT NULL,
    audio_url VARCHAR(500),
    connected_speech_notes TEXT,
    target_words JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (test_id) REFERENCES cambridge_listening_tests(id) ON DELETE CASCADE,
    INDEX idx_test_order (test_id, sentence_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 6. Bảng Bộ Bài Anki (Anki Decks)
CREATE TABLE IF NOT EXISTS anki_decks (
    id VARCHAR(100) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    badge VARCHAR(50) DEFAULT 'Standard',
    color VARCHAR(50) DEFAULT 'emerald',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 7. Bảng Thẻ Từ Vựng Anki Chuẩn Thuật Toán SM-2 (Anki Cards)
CREATE TABLE IF NOT EXISTS anki_cards (
    id VARCHAR(100) PRIMARY KEY,
    deck_id VARCHAR(100) NOT NULL,
    user_id INT DEFAULT 1,
    word VARCHAR(100) NOT NULL,
    part_of_speech VARCHAR(30) NOT NULL,
    ipa VARCHAR(100) NOT NULL,
    meaning_en TEXT NOT NULL,
    meaning_vi TEXT NOT NULL,
    cloze_sentence TEXT NOT NULL,
    full_sentence TEXT NOT NULL,
    source VARCHAR(150),
    audio_url VARCHAR(500),
    -- Các trường dữ liệu thuật toán SuperMemo SM-2
    stage ENUM('new', 'learning', 'review', 'mastered') DEFAULT 'new',
    interval_days INT DEFAULT 0,
    repetition_count INT DEFAULT 0,
    ease_factor FLOAT DEFAULT 2.5,
    due_date DATETIME NOT NULL,
    last_reviewed_at DATETIME,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (deck_id) REFERENCES anki_decks(id) ON DELETE CASCADE,
    INDEX idx_deck_due (deck_id, due_date),
    INDEX idx_word_deck (deck_id, word)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 8. Bảng Lịch Sử & Kết Quả Thi Thử Cambridge (User Exam Attempts)
CREATE TABLE IF NOT EXISTS user_cambridge_exam_results (
    id INT AUTO_INCREMENT PRIMARY KEY,
    passage_id VARCHAR(100) NOT NULL,
    user_id INT DEFAULT 1,
    correct_count INT NOT NULL,
    total_count INT NOT NULL,
    band_score FLOAT NOT NULL,
    percentage INT NOT NULL,
    time_taken_seconds INT DEFAULT 0,
    user_answers JSON NOT NULL,
    xp_earned INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (passage_id) REFERENCES cambridge_reading_passages(id) ON DELETE CASCADE,
    INDEX idx_user_passage (user_id, passage_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
