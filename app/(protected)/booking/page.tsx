import { BookingPageClient } from '@/components/booking/BookingPageClient';

export const metadata = { title: '수분 예약 — Pollen-Drone' };

export default function BookingPage() {
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between pb-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900">수분 작업 예약</h2>
          <p className="mt-0.5 text-sm font-medium text-slate-500">
            과수원 그리드에서 구역을 선택하고 드론 투입 일정을 설정하세요.
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-1.5">
          <span className="text-xs font-bold text-slate-600">2025년 사과 수분 시즌</span>
        </div>
      </div>
      <BookingPageClient />
    </div>
  );
}
