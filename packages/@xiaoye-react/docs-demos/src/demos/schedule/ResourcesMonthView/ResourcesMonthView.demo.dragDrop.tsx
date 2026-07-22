import dayjs from 'dayjs';
import { useState } from 'react';
import { ResourcesMonthView, ScheduleEventData } from '@xiaoye-react/schedule';
import { UIDemo } from '@xiaoye-react/demo';
import { dataCode, resourceEvents, resources } from './_data';

const code = `
import dayjs from 'dayjs';
import { useState } from 'react';
import { ResourcesMonthView, ScheduleEventData } from '@xiaoye-react/schedule';
import { events as initialEvents, resources } from './data';

function Demo() {
  const [date, setDate] = useState(dayjs('2024-01-15').format('YYYY-MM-DD'));
  const [events, setEvents] = useState<ScheduleEventData[]>(initialEvents);

  return (
    <ResourcesMonthView
      date={date}
      onDateChange={setDate}
      resources={resources}
      events={events}
      withEventsDragAndDrop
      onEventDrop={({ eventId, newStart, newEnd, resourceId }) => {
        setEvents((current) =>
          current.map((event) =>
            event.id === eventId
              ? { ...event, start: newStart, end: newEnd, resourceId }
              : event
          )
        );
      }}
      startScrollDate={dayjs('2024-01-15').format('YYYY-MM-DD')}
    />
  );
}
`;

function Demo() {
  const [date, setDate] = useState(dayjs('2024-01-15').format('YYYY-MM-DD'));
  const [events, setEvents] = useState<ScheduleEventData[]>(resourceEvents);

  return (
    <ResourcesMonthView
      date={date}
      onDateChange={setDate}
      resources={resources}
      events={events}
      withEventsDragAndDrop
      onEventDrop={({ eventId, newStart, newEnd, resourceId }) => {
        setEvents((current) =>
          current.map((event) =>
            event.id === eventId ? { ...event, start: newStart, end: newEnd, resourceId } : event
          )
        );
      }}
      startScrollDate={dayjs('2024-01-15').format('YYYY-MM-DD')}
    />
  );
}

export const dragDrop: UIDemo = {
  defaultExpanded: false,
  type: 'code',
  component: Demo,
  code: [
    { code, language: 'tsx', fileName: '演示代码.tsx' },
    { code: dataCode, language: 'tsx', fileName: 'data.ts' },
  ],
};
