import { Suspense } from 'react';
import { AuthForm } from '@/components/auth/AuthForm';
import Link from 'next/link';

export default function SignupPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-50 via-white to-slate-100 px-4">
      <div className="w-full max-w-md space-y-4">
        <Suspense fallback={<div className="h-96 animate-pulse rounded-3xl bg-white/60" />}>
          <AuthForm mode="signup" />
        </Suspense>
        <p className="text-center text-sm text-slate-500">
          이미 계정이 있으신가요?{' '}
          <Link href="/auth/login" className="font-semibold text-green-700 hover:underline">
            로그인
          </Link>
        </p>
      </div>
    </main>
  );
}
