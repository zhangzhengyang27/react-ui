import dayjs from 'dayjs';
import { useState } from 'react';
import { MonthView } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

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
    id: 'weekly-review-series',
    title: '每周回顾',
    start: `${startOfMonth} 16:00:00`,
    end: `${startOfMonth} 17:00:00`,
    color: 'orange',
    recurrence: {
      rrule: 'FREQ=WEEKLY;COUNT=8',
    },
  },
];

const code = `
import dayjs from 'dayjs';
import { useState } from 'react';
import { MonthView } from '@xiaoye-react/ui';

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
    color: 'orange',
    recurrence: {
      rrule: 'FREQ=WEEKLY;COUNT=8',
    },
  },
];

function Demo() {
  const [date, setDate] = useState(today);

  return (
    <MonthView
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

  return <MonthView date={date} onDateChange={setDate} events={eventsData} withAgenda />;
}

export const withAgenda: UIDemo = {
  defaultExpanded: false,
  type: 'code',
  component: Demo,
  code,
};
