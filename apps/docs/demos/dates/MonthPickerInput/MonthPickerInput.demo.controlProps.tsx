import dayjs from 'dayjs';
import { useState } from 'react';
import { MonthPickerInput, MonthPickerInputProps } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import dayjs from 'dayjs';
import { useState } from 'react';
import { MonthPickerInput, MonthPickerInputProps } from '@xiaoye-react/ui';

const getYearControlProps: MonthPickerInputProps['getYearControlProps'] = (date) => {
  if (dayjs(date).year() === 2024) {
    return {
      style: {
        color: 'var(--ui-color-blue-filled)',
        fontWeight: 700,
      },
    };
  }

  if (dayjs(date).year() === 2024 + 1) {
    return { disabled: true };
  }

  return {};
};

const getMonthControlProps: MonthPickerInputProps['getMonthControlProps'] = (date) => {
  if (dayjs(date).month() === 1) {
    return {
      style: {
        color: 'var(--ui-color-blue-filled)',
        fontWeight: 700,
      },
    };
  }

  if (dayjs(date).month() === 5) {
    return { disabled: true };
  }

  return {};
};

function Demo() {
  const [value, setValue] = useState<string | null>(null);
  return (
    <MonthPickerInput
      label="选择月份"
      placeholder="选择月份"
      value={value}
      onChange={setValue}
      getYearControlProps={getYearControlProps}
      getMonthControlProps={getMonthControlProps}
    />
  );
}
`;

const getYearControlProps: MonthPickerInputProps['getYearControlProps'] = (date) => {
  if (dayjs(date).year() === 2024) {
    return {
      style: {
        color: 'var(--ui-color-blue-filled)',
        fontWeight: 700,
      },
    };
  }

  if (dayjs(date).year() === 2024 + 1) {
    return { disabled: true };
  }

  return {};
};

const getMonthControlProps: MonthPickerInputProps['getMonthControlProps'] = (date) => {
  if (dayjs(date).month() === 1) {
    return {
      style: {
        color: 'var(--ui-color-blue-filled)',
        fontWeight: 700,
      },
    };
  }

  if (dayjs(date).month() === 5) {
    return { disabled: true };
  }

  return {};
};

function Demo() {
  const [value, setValue] = useState<string | null>(null);
  return (
    <MonthPickerInput
      label="选择月份"
      placeholder="选择月份"
      value={value}
      onChange={setValue}
      getYearControlProps={getYearControlProps}
      getMonthControlProps={getMonthControlProps}
    />
  );
}

export const controlProps: UIDemo = {
  type: 'code',
  centered: true,
  maxWidth: 400,
  component: Demo,
  code,
};
