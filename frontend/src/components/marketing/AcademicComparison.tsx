import { XCircle, CheckCircle2, Scale } from 'lucide-react';

export const AcademicComparison: React.FC = () => {
  return (
    <section id="methodology" className="py-20 bg-[#FAFAF9]/85 backdrop-blur-[2px] border-b border-stone-300 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#064E3B] border border-amber-500/40 text-amber-300 text-xs font-mono font-bold tracking-normal uppercase shadow-xs">
            <Scale className="w-3.5 h-3.5 text-amber-400" />
            <span>Đối Soát Phương Pháp Luận</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-bold text-[#064E3B] tracking-normal leading-tight">
            Khoa Học Thực Nghiệm vs.{' '}
            <span className="italic font-sans font-normal text-stone-500">
              Lối Mòn Thụ Động
            </span>
          </h2>

          <p className="text-sm sm:text-base text-stone-600 font-sans leading-relaxed">
            Sự khác biệt cốt lõi giữa phương pháp tiếp cận ngôn ngữ truyền thống và hệ thống EdTech
            AI chuẩn mực của EduFlow Institute.
          </p>
        </div>

        {/* 2-Column Comparison Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Column 1: Conventional Rote Memorization */}
          <div className="p-8 rounded-3xl bg-white border border-stone-300 shadow-xs space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-3 pb-4 border-b border-stone-200">
                <div className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-700">
                  <XCircle size={22} />
                </div>
                <div>
                  <h3 className="text-lg font-sans font-bold text-stone-800">
                    Lối Mòn Thụ Động Kiểu Cũ
                  </h3>
                  <p className="text-xs text-stone-500 font-sans">
                    Nặng về ghi nhớ máy móc, thiếu phản hồi tức thì
                  </p>
                </div>
              </div>

              <ul className="space-y-4 text-xs sm:text-sm text-stone-700">
                <li className="flex items-start gap-3">
                  <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Học từ vựng rời rạc:</strong> Chép danh sách từ không có ngữ cảnh,
                    dễ lãng quên sau 72 giờ theo quy luật suy giảm trí nhớ tự nhiên.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Dịch từng từ (Word-by-word):</strong> Não bộ phải xử lý 2 tầng ngôn ngữ
                    gây ra độ trễ ngắc ngứ khi đối thoại thực tế.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Phát âm theo cảm tính:</strong> Không có công cụ đo đạc tần số âm vị,
                    dễ bị lai tạp âm địa phương và sai lệch trọng âm từ.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Chấm sửa thủ công chậm trễ:</strong> Bài viết luận phải chờ đợi thầy cô
                    chấm 5 - 7 ngày, mất đi cơ hội sửa đổi sai sót tại thời điểm vàng.
                  </span>
                </li>
              </ul>
            </div>

            <div className="pt-4 border-t border-stone-100 text-[11px] text-stone-400 font-mono">
              Hiệu suất tiếp thu ước tính: 15% - 25% sau 30 ngày
            </div>
          </div>

          {/* Column 2: EduFlow Academic AI Method */}
          <div className="p-8 rounded-3xl bg-[#064E3B] text-white border border-emerald-800 shadow-xl space-y-6 flex flex-col justify-between relative overflow-hidden">
            <div className="space-y-4 relative z-10">
              <div className="flex items-center gap-3 pb-4 border-b border-emerald-800/80">
                <div className="w-10 h-10 rounded-xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-300">
                  <CheckCircle2 size={22} />
                </div>
                <div>
                  <h3 className="text-lg font-sans font-bold text-white flex items-center gap-2">
                    EduFlow Empirical AI
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/40 uppercase font-mono font-bold">
                      Chuẩn Cambridge
                    </span>
                  </h3>
                  <p className="text-xs text-stone-200 font-sans">
                    Phản hồi đa giác quan, bóc tách cấu trúc vi mô
                  </p>
                </div>
              </div>

              <ul className="space-y-4 text-xs sm:text-sm text-stone-200">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-gold-300">Spaced Repetition &amp; 3D Flashcard:</strong> Thuật toán
                    Leitner 5 hộp tự động kích hoạt chu kỳ lặp lại tối ưu đưa từ vựng vào vỏ não dài hạn.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-gold-300">Kiến Trúc Cú Pháp Trực Quan:</strong> Kéo thả các khối Token
                    ngữ pháp giúp tái định hình tư duy logic câu, dập tắt hoàn toàn lối dịch thô.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-gold-300">Đồ Thị Sóng Âm (Waveform AI):</strong> Đối soát phổ tần số âm
                    vị IPA thực tế với dữ liệu bản ngữ Oxford theo thời gian thực (0.12s latency).
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-gold-300">Thẩm Định Luận Văn 4 Trục:</strong> Nhận báo cáo chi tiết Band
                    1.0 - 9.0 IELTS kèm gợi ý viết lại câu nâng cao học thuật C1-C2 trong 3 giây.
                  </span>
                </li>
              </ul>
            </div>

            <div className="pt-4 border-t border-forest-800 text-[11px] text-gold-300/80 font-mono relative z-10">
              Hiệu suất phản xạ đo lường: Đột phá 78% - 94% khả năng ứng dụng
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
