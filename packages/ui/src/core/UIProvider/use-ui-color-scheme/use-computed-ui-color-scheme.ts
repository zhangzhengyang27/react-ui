import { useColorScheme, UseMediaQueryOptions } from '@xiaoye-react/hooks';
import { useUIColorScheme } from './use-ui-color-scheme';

export function useComputedUIColorScheme(
  defaultValue?: 'light' | 'dark',
  options: UseMediaQueryOptions = { getInitialValueInEffect: true }
) {
  const osColorScheme = useColorScheme(defaultValue, options);
  const { colorScheme } = useUIColorScheme();
  return colorScheme === 'auto' ? osColorScheme : colorScheme;
}
