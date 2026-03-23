import { css } from '@emotion/react';
import { ListRow, Button, Text } from '_tosslib/components';
import { colors } from '_tosslib/constants/colors';
import { EQUIPMENT_LABELS } from 'constants/equipment';

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
  res: Reservation;
  roomName: string;
  onCancelClick: () => void;
}

export function ReservationItem({ res, roomName, onCancelClick }: Props) {
  const equipmentText = res.equipment.map(e => EQUIPMENT_LABELS[e]).join(', ') || '장비 없음';

  return (
    <div
      css={css`
        padding: 14px 16px;
        border-radius: 14px;
        background: ${colors.grey50};
        border: 1px solid ${colors.grey200};
      `}
    >
      <ListRow
        contents={
          <ListRow.Text2Rows
            top={roomName}
            topProps={{
              typography: 't6',
              fontWeight: 'bold',
              color: colors.grey900,
            }}
            bottom={`${res.date} ${res.start}~${res.end} · ${res.attendees}명 · ${equipmentText}`}
            bottomProps={{
              typography: 't7',
              color: colors.grey600,
            }}
          />
        }
        right={
          <Button
            type="danger"
            style="weak"
            size="small"
            onClick={e => {
              e.stopPropagation();
              onCancelClick();
            }}
          >
            취소
          </Button>
        }
      />
    </div>
  );
}
