import { RealtimeDashboard } from '@/components/dashboard/RealtimeDashboard';

export const metadata = { title: '실시간 관제 — Pollen-Drone' };

export default function DashboardPage() {
  return (
    <div className="space-y-1">
      {/* 페이지 헤더 */}
      <div className="flex items-center justify-between pb-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900">실시간 관제 대시보드</h2>
          <p className="mt-0.5 text-sm font-medium text-slate-500">
            군집 드론 위치·배터리·수분 상태를 실시간으로 모니터링합니다.
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 px-3 py-1.5">
          <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
          <span className="text-xs font-bold text-green-700">LIVE</span>
        </div>
      </div>

      <RealtimeDashboard />
    </div>
  );
}
