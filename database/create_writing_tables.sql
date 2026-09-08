-- database/create_writing_tables.sql
-- Bảng lưu trữ đề bài và lịch sử bài luận cho Phân hệ AI Academic Writing Evaluator

CREATE TABLE IF NOT EXISTS `english_writing_prompts` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `task_type` ENUM('task_1', 'task_2', 'academic_essay') NOT NULL DEFAULT 'task_2',
  `category` VARCHAR(100) NOT NULL DEFAULT 'General',
  `prompt_text` TEXT NOT NULL,
  `chart_image_url` VARCHAR(500) NULL,
  `target_band` VARCHAR(20) NOT NULL DEFAULT 'Band 7.5+',
  `min_words` INT NOT NULL DEFAULT 250,
  `suggested_ideas` JSON NULL,
  `sample_band8_essay` MEDIUMTEXT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `english_writing_submissions` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `user_id` INT NOT NULL,
  `prompt_id` INT NOT NULL,
  `essay_text` MEDIUMTEXT NOT NULL,
  `word_count` INT NOT NULL DEFAULT 0,
  `time_spent_seconds` INT NOT NULL DEFAULT 0,
  `band_overall` DECIMAL(3, 1) NOT NULL DEFAULT 6.0,
  `band_tr` DECIMAL(3, 1) NOT NULL DEFAULT 6.0,
  `band_cc` DECIMAL(3, 1) NOT NULL DEFAULT 6.0,
  `band_lr` DECIMAL(3, 1) NOT NULL DEFAULT 6.0,
  `band_gra` DECIMAL(3, 1) NOT NULL DEFAULT 6.0,
  `cefr_level` VARCHAR(10) NOT NULL DEFAULT 'B2',
  `evaluation_details` JSON NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX `idx_writing_user` (`user_id`),
  INDEX `idx_writing_prompt` (`prompt_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
