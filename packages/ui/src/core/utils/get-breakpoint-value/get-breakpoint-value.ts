import type { UIBreakpoint } from '../../UIProvider';
import { px } from '../units-converters';

export type BreakpointsSource = Record<UIBreakpoint, number | string>;

export function getBreakpointValue(breakpoint: number | string, breakpoints: BreakpointsSource) {
  if (Object.hasOwn(breakpoints, breakpoint)) {
    return px(breakpoints[breakpoint as UIBreakpoint]) as number;
  }

  return px(breakpoint) as number;
}
