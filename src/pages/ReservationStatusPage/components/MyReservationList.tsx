import { useCancelReservation } from 'hooks/useCancelReservation';
import { useState } from 'react';
import ConfirmModal from './ConfirmModal';

import { ReservationItem } from './ReservationItem';
import { css } from '@emotion/react';

interface Reservation {
  id: string;
  roomId: string;
  date: string;
  start: string;
  end: string;
  attendees: number;
  equipment: string[];
}

interface Props {
  list: Reservation[];
  getRoomName: (roomId: string) => string;
}

export function MyReservationList({ list, getRoomName }: Props) {
  const [cancelingId, setCancelingId] = useState<string | null>(null);
  const { mutateAsync: cancel } = useCancelReservation();

  const handleConfirm = async () => {
    if (cancelingId) {
      await cancel(cancelingId);
      setCancelingId(null);
    }
  };

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        gap: 12px;
      `}
    >
      {list.map(res => (
        <ReservationItem
          key={res.id}
          res={res}
          roomName={getRoomName(res.roomId)}
          onCancelClick={() => setCancelingId(res.id)}
        />
      ))}

      {cancelingId && (
        <ConfirmModal
          title="예약을 취소할까요?"
          description="확인을 누르면 예약이 즉시 취소됩니다."
          onConfirm={handleConfirm}
          onClose={() => setCancelingId(null)}
        />
      )}
    </div>
  );
}
