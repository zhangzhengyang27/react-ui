import dayjs from 'dayjs';
import { AgendaView } from '@xiaoye-react/schedule';
import { UIDemo } from '@xiaoye-react/demo';

const today = dayjs('2024-01-15').format('YYYY-MM-DD');

const eventsData = [
  {
    id: 'standup',
    title: '早间站会',
    start: `${today} 09:00:00`,
    end: `${today} 09:30:00`,
    color: 'blue',
  },
  {
    id: 'meeting',
    title: '团队会议',
    start: dayjs('2024-01-15').add(1, 'day').format('YYYY-MM-DD 10:00:00'),
    end: dayjs('2024-01-15').add(1, 'day').format('YYYY-MM-DD 11:30:00'),
    color: 'green',
  },
  {
    id: 'review',
    title: '代码审查',
    start: dayjs('2024-01-15').add(2, 'day').format('YYYY-MM-DD 14:00:00'),
    end: dayjs('2024-01-15').add(2, 'day').format('YYYY-MM-DD 15:00:00'),
    color: 'violet',
  },
];

const code = `
import dayjs from 'dayjs';
import { AgendaView } from '@xiaoye-react/schedule';

const today = dayjs('2024-01-15').format('YYYY-MM-DD');

const events = [
  {
    id: 'standup',
    title: '早间站会',
    start: \`\${today} 09:00:00\`,
    end: \`\${today} 09:30:00\`,
    color: 'blue',
  },
  {
    id: 'meeting',
    title: '团队会议',
    start: dayjs('2024-01-15').add(1, 'day').format('YYYY-MM-DD 10:00:00'),
    end: dayjs('2024-01-15').add(1, 'day').format('YYYY-MM-DD 11:30:00'),
    color: 'green',
  },
  {
    id: 'review',
    title: '代码审查',
    start: dayjs('2024-01-15').add(2, 'day').format('YYYY-MM-DD 14:00:00'),
    end: dayjs('2024-01-15').add(2, 'day').format('YYYY-MM-DD 15:00:00'),
    color: 'violet',
  },
];

function Demo() {
  return (
    <AgendaView
      rangeStart={dayjs('2024-01-15').format('YYYY-MM-DD')}
      rangeEnd={dayjs('2024-01-15').add(7, 'day').format('YYYY-MM-DD')}
      events={events}
      headerFormat="MMM D"
      dateHeaderFormat="ddd, D MMM"
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
      headerFormat="MMM D"
      dateHeaderFormat="ddd, D MMM"
    />
  );
}

export const dateFormats: UIDemo = {
  defaultExpanded: false,
  type: 'code',
  component: Demo,
  centered: true,
  maxWidth: 500,
  code,
};
