import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ListeningFullTest, ListeningExamResult } from '../../types';
import { useListeningStore } from '../../store/useListeningStore';
import { SoundCheckScreen } from './SoundCheckScreen';
import { ListeningAudioPlayer } from './ListeningAudioPlayer';
import { ListeningSection } from './ListeningSection';
import { ListeningFooterNav } from './ListeningFooterNav';
import { CheckCircle2, AlertTriangle, Clock, Eye, EyeOff } from 'lucide-react';
import { useSmoothScroll } from '../../context/SmoothScrollProvider';

interface IELTSListeningExamRoomProps {
  test: ListeningFullTest;
  onExit: () => void;
  onSubmitComplete: (result: ListeningExamResult) => void;
  onNotify?: (msg: string, type?: 'success' | 'error' | 'info') => void;
}

export const IELTSListeningExamRoom: React.FC<IELTSListeningExamRoomProps> = ({
  test,
  onExit,
  onSubmitComplete,
  onNotify
}) => {
  const { stop, start } = useSmoothScroll();
  const [phase, setPhase] = useState<'soundcheck' | 'exam' | 'confirming-submit' | 'submitted'>('soundcheck');
  const [timeLeft, setTimeLeft] = useState<number>(1800); // 30 minutes
  const [showTimer, setShowTimer] = useState<boolean>(true);
  const [currentSection, setCurrentSection] = useState<number>(1);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.8);

  const { userAnswers, reviewFlags, setAnswer, toggleReviewFlag, submitExam, examResult } = useListeningStore();

  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    stop();
    return () => start();
  }, [stop, start]);

  const performSubmit = useCallback(() => {
    setPhase('submitted');
    submitExam(test);
  }, [submitExam, test]);

  const onNotifyRef = useRef(onNotify);
  onNotifyRef.current = onNotify;
  const performSubmitRef = useRef(performSubmit);
  performSubmitRef.current = performSubmit;

  useEffect(() => {
    if (phase !== 'exam') return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          if (onNotifyRef.current) {
            onNotifyRef.current('Time is up! Your answers have been automatically submitted.', 'info');
          }
          performSubmitRef.current();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [phase]);

  useEffect(() => {
    if (phase === 'submitted' && examResult) {
      onSubmitComplete(examResult);
    }
  }, [phase, examResult, onSubmitComplete]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleSectionTabClick = (sectionIndex: number) => {
    setCurrentSection(sectionIndex);
    if (sectionRefs.current[sectionIndex - 1]) {
      sectionRefs.current[sectionIndex - 1]?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAudioEnd = () => {
    if (currentSection < 4) {
      setCurrentSection(prev => prev + 1);
    } else {
      setIsPlaying(false);
      if (onNotify) {
        onNotify('Recording has ended. You have time to check your answers.', 'info');
      }
    }
  };

  const getTotalAnswered = () => Object.keys(userAnswers || {}).length;
  const getTotalFlagged = () => reviewFlags?.size || 0;
  const totalQuestions = 40;

  if (phase === 'soundcheck') {
    return (
      <SoundCheckScreen 
        testSource={test.source} 
        onStartTest={() => setPhase('exam')} 
        onBack={onExit} 
      />
    );
  }

  const activeSection = test.sections.find(s => s.sectionNumber === currentSection) || test.sections[0];

  return (
    <div className="flex flex-col h-screen bg-[#FAFAF9] font-sans text-[#064E3B] overflow-hidden">
      {/* Topbar */}
      <header className="sticky top-0 z-20 flex h-14 items-center justify-between px-4 sm:px-6 bg-[#064E3B] text-white shadow-md">
        <div className="flex items-center gap-4">
          <div className="flex flex-col">
            <h1 className="text-sm font-semibold sm:text-base leading-tight font-serif">{test.source}</h1>
            <span className="text-xs text-emerald-200">IELTS Listening Full Test</span>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="hidden sm:block text-sm font-medium bg-white/10 px-3 py-1 rounded-full">
            Section {currentSection} of 4
          </div>
          
          <div className="flex items-center gap-3 bg-white/10 px-3 py-1.5 rounded-full min-w-[120px] justify-center">
            <Clock className="w-4 h-4 text-emerald-200" />
            <span className={`font-mono text-lg font-bold ${timeLeft < 300 ? 'text-red-400' : 'text-white'}`}>
              {showTimer ? formatTime(timeLeft) : '--:--'}
            </span>
            <button 
              onClick={() => setShowTimer(!showTimer)}
              className="ml-1 p-1 hover:bg-white/20 rounded-full transition-colors"
              title={showTimer ? "Hide timer" : "Show timer"}
            >
              {showTimer ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-0 relative" data-lenis-prevent="true">
        {/* Audio Player Container */}
        <div className="bg-white border-b border-gray-200 shadow-sm z-10 p-4 sticky top-0">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <ListeningAudioPlayer 
              audioFile={activeSection?.audioFile || ''}
              sectionNumber={currentSection}
              sectionTitle={activeSection?.title || ''}
              isPlaying={isPlaying}
              onPlayPause={() => setIsPlaying(!isPlaying)}
              volume={volume}
              onVolumeChange={setVolume}
              onEnded={handleAudioEnd}
            />
            
            {/* Section Navigation Tabs */}
            <div className="flex bg-gray-100 p-1 rounded-lg self-center overflow-x-auto w-full md:w-auto">
              {[1, 2, 3, 4].map(num => (
                <button
                  key={num}
                  onClick={() => handleSectionTabClick(num)}
                  className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
                    currentSection === num 
                      ? 'bg-white shadow-sm text-[#064E3B] font-bold' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200/50'
                  }`}
                >
                  Section {num}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Scrollable Questions Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8" data-lenis-prevent="true">
          <div className="max-w-4xl mx-auto space-y-12 pb-28">
            {test.sections.map((section, idx) => (
              <div 
                key={section.sectionNumber} 
                ref={el => { sectionRefs.current[idx] = el; }}
                className={`transition-opacity duration-300 ${currentSection === idx + 1 ? 'opacity-100' : 'opacity-60 hover:opacity-100'}`}
                onClick={() => {
                  if (currentSection !== idx + 1) setCurrentSection(idx + 1);
                }}
              >
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  <div className="bg-gray-50 border-b border-gray-200 px-6 py-4">
                    <h2 className="text-xl font-bold font-serif text-[#064E3B]">Section {section.sectionNumber}: {section.title}</h2>
                    <p className="text-sm text-gray-600 mt-1">{section.instructions || 'Listen and answer the questions.'}</p>
                  </div>
                  <div className="p-6">
                    <ListeningSection 
                      section={section}
                      userAnswers={userAnswers}
                      reviewFlags={reviewFlags}
                      onAnswer={setAnswer}
                      onToggleFlag={toggleReviewFlag}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="flex-shrink-0">
        <ListeningFooterNav 
          sections={test.sections}
          currentSection={currentSection}
          onScrollToQuestion={(qNum) => {
            const el = document.getElementById(`question-${qNum}`);
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }}
          onSubmit={() => setPhase('confirming-submit')}
          timeLeft={timeLeft}
          isTimeHidden={!showTimer}
          onToggleHideTime={() => setShowTimer(!showTimer)}
        />
      </div>

      {/* Submit Confirmation Modal */}
      {phase === 'confirming-submit' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="bg-emerald-50 px-6 py-5 border-b border-emerald-100 flex items-start gap-4">
              <div className="bg-white p-2 rounded-full shadow-sm">
                <AlertTriangle className="w-6 h-6 text-[#D97706]" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#064E3B]">Submit Test?</h3>
                <p className="text-sm text-gray-600 mt-1">Are you sure you want to finish the test? You cannot change your answers after submitting.</p>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-100 text-center">
                  <span className="block text-2xl font-bold font-mono text-[#064E3B]">
                    {getTotalAnswered()} / {totalQuestions}
                  </span>
                  <span className="text-xs text-gray-500 font-medium">Answered</span>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-100 text-center">
                  <span className="block text-2xl font-bold font-mono text-[#D97706]">
                    {getTotalFlagged()}
                  </span>
                  <span className="text-xs text-gray-500 font-medium">Flagged for review</span>
                </div>
              </div>

              {getTotalAnswered() < totalQuestions && (
                <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 text-xs text-amber-800 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 flex-shrink-0 text-[#D97706]" />
                  <span>You still have {totalQuestions - getTotalAnswered()} unanswered question(s).</span>
                </div>
              )}
            </div>

            <div className="bg-gray-50 px-6 py-4 flex items-center justify-end gap-3 border-t border-gray-100">
              <button 
                onClick={() => setPhase('exam')}
                className="px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-200/60 transition-colors"
              >
                Back to test
              </button>
              <button 
                onClick={performSubmit}
                className="px-5 py-2.5 rounded-lg text-sm font-semibold text-white bg-[#064E3B] hover:bg-emerald-800 transition-colors flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                Submit Test
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
