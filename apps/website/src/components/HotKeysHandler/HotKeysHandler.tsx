import { useRouter } from 'next/router';
import { useComputedUIColorScheme, useDirection, useUIColorScheme } from '@react-ui/ui';
import { useHotkeys } from '@react-ui/hooks';

const EXCLUDE_RTL = ['/combobox'];

export function HotKeysHandler() {
  const router = useRouter();
  const { setColorScheme } = useUIColorScheme();
  const { toggleDirection } = useDirection();
  const computedColorScheme = useComputedUIColorScheme('light');
  useHotkeys(
    [
      ['mod + J', () => setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')],
      ['mod + shift + L', () => !EXCLUDE_RTL.includes(router.pathname) && toggleDirection()],
    ],
    []
  );
  return <>{null}</>;
}
