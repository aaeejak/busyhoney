'use client';

import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function DashboardPreview() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section className="relative px-6 py-24" style={{ background: 'rgba(255,255,255,0.012)' }}>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />

      <div className="mx-auto max-w-6xl">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-blue-400">
            Live Platform Preview
          </p>
          <h2 className="text-3xl font-black text-white lg:text-4xl">실시간 운용 대시보드</h2>
          <p className="mt-3 text-slate-400">
            드론 미션 현황, 배터리 상태, 탐지 구역을 한눈에 파악하는 관제 화면
          </p>
        </motion.div>

        {/* Mac-style browser mockup */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 48, scale: 0.95 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-2xl"
          style={{
            border:     '1px solid rgba(255,255,255,0.09)',
            background: 'rgba(255,255,255,0.015)',
            boxShadow:
              '0 60px 140px -20px rgba(0,0,0,0.75),' +
              '0 0 0 1px rgba(255,255,255,0.04),' +
              '0 0 120px -40px rgba(59,130,246,0.10)',
          }}
          whileHover={{
            boxShadow:
              '0 70px 160px -20px rgba(0,0,0,0.80),' +
              '0 0 0 1px rgba(255,255,255,0.06),' +
              '0 0 140px -40px rgba(59,130,246,0.16)',
            transition: { duration: 0.4 },
          }}
        >
          {/* Glass reflection — top-left shine */}
          <div
            className="pointer-events-none absolute inset-0 z-10 rounded-2xl"
            style={{ background: 'linear-gradient(158deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.01) 28%, transparent 55%)' }}
          />

          {/* Mac-style title bar */}
          <div
            className="relative z-20 flex items-center gap-3 border-b px-4 py-3.5"
            style={{
              borderColor:    'rgba(255,255,255,0.07)',
              background:     'rgba(10,13,18,0.72)',
              backdropFilter: 'blur(24px)',
            }}
          >
            {/* Authentic macOS traffic lights */}
            <div className="flex gap-2">
              <div className="h-3 w-3 rounded-full" style={{ background: '#FF5F57', boxShadow: '0 0 8px rgba(255,95,87,0.5)' }} />
              <div className="h-3 w-3 rounded-full" style={{ background: '#FEBC2E', boxShadow: '0 0 8px rgba(254,188,46,0.4)' }} />
              <div className="h-3 w-3 rounded-full" style={{ background: '#28C840', boxShadow: '0 0 8px rgba(40,200,64,0.4)'  }} />
            </div>

            {/* Tab bar feel */}
            <div className="flex flex-1 justify-center">
              <div
                className="flex items-center gap-2 rounded-lg px-4 py-1.5 text-[11px] text-slate-500"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.06)' }}
              >
                <span className="text-slate-600">🔒</span>
                <span>app.pollen-drone.io/dashboard</span>
              </div>
            </div>

            {/* Live indicator */}
            <div
              className="flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-[10px] font-bold text-red-400"
              style={{ background: 'rgba(239,68,68,0.10)', border: '1px solid rgba(239,68,68,0.22)' }}
            >
              <motion.span
                className="h-1.5 w-1.5 rounded-full bg-red-400"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              LIVE
            </div>
          </div>

          {/* Dashboard screenshot */}
          <div className="relative aspect-video w-full overflow-hidden">
            <Image
              src="/대시보드.png"
              alt="Pollen-Drone 실시간 운용 대시보드"
              fill
              className="object-cover object-top"
              priority
            />
            {/* Edge vignettes for seamless blending */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#07090D]/70 to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 left-0  w-6  bg-gradient-to-r from-[#07090D]/15 to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-6  bg-gradient-to-l from-[#07090D]/15 to-transparent" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
