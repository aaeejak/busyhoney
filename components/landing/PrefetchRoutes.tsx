'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function PrefetchRoutes() {
  const router = useRouter();
  useEffect(() => {
    router.prefetch('/auth/login');
    router.prefetch('/auth/signup');
  }, [router]);
  return null;
}
