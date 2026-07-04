import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';

function assertEnvVars() {
  if (!SUPABASE_URL || SUPABASE_URL.includes('your-project-id')) {
    throw new Error(
      '[Pollen-Drone] NEXT_PUBLIC_SUPABASE_URL이 설정되지 않았습니다. .env.local을 확인하세요.',
    );
  }
  if (!SUPABASE_ANON_KEY || SUPABASE_ANON_KEY === 'your-anon-key-here') {
    throw new Error(
      '[Pollen-Drone] NEXT_PUBLIC_SUPABASE_ANON_KEY가 설정되지 않았습니다. .env.local을 확인하세요.',
    );
  }
}

export async function createSupabaseServerClient() {
  assertEnvVars();
  const cookieStore = await cookies();
  return createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options),
          );
        } catch {
          // Server Component 컨텍스트에서 호출 시 무시
        }
      },
    },
  });
}
