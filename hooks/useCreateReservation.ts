'use client';

import { useMutation } from '@tanstack/react-query';
import { ReservationPayload } from '@/components/booking/BookingPlanner';

type CreateReservationParams = {
  orchardId: string;
  title: string;
  payload: ReservationPayload;
};

// DEMO MODE: Supabase insert 없이 mock 저장
export function useCreateReservation() {
  return useMutation({
    mutationFn: async (params: CreateReservationParams) => {
      // 실제 저장처럼 보이도록 600ms 딜레이
      await new Promise((resolve) => setTimeout(resolve, 600));
      return {
        id: `demo-${Date.now()}`,
        ...params,
        created_at: new Date().toISOString(),
      };
    },
  });
}
