'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';

type AuthFormProps = {
  mode: 'login' | 'signup';
};

export function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [farmName, setFarmName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // 데모 모드: 800ms 딜레이 후 세션 쿠키 설정
    await new Promise((resolve) => setTimeout(resolve, 800));
    document.cookie = 'pollen_demo_session=1; path=/; max-age=86400; SameSite=Strict';

    const next = searchParams.get('next') ?? '/dashboard';
    router.push(next);
    router.refresh();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 rounded-3xl border border-white/60 bg-white/80 p-8 shadow-xl backdrop-blur-md"
    >
      {/* 로고 */}
      <div className="flex flex-col items-center gap-2 pb-2">
        <Image
          src="/바쁜벌꿀.png"
          alt="바쁜벌꿀 로고"
          width={140}
          height={70}
          className="object-contain"
          priority
        />
        <div className="h-px w-full bg-gradient-to-r from-transparent via-green-200 to-transparent" />
      </div>

      <div>
        <div className="text-xs font-semibold uppercase tracking-[0.2em] text-green-700">
          Pollen-Drone
        </div>
        <h2 className="mt-1 text-2xl font-black text-slate-900">
          {mode === 'login' ? '농가 로그인' : '농가 회원가입'}
        </h2>
      </div>

      {/* 데모 배너 */}
      <div className="flex items-start gap-2 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs text-amber-800">
        <span className="mt-0.5 shrink-0 text-base">🔧</span>
        <span>
          <strong>데모 모드</strong> — 아무 값이나 입력 후 버튼을 누르면 대시보드로 이동합니다.
        </span>
      </div>

      {mode === 'signup' && (
        <>
          <input
            value={farmName}
            onChange={(e) => setFarmName(e.target.value)}
            placeholder="농가명"
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm placeholder:text-slate-400 focus:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-100"
          />
          <input
            value={ownerName}
            onChange={(e) => setOwnerName(e.target.value)}
            placeholder="대표자명"
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm placeholder:text-slate-400 focus:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-100"
          />
        </>
      )}

      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="이메일"
        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm placeholder:text-slate-400 focus:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-100"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="비밀번호"
        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm placeholder:text-slate-400 focus:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-100"
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-2xl bg-gradient-to-r from-green-600 to-green-500 px-4 py-3.5 text-sm font-semibold text-white shadow-md shadow-green-200 transition hover:from-green-700 hover:to-green-600 disabled:opacity-60"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
            처리 중...
          </span>
        ) : mode === 'login' ? (
          '로그인'
        ) : (
          '회원가입'
        )}
      </button>
    </form>
  );
}
