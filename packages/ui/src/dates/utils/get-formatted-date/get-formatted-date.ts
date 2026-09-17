import dayjs from 'dayjs';
import { DatePickerType, DatePickerValue, DateStringValue } from '../../types';

interface DateFormatterInput {
  type: DatePickerType;
  date: DatePickerValue<DatePickerType>;
  locale: string;
  format: string;
  labelSeparator: string;
}

export type DateFormatter = (input: DateFormatterInput) => string;

export function defaultDateFormatter({
  type,
  date,
  locale,
  format,
  labelSeparator,
}: DateFormatterInput) {
  const formatDate = (value: DateStringValue | Date) => dayjs(value).locale(locale).format(format);

  if (type === 'default') {
    // 空串与 null 同视为空值:受控 value="" 直传 dayjs('') 会显示 "Invalid Date"
    return date ? formatDate(date as DateStringValue) : '';
  }

  if (type === 'multiple') {
    // 滤掉空串元素,避免 join 出 "Invalid Date"
    return (date as DateStringValue[])
      .filter((v) => v)
      .map(formatDate)
      .join(', ');
  }

  if (type === 'range' && Array.isArray(date)) {
    if (date[0] && date[1]) {
      return `${formatDate(date[0])} ${labelSeparator} ${formatDate(date[1])}`;
    }

    if (date[0]) {
      return `${formatDate(date[0])} ${labelSeparator} `;
    }

    return '';
  }

  return '';
}

interface GetFormattedDateInput extends DateFormatterInput {
  formatter?: DateFormatter;
}

export function getFormattedDate({ formatter, ...others }: GetFormattedDateInput) {
  return (formatter || defaultDateFormatter)(others);
}
