import dayjs from 'dayjs';
import { useState } from 'react';
import { ResourcesSchedule } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';
import { dataCode, resourceEvents, resources } from './_data';

const code = `
import dayjs from 'dayjs';
import { useState } from 'react';
import { ResourcesSchedule } from '@xiaoye-react/ui';
import { events, resources } from './data';

function Demo() {
  const today = dayjs('2024-01-15').format('YYYY-MM-DD');
  const [date, setDate] = useState(today);

  return (
    <ResourcesSchedule
      date={date}
      onDateChange={setDate}
      resources={resources}
      events={events}
      dayViewProps={{
        startTime: '08:00:00',
        endTime: '18:00:00',
        intervalMinutes: 30,
        startScrollTime: '08:00:00',
      }}
      weekViewProps={{
        startTime: '08:00:00',
        endTime: '18:00:00',
        startScrollDateTime: \`\${today} 08:00:00\`,
      }}
      monthViewProps={{
        maxEventsPerTimeSlot: 3,
        startScrollDate: today,
      }}
    />
  );
}
`;

function Demo() {
  const today = dayjs('2024-01-15').format('YYYY-MM-DD');
  const [date, setDate] = useState(today);

  return (
    <ResourcesSchedule
      date={date}
      onDateChange={setDate}
      resources={resources}
      events={resourceEvents}
      dayViewProps={{
        startTime: '08:00:00',
        endTime: '18:00:00',
        intervalMinutes: 30,
        startScrollTime: '08:00:00',
      }}
      weekViewProps={{
        startTime: '08:00:00',
        endTime: '18:00:00',
        startScrollDateTime: `${today} 08:00:00`,
      }}
      monthViewProps={{
        maxEventsPerTimeSlot: 3,
        startScrollDate: today,
      }}
    />
  );
}

export const viewProps: UIDemo = {
  defaultExpanded: false,
  type: 'code',
  component: Demo,
  code: [
    { code, language: 'tsx', fileName: '演示代码.tsx' },
    { code: dataCode, language: 'tsx', fileName: 'data.ts' },
  ],
};
