import React, { useState, useEffect, useRef, useCallback } from 'react';
import { SpeakingMockTest, SpeakingState, SpeakingAnswerRecord } from '../../types';
import { SpeakingResultReport } from './SpeakingResultReport';
import { mockSpeakingTests } from '../../data/mockWritingData';
import { Mic, MicOff, Volume2, Clock, CheckCircle2, Play, ArrowLeft, Activity } from 'lucide-react';
import { AudioWaveform } from '../../components/shared/AudioWaveform';

interface SpeakingMockRoomProps {
  onBack: () => void;
  onNotify?: (msg: string, type?: 'success'|'error'|'info') => void;
}

const FILLER_WORDS = ['uhm', 'uh', 'um', 'ah', 'like', 'you know', 'basically', 'actually', 'literally', 'right', 'so'];

const detectFillerWords = (text: string) => {
  const lower = text.toLowerCase();
  return FILLER_WORDS.map(fw => ({
    word: fw,
    count: (lower.match(new RegExp(`\\b${fw}\\b`, 'g')) || []).length,
  })).filter(f => f.count > 0);
};

export const SpeakingMockRoom: React.FC<SpeakingMockRoomProps> = ({ onBack, onNotify }) => {
  // State
  const [test] = useState<SpeakingMockTest>(mockSpeakingTests?.[0] as unknown as SpeakingMockTest);
  const [state, setState] = useState<SpeakingState>('IDLE');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [prepTimeLeft, setPrepTimeLeft] = useState(60);
  const [answerTimeLeft, setAnswerTimeLeft] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [liveTranscript, setLiveTranscript] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');
  const [answers, setAnswers] = useState<SpeakingAnswerRecord[]>([]);
  const [showResults, setShowResults] = useState(false);
  
  // Refs
  const recognitionRef = useRef<any>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const answerTimerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);

  // Flatten questions
  const allQuestions = test ? [
    ...(test.part1Questions || []).map(q => ({ ...q, part: 'Part 1' as const })),
    ...(test.part2CueCard ? [{ ...test.part2CueCard, part: 'Part 2' as const }] : []),
    ...(test.part3Questions || []).map(q => ({ ...q, part: 'Part 3' as const }))
  ] : [];

  const currentQuestion = allQuestions[currentQuestionIndex];

  // Fallback for missing mock data
  if (!test || allQuestions.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#FAFAF9] text-[#064E3B]">
        <div className="text-center p-8 bg-white rounded-2xl shadow-sm border border-stone-200">
          <p className="mb-4">Mock test data not found.</p>
          <button onClick={onBack} className="px-4 py-2 bg-[#D97706] text-white rounded hover:bg-amber-700">Go Back</button>
        </div>
      </div>
    );
  }

  // TTS
  const speakQuestion = useCallback((text: string, onEnd: () => void) => {
    if (!('speechSynthesis' in window)) {
      onNotify?.('TTS not supported', 'error');
      onEnd();
      return;
    }
    
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-GB';
    utterance.rate = 0.9;
    
    const voices = window.speechSynthesis.getVoices();
    const britishVoice = voices.find(v => v.lang === 'en-GB' || v.name.includes('Daniel') || v.name.includes('British'));
    if (britishVoice) utterance.voice = britishVoice;
    
    utterance.onend = onEnd;
    utterance.onerror = (e) => {
      console.error("TTS error:", e);
      onEnd();
    };
    
    window.speechSynthesis.speak(utterance);
  }, [onNotify]);

  // STT
  const startRecording = useCallback(() => {
    const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    if (!SpeechRecognition) {
      onNotify?.('STT not supported on this browser. Use Chrome for the best experience.', 'info');
      return;
    }
    
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';
    
    recognition.onresult = (event: any) => {
      let interim = ''; 
      let final = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) final += event.results[i][0].transcript;
        else interim += event.results[i][0].transcript;
      }
      setLiveTranscript(prev => prev + ' ' + final);
      setInterimTranscript(interim);
    };
    
    recognition.onend = () => {
      // Auto restart if still supposed to be recording
      if (isRecording) recognition.start();
    };

    recognition.onerror = (e: any) => {
      console.error("Speech recognition error:", e);
    };
    
    recognition.start();
    recognitionRef.current = recognition;
    setIsRecording(true);
    startTimeRef.current = Date.now();
  }, [isRecording, onNotify]);

  const stopRecording = useCallback(() => {
    setIsRecording(false);
    if (recognitionRef.current) {
      recognitionRef.current.onend = null; // Prevent restart loop
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }
  }, []);

  // Cleanup
  useEffect(() => {
    return () => {
      stopRecording();
      window.speechSynthesis.cancel();
      if (timerRef.current) clearInterval(timerRef.current);
      if (answerTimerRef.current) clearInterval(answerTimerRef.current);
    };
  }, [stopRecording]);

  // Handle flow transitions
  const startTest = () => {
    setState('EXAMINER_SPEAKING');
  };

  const handleExaminerFinished = useCallback(() => {
    if (currentQuestion.part === 'Part 2') {
      setState('CANDIDATE_PREPARING');
      setPrepTimeLeft(60);
    } else {
      setState('CANDIDATE_SPEAKING');
    }
  }, [currentQuestion.part]);

  const handleNextQuestion = useCallback(() => {
    setLiveTranscript('');
    setInterimTranscript('');
    
    if (currentQuestionIndex < allQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setState('EXAMINER_SPEAKING');
    } else {
      setShowResults(true);
      setState('IDLE');
    }
  }, [currentQuestionIndex, allQuestions.length]);

  const handleFinishAnswering = useCallback(() => {
    stopRecording();
    if (answerTimerRef.current) clearInterval(answerTimerRef.current);
    
    const durationSec = Math.max(1, Math.round((Date.now() - startTimeRef.current) / 1000));
    const finalTranscript = (liveTranscript + ' ' + interimTranscript).trim();
    const wordCount = finalTranscript.split(/\s+/).filter(w => w.length > 0).length;
    
    const record: SpeakingAnswerRecord = {
      questionId: currentQuestion.id,
      transcript: finalTranscript,
      durationSeconds: durationSec,
      wordCount: wordCount,
      wpm: durationSec > 0 ? Math.round((wordCount / durationSec) * 60) : 0,
      fillerWords: detectFillerWords(finalTranscript)
    };
    
    setAnswers(prev => [...prev, record]);
    setState('EVALUATING');
    
    // Brief pause before next
    setTimeout(() => {
      handleNextQuestion();
    }, 1500);
  }, [currentQuestion, liveTranscript, interimTranscript, stopRecording, handleNextQuestion]);

  // State Effects
  useEffect(() => {
    if (state === 'EXAMINER_SPEAKING') {
      const textToSpeak = currentQuestion.part === 'Part 2' 
        ? `Now I'm going to give you a topic, and I'd like you to talk about it for one to two minutes. Before you talk, you'll have one minute to think about what you're going to say. You can make some notes if you wish. Here is your topic: ${currentQuestion.question}`
        : currentQuestion.question;
        
      speakQuestion(textToSpeak, handleExaminerFinished);
    } 
    else if (state === 'CANDIDATE_PREPARING') {
      timerRef.current = setInterval(() => {
        setPrepTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            setState('CANDIDATE_SPEAKING');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } 
    else if (state === 'CANDIDATE_SPEAKING') {
      setAnswerTimeLeft(currentQuestion.maxAnswerSeconds || 120);
      startRecording();
      
      answerTimerRef.current = setInterval(() => {
        setAnswerTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(answerTimerRef.current!);
            handleFinishAnswering();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (answerTimerRef.current) clearInterval(answerTimerRef.current);
    };
  }, [state, currentQuestion, speakQuestion, handleExaminerFinished, startRecording, handleFinishAnswering]);


  // Renders
  if (showResults) {
    return (
      <SpeakingResultReport 
        answers={answers} 
        test={test} 
        onRetake={() => {
          setAnswers([]);
          setCurrentQuestionIndex(0);
          setShowResults(false);
          setState('IDLE');
        }}
        onBack={onBack}
      />
    );
  }

  if (state === 'IDLE') {
    return (
      <div className="min-h-screen bg-[#FAFAF9] flex items-center justify-center p-6">
        <div className="max-w-xl w-full bg-white rounded-2xl shadow-sm border border-stone-200 p-8 text-center space-y-6">
          <div className="mx-auto w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-4 text-[#D97706]">
            <Mic className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-serif font-bold text-[#064E3B]">{test.source}</h1>
          <p className="text-stone-500">IELTS Speaking Mock Test</p>
          
          <div className="text-left bg-stone-50 p-6 rounded-xl space-y-4 text-sm text-stone-700">
            <h3 className="font-semibold text-stone-900">Format:</h3>
            <ul className="space-y-2">
              <li className="flex items-center"><CheckCircle2 className="w-4 h-4 text-[#D97706] mr-2"/> Part 1: Introduction & Interview ({test.part1Questions?.length || 0} questions)</li>
              <li className="flex items-center"><CheckCircle2 className="w-4 h-4 text-[#D97706] mr-2"/> Part 2: Long Turn (Cue Card + 60s prep)</li>
              <li className="flex items-center"><CheckCircle2 className="w-4 h-4 text-[#D97706] mr-2"/> Part 3: Discussion ({test.part3Questions?.length || 0} questions)</li>
            </ul>
            <p className="pt-2 text-xs text-stone-500 flex items-center">
              <Volume2 className="w-4 h-4 mr-1"/> Please ensure your microphone is connected and volume is up.
            </p>
          </div>

          <div className="flex gap-4 justify-center pt-4">
            <button onClick={onBack} className="px-6 py-3 text-stone-600 font-medium hover:bg-stone-100 rounded-lg transition">
              Cancel
            </button>
            <button onClick={startTest} className="px-8 py-3 bg-[#D97706] text-white font-medium rounded-lg hover:bg-amber-700 transition flex items-center shadow-md">
              <Play className="w-4 h-4 mr-2" /> Start Speaking Test
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#064E3B] text-white transition-colors duration-500">
      {/* Top Header */}
      <div className="flex items-center justify-between p-6 border-b border-white/10">
        <button onClick={onBack} className="text-white/60 hover:text-white transition flex items-center text-sm font-medium">
          <ArrowLeft className="w-4 h-4 mr-2" /> Quit Test
        </button>
        <div className="flex items-center space-x-2 text-sm font-medium text-white/80 bg-black/20 px-4 py-2 rounded-full">
          <Activity className="w-4 h-4 text-[#D97706]" />
          <span>Question {currentQuestionIndex + 1} of {allQuestions.length}</span>
          <span className="px-2 py-0.5 bg-white/10 rounded text-xs uppercase tracking-widest">{currentQuestion.part}</span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 max-w-4xl mx-auto w-full text-center space-y-12">
        
        {/* Examiner Phase */}
        {state === 'EXAMINER_SPEAKING' && (
          <div className="animate-in fade-in zoom-in duration-500 space-y-8 flex flex-col items-center">
            <div className="relative">
              <div className="absolute inset-0 bg-[#D97706] rounded-full animate-ping opacity-20"></div>
              <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center relative backdrop-blur-sm border border-white/20">
                <Volume2 className="w-10 h-10 text-[#D97706]" />
              </div>
            </div>
            <div className="space-y-4">
              <p className="text-white/50 text-sm uppercase tracking-widest font-semibold">Examiner is speaking...</p>
              <h2 className="text-3xl md:text-4xl font-serif text-white/90 max-w-2xl leading-relaxed">
                "{currentQuestion.question}"
              </h2>
            </div>
          </div>
        )}

        {/* Preparation Phase */}
        {state === 'CANDIDATE_PREPARING' && (
          <div className="w-full flex flex-col md:flex-row gap-8 items-stretch animate-in slide-in-from-bottom-8 duration-500">
            <div className="flex-1 bg-white/10 p-8 rounded-2xl backdrop-blur-sm border border-white/20 text-left flex flex-col">
              <div className="mb-4 inline-block px-3 py-1 bg-[#D97706]/20 text-[#D97706] rounded-md text-sm font-bold uppercase">
                Cue Card
              </div>
              <h3 className="text-2xl font-serif mb-4 leading-relaxed">{currentQuestion.question}</h3>
              {currentQuestion.cueCardBullets && (
                <ul className="list-disc pl-5 space-y-2 text-white/80 font-serif mb-4">
                  {currentQuestion.cueCardBullets.map((bullet: string, bIdx: number) => (
                    <li key={bIdx}>{bullet}</li>
                  ))}
                </ul>
              )}
            </div>
            <div className="w-full md:w-72 flex flex-col gap-4">
              <div className="bg-white/10 p-8 rounded-2xl backdrop-blur-sm border border-white/20 flex flex-col items-center justify-center py-12">
                <Clock className="w-8 h-8 text-[#D97706] mb-4" />
                <div className="text-5xl font-bold font-serif tabular-nums tracking-tight">
                  00:{prepTimeLeft < 10 ? `0${prepTimeLeft}` : prepTimeLeft}
                </div>
                <div className="text-white/50 text-sm mt-2 font-medium uppercase tracking-wider">Preparation Time</div>
              </div>
              <div className="flex-1 bg-white/5 rounded-2xl border border-white/10 p-4">
                <textarea 
                  className="w-full h-full bg-transparent resize-none outline-none text-white/80 placeholder:text-white/30 text-sm"
                  placeholder="Take some scratch notes here..."
                />
              </div>
            </div>
          </div>
        )}

        {/* Speaking Phase */}
        {state === 'CANDIDATE_SPEAKING' && (
          <div className="w-full max-w-3xl mx-auto space-y-12 animate-in fade-in duration-500">
            {currentQuestion.part === 'Part 2' && (
              <div className="bg-white/5 p-6 rounded-xl border border-white/10 text-left mb-8">
                <h4 className="text-[#D97706] text-sm font-bold uppercase mb-2">Cue Card Reminder</h4>
                <p className="font-serif text-white/80 whitespace-pre-wrap text-sm">{currentQuestion.question}</p>
              </div>
            )}
            
            <div className="flex flex-col items-center gap-8">
              <div className="flex items-center gap-4 text-white/60">
                <Clock className="w-5 h-5" />
                <span className="text-xl font-medium tabular-nums">
                  {Math.floor(answerTimeLeft / 60)}:{(answerTimeLeft % 60).toString().padStart(2, '0')}
                </span>
                <span className="text-sm uppercase tracking-wider">remaining</span>
              </div>

              <div className="relative">
                {isRecording && <div className="absolute inset-0 bg-red-500 rounded-full animate-ping opacity-30"></div>}
                <button 
                  onClick={handleFinishAnswering}
                  className={`w-24 h-24 rounded-full flex items-center justify-center relative z-10 transition-all shadow-xl
                    ${isRecording ? 'bg-red-500 hover:bg-red-600' : 'bg-[#D97706] hover:bg-amber-600'}`}
                >
                  {isRecording ? <MicOff className="w-10 h-10 text-white" /> : <Mic className="w-10 h-10 text-white" />}
                </button>
              </div>
              
              <div className="text-white/50 text-sm uppercase tracking-widest font-semibold flex items-center gap-2">
                {isRecording ? (
                  <>
                    <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                    Recording... (Click to finish early)
                  </>
                ) : 'Processing...'}
              </div>

              {/* Waveform visualizer mock */}
              <div className="w-full max-w-md h-16 flex items-center justify-center opacity-60">
                 {/* Replace with actual component if present */}
                 {AudioWaveform ? <AudioWaveform isPlaying={isRecording} speed={1.0} /> : (
                   <div className="flex gap-1 h-full items-center">
                     {[...Array(20)].map((_, i) => (
                       <div key={i} className={`w-1 bg-[#D97706] rounded-full transition-all duration-150 ${isRecording ? 'animate-pulse' : 'h-1'}`} style={{ height: isRecording ? `${Math.random() * 100}%` : '4px', animationDelay: `${i * 0.05}s` }}></div>
                     ))}
                   </div>
                 )}
              </div>

              <div className="w-full bg-black/20 p-6 rounded-xl border border-white/10 min-h-[120px] text-left">
                <p className="text-white/40 text-xs uppercase tracking-wider font-semibold mb-2">Live Transcript</p>
                <p className="font-serif text-lg text-white/90 leading-relaxed italic">
                  {liveTranscript} <span className="text-white/50">{interimTranscript}</span>
                  {!liveTranscript && !interimTranscript && isRecording && <span className="text-white/30 not-italic">Listening...</span>}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Evaluating Phase */}
        {state === 'EVALUATING' && (
          <div className="animate-in fade-in flex flex-col items-center space-y-6">
            <div className="w-16 h-16 border-4 border-white/20 border-t-[#D97706] rounded-full animate-spin"></div>
            <p className="text-white/70 font-medium text-lg">Saving answer...</p>
          </div>
        )}

      </div>
    </div>
  );
};
