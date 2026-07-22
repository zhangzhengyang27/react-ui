import dayjs from 'dayjs';
import { useState } from 'react';
import { YearPickerInput, YearPickerInputProps } from '@xiaoye-react/dates';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import dayjs from 'dayjs';
import { useState } from 'react';
import { YearPickerInput, YearPickerInputProps } from '@xiaoye-react/dates';

const getYearControlProps: YearPickerInputProps['getYearControlProps'] = (date) => {
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

function Demo() {
  const [value, setValue] = useState<string | null>(null);
  return (
    <YearPickerInput
      label="选择年份"
      placeholder="选择年份"
      value={value}
      onChange={setValue}
      getYearControlProps={getYearControlProps}
    />
  );
}
`;

const getYearControlProps: YearPickerInputProps['getYearControlProps'] = (date) => {
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

function Demo() {
  const [value, setValue] = useState<string | null>(null);
  return (
    <YearPickerInput
      label="选择年份"
      placeholder="选择年份"
      value={value}
      onChange={setValue}
      getYearControlProps={getYearControlProps}
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
