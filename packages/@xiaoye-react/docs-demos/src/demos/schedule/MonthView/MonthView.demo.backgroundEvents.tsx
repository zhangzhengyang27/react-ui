import dayjs from 'dayjs';
import { useState } from 'react';
import { MonthView, ScheduleEventData } from '@xiaoye-react/schedule';
import { UIDemo } from '@xiaoye-react/demo';

const today = dayjs('2024-01-15').format('YYYY-MM-DD');

const initialEvents: ScheduleEventData[] = [
  {
    id: 'company-offsite',
    title: '公司团建',
    start: `${dayjs(today).startOf('week').add(1, 'day').format('YYYY-MM-DD')} 00:00:00`,
    end: `${dayjs(today).startOf('week').add(3, 'day').format('YYYY-MM-DD')} 23:59:59`,
    color: 'blue',
    display: 'background',
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
    start: `${dayjs(today).add(1, 'day').format('YYYY-MM-DD')} 14:00:00`,
    end: `${dayjs(today).add(1, 'day').format('YYYY-MM-DD')} 15:00:00`,
    color: 'green',
  },
];

const code = `
import dayjs from 'dayjs';
import { useState } from 'react';
import { MonthView, ScheduleEventData } from '@xiaoye-react/schedule';

const today = dayjs('2024-01-15').format('YYYY-MM-DD');

const initialEvents: ScheduleEventData[] = [
  {
    id: 'company-offsite',
    title: '公司团建',
    start: \`\${dayjs(today).startOf('week').add(1, 'day').format('YYYY-MM-DD')} 00:00:00\`,
    end: \`\${dayjs(today).startOf('week').add(3, 'day').format('YYYY-MM-DD')} 23:59:59\`,
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
    start: \`\${dayjs(today).add(1, 'day').format('YYYY-MM-DD')} 14:00:00\`,
    end: \`\${dayjs(today).add(1, 'day').format('YYYY-MM-DD')} 15:00:00\`,
    color: 'green',
  },
];

function overlapsBackground(
  newStart: string,
  newEnd: string,
  events: ScheduleEventData[]
) {
  return events.some(
    (e) =>
      e.display === 'background' && newStart < e.end && newEnd > e.start
  );
}

function Demo() {
  const [events, setEvents] = useState(initialEvents);

  const handleEventDrop = ({
    eventId,
    newStart,
    newEnd,
  }: {
    eventId: string | number;
    newStart: string;
    newEnd: string;
  }) => {
    if (overlapsBackground(newStart, newEnd, events)) {
      return;
    }

    setEvents((prev) =>
      prev.map((event) =>
        event.id === eventId
          ? { ...event, start: newStart, end: newEnd }
          : event
      )
    );
  };

  return (
    <MonthView
      date={new Date('2024-01-15')}
      events={events}
      withEventsDragAndDrop
      onEventDrop={handleEventDrop}
    />
  );
}
`;

function overlapsBackground(newStart: string, newEnd: string, events: ScheduleEventData[]) {
  return events.some((e) => e.display === 'background' && newStart < e.end && newEnd > e.start);
}

function Demo() {
  const [events, setEvents] = useState(initialEvents);

  const handleEventDrop = ({
    eventId,
    newStart,
    newEnd,
  }: {
    eventId: string | number;
    newStart: string;
    newEnd: string;
  }) => {
    if (overlapsBackground(newStart, newEnd, events)) {
      return;
    }

    setEvents((prev) =>
      prev.map((event) =>
        event.id === eventId ? { ...event, start: newStart, end: newEnd } : event
      )
    );
  };

  return (
    <MonthView
      date={new Date('2024-01-15')}
      events={events}
      withEventsDragAndDrop
      onEventDrop={handleEventDrop}
    />
  );
}

export const backgroundEvents: UIDemo = {
  defaultExpanded: false,
  type: 'code',
  component: Demo,
  code,
};
