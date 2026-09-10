import { Star, Award } from 'lucide-react';

export const AcademicEvidence: React.FC = () => {
  const testimonials = [
    {
      name: 'Đặng Minh Chiến',
      role: 'Học viên • IELTS 8.0 (Reading 8.5)',
      affiliation: 'Đại Học Bách Khoa Hà Nội',
      avatar:
        'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80',
      content:
        'Kho đề thi Cambridge IELTS trên EduFlow rất đầy đủ và tiện lợi. Mình có thể làm Full Test 60 phút hoặc luyện riêng từng Passage lúc rảnh rỗi. Tra từ điển trực tiếp trên bài đọc rồi lưu sang thẻ Anki chỉ với 1 chạm giúp mình nhớ từ cực lâu và đạt Reading 8.5.',
      score: 'Reading 8.5',
    },
    {
      name: 'Nguyễn Phương Thảo',
      role: 'Du học sinh Úc • IELTS 8.5',
      affiliation: 'The University of Melbourne',
      avatar:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80',
      content:
        'Phần luyện nghe chép chính tả Dictation từng câu rất chất lượng. Gõ từ nào sai là máy báo đỏ ngay để mình sửa. Nhờ luyện đều đặn mỗi ngày mà phản xạ nghe bắt âm của mình cải thiện rõ rệt, không còn bị sót âm đuôi nữa.',
      score: 'Overall 8.5',
    },
    {
      name: 'Lê Quốc Bảo',
      role: 'Thủ khoa Khối D1 • 9.8đ Tiếng Anh',
      affiliation: 'Trường THPT Chuyên',
      avatar:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
      content:
        'Bộ thẻ Anki 3D lật thẻ rất trực quan, tự động nhắc ôn lại đúng ngày nên không lo học trước quên sau. Thay vì chép từ vựng ra giấy mất thời gian, học trực tiếp trên EduFlow giúp mình tiết kiệm một nửa thời gian ôn thi.',
      score: '9.8đ THPT QG',
    },
  ];

  return (
    <section id="evidence" className="py-20 bg-transparent border-b border-stone-200/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200/80 text-amber-900 text-xs font-sans font-bold tracking-normal shadow-xs">
            <Award className="w-3.5 h-3.5 text-amber-700" />
            <span>Đánh Giá Từ Học Viên</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-bold text-[#064E3B] tracking-tight leading-tight">
            Cảm Nhận Thực Tế Từ Người Học
          </h2>

          <p className="text-sm sm:text-base text-stone-600 font-sans leading-relaxed">
            Những chia sẻ chân thật từ các bạn học viên đã tiến bộ và bứt phá điểm số cùng EduFlow.
          </p>
        </div>

        {/* 3 Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((item, idx) => (
            <div
              key={idx}
              className="p-7 rounded-3xl bg-white border border-stone-200/90 shadow-xs hover:shadow-md hover:border-amber-300 transition-all flex flex-col justify-between space-y-6 text-left group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={15} className="fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  <span className="px-2.5 py-0.5 rounded-full bg-[#064E3B] text-amber-300 text-[10px] font-mono font-bold uppercase tracking-wider">
                    {item.score}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-sans font-normal">
                  "{item.content}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-stone-100">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-11 h-11 rounded-full object-cover border-2 border-amber-300/60 shadow-xs"
                />
                <div className="overflow-hidden">
                  <h4 className="text-xs font-bold text-[#064E3B] truncate font-sans">
                    {item.name}
                  </h4>
                  <p className="text-[11px] text-stone-500 truncate">{item.role}</p>
                  <p className="text-[10px] font-sans text-amber-800 truncate font-medium">{item.affiliation}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
