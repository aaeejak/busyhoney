'use client';

import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { historyData } from '@/lib/demo-data';

function GlassCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-3xl border border-white/40 bg-white/50 p-5 shadow backdrop-blur-sm">
      <h3 className="mb-4 text-sm font-bold text-slate-700">{title}</h3>
      {children}
    </div>
  );
}

export function HistoryAnalytics() {
  const totalArea = historyData.reduce((s, r) => s + r.area, 0);
  const totalSavings = historyData.reduce((s, r) => s + r.savings, 0);
  const avgCompletion = Math.round(historyData.reduce((s, r) => s + r.completionRate, 0) / historyData.length);
  const totalSessions = historyData.length;

  return (
    <div className="space-y-6">
      {/* 요약 통계 */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { label: '총 작업 횟수', value: `${totalSessions}회`, color: 'text-slate-900' },
          { label: '총 작업 면적', value: `${(totalArea / 1000).toFixed(1)}천 ㎡`, color: 'text-green-700' },
          { label: '평균 완료율', value: `${avgCompletion}%`, color: 'text-blue-700' },
          { label: '누적 절감액', value: `${(totalSavings / 10000).toFixed(0)}만원`, color: 'text-amber-600' },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl border border-white/40 bg-white/50 p-4 shadow backdrop-blur-sm">
            <div className="text-xs font-medium text-slate-500">{s.label}</div>
            <div className={`mt-1 text-2xl font-black ${s.color}`}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* 작업 완료율 트렌드 */}
      <GlassCard title="작업 완료율 추이 (%)">
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={historyData} margin={{ top: 4, right: 16, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="completionGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#16a34a" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#16a34a" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="date" tick={{ fontSize: 11 }} />
            <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} unit="%" />
            <Tooltip formatter={(v) => [`${v}%`, '완료율']} />
            <Area
              type="monotone"
              dataKey="completionRate"
              stroke="#16a34a"
              strokeWidth={2}
              fill="url(#completionGrad)"
              dot={{ r: 4, fill: '#16a34a' }}
              activeDot={{ r: 6 }}
              name="완료율"
            />
          </AreaChart>
        </ResponsiveContainer>
      </GlassCard>

      {/* 드론 투입 수 vs 작업 면적 */}
      <GlassCard title="드론 투입 수 vs 작업 면적 (㎡)">
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={historyData} margin={{ top: 4, right: 16, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="date" tick={{ fontSize: 11 }} />
            <YAxis yAxisId="left" tick={{ fontSize: 11 }} />
            <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11 }} />
            <Tooltip />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Bar yAxisId="left" dataKey="drones" fill="#94a3b8" name="드론 수" radius={[4, 4, 0, 0]} />
            <Bar yAxisId="right" dataKey="area" fill="#16a34a" name="면적(㎡)" radius={[4, 4, 0, 0]} opacity={0.8} />
          </BarChart>
        </ResponsiveContainer>
      </GlassCard>

      {/* 비용 절감 효과 */}
      <GlassCard title="회차별 인건비 절감 효과 (원)">
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={historyData} margin={{ top: 4, right: 16, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="savingsGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="date" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `${(v / 10000).toFixed(0)}만`} />
            <Tooltip formatter={(v) => [`${(Number(v) / 10000).toFixed(1)}만원`, '절감액']} />
            <Area
              type="monotone"
              dataKey="savings"
              stroke="#f59e0b"
              strokeWidth={2}
              fill="url(#savingsGrad)"
              dot={{ r: 4, fill: '#f59e0b' }}
              activeDot={{ r: 6 }}
              name="절감액"
            />
          </AreaChart>
        </ResponsiveContainer>
      </GlassCard>
    </div>
  );
}
