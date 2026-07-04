'use client';

import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const BOXES = [
  { id: 'b1', x: '12%', y: '8%',  w: '34%', h: '38%', label: 'Flower',  conf: 0.97, delay: 0    },
  { id: 'b2', x: '52%', y: '5%',  w: '36%', h: '42%', label: 'Flower',  conf: 0.94, delay: 0.25 },
  { id: 'b3', x: '8%',  y: '52%', w: '38%', h: '40%', label: 'Cluster', conf: 0.89, delay: 0.5  },
  { id: 'b4', x: '50%', y: '55%', w: '42%', h: '38%', label: 'Flower',  conf: 0.92, delay: 0.75 },
] as const;

const D = 0.22;   // draw duration per side
const G = 0.10;   // gap between sides

function BoundingBox({ box, active }: { box: typeof BOXES[number]; active: boolean }) {
  const on  = (extra = 0) => ({ duration: D, delay: box.delay + extra, ease: 'easeInOut' as const });
  const off = ()           => ({ duration: 0.12, delay: 0 });

  return (
    <div className="absolute" style={{ left: box.x, top: box.y, width: box.w, height: box.h }}>
      {/* Clockwise draw: Top → Right → Bottom → Left */}
      <motion.div className="absolute inset-x-0 top-0 h-px origin-left bg-green-400"
        initial={{ scaleX: 0 }}
        animate={active ? { scaleX: 1, transition: on(0) } : { scaleX: 0, transition: off() }}
      />
      <motion.div className="absolute inset-y-0 right-0 w-px origin-top bg-green-400"
        initial={{ scaleY: 0 }}
        animate={active ? { scaleY: 1, transition: on(D + G) } : { scaleY: 0, transition: off() }}
      />
      <motion.div className="absolute inset-x-0 bottom-0 h-px origin-right bg-green-400"
        initial={{ scaleX: 0 }}
        animate={active ? { scaleX: 1, transition: on((D + G) * 2) } : { scaleX: 0, transition: off() }}
      />
      <motion.div className="absolute inset-y-0 left-0 w-px origin-bottom bg-green-400"
        initial={{ scaleY: 0 }}
        animate={active ? { scaleY: 1, transition: on((D + G) * 3) } : { scaleY: 0, transition: off() }}
      />
      {/* Label — appears after box is fully drawn */}
      <motion.div
        className="absolute -top-6 left-0 rounded px-2 py-0.5 font-mono text-[10px] font-bold"
        style={{ background: '#22C55E', color: '#0B0F14' }}
        initial={{ opacity: 0, y: 4 }}
        animate={active
          ? { opacity: 1, y: 0, transition: { duration: 0.2, delay: box.delay + (D + G) * 4 } }
          : { opacity: 0, y: 4, transition: { duration: 0.1 } }
        }
      >
        {box.label}: {box.conf.toFixed(2)}
      </motion.div>
    </div>
  );
}

export default function FlowerDetection() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-blue-400">Technology · AI Vision</p>
          <h2 className="text-3xl font-black text-white lg:text-4xl">YOLO 기반 실시간 꽃 탐지 AI</h2>
          <p className="mt-3 text-slate-400">
            드론 카메라 영상에서 개화 꽃을 실시간으로 감지하고 수분 최적 구역을 자동 계산합니다
          </p>
        </motion.div>

        <div ref={ref} className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left: Flower image with inView-triggered YOLO overlay */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="relative overflow-hidden rounded-2xl"
            style={{ border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.02)' }}
          >
            {/* LIVE badge */}
            <div className="absolute left-3 top-3 z-20 flex items-center gap-1.5 rounded-lg border border-white/10 bg-[#0B0F14]/80 px-2.5 py-1.5 backdrop-blur-md">
              <motion.span
                className="h-2 w-2 rounded-full bg-red-500"
                animate={inView ? { opacity: [1, 0.3, 1] } : { opacity: 1 }}
                transition={{ duration: 0.8, repeat: Infinity }}
              />
              <span className="text-[11px] font-bold text-white">LIVE</span>
            </div>
            {/* YOLOv8 badge */}
            <div className="absolute right-3 top-3 z-20 rounded-lg border border-green-500/30 bg-green-500/10 px-2.5 py-1.5">
              <span className="text-[11px] font-bold text-green-400">YOLOv8</span>
            </div>

            <div className="relative aspect-[4/3] w-full">
              <Image src="/flower.jpg" alt="AI가 탐지하는 사과꽃" fill className="object-cover" />
              <div className="absolute inset-0 bg-[#0B0F14]/15" />

              {/* Bounding boxes — draw when section scrolls into view */}
              <div className="absolute inset-0">
                {BOXES.map(box => <BoundingBox key={box.id} box={box} active={inView} />)}
              </div>

              {/* Scan line — auto-starts on inView */}
              <motion.div
                className="pointer-events-none absolute inset-x-0 h-0.5"
                style={{ background: 'linear-gradient(90deg, transparent, #22C55E70, transparent)' }}
                animate={inView ? { top: ['0%', '100%', '0%'], opacity: 1 } : { opacity: 0 }}
                transition={inView
                  ? { top: { duration: 2.5, repeat: Infinity, ease: 'linear', delay: 0.3 }, opacity: { duration: 0.4 } }
                  : { opacity: { duration: 0.2 } }
                }
              />
            </div>

            {/* Detection count */}
            <motion.div
              className="flex items-center justify-between border-t border-white/[0.06] px-4 py-3"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 1.5 }}
            >
              <span className="text-xs text-slate-500">탐지 결과</span>
              <motion.span
                className="text-sm font-bold text-green-400"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 2.0 }}
              >
                4 Flowers Detected
              </motion.span>
            </motion.div>
          </motion.div>

          {/* Right: Description */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
            className="flex flex-col gap-6"
          >
            {[
              { icon: '🎯', title: 'mAP 90%+ 인식 정확도',      desc: 'YOLOv8 기반 딥러닝 모델로 드론 카메라 영상에서 개화된 꽃을 실시간으로 탐지. 목표 mAP(Mean Average Precision) 90% 이상을 달성해 정밀 수분 작업을 지원합니다.',      color: '#22C55E' },
              { icon: '📍', title: 'GPS 좌표 자동 매핑',          desc: '탐지된 꽃의 픽셀 좌표를 RTK-GPS 데이터와 결합해 실제 GPS 좌표 점(Point)으로 변환합니다. 이 데이터가 DBSCAN 클러스터링의 입력으로 사용됩니다.',                  color: '#3B82F6' },
              { icon: '⚡', title: '온보드 추론 (Jetson Nano)', desc: '드론 탑재 Jetson Nano에서 추론을 수행해 클라우드 지연 없이 현장에서 즉시 결과를 처리합니다. 기상 악화나 통신 불안정 상황에서도 안정적으로 동작합니다.', color: '#A78BFA' },
            ].map(({ icon, title, desc, color }) => (
              <div key={title} className="flex gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl text-xl"
                  style={{ background: `${color}12`, border: `1px solid ${color}25` }}>
                  {icon}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">{title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-400">{desc}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
