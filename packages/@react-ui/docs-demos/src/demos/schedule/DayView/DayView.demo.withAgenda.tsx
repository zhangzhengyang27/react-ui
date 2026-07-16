import dayjs from 'dayjs';
import { useState } from 'react';
import { DayView } from '@react-ui/schedule';
import { UIDemo } from '@react-ui/demo';

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
    id: 'team-meeting',
    title: '团队会议',
    start: `${today} 10:00:00`,
    end: `${today} 11:30:00`,
    color: 'green',
  },
  {
    id: 'weekly-review-series',
    title: '每周回顾',
    start: `${dayjs(today).startOf('week').format('YYYY-MM-DD')} 16:00:00`,
    end: `${dayjs(today).startOf('week').format('YYYY-MM-DD')} 17:00:00`,
    color: 'orange',
    recurrence: {
      rrule: 'FREQ=WEEKLY;COUNT=8',
    },
  },
];

const code = `
import dayjs from 'dayjs';
import { useState } from 'react';
import { DayView } from '@react-ui/schedule';

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
    id: 'team-meeting',
    title: '团队会议',
    start: \`\${today} 10:00:00\`,
    end: \`\${today} 11:30:00\`,
    color: 'green',
  },
  {
    id: 'weekly-review-series',
    title: '每周回顾',
    start: \`\${dayjs(today).startOf('week').format('YYYY-MM-DD')} 16:00:00\`,
    end: \`\${dayjs(today).startOf('week').format('YYYY-MM-DD')} 17:00:00\`,
    color: 'orange',
    recurrence: {
      rrule: 'FREQ=WEEKLY;COUNT=8',
    },
  },
];

function Demo() {
  const [date, setDate] = useState(today);

  return (
    <DayView
      date={date}
      onDateChange={setDate}
      events={events}
      withAgenda
    />
  );
}
`;

function Demo() {
  const [date, setDate] = useState(today);

  return <DayView date={date} onDateChange={setDate} events={eventsData} withAgenda />;
}

export const withAgenda: UIDemo = {
  defaultExpanded: false,
  type: 'code',
  component: Demo,
  code,
};
