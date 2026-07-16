import dayjs from 'dayjs';
import { useState } from 'react';
import { HoverCard, UnstyledButton } from '@react-ui/ui';
import { DayView, ScheduleEventData } from '@react-ui/schedule';
import { UIDemo } from '@react-ui/demo';
import { _eventDetailsCode, EventDetails } from '../_EventDetails';

const today = dayjs('2024-01-15').format('YYYY-MM-DD');

const eventData: ScheduleEventData[] = [
  {
    id: 1,
    title: '团队站会',
    start: `${today} 09:00:00`,
    end: `${today} 09:30:00`,
    color: 'blue',
    payload: {
      description: '每日团队同步会议',
      attendees: ['Alice', 'Bob', 'Charlie'],
      location: 'Conference Room A',
    },
  },
  {
    id: 2,
    title: '设计评审',
    start: `${today} 10:00:00`,
    end: `${today} 11:30:00`,
    color: 'grape',
    payload: {
      description: '评审新功能的 UI/UX 设计',
      attendees: ['Diana', 'Eve'],
      location: 'Virtual Meeting',
    },
  },
  {
    id: 3,
    title: '客户演示',
    start: `${today} 14:00:00`,
    end: `${today} 15:30:00`,
    color: 'green',
    payload: {
      description: 'Q4 进展客户演示',
      attendees: ['Frank', 'Grace', 'Henry'],
      location: 'Zoom',
    },
  },
  {
    id: 4,
    title: '代码审查',
    start: `${today} 16:00:00`,
    end: `${today} 17:00:00`,
    color: 'orange',
    payload: {
      description: '评审本周的拉取请求',
      attendees: ['Alice', 'Charlie'],
      location: 'Dev Lab',
    },
  },
];

const code = `
import { useState } from 'react';
import dayjs from 'dayjs';
import { HoverCard, UnstyledButton } from '@react-ui/ui';
import { DayView, ScheduleEventData } from '@react-ui/schedule';
import { EventDetails } from './EventDetails';
import { eventsData } from './events';

function Demo() {
  const [events, setEvents] = useState<ScheduleEventData[]>(eventData);

  return (
    <DayView
      date={new Date('2024-01-15')}
      events={selectedEvents}
      startTime="08:00:00"
      endTime="18:00:00"
      withEventsDragAndDrop
      onEventDrop={({ eventId, newStart, newEnd }) => {
        setEvents((current) =>
          current.map((event) =>
            event.id === eventId
              ? {
                  ...event,
                  start: dayjs(newStart).format('YYYY-MM-DD HH:mm:ss'),
                  end: dayjs(newEnd).format('YYYY-MM-DD HH:mm:ss'),
                }
              : event
          )
        );
      }}
      renderEvent={(event, props) => (
        <HoverCard width={280} position="bottom" closeDelay={0} transitionProps={{ duration: 0 }}>
          <HoverCard.Target>
            <UnstyledButton {...props} />
          </HoverCard.Target>
          <HoverCard.Dropdown>
            <EventDetails event={event} />
          </HoverCard.Dropdown>
        </HoverCard>
      )}
    />
  );
}
`;

function Demo() {
  const [events, setEvents] = useState<ScheduleEventData[]>(eventData);

  return (
    <DayView
      date={new Date('2024-01-15')}
      events={events}
      startTime="08:00:00"
      endTime="18:00:00"
      withEventsDragAndDrop
      onEventDrop={({ eventId, newStart, newEnd }) => {
        setEvents((current) =>
          current.map((event) =>
            event.id === eventId
              ? {
                  ...event,
                  start: dayjs(newStart).format('YYYY-MM-DD HH:mm:ss'),
                  end: dayjs(newEnd).format('YYYY-MM-DD HH:mm:ss'),
                }
              : event
          )
        );
      }}
      renderEvent={(event, props) => (
        <HoverCard width={280} position="bottom" closeDelay={0} transitionProps={{ duration: 0 }}>
          <HoverCard.Target>
            <UnstyledButton {...props} />
          </HoverCard.Target>
          <HoverCard.Dropdown>
            <EventDetails event={event} />
          </HoverCard.Dropdown>
        </HoverCard>
      )}
    />
  );
}

export const renderEvent: UIDemo = {
  defaultExpanded: false,
  type: 'code',
  component: Demo,
  code: [
    { fileName: '演示代码.tsx', code, language: 'tsx' },
    { fileName: '事件详情.tsx', code: _eventDetailsCode, language: 'tsx' },
    {
      fileName: 'events.ts',
      code: `import { ScheduleEventData } from '@react-ui/schedule';\n\nexport const eventsData: ScheduleEventData[] = ${JSON.stringify(eventData, null, 2)};`,
      language: 'tsx',
    },
  ],
};
