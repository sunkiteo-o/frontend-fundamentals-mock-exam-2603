import { useState } from 'react';
import { css } from '@emotion/react';
import { Text } from '_tosslib/components';
import { colors } from '_tosslib/constants/colors';
import { timeToMinutes } from 'utils/date';
import { TOTAL_MINUTES } from 'constants/timeline';
import { EQUIPMENT_LABELS } from 'constants/equipment';

interface Props {
  room: { id: string; name: string };
  reservations: any[]; // 구체적인 타입 정의 권장
  isFirst?: boolean;
}

export function TimelineRow({ room, reservations, isFirst }: Props) {
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <div css={[rowStyle, isFirst ? null : marginTopStyle]}>
      {/* 회의실 이름 */}
      <div css={roomNameWrapperStyle}>
        <Text typography="t7" fontWeight="medium" color={colors.grey700} ellipsisAfterLines={1} css={roomNameTextStyle}>
          {room.name}
        </Text>
      </div>

      {/* 타임라인 바 영역 */}
      <div css={barContainerStyle}>
        {reservations.map(res => {
          const left = (timeToMinutes(res.start) / TOTAL_MINUTES) * 100;
          const width = ((timeToMinutes(res.end) - timeToMinutes(res.start)) / TOTAL_MINUTES) * 100;
          const isActive = activeId === res.id;

          return (
            <div key={res.id} css={barWrapperStyle(left, width)}>
              <div role="button" onClick={() => setActiveId(isActive ? null : res.id)} css={barStyle(isActive)} />
              {isActive && (
                <div role="tooltip" css={tooltipStyle}>
                  <div>
                    {res.start} ~ {res.end}
                  </div>
                  <div>{res.attendees}명</div>
                  {res.equipment.length > 0 && (
                    <div>{res.equipment.map((e: string) => EQUIPMENT_LABELS[e]).join(', ')}</div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// 스타일 생략 (기존 스타일 코드 이동)
const rowStyle = css`
  display: flex;
  align-items: center;
  height: 32px;
`;
const marginTopStyle = css`
  margin-top: 4px;
`;
const roomNameWrapperStyle = css`
  width: 80px;
  flex-shrink: 0;
  padding-right: 8px;
`;
const roomNameTextStyle = css`
  font-size: 12px;
`;
const barContainerStyle = css`
  flex: 1;
  height: 24px;
  background: ${colors.white};
  border-radius: 6px;
  position: relative;
`;
const barWrapperStyle = (left: number, width: number) =>
  css`
    position: absolute;
    left: ${left}%;
    width: ${width}%;
    height: 100%;
  `;
const barStyle = (isActive: boolean) =>
  css`
    width: 100%;
    height: 100%;
    background: ${colors.blue400};
    border-radius: 4px;
    opacity: ${isActive ? 1 : 0.75};
    cursor: pointer;
    transition: opacity 0.15s;
    &:hover {
      opacity: 1;
    }
  `;
const tooltipStyle = css`
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 6px;
  background: ${colors.grey900};
  color: ${colors.white};
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 12px;
  white-space: nowrap;
  z-index: 10;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
  line-height: 1.6;
`;
