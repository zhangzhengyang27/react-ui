import dayjs from 'dayjs';
import { useState } from 'react';
import { ResourcesMonthView } from '@xiaoye-react/schedule';
import { UIDemo } from '@xiaoye-react/demo';
import { dataCode, resourceEvents, resources } from './_data';

const code = `
import dayjs from 'dayjs';
import { useState } from 'react';
import { ResourcesMonthView } from '@xiaoye-react/schedule';
import { events, resources } from './data';

function Demo() {
  const [date, setDate] = useState(dayjs('2024-01-15').format('YYYY-MM-DD'));

  return (
    <ResourcesMonthView
      date={date}
      onDateChange={setDate}
      resources={resources}
      events={events}
      radius="md"
      startScrollDate={dayjs('2024-01-15').format('YYYY-MM-DD')}
    />
  );
}
`;

function Demo() {
  const [date, setDate] = useState(dayjs('2024-01-15').format('YYYY-MM-DD'));

  return (
    <ResourcesMonthView
      date={date}
      onDateChange={setDate}
      resources={resources}
      events={resourceEvents}
      radius="md"
      startScrollDate={dayjs('2024-01-15').format('YYYY-MM-DD')}
    />
  );
}

export const radius: UIDemo = {
  defaultExpanded: false,
  type: 'code',
  component: Demo,
  code: [
    { code, language: 'tsx', fileName: '演示代码.tsx' },
    { code: dataCode, language: 'tsx', fileName: 'data.ts' },
  ],
};
