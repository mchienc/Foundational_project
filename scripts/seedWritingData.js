// scripts/seedWritingData.js
// Khởi tạo bảng và nạp dữ liệu mẫu đề thi chuẩn IELTS Academic cho AI Writing Evaluator

const fs = require('fs');
const path = require('path');
const db = require('../config/db');

async function seedWritingData() {
  console.log('--- ĐANG KHỞI TẠO CSDL CHO AI ACADEMIC WRITING EVALUATOR ---');

  try {
    // 1. Chạy file SQL tạo bảng
    const sqlPath = path.join(__dirname, '../database/create_writing_tables.sql');
    const sql = fs.readFileSync(sqlPath, 'utf8');
    const statements = sql
      .split(';')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    for (const stmt of statements) {
      await db.query(stmt);
    }
    console.log('✔ Đã tạo bảng english_writing_prompts và english_writing_submissions thành công!');

    // 2. Kiểm tra nếu đã có prompts thì không nạp trùng
    const [existing] = await db.query('SELECT COUNT(*) AS count FROM english_writing_prompts');
    if (existing[0].count > 0) {
      console.log(`ℹ Bảng english_writing_prompts đã có ${existing[0].count} đề thi. Bỏ qua bước nạp trùng.`);
      process.exit(0);
    }

    // 3. Danh sách đề thi mẫu chất lượng cao (IELTS Academic Task 1 & 2)
    const prompts = [
      {
        title: 'Artificial Intelligence and Future Employment',
        task_type: 'task_2',
        category: 'Technology & Economy',
        target_band: 'Band 7.5 - 8.5',
        min_words: 250,
        prompt_text:
          'Some people believe that artificial intelligence and automation will lead to massive unemployment and social inequality, while others argue that AI will generate new industries and higher-value job opportunities. Discuss both views and give your own opinion.',
        suggested_ideas: JSON.stringify([
          {
            perspective: 'Rủi ro thất nghiệp & bất bình đẳng',
            points: [
              'Tự động hóa các công việc lặp lại (dây chuyền sản xuất, nhập liệu, dịch vụ khách hàng cơ bản).',
              'Khoảng cách kỹ năng ngày càng rộng, người lao động lớn tuổi hoặc thiếu đào tạo công nghệ dễ bị gạt ra ngoài lề.',
              'Gia tăng sự tập trung của cải vào các tập đoàn công nghệ khổng lồ.'
            ]
          },
          {
            perspective: 'Cơ hội việc làm mới & nâng cao năng suất',
            points: [
              'Sự xuất hiện của các ngành nghề mới: Kỹ sư Prompt, chuyên gia kiểm thử đạo đức AI, quản trị dữ liệu.',
              'AI đóng vai trò trợ lý thông minh (copilot), giúp giải phóng con người khỏi việc hành chính vụn vặt để tập trung vào sáng tạo và tư duy chiến lược.',
              'Thúc đẩy tăng trưởng kinh tế tổng thể, từ đó tạo ra nhu cầu tiêu dùng và dịch vụ mới.'
            ]
          },
          {
            perspective: 'Quan điểm cá nhân (Thesis statement)',
            points: [
              'AI sẽ gây xáo trộn ngắn hạn nhưng về dài hạn sẽ tạo ra nhiều giá trị hơn, với điều kiện chính phủ và doanh nghiệp phải chủ động tái đào tạo kỹ năng cho người lao động.'
            ]
          }
        ]),
        sample_band8_essay:
          `In recent years, the rapid proliferation of artificial intelligence has sparked a fierce debate regarding its ramifications for the labor market. While a considerable segment of society contends that automation will inevitably precipitate widespread joblessness and exacerbate social disparities, proponents maintain that it will catalyze the emergence of novel industries. This essay will examine both perspectives before articulating my view that AI, although disruptive in the transitional phase, will ultimately prove conducive to economic evolution if proactively managed.\n\nOn the one hand, apprehensions concerning mass displacement are well-substantiated. Historically, technological revolutions disproportionately affected manual labor; however, the contemporary AI revolution permeates cognitive domains, including graphic design, legal paralegal work, and software engineering. Consequently, individuals lacking specialized digital literacy face imminent obsolescence. Furthermore, the capital-intensive nature of AI infrastructure threatens to concentrate economic surplus in the hands of a few tech conglomerates, thereby widening the chasm between capital owners and conventional laborers.\n\nConversely, technological advancements have historically acted as catalysts for structural metamorphosis rather than sheer annihilation of work. The obsolescence of obsolete roles is typically counterbalanced by the genesis of higher-value vocations such as machine learning orchestration, algorithmic ethics oversight, and data stewardship. Moreover, by automating mundane and repetitive workflows, cognitive algorithms empower professionals to concentrate on strategic ideation and emotional intelligence—attributes that remain irreproducibly human.\n\nIn conclusion, while the transition towards an AI-dominated economy poses palpable socioeconomic challenges, I am convinced that its trajectory is fundamentally progressive. To harness its transformative potential while mitigating societal friction, governments must institute comprehensive reskilling initiatives and adaptive social safety nets.`
      },
      {
        title: 'Online Learning vs Traditional Face-to-Face Education',
        task_type: 'task_2',
        category: 'Education & Pedagogy',
        target_band: 'Band 7.0 - 8.0',
        min_words: 250,
        prompt_text:
          'With the advent of high-speed internet and digital platforms, many universities now offer fully online degree programs. Some educators argue that traditional on-campus education is becoming obsolete, while others maintain that physical classrooms provide irreplaceable benefits. To what extent do you agree or disagree?',
        suggested_ideas: JSON.stringify([
          {
            perspective: 'Lợi thế của giáo dục trực tuyến (Digital Modality)',
            points: [
              'Tính linh hoạt tối đa về không gian và thời gian cho người đi làm.',
              'Tiết kiệm chi phí đi lại, ăn ở và tài liệu học tập.',
              'Tiếp cận các khóa học hàng đầu thế giới mà không bị rào cản địa lý.'
            ]
          },
          {
            perspective: 'Giá trị cốt lõi của đại học truyền thống (On-campus Experience)',
            points: [
              'Tương tác xã hội thực tế, rèn luyện kỹ năng mềm và kỹ năng làm việc nhóm trực tiếp.',
              'Mạng lưới quan hệ (Networking), không gian nghiên cứu phòng thí nghiệm chuyên sâu.',
              'Kỷ luật học tập và môi trường học thuật tập trung.'
            ]
          }
        ]),
        sample_band8_essay:
          `The pedagogical landscape has witnessed an unprecedented transformation over the past decade, propelled by advancements in educational technology and digital infrastructure. While digital learning environments offer unprecedented flexibility, I strongly disagree with the assertion that conventional on-campus higher education has been rendered obsolete. On the contrary, the holistic developmental value provided by physical institutions remains fundamentally irreplaceable.\n\nUndeniably, distance learning platforms have democratized access to quality knowledge. Geographical boundaries no longer impede ambitious learners from accessing academic materials synthesized by premier institutions. Additionally, the asynchronous nature of virtual coursework accommodates non-traditional students and working professionals who must reconcile occupational commitments with academic pursuits. The cost-effectiveness of virtual degrees also lessens financial strain on disadvantaged socio-economic demographics.\n\nNevertheless, reducing education to the mere transmission of pedagogical content is a profound oversight. University campuses function as social incubators where students cultivate interpersonal dynamics, cross-cultural empathy, and leadership acumen through spontaneous debate and collaborative projects. In addition, fields requiring empirical experimentation—such as biotechnology, mechanical engineering, and clinical medicine—demand physical presence in specialized laboratories. Furthermore, the mentorship fostered through informal student-faculty discourse cannot be replicated through pixelated videoconferencing interfaces.\n\nIn summary, while virtual academies constitute a commendable supplement to modern education, they cannot entirely supersede the multifaceted collegiate experience. A hybrid educational model combining digital autonomy with physical engagement represents the optimal pedagogical future.`
      },
      {
        title: 'Global Renewable vs Fossil Fuel Energy Consumption (2000-2025)',
        task_type: 'task_1',
        category: 'Environmental Science & Data',
        target_band: 'Band 7.5+',
        min_words: 150,
        prompt_text:
          'The chart illustrates the consumption of energy derived from fossil fuels (coal, oil, natural gas) compared to renewable sources (solar, wind, hydropower) across major global economies between 2000 and 2025, measured in terawatt-hours (TWh). Summarise the information by selecting and reporting the main features, and make comparisons where relevant.',
        chart_image_url: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800&auto=format&fit=crop&q=80',
        suggested_ideas: JSON.stringify([
          {
            perspective: 'Overview (Tổng quan)',
            points: [
              'Năng lượng hóa thạch vẫn chiếm tỷ trọng chi phối nhưng có xu hướng chững lại sau năm 2015.',
              'Năng lượng tái tạo (đặc biệt là điện gió và điện mặt trời) tăng trưởng theo cấp số nhân trong giai đoạn 2010 - 2025.'
            ]
          },
          {
            perspective: 'Chi tiết (Body Paragraphs)',
            points: [
              'Đoạn 1: Số liệu hóa thạch qua các năm mốc 2000, 2015 và 2025.',
              'Đoạn 2: Tốc độ bứt phá của năng lượng tái tạo từ mức xuất phát điểm thấp lên mức đóng góp đáng kể.'
            ]
          }
        ]),
        sample_band8_essay:
          `The provided chart delineates global energy utilization delineated into fossil fuels and sustainable renewable alternatives from 2000 to 2025, with figures quantified in terawatt-hours (TWh).\n\nOverall, it is readily discernible that fossil fuels retained absolute dominance throughout the entirety of the timeline despite experiencing plateauing trajectories in the latter decade. Concurrently, renewable power witnessed an exponential proliferation, escalating from a negligible proportion to an instrumental energy contributor by 2025.\n\nIn 2000, conventional hydrocarbons accounted for an overwhelming 85,000 TWh of global generation, whereas renewables contributed a modest 2,500 TWh, primarily driven by hydroelectricity. Over the subsequent fifteen years, fossil fuel usage surged consistently to reach an apex of approximately 110,000 TWh in 2015 before stabilizing at around 108,000 TWh by the terminal year 2025.\n\nConversely, sustainable energy demonstrated remarkable dynamism. After exhibiting moderate increments up to 2010, the deployment of photovoltaic solar and wind turbine installations catalyzed a dramatic expansion. From approximately 6,000 TWh in 2010, renewable generation surged almost fivefold to attain approximately 28,000 TWh by 2025, narrowing the historic disparity with conventional combustibles.`
      }
    ];

    for (const p of prompts) {
      await db.query(
        `INSERT INTO english_writing_prompts 
         (title, task_type, category, target_band, min_words, prompt_text, chart_image_url, suggested_ideas, sample_band8_essay)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          p.title,
          p.task_type,
          p.category,
          p.target_band,
          p.min_words,
          p.prompt_text,
          p.chart_image_url || null,
          p.suggested_ideas,
          p.sample_band8_essay
        ]
      );
    }

    console.log(`✔ Đã nạp thành công ${prompts.length} đề bài IELTS Writing học thuật mẫu vào MySQL!`);
    process.exit(0);
  } catch (err) {
    console.error('❌ Lỗi khi khởi tạo CSDL writing:', err);
    process.exit(1);
  }
}

seedWritingData();
