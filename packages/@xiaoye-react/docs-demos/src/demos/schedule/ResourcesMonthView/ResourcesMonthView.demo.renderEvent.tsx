import dayjs from 'dayjs';
import { useState } from 'react';
import { HoverCard, UnstyledButton } from '@xiaoye-react/ui';
import { ResourcesMonthView, ScheduleEventData } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';
import { _eventDetailsCode, EventDetails } from '../_EventDetails';
import { resources } from './_data';

const today = dayjs('2024-01-15').format('YYYY-MM-DD');
const tomorrow = dayjs('2024-01-15').add(1, 'day').format('YYYY-MM-DD');
const nextWeek = dayjs('2024-01-15').add(5, 'day').format('YYYY-MM-DD');

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
    resourceId: 'paris',
    payload: {
      description: '规划下一个冲刺任务和目标',
      attendees: ['Diana', 'Eve'],
      location: 'Main Hall',
    },
  },
  {
    id: 3,
    title: '设计评审',
    start: `${tomorrow} 13:00:00`,
    end: `${tomorrow} 14:00:00`,
    color: 'orange',
    resourceId: 'tokyo',
    payload: {
      description: '评审新功能的 UI/UX 设计',
      attendees: ['Henry', 'Alice'],
      location: 'Studio B',
    },
  },
  {
    id: 4,
    title: '客户电话',
    start: `${tomorrow} 09:30:00`,
    end: `${tomorrow} 10:30:00`,
    color: 'violet',
    resourceId: 'new-york',
    payload: {
      description: '季度客户评审',
      attendees: ['Frank', 'Grace'],
      location: 'Zoom',
    },
  },
  {
    id: 5,
    title: '研讨会',
    start: `${nextWeek} 14:00:00`,
    end: `${nextWeek} 16:00:00`,
    color: 'pink',
    resourceId: 'paris',
    payload: {
      description: '动手编程工作坊',
      attendees: ['Bob', 'Charlie', 'Diana'],
      location: 'Lab 2',
    },
  },
];

function Demo() {
  const [date, setDate] = useState(dayjs('2024-01-15').format('YYYY-MM-DD'));
  const [events, setEvents] = useState<ScheduleEventData[]>(eventData);

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
      renderEvent={(event, props) => (
        <HoverCard width={280} position="right" closeDelay={0} transitionProps={{ duration: 0 }}>
          <HoverCard.Target>
            <UnstyledButton {...props} />
          </HoverCard.Target>
          <HoverCard.Dropdown>
            <EventDetails event={event} resources={resources} />
          </HoverCard.Dropdown>
        </HoverCard>
      )}
      startScrollDate={dayjs('2024-01-15').format('YYYY-MM-DD')}
    />
  );
}

const code = `
import dayjs from 'dayjs';
import { useState } from 'react';
import { HoverCard, UnstyledButton } from '@xiaoye-react/ui';
import { ResourcesMonthView, ScheduleEventData } from '@xiaoye-react/ui';
import { EventDetails } from './EventDetails';
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
      renderEvent={(event, props) => (
        <HoverCard width={280} position="right" closeDelay={0} transitionProps={{ duration: 0 }}>
          <HoverCard.Target>
            <UnstyledButton {...props} />
          </HoverCard.Target>
          <HoverCard.Dropdown>
            <EventDetails event={event} resources={resources} />
          </HoverCard.Dropdown>
        </HoverCard>
      )}
      startScrollDate={dayjs('2024-01-15').format('YYYY-MM-DD')}
    />
  );
}
`;

export const renderEvent: UIDemo = {
  defaultExpanded: false,
  type: 'code',
  component: Demo,
  code: [
    { fileName: '演示代码.tsx', code, language: 'tsx' },
    { fileName: '事件详情.tsx', code: _eventDetailsCode, language: 'tsx' },
    {
      fileName: 'data.ts',
      code: `import { ScheduleResourceData } from '@xiaoye-react/ui';\n\nexport const resources: ScheduleResourceData[] = ${JSON.stringify(resources, null, 2)};\n\n// Events with payload data for EventDetails\nexport const events = [\n  // ... events with payload: { description, attendees, location }\n];`,
      language: 'tsx',
    },
  ],
};
