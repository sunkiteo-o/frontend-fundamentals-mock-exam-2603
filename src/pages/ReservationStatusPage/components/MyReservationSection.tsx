import { css } from '@emotion/react';
import { Text, Spacing } from '_tosslib/components';
import { colors } from '_tosslib/constants/colors';
import { MyReservationList } from './MyReservationList';
import { useGetMyReservations } from 'hooks/useReservationQueries';
import { rooms } from '_tosslib/server/data/rooms';

interface Reservation {
  id: string;
  roomId: string;
  date: string;
  start: string;
  end: string;
  attendees: number;
  equipment: string[];
}

export function MyReservationSection() {
  const { data: myReservations, isLoading: myReservationsLoading } = useGetMyReservations();

  const getRoomName = (roomId: string) => {
    return rooms.find((r: any) => r.id === roomId)?.name ?? roomId;
  };

  if (myReservationsLoading || !myReservations) {
    return (
      <div css={containerStyle}>
        <Text color={colors.grey400}>데이터를 불러오는 중입니다...</Text>
      </div>
    );
  }

  return (
    <div
      css={css`
        padding: 0 24px;
      `}
    >
      <div
        css={css`
          display: flex;
          align-items: baseline;
          gap: 6px;
        `}
      >
        <Text typography="t5" fontWeight="bold" color={colors.grey900}>
          내 예약
        </Text>
        {myReservations?.length > 0 && (
          <Text typography="t7" fontWeight="medium" color={colors.grey500}>
            {myReservations.length}건
          </Text>
        )}
      </div>
      <Spacing size={16} />

      <MyReservationList list={myReservations} getRoomName={getRoomName} />
    </div>
  );
}

const containerStyle = css`
  background: ${colors.grey50};
  border-radius: 14px;
  padding: 16px;
`;
