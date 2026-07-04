'use client';

import { Fragment, useState } from 'react';
import { bookingGrid, GRID_ROWS, GRID_COLS } from '@/lib/demo-data';

export type ReservationPayload = {
  startAt: string;
  droneCount: number;
  selectedZoneIds: string[];
  areaGeoJson: object;
  workBlocks: { id: string; row: number; col: number }[];
};

export function BookingPlanner({ onSave }: { onSave: (p: ReservationPayload) => Promise<void> }) {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [startAt, setStartAt] = useState('');
  const [droneCount, setDroneCount] = useState(2);
  const [saving, setSaving] = useState(false);

  const toggle = (id: string) =>
    setSelected((prev) => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });

  const handleSave = async () => {
    if (!startAt || selected.size === 0) return;
    setSaving(true);
    try {
      const cells = bookingGrid.filter((c) => selected.has(c.id));
      await onSave({
        startAt, droneCount,
        selectedZoneIds: [...selected],
        areaGeoJson: { type: 'MultiPoint', coordinates: cells.map((c) => [c.col, c.row]) },
        workBlocks: cells.map((c) => ({ id: c.id, row: c.row, col: c.col })),
      });
      setSelected(new Set());
      setStartAt('');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-wrap gap-4">
        <input type="datetime-local" value={startAt} onChange={(e) => setStartAt(e.target.value)}
          className="h-10 rounded-xl border border-slate-300 px-3 text-sm focus:border-green-500 focus:outline-none" />
        <input type="number" min={1} max={10} value={droneCount} onChange={(e) => setDroneCount(Number(e.target.value))}
          className="h-10 w-20 rounded-xl border border-slate-300 px-3 text-sm focus:border-green-500 focus:outline-none" />
        <button onClick={() => setSelected(new Set())}
          className="h-10 rounded-xl border border-slate-300 px-4 text-sm text-slate-600 hover:bg-slate-50">초기화</button>
        <button onClick={handleSave} disabled={saving || selected.size === 0 || !startAt}
          className="h-10 rounded-xl bg-green-600 px-5 text-sm font-bold text-white disabled:bg-slate-300">
          {saving ? '저장 중...' : `예약 저장 (${selected.size}구역)`}
        </button>
      </div>
      <div className="grid" style={{ gridTemplateColumns: `20px repeat(${GRID_COLS}, minmax(0, 1fr))`, gap: 2 }}>
        <div />{Array.from({ length: GRID_COLS }, (_, c) => <div key={c} className="text-center text-[9px] text-slate-400">{c+1}</div>)}
        {Array.from({ length: GRID_ROWS }, (_, r) => (
          <Fragment key={r}>
            <div className="flex items-center justify-center text-[9px] text-slate-400">{String.fromCharCode(65+r)}</div>
            {Array.from({ length: GRID_COLS }, (_, c) => {
              const cell = bookingGrid[r * GRID_COLS + c];
              const isSel = selected.has(cell.id);
              return (
                <button key={cell.id} type="button" onClick={() => toggle(cell.id)} title={cell.label}
                  className={`aspect-square rounded-sm text-[8px] font-bold transition-all ${isSel ? 'bg-green-600 text-white' : 'bg-slate-100 hover:bg-green-100'}`}>
                  {isSel && cell.label}
                </button>
              );
            })}
          </Fragment>
        ))}
      </div>
    </div>
  );
}
