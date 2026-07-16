import { css, Global as EmotionGlobal } from '@emotion/react';
import { UITheme, useUITheme } from '@react-ui/ui';
import type { CSSObject } from './types';

type EmotionStyles = CSSObject | CSSObject[];

interface GlobalStylesProps {
  styles: EmotionStyles | ((theme: UITheme) => EmotionStyles);
}

export function Global({ styles }: GlobalStylesProps) {
  const theme = useUITheme();
  return (
    <EmotionGlobal styles={css((typeof styles === 'function' ? styles(theme) : styles) as any)} />
  );
}
