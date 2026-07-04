'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const FIELDS = [
  { icon: '🗓', label: '예약 날짜',   value: '2025년 7월 12일 (토)', badge: null       },
  { icon: '🏡', label: '과수원',      value: 'Apple Orchard A',     badge: 'VIP'      },
  { icon: '📐', label: '면적',        value: '2.3 ha',              badge: null       },
  { icon: '⏱', label: '예상 소요',   value: '약 48분',              badge: '자동 계산' },
] as const;

const SUMMARY = [
  { label: '꽃가루 절감 예상', value: '약 32%',  color: '#22C55E' },
  { label: '수분 구역 수',    value: '12개',    color: '#3B82F6' },
  { label: '투입 드론',       value: '4대',     color: '#A78BFA' },
] as const;

const stagger  = { hidden: {}, visible: { transition: { staggerChildren: 0.07 } } };
const fadeSlide = {
  hidden:  { opacity: 0, x: -12 },
  visible: { opacity: 1, x: 0,  transition: { duration: 0.38, ease: 'easeOut' } },
};

export default function ReservationDemo() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-xl">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 text-center"
        >
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-blue-400">Get Started</p>
          <h2 className="text-3xl font-black text-white">지금 바로 예약하세요</h2>
          <p className="mt-3 text-slate-400">
            수분 작업 일정을 몇 번의 클릭으로 예약하고 실시간으로 모니터링하세요
          </p>
        </motion.div>

        {/* Reservation card */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 32, scale: 0.97 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="overflow-hidden rounded-2xl"
          style={{
            border:     '1px solid rgba(255,255,255,0.08)',
            background: 'rgba(255,255,255,0.02)',
            boxShadow:  '0 32px 80px -16px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04)',
          }}
        >
          {/* Card header */}
          <div
            className="flex items-center justify-between border-b px-6 py-4"
            style={{ borderColor: 'rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.015)' }}
          >
            <div>
              <p className="text-sm font-bold text-white">🗓 수분 작업 예약</p>
              <p className="mt-0.5 text-[11px] text-slate-500">Pollen-Drone Platform · Demo</p>
            </div>
            <div
              className="flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-bold text-green-400"
              style={{ background: 'rgba(34,197,94,0.10)', border: '1px solid rgba(34,197,94,0.22)' }}
            >
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-400" />
              드론 준비 완료
            </div>
          </div>

          {/* Form fields */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="px-6 pt-5 pb-4"
          >
            {FIELDS.map(f => (
              <motion.div
                key={f.label}
                variants={fadeSlide}
                className="flex items-center justify-between border-b py-3.5 last:border-0"
                style={{ borderColor: 'rgba(255,255,255,0.05)' }}
              >
                <div className="flex items-center gap-3">
                  <span className="text-base">{f.icon}</span>
                  <span className="text-[11px] text-slate-500">{f.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  {f.badge && (
                    <span
                      className="rounded-full px-2 py-0.5 text-[9px] font-bold text-blue-400"
                      style={{ background: 'rgba(59,130,246,0.10)', border: '1px solid rgba(59,130,246,0.22)' }}
                    >
                      {f.badge}
                    </span>
                  )}
                  <span className="text-sm font-semibold text-white">{f.value}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Summary stats */}
          <div
            className="mx-6 mb-5 grid grid-cols-3 gap-2 rounded-xl border p-4"
            style={{ borderColor: 'rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}
          >
            {SUMMARY.map(s => (
              <div key={s.label} className="text-center">
                <p className="text-sm font-black" style={{ color: s.color }}>{s.value}</p>
                <p className="mt-0.5 text-[9px] text-slate-600">{s.label}</p>
              </div>
            ))}
          </div>

          {/* CTA button */}
          <div className="px-6 pb-6">
            <motion.button
              whileHover={{
                scale: 1.015,
                boxShadow: '0 20px 60px -12px rgba(59,130,246,0.50)',
              }}
              whileTap={{ scale: 0.99 }}
              className="group relative w-full overflow-hidden rounded-xl py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-600/20"
              style={{ background: 'linear-gradient(135deg, #2563EB 0%, #1d4ed8 100%)' }}
            >
              {/* Shimmer */}
              <motion.span
                className="pointer-events-none absolute inset-0 -translate-x-full skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={{ translateX: ['-120%', '220%'] }}
                transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 2.8, ease: 'easeInOut' }}
              />
              <span className="relative flex items-center justify-center gap-2">
                ✨ 예약 실행하기
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                >
                  →
                </motion.span>
              </span>
            </motion.button>

            <p className="mt-3 text-center text-[10px] text-slate-600">
              데모 목적으로 실제 결제 없이 예약 경험을 체험할 수 있습니다
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
