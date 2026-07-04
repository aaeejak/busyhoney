'use client';

import { useEffect, useRef, useState } from 'react';
import { useRealtimeDrones } from '@/hooks/useRealtimeDrones';
import { LocalGridRadar } from '@/components/dashboard/LocalGridRadar';
import { Drone } from '@/lib/demo-data';

/* ── 상태 스타일 ──────────────────────────────────────────────── */
const STATUS_LABEL: Record<Drone['status'], string> = {
  active:      '수분 중',
  idle:        '대기',
  low_battery: '배터리 부족',
};
const STATUS_DOT: Record<Drone['status'], string> = {
  active:      'bg-green-500',
  idle:        'bg-slate-400',
  low_battery: 'bg-red-500',
};
const STATUS_RING: Record<Drone['status'], string> = {
  active:      'ring-green-200',
  idle:        'ring-slate-200',
  low_battery: 'ring-red-200',
};

/* ════════════════════════════════════════════════════════════════
   시스템 로그 패널
════════════════════════════════════════════════════════════════ */
function ts() {
  const n = new Date();
  return [n.getHours(), n.getMinutes(), n.getSeconds()]
    .map((v) => String(v).padStart(2, '0'))
    .join(':');
}

const LOG_POOL = [
  () => `[${ts()}] \x1b드론 #1\x1b B4 구역 수분 작업 완료 (완료율 73%)`,
  () => `[${ts()}] \x1b드론 #2\x1b C7 → D8 이동 완료`,
  () => `[${ts()}] \x1b드론 #3\x1b 배터리 21% — 귀환 모드 전환 예정`,
  () => `[${ts()}] 시스템: 총 진행 면적 876m² 달성`,
  () => `[${ts()}] \x1b드론 #5\x1b G3 구역 펌프 압력 정상 (3.2 bar)`,
  () => `[${ts()}] \x1b드론 #1\x1b 목표 구역 E4 진입 완료`,
  () => `[${ts()}] 기상: 풍속 1.2 m/s — 비행 조건 양호`,
  () => `[${ts()}] \x1b드론 #2\x1b 수분액 잔량 68% 확인`,
  () => `[${ts()}] 시스템: 오늘 작업 예정 12개 구역 중 8개 완료`,
  () => `[${ts()}] \x1b드론 #4\x1b 대기 모드 — 충전 스테이션 도킹 완료`,
  () => `[${ts()}] ⚠ 드론 #3 배터리 20% 이하 — 긴급 귀환 명령 전송`,
  () => `[${ts()}] \x1b드론 #5\x1b H9 → J3 경로 재계산 완료`,
  () => `[${ts()}] 시스템: 군집 드론 통신 지연 0ms — 정상`,
];

const INIT_LOGS = [
  `[시작] Pollen-Drone 관제 시스템 부팅 완료`,
  `[시작] 드론 5대 연결 확인 — 작업 구역 스캔 중`,
  `[${ts()}] 드론 #1 B4 구역 수분 작업 시작`,
  `[${ts()}] 드론 #2 C5 구역 진입`,
  `[${ts()}] 드론 #5 A1 구역 완료 — 다음 구역 이동`,
];

