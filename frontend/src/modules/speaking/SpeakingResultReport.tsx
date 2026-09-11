import React, { useState, useMemo } from 'react';
import { SpeakingAnswerRecord, SpeakingMockTest } from '../../types';
import { ArrowLeft, RotateCcw, Activity, MessageCircle, Clock, ChevronDown, ChevronUp, AlertCircle } from 'lucide-react';

interface SpeakingResultReportProps {
  answers: SpeakingAnswerRecord[];
  test: SpeakingMockTest;
  onRetake: () => void;
  onBack: () => void;
}

const BASIC_TO_ACADEMIC: Record<string, string[]> = {
  'good': ['commendable', 'outstanding', 'beneficial'],
  'bad': ['detrimental', 'adverse', 'problematic'],
  'big': ['substantial', 'considerable', 'significant'],
  'happy': ['content', 'elated', 'gratified'],
  'important': ['crucial', 'pivotal', 'indispensable'],
  'sad': ['sorrowful', 'despondent', 'melancholy'],
  'hard': ['challenging', 'arduous', 'formidable'],
  'easy': ['straightforward', 'effortless', 'uncomplicated'],
};

export const SpeakingResultReport: React.FC<SpeakingResultReportProps> = ({ answers, test, onRetake, onBack }) => {
  const [criteriaOpen, setCriteriaOpen] = useState(false);

  const allQuestions = useMemo(() => {
    return test ? [
      ...(test.part1Questions || []).map(q => ({ ...q, partLabel: 'Part 1' })),
      ...(test.part2CueCard ? [{ ...test.part2CueCard, partLabel: 'Part 2' }] : []),
      ...(test.part3Questions || []).map(q => ({ ...q, partLabel: 'Part 3' }))
    ] : [];
  }, [test]);

  const getQuestion = (qId: string) => allQuestions.find(q => q.id === qId);

  // Overall Stats
  const { totalWords, totalDuration, totalFillers } = useMemo(() => {
    let words = 0;
    let duration = 0;
    let fillers = 0;
    answers.forEach(a => {
      words += a.wordCount;
      duration += a.durationSeconds;
      fillers += a.fillerWords.reduce((sum, fw) => sum + fw.count, 0);
    });
    return { totalWords: words, totalDuration: duration, totalFillers: fillers };
  }, [answers]);

  const averageWpm = totalDuration > 0 ? Math.round((totalWords / totalDuration) * 60) : 0;

  const getWpmGrade = (wpm: number) => {
    if (wpm < 80) return { label: 'Too slow', color: 'text-red-600', bg: 'bg-red-100', bar: 'bg-red-500', width: '20%' };
    if (wpm < 120) return { label: 'Slow', color: 'text-orange-600', bg: 'bg-orange-100', bar: 'bg-orange-500', width: '40%' };
    if (wpm <= 150) return { label: 'Natural', color: 'text-green-600', bg: 'bg-green-100', bar: 'bg-green-500', width: '60%' };
    if (wpm <= 180) return { label: 'Fast', color: 'text-orange-600', bg: 'bg-orange-100', bar: 'bg-orange-500', width: '80%' };
    return { label: 'Too fast', color: 'text-red-600', bg: 'bg-red-100', bar: 'bg-red-500', width: '100%' };
  };

  const wpmGrade = getWpmGrade(averageWpm);

  // Vocabulary Scan
  const vocabFound = useMemo(() => {
    const found: { basic: string, count: number, academic: string[] }[] = [];
    const allText = answers.map(a => a.transcript.toLowerCase()).join(' ');
    
    Object.keys(BASIC_TO_ACADEMIC).forEach(basic => {
      const regex = new RegExp(`\\b${basic}\\b`, 'g');
      const matches = allText.match(regex);
      if (matches && matches.length > 0) {
        found.push({
          basic,
          count: matches.length,
          academic: BASIC_TO_ACADEMIC[basic]
        });
      }
    });
    return found.sort((a, b) => b.count - a.count);
  }, [answers]);

  return (
    <div className="min-h-screen bg-[#FAFAF9] py-12 px-4 sm:px-6 lg:px-8 font-sans text-[#064E3B]">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <button onClick={onBack} className="flex items-center text-sm font-medium hover:text-[#D97706] transition-colors mb-2">
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back to Speaking Modules
            </button>
            <h1 className="text-3xl font-serif font-bold text-[#064E3B]">Speaking Diagnostic Report</h1>
            <p className="text-stone-500 mt-1">Mock Test: {test.source}</p>
          </div>
          <button 
            onClick={onRetake}
            className="flex items-center px-4 py-2 bg-[#D97706] text-white rounded-lg hover:bg-amber-700 transition-colors shadow-sm"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Retake Test
          </button>
        </div>

        {/* Overall Summary Card */}
        <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm">
          <h2 className="text-xl font-serif font-semibold mb-6 flex items-center">
            <Activity className="w-5 h-5 mr-2 text-[#D97706]" />
            Overall Performance
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-stone-50 rounded-xl border border-stone-100">
              <div className="text-sm text-stone-500 font-medium mb-1">Total Words Spoken</div>
              <div className="text-3xl font-bold text-[#064E3B]">{totalWords}</div>
            </div>
            <div className="p-4 bg-stone-50 rounded-xl border border-stone-100">
              <div className="text-sm text-stone-500 font-medium mb-1">Total Filler Words</div>
              <div className="text-3xl font-bold text-[#064E3B]">{totalFillers}</div>
            </div>
            <div className="p-4 bg-stone-50 rounded-xl border border-stone-100">
              <div className="text-sm text-stone-500 font-medium mb-1 flex justify-between">
                Speaking Pace (WPM)
                <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${wpmGrade.bg} ${wpmGrade.color}`}>
                  {wpmGrade.label}
                </span>
              </div>
              <div className="text-3xl font-bold text-[#064E3B] mb-2">{averageWpm}</div>
              <div className="h-1.5 w-full bg-stone-200 rounded-full overflow-hidden">
                <div className={`h-full ${wpmGrade.bar}`} style={{ width: wpmGrade.width }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Per-Question Breakdown */}
        <div className="space-y-6">
          <h2 className="text-xl font-serif font-semibold">Answer Breakdown</h2>
          {answers.map((answer, index) => {
            const qObj = getQuestion(answer.questionId);
            const ansWpm = answer.durationSeconds > 0 ? Math.round((answer.wordCount / answer.durationSeconds) * 60) : 0;
            const ansGrade = getWpmGrade(ansWpm);
            
            // Format duration mm:ss
            const formatTime = (secs: number) => {
              const m = Math.floor(secs / 60);
              const s = Math.floor(secs % 60);
              return `${m}:${s < 10 ? '0' : ''}${s}`;
            };

            return (
              <div key={index} className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm">
                <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2.5 py-1 bg-stone-100 text-stone-700 rounded-md text-xs font-semibold uppercase tracking-wider">
                        {qObj?.partLabel || 'Part'}
                      </span>
                    </div>
                    <p className="font-serif text-lg font-medium text-[#064E3B]">
                      {qObj?.question || 'Question'}
                    </p>
                  </div>
                  <div className="flex flex-col items-end min-w-[120px]">
                    <div className="flex items-center text-sm text-stone-500 font-medium mb-1">
                      <Clock className="w-4 h-4 mr-1" />
                      {formatTime(answer.durationSeconds)} / {formatTime(qObj?.maxAnswerSeconds || 60)}
                    </div>
                    <div className="w-full text-right">
                      <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${ansGrade.bg} ${ansGrade.color}`}>
                        {ansWpm} WPM ({ansGrade.label})
                      </span>
                    </div>
                  </div>
                </div>

                {answer.fillerWords.length > 0 && (
                  <div className="mb-4 flex flex-wrap gap-2 items-center">
                    <span className="text-sm font-medium text-stone-500">Fillers detected:</span>
                    {answer.fillerWords.map((fw, i) => (
                      <span key={i} className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-red-50 text-red-700 border border-red-100">
                        "{fw.word}" &times;{fw.count}
                      </span>
                    ))}
                  </div>
                )}

                <div className="bg-[#FAFAF9] rounded-xl p-4 border border-stone-100">
                  <div className="flex items-center gap-2 mb-2 text-stone-500">
                    <MessageCircle className="w-4 h-4" />
                    <span className="text-sm font-medium uppercase tracking-wider">Transcript</span>
                  </div>
                  <p className="text-stone-700 leading-relaxed italic">
                    {answer.transcript || <span className="text-stone-400">No transcript recorded...</span>}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Vocabulary Upgrade */}
        {vocabFound.length > 0 && (
          <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm overflow-hidden">
            <h2 className="text-xl font-serif font-semibold mb-2 flex items-center">
              <AlertCircle className="w-5 h-5 mr-2 text-[#D97706]" />
              Vocabulary Upgrade Suggestions
            </h2>
            <p className="text-sm text-stone-500 mb-6">We detected some basic words in your answers. Consider using these academic alternatives to boost your Lexical Resource score.</p>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-stone-200">
                    <th className="py-3 px-4 font-semibold text-stone-600 bg-stone-50 rounded-tl-lg">Basic Word</th>
                    <th className="py-3 px-4 font-semibold text-stone-600 bg-stone-50">Times Used</th>
                    <th className="py-3 px-4 font-semibold text-stone-600 bg-stone-50 rounded-tr-lg">Academic Alternatives</th>
                  </tr>
                </thead>
                <tbody>
                  {vocabFound.map((item, idx) => (
                    <tr key={idx} className="border-b border-stone-100 last:border-0 hover:bg-stone-50 transition-colors">
                      <td className="py-3 px-4 font-medium text-red-600">"{item.basic}"</td>
                      <td className="py-3 px-4 text-stone-600">{item.count}</td>
                      <td className="py-3 px-4">
                        <div className="flex flex-wrap gap-2">
                          {item.academic.map((alt, i) => (
                            <span key={i} className="px-2 py-1 bg-green-50 text-green-700 border border-green-200 rounded-md text-sm font-medium">
                              {alt}
                            </span>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* IELTS Criteria Info */}
        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
          <button 
            onClick={() => setCriteriaOpen(!criteriaOpen)}
            className="w-full px-6 py-4 flex items-center justify-between hover:bg-stone-50 transition-colors"
          >
            <h2 className="text-lg font-serif font-semibold flex items-center">
              <Activity className="w-5 h-5 mr-2 text-stone-400" />
              IELTS Speaking Evaluation Criteria
            </h2>
            {criteriaOpen ? <ChevronUp className="w-5 h-5 text-stone-400" /> : <ChevronDown className="w-5 h-5 text-stone-400" />}
          </button>
          
          {criteriaOpen && (
            <div className="px-6 pb-6 pt-2 border-t border-stone-100 space-y-4 text-sm text-stone-600">
              <div className="p-4 bg-stone-50 rounded-xl">
                <h3 className="font-semibold text-[#064E3B] mb-1">Fluency & Coherence</h3>
                <p>How smoothly you speak, your speaking pace, and how well you connect your ideas without awkward pauses or hesitation.</p>
              </div>
              <div className="p-4 bg-stone-50 rounded-xl">
                <h3 className="font-semibold text-[#064E3B] mb-1">Lexical Resource</h3>
                <p>The range of vocabulary you use, your ability to paraphrase, and your usage of idiomatic language and less common words.</p>
              </div>
              <div className="p-4 bg-stone-50 rounded-xl">
                <h3 className="font-semibold text-[#064E3B] mb-1">Grammatical Range & Accuracy</h3>
                <p>The variety of grammatical structures you use (complex sentences, tenses) and how often you make grammatical errors.</p>
              </div>
              <div className="p-4 bg-stone-50 rounded-xl">
                <h3 className="font-semibold text-[#064E3B] mb-1">Pronunciation</h3>
                <p>How easy it is to understand you, your use of intonation, word stress, and sentence stress.</p>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
