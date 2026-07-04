'use client';

import { Drone, GRID_COLS, GRID_ROWS } from '@/lib/demo-data';

/* ── 상태별 색상 ──────────────────────────────────────────────── */
const STATUS_COLOR: Record<Drone['status'], string> = {
  active:      '#16a34a',
  idle:        '#94a3b8',
  low_battery: '#ef4444',
};
const STATUS_LABEL: Record<Drone['status'], string> = {
  active:      '수분 중',
  idle:        '대기',
  low_battery: '배터리 부족',
};

/* ── 드론별 고정 메타 (시연용 텔레메트리) ─────────────────────── */
const DRONE_META: Record<string, { speed: string; alt: string; next: string }> = {
  'drone-1': { speed: '3.2 m/s', alt: '9.0 m', next: 'E4' },
  'drone-2': { speed: '2.8 m/s', alt: '8.5 m', next: 'C8' },
  'drone-3': { speed: '0.0 m/s', alt: '0.0 m', next: '귀환 대기' },
  'drone-4': { speed: '0.0 m/s', alt: '0.0 m', next: '대기 중' },
  'drone-5': { speed: '3.5 m/s', alt: '9.5 m', next: 'J3' },
};

/* ── 작업 구역 생성 헬퍼 ──────────────────────────────────────── */
function makeZone(rStart: number, rEnd: number, cStart: number, cEnd: number) {
  const cells: [number, number][] = [];
  for (let r = rStart; r <= rEnd; r++)
    for (let c = cStart; c <= cEnd; c++)
      cells.push([r, c]);
  return cells;
}

const DONE_ZONES     = makeZone(0, 3, 0, 5);   // A1–D6  완료 (초록)
const PROGRESS_ZONES = makeZone(3, 6, 5, 9);   // D6–G10 진행 중 (노랑)

/* ── Props ────────────────────────────────────────────────────── */
type Props = {
  drones: Drone[];
  selectedDroneId: string | null;
  onSelect: (id: string | null) => void;
};

