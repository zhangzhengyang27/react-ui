import dayjs from 'dayjs';
import { ScheduleEventData, WeekView } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const startOfWeek = dayjs('2024-01-15').subtract(dayjs('2024-01-15').day(), 'day').format('YYYY-MM-DD');
const dayAfterStartOfWeek = dayjs(startOfWeek).add(1, 'day').format('YYYY-MM-DD');
const twoDaysAfterStartOfWeek = dayjs(startOfWeek).add(2, 'day').format('YYYY-MM-DD');

const events: ScheduleEventData[] = [
  {
    id: 1,
    title: '早间站会',
    start: `${startOfWeek} 09:00:00`,
    end: `${startOfWeek} 09:30:00`,
    color: 'blue',
  },
  {
    id: 2,
    title: '团队会议',
    start: `${dayAfterStartOfWeek} 10:00:00`,
    end: `${dayAfterStartOfWeek} 11:30:00`,
    color: 'green',
  },
  {
    id: 3,
    title: '代码审查',
    start: `${twoDaysAfterStartOfWeek} 14:00:00`,
    end: `${twoDaysAfterStartOfWeek} 15:00:00`,
    color: 'violet',
  },
];

const dataCode = `
import dayjs from 'dayjs';

const startOfWeek = dayjs('2024-01-15').subtract(dayjs('2024-01-15').day(), 'day').format('YYYY-MM-DD');
const dayAfterStartOfWeek = dayjs(startOfWeek).add(1, 'day').format('YYYY-MM-DD');
const twoDaysAfterStartOfWeek = dayjs(startOfWeek).add(2, 'day').format('YYYY-MM-DD');

const events = [
  {
    id: 1,
    title: '早间站会',
    start: \`\${startOfWeek} 09:00:00\`,
    end: \`\${startOfWeek} 09:30:00\`,
    color: 'blue',
  },
  {
    id: 2,
    title: '团队会议',
    start: \`\${dayAfterStartOfWeek} 10:00:00\`,
    end: \`\${dayAfterStartOfWeek} 11:30:00\`,
    color: 'green',
  },
  {
    id: 3,
    title: '代码审查',
    start: \`\${twoDaysAfterStartOfWeek} 14:00:00\`,
    end: \`\${twoDaysAfterStartOfWeek} 15:00:00\`,
    color: 'violet',
  },
];
`;

const code = `
import { WeekView } from '@xiaoye-react/ui';
import { events } from './data';

function Demo() {
  return (
    <WeekView
      date={new Date('2024-01-15')}
      events={events}
      startTime="08:00:00"
      endTime="18:00:00"
      firstDayOfWeek={0}
    />
  );
}
`;

function Demo() {
  return (
    <WeekView
      date={new Date('2024-01-15')}
      events={events}
      startTime="08:00:00"
      endTime="18:00:00"
      firstDayOfWeek={0}
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
