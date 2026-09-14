import { GetStylesApi } from '../../core/styles-api/use-styles/use-styles';
import { createSafeContext } from '../../core/utils/index';
import { SpotlightStore } from './spotlight.store';
import type { SpotlightRootFactory } from './SpotlightRoot';

interface SpotlightContextValue {
  query: string;
  setQuery: (query: string) => void;
  getStyles: GetStylesApi<SpotlightRootFactory>;
  store: SpotlightStore;
  closeOnActionTrigger: boolean | undefined;
}

export const [SpotlightProvider, useSpotlightContext] = createSafeContext<SpotlightContextValue>(
  'Spotlight component was not found in tree'
);
