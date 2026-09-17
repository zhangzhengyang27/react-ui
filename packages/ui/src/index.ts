'use client'

export { RemoveScroll } from 'react-remove-scroll'

export * from './components'
export * from './core'
export * from './dates';
export * from './schedule';
export * from './form';
export * from './emotion';
export * from './colors-generator';

// dates(components/Month)与 schedule(utils)存在同名的星导出。ESM 规范:多个
// 星导出里的歧义名字会被整体丢弃(构建产物中该导出直接消失,调用即崩)。以下
// 显式导出用于消歧,优先级高于星导出:
// - getStartOfWeek/getEndOfWeek/getMonthDays/isSameMonth 采用 schedule 版
//   (schedule 文档 demo 全部以对象参数形态调用这些名字);
// - toDateString 采用 dates 版(guides/functions-reference 文档约定的
//   `toDateString(new Date(...)) === 'YYYY-MM-DD'` 行为,schedule 版会带 00:00:00)。
export { getStartOfWeek, getEndOfWeek, getMonthDays, isSameMonth } from './schedule';
export type { DateStringValue, DateTimeStringValue, DateLabelFormat, DayOfWeek } from './dates';
export type { CSSProperties } from './core';
export { toDateString } from './dates';
