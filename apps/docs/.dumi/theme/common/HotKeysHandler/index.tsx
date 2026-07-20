import { useLocation } from 'dumi';
import { useComputedUIColorScheme, useDirection, useUIColorScheme } from '@react-ui/ui';
import { useHotkeys } from '@react-ui/hooks';

const EXCLUDE_RTL = ['/combobox'];

/**
 * 全局快捷键处理。
 * - mod+J: 切换明暗主题
 * - mod+shift+L: 切换 LTR/RTL 方向
 */
export function HotKeysHandler() {
  const { pathname } = useLocation();
  const { setColorScheme } = useUIColorScheme();
  const { toggleDirection } = useDirection();
  const computedColorScheme = useComputedUIColorScheme('light');

  useHotkeys(
    [
      ['mod + J', () => setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')],
      ['mod + shift + L', () => !EXCLUDE_RTL.includes(pathname) && toggleDirection()],
    ],
    [],
  );

  return null;
}

export default HotKeysHandler;