/* ════════════════════════════════════════════════════════════════
   LocalGridRadar
════════════════════════════════════════════════════════════════ */
export function LocalGridRadar({ drones, selectedDroneId, onSelect }: Props) {
  const CELL   = 44;
  const W      = GRID_COLS * CELL;
  const H      = GRID_ROWS * CELL;

  const selected = drones.find((d) => d.id === selectedDroneId) ?? null;
  const meta     = selected ? (DRONE_META[selected.id] ?? { speed: '—', alt: '—', next: '—' }) : null;

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

      {/* ── 헤더 바 ──────────────────────────────────────────── */}
      <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 animate-pulse rounded-full bg-green-500" />
          <span className="text-xs font-black uppercase tracking-widest text-slate-600">Orchard Radar</span>
        </div>
        <div className="flex items-center gap-4 text-[10px] font-semibold">
          <span className="flex items-center gap-1 text-slate-500">
            <span className="inline-block h-2.5 w-2.5 rounded-sm bg-green-200 ring-1 ring-green-400"/>완료
          </span>
          <span className="flex items-center gap-1 text-slate-500">
            <span className="inline-block h-2.5 w-2.5 rounded-sm bg-yellow-100 ring-1 ring-yellow-400"/>진행 중
          </span>
          <span className="flex items-center gap-1 text-slate-500">
            <span className="inline-block h-2.5 w-2.5 rounded-sm bg-slate-100 ring-1 ring-slate-300"/>미작업
          </span>
        </div>
      </div>

      {/* ── SVG 그리드 + 플로팅 패널 ─────────────────────────── */}
      <div className="relative">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="block w-full"
          style={{ height: 'auto' }}
          aria-label="과수원 드론 관제 그리드"
        >
          {/* ── 구역 Zone Overlay ─────────────────────────── */}
          {DONE_ZONES.map(([r, c]) => (
            <rect key={`done-${r}-${c}`}
              x={c*CELL} y={r*CELL} width={CELL} height={CELL}
              fill="rgba(22,163,74,0.13)" />
          ))}
          {PROGRESS_ZONES.map(([r, c]) => (
            <rect key={`prog-${r}-${c}`}
              x={c*CELL} y={r*CELL} width={CELL} height={CELL}
              fill="rgba(234,179,8,0.10)" />
          ))}

          {/* ── 격자선 ────────────────────────────────────── */}
          {Array.from({ length: GRID_ROWS + 1 }, (_, r) => (
            <line key={`h${r}`} x1={0} y1={r*CELL} x2={W} y2={r*CELL}
              stroke="#e2e8f0" strokeWidth={0.6} />
          ))}
          {Array.from({ length: GRID_COLS + 1 }, (_, c) => (
            <line key={`v${c}`} x1={c*CELL} y1={0} x2={c*CELL} y2={H}
              stroke="#e2e8f0" strokeWidth={0.6} />
          ))}

          {/* ── 라벨 ──────────────────────────────────────── */}
          {Array.from({ length: GRID_ROWS }, (_, r) => (
            <text key={`rl${r}`} x={3} y={r*CELL+CELL/2+4}
              fontSize={9} fill="#94a3b8" fontWeight="700">
              {String.fromCharCode(65+r)}
            </text>
          ))}
          {Array.from({ length: GRID_COLS }, (_, c) => (
            <text key={`cl${c}`} x={c*CELL+CELL/2-3} y={10}
              fontSize={9} fill="#94a3b8" fontWeight="700">
              {c+1}
            </text>
          ))}

          {/* ── 이동 경로 (이전→현재, 점선) ──────────────── */}
          {drones.map((d) => {
            const px = d.prevX ?? d.x;
            const py = d.prevY ?? d.y;
            if (px === d.x && py === d.y) return null;
            const x1 = px   * CELL + CELL / 2;
            const y1 = py   * CELL + CELL / 2;
            const x2 = d.x  * CELL + CELL / 2;
            const y2 = d.y  * CELL + CELL / 2;
            if (!isFinite(x1) || !isFinite(y1)) return null;
            return (
              <line key={`path-${d.id}`}
                x1={x1} y1={y1} x2={x2} y2={y2}
                stroke={STATUS_COLOR[d.status]}
                strokeWidth={1.5}
                strokeDasharray="4 3"
                opacity={0.45}
              />
            );
          })}

          {/* ── 드론 마커 ─────────────────────────────────── */}
          {drones.map((d) => {
            const cx = d.x * CELL + CELL / 2;
            const cy = d.y * CELL + CELL / 2;
            const col = STATUS_COLOR[d.status];
            const isSel = d.id === selectedDroneId;

            return (
              <g key={d.id}
                onClick={() => onSelect(d.id === selectedDroneId ? null : d.id)}
                style={{ cursor: 'pointer' }}>

                {/* Outer glow — active */}
                {d.status === 'active' && (
                  <circle cx={cx} cy={cy} r={14} fill={col} opacity={0.10}>
                    <animate attributeName="r"       values="10;20;10"       dur="2.4s" repeatCount="indefinite"/>
                    <animate attributeName="opacity" values="0.12;0;0.12"    dur="2.4s" repeatCount="indefinite"/>
                  </circle>
                )}
                {/* 배터리 부족 경고 깜박임 */}
                {d.status === 'low_battery' && (
                  <circle cx={cx} cy={cy} r={14} fill="#ef4444" opacity={0.15}>
                    <animate attributeName="opacity" values="0.15;0.35;0.15" dur="0.8s" repeatCount="indefinite"/>
                  </circle>
                )}

                {/* 선택 링 */}
                {isSel && (
                  <circle cx={cx} cy={cy} r={18}
                    fill="none" stroke={col} strokeWidth={2}
                    strokeDasharray="5 3" opacity={0.7}>
                    <animateTransform attributeName="transform" type="rotate"
                      from={`0 ${cx} ${cy}`} to={`360 ${cx} ${cy}`}
                      dur="4s" repeatCount="indefinite"/>
                  </circle>
                )}

                {/* 드론 본체 */}
                <circle cx={cx} cy={cy} r={10} fill={col} />
                <line x1={cx-6} y1={cy-6} x2={cx+6} y2={cy+6} stroke="white" strokeWidth={1.6}/>
                <line x1={cx+6} y1={cy-6} x2={cx-6} y2={cy+6} stroke="white" strokeWidth={1.6}/>
                <circle cx={cx} cy={cy} r={3} fill="white"/>

                {/* 이름 라벨 */}
                <text x={cx} y={cy+22} textAnchor="middle"
                  fontSize={8} fill="#334155" fontWeight="700">
                  {d.name}
                </text>
              </g>
            );
          })}
        </svg>

        {/* ── 플로팅 상세 패널 (선택 드론) ──────────────────── */}
        {selected && meta && (
          <div className="absolute right-3 top-3 z-10 w-48 rounded-xl border border-slate-200 bg-white/95 shadow-xl backdrop-blur-sm">
            <div className="flex items-center justify-between border-b border-slate-100 px-3 py-2">
              <span className="text-xs font-black text-slate-800">{selected.name}</span>
              <button onClick={() => onSelect(null)}
                className="text-[10px] text-slate-400 hover:text-slate-700">✕</button>
            </div>
            <dl className="grid grid-cols-2 gap-x-2 gap-y-1.5 p-3 text-[10px]">
              {[
                ['위치',     `${String.fromCharCode(65+selected.y)}${selected.x+1}`],
                ['배터리',   `${selected.battery.toFixed(0)}%`],
                ['속도',     meta.speed],
                ['고도',     meta.alt],
                ['펌프',     selected.pumpActive ? '작동 중' : '정지'],
                ['다음 목표', meta.next],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="font-semibold text-slate-400">{k}</dt>
                  <dd className={`font-black ${
                    k === '배터리' && selected.battery < 30 ? 'text-red-600' :
                    k === '펌프' && selected.pumpActive   ? 'text-green-700' :
                    'text-slate-800'
                  }`}>{v}</dd>
                </div>
              ))}
            </dl>
            {/* 배터리 바 */}
            <div className="border-t border-slate-100 px-3 pb-3 pt-2">
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                <div className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${selected.battery}%`,
                    background: selected.battery < 30 ? '#ef4444' : '#16a34a',
                  }}/>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── 하단 범례 ─────────────────────────────────────────── */}
      <div className="flex flex-wrap gap-4 border-t border-slate-100 bg-slate-50 px-4 py-2">
        {(Object.entries(STATUS_LABEL) as [Drone['status'], string][]).map(([s, label]) => (
          <span key={s} className="flex items-center gap-1.5 text-[10px] font-semibold text-slate-600">
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: STATUS_COLOR[s] }}/>
            {label}
          </span>
        ))}
        <span className="ml-auto text-[10px] font-semibold text-slate-400">
          클릭 → 드론 상세 정보
        </span>
      </div>
    </div>
  );
}
