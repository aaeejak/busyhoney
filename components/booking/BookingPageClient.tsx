'use client';

import { BookingPlanner, ReservationPayload } from '@/components/booking/BookingPlanner';
import { useCreateReservation } from '@/hooks/useCreateReservation';

const DEMO_ORCHARD_ID = '00000000-0000-0000-0000-000000000001';

export function BookingPageClient() {
  const createReservation = useCreateReservation();

  const handleSave = async (payload: ReservationPayload) => {
    await createReservation.mutateAsync({
      orchardId: DEMO_ORCHARD_ID,
      title: `수분 예약 ${new Date(payload.startAt).toLocaleDateString('ko-KR')}`,
      payload,
    });
  };

  return <BookingPlanner onSave={handleSave} />;
}
