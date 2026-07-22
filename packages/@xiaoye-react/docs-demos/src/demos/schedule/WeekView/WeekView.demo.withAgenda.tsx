import dayjs from 'dayjs';
import { useState } from 'react';
import { WeekView } from '@xiaoye-react/schedule';
import { UIDemo } from '@xiaoye-react/demo';

const today = dayjs('2024-01-15').format('YYYY-MM-DD');
const startOfWeek = dayjs('2024-01-15').startOf('week').add(1, 'day').format('YYYY-MM-DD');

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
    start: `${startOfWeek} 16:00:00`,
    end: `${startOfWeek} 17:00:00`,
    color: 'orange',
    recurrence: {
      rrule: 'FREQ=WEEKLY;COUNT=8',
    },
  },
];

const code = `
import dayjs from 'dayjs';
import { useState } from 'react';
import { WeekView } from '@xiaoye-react/schedule';

const today = dayjs('2024-01-15').format('YYYY-MM-DD');
const startOfWeek = dayjs('2024-01-15').startOf('week').add(1, 'day').format('YYYY-MM-DD');

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
    start: \`\${startOfWeek} 16:00:00\`,
    end: \`\${startOfWeek} 17:00:00\`,
    color: 'orange',
    recurrence: {
      rrule: 'FREQ=WEEKLY;COUNT=8',
    },
  },
];

function Demo() {
  const [date, setDate] = useState(today);

  return (
    <WeekView
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

  return <WeekView date={date} onDateChange={setDate} events={eventsData} withAgenda />;
}

export const withAgenda: UIDemo = {
  defaultExpanded: false,
  type: 'code',
  component: Demo,
  code,
};
