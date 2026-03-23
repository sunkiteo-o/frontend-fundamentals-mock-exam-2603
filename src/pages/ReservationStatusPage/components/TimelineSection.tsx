import { css } from '@emotion/react';
import { Text, Spacing } from '_tosslib/components';
import { colors } from '_tosslib/constants/colors';
import { HOUR_LABELS, TOTAL_MINUTES } from 'constants/timeline';
import { timeToMinutes } from 'utils/date';
import { TimelineRow } from './TimelineRow';

interface Props {
  rooms: any[];
  reservations: any[];
}

export function TimelineSection({ rooms, reservations }: Props) {
  return (
    <div
      css={css`
        padding: 0 24px;
      `}
    >
      <Text typography="t5" fontWeight="bold" color={colors.grey900}>
        예약 현황
      </Text>
      <Spacing size={16} />

      <div css={containerStyle}>
        {/* 시간 헤더 */}
        <div css={headerStyle}>
          <div
            css={css`
              width: 80px;
              flex-shrink: 0;
            `}
          />
          <div
            css={css`
              flex: 1;
              position: relative;
              height: 18px;
            `}
          >
            {HOUR_LABELS.map(t => (
              <Text
                key={t}
                typography="t7"
                color={colors.grey400}
                css={timeLabelStyle((timeToMinutes(t) / TOTAL_MINUTES) * 100)}
              >
                {t.slice(0, 2)}
              </Text>
            ))}
          </div>
        </div>

        {/* 회의실별 타임라인 */}
        {rooms.map((room, index) => (
          <TimelineRow
            key={room.id}
            room={room}
            reservations={reservations.filter(r => r.roomId === room.id)}
            isFirst={index === 0}
          />
        ))}
      </div>
    </div>
  );
}

const containerStyle = css`
  background: ${colors.grey50};
  border-radius: 14px;
  padding: 16px;
`;
const headerStyle = css`
  display: flex;
  align-items: flex-end;
  margin-bottom: 8px;
`;
const timeLabelStyle = (left: number) =>
  css`
    position: absolute;
    left: ${left}%;
    transform: translateX(-50%);
    font-size: 10px;
    letter-spacing: -0.3px;
  `;
