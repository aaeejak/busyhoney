'use client';

import { motion, type Variants } from 'framer-motion';
import { memo } from 'react';

const FEATURES = [
  {
    icon:  '🎯',
    title: 'YOLO 기반 실시간 꽃 탐지',
    desc:  '대형 드론 카메라 영상에 YOLOv8 딥러닝을 적용해 개화된 꽃과 꽃 군집을 실시간으로 탐지하고 좌표 데이터로 변환합니다.',
    badge: 'AI Core',
    color: '#22C55E',
  },
  {
    icon:  '📍',
    title: 'DBSCAN 밀도 클러스터링',
    desc:  '탐지된 꽃 좌표를 DBSCAN 알고리즘으로 분석해 밀집 구역을 섬(Island) 형태로 분할하고 소형 드론 작업 구역을 자동 배정합니다.',
    badge: 'ML',
    color: '#3B82F6',
  },
  {
    icon:  '🌐',
    title: 'APF 충돌 회피 알고리즘',
    desc:  '인공 전위장(APF) 이론으로 소형 드론 3~5대가 일정 간격을 유지하며 병렬 비행합니다. 충돌 없는 자율 군집 운용을 보장합니다.',
    badge: 'Fleet',
    color: '#A78BFA',
  },
  {
    icon:  '📏',
    title: '하강풍 제어 및 고도 유지',
    desc:  'LiDAR와 초음파 센서로 드론 하강풍이 수분을 방해하지 않도록 지형 높낮이에 무관하게 꽃과의 최적 거리를 정밀 유지합니다.',
    badge: 'Control',
    color: '#F59E0B',
  },
  {
    icon:  '💧',
    title: '중첩 살포 제어',
    desc:  '분사 노즐 각도와 드론 비행 간격을 조절해 살포 구역이 일정하게 중첩되도록 설계해 사각지대를 제거하고 수분 균일도를 확보합니다.',
    badge: 'Hardware',
    color: '#34D399',
  },
  {
    icon:  '🖥️',
    title: '웹 기반 예약 및 모니터링',
    desc:  '과수원 구역을 등록·예약하고 드론의 위치·배터리·작업 진행률을 직관적인 웹 UI로 실시간 확인합니다.',
    badge: 'System',
    color: '#60A5FA',
  },
] as const;

const stagger: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.07 } },
};
const card: Variants = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
};

const FeatureCard = memo(function FeatureCard({
  icon, title, desc, badge, color,
}: typeof FEATURES[number]) {
  return (
    <motion.div
      variants={card}
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ duration: 0.22, ease: 'easeOut' }}
      className="group relative overflow-hidden rounded-2xl border p-6 backdrop-blur-sm transition-colors"
      style={{
        borderColor: 'rgba(255,255,255,0.07)',
        background:  'rgba(255,255,255,0.03)',
        boxShadow:   '0 1px 0 rgba(255,255,255,0.04) inset',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = `${color}35`;
        (e.currentTarget as HTMLElement).style.boxShadow = `0 20px 48px -12px ${color}18, 0 1px 0 rgba(255,255,255,0.06) inset`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.07)';
        (e.currentTarget as HTMLElement).style.boxShadow = '0 1px 0 rgba(255,255,255,0.04) inset';
      }}
    >
      {/* Badge */}
      <span
        className="inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider"
        style={{ background: `${color}14`, color }}
      >
        {badge}
      </span>

      {/* Icon */}
      <div className="mt-4 text-3xl">{icon}</div>

      <h3 className="mt-3 text-sm font-bold text-white">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-400">{desc}</p>

      {/* Bottom accent line */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${color}50, transparent)` }}
        initial={{ scaleX: 0, opacity: 0 }}
        whileHover={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 0.35 }}
      />
    </motion.div>
  );
});

export default function FeaturesSection() {
  return (
    <section id="section-features" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-blue-400">Features</p>
          <h2 className="text-3xl font-black text-white lg:text-4xl">
            수분 자동화를 완성하는<br className="hidden sm:block" /> 6가지 핵심 기능
          </h2>
          <p className="mt-3 text-slate-400">
            AI부터 하드웨어·웹 대시보드까지, 완전 자율 수분의 모든 것
          </p>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {FEATURES.map((f) => (
            <FeatureCard key={f.title} {...f} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
