import dayjs from 'dayjs';
import { useState } from 'react';
import { DayView, ScheduleEventData } from '@xiaoye-react/schedule';
import { UIDemo } from '@xiaoye-react/demo';

const today = dayjs('2024-01-15').format('YYYY-MM-DD');

const initialEvents: ScheduleEventData[] = [
  {
    id: 1,
    title: '可拖动事件',
    start: `${today} 09:00:00`,
    end: `${today} 10:00:00`,
    color: 'blue',
  },
  {
    id: 2,
    title: '锁定事件',
    start: `${today} 11:00:00`,
    end: `${today} 12:00:00`,
    color: 'gray',
    payload: { locked: true },
  },
  {
    id: 3,
    title: '另一个可拖动事件',
    start: `${today} 14:00:00`,
    end: `${today} 15:00:00`,
    color: 'green',
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
    title: '可拖动事件',
    start: \`\${today} 09:00:00\`,
    end: \`\${today} 10:00:00\`,
    color: 'blue',
  },
  {
    id: 2,
    title: '锁定事件',
    start: \`\${today} 11:00:00\`,
    end: \`\${today} 12:00:00\`,
    color: 'gray',
    payload: { locked: true },
  },
  {
    id: 3,
    title: '另一个可拖动事件',
    start: \`\${today} 14:00:00\`,
    end: \`\${today} 15:00:00\`,
    color: 'green',
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

  return (
    <DayView
      date={new Date('2024-01-15')}
      events={events}
      startTime="08:00:00"
      endTime="18:00:00"
      withEventsDragAndDrop
      onEventDrop={handleEventDrop}
      canDragEvent={(event) => !event.payload?.locked}
    />
  );
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
    <DayView
      date={new Date('2024-01-15')}
      events={events}
      startTime="08:00:00"
      endTime="18:00:00"
      withEventsDragAndDrop
      onEventDrop={handleEventDrop}
      canDragEvent={(event) => !event.payload?.locked}
    />
  );
}

export const canDragEvent: UIDemo = {
  defaultExpanded: false,
  type: 'code',
  component: Demo,
  code,
};
