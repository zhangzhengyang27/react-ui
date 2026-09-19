import { createContext, useMemo } from 'react';
import { DayOfWeek } from '../../types';

export interface DatesProviderValue {
  locale: string;
  firstDayOfWeek: DayOfWeek;
  weekendDays: DayOfWeek[];
  labelSeparator: string;
  consistentWeeks: boolean;
}

export type DatesProviderSettings = Partial<DatesProviderValue>;

export const DATES_PROVIDER_DEFAULT_SETTINGS: DatesProviderValue = {
  locale: 'en',
  firstDayOfWeek: 1,
  weekendDays: [0, 6],
  labelSeparator: '–',
  consistentWeeks: false,
};

export const DatesProviderContext = createContext(DATES_PROVIDER_DEFAULT_SETTINGS);

export interface DatesProviderProps {
  settings: DatesProviderSettings;
  children?: React.ReactNode;
}

export function DatesProvider({ settings, children }: DatesProviderProps) {
  // 内联对象会让每次 Provider 渲染都换掉 context value，日期/日程子树整体跟着重渲染
  const value = useMemo(
    () => ({ ...DATES_PROVIDER_DEFAULT_SETTINGS, ...settings }),
    [settings]
  );

  return <DatesProviderContext value={value}>{children}</DatesProviderContext>;
}

export namespace DatesProvider {
  export type Props = DatesProviderProps;
  export type Settings = DatesProviderSettings;
}
