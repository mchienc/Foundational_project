// scripts/seeders/cam13_vocab.js
// Nạp từ vựng học thuật C1-C2 chất lượng cao cho toàn bộ 12 bài đọc Cambridge IELTS 13

const db = require('../../config/db');

const vocabData = [
  // Test 1 - Passage 2: Why being bored is stimulating
  {
    id: 'tw-c13-t1-p2-1',
    passage_id: 'cambridge-13-test-1-p2',
    word: 'monotony',
    part_of_speech: 'noun',
    ipa: '/məˈnɒt.ən.i/',
    meaning_en: 'A lack of variety and interest; tedious repetition and routine.',
    meaning_vi: 'Sự đơn điệu, buồn tẻ, lặp đi lặp lại không thay đổi.',
    context_sentence: 'Prolonged exposure to computational monotony often triggers an instinctive psychological drive for novel stimuli.'
  },
  {
    id: 'tw-c13-t1-p2-2',
    passage_id: 'cambridge-13-test-1-p2',
    word: 'incubation',
    part_of_speech: 'noun',
    ipa: '/ˌɪŋ.kjəˈbeɪ.ʃən/',
    meaning_en: 'The process of keeping something in the mind to develop unconsciously before emerging into full clarity.',
    meaning_vi: 'Thời kỳ ấp ủ ý tưởng sáng tạo trong tiềm thức.',
    context_sentence: 'Periods of passive daydreaming allow an unconscious incubation phase where novel neurological associations coalesce.'
  },
  {
    id: 'tw-c13-t1-p2-3',
    passage_id: 'cambridge-13-test-1-p2',
    word: 'stimulus',
    part_of_speech: 'noun',
    ipa: '/ˈstɪm.jə.ləs/',
    meaning_en: 'A thing or event that evokes a specific functional reaction in an organ or tissue.',
    meaning_vi: 'Tác nhân kích thích giác quan hoặc tư duy nhận thức.',
    context_sentence: 'When deprived of extrinsic intellectual stimulus, the human brain actively manufactures internal contemplation.'
  },
  {
    id: 'tw-c13-t1-p2-4',
    passage_id: 'cambridge-13-test-1-p2',
    word: 'cognitive',
    part_of_speech: 'adjective',
    ipa: '/ˈkɒɡ.nə.tɪv/',
    meaning_en: 'Related to the mental action or process of acquiring knowledge and understanding through thought and experience.',
    meaning_vi: 'Thuộc về nhận thức, quá trình tiếp thu và xử lý tri thức.',
    context_sentence: 'Boredom functions as an adaptive evolutionary signal to redirect precious cognitive capacity.'
  },

  // Test 1 - Passage 3: Artificial artists
  {
    id: 'tw-c13-t1-p3-1',
    passage_id: 'cambridge-13-test-1-p3',
    word: 'orthodoxy',
    part_of_speech: 'noun',
    ipa: '/ˈɔː.θə.dɒk.si/',
    meaning_en: 'Authorized or generally accepted theory, doctrine, or practice.',
    meaning_vi: 'Quan niệm chính thống, giáo điều được xã hội thừa nhận rộng rãi.',
    context_sentence: 'The relentless encroachment of artificial intelligence into creative domains is destabilizing this humanist orthodoxy.'
  },
  {
    id: 'tw-c13-t1-p3-2',
    passage_id: 'cambridge-13-test-1-p3',
    word: 'algorithm',
    part_of_speech: 'noun',
    ipa: '/ˈæl.ɡə.rɪð.əm/',
    meaning_en: 'A process or set of rules to be followed in calculations or other problem-solving operations by a computer.',
    meaning_vi: 'Thuật toán, quy tắc logic lập trình giải quyết bài toán.',
    context_sentence: 'Modern neural networks utilize deep learning algorithms to synthesize thousands of classical masterworks.'
  },
  {
    id: 'tw-c13-t1-p3-3',
    passage_id: 'cambridge-13-test-1-p3',
    word: 'aesthetic',
    part_of_speech: 'adjective',
    ipa: '/esˈθet.ɪk/',
    meaning_en: 'Concerned with beauty or the appreciation of beauty.',
    meaning_vi: 'Thuộc về mỹ học, tính thẩm mỹ nghệ thuật.',
    context_sentence: 'Critics engaged in fierce debates over whether algorithmic paintings possessed authentic aesthetic intentionality.'
  },
  {
    id: 'tw-c13-t1-p3-4',
    passage_id: 'cambridge-13-test-1-p3',
    word: 'pinnacle',
    part_of_speech: 'noun',
    ipa: '/ˈpɪn.ə.kəl/',
    meaning_en: 'The most successful point; the culmination.',
    meaning_vi: 'Đỉnh cao, đỉnh tột cùng của sự thành tựu.',
    context_sentence: 'Artistic creation was long celebrated as the ultimate pinnacle of human intellectual and emotional uniqueness.'
  },

  // Test 2 - Passage 1: Bringing cinnamon to Europe
  {
    id: 'tw-c13-t2-p1-1',
    passage_id: 'cambridge-13-test-2-p1',
    word: 'monopoly',
    part_of_speech: 'noun',
    ipa: '/məˈnɒp.əl.i/',
    meaning_en: 'The exclusive possession or control of the supply of or trade in a commodity or service.',
    meaning_vi: 'Sự độc quyền buôn bán hoặc phân phối hàng hóa.',
    context_sentence: 'Venetian merchants maintained a lucrative commercial monopoly over cinnamon importation across the Mediterranean.'
  },
  {
    id: 'tw-c13-t2-p1-2',
    passage_id: 'cambridge-13-test-2-p1',
    word: 'exorbitant',
    part_of_speech: 'adjective',
    ipa: '/ɪɡˈzɔː.bɪ.tənt/',
    meaning_en: '(of a price or amount charged) unreasonably high.',
    meaning_vi: 'Cắt cổ, đắt đỏ vượt quá mức hợp lý.',
    context_sentence: 'The exorbitant price of cinnamon in medieval Europe made it an elite symbol of luxury and royal prestige.'
  },
  {
    id: 'tw-c13-t2-p1-3',
    passage_id: 'cambridge-13-test-2-p1',
    word: 'commodity',
    part_of_speech: 'noun',
    ipa: '/kəˈmɒd.ə.ti/',
    meaning_en: 'A raw material or primary agricultural product that can be bought and sold.',
    meaning_vi: 'Thương phẩm, mặt hàng kinh thương có giá trị trao đổi.',
    context_sentence: 'Exotic spices transformed into vital commodities that financed worldwide maritime exploration.'
  },
  {
    id: 'tw-c13-t2-p1-4',
    passage_id: 'cambridge-13-test-2-p1',
    word: 'indigenous',
    part_of_speech: 'adjective',
    ipa: '/ɪnˈdɪdʒ.ɪ.nəs/',
    meaning_en: 'Originating or occurring naturally in a particular place; native.',
    meaning_vi: 'Bản địa, có nguồn gốc tự nhiên từ một vùng đất cụ thể.',
    context_sentence: 'Cinnamomum verum was indigenous strictly to the lush central highlands of Ceylon.'
  },

  // Test 2 - Passage 2: Oxytocin
  {
    id: 'tw-c13-t2-p2-1',
    passage_id: 'cambridge-13-test-2-p2',
    word: 'empathy',
    part_of_speech: 'noun',
    ipa: '/ˈem.pə.θi/',
    meaning_en: 'The ability to understand and share the feelings of another.',
    meaning_vi: 'Sự thấu cảm, khả năng đồng cảm sâu sắc với cảm xúc người khác.',
    context_sentence: 'Early biochemical research hailed oxytocin as the neurochemical bedrock of human trust and empathy.'
  },
  {
    id: 'tw-c13-t2-p2-2',
    passage_id: 'cambridge-13-test-2-p2',
    word: 'parochial',
    part_of_speech: 'adjective',
    ipa: '/pəˈrəʊ.ki.əl/',
    meaning_en: 'Having a limited or narrow outlook or scope; tribal.',
    meaning_vi: 'Hẹp hòi, mang tính bộ lạc, thiên vị phe nhóm cục bộ.',
    context_sentence: 'Administering oxytocin inadvertently reinforced parochial altruism, increasing hostility towards external rival groups.'
  },
  {
    id: 'tw-c13-t2-p2-3',
    passage_id: 'cambridge-13-test-2-p2',
    word: 'nuanced',
    part_of_speech: 'adjective',
    ipa: '/ˈnjuː.ɑːnst/',
    meaning_en: 'Characterized by subtle shades of meaning or expression.',
    meaning_vi: 'Tinh tế, đa chiều, có nhiều sắc thái phức tạp.',
    context_sentence: 'Contemporary neuroscientists advocate for a far more nuanced understanding of hormonal behavioral modulation.'
  },
  {
    id: 'tw-c13-t2-p2-4',
    passage_id: 'cambridge-13-test-2-p2',
    word: 'altruism',
    part_of_speech: 'noun',
    ipa: '/ˈæl.tru.ɪ.zəm/',
    meaning_en: 'Disinterested and selfless concern for the well-being of others.',
    meaning_vi: 'Lòng vị tha, hành vi vì lợi ích của cộng đồng.',
    context_sentence: 'The compound did not uniformly foster universal altruism, but selectively favored members of the immediate in-group.'
  },

  // Test 2 - Passage 3: Making the most of trends
  {
    id: 'tw-c13-t2-p3-1',
    passage_id: 'cambridge-13-test-2-p3',
    word: 'superficial',
    part_of_speech: 'adjective',
    ipa: '/ˌsuː.pəˈfɪʃ.əl/',
    meaning_en: 'Existing or occurring at or on the surface; not thorough or deep.',
    meaning_vi: 'Nông cạn, bề ngoài, thiếu chiều sâu chiến lược.',
    context_sentence: 'Too many corporations implement superficial brand adjustments that fail to resonate with evolving consumer priorities.'
  },
  {
    id: 'tw-c13-t2-p3-2',
    passage_id: 'cambridge-13-test-2-p3',
    word: 'trajectory',
    part_of_speech: 'noun',
    ipa: '/trəˈdʒek.tər.i/',
    meaning_en: 'The path followed by a projectile or an object moving under the action of given forces; developmental course.',
    meaning_vi: 'Quỹ đạo phát triển, chiều hướng biến chuyển của xu hướng.',
    context_sentence: 'Market leaders anticipate macroeconomic trajectories rather than reacting defensively after market disruption occurs.'
  },
  {
    id: 'tw-c13-t2-p3-3',
    passage_id: 'cambridge-13-test-2-p3',
    word: 'congruence',
    part_of_speech: 'noun',
    ipa: '/ˈkɒŋ.ɡru.əns/',
    meaning_en: 'Agreement or harmony; compatibility.',
    meaning_vi: 'Sự tương thích, phù hợp hài hòa với bản sắc cốt lõi.',
    context_sentence: 'New product extensions must demonstrate fundamental congruence with the established credibility of the brand.'
  },
  {
    id: 'tw-c13-t2-p3-4',
    passage_id: 'cambridge-13-test-2-p3',
    word: 'catalyst',
    part_of_speech: 'noun',
    ipa: '/ˈkæt.əl.ɪst/',
    meaning_en: 'A person or thing that precipitates an event or accelerates change.',
    meaning_vi: 'Chất xúc tác đẩy nhanh quá trình đổi mới hoặc biến chuyển.',
    context_sentence: 'Digital connectivity acted as an irresistible catalyst that upended conventional brick-and-mortar retail paradigms.'
  },

  // Test 3 - Passage 1: The coconut palm
  {
    id: 'tw-c13-t3-p1-1',
    passage_id: 'cambridge-13-test-3-p1',
    word: 'germination',
    part_of_speech: 'noun',
    ipa: '/ˌdʒɜː.mɪˈneɪ.ʃən/',
    meaning_en: 'The development of a plant from a seed or spore after a period of dormancy.',
    meaning_vi: 'Sự nảy mầm, quá trình hạt giống đâm chồi phát triển.',
    context_sentence: 'The fibrous husk shields the interior seed, ensuring buoyant viability and successful coastal germination.'
  },
  {
    id: 'tw-c13-t3-p1-2',
    passage_id: 'cambridge-13-test-3-p1',
    word: 'buoyancy',
    part_of_speech: 'noun',
    ipa: '/ˈbɔɪ.ən.si/',
    meaning_en: 'The ability or tendency to float in water or air or another fluid.',
    meaning_vi: 'Sức nổi, đặc tính nổi được trên mặt nước biển.',
    context_sentence: 'The air cavities within the mesocarp confer incredible natural buoyancy across thousands of miles of oceanic currents.'
  },
  {
    id: 'tw-c13-t3-p1-3',
    passage_id: 'cambridge-13-test-3-p1',
    word: 'subsistence',
    part_of_speech: 'noun',
    ipa: '/səbˈsɪs.təns/',
    meaning_en: 'The action or fact of maintaining or supporting oneself at a minimum level.',
    meaning_vi: 'Sự tự cung tự cấp, nguồn sinh kế tối thiểu của cư dân đảo.',
    context_sentence: 'For centuries, the versatile palm provided essential subsistence materials for isolated Pacific maritime communities.'
  },
  {
    id: 'tw-c13-t3-p1-4',
    passage_id: 'cambridge-13-test-3-p1',
    word: 'cultivation',
    part_of_speech: 'noun',
    ipa: '/ˌkʌl.tɪˈveɪ.ʃən/',
    meaning_en: 'The act of preparing land and growing crops on it.',
    meaning_vi: 'Sự canh tác, gieo trồng cây nông nghiệp có chủ đích.',
    context_sentence: 'Extensive agricultural cultivation transformed the wild palm into one of the tropical world’s greatest cash crops.'
  },

  // Test 3 - Passage 2: Baby talk
  {
    id: 'tw-c13-t3-p2-1',
    passage_id: 'cambridge-13-test-3-p2',
    word: 'intonation',
    part_of_speech: 'noun',
    ipa: '/ˌɪn.təˈneɪ.ʃən/',
    meaning_en: 'The rise and fall of the voice in speaking.',
    meaning_vi: 'Ngữ điệu, cao độ lên xuống của giọng nói khi giao tiếp.',
    context_sentence: 'The melodious sing-song intonation of infant-directed speech activates neural circuitry in developing brains.'
  },
  {
    id: 'tw-c13-t3-p2-2',
    passage_id: 'cambridge-13-test-3-p2',
    word: 'phoneme',
    part_of_speech: 'noun',
    ipa: '/ˈfəʊ.niːm/',
    meaning_en: 'Any of the distinct units of sound in a specified language that distinguish one word from another.',
    meaning_vi: 'Âm vị, đơn vị ngữ âm khu biệt nghĩa trong ngôn ngữ học.',
    context_sentence: 'Exaggerated vocal articulation enables infants to segment linguistic streams into discrete acoustic phonemes.'
  },
  {
    id: 'tw-c13-t3-p2-3',
    passage_id: 'cambridge-13-test-3-p2',
    word: 'acquisition',
    part_of_speech: 'noun',
    ipa: '/ˌæk.wɪˈzɪʃ.ən/',
    meaning_en: 'The learning or developing of a skill, habit, or quality.',
    meaning_vi: 'Sự tiếp thu ngôn ngữ tự nhiên, lĩnh hội kiến thức.',
    context_sentence: 'Early conversational turn-taking significantly accelerates vocabulary acquisition during toddlerhood.'
  },
  {
    id: 'tw-c13-t3-p2-4',
    passage_id: 'cambridge-13-test-3-p2',
    word: 'synaptic',
    part_of_speech: 'adjective',
    ipa: '/sɪˈnæp.tɪk/',
    meaning_en: 'Relating to a synapse or synapses between nerve cells.',
    meaning_vi: 'Thuộc về khớp thần kinh, liên kết giữa các tế bào não.',
    context_sentence: 'Responsive verbal engagement stimulates synaptic density in the auditory cortex of the infant brain.'
  },

  // Test 3 - Passage 3: Harappan Civilisation
  {
    id: 'tw-c13-t3-p3-1',
    passage_id: 'cambridge-13-test-3-p3',
    word: 'monsoon',
    part_of_speech: 'noun',
    ipa: '/mɒnˈsuːn/',
    meaning_en: 'A seasonal prevailing wind in the region of South and SE Asia, blowing from the southwest between May and September and bringing rain.',
    meaning_vi: 'Gió mùa mang mưa lớn, chi phối nông nghiệp Nam Á.',
    context_sentence: 'Climatological analyses reveal that weakening summer monsoon rains undermined urban Harappan water reservoirs.'
  },
  {
    id: 'tw-c13-t3-p3-2',
    passage_id: 'cambridge-13-test-3-p3',
    word: 'sedimentary',
    part_of_speech: 'adjective',
    ipa: '/ˌsed.ɪˈmen.tər.i/',
    meaning_en: 'Relating to or formed by sediment deposited by water or wind.',
    meaning_vi: 'Thuộc trầm tích học, lắng đọng theo địa tầng thời gian.',
    context_sentence: 'Geologists examined sedimentary core samples from ancient dried lake beds to reconstruct rainfall oscillations.'
  },
  {
    id: 'tw-c13-t3-p3-3',
    passage_id: 'cambridge-13-test-3-p3',
    word: 'desiccation',
    part_of_speech: 'noun',
    ipa: '/ˌdes.ɪˈkeɪ.ʃən/',
    meaning_en: 'The state of extreme dryness, or the process of extreme drying.',
    meaning_vi: 'Sự khô cạn kiệt quệ của các lòng sông và hồ cổ đại.',
    context_sentence: 'Progressive desiccation of regional river systems gradually forced the Harappan urban population into agrarian dispersal.'
  },
  {
    id: 'tw-c13-t3-p3-4',
    passage_id: 'cambridge-13-test-3-p3',
    word: 'aridification',
    part_of_speech: 'noun',
    ipa: '/ˌær.ɪ.dɪ.fɪˈkeɪ.ʃən/',
    meaning_en: 'The process of a region becoming increasingly dry and desert-like.',
    meaning_vi: 'Hiện tượng khô hạn hóa, hoang mạc hóa môi trường đất đai.',
    context_sentence: 'Widespread aridification forced prehistoric agriculturalists to abandon barley in favor of drought-tolerant millet.'
  },

  // Test 4 - Passage 1: Cutty Sark
  {
    id: 'tw-c13-t4-p1-1',
    passage_id: 'cambridge-13-test-4-p1',
    word: 'clipper',
    part_of_speech: 'noun',
    ipa: '/ˈklɪp.ər/',
    meaning_en: 'A fast sailing ship, especially one of 19th-century design with three or more masts and a square rig.',
    meaning_vi: 'Thuyền buồm cao tốc thế kỷ 19 dùng chở trà và len viễn dương.',
    context_sentence: 'Cutty Sark was celebrated as the ultimate pinnacle of British commercial clipper engineering.'
  },
  {
    id: 'tw-c13-t4-p1-2',
    passage_id: 'cambridge-13-test-4-p1',
    word: 'obsolescent',
    part_of_speech: 'adjective',
    ipa: '/ˌɒb.səˈles.ənt/',
    meaning_en: 'Becoming obsolete; going out of use.',
    meaning_vi: 'Đang dần lỗi thời, bị công nghệ mới thay thế.',
    context_sentence: 'The opening of the Suez Canal rendered long-haul sailing vessels increasingly obsolescent compared to steamships.'
  },
  {
    id: 'tw-c13-t4-p1-3',
    passage_id: 'cambridge-13-test-4-p1',
    word: 'composite',
    part_of_speech: 'adjective',
    ipa: '/ˈkɒm.pə.zɪt/',
    meaning_en: 'Made up of various parts or elements.',
    meaning_vi: 'Kết cấu hỗn hợp (khung sắt bọc gỗ tếch chắc chắn).',
    context_sentence: 'Her revolutionary composite construction combined an iron frame with durable teak and American rock elm planking.'
  },
  {
    id: 'tw-c13-t4-p1-4',
    passage_id: 'cambridge-13-test-4-p1',
    word: 'maritime',
    part_of_speech: 'adjective',
    ipa: '/ˈmær.ɪ.taɪm/',
    meaning_en: 'Connected with the sea, especially in relation to seafaring commercial or military activity.',
    meaning_vi: 'Thuộc hàng hải, biển cả và vận tải thương mại viễn dương.',
    context_sentence: 'The Cutty Sark remains a global icon of Victorian maritime ambition and naval craftsmanship.'
  },

  // Test 4 - Passage 2: Saving the soil
  {
    id: 'tw-c13-t4-p2-1',
    passage_id: 'cambridge-13-test-4-p2',
    word: 'degradation',
    part_of_speech: 'noun',
    ipa: '/ˌdeɡ.rəˈdeɪ.ʃən/',
    meaning_en: 'The condition or process of degrading or being degraded; deterioration.',
    meaning_vi: 'Sự thoái hóa, suy kiệt độ phì nhiêu và chất lượng đất canh tác.',
    context_sentence: 'Intensive synthetic agriculture has precipitated widespread soil degradation and erosion across vulnerable biomes.'
  },
  {
    id: 'tw-c13-t4-p2-2',
    passage_id: 'cambridge-13-test-4-p2',
    word: 'microbiome',
    part_of_speech: 'noun',
    ipa: '/ˌmaɪ.krəʊˈbaɪ.əʊm/',
    meaning_en: 'A community of microorganisms that inhabit a particular environment.',
    meaning_vi: 'Hệ vi sinh vật đất đóng vai trò cố định đạm và nuôi dưỡng rễ cây.',
    context_sentence: 'A healthy underground soil microbiome contains billions of fungal hyphae and bacteria essential for plant vitality.'
  },
  {
    id: 'tw-c13-t4-p2-3',
    passage_id: 'cambridge-13-test-4-p2',
    word: 'regenerative',
    part_of_speech: 'adjective',
    ipa: '/rɪˈdʒen.ər.ə.tɪv/',
    meaning_en: 'Tending or having power to regenerate; capable of restoring renewal.',
    meaning_vi: 'Tái sinh, phục hồi sinh thái bền vững cho đất mẹ.',
    context_sentence: 'Agronomists champion regenerative farming practices like no-till cultivation and mixed cover cropping.'
  },
  {
    id: 'tw-c13-t4-p2-4',
    passage_id: 'cambridge-13-test-4-p2',
    word: 'humus',
    part_of_speech: 'noun',
    ipa: '/ˈhjuː.məs/',
    meaning_en: 'The organic component of soil, formed by the decomposition of leaves and other plant material by soil microorganisms.',
    meaning_vi: 'Mùn hữu cơ, thành phần giàu dưỡng chất nhất của tầng đất mặt.',
    context_sentence: 'Conserving the topsoil humus layer is paramount to mitigating climate change via carbon sequestration.'
  },

  // Test 4 - Passage 3: Book review: The History of Happiness
  {
    id: 'tw-c13-t4-p3-1',
    passage_id: 'cambridge-13-test-4-p3',
    word: 'eudaimonia',
    part_of_speech: 'noun',
    ipa: '/juː.daɪˈmoʊ.ni.ə/',
    meaning_en: 'A Greek word commonly translated as happiness or flourishing, associated with human fulfillment through virtuous action.',
    meaning_vi: 'Hạnh phúc đích thực thông qua sống đạo đức và hoàn thiện nhân cách (triết học Hy Lạp).',
    context_sentence: 'Aristotle differentiated fleeting sensory pleasure from eudaimonia, the lifelong pursuit of moral excellence.'
  },
  {
    id: 'tw-c13-t4-p3-2',
    passage_id: 'cambridge-13-test-4-p3',
    word: 'hedonism',
    part_of_speech: 'noun',
    ipa: '/ˈhed.ən.ɪ.zəm/',
    meaning_en: 'The pursuit of pleasure; sensual self-indulgence.',
    meaning_vi: 'Chủ nghĩa khoái lạc, chỉ mưu cầu lạc thú cảm giác tức thời.',
    context_sentence: 'Modern commercialized happiness culture conflates emotional tranquility with unbridled sensory hedonism.'
  },
  {
    id: 'tw-c13-t4-p3-3',
    passage_id: 'cambridge-13-test-4-p3',
    word: 'commodification',
    part_of_speech: 'noun',
    ipa: '/kəˌmɒd.ɪ.fɪˈkeɪ.ʃən/',
    meaning_en: 'The transformation of goods, services, ideas and people into commodities, or objects of trade.',
    meaning_vi: 'Sự thương mại hóa, biến một giá trị tinh thần thành sản phẩm mua bán.',
    context_sentence: 'The book critiques the aggressive commodification of wellness into marketable corporate packages.'
  },
  {
    id: 'tw-c13-t4-p3-4',
    passage_id: 'cambridge-13-test-4-p3',
    word: 'ephemeral',
    part_of_speech: 'adjective',
    ipa: '/ɪˈfem.ər.əl/',
    meaning_en: 'Lasting for a very short time.',
    meaning_vi: 'Phù du, ngắn ngủi, mau tàn.',
    context_sentence: 'Relying on dopamine surges creates ephemeral contentment that swiftly dissolves into existential anxiety.'
  }
];

