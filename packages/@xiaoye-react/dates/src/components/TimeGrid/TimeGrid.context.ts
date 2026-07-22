import { createSafeContext, GetStylesApi } from '@xiaoye-react/ui';
import type { TimeGridFactory } from './TimeGrid';

interface TimeGridContextValue {
  getStyles: GetStylesApi<TimeGridFactory>;
}

export const [TimeGridProvider, useTimeGridContext] = createSafeContext<TimeGridContextValue>(
  'TimeGridProvider was not found in the component tree'
);
