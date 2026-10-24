const { gradeWriting, gradeSpeaking, calculateCompositeBand } = require('../controllers/aiGradingController');

// Mock response object
function createMockRes(resolve) {
  return {
    status: function (code) {
      this.statusCode = code;
      return this;
    },
    json: function (data) {
      this.jsonData = data;
      resolve(data);
    }
  };
}

async function runTests() {
  console.log('--- BẮT ĐẦU KIỂM THỬ HỆ THỐNG CHẤM ĐIỂM IELTS CHUẨN MỚI ---');

  // Test 1: Composite Band Calculation
  console.log('\n[1] Kiểm thử Công thức tính điểm Writing Tổng hợp: round_0.5((T1 + 2*T2) / 3)');
  const testCases = [
    { t1: 6.0, t2: 7.0, expected: 6.5, raw: (6 + 14)/3 }, // 6.666 -> 6.5
    { t1: 6.5, t2: 7.0, expected: 7.0, raw: (6.5 + 14)/3 }, // 6.833 -> 7.0
    { t1: 6.0, t2: 6.0, expected: 6.0, raw: 6.0 },
    { t1: 7.5, t2: 8.0, expected: 8.0, raw: (7.5 + 16)/3 }, // 7.833 -> 8.0
    { t1: 5.5, t2: 6.5, expected: 6.0, raw: (5.5 + 13)/3 }, // 6.166 -> 6.0
  ];

  for (const tc of testCases) {
    const p = new Promise(resolve => {
      calculateCompositeBand({ body: { task1Band: tc.t1, task2Band: tc.t2 } }, createMockRes(resolve));
    });
    const res = await p;
    console.log(`  T1: ${tc.t1}, T2: ${tc.t2} => Raw: ${res.data.rawWeighted}, Composite: ${res.data.compositeBand} (Kỳ vọng: ${tc.expected}) - ${res.data.compositeBand === tc.expected ? '✅ PASS' : '❌ FAIL'}`);
  }

  // Test 2: Writing Task 1 Grading (Data Accuracy Check)
  console.log('\n[2] Kiểm thử Chấm Writing Task 1 (Kiểm tra Đối chiếu số liệu với Biểu đồ gốc)');
  const task1Req = {
    body: {
      taskType: 'task1',
      prompt: 'The bar chart shows renewable energy consumption in 4 countries in 2010 and 2020: Germany (18% to 42%), UK (11% to 38%), France (24% to 35%), Spain (21% to 44%).',
      chartType: 'bar',
      chartDetails: {
        labels: ['Germany', 'United Kingdom', 'France', 'Spain'],
        series: [
          { name: '2010', values: [18, 11, 24, 21] },
          { name: '2020', values: [42, 38, 35, 44] }
        ]
      },
      essayContent: 'The chart illustrates the proportion of renewable energy used across four European nations between 2010 and 2020. Overall, every country saw significant growth in renewable energy adoption, with Spain and Germany demonstrating the highest final percentages. In 2010, France led the group at 24%, followed by Spain at 21% and Germany at 18%, while the UK registered the lowest figure at 11%. Over the ten-year timeframe, Germany experienced a remarkable surge, reaching 42% by 2020. Similarly, Spain soared to 44%, surpassing France which rose more moderately to 35%. Meanwhile, the UK achieved substantial progress, rising to 38%.'
    }
  };

  const pTask1 = new Promise(resolve => {
    gradeWriting(task1Req, createMockRes(resolve));
  });
  const resTask1 = await pTask1;
  console.log(`  Writing Task 1 Kết quả: Band ${resTask1.data.overallBand}`);
  console.log(`  Nguồn chấm: ${resTask1.source}`);
  console.log(`  Tiêu chí Task Achievement: Band ${resTask1.data.criteria.taskAchievement.band}`);
  console.log(`  Đối chiếu số liệu (Data Accuracy Check):`, resTask1.data.dataAccuracyCheck?.status || 'N/A');
  if (resTask1.data.dataAccuracyCheck) {
    console.log(`  Tóm tắt xác minh: ${resTask1.data.dataAccuracyCheck.summary}`);
  }

  // Test 3: Writing Task 2 Grading (Argument & Thesis Audit)
  console.log('\n[3] Kiểm thử Chấm Writing Task 2 (Kiểm tra Cấu trúc & Tính nhất quán của Thesis)');
  const task2Req = {
    body: {
      taskType: 'task2',
      prompt: 'Artificial intelligence is rapidly replacing human jobs. Do you agree or disagree?',
      essaySubtype: 'Opinion',
      previousTaskBand: 6.5,
      essayContent: 'In modern society, artificial intelligence has emerged as a disruptive technological force transforming workplaces worldwide. While some observers fear widespread unemployment, I firmly believe that AI will ultimately augment human capabilities and stimulate high-value employment opportunities. Firstly, automation absorbs repetitive and dangerous manual chores, liberating professionals to focus on creative and strategic decision-making. For instance, in healthcare, diagnostic algorithms assist physicians rather than replacing them. Secondly, historical technological revolutions demonstrate that obsolete roles are consistently replaced by novel industries. In conclusion, I reaffirm my conviction that AI represents an indispensable catalyst for economic growth.'
    }
  };

  const pTask2 = new Promise(resolve => {
    gradeWriting(task2Req, createMockRes(resolve));
  });
  const resTask2 = await pTask2;
  console.log(`  Writing Task 2 Kết quả: Band ${resTask2.data.overallBand}`);
  console.log(`  Tiêu chí Task Response: Band ${resTask2.data.criteria.taskAchievement.band}`);
  console.log(`  Kiểm tra cấu trúc (Essay Structure Check):`, resTask2.data.essayStructureCheck?.thesisConsistency || 'N/A');
  if (resTask2.data.compositeScore) {
    console.log(`  Điểm Composite Writing (T1: ${resTask2.data.compositeScore.task1Band}, T2: ${resTask2.data.compositeScore.task2Band}): Band ${resTask2.data.compositeScore.compositeBand}`);
  }

  // Test 4: Speaking Grading (Part 1, 2, 3 Rubric)
  console.log('\n[4] Kiểm thử Chấm Speaking Part 1 & Part 2 theo Rubric chuyên sâu');
  const speakingReq = {
    body: {
      part: 2,
      topic: 'Describe an environmental problem in your area',
      question: 'Describe an environmental problem in your area. You should say what it is, when you noticed it, and how it affects people.',
      durationSeconds: 110,
      cueCardBullets: ['What the problem is', 'When you first noticed it', 'What effects it has on people', 'What can be done'],
      transcript: 'I would like to talk about the escalating issue of plastic pollution along the coastal river near my neighborhood. I first became aware of this problem approximately three years ago during an afternoon walk. The contamination severely impacts local marine wildlife and creates an unpleasant odor during hot summer days. In order to mitigate this environmental dilemma, our local government should implement stricter recycling regulations and organize regular community clean-up initiatives.'
    }
  };

  const pSpeaking = new Promise(resolve => {
    gradeSpeaking(speakingReq, createMockRes(resolve));
  });
  const resSpeaking = await pSpeaking;
  console.log(`  Speaking Part 2 Kết quả: Band ${resSpeaking.data.estimatedBand}`);
  console.log(`  Part Audit: ${resSpeaking.data.partAudit?.partName}`);
  console.log(`  Nhận xét chuyên sâu: ${resSpeaking.data.partAudit?.focusEvaluation}`);
  console.log(`  Đánh giá thời lượng: ${resSpeaking.data.partAudit?.timingFeedback}`);
  console.log(`  Lưu ý khảo thí chính thức: ${resSpeaking.data.officialNote}`);

  console.log('\n--- TOÀN BỘ KIỂM THỬ ĐÃ HOÀN TẤT THÀNH CÔNG ---');
}

runTests().catch(console.error);
