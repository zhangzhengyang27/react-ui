import dayjs from 'dayjs';
import { useState } from 'react';
import { Button, Group, Text } from '@react-ui/ui';
import { WeekView } from '@react-ui/schedule';
import { UIDemo } from '@react-ui/demo';
import { dataCode, regularEvents } from './_data';

const code = `
import { useState } from 'react';
import dayjs from 'dayjs';
import { WeekView } from '@react-ui/schedule';
import { Button, Group, Text } from '@react-ui/ui';
import { events } from './data';

function Demo() {
  const [date, setDate] = useState(dayjs('2024-01-15').format('YYYY-MM-DD'));
  const weekStart = dayjs(date).subtract((dayjs(date).day() + 6) % 7, 'day');

  return (
    <div>
      <Group mb="md">
        <Button onClick={() => setDate(dayjs(date).subtract(1, 'week').format('YYYY-MM-DD HH:mm:ss'))}>
          Previous Week
        </Button>
        <Text fw={500}>{weekStart.format('MMM D')} – {weekStart.add(6, 'day').format('MMM D, YYYY')}</Text>
        <Button onClick={() => setDate(dayjs(date).add(1, 'week').format('YYYY-MM-DD HH:mm:ss'))}>
          Next Week
        </Button>
      </Group>

      <WeekView
        date={date}
        onDateChange={setDate}
        events={events}
        startTime="08:00:00"
        endTime="18:00:00"
      />
    </div>
  );
}
`;

function Demo() {
  const [date, setDate] = useState(dayjs('2024-01-15').format('YYYY-MM-DD'));
  const weekStart = dayjs(date).subtract((dayjs(date).day() + 6) % 7, 'day');

  return (
    <div>
      <Group mb="md">
        <Button
          onClick={() => setDate(dayjs(date).subtract(1, 'week').format('YYYY-MM-DD HH:mm:ss'))}
        >
          Previous Week
        </Button>
        <Text fw={500}>
          {weekStart.format('MMM D')} – {weekStart.add(6, 'day').format('MMM D, YYYY')}
        </Text>
        <Button onClick={() => setDate(dayjs(date).add(1, 'week').format('YYYY-MM-DD HH:mm:ss'))}>
          Next Week
        </Button>
      </Group>

      <WeekView
        date={date}
        onDateChange={setDate}
        events={regularEvents}
        startTime="08:00:00"
        endTime="18:00:00"
      />
    </div>
  );
}

export const controlledDate: UIDemo = {
  defaultExpanded: false,
  type: 'code',
  component: Demo,
  code: [
    { code, language: 'tsx', fileName: '演示代码.tsx' },
    { code: dataCode, language: 'tsx', fileName: 'data.ts' },
  ],
};
