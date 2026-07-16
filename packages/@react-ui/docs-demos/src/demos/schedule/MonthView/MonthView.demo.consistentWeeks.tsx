import dayjs from 'dayjs';
import { useState } from 'react';
import { MonthView } from '@react-ui/schedule';
import { UIDemo } from '@react-ui/demo';

const code = `
import dayjs from 'dayjs';
import { useState } from 'react';
import { MonthView } from '@react-ui/schedule';

function Demo() {
  const [date, setDate] = useState(dayjs('2024-01-15').format('YYYY-MM-DD'));
  return <MonthView date={date} consistentWeeks={false} onDateChange={setDate} />;
}
`;

function Demo() {
  const [date, setDate] = useState(dayjs('2024-01-15').format('YYYY-MM-DD'));
  return <MonthView date={date} consistentWeeks={false} onDateChange={setDate} />;
}

export const consistentWeeks: UIDemo = {
  defaultExpanded: false,
  type: 'code',
  component: Demo,
  code,
};
