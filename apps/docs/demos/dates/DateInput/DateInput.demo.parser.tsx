import dayjs from 'dayjs';
import { DateInput, DateInputProps } from '@react-ui/dates';
import { UIDemo } from '@react-ui/demo';

const code = `
import dayjs from 'dayjs';
import { DateInput, DateInputProps } from '@react-ui/dates';

const dateParser: DateInputProps['dateParser'] = (input) => {
  if (input === 'WW2') {
    return '1939-09-01';
  }

  return dayjs(input, 'DD/MM/YYYY').format('YYYY-MM-DD');
};

function Demo() {
  return (
    <DateInput
      dateParser={dateParser}
      valueFormat="DD/MM/YYYY"
      label="输入 WW2"
      placeholder="输入 WW2"
    />
  );
}
`;

const dateParser: DateInputProps['dateParser'] = (input) => {
  if (input === 'WW2') {
    return '1939-09-01';
  }

  return dayjs(input, 'DD/MM/YYYY').format('YYYY-MM-DD');
};

function Demo() {
  return (
    <DateInput
      dateParser={dateParser}
      valueFormat="DD/MM/YYYY"
      label="输入 WW2"
      placeholder="输入 WW2"
    />
  );
}

export const parser: UIDemo = {
  type: 'code',
  centered: true,
  maxWidth: 400,
  component: Demo,
  code,
};
