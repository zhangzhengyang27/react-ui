import dayjs from 'dayjs';
import { useState } from 'react';
import { MobileMonthView } from '@react-ui/schedule';
import { MantineDemo } from '@react-ui/demo';
import { regularEvents } from './_data';

const code = `
import dayjs from 'dayjs';
import { useState } from 'react';
import { MobileMonthView } from '@react-ui/schedule';
import { events } from './data';

function Demo() {
  const [date, setDate] = useState(dayjs().format('YYYY-MM-DD'));
  const [selectedDate, setSelectedDate] = useState<string | null>(dayjs().format('YYYY-MM-DD'));

  return (
    <MobileMonthView
      date={date}
      onDateChange={setDate}
      selectedDate={selectedDate}
      onSelectedDateChange={setSelectedDate}
      events={regularEvents}
      withOutsideDays
    />
  );
}
`;

function Demo() {
  const [date, setDate] = useState(dayjs().format('YYYY-MM-DD'));
  const [selectedDate, setSelectedDate] = useState<string | null>(dayjs().format('YYYY-MM-DD'));

  return (
    <MobileMonthView
      date={date}
      onDateChange={setDate}
      selectedDate={selectedDate}
      onSelectedDateChange={setSelectedDate}
      events={regularEvents}
      withOutsideDays
    />
  );
}

export const withOutsideDays: MantineDemo = {
  defaultExpanded: false,
  type: 'code',
  component: Demo,
  code,
  centered: true,
  maxWidth: 375,
};
