import type { Metadata } from 'next';
import PrefetchRoutes    from '@/components/landing/PrefetchRoutes';
import NavBar            from '@/components/landing/NavBar';
import HeroSection       from '@/components/landing/HeroSection';
import StatsSection      from '@/components/landing/StatsSection';
import FeaturesSection   from '@/components/landing/FeaturesSection';
import HowItWorks        from '@/components/landing/HowItWorks';
import FlowerDetection   from '@/components/landing/FlowerDetection';
import HardwareSpecs     from '@/components/landing/HardwareSpecs';
import DashboardPreview  from '@/components/landing/DashboardPreview';
import BenefitsSection   from '@/components/landing/BenefitsSection';
import ReservationDemo   from '@/components/landing/ReservationDemo';
import FooterSection     from '@/components/landing/FooterSection';

export const metadata: Metadata = {
  title: 'Pollen-Drone — 군집 드론 수분 자동화 플랫폼',
  description: 'AI 꽃 인식, 군집 드론 제어, 실시간 모니터링을 하나의 플랫폼으로. 과수원 수분 자동화의 새로운 기준.',
};

export default function Page() {
  return (
    <div className="bg-[#0B0F14] text-white antialiased overflow-x-hidden selection:bg-blue-500/30 selection:text-white">
      <PrefetchRoutes />
      <NavBar />
      <main>
        <HeroSection />
        <StatsSection />
        <FeaturesSection />
        <HowItWorks />
        <FlowerDetection />
        <HardwareSpecs />
        <DashboardPreview />
        <BenefitsSection />
        <ReservationDemo />
      </main>
      <FooterSection />
    </div>
  );
}
