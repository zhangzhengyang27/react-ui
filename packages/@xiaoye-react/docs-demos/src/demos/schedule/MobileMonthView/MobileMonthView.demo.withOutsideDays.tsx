import dayjs from 'dayjs';
import { useState } from 'react';
import { MobileMonthView } from '@xiaoye-react/schedule';
import { UIDemo } from '@xiaoye-react/demo';
import { regularEvents } from './_data';

const code = `
import dayjs from 'dayjs';
import { useState } from 'react';
import { MobileMonthView } from '@xiaoye-react/schedule';
import { events } from './data';

function Demo() {
  const [date, setDate] = useState(dayjs('2024-01-15').format('YYYY-MM-DD'));
  const [selectedDate, setSelectedDate] = useState<string | null>(dayjs('2024-01-15').format('YYYY-MM-DD'));

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
  const [date, setDate] = useState(dayjs('2024-01-15').format('YYYY-MM-DD'));
  const [selectedDate, setSelectedDate] = useState<string | null>(dayjs('2024-01-15').format('YYYY-MM-DD'));

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

export const withOutsideDays: UIDemo = {
  defaultExpanded: false,
  type: 'code',
  component: Demo,
  code,
  centered: true,
  maxWidth: 375,
};