function SystemLog() {
  const [logs, setLogs] = useState<string[]>(INIT_LOGS);
  const scrollRef = useRef<HTMLDivElement>(null);
  const poolIdx   = useRef(0);

  useEffect(() => {
    const fire = () => {
      const fn = LOG_POOL[poolIdx.current % LOG_POOL.length];
      poolIdx.current++;
      setLogs((prev) => [...prev.slice(-59), fn()]);
    };

    // 첫 메시지 0.8초 후
    const t0 = setTimeout(fire, 800);
    const interval = setInterval(fire, 1600 + Math.random() * 800);
    return () => { clearTimeout(t0); clearInterval(interval); };
  }, []);

  // 새 로그 시 자동 스크롤
  useEffect(() => {
    if (scrollRef.current)
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [logs]);

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 shadow-inner">
      {/* 터미널 헤더 */}
      <div className="flex items-center gap-3 border-b border-slate-700 bg-slate-900 px-4 py-2">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500"/>
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-500"/>
          <span className="h-2.5 w-2.5 rounded-full bg-green-500"/>
        </div>
        <span className="flex items-center gap-2 font-mono text-[10px] font-bold text-green-400">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-400"/>
          SYSTEM LOG — pollen-drone control station
        </span>
      </div>

      {/* 로그 본체 */}
      <div
        ref={scrollRef}
        className="h-40 overflow-y-auto px-4 py-2 font-mono text-[11px] leading-relaxed"
      >
        {logs.map((log, i) => {
          const isWarn = log.includes('⚠') || log.includes('배터리 20%');
          const isDone = log.includes('완료');
          const isSystem = log.includes('시스템:') || log.includes('[시작]');
          return (
            <div
              key={i}
              className={`whitespace-nowrap ${
                isWarn   ? 'text-red-400' :
                isDone   ? 'text-green-400' :
                isSystem ? 'text-yellow-400' :
                'text-slate-300'
              } ${i === logs.length - 1 ? 'animate-pulse' : ''}`}
            >
              {log.replace(/\x1b/g, '')}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   메인 대시보드
════════════════════════════════════════════════════════════════ */
export function RealtimeDashboard() {
  const { drones, selectedDroneId, setSelectedDroneId } = useRealtimeDrones();

  const active     = drones.filter((d) => d.status === 'active');
  const idle       = drones.filter((d) => d.status === 'idle');
  const lowBatt    = drones.filter((d) => d.status === 'low_battery');
  const avgBattery = (drones.reduce((s, d) => s + d.battery, 0) / drones.length).toFixed(0);

  const kpis = [
    { label: '총 드론',    value: drones.length, unit: '대', color: 'text-slate-800' },
    { label: '수분 중',    value: active.length, unit: '대', color: 'text-green-700' },
    { label: '대기',       value: idle.length,   unit: '대', color: 'text-slate-500' },
    { label: '평균 배터리',value: avgBattery,     unit: '%',  color: lowBatt.length > 0 ? 'text-red-600' : 'text-blue-700' },
  ];

  return (
    <div className="space-y-4">

      {/* ── KPI 스트립 ─────────────────────────────────── */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {kpis.map((k) => (
          <div key={k.label}
               className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
            <div className="text-xs font-bold text-slate-500">{k.label}</div>
            <div className={`mt-0.5 flex items-end gap-0.5 text-3xl font-black ${k.color}`}>
              {k.value}
              <span className="mb-0.5 text-base font-semibold">{k.unit}</span>
            </div>
          </div>
        ))}
      </div>

      {/* ── 맵 + 우측 패널 ────────────────────────────── */}
      <div className="grid gap-4 lg:grid-cols-[1fr_300px]">

        {/* 레이더 맵 */}
        <LocalGridRadar
          drones={drones}
          selectedDroneId={selectedDroneId}
          onSelect={setSelectedDroneId}
        />

        {/* 우측 드론 목록 */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 bg-slate-50 px-4 py-2.5">
            <span className="text-xs font-black uppercase tracking-widest text-slate-600">
              드론 현황
            </span>
          </div>

          <ul className="divide-y divide-slate-100">
            {drones.map((drone) => {
              const isSel = drone.id === selectedDroneId;
              return (
                <li key={drone.id}
                    onClick={() => setSelectedDroneId(isSel ? null : drone.id)}
                    className={`flex cursor-pointer items-center gap-3 px-4 py-3 transition hover:bg-slate-50 ${
                      isSel ? `bg-green-50 ring-1 ring-inset ${STATUS_RING[drone.status]}` : ''
                    }`}>

                  {/* 상태 점 */}
                  <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${STATUS_DOT[drone.status]} ${
                    drone.status === 'active' ? 'animate-pulse' : ''
                  }`}/>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-slate-800">{drone.name}</span>
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                        drone.status === 'active'      ? 'bg-green-100 text-green-800' :
                        drone.status === 'low_battery' ? 'bg-red-100 text-red-700'    :
                        'bg-slate-100 text-slate-600'
                      }`}>{STATUS_LABEL[drone.status]}</span>
                    </div>

                    {/* 배터리 미니 바 */}
                    <div className="mt-1.5 flex items-center gap-2">
                      <div className="h-1 flex-1 overflow-hidden rounded-full bg-slate-100">
                        <div className="h-full rounded-full transition-all duration-500"
                          style={{
                            width: `${drone.battery}%`,
                            background: drone.battery < 30 ? '#ef4444' : '#16a34a',
                          }}/>
                      </div>
                      <span className={`text-[10px] font-bold ${
                        drone.battery < 30 ? 'text-red-600' : 'text-slate-500'
                      }`}>{drone.battery.toFixed(0)}%</span>
                    </div>

                    {/* 위치 */}
                    <div className="mt-0.5 font-mono text-[10px] text-slate-400">
                      위치 {String.fromCharCode(65 + drone.y)}{drone.x + 1}
                      {' · '}
                      펌프 {drone.pumpActive ? '🟢 ON' : '⚫ OFF'}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          {/* 작업 진행률 요약 */}
          <div className="border-t border-slate-100 bg-slate-50 px-4 py-3">
            <div className="mb-1.5 flex justify-between text-[10px] font-bold">
              <span className="text-slate-600">오늘 작업 완료율</span>
              <span className="text-green-700">73%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-slate-200">
              <div className="h-full rounded-full bg-gradient-to-r from-green-500 to-emerald-400 transition-all"
                   style={{ width: '73%' }}/>
            </div>
            <div className="mt-1 flex justify-between text-[9px] text-slate-400">
              <span>완료 876 ㎡</span><span>전체 1,200 ㎡</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── 시스템 로그 ────────────────────────────────── */}
      <SystemLog />
    </div>
  );
}
