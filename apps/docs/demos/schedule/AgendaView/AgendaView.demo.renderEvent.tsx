import dayjs from 'dayjs';
import { Badge, Box, Group, Text, UnstyledButton } from '@xiaoye-react/ui';
import { AgendaView, ScheduleEventData } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const today = dayjs('2024-01-15').format('YYYY-MM-DD');

const eventsData: ScheduleEventData[] = [
  {
    id: 'standup',
    title: '团队站会',
    start: `${today} 09:00:00`,
    end: `${today} 09:30:00`,
    color: 'blue',
    payload: { location: 'A 会议室', category: 'meeting' },
  },
  {
    id: 'workshop',
    title: '设计工作坊',
    start: `${today} 10:00:00`,
    end: `${today} 12:00:00`,
    color: 'grape',
    payload: { location: '创意空间', category: 'workshop' },
  },
  {
    id: 'review',
    title: '代码审查',
    start: dayjs('2024-01-15').add(1, 'day').format('YYYY-MM-DD 14:00:00'),
    end: dayjs('2024-01-15').add(1, 'day').format('YYYY-MM-DD 15:00:00'),
    color: 'green',
    payload: { location: 'Zoom', category: 'dev' },
  },
  {
    id: 'conference',
    title: '技术大会',
    start: dayjs('2024-01-15').add(2, 'day').format('YYYY-MM-DD 00:00:00'),
    end: dayjs('2024-01-15').add(3, 'day').startOf('day').format('YYYY-MM-DD HH:mm:ss'),
    color: 'red',
    payload: { location: 'Convention Center', category: 'event' },
  },
];

const code = `
import dayjs from 'dayjs';
import { Badge, Box, Group, Text, UnstyledButton } from '@xiaoye-react/ui';
import { AgendaView, ScheduleEventData } from '@xiaoye-react/ui';

const today = dayjs('2024-01-15').format('YYYY-MM-DD');

const events: ScheduleEventData[] = [
  {
    id: 'standup',
    title: '团队站会',
    start: \`\${today} 09:00:00\`,
    end: \`\${today} 09:30:00\`,
    color: 'blue',
    payload: { location: 'A 会议室', category: 'meeting' },
  },
  {
    id: 'workshop',
    title: '设计工作坊',
    start: \`\${today} 10:00:00\`,
    end: \`\${today} 12:00:00\`,
    color: 'grape',
    payload: { location: '创意空间', category: 'workshop' },
  },
  {
    id: 'review',
    title: '代码审查',
    start: dayjs('2024-01-15').add(1, 'day').format('YYYY-MM-DD 14:00:00'),
    end: dayjs('2024-01-15').add(1, 'day').format('YYYY-MM-DD 15:00:00'),
    color: 'green',
    payload: { location: 'Zoom', category: 'dev' },
  },
  {
    id: 'conference',
    title: '技术大会',
    start: dayjs('2024-01-15').add(2, 'day').format('YYYY-MM-DD 00:00:00'),
    end: dayjs('2024-01-15').add(3, 'day').startOf('day').format('YYYY-MM-DD HH:mm:ss'),
    color: 'red',
    payload: { location: 'Convention Center', category: 'event' },
  },
];

function Demo() {
  return (
    <AgendaView
      rangeStart={dayjs('2024-01-15').format('YYYY-MM-DD')}
      rangeEnd={dayjs('2024-01-15').add(7, 'day').format('YYYY-MM-DD')}
      events={events}
      renderEvent={(event, props) => (
        <UnstyledButton {...props}>
          <Box
            style={{
              display: 'flex',
              gap: 'var(--ui-spacing-sm)',
              padding: 'var(--ui-spacing-xs) var(--ui-spacing-sm)',
            }}
          >
            <Box
              style={{
                width: 4,
                borderRadius: 2,
                flexShrink: 0,
                backgroundColor: \`var(--ui-color-\${event.color}-filled)\`,
              }}
            />
            <div style={{ flex: 1 }}>
              <Group justify="space-between" wrap="nowrap">
                <Text size="sm" fw={500}>
                  {event.title}
                </Text>
                <Badge size="xs" variant="light" color={event.color}>
                  {event.payload?.category}
                </Badge>
              </Group>
              <Text size="xs" c="dimmed">
                {dayjs(event.start).format('HH:mm')} – {dayjs(event.end).format('HH:mm')}
              </Text>
              {event.payload?.location && (
                <Text size="xs" c="dimmed" mt={2}>
                  📍 {event.payload.location}
                </Text>
              )}
            </div>
          </Box>
        </UnstyledButton>
      )}
    />
  );
}
`;

function Demo() {
  return (
    <AgendaView
      rangeStart={dayjs('2024-01-15').format('YYYY-MM-DD')}
      rangeEnd={dayjs('2024-01-15').add(7, 'day').format('YYYY-MM-DD')}
      events={eventsData}
      renderEvent={(event, props) => (
        <UnstyledButton {...props}>
          <Box
            style={{
              display: 'flex',
              gap: 'var(--ui-spacing-sm)',
              padding: 'var(--ui-spacing-xs) var(--ui-spacing-sm)',
            }}
          >
            <Box
              style={{
                width: 4,
                borderRadius: 2,
                flexShrink: 0,
                backgroundColor: `var(--ui-color-${event.color}-filled)`,
              }}
            />
            <div style={{ flex: 1 }}>
              <Group justify="space-between" wrap="nowrap">
                <Text size="sm" fw={500}>
                  {event.title}
                </Text>
                <Badge size="xs" variant="light" color={event.color}>
                  {event.payload?.category}
                </Badge>
              </Group>
              <Text size="xs" c="dimmed">
                {dayjs(event.start).format('HH:mm')} – {dayjs(event.end).format('HH:mm')}
              </Text>
              {event.payload?.location && (
                <Text size="xs" c="dimmed" mt={2}>
                  {'\u{1F4CD}'} {event.payload.location}
                </Text>
              )}
            </div>
          </Box>
        </UnstyledButton>
      )}
    />
  );
}

export const renderEvent: UIDemo = {
  defaultExpanded: false,
  type: 'code',
  component: Demo,
  centered: true,
  maxWidth: 500,
  code,
};
