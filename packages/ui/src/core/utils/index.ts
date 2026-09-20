export { closeOnEscape } from './close-on-escape/close-on-escape'
export { findClosestNumber } from './find-closest-number/find-closest-number'
export { px, rem, em } from './units-converters'
export { noop } from './noop/noop'
export { deepMerge } from './deep-merge/deep-merge'
export { keys } from './keys/keys'
export { camelToKebabCase } from './camel-to-kebab-case/camel-to-kebab-case'
export { isNumberLike } from './is-number-like/is-number-like'
export { isElement } from './is-element/is-element'
export { filterProps } from './filter-props/filter-props'
export { createSafeContext } from './create-safe-context/create-safe-context'
export { createScopedKeydownHandler } from './create-scoped-keydown-handler/create-scoped-keydown-handler'
export { findElementAncestor } from './find-element-ancestor/find-element-ancestor'
export { getSingleElementChild } from './get-single-element-child/get-single-element-child'
export {
  findElementBySelector,
  findElementsBySelector,
  getRootElement,
} from './find-element-in-shadow-dom/find-element-in-shadow-dom'
export { isPrimitive } from './primitive/primitive'

export type { Primitive } from './primitive/primitive'

export { getSize, getSpacing, getShadow, getRadius, getFontSize, getLineHeight } from './get-size/get-size'
export { getDefaultZIndex } from './get-default-z-index/get-default-z-index'
export { getSafeId } from './get-safe-id/get-safe-id'
export { getBaseValue } from './get-base-value/get-base-value'
export { getBreakpointValue } from './get-breakpoint-value/get-breakpoint-value'
export { getSortedBreakpoints } from './get-sorted-breakpoints/get-sorted-breakpoints'
export {
  BASE_SLOT,
  cascadeValueToSlots,
  getBreakpointSlots,
  hasResponsiveValue,
  keepChangedSlots,
} from './responsive-value/responsive-value'
export type { BreakpointsSource } from './get-breakpoint-value/get-breakpoint-value'
export { Activity } from './Activity/Activity'
export { createUseExternalEvents } from './create-use-external-events/create-use-external-events'
export * from './Floating'
