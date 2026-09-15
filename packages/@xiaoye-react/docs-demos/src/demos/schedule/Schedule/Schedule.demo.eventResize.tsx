import dayjs from 'dayjs';
import { useState } from 'react';
import { Schedule, ScheduleEventData } from '@xiaoye-react/ui';
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
    start: `${today} 10:00:00`,
    end: `${today} 11:30:00`,
    color: 'green',
  },
  {
    id: 3,
    title: '午餐休息',
    start: `${today} 12:00:00`,
    end: `${today} 13:00:00`,
    color: 'orange',
  },
  {
    id: 4,
    title: '代码审查',
    start: `${tomorrow} 14:00:00`,
    end: `${tomorrow} 15:00:00`,
    color: 'violet',
  },
  {
    id: 5,
    title: '客户电话',
    start: `${tomorrow} 15:30:00`,
    end: `${tomorrow} 16:30:00`,
    color: 'cyan',
  },
];

const code = `
import { useState } from 'react';
import dayjs from 'dayjs';
import { Schedule, ScheduleEventData } from '@xiaoye-react/ui';

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
    start: \`\${today} 10:00:00\`,
    end: \`\${today} 11:30:00\`,
    color: 'green',
  },
  {
    id: 3,
    title: '午餐休息',
    start: \`\${today} 12:00:00\`,
    end: \`\${today} 13:00:00\`,
    color: 'orange',
  },
  {
    id: 4,
    title: '代码审查',
    start: \`\${tomorrow} 14:00:00\`,
    end: \`\${tomorrow} 15:00:00\`,
    color: 'violet',
  },
  {
    id: 5,
    title: '客户电话',
    start: \`\${tomorrow} 15:30:00\`,
    end: \`\${tomorrow} 16:30:00\`,
    color: 'cyan',
  },
];

function Demo() {
  const [events, setEvents] = useState(initialEvents);

  const handleEventUpdate = ({ eventId, newStart, newEnd }: { eventId: string | number; newStart: string; newEnd: string }) => {
    setEvents((prev) =>
      prev.map((event) =>
        event.id === eventId ? { ...event, start: newStart, end: newEnd } : event
      )
    );
  };

  return (
    <Schedule
      events={events}
      withEventsDragAndDrop
      onEventDrop={handleEventUpdate}
      withEventResize
      onEventResize={handleEventUpdate}
    />
  );
}
`;

function Demo() {
  const [events, setEvents] = useState(initialEvents);

  const handleEventUpdate = ({
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
    <Schedule
      events={events}
      withEventsDragAndDrop
      onEventDrop={handleEventUpdate}
      withEventResize
      onEventResize={handleEventUpdate}
    />
  );
}

export const eventResize: UIDemo = {
  defaultExpanded: false,
  type: 'code',
  component: Demo,
  code,
};
