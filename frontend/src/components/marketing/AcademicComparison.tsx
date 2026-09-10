import { XCircle, CheckCircle2, Scale } from 'lucide-react';

export const AcademicComparison: React.FC = () => {
  return (
    <section id="methodology" className="py-20 bg-[#FAFAF9]/85 backdrop-blur-[2px] border-b border-stone-300 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#064E3B] border border-amber-500/40 text-amber-300 text-xs font-sans font-bold tracking-normal shadow-xs">
            <Scale className="w-3.5 h-3.5 text-amber-400" />
            <span>So Sánh Phương Pháp Học</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-bold text-[#064E3B] tracking-normal leading-tight">
            Học Thực Chiến vs.{' '}
            <span className="italic font-sans font-normal text-stone-500">
              Lối Mòn Thụ Động
            </span>
          </h2>

          <p className="text-sm sm:text-base text-stone-600 font-sans leading-relaxed">
            Tại sao phương pháp kết hợp Luyện đề Cambridge, Dictation chép chính tả và Thẻ Anki giúp bạn tiến bộ vượt trội.
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
                    Cách Học Cũ Thụ Động
                  </h3>
                  <p className="text-xs text-stone-500 font-sans">
                    Nặng về ghi nhớ máy móc, không có phản hồi tức thì
                  </p>
                </div>
              </div>

              <ul className="space-y-4 text-xs sm:text-sm text-stone-700">
                <li className="flex items-start gap-3">
                  <XCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Học từ vựng theo danh sách rời rạc:</strong> Chép danh sách từ không có ngữ cảnh câu cụ thể,
                    rất nhanh quên chỉ sau vài ngày.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Nghe thụ động trôi tuột:</strong> Bật audio nghe lướt qua mà không tự gõ lại,
                    không nhận ra mình nghe sai âm hay sai chính tả ở đâu.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Dịch từng từ word-by-word:</strong> Thói quen tra từ tách rời bài đọc khiến bạn đọc chậm
                    và không hiểu trọn vẹn mạch ý của bài thi IELTS.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Ôn tập ngẫu hứng không đều đặn:</strong> Không có lịch ôn ngắt quãng khoa học,
                    từ vựng học hôm trước hôm sau đã quên sạch.
                  </span>
                </li>
              </ul>
            </div>

            <div className="pt-4 border-t border-stone-100 text-[11px] text-stone-400 font-sans">
              Hiệu quả ghi nhớ thực tế: Thường quên 70% sau 1 tuần
            </div>
          </div>

          {/* Column 2: EduFlow Method */}
          <div className="p-8 rounded-3xl bg-[#064E3B] text-white border border-emerald-800 shadow-xl space-y-6 flex flex-col justify-between relative overflow-hidden">
            <div className="space-y-4 relative z-10">
              <div className="flex items-center gap-3 pb-4 border-b border-emerald-800/80">
                <div className="w-10 h-10 rounded-xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-300">
                  <CheckCircle2 size={22} />
                </div>
                <div>
                  <h3 className="text-lg font-sans font-bold text-white flex items-center gap-2">
                    Phương Pháp EduFlow
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/40 font-sans font-bold">
                      3 Bước Rõ Ràng
                    </span>
                  </h3>
                  <p className="text-xs text-stone-200 font-sans">
                    [Đọc Đề Thật] ➔ [Nghe Chép Câu] ➔ [Ôn Thẻ Anki]
                  </p>
                </div>
              </div>

              <ul className="space-y-4 text-xs sm:text-sm text-stone-200">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-amber-300">Bước 1 • Luyện Đọc Cambridge Đề Thật:</strong> Làm đề thi Cambridge 10 - 20,
                    chọn làm Full Test 60 phút hoặc từng Passage, tra từ điển Popover và lưu Anki 1-click.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-amber-300">Bước 2 • Nghe Chép Chính Tả (Dictation):</strong> Nghe từng câu ngắn,
                    gõ lại và hệ thống đối soát từng từ: đúng hiện xanh, sai hiện đỏ giúp bạn sửa lỗi nghe ngay.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-amber-300">Bước 3 • Ôn Thẻ 3D Anki (Spaced Repetition):</strong> Thẻ lật 3D trực quan,
                    tự động nhắc ôn lại đúng thời điểm giúp từ vựng ghi sâu vào trí nhớ dài hạn.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-amber-300">Thực Hành Toàn Diện 4 Kỹ Năng:</strong> Rèn luyện Nghe, Nói phát âm âm vị,
                    Đọc hiểu bài Cambridge và Viết học thuật có chấm điểm chi tiết.
                  </span>
                </li>
              </ul>
            </div>

            <div className="pt-4 border-t border-emerald-800 text-[11px] text-amber-300 font-sans relative z-10">
              Hiệu quả ghi nhớ: Nhớ lâu gấp 3 lần và phản xạ tự nhiên khi làm bài thi
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
