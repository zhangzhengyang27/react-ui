import { TimePickerAmPmLabels, TimePickerFormat } from '../../TimePicker.types';
import { padTime } from '../pad-time/pad-time';

interface Time12HourFormat {
  hours: number;
  minutes: number;
  seconds: number | null;
  withSeconds: boolean;
  amPm: string;
  amPmLabels: TimePickerAmPmLabels;
}

function convertTo24HourFormat({
  hours,
  minutes,
  seconds,
  amPm,
  amPmLabels,
  withSeconds,
}: Time12HourFormat): string {
  let _hours = hours;

  if (amPm === amPmLabels.pm && hours !== 12) {
    _hours += 12;
  } else if (amPm === amPmLabels.am && hours === 12) {
    _hours = 0;
  }

  return `${padTime(_hours)}:${padTime(minutes)}${withSeconds ? `:${padTime(seconds || 0)}` : ''}`;
}

interface GetTimeStringInput {
  hours: number | null;
  minutes: number | null;
  seconds: number | null;
  format: TimePickerFormat;
  withSeconds: boolean;
  amPm: string | null;
  amPmLabels: TimePickerAmPmLabels;
}

export function getTimeString({
  hours,
  minutes,
  seconds,
  format,
  withSeconds,
  amPm,
  amPmLabels,
}: GetTimeStringInput) {
  // Number.isFinite 防御:splitTimeString 对非数字成分('ab:cd')产出 NaN,
  // NaN 不等于 null 会绕过下面的判空,一路生成 'NaN:NaN' 假合法值
  if (hours === null || minutes === null || !Number.isFinite(hours) || !Number.isFinite(minutes)) {
    return { valid: false, value: '' };
  }

  if (withSeconds && (seconds === null || !Number.isFinite(seconds))) {
    return { valid: false, value: '' };
  }

  if (format === '24h') {
    const value = `${padTime(hours)}:${padTime(minutes)}${withSeconds ? `:${padTime(seconds!)}` : ''}`;
    return { valid: true, value };
  }

  if (amPm === null) {
    return { valid: false, value: '' };
  }

  return {
    valid: true,
    value: convertTo24HourFormat({ hours, minutes, seconds, amPm, amPmLabels, withSeconds }),
  };
}
