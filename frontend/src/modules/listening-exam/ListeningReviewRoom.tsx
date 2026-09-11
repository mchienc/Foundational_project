import React, { useRef, useState, useEffect } from 'react';
import { ListeningFullTest, ListeningExamResult } from '../../types';
import { ArrowLeft, Play, Pause, Info, CheckCircle2, XCircle } from 'lucide-react';

interface ListeningReviewRoomProps {
  test: ListeningFullTest;
  result: ListeningExamResult;
  onBackToLibrary: () => void;
  onRetakeTest: () => void;
}

export const ListeningReviewRoom: React.FC<ListeningReviewRoomProps> = ({
  test,
  result,
  onBackToLibrary,
  onRetakeTest
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [activeLineIndex, setActiveLineIndex] = useState(-1);
  const [selectedExplanation, setSelectedExplanation] = useState<{ id: string, text: string } | null>(null);
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const transcriptRefs = useRef<(HTMLDivElement | null)[]>([]);

  // transcript is on test.transcript
  const transcriptLines = test.transcript || [];
  const audioUrl = test.sections[0]?.audioFile ? `http://localhost:3000/audio/${test.sections[0].audioFile}` : '';
  
  const bandScore = result.bandScore || 0;
  let bandColorClass = 'text-red-500';
  if (bandScore >= 7) bandColorClass = 'text-emerald-600';
  else if (bandScore >= 5.5) bandColorClass = 'text-amber-500';

  useEffect(() => {
    const activeIdx = transcriptLines.findIndex(line => currentTime >= line.start && currentTime <= line.end);
    if (activeIdx !== -1 && activeIdx !== activeLineIndex) {
      setActiveLineIndex(activeIdx);
      if (transcriptRefs.current[activeIdx]) {
        transcriptRefs.current[activeIdx]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [currentTime, transcriptLines, activeLineIndex]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLineClick = (start: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = start;
      if (!isPlaying) {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const allQuestions = test.sections.flatMap(s => s.questions);
  const details = allQuestions.map((q) => {
    const userAnswer = result.userAnswers[q.id] || '';
    const isCorrect = userAnswer.trim().toLowerCase() === q.correctAnswer.toLowerCase() || 
      (q.acceptableAnswers || []).some(a => a.toLowerCase() === userAnswer.trim().toLowerCase());
    return {
      questionId: q.id,
      questionNumber: q.number,
      questionText: q.prompt,
      userAnswer,
      correctAnswer: q.correctAnswer,
      isCorrect,
      explanation: q.explanation
    };
  });

  return (
    <div className="flex h-screen bg-[#FAFAF9] font-sans text-[#064E3B] overflow-hidden">
      {/* Left Column - Results */}
      <div className="w-[55%] flex flex-col border-r border-gray-200 bg-white relative">
        <header className="sticky top-0 z-10 flex items-center justify-between p-4 bg-white border-b border-gray-100 shadow-sm">
          <div className="flex items-center gap-3">
            <h1 className="font-serif font-bold text-xl">{test.source} - Results</h1>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={onBackToLibrary}
              className="px-4 py-2 bg-[#064E3B] text-white rounded-lg text-sm font-medium hover:bg-emerald-800 transition-colors flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Library</span>
            </button>
            <button 
              onClick={onRetakeTest}
              className="px-4 py-2 border border-[#064E3B] text-[#064E3B] rounded-lg text-sm font-medium hover:bg-emerald-50 transition-colors"
            >
              Retake Test
            </button>
          </div>
        </header>
        
        <div className="flex-1 overflow-y-auto p-6 space-y-8" data-lenis-prevent="true">
          {/* Score Card */}
          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 flex items-center justify-between shadow-sm">
            <div>
              <p className="text-gray-500 font-medium uppercase tracking-wider text-sm mb-1">Your Score</p>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-bold text-[#064E3B]">{result.correctCount}</span>
                <span className="text-xl text-gray-400 font-medium">/ 40</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-gray-500 font-medium uppercase tracking-wider text-sm mb-1">Band Score</p>
              <span className={`text-5xl font-bold ${bandColorClass}`}>{result.bandScore?.toFixed(1)}</span>
            </div>
          </div>

          {/* Section Breakdown */}
          <div>
            <h2 className="text-lg font-bold font-serif mb-3">Section Breakdown</h2>
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((sec) => {
                const secScoreObj = result.sectionScores?.find(s => s.section === sec);
                const secScore = secScoreObj?.correct || 0;
                return (
                  <div key={sec} className="bg-white rounded-xl p-4 border border-gray-200 text-center shadow-sm">
                    <p className="text-sm font-medium text-gray-500 mb-1">Section {sec}</p>
                    <p className="text-2xl font-bold text-[#064E3B]">{secScore}/10</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Detailed Review */}
          <div>
            <h2 className="text-lg font-bold font-serif mb-4">Detailed Review</h2>
            <div className="space-y-4">
              {details.map((item) => (
                <div key={item.questionId} className={`p-4 rounded-xl border ${item.isCorrect ? 'border-emerald-200 bg-emerald-50/50' : 'border-red-200 bg-red-50/50'}`}>
                  <div className="flex gap-3">
                    <div className="mt-0.5">
                      {item.isCorrect ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-500" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-white px-2 py-0.5 rounded text-xs font-bold shadow-sm border border-gray-200">
                          Q{item.questionNumber}
                        </span>
                        <p className="text-sm font-medium">{item.questionText}</p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mt-3">
                        <div className="bg-white p-3 rounded-lg border border-gray-100 shadow-sm">
                          <p className="text-xs text-gray-500 mb-1">Your Answer:</p>
                          <p className={`font-medium ${item.isCorrect ? 'text-emerald-700' : 'text-red-600 line-through'}`}>
                            {item.userAnswer || '(No answer)'}
                          </p>
                        </div>
                        {!item.isCorrect && (
                          <div className="bg-white p-3 rounded-lg border border-gray-100 shadow-sm">
                            <p className="text-xs text-gray-500 mb-1">Correct Answer:</p>
                            <p className="font-medium text-[#064E3B]">{item.correctAnswer}</p>
                          </div>
                        )}
                      </div>

                      {item.explanation && (
                        <div className="mt-3 text-sm text-gray-600 bg-white/60 p-3 rounded-lg">
                          <span className="font-semibold text-gray-800">Explanation:</span> {item.explanation}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right Column - Karaoke Transcript */}
      <div className="w-[45%] flex flex-col bg-[#FAFAF9] relative">
        <div className="sticky top-0 bg-[#FAFAF9] z-10 border-b border-gray-200 p-4 shadow-sm">
          <h2 className="font-serif font-bold text-lg mb-1">Transcript</h2>
          <p className="text-xs text-gray-500 mb-3">Click any line to jump to that moment</p>
          
          <div className="bg-white rounded-full p-2 pr-4 flex items-center gap-3 border border-gray-200 shadow-sm">
            <button 
              onClick={togglePlay}
              className="bg-[#064E3B] text-white p-2.5 rounded-full hover:bg-emerald-800 transition-transform active:scale-95"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 translate-x-0.5" />}
            </button>
            <div className="flex-1 relative h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="absolute top-0 left-0 h-full bg-[#064E3B] transition-all duration-300"
                style={{ width: `${audioRef.current && audioRef.current.duration ? (currentTime / audioRef.current.duration) * 100 : 0}%` }}
              />
            </div>
            <span className="text-xs font-mono font-medium min-w-[40px] text-right">
              {Math.floor(currentTime / 60)}:{(Math.floor(currentTime % 60)).toString().padStart(2, '0')}
            </span>
          </div>
          
          <audio 
            ref={audioRef}
            src={audioUrl}
            onTimeUpdate={handleTimeUpdate}
            onEnded={() => setIsPlaying(false)}
            className="hidden"
          />
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4" data-lenis-prevent="true">
          {transcriptLines.map((line, idx) => {
            const isActive = idx === activeLineIndex;
            return (
              <div 
                key={line.id} 
                ref={el => transcriptRefs.current[idx] = el}
                onClick={() => handleLineClick(line.start)}
                className={`flex gap-3 p-3 rounded-xl cursor-pointer transition-all ${
                  isActive 
                    ? 'bg-emerald-50 border-l-4 border-[#064E3B] pl-3 rounded-r-xl shadow-sm' 
                    : 'hover:bg-gray-100 border-l-4 border-transparent'
                }`}
              >
                <div className="flex-shrink-0 pt-1">
                  <span className="inline-block px-2 py-0.5 bg-gray-200 text-gray-700 text-xs font-bold rounded">
                    {line.speaker}
                  </span>
                </div>
                <div className="flex-1">
                  <p className={`text-sm ${isActive ? 'text-[#064E3B] font-medium' : 'text-gray-700'}`}>
                    {line.text}
                  </p>
                  
                  {line.answerForQuestion && (
                    <div className="mt-2 inline-flex items-center gap-1.5 px-2 py-1 bg-amber-100 text-amber-800 text-xs font-bold rounded shadow-sm border border-amber-200"
                         onClick={(e) => {
                           e.stopPropagation();
                           setSelectedExplanation({ id: line.id, text: `Explanation for Q${line.answerForQuestion}` });
                         }}>
                      <Info className="w-3 h-3" />
                      [Answer Q{line.answerForQuestion}]
                    </div>
                  )}
                  
                  {selectedExplanation !== null && selectedExplanation.id === line.id && (
                    <div className="mt-2 p-2 bg-white border border-gray-200 rounded text-xs text-gray-600 shadow-sm relative animate-in fade-in zoom-in-95">
                      <button 
                        className="absolute top-1 right-1 text-gray-400 hover:text-gray-600"
                        onClick={(e) => { e.stopPropagation(); setSelectedExplanation(null); }}
                      >
                        <XCircle className="w-3 h-3" />
                      </button>
                      <p className="pr-4">{selectedExplanation.text}</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
          {transcriptLines.length === 0 && (
            <div className="text-center py-10 text-gray-500 text-sm">
              Transcript not available for this section.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
