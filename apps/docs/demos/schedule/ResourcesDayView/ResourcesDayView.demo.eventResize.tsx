import dayjs from 'dayjs';
import { useState } from 'react';
import { ResourcesDayView, ScheduleEventData } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';
import { dataCode, resourceEvents, resources } from './_data';

const code = `
import dayjs from 'dayjs';
import { useState } from 'react';
import { ResourcesDayView, ScheduleEventData } from '@xiaoye-react/ui';
import { events as initialEvents, resources } from './data';

function Demo() {
  const [date, setDate] = useState(dayjs('2024-01-15').format('YYYY-MM-DD'));
  const [events, setEvents] = useState<ScheduleEventData[]>(initialEvents);

  return (
    <ResourcesDayView
      date={date}
      onDateChange={setDate}
      resources={resources}
      events={events}
      startTime="08:00:00"
      endTime="18:00:00"
      withEventResize
      onEventResize={({ eventId, newStart, newEnd }) => {
        setEvents((current) =>
          current.map((event) =>
            event.id === eventId
              ? { ...event, start: newStart, end: newEnd }
              : event
          )
        );
      }}
    />
  );
}
`;

function Demo() {
  const [date, setDate] = useState(dayjs('2024-01-15').format('YYYY-MM-DD'));
  const [events, setEvents] = useState<ScheduleEventData[]>(resourceEvents);

  return (
    <ResourcesDayView
      date={date}
      onDateChange={setDate}
      resources={resources}
      events={events}
      startTime="08:00:00"
      endTime="18:00:00"
      withEventResize
      onEventResize={({ eventId, newStart, newEnd }) => {
        setEvents((current) =>
          current.map((event) =>
            event.id === eventId ? { ...event, start: newStart, end: newEnd } : event
          )
        );
      }}
    />
  );
}

export const eventResize: UIDemo = {
  defaultExpanded: false,
  type: 'code',
  component: Demo,
  code: [
    { code, language: 'tsx', fileName: '演示代码.tsx' },
    { code: dataCode, language: 'tsx', fileName: 'data.ts' },
  ],
};
