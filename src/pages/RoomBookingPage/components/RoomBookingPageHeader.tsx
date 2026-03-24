import { css } from '@emotion/react';
import { Top, Spacing, Text } from '_tosslib/components';
import { colors } from '_tosslib/constants/colors';

interface Props {
  errorMessage: string | null;
  onBack: () => void;
}

export function RoomBookingPageHeader({ errorMessage, onBack }: Props) {
  return (
    <div css={containerStyle}>
      <div css={backButtonWrapperStyle}>
        <button type="button" onClick={onBack} aria-label="뒤로가기" css={backButtonStyle}>
          ← 예약 현황으로
        </button>
      </div>

      <Top.Top03 css={topStyle}>예약하기</Top.Top03>

      {errorMessage && (
        <div css={errorContainerStyle}>
          <Spacing size={12} />
          <div css={errorBoxStyle}>
            <Text typography="t7" fontWeight="medium" color={colors.red500}>
              {errorMessage}
            </Text>
          </div>
        </div>
      )}
    </div>
  );
}

const containerStyle = css`
  background: ${colors.white};
`;

const backButtonWrapperStyle = css`
  padding: 12px 24px 0;
`;

const backButtonStyle = css`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  font-size: 14px;
  color: ${colors.grey600};
  transition: color 0.15s;

  &:hover {
    color: ${colors.grey900};
  }
`;

const topStyle = css`
  padding-left: 24px;
  padding-right: 24px;
`;

const errorContainerStyle = css`
  padding: 0 24px;
`;

const errorBoxStyle = css`
  padding: 10px 14px;
  border-radius: 10px;
  background: ${colors.red50};
  display: flex;
  align-items: center;
  gap: 8px;
`;

export default RoomBookingPageHeader;
