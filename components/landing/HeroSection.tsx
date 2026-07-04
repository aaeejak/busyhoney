'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useCallback, useEffect, useState } from 'react';

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };
const fadeUp  = (delay = 0) => ({
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] as const } },
});

// Static array — avoids Math.random() at render time (prevents hydration mismatch)
const PARTICLES = [
  { id: 0,  x: 18, y: 22, size: 2,   dur: 4.5, dx: 9,   dy: -22, delay: 0,    opacity: 0.45, color: '#60A5FA' },
  { id: 1,  x: 76, y: 38, size: 1.5, dur: 3.8, dx: -5,  dy: -18, delay: 0.7,  opacity: 0.35, color: '#34D399' },
  { id: 2,  x: 48, y: 12, size: 2.5, dur: 5.2, dx: 11,  dy: -26, delay: 1.3,  opacity: 0.55, color: '#ffffff' },
  { id: 3,  x: 86, y: 18, size: 1.5, dur: 3.5, dx: -8,  dy: -14, delay: 0.4,  opacity: 0.3,  color: '#60A5FA' },
  { id: 4,  x: 28, y: 72, size: 2,   dur: 4.8, dx: 12,  dy: -20, delay: 1.8,  opacity: 0.4,  color: '#34D399' },
  { id: 5,  x: 63, y: 58, size: 1.5, dur: 4.1, dx: -6,  dy: -24, delay: 0.9,  opacity: 0.35, color: '#A78BFA' },
  { id: 6,  x: 8,  y: 54, size: 2,   dur: 5.5, dx: 7,   dy: -19, delay: 2.1,  opacity: 0.38, color: '#60A5FA' },
  { id: 7,  x: 90, y: 76, size: 1.5, dur: 3.9, dx: -10, dy: -17, delay: 1.5,  opacity: 0.28, color: '#34D399' },
  { id: 8,  x: 40, y: 84, size: 2,   dur: 4.3, dx: 5,   dy: -25, delay: 0.3,  opacity: 0.42, color: '#ffffff' },
  { id: 9,  x: 55, y: 26, size: 1.5, dur: 4.7, dx: -7,  dy: -16, delay: 1.1,  opacity: 0.33, color: '#A78BFA' },
  { id: 10, x: 22, y: 44, size: 2,   dur: 5.0, dx: 9,   dy: -21, delay: 2.4,  opacity: 0.38, color: '#60A5FA' },
  { id: 11, x: 78, y: 62, size: 1.5, dur: 3.6, dx: -4,  dy: -20, delay: 0.6,  opacity: 0.28, color: '#34D399' },
] as const;

