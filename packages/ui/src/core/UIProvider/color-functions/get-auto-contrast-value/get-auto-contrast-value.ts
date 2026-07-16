import type { UITheme } from '../../theme.types';

export function getAutoContrastValue(autoContrast: boolean | undefined, theme: UITheme) {
  return typeof autoContrast === 'boolean' ? autoContrast : theme.autoContrast;
}
