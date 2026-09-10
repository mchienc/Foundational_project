import React from 'react';
import {
  Layers,
  Mic,
  Headphones,
  FileText,
  PenTool,
  Lock,
  ArrowRight,
  Cpu,
  CheckCircle2,
} from 'lucide-react';

interface FeaturePreviewsProps {
  onRequireAuth: (featureName: string) => void;
}

export const FeaturePreviews: React.FC<FeaturePreviewsProps> = ({ onRequireAuth }) => {
  const features = [
    {
      id: 'vocab-srs',
      title: 'Thẻ Từ Vựng 3D & Spaced Repetition',
      subtitle: 'Thuật toán lặp lại ngắt quãng Leitner Box 1-5',
      description:
        'Lật thẻ 3D 180 độ mượt mà với mô hình trực quan. Tự động tính toán chu kỳ lặp tối ưu dựa trên đường cong quên của Ebbinghaus, giúp ghi nhớ bền vững từ vựng Oxford & IELTS.',
      icon: <Layers className="w-6 h-6 text-blue-600" />,
      metric: '148 Từ Vựng Chuẩn Oxford',
      badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
      gradient: 'from-blue-600 to-indigo-600',
      highlights: [
        'Lật thẻ 3D hai mặt mượt mà với âm thanh phát âm bản ngữ',
        'Phân nhóm 5 hộp Leitner tự động theo độ ghi nhớ',
        'Ví dụ minh họa ngữ cảnh học thuật và từ đồng nghĩa Collocations',
      ],
      previewMock: '3D Flip Animation • Leitner Box • Native Audio',
    },
    {
      id: 'speaking',
      title: 'Phòng Thu Phát Âm & AI Waveform',
      subtitle: 'Phân tích âm vị IPA & trực quan hóa sóng âm',
      description:
        'Nhận diện giọng nói theo thời gian thực. Hệ thống AI bóc tách từng âm vị (Phoneme level), chỉ rõ trọng âm sai và đối sánh biểu đồ sóng âm của học viên với người bản xứ.',
      icon: <Mic className="w-6 h-6 text-rose-600" />,
      metric: '94% Độ Chuẩn Xác Âm Vị AI',
      badgeColor: 'bg-rose-50 text-rose-700 border-rose-200',
      gradient: 'from-rose-600 to-pink-600',
      highlights: [
        'So sánh sóng âm Waveform thời gian thực với mẫu người bản xứ',
        'Phân tích chi tiết từng âm vị nguyên âm, phụ âm và trọng âm',
        'Gợi ý vị trí đặt lưỡi và khẩu hình miệng khắc phục lỗi sai',
      ],
      previewMock: 'Microphone Stream • Waveform Visualizer • IPA Matcher',
    },
    {
      id: 'listening',
      title: 'Luyện Nghe Chủ Động & Dictation',
      subtitle: 'Trình phát A-B Loop & Chép chính tả Karaoke',
      description:
        'Chấm dứt thói quen nghe thụ động. Tính năng A-B Loop cho phép tua chậm và lặp phân đoạn khó nghe kết hợp gõ chép chính tả từng từ với hệ thống đối chiếu ký tự tức thời.',
      icon: <Headphones className="w-6 h-6 text-amber-600" />,
      metric: '32 Bài Nghe Phân Đoạn',
      badgeColor: 'bg-amber-50 text-amber-800 border-amber-200',
      gradient: 'from-amber-600 to-orange-600',
      highlights: [
        'Lặp phân đoạn A-B loop với điều chỉnh tốc độ 0.75x - 1.25x',
        'Chép chính tả thời gian thực (Dictation) kèm chấm điểm gõ đúng',
        'Đồng bộ phụ đề chạy theo nhịp như phòng thu Karaoke chuyên nghiệp',
      ],
      previewMock: 'A-B Loop Player • Real-time Dictation • Sync Transcript',
    },
    {
      id: 'sentence-builder',
      title: 'Ghép Câu Ngữ Pháp Kiến Tạo',
      subtitle: 'Interactive Grammar Token Architecture',
      description:
        'Thay thế việc học thuộc lòng quy tắc ngữ pháp khô khan bằng cơ chế kéo thả token từ vựng trực quan. Hệ thống kiểm tra cấu trúc câu (S-V-O-C) và phát hiện lỗi sai tức thì.',
      icon: <FileText className="w-6 h-6 text-emerald-600" />,
      metric: 'Kiến Trúc Ngữ Pháp Trực Quan',
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      gradient: 'from-emerald-600 to-teal-600',
      highlights: [
        'Kéo thả các khối từ (Tokens) lắp ráp trật tự câu chuẩn ngữ pháp',
        'Phát hiện tức thời lỗi thì (Tense), mệnh đề quan hệ và đảo ngữ',
        'Giải thích cặn kẽ logic cấu trúc câu ngay khi học viên thao tác sai',
      ],
      previewMock: 'Drag-and-Drop Tokens • Syntax Tree • Instant Feedback',
    },
    {
      id: 'writing',
      title: 'Chấm Viết Luận Học Thuật AI',
      subtitle: 'Academic Writing Evaluator Chuẩn IELTS Band Descriptors',
      description:
        'Gửi bài luận Task 1 & Task 2 nhận báo cáo chấm điểm chi tiết 4 tiêu chí: Task Response, Coherence & Cohesion, Lexical Resource và Grammatical Range & Accuracy trong 3 giây.',
      icon: <PenTool className="w-6 h-6 text-purple-600" />,
      metric: 'Chấm 4 Tiêu Chí IELTS Band',
      badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
      gradient: 'from-purple-600 to-violet-700',
      highlights: [
        'Đánh giá chi tiết 4 tiêu chí chính thức của hội đồng chấm IELTS',
        'Gợi ý viết lại câu (Rewriting) với từ vựng học thuật C1 - C2 cao cấp',
        'Phát hiện lỗi sai ngữ pháp, collocation và văn phong không tự nhiên',
      ],
      previewMock: 'Essay Word Count • Rubric Breakdown • C1/C2 Rewriter',
    },
  ];

  return (
    <section id="features" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-black uppercase tracking-wider">
            <Cpu className="w-3.5 h-3.5 text-brand-primary" />
            Hệ Sinh Thái Tương Tác Chuyên Sâu
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            5 Phân Hệ Học Tập Tương Tác{' '}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Ứng Dụng EdTech AI
            </span>
          </h2>

          <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed">
            Mỗi không gian được xây dựng như một phòng thí nghiệm tương tác chuyên sâu,
            giúp học viên biến kiến thức thụ động thành phản xạ ngôn ngữ thực tế.
          </p>
        </div>

        {/* Features List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((item, index) => (
            <div
              key={item.id}
              onClick={() => onRequireAuth(item.title)}
              className={`group relative flex flex-col justify-between rounded-3xl p-6 sm:p-7 border border-slate-200/90 bg-slate-50/50 hover:bg-white hover:border-slate-300 hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden ${
                index === 4 ? 'md:col-span-2 lg:col-span-1' : ''
              }`}
            >
              {/* Lock Overlay Badge on Top Right */}
              <div className="flex items-center justify-between gap-2 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-white shadow-xs border border-slate-200 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                  {item.icon}
                </div>

                {/* Lock Badge */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/90 backdrop-blur-xs text-white text-[11px] font-bold shadow-xs group-hover:bg-brand-primary transition-colors">
                  <Lock className="w-3 h-3 text-amber-400" />
                  <span>Cần đăng nhập</span>
                </div>
              </div>

              {/* Title & Description */}
              <div className="space-y-2.5 flex-1">
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-block px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider border ${item.badgeColor}`}
                  >
                    {item.metric}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight group-hover:text-brand-primary transition-colors">
                  {item.title}
                </h3>

                <p className="text-xs text-slate-500 font-semibold">{item.subtitle}</p>

                <p className="text-xs text-slate-600 leading-relaxed font-normal pt-1">
                  {item.description}
                </p>

                {/* Highlights */}
                <ul className="space-y-1.5 pt-3 border-t border-slate-200/70 text-[11px] text-slate-600">
                  {item.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Interactive Preview Mock Strip & CTA */}
              <div className="pt-5 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-[10px] font-mono text-slate-400 truncate max-w-[170px]">
                  {item.previewMock}
                </span>

                <button
                  type="button"
                  className="inline-flex items-center gap-1.5 font-black text-brand-primary group-hover:translate-x-1 transition-transform"
                >
                  <span>Mở không gian</span>
                  <Lock className="w-3.5 h-3.5 text-slate-400 group-hover:text-brand-primary transition-colors" />
                </button>
              </div>

              {/* Subtle accent border at bottom on hover */}
              <div
                className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity`}
              />
            </div>
          ))}
        </div>

        {/* Global Access Banner */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-blue-50 border border-blue-200 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-base sm:text-lg font-black text-slate-900">
              Mở Khóa Toàn Bộ 5 Phân Hệ Với Tài Khoản Học Viên EduFlow
            </h4>
            <p className="text-xs text-slate-600 max-w-xl">
              Đăng nhập ngay hôm nay để nhận trọn bộ đề thi Cambridge IELTS, luyện nghe Dictation và lưu từ vựng vào kho thẻ Anki.
            </p>
          </div>

          <button
            onClick={() => onRequireAuth('Trải nghiệm toàn bộ 5 phân hệ')}
            className="shrink-0 px-6 py-3 rounded-2xl bg-gradient-to-r from-brand-navy to-brand-primary hover:from-blue-900 hover:to-indigo-700 text-white text-xs font-black uppercase tracking-wider shadow-md shadow-blue-500/20 flex items-center gap-2 active:scale-95 transition-all cursor-pointer"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Đăng Nhập Để Mở Khóa</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
};
