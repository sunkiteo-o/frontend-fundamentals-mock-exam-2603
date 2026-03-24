import { css } from '@emotion/react';
import { Border, Spacing } from '_tosslib/components';

interface Props {
  children: React.ReactNode;
  hasBorder?: boolean;
}

export function Section({ children, hasBorder = true }: Props) {
  return (
    <>
      <div
        css={css`
          padding: 0 24px;
        `}
      >
        {children}
      </div>
      <Spacing size={24} />
      {hasBorder && (
        <>
          <Border size={8} />
          <Spacing size={24} />
        </>
      )}
    </>
  );
}
