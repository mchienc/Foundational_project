import React from 'react';
import { Bookmark } from 'lucide-react';
import { ListeningSection as IListeningSection, ListeningQuestion } from '../../types';

interface ListeningSectionProps {
  section: IListeningSection;
  userAnswers: Record<string, string>;
  reviewFlags: Set<string>;
  onAnswer: (questionId: string, value: string) => void;
  onToggleFlag: (questionId: string) => void;
  activeQuestionId?: string;
}

export const ListeningSection: React.FC<ListeningSectionProps> = ({
  section,
  userAnswers,
  reviewFlags,
  onAnswer,
  onToggleFlag,
  activeQuestionId,
}) => {
  const renderQuestionInput = (q: ListeningQuestion) => {
    const value = userAnswers[q.id] || '';
    
    switch (q.type) {
      case 'form_completion':
      case 'note_completion':
      case 'sentence_completion':
      case 'table_completion':
        return (
          <input
            type="text"
            value={value}
            onChange={(e) => onAnswer(q.id, e.target.value)}
            className="border-b-2 border-[#064E3B] bg-transparent font-sans text-sm px-1 focus:outline-none w-32 text-stone-800"
          />
        );
      case 'multiple_choice':
        return (
          <div className="flex gap-4 mt-2">
            {['A', 'B', 'C'].map((opt) => (
              <label key={opt} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name={q.id}
                  value={opt}
                  checked={value === opt}
                  onChange={(e) => onAnswer(q.id, e.target.value)}
                  className="hidden peer"
                />
                <div className="w-8 h-8 rounded-full border-2 border-stone-300 flex items-center justify-center font-medium text-stone-600 peer-checked:border-[#064E3B] peer-checked:bg-[#064E3B] peer-checked:text-white transition-colors">
                  {opt}
                </div>
              </label>
            ))}
          </div>
        );
      case 'matching':
        return (
          <div className="flex gap-2 mt-2">
            {['A', 'B', 'C', 'D', 'E'].map((opt) => (
              <label key={opt} className="flex items-center gap-1 cursor-pointer">
                <input
                  type="radio"
                  name={q.id}
                  value={opt}
                  checked={value === opt}
                  onChange={(e) => onAnswer(q.id, e.target.value)}
                  className="hidden peer"
                />
                <div className="w-6 h-6 rounded border-2 border-stone-300 flex items-center justify-center font-medium text-xs text-stone-600 peer-checked:border-[#064E3B] peer-checked:bg-[#064E3B] peer-checked:text-white transition-colors">
                  {opt}
                </div>
              </label>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  const groups = section.questions.reduce((acc: Record<string, ListeningQuestion[]>, q: ListeningQuestion) => {
    const key = q.groupHeader || 'default';
    if (!acc[key]) acc[key] = [];
    acc[key].push(q);
    return acc;
  }, {});

  return (
    <div className="w-full max-w-4xl mx-auto py-8 mb-24">
      <h2 className="text-3xl font-serif font-bold text-[#064E3B] mb-8">{section.title}</h2>
      
      <div className="space-y-8">
        {Object.entries(groups).map(([header, questions], gIndex) => (
          <div key={gIndex} className="bg-white rounded-2xl border border-stone-200 p-8 shadow-sm">
            {header !== 'default' && (
              <h3 className="text-xl font-serif font-medium text-[#064E3B] mb-2">{header}</h3>
            )}
            {questions[0]?.groupInstruction && (
              <p className="text-stone-600 italic mb-6 font-serif">{questions[0].groupInstruction}</p>
            )}

            <div className="space-y-6">
              {questions.map((q) => {
                const isFlagged = reviewFlags.has(q.id);
                const isActive = activeQuestionId === q.id;

                return (
                  <div 
                    key={q.id} 
                    id={`question-${q.number}`}
                    className={`relative pl-4 transition-all ${isActive ? 'border-l-4 border-[#D97706]' : 'border-l-4 border-transparent'}`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-[#FAFAF9] border border-stone-200 rounded-lg flex items-center justify-center font-bold text-[#064E3B]">
                        {q.number}
                      </div>
                      
                      <div className="flex-1 pt-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-stone-800 font-medium">
                            {q.prompt || 'Complete the following:'}
                          </span>
                        </div>
                        {renderQuestionInput(q)}
                      </div>

                      <button
                        onClick={() => onToggleFlag(q.id)}
                        className={`p-2 rounded-lg transition-colors ${isFlagged ? 'text-[#D97706] bg-amber-50' : 'text-stone-400 hover:bg-stone-100 hover:text-stone-600'}`}
                        title={isFlagged ? 'Remove flag' : 'Flag for review'}
                      >
                        <Bookmark size={20} fill={isFlagged ? 'currentColor' : 'none'} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
