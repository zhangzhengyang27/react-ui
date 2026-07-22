import dayjs from 'dayjs';
import { useState } from 'react';
import { Modal, Stack, Text } from '@xiaoye-react/ui';
import { AgendaView, ScheduleEventData } from '@xiaoye-react/schedule';
import { UIDemo } from '@xiaoye-react/demo';

const today = dayjs('2024-01-15').format('YYYY-MM-DD');

const eventsData: ScheduleEventData[] = [
  {
    id: 'standup',
    title: '团队站会',
    start: `${today} 09:00:00`,
    end: `${today} 09:30:00`,
    color: 'blue',
    payload: { description: '每日团队同步', location: 'A 会议室' },
  },
  {
    id: 'workshop',
    title: '设计工作坊',
    start: `${today} 10:00:00`,
    end: `${today} 12:00:00`,
    color: 'grape',
    payload: { description: '协作设计会议', location: '创意空间' },
  },
  {
    id: 'review',
    title: '代码审查',
    start: dayjs('2024-01-15').add(1, 'day').format('YYYY-MM-DD 14:00:00'),
    end: dayjs('2024-01-15').add(1, 'day').format('YYYY-MM-DD 15:00:00'),
    color: 'green',
    payload: { description: '评审拉取请求', location: 'Zoom' },
  },
];

const code = `
import dayjs from 'dayjs';
import { useState } from 'react';
import { Modal, Stack, Text } from '@xiaoye-react/ui';
import { AgendaView, ScheduleEventData } from '@xiaoye-react/schedule';

const today = dayjs('2024-01-15').format('YYYY-MM-DD');

const events: ScheduleEventData[] = [
  {
    id: 'standup',
    title: '团队站会',
    start: \`\${today} 09:00:00\`,
    end: \`\${today} 09:30:00\`,
    color: 'blue',
    payload: { description: '每日团队同步', location: 'A 会议室' },
  },
  {
    id: 'workshop',
    title: '设计工作坊',
    start: \`\${today} 10:00:00\`,
    end: \`\${today} 12:00:00\`,
    color: 'grape',
    payload: { description: '协作设计会议', location: '创意空间' },
  },
  {
    id: 'review',
    title: '代码审查',
    start: dayjs('2024-01-15').add(1, 'day').format('YYYY-MM-DD 14:00:00'),
    end: dayjs('2024-01-15').add(1, 'day').format('YYYY-MM-DD 15:00:00'),
    color: 'green',
    payload: { description: '评审拉取请求', location: 'Zoom' },
  },
];

function Demo() {
  const [selected, setSelected] = useState<ScheduleEventData | null>(null);

  return (
    <>
      <AgendaView
        rangeStart={dayjs('2024-01-15').format('YYYY-MM-DD')}
        rangeEnd={dayjs('2024-01-15').add(7, 'day').format('YYYY-MM-DD')}
        events={events}
        onEventClick={(event) => setSelected(event)}
      />

      <Modal
        opened={selected !== null}
        onClose={() => setSelected(null)}
        title={selected?.title}
      >
        {selected && (
          <Stack gap="xs">
            <Text size="sm" c="dimmed">
              {dayjs(selected.start).format('MMM D, YYYY HH:mm')} –{' '}
              {dayjs(selected.end).format('HH:mm')}
            </Text>
            {selected.payload?.description && (
              <Text size="sm">{selected.payload.description}</Text>
            )}
            {selected.payload?.location && (
              <Text size="sm" c="dimmed">
                Location: {selected.payload.location}
              </Text>
            )}
          </Stack>
        )}
      </Modal>
    </>
  );
}
`;

function Demo() {
  const [selected, setSelected] = useState<ScheduleEventData | null>(null);

  return (
    <>
      <AgendaView
        rangeStart={dayjs('2024-01-15').format('YYYY-MM-DD')}
        rangeEnd={dayjs('2024-01-15').add(7, 'day').format('YYYY-MM-DD')}
        events={eventsData}
        onEventClick={(event) => setSelected(event)}
      />

      <Modal opened={selected !== null} onClose={() => setSelected(null)} title={selected?.title}>
        {selected && (
          <Stack gap="xs">
            <Text size="sm" c="dimmed">
              {dayjs(selected.start).format('MMM D, YYYY HH:mm')} –{' '}
              {dayjs(selected.end).format('HH:mm')}
            </Text>
            {selected.payload?.description && <Text size="sm">{selected.payload.description}</Text>}
            {selected.payload?.location && (
              <Text size="sm" c="dimmed">
                Location: {selected.payload.location}
              </Text>
            )}
          </Stack>
        )}
      </Modal>
    </>
  );
}

export const eventClick: UIDemo = {
  defaultExpanded: false,
  type: 'code',
  component: Demo,
  centered: true,
  maxWidth: 500,
  code,
};
