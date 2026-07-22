import dayjs from 'dayjs';
import { useState } from 'react';
import { DayView, ScheduleEventData } from '@xiaoye-react/schedule';
import { UIDemo } from '@xiaoye-react/demo';

const today = dayjs('2024-01-15').format('YYYY-MM-DD');

const initialEvents: ScheduleEventData[] = [
  {
    id: 1,
    title: '早间站会',
    start: `${today} 09:00:00`,
    end: `${today} 09:30:00`,
    color: 'blue',
  },
  {
    id: 2,
    title: '团队会议',
    start: `${today} 11:15:00`,
    end: `${today} 12:00:00`,
    color: 'green',
  },
  {
    id: 3,
    title: '代码审查',
    start: `${today} 14:00:00`,
    end: `${today} 14:45:00`,
    color: 'violet',
  },
];

const code = `
import { useState } from 'react';
import dayjs from 'dayjs';
import { DayView, ScheduleEventData } from '@xiaoye-react/schedule';

const today = dayjs('2024-01-15').format('YYYY-MM-DD');

const initialEvents: ScheduleEventData[] = [
  {
    id: 1,
    title: '早间站会',
    start: \`\${today} 09:00:00\`,
    end: \`\${today} 09:30:00\`,
    color: 'blue',
  },
  {
    id: 2,
    title: '团队会议',
    start: \`\${today} 11:15:00\`,
    end: \`\${today} 12:00:00\`,
    color: 'green',
  },
  {
    id: 3,
    title: '代码审查',
    start: \`\${today} 14:00:00\`,
    end: \`\${today} 14:45:00\`,
    color: 'violet',
  },
];

function Demo() {
  const [events, setEvents] = useState(initialEvents);

  const handleEventResize = ({ eventId, newStart, newEnd }: { eventId: string | number; newStart: string; newEnd: string }) => {
    setEvents((prev) =>
      prev.map((event) =>
        event.id === eventId ? { ...event, start: newStart, end: newEnd } : event
      )
    );
  };

  // Events snap to 15 minutes increments, but only one grid line per hour is displayed
  return (
    <DayView
      date={new Date('2024-01-15')}
      events={events}
      startTime="08:00:00"
      endTime="18:00:00"
      intervalMinutes={15}
      withSubHourGridLines={false}
      withEventResize
      onEventResize={handleEventResize}
    />
  );
}
`;

function Demo() {
  const [events, setEvents] = useState(initialEvents);

  const handleEventResize = ({
    eventId,
    newStart,
    newEnd,
  }: {
    eventId: string | number;
    newStart: string;
    newEnd: string;
  }) => {
    setEvents((prev) =>
      prev.map((event) =>
        event.id === eventId ? { ...event, start: newStart, end: newEnd } : event
      )
    );
  };

  return (
    <DayView
      date={new Date('2024-01-15')}
      events={events}
      startTime="08:00:00"
      endTime="18:00:00"
      intervalMinutes={15}
      withSubHourGridLines={false}
      withEventResize
      onEventResize={handleEventResize}
    />
  );
}

export const subHourGridLines: UIDemo = {
  defaultExpanded: false,
  type: 'code',
  component: Demo,
  code,
};
