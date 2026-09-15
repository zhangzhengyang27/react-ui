import dayjs from 'dayjs';
import { useState } from 'react';
import { Stack, Text } from '@xiaoye-react/ui';
import { ResourcesWeekView } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';
import { dataCode, resourceEvents, resources } from './_data';

const code = `
import dayjs from 'dayjs';
import { useState } from 'react';
import { Stack, Text } from '@xiaoye-react/ui';
import { ResourcesWeekView } from '@xiaoye-react/ui';
import { events, resources } from './data';

function Demo() {
  const today = dayjs('2024-01-15').format('YYYY-MM-DD');
  const [date, setDate] = useState(today);

  return (
    <ResourcesWeekView
      date={date}
      onDateChange={setDate}
      resources={resources}
      events={events}
      startTime="08:00:00"
      endTime="18:00:00"
      startScrollDateTime={\`\${today} 08:00:00\`}
      renderResourceLabel={(resource) => (
        <Stack gap={2} align="flex-start">
          <Text size="sm" fw={600}>{resource.label}</Text>
          <Text size="xs" c="dimmed">2 楼</Text>
        </Stack>
      )}
    />
  );
}
`;

function Demo() {
  const [date, setDate] = useState(dayjs('2024-01-15').format('YYYY-MM-DD'));

  return (
    <ResourcesWeekView
      date={date}
      onDateChange={setDate}
      resources={resources}
      events={resourceEvents}
      startTime="08:00:00"
      endTime="18:00:00"
      startScrollDateTime={`${dayjs('2024-01-15').format('YYYY-MM-DD')} 08:00:00`}
      renderResourceLabel={(resource) => (
        <Stack gap={2} align="flex-start">
          <Text size="sm" fw={600}>
            {resource.label}
          </Text>
          <Text size="xs" c="dimmed">
            Floor 2
          </Text>
        </Stack>
      )}
    />
  );
}

export const renderResourceLabel: UIDemo = {
  defaultExpanded: false,
  type: 'code',
  component: Demo,
  code: [
    { code, language: 'tsx', fileName: '演示代码.tsx' },
    { code: dataCode, language: 'tsx', fileName: 'data.ts' },
  ],
};
