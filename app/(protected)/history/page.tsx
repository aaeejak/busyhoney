import { HistoryAnalytics } from '@/components/history/HistoryAnalytics';

export const metadata = { title: '이력 분석 — Pollen-Drone' };

export default function HistoryPage() {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-black text-slate-900">작업 이력 분석</h2>
        <p className="mt-1 text-sm text-slate-500">
          과거 수분 작업 기록과 드론 효율 데이터를 분석합니다.
        </p>
      </div>
      <HistoryAnalytics />
    </div>
  );
}
