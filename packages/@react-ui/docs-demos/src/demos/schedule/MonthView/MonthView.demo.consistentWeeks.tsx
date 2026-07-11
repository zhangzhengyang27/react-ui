import dayjs from 'dayjs';
import { useState } from 'react';
import { MonthView } from '@react-ui/schedule';
import { MantineDemo } from '@react-ui/demo';

const code = `
import dayjs from 'dayjs';
import { useState } from 'react';
import { MonthView } from '@react-ui/schedule';

function Demo() {
  const [date, setDate] = useState(dayjs().format('YYYY-MM-DD'));
  return <MonthView date={date} consistentWeeks={false} onDateChange={setDate} />;
}
`;

function Demo() {
  const [date, setDate] = useState(dayjs().format('YYYY-MM-DD'));
  return <MonthView date={date} consistentWeeks={false} onDateChange={setDate} />;
}

export const consistentWeeks: MantineDemo = {
  defaultExpanded: false,
  type: 'code',
  component: Demo,
  code,
};
