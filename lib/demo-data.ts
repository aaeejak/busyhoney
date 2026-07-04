export type DroneStatus = 'active' | 'idle' | 'low_battery';

export type Drone = {
  id: string;
  name: string;
  x: number;
  y: number;
  prevX: number;
  prevY: number;
  battery: number;
  status: DroneStatus;
  pumpActive: boolean;
};

export const demoDrones: Drone[] = [
  { id: 'drone-1', name: '드론 #1', x: 3, y: 4, prevX: 3, prevY: 4, battery: 87, status: 'active',      pumpActive: true  },
  { id: 'drone-2', name: '드론 #2', x: 7, y: 2, prevX: 7, prevY: 2, battery: 62, status: 'active',      pumpActive: true  },
  { id: 'drone-3', name: '드론 #3', x: 5, y: 8, prevX: 5, prevY: 8, battery: 21, status: 'low_battery', pumpActive: false },
  { id: 'drone-4', name: '드론 #4', x: 10,y: 5, prevX: 10,prevY: 5, battery: 95, status: 'idle',        pumpActive: false },
  { id: 'drone-5', name: '드론 #5', x: 1, y: 9, prevX: 1, prevY: 9, battery: 74, status: 'active',      pumpActive: true  },
];

export type GridCell = {
  id: string;
  row: number;
  col: number;
  label: string;
};

export const GRID_ROWS = 10;
export const GRID_COLS = 12;

export const bookingGrid: GridCell[] = Array.from({ length: GRID_ROWS }, (_, r) =>
  Array.from({ length: GRID_COLS }, (_, c) => ({
    id: `cell-${r}-${c}`,
    row: r,
    col: c,
    label: `${String.fromCharCode(65 + r)}${c + 1}`,
  })),
).flat();

export type HistoryRecord = {
  date: string;
  completionRate: number;
  drones: number;
  area: number;
  savings: number;
};

export const historyData: HistoryRecord[] = [
  { date: '5/15', completionRate: 92, drones: 4, area: 1200, savings: 320000 },
  { date: '5/22', completionRate: 85, drones: 3, area: 900, savings: 240000 },
  { date: '5/29', completionRate: 97, drones: 5, area: 1500, savings: 410000 },
  { date: '6/5',  completionRate: 88, drones: 4, area: 1100, savings: 295000 },
  { date: '6/9',  completionRate: 100, drones: 5, area: 1500, savings: 450000 },
  { date: '6/13', completionRate: 76, drones: 3, area: 750, savings: 200000 },
];
