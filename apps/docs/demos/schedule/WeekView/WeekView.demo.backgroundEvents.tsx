import dayjs from 'dayjs';
import { useState } from 'react';
import { WeekView } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const today = dayjs('2024-01-15').format('YYYY-MM-DD');

const backgroundEventsData = [
  {
    id: 'lunch-block',
    title: '午餐休息',
    start: `${today} 12:00:00`,
    end: `${today} 13:00:00`,
    color: 'gray',
    display: 'background' as const,
  },
  {
    id: 'focus-time',
    title: '专注时间',
    start: `${today} 14:00:00`,
    end: `${today} 16:00:00`,
    color: 'blue',
    display: 'background' as const,
  },
  {
    id: 'team-meeting',
    title: '团队会议',
    start: `${today} 10:00:00`,
    end: `${today} 11:00:00`,
    color: 'violet',
  },
  {
    id: 'code-review',
    title: '代码审查',
    start: `${today} 14:30:00`,
    end: `${today} 15:30:00`,
    color: 'green',
  },
];

const code = `
import dayjs from 'dayjs';
import { useState } from 'react';
import { WeekView } from '@xiaoye-react/ui';

const today = dayjs('2024-01-15').format('YYYY-MM-DD');

const events = [
  {
    id: 'lunch-block',
    title: '午餐休息',
    start: \`\${today} 12:00:00\`,
    end: \`\${today} 13:00:00\`,
    color: 'gray',
    display: 'background',
  },
  {
    id: 'focus-time',
    title: '专注时间',
    start: \`\${today} 14:00:00\`,
    end: \`\${today} 16:00:00\`,
    color: 'blue',
    display: 'background',
  },
  {
    id: 'team-meeting',
    title: '团队会议',
    start: \`\${today} 10:00:00\`,
    end: \`\${today} 11:00:00\`,
    color: 'violet',
  },
  {
    id: 'code-review',
    title: '代码审查',
    start: \`\${today} 14:30:00\`,
    end: \`\${today} 15:30:00\`,
    color: 'green',
  },
];

function Demo() {
  const [date, setDate] = useState(today);

  return (
    <WeekView
      date={date}
      onDateChange={setDate}
      events={events}
      startTime="08:00:00"
      endTime="18:00:00"
    />
  );
}
`;

function Demo() {
  const [date, setDate] = useState(today);

  return (
    <WeekView
      date={date}
      onDateChange={setDate}
      events={backgroundEventsData}
      startTime="08:00:00"
      endTime="18:00:00"
    />
  );
}

export const backgroundEvents: UIDemo = {
  defaultExpanded: false,
  type: 'code',
  component: Demo,
  code,
};
