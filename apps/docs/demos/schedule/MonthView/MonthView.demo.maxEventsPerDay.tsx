import dayjs from 'dayjs';
import { MonthView, ScheduleEventData } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const today = dayjs('2024-01-15').format('YYYY-MM-DD');

const demoEvents: ScheduleEventData[] = [
  {
    id: 1,
    title: '团队会议',
    start: `${today} 09:00:00`,
    end: `${today} 10:00:00`,
    color: 'blue',
  },
  {
    id: 2,
    title: '代码审查',
    start: `${today} 11:00:00`,
    end: `${today} 12:00:00`,
    color: 'green',
  },
  {
    id: 3,
    title: '设计评审',
    start: `${today} 13:00:00`,
    end: `${today} 14:00:00`,
    color: 'violet',
  },
  {
    id: 4,
    title: '迭代计划',
    start: `${today} 15:00:00`,
    end: `${today} 16:00:00`,
    color: 'orange',
  },
  {
    id: 5,
    title: '回顾会议',
    start: `${today} 16:30:00`,
    end: `${today} 17:30:00`,
    color: 'cyan',
  },
];

const code = `
import { MonthView, ScheduleEventData } from '@xiaoye-react/ui';

const events: ScheduleEventData[] = [
  // ... 5 events on the same day
];

function Demo() {
  return (
    <MonthView
      date={new Date('2024-01-15')}
      events={events}
      maxEventsPerDay={4}
    />
  );
}
`;

function Demo() {
  return <MonthView date={new Date('2024-01-15')} events={demoEvents} maxEventsPerDay={4} />;
}

export const maxEventsPerDay: UIDemo = {
  defaultExpanded: false,
  type: 'code',
  component: Demo,
  code,
};
