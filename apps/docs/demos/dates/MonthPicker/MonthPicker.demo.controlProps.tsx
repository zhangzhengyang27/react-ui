import dayjs from 'dayjs';
import { useState } from 'react';
import { MonthPicker, MonthPickerProps } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import dayjs from 'dayjs';
import { useState } from 'react';
import { MonthPicker, MonthPickerProps } from '@xiaoye-react/ui';

const getYearControlProps: MonthPickerProps['getYearControlProps'] = (date) => {
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

const getMonthControlProps: MonthPickerProps['getMonthControlProps'] = (date) => {
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
    <MonthPicker
      value={value}
      onChange={setValue}
      getYearControlProps={getYearControlProps}
      getMonthControlProps={getMonthControlProps}
    />
  );
}
`;

const getYearControlProps: MonthPickerProps['getYearControlProps'] = (date) => {
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

const getMonthControlProps: MonthPickerProps['getMonthControlProps'] = (date) => {
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
    <MonthPicker
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
  component: Demo,
  code,
};
