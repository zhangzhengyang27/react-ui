import dayjs from 'dayjs';
import { BoxProps, ElementProps } from '../../../core/Box/Box';
import { useProps } from '../../../core/UIProvider/index';
import { factory } from '../../../core/factory/factory';
import { StylesApiProps } from '../../../core/styles-api/styles-api.types';
import { Factory } from '../../../schedule/components/AgendaView/AgendaView';
import { DateStringValue } from '../../types';
import { LevelsGroup, LevelsGroupStylesNames } from '../LevelsGroup';
import { YearLevel, YearLevelSettings, YearLevelStylesNames } from '../YearLevel';

export type YearLevelGroupStylesNames = YearLevelStylesNames | LevelsGroupStylesNames;

export interface YearLevelGroupProps
  extends
    BoxProps,
    Omit<YearLevelSettings, 'withPrevious' | 'withNext' | '__onControlKeyDown' | '__getControlRef'>,
    Omit<StylesApiProps<YearLevelGroupFactory>, 'classNames' | 'styles'>,
    ElementProps<'div'> {
  classNames?: Partial<Record<string, string>>;
  styles?: Partial<Record<string, React.CSSProperties>>;
  __staticSelector?: string;

  /** Number of columns displayed next to each other */
  numberOfColumns?: number;

  /** Displayed year */
  year: DateStringValue;

  /** Function that returns level control `aria-label` */
  levelControlAriaLabel?: ((year: DateStringValue) => string) | string;

  /** Determines whether the calendar should take the full width of its container @default false */
  fullWidth?: boolean;
}

export type YearLevelGroupFactory = Factory<{
  props: YearLevelGroupProps;
  ref: HTMLDivElement;
  stylesNames: YearLevelGroupStylesNames;
}>;

const defaultProps = {
  numberOfColumns: 1,
} satisfies Partial<YearLevelGroupProps>;

export const YearLevelGroup = factory<YearLevelGroupFactory>((_props) => {
  const props = useProps('YearLevelGroup', defaultProps, _props);
  const {
    // YearLevel settings
    year,
    locale,
    minDate,
    maxDate,
    monthsListFormat,
    getMonthControlProps,
    __onControlClick,
    __onControlMouseEnter,
    withCellSpacing,

    // CalendarHeader settings
    __preventFocus,
    nextIcon,
    previousIcon,
    nextLabel,
    previousLabel,
    onNext,
    onPrevious,
    onLevelClick,
    nextDisabled,
    previousDisabled,
    hasNextLevel,
    headerControlsOrder,

    // Other settings
    classNames,
    styles,
    unstyled,
    __staticSelector,
    __stopPropagation,
    numberOfColumns,
    levelControlAriaLabel,
    yearLabelFormat,
    size,
    fullWidth,
    vars,
    attributes,
    ...others
  } = props;

  const years = Array(numberOfColumns)
    .fill(0)
    .map((_, yearIndex) => {
      const currentYear = dayjs(year).add(yearIndex, 'years').format('YYYY-MM-DD');

      return (
        <YearLevel
          key={yearIndex}
          size={size}
          monthsListFormat={monthsListFormat}
          year={currentYear}
          withNext={yearIndex === numberOfColumns - 1}
          withPrevious={yearIndex === 0}
          yearLabelFormat={yearLabelFormat}
          __stopPropagation={__stopPropagation}
          __onControlClick={__onControlClick}
          __onControlMouseEnter={__onControlMouseEnter}
          levelControlAriaLabel={
            typeof levelControlAriaLabel === 'function'
              ? levelControlAriaLabel(currentYear)
              : levelControlAriaLabel
          }
          locale={locale}
          minDate={minDate}
          maxDate={maxDate}
          __preventFocus={__preventFocus}
          nextIcon={nextIcon}
          previousIcon={previousIcon}
          nextLabel={nextLabel}
          previousLabel={previousLabel}
          onNext={onNext}
          onPrevious={onPrevious}
          onLevelClick={onLevelClick}
          nextDisabled={nextDisabled}
          previousDisabled={previousDisabled}
          hasNextLevel={hasNextLevel}
          getMonthControlProps={getMonthControlProps}
          classNames={classNames}
          styles={styles}
          unstyled={unstyled}
          __staticSelector={__staticSelector || 'YearLevelGroup'}
          withCellSpacing={withCellSpacing}
          headerControlsOrder={headerControlsOrder}
          fullWidth={fullWidth}
          attributes={attributes}
        />
      );
    });

  return (
    <LevelsGroup
      classNames={classNames}
      styles={styles}
      __staticSelector={__staticSelector || 'YearLevelGroup'}
      size={size}
      unstyled={unstyled}
      fullWidth={fullWidth}
      attributes={attributes}
      {...others}
    >
      {years}
    </LevelsGroup>
  );
});

YearLevelGroup.classes = { ...YearLevel.classes, ...LevelsGroup.classes };
YearLevelGroup.displayName = '@xiaoye-react/ui/YearLevelGroup';
