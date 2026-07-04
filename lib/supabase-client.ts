import { createBrowserClient } from '@supabase/ssr';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';

/** .env.local에 실제 Supabase 값이 채워졌는지 확인 */
export function isSupabaseConfigured(): boolean {
  if (!SUPABASE_URL || SUPABASE_URL.includes('your-project-id')) {
    console.error(
      '[Pollen-Drone] NEXT_PUBLIC_SUPABASE_URL이 설정되지 않았습니다.\n' +
        '.env.local 파일에 실제 Supabase 프로젝트 URL을 입력하세요.',
    );
    return false;
  }
  if (!SUPABASE_ANON_KEY || SUPABASE_ANON_KEY === 'your-anon-key-here') {
    console.error(
      '[Pollen-Drone] NEXT_PUBLIC_SUPABASE_ANON_KEY가 설정되지 않았습니다.\n' +
        '.env.local 파일에 실제 Supabase anon key를 입력하세요.',
    );
    return false;
  }
  return true;
}

export function createSupabaseBrowserClient() {
  if (!isSupabaseConfigured()) {
    throw new Error(
      'Supabase 환경 변수가 설정되지 않았습니다. .env.local을 확인하세요.',
    );
  }
  return createBrowserClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}
