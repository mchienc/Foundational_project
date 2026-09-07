import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Clock,
  CheckCircle2,
  XCircle,
  RotateCcw,
  ArrowLeft,
  Award,
} from 'lucide-react';
import { Quiz, QuizResult } from '../../types';
import { Button } from '../common/Button';
import { EASE_OUT } from '../../styles/motion';

interface QuizPlayerProps {
  quiz?: Quiz;
  onBackToPlayer: () => void;
  onCompleteQuiz: (score: number) => void;
}

const defaultQuiz: Quiz = {
  id: 'quiz-react-1',
  courseId: 'course-react-fullstack',
  lessonId: 'les-1-3',
  title: 'Bài Khảo Sát Đánh Giá: Kiến Trúc Component & Hệ Thống Motion Framer',
  durationMinutes: 10,
  questions: [
    {
      id: 'q1',
      questionText: 'Trong Framer Motion, thuộc tính nào được sử dụng để đồng bộ chuyển động trượt mượt mà (Shared Element Transition) giữa các phần tử khác nhau mà không cần tính toán tọa độ thủ công?',
      options: [
        { id: 'opt1-a', text: 'layoutId', isCorrect: true },
        { id: 'opt1-b', text: 'sharedKey', isCorrect: false },
        { id: 'opt1-c', text: 'motionTarget', isCorrect: false },
        { id: 'opt1-d', text: 'elementId', isCorrect: false },
      ],
      explanation: 'Thuộc tính layoutId cho phép Framer Motion tự động thực hiện FLIP animation ngầm khi một phần tử chuyển đổi trạng thái hoặc vị trí trong DOM.',
    },
    {
      id: 'q2',
      questionText: 'Theo chuẩn thiết kế UI/UX Pro Max Motion System, đường cong Easing nào được khuyến nghị cho các tương tác tự nhiên, dứt khoát?',
      options: [
        { id: 'opt2-a', text: 'linear', isCorrect: false },
        { id: 'opt2-b', text: 'cubic-bezier(0.16, 1, 0.3, 1)', isCorrect: true },
        { id: 'opt2-c', text: 'ease-in-bounce', isCorrect: false },
        { id: 'opt2-d', text: 'cubic-bezier(0.9, 0, 0.1, 1)', isCorrect: false },
      ],
      explanation: 'cubic-bezier(0.16, 1, 0.3, 1) là đường cong ease-out chuẩn mực, giúp chuyển động bắt đầu êm ái và dừng lại chính xác, không tạo cảm giác trễ nải.',
    },
    {
      id: 'q3',
      questionText: 'Khi thực hiện hiệu ứng vẽ nét icon dấu tích (Checkmark draw), kỹ thuật CSS/SVG nào được ứng dụng phổ biến nhất?',
      options: [
        { id: 'opt3-a', text: 'SVG Stroke Dashoffset kết hợp Stroke Dasharray', isCorrect: true },
        { id: 'opt3-b', text: 'CSS clip-path polygon', isCorrect: false },
        { id: 'opt3-c', text: 'Canvas 2D clearRect', isCorrect: false },
        { id: 'opt3-d', text: 'SVG filter drop-shadow', isCorrect: false },
      ],
      explanation: 'Bằng cách đặt strokeDasharray bằng chiều dài path và animate strokeDashoffset từ max về 0, nét vẽ SVG sẽ xuất hiện mượt mà như được vẽ tay trực tiếp.',
    },
    {
      id: 'q4',
      questionText: 'Tùy chọn nào sau đây là yêu cầu bắt buộc của tiêu chuẩn Accessibility (A11y) khi xây dựng hiệu ứng chuyển động?',
      options: [
        { id: 'opt4-a', text: 'Bắt buộc người dùng xem hết hiệu ứng trước khi bấm tiếp', isCorrect: false },
        { id: 'opt4-b', text: 'Tôn trọng tùy chọn giảm chuyển động prefers-reduced-motion của hệ điều hành', isCorrect: true },
        { id: 'opt4-c', text: 'Chỉ hỗ trợ hiệu ứng trên màn hình độ phân giải 4K', isCorrect: false },
        { id: 'opt4-d', text: 'Luôn luôn chạy âm thanh kèm theo animation', isCorrect: false },
      ],
      explanation: 'prefers-reduced-motion cho phép người dùng có tiền sử rối loạn tiền đình hoặc nhạy cảm với chuyển động có thể tắt hoặc giảm thiểu hiệu ứng để trải nghiệm web an toàn.',
    },
  ],
};

