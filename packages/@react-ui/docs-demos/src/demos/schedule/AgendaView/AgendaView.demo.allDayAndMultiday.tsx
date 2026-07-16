import dayjs from 'dayjs';
import { AgendaView } from '@react-ui/schedule';
import { UIDemo } from '@react-ui/demo';

const today = dayjs('2024-01-15').format('YYYY-MM-DD');

const eventsData = [
  {
    id: 'timed',
    title: '团队会议',
    start: `${today} 10:00:00`,
    end: `${today} 11:30:00`,
    color: 'blue',
  },
  {
    id: 'allday',
    title: '公司假日',
    start: dayjs('2024-01-15').add(1, 'day').format('YYYY-MM-DD 00:00:00'),
    end: dayjs('2024-01-15').add(2, 'day').startOf('day').format('YYYY-MM-DD HH:mm:ss'),
    color: 'red',
  },
  {
    id: 'multiday',
    title: 'Sales Conference',
    start: dayjs('2024-01-15').add(2, 'day').format('YYYY-MM-DD 00:00:00'),
    end: dayjs('2024-01-15').add(5, 'day').startOf('day').format('YYYY-MM-DD HH:mm:ss'),
    color: 'grape',
  },
  {
    id: 'timed-2',
    title: '客户电话',
    start: dayjs('2024-01-15').add(3, 'day').format('YYYY-MM-DD 14:00:00'),
    end: dayjs('2024-01-15').add(3, 'day').format('YYYY-MM-DD 15:00:00'),
    color: 'green',
  },
  {
    id: 'evening',
    title: 'Dinner Event',
    start: dayjs('2024-01-15').add(4, 'day').format('YYYY-MM-DD 19:00:00'),
    end: dayjs('2024-01-15').add(4, 'day').format('YYYY-MM-DD 21:00:00'),
    color: 'orange',
  },
];

const code = `
import dayjs from 'dayjs';
import { AgendaView } from '@react-ui/schedule';

const today = dayjs('2024-01-15').format('YYYY-MM-DD');

const events = [
  {
    id: 'timed',
    title: '团队会议',
    start: \`\${today} 10:00:00\`,
    end: \`\${today} 11:30:00\`,
    color: 'blue',
  },
  {
    id: 'allday',
    title: '公司假日',
    start: dayjs('2024-01-15').add(1, 'day').format('YYYY-MM-DD 00:00:00'),
    end: dayjs('2024-01-15').add(2, 'day').startOf('day').format('YYYY-MM-DD HH:mm:ss'),
    color: 'red',
  },
  {
    id: 'multiday',
    title: 'Sales Conference',
    start: dayjs('2024-01-15').add(2, 'day').format('YYYY-MM-DD 00:00:00'),
    end: dayjs('2024-01-15').add(5, 'day').startOf('day').format('YYYY-MM-DD HH:mm:ss'),
    color: 'grape',
  },
  {
    id: 'timed-2',
    title: '客户电话',
    start: dayjs('2024-01-15').add(3, 'day').format('YYYY-MM-DD 14:00:00'),
    end: dayjs('2024-01-15').add(3, 'day').format('YYYY-MM-DD 15:00:00'),
    color: 'green',
  },
  {
    id: 'evening',
    title: 'Dinner Event',
    start: dayjs('2024-01-15').add(4, 'day').format('YYYY-MM-DD 19:00:00'),
    end: dayjs('2024-01-15').add(4, 'day').format('YYYY-MM-DD 21:00:00'),
    color: 'orange',
  },
];

function Demo() {
  return (
    <AgendaView
      rangeStart={dayjs('2024-01-15').format('YYYY-MM-DD')}
      rangeEnd={dayjs('2024-01-15').add(7, 'day').format('YYYY-MM-DD')}
      events={events}
    />
  );
}
`;

function Demo() {
  return (
    <AgendaView
      rangeStart={dayjs('2024-01-15').format('YYYY-MM-DD')}
      rangeEnd={dayjs('2024-01-15').add(7, 'day').format('YYYY-MM-DD')}
      events={eventsData}
    />
  );
}

export const allDayAndMultiday: UIDemo = {
  defaultExpanded: false,
  type: 'code',
  component: Demo,
  centered: true,
  maxWidth: 500,
  code,
};
