import { Suspense } from 'react';
import { AuthForm } from '@/components/auth/AuthForm';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-50 via-white to-slate-100 px-4">
      <div className="w-full max-w-md space-y-4">
        {/* useSearchParams() 사용으로 Suspense 필요 */}
        <Suspense fallback={<div className="h-96 animate-pulse rounded-3xl bg-white/60" />}>
          <AuthForm mode="login" />
        </Suspense>
        <p className="text-center text-sm text-slate-500">
          계정이 없으신가요?{' '}
          <Link href="/auth/signup" className="font-semibold text-green-700 hover:underline">
            농가 회원가입
          </Link>
        </p>
      </div>
    </main>
  );
}