export const QuizPlayer: React.FC<QuizPlayerProps> = ({
  quiz = defaultQuiz,
  onBackToPlayer,
  onCompleteQuiz,
}) => {
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [timeLeft, setTimeLeft] = useState<number>(quiz.durationMinutes * 60);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [result, setResult] = useState<QuizResult | null>(null);

  // Timer countdown
  useEffect(() => {
    if (isSubmitted) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleSubmitQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isSubmitted, userAnswers]);

  const formatTimer = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remaining = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remaining.toString().padStart(2, '0')}`;
  };

  const handleSelectOption = (questionId: string, optionId: string) => {
    if (isSubmitted) return;
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: optionId,
    }));
  };

  const handleSubmitQuiz = () => {
    let correctCount = 0;
    quiz.questions.forEach((q) => {
      const selected = userAnswers[q.id];
      const correctOption = q.options.find((opt) => opt.isCorrect);
      if (selected && correctOption && selected === correctOption.id) {
        correctCount++;
      }
    });

    const score = Math.round((correctCount / quiz.questions.length) * 10 * 10) / 10;
    const passed = score >= 5.0;

    const res: QuizResult = {
      score,
      correctCount,
      totalQuestions: quiz.questions.length,
      passed,
      userAnswers,
      takenAt: new Date().toLocaleString('vi-VN'),
    };

    setResult(res);
    setIsSubmitted(true);
    onCompleteQuiz(score);
  };

  const handleRetake = () => {
    setUserAnswers({});
    setTimeLeft(quiz.durationMinutes * 60);
    setIsSubmitted(false);
    setResult(null);
  };

  const answeredCount = Object.keys(userAnswers).length;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" icon={<ArrowLeft size={14} />} onClick={onBackToPlayer}>
            Quay Lại Bài Học
          </Button>
          <div className="min-w-0">
            <span className="text-xs text-blue-600 font-semibold uppercase tracking-wider block">
              Trắc Nghiệm Khảo Sát
            </span>
            <h1 className="text-lg sm:text-xl font-bold text-slate-900 truncate">
              {quiz.title}
            </h1>
          </div>
        </div>

        {/* Timer & Answered Counter */}
        <div className="flex items-center gap-3 self-start sm:self-auto shrink-0">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-50 text-amber-900 border border-amber-200 font-mono text-xs font-bold">
            <Clock size={14} className="text-amber-600" />
            {formatTimer(timeLeft)}
          </div>
          <span className="text-xs font-mono text-slate-500">
            {answeredCount}/{quiz.questions.length} câu đã chọn
          </span>
        </div>
      </div>

      {/* Result Card (shown when submitted) */}
      {isSubmitted && result && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35, ease: EASE_OUT }}
          className={`p-6 sm:p-8 rounded-3xl border text-center space-y-4 shadow-lg ${
            result.passed
              ? 'bg-gradient-to-b from-emerald-50 to-white border-emerald-200'
              : 'bg-gradient-to-b from-rose-50 to-white border-rose-200'
          }`}
        >
          <div
            className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto ${
              result.passed
                ? 'bg-emerald-100 text-emerald-600 shadow-md shadow-emerald-500/20'
                : 'bg-rose-100 text-rose-600 shadow-md shadow-rose-500/20'
            }`}
          >
            {result.passed ? <Award size={36} /> : <XCircle size={36} />}
          </div>

          <div className="space-y-1">
            <span
              className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                result.passed
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-rose-100 text-rose-800'
              }`}
            >
              {result.passed ? 'Đã Vượt Qua (Passed)' : 'Chưa Đạt Chuẩn (Failed)'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Điểm Số: <span className="font-mono">{result.score}</span> / 10
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Bạn trả lời đúng <strong>{result.correctCount}</strong> trên tổng số{' '}
              <strong>{result.totalQuestions}</strong> câu hỏi.
            </p>
          </div>

          <div className="flex items-center justify-center gap-3 pt-2">
            <Button
              variant="outline"
              size="md"
              icon={<RotateCcw size={14} />}
              onClick={handleRetake}
            >
              Làm Lại Bài Thi
            </Button>
            <Button variant="primary" size="md" onClick={onBackToPlayer}>
              Tiếp Tục Bài Học
            </Button>
          </div>
        </motion.div>
      )}

      {/* Questions List */}
      <div className="space-y-6">
        {quiz.questions.map((question, qIdx) => {
          const selectedOption = userAnswers[question.id];

          return (
            <div
              key={question.id}
              className="bg-white rounded-2xl border border-slate-200/90 p-6 space-y-4 shadow-xs"
            >
              <div className="flex items-start gap-3">
                <span className="w-7 h-7 rounded-xl bg-blue-50 text-blue-700 font-bold font-mono text-xs flex items-center justify-center shrink-0 mt-0.5">
                  Q{qIdx + 1}
                </span>
                <div className="space-y-1">
                  <h3 className="text-sm sm:text-base font-semibold text-slate-900 leading-snug">
                    {question.questionText}
                  </h3>
                </div>
              </div>

              {/* Options list */}
              <div className="space-y-2.5 pt-1 pl-10">
                {question.options.map((option) => {
                  const isSelected = selectedOption === option.id;
                  let optionStyles = 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/80';

                  if (isSubmitted) {
                    if (option.isCorrect) {
                      optionStyles = 'border-emerald-500 bg-emerald-50/70 text-emerald-950 font-semibold';
                    } else if (isSelected && !option.isCorrect) {
                      optionStyles = 'border-rose-400 bg-rose-50/70 text-rose-950 line-through';
                    } else {
                      optionStyles = 'border-slate-200 opacity-60';
                    }
                  } else if (isSelected) {
                    optionStyles = 'border-blue-600 bg-blue-50/60 text-blue-900 font-semibold shadow-xs';
                  }

                  return (
                    <div
                      key={option.id}
                      onClick={() => handleSelectOption(question.id, option.id)}
                      className={`flex items-center gap-3 p-3.5 rounded-xl border transition-all cursor-pointer select-none text-xs sm:text-sm ${optionStyles}`}
                    >
                      <div
                        className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                          isSelected
                            ? 'border-blue-600 bg-blue-600 text-white'
                            : 'border-slate-300 bg-white'
                        }`}
                      >
                        {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </div>
                      <span className="flex-1">{option.text}</span>
                      {isSubmitted && option.isCorrect && (
                        <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                      )}
                      {isSubmitted && isSelected && !option.isCorrect && (
                        <XCircle size={16} className="text-rose-500 shrink-0" />
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Explanation (after submit) */}
              {isSubmitted && question.explanation && (
                <div className="mt-3 ml-10 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 leading-relaxed">
                  <strong className="text-slate-800">Giải thích chi tiết: </strong>
                  {question.explanation}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Submit Button Row */}
      {!isSubmitted && (
        <div className="flex items-center justify-between pt-4 border-t border-slate-200">
          <span className="text-xs text-slate-500">
            Hãy kiểm tra kỹ các đáp án trước khi nộp bài.
          </span>
          <Button
            variant="primary"
            size="lg"
            disabled={answeredCount === 0}
            onClick={handleSubmitQuiz}
            className="font-bold shadow-lg shadow-blue-500/25"
          >
            Nộp Bài & Chấm Điểm
          </Button>
        </div>
      )}
    </div>
  );
};
