import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { css } from '@emotion/react';
import { Text, Spacing } from '_tosslib/components';
import { colors } from '_tosslib/constants/colors';
import { useCancelReservation } from 'hooks/useCancelReservation';
import { ReservationItem } from './ReservationItem';
import ConfirmModal from './ConfirmModal';

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
  const location = useLocation();
  const [cancelingId, setCancelingId] = useState<string | null>(null);
  const { mutateAsync: cancel } = useCancelReservation();

  const locationState = location.state as { message?: string } | null;
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(
    locationState?.message ? { type: 'success', text: locationState.message } : null
  );

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  useEffect(() => {
    if (locationState?.message) {
      window.history.replaceState({}, '');
    }
  }, [locationState]);

  const handleConfirm = async () => {
    if (cancelingId) {
      try {
        await cancel(cancelingId);
        setMessage({ type: 'success', text: '예약이 취소되었습니다.' });
      } catch (e) {
        setMessage({ type: 'error', text: '취소 중 오류가 발생했습니다.' });
      } finally {
        setCancelingId(null);
      }
    }
  };

  return (
    <div css={listContainerStyle}>
      {message && (
        <div>
          <div css={messageBannerStyle(message.type)}>
            <Text
              typography="t7"
              fontWeight="medium"
              color={message.type === 'success' ? colors.blue600 : colors.red500}
            >
              {message.text}
            </Text>
          </div>
          <Spacing size={12} />
        </div>
      )}

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

const listContainerStyle = css`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const messageBannerStyle = (type: 'success' | 'error') => css`
  padding: 10px 14px;
  border-radius: 10px;
  background: ${type === 'success' ? colors.blue50 : colors.red50};
`;
