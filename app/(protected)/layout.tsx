import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { AppShell } from '@/components/layout/AppShell';

export const runtime = 'edge';

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  if (!cookieStore.has('pollen_demo_session')) {
    redirect('/auth/login');
  }
  return <AppShell>{children}</AppShell>;
}
