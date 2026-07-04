'use client';

// 이미지 경로: public/drone-front.png — 투명 배경 드론 정면 이미지

import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { memo, useRef } from 'react';

const SPECS = [
  { label: '위치 제어',      value: 'RTK-GPS ±1cm',            icon: '📡', color: '#22C55E' },
  { label: '고도 유지',      value: 'LiDAR + 초음파',           icon: '🔊', color: '#3B82F6' },
  { label: '분사 메커니즘',  value: '마이크로 펌프',            icon: '💧', color: '#60A5FA' },
  { label: '온보드 AI',      value: 'Jetson Nano',              icon: '🤖', color: '#A78BFA' },
  { label: '대형 정찰 드론',      value: '1대',   icon: '🚁', color: '#34D399' },
  { label: '소형 수분 드론 군집', value: '3~5대', icon: '🐝', color: '#22C55E' },
  { label: '드론 통신',      value: 'MAVLink 프로토콜',         icon: '📶', color: '#F59E0B' },
  { label: '분사 장치',      value: '마이크로 펌프 및 서보 모터', icon: '⚙️', color: '#EC4899' },
] as const;

const DroneShowcase = memo(function DroneShowcase() {
  return (
    <div className="relative flex items-center justify-center py-8">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/[0.08] blur-[80px]" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-green-500/[0.06] blur-[60px]" />

      {/* Drone image — no border, no box, just floating */}
      <motion.div
        animate={{ y: [0, -14, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
        whileHover={{ scale: 1.05 }}
        className="relative cursor-default select-none transition-all duration-300 hover:[filter:drop-shadow(0_32px_80px_rgba(59,130,246,0.40))]"
        style={{ filter: 'drop-shadow(0 24px 60px rgba(59,130,246,0.22))' }}
      >
        <Image
          src="/drone-front.png"
          alt="AI 수분 드론 정면"
          width={380}
          height={380}
          className="max-w-full object-contain"
          priority
        />
      </motion.div>

      {/* Rotating ring */}
      <motion.div
        className="pointer-events-none absolute rounded-full border border-blue-500/10"
        style={{ width: 320, height: 320 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      >
        <div className="absolute right-0 top-1/2 h-2 w-2 -translate-y-1/2 translate-x-1/2 rounded-full bg-blue-400/60" />
      </motion.div>

      <motion.div
        className="pointer-events-none absolute rounded-full border border-green-500/[0.08]"
        style={{ width: 400, height: 400 }}
        animate={{ rotate: -360 }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      >
        <div className="absolute left-0 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-green-400/50" />
      </motion.div>
    </div>
  );
});

export default function HardwareSpecs() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section id="section-specs" className="relative px-6 py-24" style={{ background: 'rgba(255,255,255,0.015)' }}>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />

      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-blue-400">Hardware</p>
          <h2 className="text-3xl font-black text-white lg:text-4xl">적용 기술 스택</h2>
          <p className="mt-3 text-slate-400">
            대형 정찰 드론 1대 + 소형 수분 드론 3~5대 군집 운용에 실제 적용되는 부품과 기술
          </p>
        </motion.div>

        <div ref={ref} className="grid items-center gap-12 lg:grid-cols-2">
          {/* Drone showcase — no container box */}
          <DroneShowcase />

          {/* Spec grid */}
          <div className="grid grid-cols-2 gap-3">
            {SPECS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, x: 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.05 + i * 0.07, ease: 'easeOut' }}
                whileHover={{ scale: 1.02, borderColor: `${s.color}30` }}
                className="flex items-center gap-3 rounded-xl border px-4 py-3 transition-all"
                style={{
                  borderColor: 'rgba(255,255,255,0.07)',
                  background:  'rgba(255,255,255,0.03)',
                }}
              >
                <div
                  className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg text-lg"
                  style={{ background: `${s.color}12` }}
                >
                  {s.icon}
                </div>
                <div>
                  <p className="text-[11px] text-slate-500">{s.label}</p>
                  <p className="text-sm font-bold text-white">{s.value}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
