import { Star, Award } from 'lucide-react';

export const AcademicEvidence: React.FC = () => {
  const testimonials = [
    {
      name: 'Đặng Minh Chiến',
      role: 'Học viên Nghiên cứu • IELTS 7.5 (Speaking 7.5)',
      affiliation: 'Đại Học Bách Khoa Hà Nội',
      avatar:
        'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80',
      content:
        'Biểu đồ phổ sóng âm Waveform của EduFlow đã trực quan hóa chuẩn xác các cặp âm dễ nhầm như /θ/ và /s/. Sau 14 ngày học liên tục, phản xạ phát âm của mình đạt chuẩn bản xứ và tự tin đạt 7.5 Speaking.',
      score: 'IELTS 7.5',
    },
    {
      name: 'Nguyễn Phương Thảo',
      role: 'Nghiên cứu sinh Du học Úc • IELTS 8.5',
      affiliation: 'The University of Melbourne',
      avatar:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80',
      content:
        'Công cụ chấm luận văn Academic Writing Evaluator của EduFlow phân tích cực kỳ sát sao 4 tiêu chí Band Descriptors. Những khuyến nghị thay thế từ vựng sang chuẩn học thuật C1-C2 đã giúp mình nâng band từ 7.0 lên 8.5.',
      score: 'Overall 8.5',
    },
    {
      name: 'Lê Quốc Bảo',
      role: 'Thủ khoa Tiếng Anh Khối D1 • 9.8đ',
      affiliation: 'Trường THPT Chuyên',
      avatar:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
      content:
        'Cây ngữ pháp kiến tạo kéo thả Token và các bài tập Dictation A-B loop giúp em loại bỏ hoàn toàn các lỗi sai bẫy ngữ pháp trong đề thi trắc nghiệm. Một phương pháp tư duy vượt trội so với học thuộc lòng.',
      score: '9.8đ THPT QG',
    },
  ];

  return (
    <section id="evidence" className="py-20 bg-[#FAFAF9]/85 backdrop-blur-[2px] border-b border-stone-300 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100/80 border border-amber-300 text-amber-900 text-xs font-mono font-bold tracking-normal uppercase shadow-xs">
            <Award className="w-3.5 h-3.5 text-amber-700" />
            <span>Minh Chứng Thực Nghiệm</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-bold text-[#064E3B] tracking-normal leading-tight">
            Ghi Nhận Từ Cộng Đồng Nghiên Cứu
          </h2>

          <p className="text-sm sm:text-base text-stone-600 font-sans leading-relaxed">
            Những chia sẻ thực tế từ các học sinh, sinh viên và nghiên cứu sinh đã bứt phá điểm số
            cùng hệ thống phương pháp luận EduFlow Institute.
          </p>
        </div>

        {/* 3 Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, idx) => (
            <div
              key={idx}
              className="p-7 rounded-3xl bg-white border border-stone-300 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between space-y-6 text-left"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-gold-600">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={15} className="fill-gold-500 text-gold-500" />
                    ))}
                  </div>

                  <span className="px-2.5 py-0.5 rounded-full bg-forest-950 text-gold-300 text-[10px] font-mono font-bold uppercase tracking-wider">
                    {item.score}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-sans italic font-normal">
                  "{item.content}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-stone-200">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-11 h-11 rounded-full object-cover border-2 border-gold-400/40 shadow-xs"
                />
                <div className="overflow-hidden">
                  <h4 className="text-xs font-bold text-forest-950 truncate font-sans">
                    {item.name}
                  </h4>
                  <p className="text-[11px] text-stone-500 truncate">{item.role}</p>
                  <p className="text-[10px] font-mono text-gold-700 truncate">{item.affiliation}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
