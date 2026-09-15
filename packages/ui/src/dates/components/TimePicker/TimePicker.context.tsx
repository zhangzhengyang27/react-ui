import { ScrollAreaProps } from '../../../components/ScrollArea/ScrollArea';
import { GetStylesApi } from '../../../core/styles-api/use-styles/use-styles';
import { createSafeContext } from '../../../core/utils/index';
import type { TimePickerFactory } from './TimePicker';

interface TimePickerContext {
  getStyles: GetStylesApi<TimePickerFactory>;
  maxDropdownContentHeight: number;
  scrollAreaProps: ScrollAreaProps | undefined;
}

export const [TimePickerProvider, useTimePickerContext] = createSafeContext<TimePickerContext>(
  'TimeInput component was not found in the component tree'
);
