import dayjs from 'dayjs';
import { useState } from 'react';
import { ResourcesMonthView, ScheduleResourceGroup } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';
import { resourceEvents } from './_data';

const resources = [
  { id: 'tokyo', label: 'Meeting room: Tokyo' },
  { id: 'paris', label: 'Meeting room: Paris' },
  { id: 'new-york', label: 'Meeting room: New York' },
  { id: 'overflow', label: '溢出会议室' },
];

const groups: ScheduleResourceGroup[] = [
  { label: 'Floor 1', resourceIds: ['tokyo', 'paris'] },
  { label: 'Floor 2', resourceIds: ['new-york'] },
];

const code = `
import dayjs from 'dayjs';
import { useState } from 'react';
import { ResourcesMonthView, ScheduleResourceGroup } from '@xiaoye-react/ui';
import { events } from './data';

const resources = [
  { id: 'tokyo', label: 'Meeting room: Tokyo' },
  { id: 'paris', label: 'Meeting room: Paris' },
  { id: 'new-york', label: 'Meeting room: New York' },
  { id: 'overflow', label: '溢出会议室' },
];

const groups: ScheduleResourceGroup[] = [
  { label: 'Floor 1', resourceIds: ['tokyo', 'paris'] },
  { label: 'Floor 2', resourceIds: ['new-york'] },
];

function Demo() {
  const [date, setDate] = useState(dayjs('2024-01-15').format('YYYY-MM-DD'));

  return (
    <ResourcesMonthView
      date={date}
      onDateChange={setDate}
      resources={resources}
      events={events}
      groups={groups}
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
      groups={groups}
      startScrollDate={dayjs('2024-01-15').format('YYYY-MM-DD')}
    />
  );
}

export const resourceGroups: UIDemo = {
  defaultExpanded: false,
  type: 'code',
  component: Demo,
  code: [{ code, language: 'tsx', fileName: '演示代码.tsx' }],
};
