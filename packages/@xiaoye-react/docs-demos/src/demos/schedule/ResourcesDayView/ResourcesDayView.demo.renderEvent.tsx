import dayjs from 'dayjs';
import { useState } from 'react';
import { HoverCard, UnstyledButton } from '@xiaoye-react/ui';
import { ResourcesDayView, ScheduleEventData } from '@xiaoye-react/schedule';
import { UIDemo } from '@xiaoye-react/demo';
import { _eventDetailsCode, EventDetails } from '../_EventDetails';
import { resources } from './_data';

const today = dayjs('2024-01-15').format('YYYY-MM-DD');

const eventData: ScheduleEventData[] = [
  {
    id: 1,
    title: '团队站会',
    start: `${today} 09:00:00`,
    end: `${today} 09:30:00`,
    color: 'blue',
    resourceId: 'tokyo',
    payload: {
      description: '每日团队同步会议',
      attendees: ['Alice', 'Bob', 'Charlie'],
      location: 'Floor 3',
    },
  },
  {
    id: 2,
    title: '迭代计划',
    start: `${today} 10:00:00`,
    end: `${today} 11:30:00`,
    color: 'green',
    resourceId: 'tokyo',
    payload: {
      description: '规划下一个冲刺任务和目标',
      attendees: ['Diana', 'Eve'],
      location: 'Main Hall',
    },
  },
  {
    id: 3,
    title: '客户电话',
    start: `${today} 09:30:00`,
    end: `${today} 10:30:00`,
    color: 'violet',
    resourceId: 'paris',
    payload: {
      description: '季度客户评审',
      attendees: ['Frank', 'Grace'],
      location: 'Zoom',
    },
  },
  {
    id: 4,
    title: '设计评审',
    start: `${today} 13:00:00`,
    end: `${today} 14:00:00`,
    color: 'orange',
    resourceId: 'paris',
    payload: {
      description: '评审新功能的 UI/UX 设计',
      attendees: ['Henry', 'Alice'],
      location: 'Studio B',
    },
  },
  {
    id: 5,
    title: '研讨会',
    start: `${today} 14:00:00`,
    end: `${today} 16:00:00`,
    color: 'pink',
    resourceId: 'new-york',
    payload: {
      description: '动手编程工作坊',
      attendees: ['Bob', 'Charlie', 'Diana'],
      location: 'Lab 2',
    },
  },
];

const code = `
import { useState } from 'react';
import dayjs from 'dayjs';
import { HoverCard, UnstyledButton } from '@xiaoye-react/ui';
import { ResourcesDayView, ScheduleEventData } from '@xiaoye-react/schedule';
import { EventDetails } from './EventDetails';
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
  const [date, setDate] = useState(dayjs('2024-01-15').format('YYYY-MM-DD'));
  const [events, setEvents] = useState<ScheduleEventData[]>(eventData);

  return (
    <ResourcesDayView
      date={date}
      onDateChange={setDate}
      resources={resources}
      events={events}
      startTime="08:00:00"
      endTime="18:00:00"
      withEventsDragAndDrop
      onEventDrop={({ eventId, newStart, newEnd, resourceId }) => {
        setEvents((current) =>
          current.map((event) =>
            event.id === eventId ? { ...event, start: newStart, end: newEnd, resourceId } : event
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
      fileName: 'data.ts',
      code: `import { ScheduleEventData } from '@xiaoye-react/schedule';\n\nexport const eventsData: ScheduleEventData[] = ${JSON.stringify(eventData, null, 2)};`,
      language: 'tsx',
    },
  ],
};
