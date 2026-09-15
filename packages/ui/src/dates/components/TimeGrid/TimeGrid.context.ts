import { GetStylesApi } from '../../../core/styles-api/use-styles/use-styles';
import { createSafeContext } from '../../../core/utils/index';
import type { TimeGridFactory } from './TimeGrid';

interface TimeGridContextValue {
  getStyles: GetStylesApi<TimeGridFactory>;
}

export const [TimeGridProvider, useTimeGridContext] = createSafeContext<TimeGridContextValue>(
  'TimeGridProvider was not found in the component tree'
);
