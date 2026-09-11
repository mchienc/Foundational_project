import React from 'react';

interface ConnectorsToolbarProps {
  onInsert: (text: string) => void;
}

const GROUPS = [
  {
    label: 'Trend Verbs',
    phrases: ['soared dramatically', 'declined sharply', 'plateaued at', 'fluctuated slightly', 'witnessed a surge', 'experienced a dip', 'remained stable at']
  },
  {
    label: 'Comparisons',
    phrases: ['In stark contrast,', 'Similarly,', 'By comparison,', 'Whereas', 'While']
  },
  {
    label: 'Overview',
    phrases: ['Overall, it is clear that', 'In general,', 'It is noticeable that']
  },
  {
    label: 'Data Reference',
    phrases: ['reached a peak of', 'hit a trough of', 'accounting for', 'representing approximately']
  }
];

export const ConnectorsToolbar: React.FC<ConnectorsToolbarProps> = ({ onInsert }) => {
  return (
    <div className="flex overflow-x-auto gap-4 p-2 items-center border-t border-stone-200 bg-[#FAFAF9] font-sans">
      {GROUPS.map((group) => (
        <div key={group.label} className="flex items-center gap-2">
          <span className="text-[10px] uppercase text-stone-500 font-mono font-semibold tracking-wider whitespace-nowrap">
            {group.label}
          </span>
          <div className="flex gap-1">
            {group.phrases.map((phrase) => (
              <button
                key={phrase}
                onClick={() => onInsert(phrase)}
                className="px-2 py-1 rounded-full bg-amber-50 border border-amber-300 text-amber-900 text-xs font-medium cursor-pointer hover:bg-amber-100 whitespace-nowrap transition-colors"
              >
                {phrase}
              </button>
            ))}
          </div>
          <div className="w-px h-4 bg-stone-300 ml-2" />
        </div>
      ))}
    </div>
  );
};

export default ConnectorsToolbar;
