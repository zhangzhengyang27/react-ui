import { use, useCallback, useMemo } from 'react';
import { DayOfWeek } from '../../types';
import { DatesProviderContext } from './DatesProvider';

export function useDatesContext() {
  const ctx = use(DatesProviderContext);
  const getLocale = useCallback((input?: string) => input || ctx.locale, [ctx.locale]);

  const getFirstDayOfWeek = useCallback(
    (input?: DayOfWeek) => (typeof input === 'number' ? input : ctx.firstDayOfWeek),
    [ctx.firstDayOfWeek]
  );

  const getWeekendDays = useCallback(
    (input?: DayOfWeek[]) => (Array.isArray(input) ? input : ctx.weekendDays),
    [ctx.weekendDays]
  );

  const getLabelSeparator = useCallback(
    (input?: string) => (typeof input === 'string' ? input : ctx.labelSeparator),
    [ctx.labelSeparator]
  );

  // 每次调用都返回新对象会让下游把它放进依赖数组的组件反复重建监听/记忆
  return useMemo(
    () => ({
      ...ctx,
      getLocale,
      getFirstDayOfWeek,
      getWeekendDays,
      getLabelSeparator
    }),
    [ctx, getLocale, getFirstDayOfWeek, getWeekendDays, getLabelSeparator]
  );
}
