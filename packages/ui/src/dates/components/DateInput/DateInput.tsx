import dayjs from 'dayjs';
import { useEffect, useRef, useState } from 'react';
import { __BaseInputProps, __InputStylesNames, ClearSectionMode, Input, InputVariant } from '../../../components/Input/index';
import { useInputProps } from '../../../components/Input/use-input-props';
import { Popover, PopoverProps } from '../../../components/Popover/Popover';
import { UnstyledButton } from '../../../components/UnstyledButton/UnstyledButton';
import { Box, BoxProps, ElementProps } from '../../../core/Box/Box';
import { UISize } from '../../../core/UIProvider/theme.types';
import { factory } from '../../../core/factory/factory';
import { StylesApiProps } from '../../../core/styles-api/styles-api.types';
import { useStyles } from '../../../core/styles-api/use-styles/use-styles';
import { getFontSize } from '../../../core/utils/index';
import { Factory } from '../../../schedule/components/AgendaView/AgendaView';
import { useClickOutside, useDidUpdate } from '@xiaoye-react/hooks';
import { useUncontrolledDates } from '../../hooks';
import { CalendarLevel, DateStringValue, DateValue } from '../../types';
import { Calendar, CalendarBaseProps, CalendarStylesNames, pickCalendarProps } from '../Calendar';
import { DatePickerPreset } from '../DatePicker';
import { useDatesContext } from '../DatesProvider';
import { DecadeLevelSettings } from '../DecadeLevel';
import { HiddenDatesInput } from '../HiddenDatesInput';
import { isSameMonth } from '../Month';
import { MonthLevelSettings } from '../MonthLevel';
import { YearLevelSettings } from '../YearLevel';
import customParseFormat from 'dayjs/plugin/customParseFormat.js';
import { dateStringParser } from './date-string-parser/date-string-parser';

// 无此插件时 dayjs 会忽略 format 参数（按 ISO 宽容解析），手动输入依赖格式解析的链路全部失真
dayjs.extend(customParseFormat);
import { isDateValid } from './is-date-valid/is-date-valid';
import classes from './DateInput.module.css';

export type DateInputStylesNames =
  | __InputStylesNames
  | CalendarStylesNames
  | 'presetsRoot'
  | 'presetsList'
  | 'presetButton';

export interface DateInputProps
  extends
    BoxProps,
    Omit<__BaseInputProps, 'size'>,
    CalendarBaseProps,
    DecadeLevelSettings,
    YearLevelSettings,
    MonthLevelSettings,
    StylesApiProps<DateInputFactory>,
    ElementProps<'input', 'size' | 'value' | 'defaultValue' | 'onChange'> {
  /** A function to parse user input and convert it to date string value */
  dateParser?: (value: string) => DateStringValue | Date | null;

  /** Controlled component value */
  value?: DateValue | Date;

  /** Uncontrolled component default value */
  defaultValue?: DateValue | Date;

  /** Called when value changes */
  onChange?: (value: DateStringValue | null) => void;

  /** Props passed down to the `Popover` component */
  popoverProps?: Partial<Omit<PopoverProps, 'children'>>;

  /** If set, clear button is displayed in the `rightSection` when the component has value. Ignored if `rightSection` prop is set. @default false */
  clearable?: boolean;

  /** Determines how the clear button and rightSection are rendered @default 'both' */
  clearSectionMode?: ClearSectionMode;

  /** Props passed down to the clear button */
  clearButtonProps?: React.ComponentProps<'button'>;

  /** `dayjs` format to display input value, `"MMMM D, YYYY"` by default  */
  valueFormat?: string;

  /** If set to `true`, the time part of the value is preserved. Set this to `true` when `valueFormat` includes time (e.g. `"YYYY-MM-DD HH:mm"`). @default false */
  withTime?: boolean;

  /** If set to `false`, invalid user input is preserved and is not corrected on blur */
  fixOnBlur?: boolean;

  /** If set, the value can be deselected by deleting everything from the input or by clicking the selected date in the dropdown. By default, `true` if `clearable` prop is set, `false` otherwise. */
  allowDeselect?: boolean;

  /** Max level that user can go up to @default 'decade' */
  maxLevel?: CalendarLevel;

  /** Initial displayed level (uncontrolled) */
  defaultLevel?: CalendarLevel;

  /** Current displayed level (controlled) */
  level?: CalendarLevel;

  /** Called when the level changes */
  onLevelChange?: (level: CalendarLevel) => void;

  /** Predefined values to pick from */
  presets?: DatePickerPreset<'default'>[];
}

