import dayjs from 'dayjs';
import { useState } from 'react';
import { YearPicker, YearPickerProps } from '@xiaoye-react/dates';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import dayjs from 'dayjs';
import { useState } from 'react';
import { YearPicker, YearPickerProps } from '@xiaoye-react/dates';

const getYearControlProps: YearPickerProps['getYearControlProps'] = (date) => {
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
  return <YearPicker value={value} onChange={setValue} getYearControlProps={getYearControlProps} />;
}
`;

const getYearControlProps: YearPickerProps['getYearControlProps'] = (date) => {
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
  return <YearPicker value={value} onChange={setValue} getYearControlProps={getYearControlProps} />;
}

export const controlProps: UIDemo = {
  type: 'code',
  centered: true,
  component: Demo,
  code,
};
