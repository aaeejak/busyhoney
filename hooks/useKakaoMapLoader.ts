'use client';

import { useEffect, useState } from 'react';

declare global {
  interface Window {
    kakao: any;
  }
}

const APP_KEY = process.env.NEXT_PUBLIC_KAKAO_MAP_APP_KEY;
const KAKAO_SRC = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${APP_KEY}&autoload=false&libraries=clusterer,drawing,services`;

export function useKakaoMapLoader() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!APP_KEY) {
      setError('NEXT_PUBLIC_KAKAO_MAP_APP_KEY 환경 변수가 필요합니다.');
      return;
    }

    if (typeof window === 'undefined') return;

    if (window.kakao?.maps) {
      window.kakao.maps.load(() => setIsLoaded(true));
      return;
    }

    const existing = document.querySelector('script[data-kakao-map="true"]') as HTMLScriptElement | null;

    const handleLoad = () => {
      window.kakao.maps.load(() => setIsLoaded(true));
    };

    if (existing) {
      if (window.kakao?.maps) {
        handleLoad();
      } else {
        existing.addEventListener('load', handleLoad);
        existing.addEventListener('error', () => setError('Kakao Map 스크립트 로드에 실패했습니다.'));
      }
      return;
    }

    const script = document.createElement('script');
    script.src = KAKAO_SRC;
    script.async = true;
    script.defer = true;
    script.dataset.kakaoMap = 'true';
    script.onload = handleLoad;
    script.onerror = () => setError('Kakao Map 스크립트 로드에 실패했습니다.');
    document.head.appendChild(script);

    return () => {
      script.onload = null;
      script.onerror = null;
    };
  }, []);

  return { isLoaded, error };
}