export default function HeroSection() {
  const mouseX  = useMotionValue(0);
  const mouseY  = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 35, damping: 14, mass: 0.6 });
  const springY = useSpring(mouseY, { stiffness: 35, damping: 14, mass: 0.6 });
  const droneX  = useTransform(springX, [-0.5, 0.5], [-22, 22]);
  const droneY  = useTransform(springY, [-0.5, 0.5], [-14, 14]);

  const [battery, setBattery] = useState(91);
  const [mission, setMission] = useState(72);

  useEffect(() => {
    const id = setInterval(() => {
      setBattery(prev => Math.max(87, Math.min(96, prev + (Math.random() > 0.5 ? 1 : -1))));
      setMission(prev => Math.min(99, prev + (Math.random() > 0.4 ? 1 : 0)));
    }, 4000);
    return () => clearInterval(id);
  }, []);

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - r.left) / r.width  - 0.5);
    mouseY.set((e.clientY - r.top)  / r.height - 0.5);
  }, [mouseX, mouseY]);

  const onMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  return (
    <section
      className="relative flex min-h-screen items-center overflow-hidden pt-16"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {/* ── Background ── */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 opacity-[0.032]" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.7) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }} />
        <div className="absolute inset-0 opacity-[0.018]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat', backgroundSize: '200px 200px',
        }} />
        <div className="absolute left-1/4 top-1/3 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/[0.07] blur-[130px]" />
        <div className="absolute right-1/4 top-1/4 h-96 w-96 rounded-full bg-green-500/[0.05] blur-[100px]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0B0F14] to-transparent" />
      </div>

      {/* ── Content grid ── */}
      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-12 px-6 py-28 lg:grid-cols-2 lg:gap-16 lg:min-h-screen lg:py-0">

        {/* Left — Text */}
        <motion.div initial="hidden" animate="visible" variants={stagger}>
          <motion.div variants={fadeUp(0)}>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-xs font-medium text-slate-400 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-400" />
              Inha University Capstone Design · 2025
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp(0.05)}
            className="mt-8 text-5xl font-black leading-[1.12] tracking-tight lg:text-6xl xl:text-7xl"
          >
            <span className="block text-white">스마트 과수원을</span>
            <span className="block text-white">위한</span>
            <span className="block bg-gradient-to-r from-blue-400 via-blue-300 to-green-300 bg-clip-text text-transparent">
              완전 자율<br className="hidden sm:block" />수분 플랫폼
            </span>
          </motion.h1>

          <motion.p variants={fadeUp(0.1)} className="mt-6 max-w-md text-lg leading-relaxed text-slate-400">
            AI 꽃 인식, 군집 드론 제어, 실시간 모니터링을<br className="hidden sm:block" />
            하나의 플랫폼으로.
          </motion.p>

          <motion.div variants={fadeUp(0.15)} className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              href="/auth/signup"
              className="group relative overflow-hidden rounded-2xl bg-blue-600 px-7 py-3.5 text-sm font-semibold text-white shadow-xl shadow-blue-600/25 transition-all hover:-translate-y-px hover:bg-blue-500 hover:shadow-blue-500/35"
            >
              <motion.span
                className="pointer-events-none absolute inset-0 -translate-x-full skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={{ translateX: ['-120%', '220%'] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3.5, ease: 'easeInOut' }}
              />
              <span className="relative flex items-center gap-2">
                데모 보기
                <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}>→</motion.span>
              </span>
            </Link>
            <Link
              href="/auth/login"
              className="rounded-2xl border border-white/[0.08] bg-white/[0.03] px-7 py-3.5 text-sm font-semibold text-slate-300 backdrop-blur-sm transition-all hover:border-white/20 hover:bg-white/[0.06] hover:text-white"
            >
              로그인
            </Link>
          </motion.div>

          <motion.div
            variants={fadeUp(0.25)}
            className="mt-12 flex flex-wrap items-center gap-x-7 gap-y-3 border-t border-white/[0.06] pt-6 text-xs"
          >
            {[
              { val: 'mAP 90%+', label: '꽃 인식 정확도 목표'       },
              { val: '80%+',     label: '수작업 대비 시간 단축 목표' },
              { val: '±5cm',     label: '분사 위치 오차 이내'        },
            ].map(({ val, label }) => (
              <span key={label} className="flex items-center gap-2">
                <span className="font-bold text-green-400">{val}</span>
                <span className="text-slate-500">{label}</span>
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* Right — Drone visual + particles */}
        <div className="relative flex items-center justify-center">

          {/* Pollen particles */}
          {PARTICLES.map(p => (
            <motion.div
              key={p.id}
              className="pointer-events-none absolute rounded-full"
              style={{
                left:      `${p.x}%`,
                top:       `${p.y}%`,
                width:     `${p.size}px`,
                height:    `${p.size}px`,
                background: p.color,
                boxShadow:  `0 0 ${p.size * 3}px ${p.color}`,
              }}
              animate={{ x: [0, p.dx, 0], y: [0, p.dy, 0], opacity: [p.opacity, p.opacity * 0.3, p.opacity] }}
              transition={{ duration: p.dur, repeat: Infinity, delay: p.delay, ease: 'easeInOut' }}
            />
          ))}

          {/* Panel + mini dashboard wrapper */}
          <div className="relative w-full max-w-[520px]">
            {/* CSS glassmorphism panel */}
            <motion.div
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative overflow-hidden rounded-3xl"
              style={{
                aspectRatio: '4/3',
                background:  'linear-gradient(135deg, rgba(59,130,246,0.09) 0%, rgba(11,15,20,0.95) 45%, rgba(34,197,94,0.06) 100%)',
                border:      '1px solid rgba(255,255,255,0.07)',
              }}
            >
              <div className="absolute inset-0 opacity-[0.055]" style={{
                backgroundImage: 'linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)',
                backgroundSize: '40px 40px',
              }} />
              <div className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/[0.12] blur-[70px]" />
              <div className="absolute bottom-0 right-0 h-32 w-48 rounded-full bg-green-500/[0.07] blur-[60px]" />
              <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/[0.07]" />
            </motion.div>

            {/* Mini dashboard — overlaps bottom-right corner of panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.88, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.5, ease: 'easeOut' }}
              className="absolute -bottom-5 -right-4 z-20 w-48 rounded-2xl p-3.5 backdrop-blur-xl"
              style={{
                background: 'rgba(7,9,13,0.92)',
                border:     '1px solid rgba(255,255,255,0.10)',
                boxShadow:  '0 20px 50px -10px rgba(0,0,0,0.55), 0 0 0 1px rgba(59,130,246,0.08)',
              }}
            >
              {/* Status */}
              <div className="mb-2.5 flex items-center gap-1.5">
                <span className="h-2 w-2 animate-pulse rounded-full bg-green-400" />
                <span className="text-[11px] font-bold text-white">Online</span>
                <span className="ml-auto text-[9px] text-slate-500">운용 중</span>
              </div>

              {/* Battery */}
              <div className="mb-2.5">
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-[10px] text-slate-500">Battery</span>
                  <span className="font-mono text-[11px] font-bold text-white">{battery}%</span>
                </div>
                <div className="h-0.5 overflow-hidden rounded-full bg-white/[0.06]">
                  <motion.div
                    className="h-full rounded-full bg-green-400"
                    animate={{ width: `${battery}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                  />
                </div>
              </div>

              {/* Mission */}
              <div>
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-[10px] text-slate-500">Mission</span>
                  <span className="font-mono text-[11px] font-bold text-blue-400">{mission}%</span>
                </div>
                <div className="h-0.5 overflow-hidden rounded-full bg-white/[0.06]">
                  <motion.div
                    className="h-full rounded-full bg-blue-400"
                    animate={{ width: `${mission}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                  />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Floating drone — parallax, layered above panel */}
          <motion.div style={{ x: droneX, y: droneY }} className="absolute">
            <motion.div animate={{ y: [0, -18, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}>
              <Image
                src="/drone-front.png"
                alt="AI 수분 드론 정면"
                width={290}
                height={290}
                className="drop-shadow-[0_28px_64px_rgba(59,130,246,0.30)]"
                priority
              />
            </motion.div>
          </motion.div>

          {/* Badge — AI status */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.9 }}
            className="absolute right-3 top-4 flex items-center gap-2 rounded-xl border border-white/[0.08] bg-[#0B0F14]/82 px-3 py-2 backdrop-blur-md"
          >
            <span className="h-2 w-2 animate-pulse rounded-full bg-green-400" />
            <span className="text-xs font-medium text-slate-200">AI 탐지 실행 중</span>
          </motion.div>

          {/* Badge — GPS */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 1.1 }}
            className="absolute bottom-8 left-3 flex items-center gap-2 rounded-xl border border-white/[0.08] bg-[#0B0F14]/82 px-3 py-2 backdrop-blur-md"
          >
            <span className="text-xs">📡</span>
            <span className="text-xs text-slate-400">
              RTK-GPS <span className="font-bold text-green-400">±1cm</span>
            </span>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0], opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="flex h-10 w-6 items-start justify-center rounded-full border border-white/20 pt-1.5">
          <div className="h-2 w-0.5 rounded-full bg-slate-400" />
        </div>
      </motion.div>
    </section>
  );
}
