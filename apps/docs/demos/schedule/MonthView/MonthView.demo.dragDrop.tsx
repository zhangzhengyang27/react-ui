import dayjs from 'dayjs';
import { useState } from 'react';
import { MonthView, ScheduleEventData } from '@react-ui/schedule';
import { UIDemo } from '@react-ui/demo';

const today = dayjs('2024-01-15').format('YYYY-MM-DD');

const initialEvents: ScheduleEventData[] = [
  {
    id: 1,
    title: '团队会议',
    start: `${today} 09:00:00`,
    end: `${today} 10:30:00`,
    color: 'blue',
  },
  {
    id: 2,
    title: '项目截止日期',
    start: dayjs('2024-01-15').add(5, 'day').format('YYYY-MM-DD 00:00:00'),
    end: dayjs('2024-01-15').add(6, 'day').startOf('day').format('YYYY-MM-DD HH:mm:ss'),
    color: 'red',
  },
];

const code = `
import { useState } from 'react';
import dayjs from 'dayjs';
import { MonthView, ScheduleEventData } from '@react-ui/schedule';

const today = dayjs('2024-01-15').format('YYYY-MM-DD');

const initialEvents: ScheduleEventData[] = [
  {
    id: 1,
    title: '团队会议',
    start: \`\${today} 09:00:00\`,
    end: \`\${today} 10:30:00\`,
    color: 'blue',
  },
  {
    id: 2,
    title: '项目截止日期',
    start: dayjs('2024-01-15').add(5, 'day').format('YYYY-MM-DD 00:00:00'),
    end: dayjs('2024-01-15').add(6, 'day').startOf('day').format('YYYY-MM-DD HH:mm:ss'),
    color: 'red',
  },
];

function Demo() {
  const [events, setEvents] = useState(initialEvents);

  const handleEventDrop = ({ eventId, newStart, newEnd }: { eventId: string | number; newStart: string; newEnd: string }) => {
    setEvents((prev) =>
      prev.map((event) =>
        event.id === eventId ? { ...event, start: newStart, end: newEnd } : event
      )
    );
  };

  return <MonthView date={new Date('2024-01-15')} events={events} withEventsDragAndDrop onEventDrop={handleEventDrop} />;
}
`;

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

export const dragDrop: UIDemo = {
  defaultExpanded: false,
  type: 'code',
  component: Demo,
  code,
};
