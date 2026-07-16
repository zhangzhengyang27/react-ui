import dayjs from 'dayjs';
import { useState } from 'react';
import { HoverCard, UnstyledButton } from '@react-ui/ui';
import { MonthView, ScheduleEventData } from '@react-ui/schedule';
import { UIDemo } from '@react-ui/demo';
import { _eventDetailsCode, EventDetails } from '../_EventDetails';

const today = dayjs('2024-01-15');
const startOfMonth = today.startOf('month');

const eventData: ScheduleEventData[] = [
  {
    id: 1,
    title: '团队站会',
    start: startOfMonth.add(2, 'day').hour(9).minute(0).format('YYYY-MM-DD HH:mm:ss'),
    end: startOfMonth.add(2, 'day').hour(9).minute(30).format('YYYY-MM-DD HH:mm:ss'),
    color: 'blue',
    payload: {
      description: '每日团队同步会议',
      attendees: ['Alice', 'Bob', 'Charlie'],
      location: 'Conference Room A',
    },
  },
  {
    id: 2,
    title: '设计工作坊',
    start: startOfMonth.add(5, 'day').hour(10).minute(0).format('YYYY-MM-DD HH:mm:ss'),
    end: startOfMonth.add(5, 'day').hour(12).minute(0).format('YYYY-MM-DD HH:mm:ss'),
    color: 'grape',
    payload: {
      description: '协作设计思维会议',
      attendees: ['Diana', 'Eve', 'Frank'],
      location: '创意空间',
    },
  },
  {
    id: 3,
    title: '客户演示',
    start: startOfMonth.add(10, 'day').hour(14).minute(0).format('YYYY-MM-DD HH:mm:ss'),
    end: startOfMonth.add(10, 'day').hour(15).minute(30).format('YYYY-MM-DD HH:mm:ss'),
    color: 'green',
    payload: {
      description: 'Q4 进展客户演示',
      attendees: ['Grace', 'Henry'],
      location: 'Zoom',
    },
  },
  {
    id: 4,
    title: '迭代计划',
    start: startOfMonth.add(15, 'day').hour(10).minute(0).format('YYYY-MM-DD HH:mm:ss'),
    end: startOfMonth.add(15, 'day').hour(12).minute(0).format('YYYY-MM-DD HH:mm:ss'),
    color: 'orange',
    payload: {
      description: '规划下一个冲刺任务和优先级',
      attendees: ['Alice', 'Charlie', 'Bob'],
      location: 'Dev Lab',
    },
  },
  {
    id: 5,
    title: '代码审查',
    start: startOfMonth.add(18, 'day').hour(16).minute(0).format('YYYY-MM-DD HH:mm:ss'),
    end: startOfMonth.add(18, 'day').hour(17).minute(0).format('YYYY-MM-DD HH:mm:ss'),
    color: 'cyan',
    payload: {
      description: '评审本周的拉取请求',
      attendees: ['Alice', 'Charlie'],
      location: 'Dev Lab',
    },
  },
  {
    id: 6,
    title: '技术大会',
    start: startOfMonth.add(22, 'day').format('YYYY-MM-DD 00:00:00'),
    end: startOfMonth.add(22, 'day').format('YYYY-MM-DD 23:59:59'),
    color: 'pink',
    payload: {
      description: '年度技术大会',
      attendees: ['All Team'],
      location: 'Convention Center',
    },
  },
];

const code = `
import { useState } from 'react';
import dayjs from 'dayjs';
import { HoverCard, UnstyledButton } from '@react-ui/ui';
import { MonthView, ScheduleEventData } from '@react-ui/schedule';
import { EventDetails } from './EventDetails';
import { eventsData } from './events';

function Demo() {
  const [events, setEvents] = useState<ScheduleEventData[]>(eventData);

  return (
    <MonthView
      date={new Date('2024-01-15')}
      events={selectedEvents}
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
        <HoverCard width={280} position="right" closeDelay={0} transitionProps={{ duration: 0 }}>
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
    <MonthView
      date={new Date('2024-01-15')}
      events={events}
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
        <HoverCard width={280} position="right" closeDelay={0} transitionProps={{ duration: 0 }}>
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
