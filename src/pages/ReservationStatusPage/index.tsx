import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';
import { Top, Spacing, Border, Button, Text } from '_tosslib/components';
import { colors } from '_tosslib/constants/colors';
import { DatePicker } from 'components/DatePicker';
import { TimelineSection } from './components/TimelineSection';
import { MyReservationSection } from './components/MyReservationSection';
import { formatDate } from 'utils/date';
import { useState } from 'react';

export function ReservationStatusPage() {
  const navigate = useNavigate();

  const [date, setDate] = useState(() => {
    const today = new Date();
    return formatDate(today);
  });

  return (
    <div
      css={css`
        background: ${colors.white};
        padding-bottom: 40px;
      `}
    >
      <Top.Top03
        css={css`
          padding-left: 24px;
          padding-right: 24px;
        `}
      >
        회의실 예약
      </Top.Top03>

      <Spacing size={24} />

      {/* 날짜 선택 */}
      <DatePicker value={date} onChange={setDate} />

      <Spacing size={24} />
      <Border size={8} />
      <Spacing size={24} />

      {/* 예약 현황 타임라인 */}
      <TimelineSection date={date} />

      <Spacing size={24} />
      <Border size={8} />
      <Spacing size={24} />

      {/* 내 예약 목록 */}
      <MyReservationSection />

      <Spacing size={24} />
      <Border size={8} />
      <Spacing size={24} />

      {/* 예약하기 버튼 */}
      <div
        css={css`
          padding: 0 24px;
        `}
      >
        <Button display="full" onClick={() => navigate(`/booking/${date}`)}>
          예약하기
        </Button>
      </div>
      <Spacing size={24} />
    </div>
  );
}
