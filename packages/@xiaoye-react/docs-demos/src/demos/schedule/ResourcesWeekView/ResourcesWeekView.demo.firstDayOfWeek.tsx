import dayjs from 'dayjs';
import { useState } from 'react';
import { ResourcesWeekView } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';
import { dataCode, resourceEvents, resources } from './_data';

const code = `
import dayjs from 'dayjs';
import { useState } from 'react';
import { ResourcesWeekView } from '@xiaoye-react/ui';
import { events, resources } from './data';

function Demo() {
  const [date, setDate] = useState(dayjs('2024-01-15').format('YYYY-MM-DD'));

  return (
    <ResourcesWeekView
      date={date}
      onDateChange={setDate}
      resources={resources}
      events={events}
      startTime="08:00:00"
      endTime="18:00:00"
      firstDayOfWeek={0}
      withWeekendDays
      weekdayFormat="dddd D"
    />
  );
}
`;

function Demo() {
  const [date, setDate] = useState(dayjs('2024-01-15').format('YYYY-MM-DD'));

  return (
    <ResourcesWeekView
      date={date}
      onDateChange={setDate}
      resources={resources}
      events={resourceEvents}
      startTime="08:00:00"
      endTime="18:00:00"
      firstDayOfWeek={0}
      withWeekendDays
      weekdayFormat="dddd D"
    />
  );
}

export const firstDayOfWeek: UIDemo = {
  defaultExpanded: false,
  type: 'code',
  component: Demo,
  code: [
    { code, language: 'tsx', fileName: '演示代码.tsx' },
    { code: dataCode, language: 'tsx', fileName: 'data.ts' },
  ],
};
