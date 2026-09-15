import dayjs from 'dayjs';
import { useState } from 'react';
import { Badge } from '@xiaoye-react/ui';
import { MobileMonthView } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';
import { dataCode, regularEvents } from './_data';

const code = `
import dayjs from 'dayjs';
import { useState } from 'react';
import { Badge } from '@xiaoye-react/ui';
import { MobileMonthView } from '@xiaoye-react/ui';
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
      events={events}
      renderHeader={({ defaultHeader }) => (
        <>
          {defaultHeader}
          <Badge variant="light" size="sm">3 events today</Badge>
        </>
      )}
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
      renderHeader={({ defaultHeader }) => (
        <>
          {defaultHeader}
          <Badge variant="light" size="sm">
            3 events today
          </Badge>
        </>
      )}
    />
  );
}

export const renderHeader: UIDemo = {
  defaultExpanded: false,
  type: 'code',
  centered: true,
  maxWidth: 375,
  component: Demo,
  code: [
    { code, language: 'tsx', fileName: '演示代码.tsx' },
    { code: dataCode, language: 'tsx', fileName: 'data.ts' },
  ],
};
