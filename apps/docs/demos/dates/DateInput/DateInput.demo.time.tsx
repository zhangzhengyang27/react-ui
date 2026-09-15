import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { useState } from 'react';
import { DateInput, DateInputProps, DateStringValue } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

dayjs.extend(customParseFormat);

const code = `
import { useState } from 'react';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { DateInput, DateInputProps, DateStringValue } from '@xiaoye-react/ui';

// It is required to extend dayjs with customParseFormat plugin
// in order to parse dates with custom format
dayjs.extend(customParseFormat);

const dateParser: DateInputProps['dateParser'] = (input) => {
  if (!input) {
    return null;
  }
  const parsed = dayjs(input, 'YYYY-MM-DD HH:mm', true);
  return parsed.isValid() ? parsed.format('YYYY-MM-DD HH:mm:ss') : null;
};

function Demo() {
  const [value, setValue] = useState<DateStringValue | null>(null);
  return (
    <DateInput
      withTime
      valueFormat="YYYY-MM-DD HH:mm"
      dateParser={dateParser}
      value={value}
      onChange={setValue}
      label="日期和时间输入"
      placeholder="日期和时间输入"
    />
  );
}
`;

const dateParser: DateInputProps['dateParser'] = (input) => {
  if (!input) {
    return null;
  }
  const parsed = dayjs(input, 'YYYY-MM-DD HH:mm', true);
  return parsed.isValid() ? parsed.format('YYYY-MM-DD HH:mm:ss') : null;
};

function Demo() {
  const [value, setValue] = useState<DateStringValue | null>(null);
  return (
    <DateInput
      withTime
      valueFormat="YYYY-MM-DD HH:mm"
      dateParser={dateParser}
      value={value}
      onChange={setValue}
      label="日期和时间输入"
      placeholder="日期和时间输入"
    />
  );
}

export const time: UIDemo = {
  type: 'code',
  centered: true,
  maxWidth: 400,
  component: Demo,
  code,
};
