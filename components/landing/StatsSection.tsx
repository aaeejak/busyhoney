'use client';

import { motion, useInView } from 'framer-motion';
import { memo, useEffect, useRef, useState } from 'react';

// ─── CountUp hook ─────────────────────────────────────────────────────────────
function useCountUp(end: number, durationMs = 1800, active = false) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    const t0 = performance.now();
    let raf: number;
    const tick = (now: number) => {
      const progress = Math.min((now - t0) / durationMs, 1);
      const eased    = 1 - (1 - progress) ** 3;
      setVal(Math.round(eased * end));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, end, durationMs]);
  return val;
}

// ─── Problem cards ─────────────────────────────────────────────────────────────
const PROBLEMS = [
  {
    icon:   '🐝',
    title:  '꿀벌 개체 수 급감',
    desc:   '2022년 월동 중 약 78억 마리의 꿀벌이 폐사. 꿀벌의 화분매개가치는 연간 6조 6,000억 원으로, 과수 농가에 심각한 타격을 줍니다.',
    tag:    '화분매개가치 연 6조 6,000억 원',
    color:  '#F59E0B',
    glow:   'rgba(245,158,11,0.12)',
  },
  {
    icon:   '👨‍🌾',
    title:  '농업 인력 고령화',
    desc:   '농가 인구 중 65세 이상 비율이 55.8%에 달하며, 인력 부족으로 짧은 개화기(7~10일)에 집중되는 수작업에 한계가 있습니다.',
    tag:    '65세 이상 농가 비율 55.8%',
    color:  '#EC4899',
    glow:   'rgba(236,72,153,0.12)',
  },
  {
    icon:   '💸',
    title:  '비효율적인 기존 수분',
    desc:   '기존 광역 살포 드론은 꽃 위치를 인식하지 못해 고가 수입 꽃가루를 무차별 살포합니다. 비산 손실이 크고 수분 효율이 낮습니다.',
    tag:    '고가 수입 꽃가루 광역 살포 낭비',
    color:  '#EF4444',
    glow:   'rgba(239,68,68,0.12)',
  },
] as const;

const ProblemCard = memo(function ProblemCard({
  icon, title, desc, tag, color, glow,
}: typeof PROBLEMS[number]) {
  return (
    <motion.div
      whileHover={{ y: -6, boxShadow: `0 20px 48px -8px ${glow}` }}
      transition={{ duration: 0.25 }}
      className="group relative overflow-hidden rounded-2xl border p-6 transition-colors"
      style={{
        borderColor: 'rgba(255,255,255,0.07)',
        background:  'rgba(255,255,255,0.03)',
        boxShadow:   '0 1px 0 rgba(255,255,255,0.04) inset',
      }}
    >
      {/* Hover glow bg */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: `radial-gradient(ellipse 80% 60% at 20% 20%, ${glow}, transparent)` }}
      />
      <span className="relative text-3xl">{icon}</span>
      <h3 className="relative mt-4 text-base font-bold text-white">{title}</h3>
      <p className="relative mt-2 text-sm leading-relaxed text-slate-400">{desc}</p>
      <span
        className="relative mt-4 inline-block rounded-full border px-3 py-1 text-[11px] font-semibold"
        style={{ borderColor: `${color}30`, color, background: `${color}10` }}
      >
        {tag}
      </span>
    </motion.div>
  );
});

// ─── CountUp stat card ────────────────────────────────────────────────────────
function StatCard({ suffix = '', value, label, color, staticDisplay }: {
  suffix?: string; value: number; label: string; color: string; staticDisplay?: string;
}) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const count  = useCountUp(value, 1800, inView);

  return (
    <div
      ref={ref}
      className="flex flex-col items-center justify-center rounded-2xl border py-8 px-4 text-center"
      style={{ borderColor: 'rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.03)' }}
    >
      <span className="text-4xl font-black tracking-tight lg:text-5xl" style={{ color }}>
        {staticDisplay ?? `${count}${suffix}`}
      </span>
      <p className="mt-2 text-sm text-slate-400">{label}</p>
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.09 } } };
const fadeUp  = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } } };

export default function StatsSection() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-blue-400">
            Why Pollen-Drone
          </p>
          <h2 className="text-3xl font-black text-white lg:text-4xl">
            수분 위기, 드론이 해결합니다
          </h2>
          <p className="mt-3 text-slate-400">
            꿀벌 감소·고령화·비효율이 만든 구조적 문제를 AI 드론으로 돌파합니다
          </p>
        </motion.div>

        {/* Problem cards */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="mb-16 grid gap-4 md:grid-cols-3"
        >
          {PROBLEMS.map((p) => (
            <motion.div key={p.title} variants={fadeUp}>
              <ProblemCard {...p} />
            </motion.div>
          ))}
        </motion.div>

        {/* Divider */}
        <div className="mb-10 flex items-center gap-4">
          <div className="h-px flex-1 bg-white/[0.06]" />
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">성능 목표 및 평가 기준</p>
          <div className="h-px flex-1 bg-white/[0.06]" />
        </div>

        {/* Stat cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard value={90} suffix="%+"     label="YOLO AI 꽃 인식 정확도 목표 (mAP)"    color="#22C55E" />
          <StatCard value={80} suffix="%+"     label="수작업 대비 수분 작업 시간 단축 목표" color="#3B82F6" />
          <StatCard value={30} suffix="%+"     label="정밀 분사로 꽃가루 사용량 절감 목표"  color="#A78BFA" />
          <StatCard value={0}  staticDisplay="1 + 3~5대" label="대형 정찰 드론 1대 + 소형 수분 드론 3~5대 군집" color="#34D399" />
        </div>
      </div>
    </section>
  );
}
