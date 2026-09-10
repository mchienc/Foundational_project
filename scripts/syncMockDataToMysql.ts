// scripts/syncMockDataToMysql.ts
// Đồng bộ 100% dữ liệu từ mockData (Reading 13-14 câu, Listening, Vocab) vào CSDL MySQL

import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import db from '../config/db';
import { mockReadingPassages, mockListeningTests, mockAnkiDecks, mockAnkiCards } from '../frontend/src/data/cambridgeMockData';

async function syncAllData() {
  console.log('🔄 Bắt đầu đồng bộ toàn bộ dữ liệu vào MySQL database...');

  try {
    // 1. Tạo bảng nếu chưa có
    const sqlPath = path.join(__dirname, '../database/create_cambridge_tables.sql');
    const sqlScript = fs.readFileSync(sqlPath, 'utf8');
    const statements = sqlScript.split(';').map(s => s.trim()).filter(s => s.length > 0);
    for (const stmt of statements) {
      await db.query(stmt);
    }

    // 2. Đồng bộ Reading Passages & Questions & Target Words
    console.log(`\n📚 Đang đồng bộ ${mockReadingPassages.length} bài đọc Cambridge...`);
    for (const p of mockReadingPassages) {
      await db.query(
        `INSERT INTO cambridge_reading_passages 
          (id, title, subtitle, source, topic, difficulty, estimated_minutes, word_count, paragraphs)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE 
          title = VALUES(title), subtitle = VALUES(subtitle), source = VALUES(source), 
          topic = VALUES(topic), difficulty = VALUES(difficulty), estimated_minutes = VALUES(estimated_minutes),
          word_count = VALUES(word_count), paragraphs = VALUES(paragraphs)`,
        [
          p.id,
          p.title,
          p.subtitle || null,
          p.source,
          p.topic,
          p.difficulty,
          p.estimatedMinutes,
          p.wordCount,
          JSON.stringify(p.paragraphs)
        ]
      );

      // Questions (13-14 câu hỏi)
      for (const q of p.questions) {
        await db.query(
          `INSERT INTO cambridge_reading_questions
            (id, passage_id, question_number, type, group_header, group_instruction, prompt, options, correct_answer, acceptable_answers, academic_explanation, paragraph_ref)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
           ON DUPLICATE KEY UPDATE
            type = VALUES(type), group_header = VALUES(group_header), group_instruction = VALUES(group_instruction),
            prompt = VALUES(prompt), options = VALUES(options), correct_answer = VALUES(correct_answer),
            acceptable_answers = VALUES(acceptable_answers), academic_explanation = VALUES(academic_explanation),
            paragraph_ref = VALUES(paragraph_ref)`,
          [
            q.id,
            p.id,
            q.number,
            q.type,
            q.groupHeader || null,
            q.groupInstruction || null,
            q.question,
            q.options ? JSON.stringify(q.options) : null,
            q.correctAnswer,
            q.acceptableAnswers ? JSON.stringify(q.acceptableAnswers) : null,
            q.explanation,
            q.referenceParagraph || null
          ]
        );
      }

      // Target Words
      if (p.targetWords) {
        for (const tw of p.targetWords) {
          await db.query(
            `INSERT INTO cambridge_target_words
              (id, passage_id, word, part_of_speech, ipa, meaning_en, meaning_vi, context_sentence, audio_url)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
             ON DUPLICATE KEY UPDATE
              word = VALUES(word), part_of_speech = VALUES(part_of_speech), ipa = VALUES(ipa),
              meaning_en = VALUES(meaning_en), meaning_vi = VALUES(meaning_vi),
              context_sentence = VALUES(context_sentence), audio_url = VALUES(audio_url)`,
            [
              tw.id,
              p.id,
              tw.word,
              tw.partOfSpeech,
              tw.ipa,
              tw.definitionEn || (tw as any).meaningEn || '',
              tw.definitionVi || (tw as any).meaningVi || '',
              tw.contextSentence,
              (tw as any).audioUrl || null
            ]
          );
        }
      }

      console.log(`  -> Đã nạp bài: [${p.source}] ${p.title} (${p.questions.length} câu hỏi, ${p.targetWords?.length || 0} từ vựng)`);
    }

    // 3. Đồng bộ Listening Tests & Dictation Sentences
    console.log(`\n🎧 Đang đồng bộ ${mockListeningTests.length} bài nghe Listening...`);
    for (const lt of mockListeningTests) {
      await db.query(
        `INSERT INTO cambridge_listening_tests
          (id, title, source, part, speaker_accent, wpm, estimated_minutes, audio_url, instructions)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE
          title = VALUES(title), source = VALUES(source), part = VALUES(part),
          speaker_accent = VALUES(speaker_accent), wpm = VALUES(wpm),
          estimated_minutes = VALUES(estimated_minutes), audio_url = VALUES(audio_url),
          instructions = VALUES(instructions)`,
        [
          lt.id,
          lt.title,
          lt.source,
          lt.part,
          (lt as any).speakerAccent || (lt as any).accent || 'British English',
          lt.wpm || 145,
          (lt as any).estimatedMinutes || 15,
          (lt as any).audioUrl || `/audio/cambridge/${lt.id}.mp3`,
          (lt as any).instructions || (lt as any).phoneticFocus || ''
        ]
      );

      for (const s of lt.sentences) {
        await db.query(
          `INSERT INTO cambridge_dictation_sentences
            (id, test_id, sentence_order, start_time_ms, end_time_ms, text_en, translation_vi, audio_url, connected_speech_notes, target_words)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
           ON DUPLICATE KEY UPDATE
            sentence_order = VALUES(sentence_order), start_time_ms = VALUES(start_time_ms),
            end_time_ms = VALUES(end_time_ms), text_en = VALUES(text_en),
            translation_vi = VALUES(translation_vi), audio_url = VALUES(audio_url),
            connected_speech_notes = VALUES(connected_speech_notes), target_words = VALUES(target_words)`,
          [
            s.id,
            lt.id,
            (s as any).order || (s as any).sentenceIndex || 1,
            (s as any).startTimeMs || 0,
            (s as any).endTimeMs || 6000,
            (s as any).textEn || (s as any).text || '',
            (s as any).translationVi || (s as any).vietnameseMeaning || '',
            (s as any).audioUrl || null,
            (s as any).connectedSpeechNotes || (s as any).phoneticNotes || null,
            (s as any).targetWords ? JSON.stringify((s as any).targetWords) : JSON.stringify((s as any).keyVocab || [])
          ]
        );
      }
      console.log(`  -> Đã nạp bài nghe: [${lt.source}] ${lt.title} (${lt.sentences.length} câu dictation)`);
    }

    // 4. Đồng bộ Anki Decks
    console.log(`\n🃏 Đang đồng bộ ${mockAnkiDecks.length} bộ bài Anki Decks...`);
    for (const d of mockAnkiDecks) {
      await db.query(
        `INSERT INTO anki_decks (id, name, description, badge, color)
         VALUES (?, ?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE
          name = VALUES(name), description = VALUES(description), badge = VALUES(badge), color = VALUES(color)`,
        [d.id, (d as any).name || (d as any).title || 'Anki Deck', d.description, (d as any).badge || 'Standard', (d as any).color || 'emerald']
      );
    }

    // 5. Đồng bộ Thẻ Anki ban đầu
    console.log(`\n🗂️ Đang đồng bộ ${mockAnkiCards.length} thẻ từ vựng Anki ban đầu...`);
    for (const c of mockAnkiCards) {
      await db.query(
        `INSERT INTO anki_cards
          (id, deck_id, word, part_of_speech, ipa, meaning_en, meaning_vi, cloze_sentence, full_sentence, source, stage, interval_days, repetition_count, ease_factor, due_date)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE
          word = VALUES(word), part_of_speech = VALUES(part_of_speech), ipa = VALUES(ipa),
          meaning_en = VALUES(meaning_en), meaning_vi = VALUES(meaning_vi),
          cloze_sentence = VALUES(cloze_sentence), full_sentence = VALUES(full_sentence),
          source = VALUES(source)`,
        [
          c.id,
          c.deckId,
          c.word,
          (c as any).partOfSpeech || (c as any).pos || 'vocabulary',
          c.ipa,
          (c as any).meaningEn || (c as any).definitionEn || '',
          (c as any).meaningVi || (c as any).definitionVi || '',
          c.clozeSentence,
          c.fullSentence,
          c.source,
          (c as any).stage || (c as any).status || 'new',
          c.interval || 0,
          (c as any).repetition || (c as any).repetitions || 0,
          c.easeFactor || 2.5,
          new Date((c as any).dueDate || (c as any).nextReviewDate || Date.now())
        ]
      );
    }

    console.log('\n✨ ĐỒNG BỘ 100% CƠ SỞ DỮ LIỆU MYSQL HOÀN TẤT THÀNH CÔNG!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Lỗi đồng bộ CSDL:', error);
    process.exit(1);
  }
}

syncAllData();
