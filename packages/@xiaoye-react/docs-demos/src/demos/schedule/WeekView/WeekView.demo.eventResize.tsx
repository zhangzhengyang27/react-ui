import dayjs from 'dayjs';
import { useState } from 'react';
import { ScheduleEventData, WeekView } from '@xiaoye-react/schedule';
import { UIDemo } from '@xiaoye-react/demo';

const today = dayjs('2024-01-15').format('YYYY-MM-DD');
const tomorrow = dayjs('2024-01-15').add(1, 'day').format('YYYY-MM-DD');

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
    start: `${tomorrow} 11:00:00`,
    end: `${tomorrow} 12:00:00`,
    color: 'green',
  },
  {
    id: 3,
    title: '代码审查',
    start: `${today} 14:00:00`,
    end: `${today} 15:00:00`,
    color: 'violet',
  },
];

const code = `
import { useState } from 'react';
import dayjs from 'dayjs';
import { WeekView, ScheduleEventData } from '@xiaoye-react/schedule';

const today = dayjs('2024-01-15').format('YYYY-MM-DD');
const tomorrow = dayjs('2024-01-15').add(1, 'day').format('YYYY-MM-DD');

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
    start: \`\${tomorrow} 11:00:00\`,
    end: \`\${tomorrow} 12:00:00\`,
    color: 'green',
  },
  {
    id: 3,
    title: '代码审查',
    start: \`\${today} 14:00:00\`,
    end: \`\${today} 15:00:00\`,
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

  return (
    <WeekView
      date={new Date('2024-01-15')}
      events={events}
      startTime="08:00:00"
      endTime="18:00:00"
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
    <WeekView
      date={new Date('2024-01-15')}
      events={events}
      startTime="08:00:00"
      endTime="18:00:00"
      withEventResize
      onEventResize={handleEventResize}
    />
  );
}

export const eventResize: UIDemo = {
  defaultExpanded: false,
  type: 'code',
  component: Demo,
  code,
};
