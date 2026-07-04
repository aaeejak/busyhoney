'use client';

import { motion, type Variants } from 'framer-motion';
import { memo } from 'react';

const BENEFITS = [
  {
    num:   '01',
    icon:  '👨‍🌾',
    title: '노동력 의존도 감소',
    desc:  '적은 인원으로 넓은 면적을 관리할 수 있어 농촌 고령화로 인한 인력 부족 문제를 실질적으로 완화합니다.',
    color: '#22C55E',
  },
  {
    num:   '02',
    icon:  '⏱️',
    title: '작업 시간 80%+ 단축',
    desc:  '군집 드론 병렬 운용으로 짧은 개화기(7~10일) 내에 대면적 수분 작업을 완료할 수 있습니다.',
    color: '#3B82F6',
  },
  {
    num:   '03',
    icon:  '💰',
    title: '꽃가루 비용 30%+ 절감',
    desc:  'AI 기반 정밀 분사로 고가 수입 꽃가루 낭비를 방지합니다. 기존 광역 살포 대비 30% 이상 절감을 목표로 합니다.',
    color: '#A78BFA',
  },
  {
    num:   '04',
    icon:  '🌸',
    title: '수분 품질 균일성',
    desc:  'RTK-GPS ±1cm 정밀 제어로 동일 조건·고도를 반복 유지해 균일한 수분 품질을 보장합니다.',
    color: '#34D399',
  },
  {
    num:   '05',
    icon:  '🌱',
    title: '스마트 농업 플랫폼 확장',
    desc:  '수분 자동화를 넘어 생육 모니터링·수확량 예측·병충해 탐지 등 종합 스마트 농업 플랫폼으로 연계를 목표합니다.',
    color: '#60A5FA',
  },
] as const;

const stagger: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.08 } },
};
const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
};

const BenefitCard = memo(function BenefitCard({ item }: { item: typeof BENEFITS[number] }) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -5, scale: 1.015 }}
      transition={{ duration: 0.22 }}
      className="flex gap-4 rounded-2xl border p-5 transition-all"
      style={{
        borderColor: 'rgba(255,255,255,0.07)',
        background:  'rgba(255,255,255,0.03)',
        boxShadow:   '0 1px 0 rgba(255,255,255,0.04) inset',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = `${item.color}25`;
        (e.currentTarget as HTMLElement).style.boxShadow = `0 16px 40px -8px ${item.color}12, 0 1px 0 rgba(255,255,255,0.06) inset`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.07)';
        (e.currentTarget as HTMLElement).style.boxShadow = '0 1px 0 rgba(255,255,255,0.04) inset';
      }}
    >
      {/* Number badge */}
      <div
        className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl text-xs font-black"
        style={{ background: `${item.color}14`, color: item.color, border: `1px solid ${item.color}25` }}
      >
        {item.num}
      </div>
      <div>
        <div className="flex items-center gap-2">
          <span className="text-lg">{item.icon}</span>
          <p className="text-sm font-bold text-white">{item.title}</p>
        </div>
        <p className="mt-1.5 text-xs leading-relaxed text-slate-400">{item.desc}</p>
      </div>
    </motion.div>
  );
});

export default function BenefitsSection() {
  return (
    <section id="section-benefits" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-blue-400">Expected Benefits</p>
          <h2 className="text-3xl font-black text-white lg:text-4xl">기대 효과</h2>
          <p className="mt-3 text-slate-400">
            Pollen-Drone이 과수 농가와 농업 생태계에 가져올 5가지 핵심 가치
          </p>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
        >
          {BENEFITS.map((item) => (
            <motion.div
              key={item.num}
              variants={fadeUp}
              className={item.num === '05' ? 'sm:col-span-2 lg:col-span-1' : ''}
            >
              <BenefitCard item={item} />
            </motion.div>
          ))}
        </motion.div>

        {/* RaaS note */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 rounded-2xl border p-6 md:p-8"
          style={{ borderColor: 'rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.02)' }}
        >
          <div className="flex flex-col gap-6 md:flex-row md:items-center">
            <div className="flex-1">
              <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-blue-400">향후 비즈니스 모델</p>
              <h3 className="text-lg font-black text-white">RaaS — Robotics as a Service</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">
                드론을 직접 구매하지 않고 수분 작업을 구독형으로 이용하는 RaaS 모델을 목표로 합니다.
                면적·횟수 기반 과금으로 초기 투자 없이 농가가 서비스를 이용할 수 있도록 설계합니다.
              </p>
            </div>
            <ul className="flex-shrink-0 space-y-2">
              {['면적·횟수 기반 과금 구조', '드론 소유·유지보수 불필요', '수분 성과 기반 SLA 체결', '구독형 소프트웨어 통합 제공'].map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-sm text-slate-300">
                  <span className="flex-shrink-0 text-green-400">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
