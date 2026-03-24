import { css } from '@emotion/react';
import { Spacing, Text, Select } from '_tosslib/components';
import { colors } from '_tosslib/constants/colors';
import { ALL_EQUIPMENT, EQUIPMENT_LABELS } from 'constants/equipment';
import { TIME_SLOTS } from 'constants/timeline';
import { formatDate } from 'utils/date';
import { Equipment } from '_tosslib/server/types';

interface Props {
  date: string;
  startTime: string;
  endTime: string;
  attendees: number;
  preferredFloor: number | null;
  equipment: Equipment[];
  floors: number[];
  validationError: string | null;
  onDateChange: (val: string) => void;
  onStartTimeChange: (val: string) => void;
  onEndTimeChange: (val: string) => void;
  onAttendeesChange: (val: number) => void;
  onFloorChange: (val: number | null) => void;
  onEquipmentToggle: (eq: Equipment) => void;
}

const BookingFilterSection = (props: Props) => {
  const {
    date,
    startTime,
    endTime,
    attendees,
    preferredFloor,
    equipment,
    floors,
    validationError,
    onDateChange,
    onStartTimeChange,
    onEndTimeChange,
    onAttendeesChange,
    onFloorChange,
    onEquipmentToggle,
  } = props;

  return (
    <div css={sectionContainerStyle}>
      <Text typography="t5" fontWeight="bold" color={colors.grey900}>
        예약 조건
      </Text>
      <Spacing size={16} />

      {/* 날짜 */}
      <div css={fieldWrapperStyle}>
        <Text as="label" css={labelStyle}>
          날짜
        </Text>
        <input
          type="date"
          value={date}
          min={formatDate(new Date())}
          onChange={e => onDateChange(e.target.value)}
          aria-label="날짜"
          css={inputStyle}
        />
      </div>

      <Spacing size={14} />

      {/* 시간 (시작/종료) */}
      <div css={rowStyle}>
        <div css={flexFieldStyle}>
          <Text as="label" css={labelStyle}>
            시작 시간
          </Text>
          <Select value={startTime} onChange={e => onStartTimeChange(e.target.value)} aria-label="시작 시간">
            <option value="">선택</option>
            {TIME_SLOTS.slice(0, -1).map(t => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </Select>
        </div>
        <div css={flexFieldStyle}>
          <Text as="label" css={labelStyle}>
            종료 시간
          </Text>
          <Select value={endTime} onChange={e => onEndTimeChange(e.target.value)} aria-label="종료 시간">
            <option value="">선택</option>
            {TIME_SLOTS.slice(1).map(t => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </Select>
        </div>
      </div>

      <Spacing size={14} />

      {/* 참석 인원 + 선호 층 */}
      <div css={rowStyle}>
        <div css={flexFieldStyle}>
          <Text as="label" css={labelStyle}>
            참석 인원
          </Text>
          <input
            type="number"
            min={1}
            value={attendees}
            onChange={e => onAttendeesChange(Math.max(1, Number(e.target.value)))}
            css={inputStyle}
          />
        </div>
        <div css={flexFieldStyle}>
          <Text as="label" css={labelStyle}>
            선호 층
          </Text>
          <Select
            value={preferredFloor ?? ''}
            onChange={e => onFloorChange(e.target.value === '' ? null : Number(e.target.value))}
          >
            <option value="">전체</option>
            {floors.map(f => (
              <option key={f} value={f}>
                {f}층
              </option>
            ))}
          </Select>
        </div>
      </div>

      <Spacing size={14} />

      {/* 장비 선택 */}
      <div css={fieldWrapperStyle}>
        <Text as="label" css={labelStyle}>
          필요 장비
        </Text>
        <Spacing size={8} />
        <div css={equipmentGridStyle}>
          {ALL_EQUIPMENT.map(eq => {
            const isSelected = equipment.includes(eq);
            return (
              <button
                key={eq}
                type="button"
                onClick={() => onEquipmentToggle(eq)}
                aria-pressed={isSelected}
                css={equipmentButtonStyle(isSelected)}
              >
                {EQUIPMENT_LABELS[eq]}
              </button>
            );
          })}
        </div>
      </div>

      {/* 에러 메시지 */}
      {validationError && (
        <div css={errorWrapperStyle}>
          <Spacing size={8} />
          <Text typography="t7" color={colors.red500} role="alert">
            {validationError}
          </Text>
        </div>
      )}
    </div>
  );
};

// --- Styles ---

const sectionContainerStyle = css`
  padding: 0 24px;
`;

const fieldWrapperStyle = css`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const rowStyle = css`
  display: flex;
  gap: 12px;
`;

const flexFieldStyle = css`
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1;
`;

const labelStyle = css`
  font-size: 13px;
  font-weight: 500;
  color: ${colors.grey600};
`;

const inputStyle = css`
  box-sizing: border-box;
  font-size: 16px;
  font-weight: 500;
  height: 48px;
  background-color: ${colors.grey50};
  border-radius: 12px;
  color: ${colors.grey800};
  width: 100%;
  border: 1px solid ${colors.grey200};
  padding: 0 16px;
  outline: none;
  transition: border-color 0.15s;
  &:focus {
    border-color: ${colors.blue500};
  }
`;

const equipmentGridStyle = css`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const equipmentButtonStyle = (isSelected: boolean) => css`
  padding: 8px 16px;
  border-radius: 20px;
  border: 1px solid ${isSelected ? colors.blue500 : colors.grey200};
  background: ${isSelected ? colors.blue50 : colors.grey50};
  color: ${isSelected ? colors.blue600 : colors.grey700};
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;
  &:hover {
    border-color: ${isSelected ? colors.blue500 : colors.grey400};
  }
`;

const errorWrapperStyle = css`
  display: flex;
  flex-direction: column;
`;

export default BookingFilterSection;
