import { css } from '@emotion/react';
import { Text, Spacing } from '_tosslib/components';
import { colors } from '_tosslib/constants/colors';
import { MyReservationList } from './MyReservationList';

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

export function MyReservationSection({ list, getRoomName }: Props) {
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
        {list.length > 0 && (
          <Text typography="t7" fontWeight="medium" color={colors.grey500}>
            {list.length}건
          </Text>
        )}
      </div>
      <Spacing size={16} />

      <MyReservationList list={list} getRoomName={getRoomName} />
    </div>
  );
}
