import { itSupportsHeaderProps } from './it-support-header-props';
import { itSupportsClearableProps } from './it-supports-clearable-props';
import { itSupportsDateInputProps } from './it-supports-date-input-props';
import { itSupportsMonthProps } from './it-supports-month-props';
import { itSupportsMonthsListProps } from './it-supports-months-list-props';
import { itSupportsOnControlClick } from './it-supports-on-control-click';
import { itSupportsOnControlKeydown } from './it-supports-on-control-key-down';
import { itSupportsOnControlMouseEnter } from './it-supports-on-control-mouse-enter';
import { itSupportsOnDayClick } from './it-supports-on-day-click';
import { itSupportsOnDayKeydown } from './it-supports-on-day-keydown';
import { itSupportsWeekdaysProps } from './it-supports-weekdays-props';
export { expectWeekdaysNames } from './it-supports-weekdays-props';
import { itSupportsWithNextPrevious } from './it-supports-with-next-previous';
import { itSupportsYearsListProps } from './it-supports-years-list-props';
export { clickControl, clickInput, expectNoModal, expectNoPopover, expectOpenedModal, expectOpenedPopover, expectValue, getInputValue } from './date-input-test-helpers';

const datesTests = {
  itSupportsWeekdaysProps,
  itSupportsMonthProps,
  itSupportsHeaderProps,
  itSupportsWithNextPrevious,
  itSupportsOnDayKeydown,
  itSupportsMonthsListProps,
  itSupportsYearsListProps,
  itSupportsOnControlKeydown,
  itSupportsOnControlClick,
  itSupportsOnDayClick,
  itSupportsOnControlMouseEnter,
  itSupportsClearableProps,
  itSupportsDateInputProps
};

export { datesTests };
