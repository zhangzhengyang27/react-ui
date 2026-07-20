import dayjs from 'dayjs';
import { AgendaView } from '@react-ui/schedule';
import { UIDemo } from '@react-ui/demo';

const today = dayjs('2024-01-15').format('YYYY-MM-DD');
const startOfMonth = dayjs('2024-01-15').startOf('month').format('YYYY-MM-DD');

const eventsData = [
  {
    id: 'team-meeting',
    title: '团队会议',
    start: `${startOfMonth} 09:00:00`,
    end: `${startOfMonth} 10:30:00`,
    color: 'blue',
  },
  {
    id: 'client-call',
    title: '客户电话',
    start: `${today} 14:00:00`,
    end: `${today} 15:00:00`,
    color: 'green',
  },
  {
    id: 'workshop',
    title: '研讨会',
    start: dayjs('2024-01-15').add(3, 'day').format('YYYY-MM-DD 10:00:00'),
    end: dayjs('2024-01-15').add(3, 'day').format('YYYY-MM-DD 12:00:00'),
    color: 'orange',
  },
  {
    id: 'weekly-review-series',
    title: '每周回顾',
    start: `${startOfMonth} 16:00:00`,
    end: `${startOfMonth} 17:00:00`,
    color: 'cyan',
    recurrence: {
      rrule: 'FREQ=WEEKLY;COUNT=8',
    },
  },
];

const code = `
import dayjs from 'dayjs';
import { AgendaView } from '@react-ui/schedule';

const today = dayjs('2024-01-15').format('YYYY-MM-DD');
const startOfMonth = dayjs('2024-01-15').startOf('month').format('YYYY-MM-DD');

const events = [
  {
    id: 'team-meeting',
    title: '团队会议',
    start: \`\${startOfMonth} 09:00:00\`,
    end: \`\${startOfMonth} 10:30:00\`,
    color: 'blue',
  },
  {
    id: 'client-call',
    title: '客户电话',
    start: \`\${today} 14:00:00\`,
    end: \`\${today} 15:00:00\`,
    color: 'green',
  },
  {
    id: 'weekly-review-series',
    title: '每周回顾',
    start: \`\${startOfMonth} 16:00:00\`,
    end: \`\${startOfMonth} 17:00:00\`,
    color: 'cyan',
    recurrence: {
      rrule: 'FREQ=WEEKLY;COUNT=8',
    },
  },
];

function Demo() {
  return (
    <AgendaView
      rangeStart={dayjs('2024-01-15').startOf('month').format('YYYY-MM-DD')}
      rangeEnd={dayjs('2024-01-15').endOf('month').format('YYYY-MM-DD')}
      events={events}
    />
  );
}
`;

function Demo() {
  return (
    <AgendaView
      rangeStart={dayjs('2024-01-15').startOf('month').format('YYYY-MM-DD')}
      rangeEnd={dayjs('2024-01-15').endOf('month').format('YYYY-MM-DD')}
      events={eventsData}
    />
  );
}

export const usage: UIDemo = {
  defaultExpanded: false,
  type: 'code',
  component: Demo,
  centered: true,
  maxWidth: 500,
  code,
};
