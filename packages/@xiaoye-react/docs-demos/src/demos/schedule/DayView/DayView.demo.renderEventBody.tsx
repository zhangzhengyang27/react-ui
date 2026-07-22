import dayjs from 'dayjs';
import { ClockIcon, MapPinIcon } from '@phosphor-icons/react';
import { Group, Text } from '@xiaoye-react/ui';
import { DayView, ScheduleEventData } from '@xiaoye-react/schedule';
import { UIDemo } from '@xiaoye-react/demo';

const today = dayjs('2024-01-15').format('YYYY-MM-DD');

const events: ScheduleEventData[] = [
  {
    id: 1,
    title: '早间站会',
    start: `${today} 09:00:00`,
    end: `${today} 09:30:00`,
    color: 'blue',
    payload: { location: 'A 会议室' },
  },
  {
    id: 2,
    title: '客户会议',
    start: `${today} 11:00:00`,
    end: `${today} 12:00:00`,
    color: 'green',
    payload: { location: 'Video Call' },
  },
  {
    id: 3,
    title: '午餐休息',
    start: `${today} 12:30:00`,
    end: `${today} 13:30:00`,
    color: 'orange',
    payload: { location: 'Cafeteria' },
  },
];

const code = `
import dayjs from 'dayjs';
import { ClockIcon, MapPinIcon } from '@phosphor-icons/react';
import { Group, Text } from '@xiaoye-react/ui';
import { DayView, ScheduleEventData } from '@xiaoye-react/schedule';

const events: ScheduleEventData[] = [
  {
    id: 1,
    title: '早间站会',
    start: \`\${today} 09:00:00\`,
    end: \`\${today} 09:30:00\`,
    color: 'blue',
    payload: { location: 'A 会议室' },
  },
  // ... more events
];

function Demo() {
  return (
    <DayView
      date={new Date('2024-01-15')}
      events={events}
      startTime="08:00:00"
      endTime="18:00:00"
      renderEventBody={(event) => (
        <Group>
          <Text fz={12} fw={500}>
            {event.title}
          </Text>
          <Group gap={4}>
            <ClockIcon size={12} />
            <Text fz={10} lh={1}>
              {dayjs(event.start).format('h:mm A')}
            </Text>
          </Group>

          {event.payload?.location && (
            <Group gap={4}>
              <MapPinIcon size={12} />
              <Text fz={10}>{event.payload.location}</Text>
            </Group>
          )}
        </Group>
      )}
    />
  );
}
`;

function Demo() {
  return (
    <DayView
      date={new Date('2024-01-15')}
      events={events}
      startTime="08:00:00"
      endTime="18:00:00"
      renderEventBody={(event) => (
        <Group>
          <Text fz={12} fw={500}>
            {event.title}
          </Text>
          <Group gap={4}>
            <ClockIcon size={12} />
            <Text fz={10} lh={1}>
              {dayjs(event.start).format('h:mm A')}
            </Text>
          </Group>

          {event.payload?.location && (
            <Group gap={4}>
              <MapPinIcon size={12} />
              <Text fz={10}>{event.payload.location}</Text>
            </Group>
          )}
        </Group>
      )}
    />
  );
}

export const renderEventBody: UIDemo = {
  defaultExpanded: false,
  type: 'code',
  component: Demo,
  code,
};
