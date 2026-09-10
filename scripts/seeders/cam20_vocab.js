// scripts/seeders/cam20_vocab.js
const db = require('../../config/db');

const vocabData = [
  { id: 'c20-tw-nocturnal', passage_id: 'cambridge-20-test-1-p1', word: 'nocturnal', part_of_speech: 'adjective', ipa: '/nɑːkˈtɝː.nəl/', meaning_vi: 'Hoạt động về đêm', meaning_en: 'Active at night rather than during the day.', context_sentence: 'The kākāpō is a nocturnal, flightless parrot.' },
  { id: 'c20-tw-solitary', passage_id: 'cambridge-20-test-1-p1', word: 'solitary', part_of_speech: 'adjective', ipa: '/ˈsɑː.lə.ter.i/', meaning_vi: 'Sống đơn độc, biệt lập', meaning_en: 'Done or existing alone.', context_sentence: 'Kākāpō are solitary birds and tend to occupy the same home range.' },
  { id: 'c20-tw-resilience', passage_id: 'cambridge-20-test-1-p2', word: 'resilience', part_of_speech: 'noun', ipa: '/rɪˈzɪl.jəns/', meaning_vi: 'Khả năng phục hồi, tính kiên cường', meaning_en: 'The capacity to recover quickly from difficulties.', context_sentence: 'Cultivating disease-resilient elms is vital for British woodlands.' },
  { id: 'c20-tw-cortisol', passage_id: 'cambridge-20-test-1-p3', word: 'cortisol', part_of_speech: 'noun', ipa: '/ˈkɔːr.tə.zɑːl/', meaning_vi: 'Hormone căng thẳng cortisol', meaning_en: 'A steroid hormone produced in response to stress.', context_sentence: 'When stress strikes, cortisol spikes in the bloodstream.' },
  { id: 'c20-tw-buoyancy', passage_id: 'cambridge-20-test-2-p1', word: 'buoyancy', part_of_speech: 'noun', ipa: '/ˈbɔɪ.ən.si/', meaning_vi: 'Sức nổi trong nước', meaning_en: 'The ability or tendency to float in water or air.', context_sentence: 'Dense bones facilitate precise control of neutral buoyancy.' },
  { id: 'c20-tw-procrastination', passage_id: 'cambridge-20-test-2-p2', word: 'procrastination', part_of_speech: 'noun', ipa: '/prəˌkræs.təˈneɪ.ʃən/', meaning_vi: 'Thói quen trì hoãn công việc', meaning_en: 'The action of delaying or postponing something.', context_sentence: 'Procrastination is often driven by emotional regulation failure.' },
  { id: 'c20-tw-fallibility', passage_id: 'cambridge-20-test-2-p3', word: 'fallibility', part_of_speech: 'noun', ipa: '/ˌfæl.əˈbɪl.ə.t̬i/', meaning_vi: 'Tính dễ mắc sai lầm', meaning_en: 'The tendency to make mistakes or be wrong.', context_sentence: 'Human fallibility has long been part of the drama in competitive athletics.' },
  { id: 'c20-tw-cryogenic', passage_id: 'cambridge-20-test-3-p1', word: 'cryogenic', part_of_speech: 'adjective', ipa: '/ˌkraɪ.oʊˈdʒen.ɪk/', meaning_vi: 'Thuộc về nhiệt độ cực thấp', meaning_en: 'Relating to the scientific study or use of very low temperatures.', context_sentence: 'Rapid freezing at cryogenic temperatures preserves food texture.' },
  { id: 'c20-tw-bleaching', passage_id: 'cambridge-20-test-3-p2', word: 'coral bleaching', part_of_speech: 'noun', ipa: '/ˈkɔːr.əl ˈbliː.tʃɪŋ/', meaning_vi: 'Hiện tượng tẩy trắng san hô', meaning_en: 'When corals lose their vibrant colors and turn white due to thermal stress.', context_sentence: 'Ocean warming triggers extensive coral bleaching.' },
  { id: 'c20-tw-anthropomorphism', passage_id: 'cambridge-20-test-3-p3', word: 'anthropomorphism', part_of_speech: 'noun', ipa: '/ˌæn.θrə.pəˈmɔːr.fɪ.zəm/', meaning_vi: 'Thuyết nhân hình (gán tính cách người cho máy móc/vật)', meaning_en: 'The attribution of human characteristics or behavior to an animal or object.', context_sentence: 'Anthropomorphism drives people to treat companion robots as sentient beings.' },
  { id: 'c20-tw-modernism', passage_id: 'cambridge-20-test-4-p1', word: 'modernism', part_of_speech: 'noun', ipa: '/ˈmɑː.dɚ.nɪ.zəm/', meaning_vi: 'Chủ nghĩa hiện đại trong nghệ thuật', meaning_en: 'A style or movement in art that aims to depart from classical forms.', context_sentence: 'Georgia O\'Keeffe is celebrated as a pioneer of American modernism.' },
  { id: 'c20-tw-amphibious', passage_id: 'cambridge-20-test-4-p2', word: 'amphibious', part_of_speech: 'adjective', ipa: '/æmˈfɪb.i.əs/', meaning_vi: 'Lưỡng cư, vừa ở cạn vừa nổi trên nước', meaning_en: 'Suited for both land and water.', context_sentence: 'Amphibious architecture allows homes to float during floods.' },
  { id: 'c20-tw-deterrence', passage_id: 'cambridge-20-test-4-p3', word: 'deterrence', part_of_speech: 'noun', ipa: '/dɪˈter.əns/', meaning_vi: 'Sự răn đe, ngăn chặn phi bạo lực', meaning_en: 'The action of discouraging an action or event through instilling doubt or fear.', context_sentence: 'Guardian dogs provide non-lethal predator deterrence.' }
];

async function seedVocab() {
  console.log('📖 Đang nạp từ vựng mục tiêu C1–C2 của Cambridge 20...');
  for (const v of vocabData) {
    await db.query(
      `INSERT INTO cambridge_target_words 
        (id, passage_id, word, part_of_speech, ipa, meaning_vi, meaning_en, context_sentence)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE 
        word = VALUES(word), meaning_vi = VALUES(meaning_vi), meaning_en = VALUES(meaning_en), context_sentence = VALUES(context_sentence)`,
      [v.id, v.passage_id, v.word, v.part_of_speech, v.ipa, v.meaning_vi, v.meaning_en, v.context_sentence]
    );
  }
  console.log('✅ Hoàn tất nạp từ vựng Cambridge 20');
}

seedVocab().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1); });
