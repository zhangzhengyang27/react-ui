import { TextAlignLeftIcon, TextAlignRightIcon } from '@phosphor-icons/react';
import { rem, useDirection } from '@xiaoye-react/ui';
import { HeaderControl } from './HeaderControl';

export function DirectionControl() {
  const { toggleDirection, dir } = useDirection();
  return (
    <HeaderControl
      onClick={() => toggleDirection()}
      tooltip={`切换为 ${dir === 'ltr' ? 'RTL' : 'LTR'} 方向`}
    >
      {dir === 'rtl' ? (
        <TextAlignLeftIcon style={{ width: rem(22), height: rem(22), pointerEvents: 'none' }} />
      ) : (
        <TextAlignRightIcon style={{ width: rem(22), height: rem(22), pointerEvents: 'none' }} />
      )}
    </HeaderControl>
  );
}
