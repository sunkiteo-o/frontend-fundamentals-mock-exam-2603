import { css, keyframes } from '@emotion/react';
import { Text, Spacing, Button } from '_tosslib/components';
import { colors } from '_tosslib/constants/colors';

interface Props {
  title: string;
  description?: string;
  onClose: () => void;
  onConfirm: () => void;
  confirmText?: string;
  cancelText?: string;
}

const ConfirmModal = ({
  title,
  description,
  onClose,
  onConfirm,
  confirmText = '취소하기',
  cancelText = '다음에 할게요',
}: Props) => {
  return (
    <div css={modalOverlayStyle} onClick={onClose}>
      <div css={modalContentStyle} onClick={e => e.stopPropagation()}>
        <div css={textSectionStyle}>
          <Text typography="t4" fontWeight="bold" color={colors.grey900}>
            {title}
          </Text>
          {description && (
            <>
              <Spacing size={8} />
              <Text typography="t6" color={colors.grey600}>
                {description}
              </Text>
            </>
          )}
        </div>

        <Spacing size={28} />

        <div css={buttonGroupStyle}>
          <Button type="danger" css={confirmButtonStyle} onClick={onConfirm}>
            {confirmText}
          </Button>
          <span css={cancelTextStyle} onClick={onClose}>
            {cancelText}
          </span>
        </div>
      </div>
    </div>
  );
};

const slideUp = keyframes`
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

const modalOverlayStyle = css`
  position: fixed;
  inset: 0; /* top, left, right, bottom: 0과 동일 */
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 24px; /* 모바일 대응 여백 */
  backdrop-filter: blur(4px);
`;

const modalContentStyle = css`
  background: ${colors.white};
  border-radius: 24px;
  padding: 32px 24px 24px;
  width: 100%;
  max-width: 320px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  animation: ${slideUp} 0.3s ease-out;
`;

const textSectionStyle = css`
  text-align: center;
`;

const buttonGroupStyle = css`
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
`;

const confirmButtonStyle = css`
  flex: 1; /* 버튼이 동일한 너비를 가지도록 설정 */
`;

const cancelTextStyle = css`
  display: flex;
  align-items: center;
  color: ${colors.grey600};
  font-size: 14px;
`;

export default ConfirmModal;