async function seedCambridge13Vocab() {
  console.log(`📚 Đang nạp ${vocabData.length} từ vựng học thuật C1-C2 cho Cambridge 13...`);

  let inserted = 0;
  for (const tw of vocabData) {
    await db.query(
      `INSERT INTO cambridge_target_words
        (id, passage_id, word, part_of_speech, ipa, meaning_en, meaning_vi, context_sentence)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE
        word = VALUES(word), part_of_speech = VALUES(part_of_speech), ipa = VALUES(ipa),
        meaning_en = VALUES(meaning_en), meaning_vi = VALUES(meaning_vi),
        context_sentence = VALUES(context_sentence)`,
      [tw.id, tw.passage_id, tw.word, tw.part_of_speech, tw.ipa, tw.meaning_en, tw.meaning_vi, tw.context_sentence]
    );
    inserted++;
  }

  console.log(`✅ Đã nạp thành công ${inserted} từ vựng C1-C2 vào CSDL MySQL!`);
}

module.exports = { seedCambridge13Vocab };

if (require.main === module) {
  seedCambridge13Vocab()
    .then(() => {
      console.log('🎉 Hoàn tất nạp từ vựng Cambridge 13!');
      process.exit(0);
    })
    .catch((err) => {
      console.error('❌ Lỗi nạp từ vựng:', err);
      process.exit(1);
    });
}
