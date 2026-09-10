import { useState } from 'react';
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { BarChart3, PieChart } from 'lucide-react';
import { useMistakeStore } from '../../store/useMistakeStore';

export const MistakeAnalyticsChart = () => {
  const { getQuestionTypeAnalytics } = useMistakeStore();
  const [chartType, setChartType] = useState<'radar' | 'bar'>('radar');

  const analytics = getQuestionTypeAnalytics();

  // Radar chart data mapping
  const radarData = analytics.map((item) => ({
    subject: item.label,
    accuracy: item.accuracy, // 0 to 100%
    needsPractice: item.needsPractice,
    total: item.total,
    fullMark: 100,
  }));

  // Bar chart data mapping
  const barData = analytics.map((item) => ({
    name: item.label,
    resolved: item.resolved,
    needsPractice: item.needsPractice,
    total: item.total,
  }));

  return (
    <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-7 shadow-xs space-y-6">
      {/* Header & Chart Mode Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-100">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-serif font-bold text-[#064E3B]">
              Phân Tích Điểm Yếu Theo Dạng Bài
            </h3>
            <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-[10px] font-mono font-bold">
              AI Analytics
            </span>
          </div>
          <p className="text-xs text-stone-500 font-sans mt-0.5">
            Biểu đồ trực quan hóa mức độ thấu hiểu và tỷ lệ tháo gỡ lỗi sai theo 5 dạng bài IELTS Reading.
          </p>
        </div>

        {/* Toggle Radar vs Bar */}
        <div className="flex items-center gap-1 p-1 bg-stone-100 rounded-xl border border-stone-200/80 shrink-0 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setChartType('radar')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-sans font-bold transition-all cursor-pointer ${
              chartType === 'radar'
                ? 'bg-[#064E3B] text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <PieChart size={13} />
            <span>Radar Năng Lực</span>
          </button>
          <button
            type="button"
            onClick={() => setChartType('bar')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-sans font-bold transition-all cursor-pointer ${
              chartType === 'bar'
                ? 'bg-[#064E3B] text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <BarChart3 size={13} />
            <span>Cột Phân Bổ</span>
          </button>
        </div>
      </div>

      {/* Chart Visual Canvas */}
      <div className="w-full h-72 sm:h-80">
        {chartType === 'radar' ? (
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
              <PolarGrid stroke="#e5e7eb" />
              <PolarAngleAxis
                dataKey="subject"
                tick={{ fill: '#44403c', fontSize: 11, fontWeight: 600, fontFamily: 'Be Vietnam Pro' }}
              />
              <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#a8a29e" tick={{ fontSize: 10 }} />
              <Radar
                name="Tỷ lệ tháo gỡ (%)"
                dataKey="accuracy"
                stroke="#064E3B"
                fill="#064E3B"
                fillOpacity={0.4}
              />
              <Tooltip
                formatter={(value: any, name: any) => [`${value}%`, name]}
                contentStyle={{
                  backgroundColor: '#ffffff',
                  borderRadius: '12px',
                  border: '1px solid #e7e5e4',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                  fontFamily: 'Be Vietnam Pro',
                  fontSize: '12px',
                }}
              />
            </RadarChart>
          </ResponsiveContainer>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData} margin={{ top: 10, right: 20, left: -10, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f4" />
              <XAxis
                dataKey="name"
                tick={{ fill: '#44403c', fontSize: 11, fontFamily: 'Be Vietnam Pro' }}
                interval={0}
              />
              <YAxis tick={{ fill: '#78716c', fontSize: 11, fontFamily: 'Be Vietnam Pro' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#ffffff',
                  borderRadius: '12px',
                  border: '1px solid #e7e5e4',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                  fontFamily: 'Be Vietnam Pro',
                  fontSize: '12px',
                }}
              />
              <Bar dataKey="resolved" name="Đã tháo gỡ (Resolved)" fill="#064E3B" radius={[6, 6, 0, 0]} />
              <Bar dataKey="needsPractice" name="Cần luyện tập (Needs Practice)" fill="#D97706" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Breakdown Grid Badges */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 pt-2 border-t border-stone-100 font-sans">
        {analytics.map((item) => (
          <div
            key={item.type}
            className="p-2.5 rounded-2xl bg-stone-50 border border-stone-200/80 text-center space-y-1"
          >
            <div className="text-[11px] font-mono font-bold text-stone-600 truncate" title={item.label}>
              {item.type}
            </div>
            <div className="text-lg font-serif font-bold text-[#064E3B]">
              {item.accuracy}%
            </div>
            <div className="text-[10px] text-stone-500 font-mono">
              <span className="text-emerald-700 font-bold">{item.resolved}</span> / {item.total} câu
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
