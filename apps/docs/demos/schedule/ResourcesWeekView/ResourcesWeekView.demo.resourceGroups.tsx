import dayjs from 'dayjs';
import { useState } from 'react';
import { ResourcesWeekView, ScheduleResourceGroup } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';
import { resourceEvents } from './_data';

const resources = [
  { id: 'tokyo', label: 'Meeting room: Tokyo' },
  { id: 'paris', label: 'Meeting room: Paris' },
  { id: 'new-york', label: 'Meeting room: New York' },
  { id: 'london', label: 'Meeting room: London' },
  { id: 'overflow', label: '溢出会议室' },
];

const groups: ScheduleResourceGroup[] = [
  { label: 'Floor 1', resourceIds: ['tokyo', 'paris'] },
  { label: 'Floor 2', resourceIds: ['new-york', 'london'] },
];

const code = `
import dayjs from 'dayjs';
import { useState } from 'react';
import { ResourcesWeekView, ScheduleResourceGroup } from '@xiaoye-react/ui';
import { events } from './data';

const resources = [
  { id: 'tokyo', label: 'Meeting room: Tokyo' },
  { id: 'paris', label: 'Meeting room: Paris' },
  { id: 'new-york', label: 'Meeting room: New York' },
  { id: 'london', label: 'Meeting room: London' },
  { id: 'overflow', label: '溢出会议室' },
];

const groups: ScheduleResourceGroup[] = [
  { label: 'Floor 1', resourceIds: ['tokyo', 'paris'] },
  { label: 'Floor 2', resourceIds: ['new-york', 'london'] },
];

function Demo() {
  const today = dayjs('2024-01-15').format('YYYY-MM-DD');
  const [date, setDate] = useState(today);

  return (
    <ResourcesWeekView
      date={date}
      onDateChange={setDate}
      resources={resources}
      events={events}
      groups={groups}
      startTime="08:00:00"
      endTime="18:00:00"
      startScrollDateTime={\`\${today} 08:00:00\`}
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
      groups={groups}
      startTime="08:00:00"
      endTime="18:00:00"
      startScrollDateTime={`${dayjs('2024-01-15').format('YYYY-MM-DD')} 08:00:00`}
    />
  );
}

export const resourceGroups: UIDemo = {
  defaultExpanded: false,
  type: 'code',
  component: Demo,
  code: [{ code, language: 'tsx', fileName: '演示代码.tsx' }],
};