export type DateInputFactory = Factory<{
  props: DateInputProps;
  ref: HTMLInputElement;
  stylesNames: DateInputStylesNames;
  variant: InputVariant;
}>;

const defaultProps = {
  valueFormat: 'MMMM D, YYYY',
  fixOnBlur: true,
  size: 'sm',
} satisfies Partial<DateInputProps>;

export const DateInput = factory<DateInputFactory>((_props) => {
  const props = useInputProps('DateInput', defaultProps, _props);
  const {
    inputProps,
    wrapperProps,
    value,
    defaultValue,
    onChange,
    clearable,
    clearSectionMode,
    clearButtonProps,
    popoverProps,
    getDayProps,
    locale,
    valueFormat,
    withTime,
    dateParser,
    minDate,
    maxDate,
    fixOnBlur,
    onFocus,
    onBlur,
    onClick,
    onKeyDown,
    readOnly,
    name,
    form,
    rightSection,
    unstyled,
    classNames,
    styles,
    allowDeselect,
    date,
    defaultDate,
    onDateChange,
    getMonthControlProps,
    getYearControlProps,
    disabled,
    presets,
    ...rest
  } = props;

  const getStyles = useStyles<DateInputFactory>({
    name: 'DateInput',
    classes,
    props: props as unknown as DateInputProps,
    classNames,
    styles,
    unstyled,
    attributes: wrapperProps.attributes,
  });

  const _wrapperRef = useRef<HTMLDivElement>(null);
  const _dropdownRef = useRef<HTMLDivElement>(null);
  const [dropdownOpened, setDropdownOpened] = useState(false);
  const { calendarProps, others } = pickCalendarProps(rest);
  const ctx = useDatesContext();
  const defaultDateParser = (val: string): DateStringValue | null => {
    const parsedDate = dayjs(val, valueFormat, ctx.getLocale(locale)).toDate();
    return Number.isNaN(parsedDate.getTime())
      ? dateStringParser(val)
      : dayjs(parsedDate).format(withTime ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD');
  };

  const _dateParser = dateParser || defaultDateParser;
  const _allowDeselect = allowDeselect !== undefined ? allowDeselect : clearable;

  const formatValue = (val: DateStringValue) =>
    val ? dayjs(val).locale(ctx.getLocale(locale)).format(valueFormat) : '';

  const [_value, setValue, controlled] = useUncontrolledDates({
    type: 'default',
    value,
    defaultValue,
    onChange,
    withTime,
  });

  const [_date, setDate] = useUncontrolledDates({
    type: 'default',
    value: date,
    defaultValue: defaultValue || defaultDate,
    onChange: onDateChange as any,
  });

  useEffect(() => {
    if (controlled && value !== null) {
      setDate(value);
    }
  }, [controlled, value, setDate]);

  const [inputValue, setInputValue] = useState(formatValue(_value));

  useEffect(() => {
    setInputValue(formatValue(_value));
  }, [ctx.getLocale(locale)]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = event.currentTarget.value;
    setInputValue(val);
    setDropdownOpened(true);

    // 使用归一后的 _allowDeselect（= allowDeselect ?? clearable）,与点选路径保持一致:
    // 显式 allowDeselect={false} 时删空输入框不应把值置 null
    if (val.trim() === '' && _allowDeselect) {
      setValue(null);
    } else {
      const dateValue = _dateParser(val);
      if (dateValue && isDateValid({ date: dateValue, minDate, maxDate })) {
        setValue(dateValue);
        setDate(dateValue);
      }
    }
  };

  const handleInputBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    onBlur?.(event);
    setDropdownOpened(false);
    fixOnBlur && setInputValue(formatValue(_value));
  };

  const handleInputFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    onFocus?.(event);
    setDropdownOpened(true);
  };

  const handleInputClick = (event: React.MouseEvent<HTMLInputElement>) => {
    onClick?.(event);
    setDropdownOpened(true);
  };

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setDropdownOpened(false);
    }
    onKeyDown?.(event);
  };

  const _getDayProps = (day: DateStringValue) => ({
    ...getDayProps?.(day),
    selected: dayjs(_value).isSame(day, 'day'),
    onClick: (event: any) => {
      getDayProps?.(day).onClick?.(event);

      const val = _allowDeselect ? (dayjs(_value).isSame(day, 'day') ? null : day) : day;
      setValue(val);
      !controlled && val && setInputValue(formatValue(val));
      setDropdownOpened(false);
    },
  });

  const handlePresetSelect = (val: DateStringValue | null) => {
    setValue(val);
    if (val) {
      setDate(val);
    }
    if (!controlled) {
      setInputValue(val ? formatValue(val) : '');
    }
    setDropdownOpened(false);
  };

  const presetButtons = presets?.map((preset, index) => (
    <UnstyledButton
      key={index}
      {...getStyles('presetButton')}
      onClick={() => handlePresetSelect(preset.value)}
      onMouseDown={(event) => event.preventDefault()}
    >
      {preset.label}
    </UnstyledButton>
  ));

  const clearButton = (
    <Input.ClearButton
      onClick={() => {
        setValue(null);
        !controlled && setInputValue('');
        setDropdownOpened(false);
      }}
      unstyled={unstyled}
      {...clearButtonProps}
    />
  );

  const _clearable = clearable && !!_value && !readOnly && !disabled;

  useDidUpdate(() => {
    _value !== undefined && !dropdownOpened && setInputValue(formatValue(_value));
  }, [_value]);

  useClickOutside(() => setDropdownOpened(false), undefined, [
    _wrapperRef.current,
    _dropdownRef.current,
  ]);

  const calendar = (
    <Calendar
      __staticSelector="DateInput"
      {...calendarProps}
      classNames={classNames}
      styles={styles}
      unstyled={unstyled}
      __preventFocus
      minDate={minDate}
      maxDate={maxDate}
      locale={locale}
      getDayProps={_getDayProps}
      size={inputProps.size as UISize}
      date={_date}
      onDateChange={setDate}
      getMonthControlProps={(date) => ({
        selected: typeof _value === 'string' ? isSameMonth(date, _value) : false,
        ...getMonthControlProps?.(date),
      })}
      getYearControlProps={(date) => ({
        selected: typeof _value === 'string' ? dayjs(date).isSame(_value, 'year') : false,
        ...getYearControlProps?.(date),
      })}
      attributes={wrapperProps.attributes}
    />
  );

  return (
    <>
      <Input.Wrapper {...wrapperProps} __staticSelector="DateInput" ref={_wrapperRef}>
        <Popover
          opened={dropdownOpened}
          trapFocus={false}
          position="bottom-start"
          disabled={readOnly || disabled}
          withRoles={false}
          unstyled={unstyled}
          {...popoverProps}
        >
          <Popover.Target>
            <Input
              data-dates-input
              data-read-only={readOnly || undefined}
              autoComplete="off"
              value={inputValue}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              onFocus={handleInputFocus}
              onClick={handleInputClick}
              onKeyDown={handleInputKeyDown}
              readOnly={readOnly}
              rightSection={rightSection}
              __clearSection={clearButton}
              __clearable={_clearable}
              __clearSectionMode={clearSectionMode}
              {...inputProps}
              {...others}
              disabled={disabled}
              __staticSelector="DateInput"
            />
          </Popover.Target>
          <Popover.Dropdown
            onMouseDown={(event) => event.preventDefault()}
            data-dates-dropdown
            ref={_dropdownRef}
          >
            {presets ? (
              <Box
                {...getStyles('presetsRoot', {
                  style: { '--preset-font-size': getFontSize(inputProps.size) },
                })}
              >
                <div {...getStyles('presetsList')}>{presetButtons}</div>
                {calendar}
              </Box>
            ) : (
              calendar
            )}
          </Popover.Dropdown>
        </Popover>
      </Input.Wrapper>
      <HiddenDatesInput name={name} form={form} value={_value} type="default" withTime={withTime} />
    </>
  );
});

DateInput.classes = { ...Input.classes, ...Calendar.classes, ...classes };
DateInput.displayName = '@xiaoye-react/ui/DateInput';

export namespace DateInput {
  export type Props = DateInputProps;
  export type StylesNames = DateInputStylesNames;
  export type Factory = DateInputFactory;
}
