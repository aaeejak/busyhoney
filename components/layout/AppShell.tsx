'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { ReactNode } from 'react';

const navItems = [
  { href: '/dashboard', label: '실시간 관제', icon: '📡' },
  { href: '/booking',   label: '수분 예약',   icon: '📅' },
  { href: '/history',   label: '이력 분석',   icon: '📊' },
];

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router   = useRouter();

  const handleLogout = () => {
    document.cookie =
      'pollen_demo_session=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; SameSite=Strict';
    router.push('/');
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-slate-50">

      {/* ── 헤더 (Glassmorphism, min-height 72px) ──── */}
      <header
        className="sticky top-0 z-20 border-b border-slate-200/70 bg-white/80 backdrop-blur-xl"
        style={{ minHeight: 72 }}
      >
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between gap-4 px-4 py-3 lg:px-8">

          {/* 로고 + 브랜드명 */}
          <Link href="/dashboard" className="flex shrink-0 items-center gap-3 transition hover:opacity-80">
            <Image
              src="/바쁜벌꿀.png"
              alt="바쁜벌꿀 로고"
              width={100}
              height={50}
              className="object-contain"
              priority
            />
            <div className="hidden border-l border-slate-200 pl-3 md:block">
              <p className="text-[11px] font-black uppercase tracking-[0.2em] text-green-600">
                Pollen-Drone
              </p>
              <p className="text-xs font-bold text-slate-700">
                군집 드론 자율 수분 관제 시스템
              </p>
            </div>
          </Link>

          {/* 네비게이션 */}
          <nav className="flex gap-0.5 rounded-2xl bg-slate-100/90 p-1">
            {navItems.map((item) => {
              const isActive = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-sm font-bold transition-all duration-150 ${
                    isActive
                      ? 'bg-white text-green-700 shadow-sm'
                      : 'text-slate-500 hover:bg-white/60 hover:text-slate-800'
                  }`}
                >
                  <span className="text-base leading-none">{item.icon}</span>
                  <span className="hidden sm:inline">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* 우측: 데모 버튼 + 로그아웃 */}
          <div className="flex shrink-0 items-center gap-2">
            <Link
              href="/dashboard"
              className="hidden rounded-xl bg-gradient-to-r from-green-600 to-emerald-500 px-4 py-2 text-xs font-bold text-white shadow-sm shadow-green-200 transition hover:scale-[1.02] hover:shadow-md hover:shadow-green-300 sm:flex"
            >
              관제 데모 보기
            </Link>
            <button
              onClick={handleLogout}
              className="rounded-xl border-2 border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
            >
              로그아웃
            </button>
          </div>
        </div>
      </header>

      {/* ── 콘텐츠 ──────────────────────────────────── */}
      <main className="mx-auto max-w-7xl px-4 py-6 lg:px-8">{children}</main>
    </div>
  );
}
