import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Clock, Send, ChevronDown, CheckCircle, AlertTriangle, FileBarChart } from 'lucide-react';
import { ConnectorsToolbar } from './ConnectorsToolbar';
import { SentenceUpgraderPopover } from './SentenceUpgraderPopover';
import { WritingTask1Prompt } from '../../types';
import { mockWritingTask1Prompts } from '../../data/mockWritingData';

interface WritingTask1StudioProps {
  onBack: () => void;
  onNotify?: (msg: string, type?: 'success' | 'error' | 'info') => void;
}

export const WritingTask1Studio: React.FC<WritingTask1StudioProps> = ({ onBack, onNotify }) => {
  const [selectedPrompt, setSelectedPrompt] = useState<WritingTask1Prompt>(mockWritingTask1Prompts?.[0] || ({} as WritingTask1Prompt));
  const [essayText, setEssayText] = useState('');
  const [timeLeft, setTimeLeft] = useState(selectedPrompt?.timeLimit || 1200);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [selectedText, setSelectedText] = useState('');
  const [popoverPosition, setPopoverPosition] = useState<{ x: number; y: number } | null>(null);
  const [isVocabExpanded, setIsVocabExpanded] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Timer logic
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isTimerRunning && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (timeLeft === 0 && isTimerRunning) {
      setIsTimerRunning(false);
      onNotify?.("Time is up!", 'info');
    }
    return () => clearInterval(timer);
  }, [isTimerRunning, timeLeft, onNotify]);

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEssayText(e.target.value);
    if (!isTimerRunning && timeLeft > 0) {
      setIsTimerRunning(true);
    }
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLTextAreaElement>) => {
    const selection = window.getSelection();
    const text = selection?.toString().trim() || '';
    if (text && text.split(/\s+/).length > 3) {
      setSelectedText(text);
      setPopoverPosition({ x: e.clientX, y: e.clientY + 20 });
    } else {
      setPopoverPosition(null);
    }
  };

  const handleApplyUpgrade = (replacement: string) => {
    if (!textareaRef.current) return;
    const start = textareaRef.current.selectionStart;
    const end = textareaRef.current.selectionEnd;
    const newText = essayText.substring(0, start) + replacement + essayText.substring(end);
    setEssayText(newText);
    setPopoverPosition(null);
    setSelectedText('');
    
    // Clear selection
    window.getSelection()?.removeAllRanges();
  };

  const wordCount = essayText.trim() ? essayText.trim().split(/\s+/).length : 0;
  const minWords = 150;
  
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const timerWarning = timeLeft < 300; // Less than 5 minutes

  const hasOverview = /(overall|in general|it is clear|it is noticeable)/i.test(essayText);
  const dataPointsCount = (essayText.match(/\b\d+(\.\d+)?%?\b/g) || []).length;

  // Attempt to find upgrade matching selected text
  const matchUpgrade = (selectedPrompt as any)?.sentenceExamples?.find((ex: any) => 
    ex.original.toLowerCase().includes(selectedText.toLowerCase().substring(0, 20))
  );

  return (
    <div className="flex w-full h-screen bg-[#FAFAF9] font-sans text-[#064E3B] overflow-hidden">
      {/* Left Panel */}
      <div className="w-[45%] h-full bg-white border-r border-stone-200 flex flex-col overflow-y-auto">
        <div className="p-4 border-b border-stone-100 flex items-center justify-between sticky top-0 bg-white z-10">
          <button onClick={onBack} className="flex items-center gap-2 text-stone-500 hover:text-stone-800 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium text-sm">Back</span>
          </button>
          
          <select 
            value={selectedPrompt?.id || ''}
            onChange={(e) => {
              const prompt = mockWritingTask1Prompts?.find(p => p.id === e.target.value);
              if (prompt) {
                setSelectedPrompt(prompt);
                setTimeLeft(prompt.timeLimit || 1200);
                setEssayText('');
                setIsTimerRunning(false);
              }
            }}
            className="px-3 py-1.5 bg-stone-50 border border-stone-200 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            {(mockWritingTask1Prompts || []).map(p => (
              <option key={p.id} value={p.id}>{p.source}</option>
            ))}
          </select>
        </div>

        <div className="p-6 flex-1 flex flex-col gap-6">
          <div className="flex items-start justify-between">
            <div>
              <span className="inline-block px-2.5 py-1 bg-[#064E3B] text-amber-300 text-xs font-bold rounded-md uppercase tracking-wide mb-3">
                {selectedPrompt?.source || 'Official Cambridge'}
              </span>
              <h2 className="text-xl font-serif font-bold text-[#064E3B] leading-tight">
                {selectedPrompt?.source || 'Writing Task 1'}
              </h2>
            </div>
          </div>

          <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 text-stone-800 font-serif leading-relaxed text-sm">
            {(selectedPrompt as any)?.taskDescription || 'Summarise the information by selecting and reporting the main features, and make comparisons where relevant.'}
          </div>

          {(selectedPrompt as any)?.chartImageUrl && (
            <img 
              src={(selectedPrompt as any).chartImageUrl} 
              alt="Task 1 Chart" 
              className="w-full rounded-2xl border border-stone-200 object-contain max-h-[300px] bg-white shadow-sm my-4" 
            />
          )}

          <div className="border border-stone-200 rounded-xl overflow-hidden mt-auto">
            <button 
              onClick={() => setIsVocabExpanded(!isVocabExpanded)}
              className="w-full px-4 py-3 bg-stone-50 flex items-center justify-between hover:bg-stone-100 transition-colors"
            >
              <div className="flex items-center gap-2 font-medium">
                <FileBarChart className="w-4 h-4 text-amber-600" />
                <span>Data Trends Vocabulary</span>
              </div>
              <ChevronDown className={`w-4 h-4 text-stone-500 transition-transform ${isVocabExpanded ? 'rotate-180' : ''}`} />
            </button>
            {isVocabExpanded && (
              <div className="p-4 bg-white text-sm text-stone-600 font-serif">
                <p>Use words like <strong>soared</strong>, <strong>plummeted</strong>, or <strong>plateaued</strong> to describe line graph trends.</p>
                <p className="mt-2">For pie charts, use <strong>accounted for</strong>, <strong>comprised</strong>, or <strong>represented</strong>.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-[55%] h-full flex flex-col">
        <div className="h-16 border-b border-stone-200 bg-white px-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-6">
            <div className={`text-sm font-medium ${wordCount < minWords ? 'text-red-500' : 'text-emerald-600'}`}>
              {wordCount} / {minWords} words
            </div>
            
            <div className={`flex items-center gap-1.5 text-sm font-mono font-medium px-3 py-1 rounded-full ${timerWarning ? 'bg-red-50 text-red-600' : 'bg-stone-100 text-stone-700'}`}>
              <Clock className="w-4 h-4" />
              {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </div>
          </div>
          
          <button 
            disabled={wordCount < minWords}
            className={`flex items-center gap-2 px-5 py-2 rounded-xl font-medium transition-colors ${
              wordCount < minWords 
                ? 'bg-stone-100 text-stone-400 cursor-not-allowed' 
                : 'bg-amber-600 hover:bg-amber-700 text-white shadow-sm shadow-amber-600/20'
            }`}
          >
            Submit <Send className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 p-6 flex flex-col gap-4 relative">
          <textarea
            ref={textareaRef}
            value={essayText}
            onChange={handleTextareaChange}
            onMouseUp={handleMouseUp}
            placeholder="Start writing your essay here. The timer will start automatically..."
            className="flex-1 w-full resize-none bg-white border border-stone-200 rounded-2xl p-6 text-sm font-serif leading-relaxed text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 shadow-sm transition-all"
          />

          <ConnectorsToolbar onInsert={(phrase) => {
            setEssayText(prev => prev + (prev.endsWith(' ') || prev === '' ? '' : ' ') + phrase + ' ');
            if (textareaRef.current) {
              textareaRef.current.focus();
            }
            if (!isTimerRunning && timeLeft > 0) setIsTimerRunning(true);
          }} />

          {/* Heuristic Audit Panel */}
          <div className="grid grid-cols-2 gap-4 mt-2 shrink-0">
            <div className={`p-3 rounded-xl border flex items-start gap-3 ${hasOverview ? 'bg-emerald-50 border-emerald-200' : 'bg-red-50 border-red-200'}`}>
              {hasOverview ? <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" /> : <AlertTriangle className="w-5 h-5 text-red-500 shrink-0" />}
              <div>
                <h4 className={`text-xs font-bold uppercase tracking-wider ${hasOverview ? 'text-emerald-800' : 'text-red-800'}`}>Overview Detector</h4>
                <p className={`text-xs mt-0.5 ${hasOverview ? 'text-emerald-600' : 'text-red-600'}`}>
                  {hasOverview ? 'Clear overview signal phrase detected.' : 'Missing clear overview phrase (e.g. "Overall", "In general").'}
                </p>
              </div>
            </div>
            
            <div className="p-3 rounded-xl border bg-blue-50 border-blue-200 flex items-start gap-3">
              <FileBarChart className="w-5 h-5 text-blue-500 shrink-0" />
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-blue-800">Data Counter</h4>
                <p className="text-xs mt-0.5 text-blue-600">
                  {dataPointsCount} data points/numbers found in your text.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <SentenceUpgraderPopover 
        selectedText={selectedText}
        position={popoverPosition}
        onApply={handleApplyUpgrade}
        onClose={() => setPopoverPosition(null)}
        upgrades={matchUpgrade as any}
      />
    </div>
  );
};

export default WritingTask1Studio;
