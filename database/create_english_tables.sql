-- =====================================================================
-- EduFlow English LMS - Database Schema
-- Chuyên sâu về Học Tiếng Anh (Spaced Repetition, Speaking, Listening, Grammar)
-- =====================================================================

-- 1. Bảng Thẻ Từ Vựng Thông Minh 3D (Spaced Repetition System)
CREATE TABLE IF NOT EXISTS english_flashcards (
    id INT AUTO_INCREMENT PRIMARY KEY,
    word VARCHAR(100) NOT NULL,
    part_of_speech VARCHAR(30) NOT NULL,
    ipa_uk VARCHAR(100) NOT NULL,
    ipa_us VARCHAR(100) NOT NULL,
    meaning_vi TEXT NOT NULL,
    meaning_en TEXT NOT NULL,
    examples JSON NOT NULL,
    collocations JSON,
    image_url VARCHAR(500),
    topic VARCHAR(100) DEFAULT 'IELTS Academic',
    level VARCHAR(30) DEFAULT 'B2-C1',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_topic_level (topic, level),
    INDEX idx_word (word)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. Bảng Bài Luyện Phát Âm & Chấm Điểm Âm Vị AI (Phoneme AI Speech Studio)
CREATE TABLE IF NOT EXISTS english_speaking_lessons (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(150) NOT NULL,
    target_sentence TEXT NOT NULL,
    ipa_full TEXT NOT NULL,
    translation_vi TEXT NOT NULL,
    difficulty ENUM('Easy', 'Medium', 'Hard') DEFAULT 'Medium',
    tips_vi TEXT,
    audio_duration_seconds FLOAT DEFAULT 4.0,
    words JSON NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_difficulty (difficulty)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. Bảng Bài Luyện Nghe Audio Chuyên Dụng (Listening & Dictation)
CREATE TABLE IF NOT EXISTS english_listening_lessons (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    topic VARCHAR(150) NOT NULL,
    speaker_name VARCHAR(100) NOT NULL,
    speaker_role VARCHAR(150),
    level VARCHAR(50) DEFAULT 'Intermediate',
    audio_duration_ms INT NOT NULL,
    audio_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_level (level)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. Bảng Phân Đoạn Lời Thoại Karaoke & Ô Trống Dictation
CREATE TABLE IF NOT EXISTS english_transcript_segments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    lesson_id INT NOT NULL,
    start_ms INT NOT NULL,
    end_ms INT NOT NULL,
    speaker VARCHAR(50) NOT NULL,
    text_en TEXT NOT NULL,
    text_vi TEXT,
    dictation_blanks JSON,
    FOREIGN KEY (lesson_id) REFERENCES english_listening_lessons(id) ON DELETE CASCADE,
    INDEX idx_lesson_time (lesson_id, start_ms)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. Bảng Bài Tập Ghép Câu Ngữ Pháp (Sentence Builder & Grammar)
CREATE TABLE IF NOT EXISTS english_sentence_builders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    target_sentence_vi TEXT NOT NULL,
    target_sentence_en TEXT NOT NULL,
    correct_words JSON NOT NULL,
    shuffled_words JSON NOT NULL,
    explanation_vi TEXT NOT NULL,
    grammar_topic VARCHAR(100) NOT NULL,
    points INT DEFAULT 20,
    difficulty ENUM('Easy', 'Medium', 'Hard') DEFAULT 'Medium',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_grammar_topic (grammar_topic)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 6. Bảng Tiến Độ Ôn Tập Ngắt Quãng Cá Nhân Hóa (Spaced Repetition Progress)
CREATE TABLE IF NOT EXISTS user_srs_progress (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    card_id INT NOT NULL,
    srs_stage ENUM('new', 'learning', 'review', 'mastered') DEFAULT 'learning',
    streak INT DEFAULT 0,
    interval_days INT DEFAULT 1,
    ease_factor FLOAT DEFAULT 2.5,
    next_review_at DATETIME NOT NULL,
    last_reviewed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    total_reviews INT DEFAULT 1,
    UNIQUE KEY uk_user_card (user_id, card_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (card_id) REFERENCES english_flashcards(id) ON DELETE CASCADE,
    INDEX idx_user_next_review (user_id, next_review_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 7. Bảng Thống Kê & Gamification Học Viên (Streak, XP, League)
CREATE TABLE IF NOT EXISTS user_english_stats (
    user_id INT PRIMARY KEY,
    streak_days INT DEFAULT 0,
    last_active_date DATE,
    xp_total INT DEFAULT 0,
    xp_this_week INT DEFAULT 0,
    league ENUM('Bạc', 'Vàng', 'Bạch Kim', 'Kim Cương') DEFAULT 'Bạch Kim',
    vocab_learned_count INT DEFAULT 0,
    speaking_accuracy_avg FLOAT DEFAULT 90.0,
    listening_completed_count INT DEFAULT 0,
    grammar_mastered_count INT DEFAULT 0,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
