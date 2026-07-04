'use client';

import { useEffect, useState } from 'react';

type CountUpProps = {
  end: number;
  duration?: number;
  decimals?: number;
};

export function CountUp({ end, duration = 1200, decimals = 0 }: CountUpProps) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let raf: number;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(end * eased);
      if (progress < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [end, duration]);

  const text =
    decimals > 0 ? value.toFixed(decimals) : Math.round(value).toLocaleString('ko-KR');

  return <>{text}</>;
}
