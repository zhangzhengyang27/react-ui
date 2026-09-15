import dayjs from 'dayjs'
import { useState } from 'react'
import { ClockIcon } from '@phosphor-icons/react/dist/csr/Clock'
import { MapPinIcon } from '@phosphor-icons/react/dist/csr/MapPin'
import { Group, Text } from '@xiaoye-react/ui'
import { ScheduleEventData, WeekView } from '@xiaoye-react/ui'
import { UIDemo } from '@xiaoye-react/demo'

const startOfWeek = dayjs('2024-01-15')
    .subtract((dayjs('2024-01-15').day() + 6) % 7, 'day')
    .format('YYYY-MM-DD')
const dayAfterStartOfWeek = dayjs(startOfWeek).add(1, 'day').format('YYYY-MM-DD')

const events: ScheduleEventData[] = [
    {
        id: 1,
        title: '早间站会',
        start: `${startOfWeek} 09:00:00`,
        end: `${startOfWeek} 09:30:00`,
        color: 'blue',
        payload: { location: 'A 会议室' }
    },
    {
        id: 2,
        title: '客户会议',
        start: `${startOfWeek} 11:00:00`,
        end: `${startOfWeek} 12:00:00`,
        color: 'green',
        payload: { location: 'Video Call' }
    },
    {
        id: 3,
        title: '午餐休息',
        start: `${dayAfterStartOfWeek} 12:30:00`,
        end: `${dayAfterStartOfWeek} 13:30:00`,
        color: 'orange',
        payload: { location: 'Cafeteria' }
    }
]

const code = `
import dayjs from 'dayjs';
import { useState } from 'react';
import { ClockIcon } from '@phosphor-icons/react/dist/csr/Clock';
import { MapPinIcon } from '@phosphor-icons/react/dist/csr/MapPin';
import { Group, Text } from '@xiaoye-react/ui';
import { WeekView, ScheduleEventData } from '@xiaoye-react/ui';

const startOfWeek = dayjs('2024-01-15').subtract((dayjs('2024-01-15').day() + 6) % 7, 'day').format('YYYY-MM-DD');
const dayAfterStartOfWeek = dayjs(startOfWeek).add(1, 'day').format('YYYY-MM-DD');

const events: ScheduleEventData[] = [
  {
    id: 1,
    title: '早间站会',
    start: \`\${startOfWeek} 09:00:00\`,
    end: \`\${startOfWeek} 09:30:00\`,
    color: 'blue',
    payload: { location: 'A 会议室' },
  },
  {
    id: 2,
    title: '客户会议',
    start: \`\${startOfWeek} 11:00:00\`,
    end: \`\${startOfWeek} 12:00:00\`,
    color: 'green',
    payload: { location: 'Video Call' },
  },
  {
    id: 3,
    title: '午餐休息',
    start: \`\${dayAfterStartOfWeek} 12:30:00\`,
    end: \`\${dayAfterStartOfWeek} 13:30:00\`,
    color: 'orange',
    payload: { location: 'Cafeteria' },
  },
];

function Demo() {
  const [date, setDate] = useState(dayjs('2024-01-15').format('YYYY-MM-DD'));

  return (
    <WeekView
      date={date}
      onDateChange={setDate}
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
`

function Demo() {
    const [date, setDate] = useState(dayjs('2024-01-15').format('YYYY-MM-DD'))

    return (
        <WeekView
            date={date}
            onDateChange={setDate}
            events={events}
            startTime="08:00:00"
            endTime="18:00:00"
            renderEventBody={event => (
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
    )
}

export const renderEventBody: UIDemo = {
    defaultExpanded: false,
    type: 'code',
    component: Demo,
    code
}
