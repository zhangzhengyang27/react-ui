import dayjs from 'dayjs';
import { useState } from 'react';
import { SegmentedControl, Stack } from '@react-ui/ui';
import { ResourcesDayView } from '@react-ui/schedule';
import { UIDemo } from '@react-ui/demo';
import { dataCode, resourceEvents, resources } from './_data';

const code = `
import dayjs from 'dayjs';
import { useState } from 'react';
import { SegmentedControl, Stack } from '@react-ui/ui';
import { ResourcesDayView } from '@react-ui/schedule';
import { events, resources } from './data';

function Demo() {
  const [date, setDate] = useState(dayjs('2024-01-15').format('YYYY-MM-DD'));
  const [intervalMinutes, setIntervalMinutes] = useState('120');

  return (
    <Stack>
      <SegmentedControl
        value={intervalMinutes}
        onChange={setIntervalMinutes}
        data={[
          { label: '1 hour', value: '60' },
          { label: '2 hours', value: '120' },
          { label: '4 hours', value: '240' },
        ]}
      />
      <ResourcesDayView
        date={date}
        onDateChange={setDate}
        resources={resources}
        events={events}
        intervalMinutes={Number(intervalMinutes)}
        startScrollTime="08:00:00"
      />
    </Stack>
  );
}
`;

function Demo() {
  const [date, setDate] = useState(dayjs('2024-01-15').format('YYYY-MM-DD'));
  const [intervalMinutes, setIntervalMinutes] = useState('120');

  return (
    <Stack>
      <SegmentedControl
        value={intervalMinutes}
        onChange={setIntervalMinutes}
        data={[
          { label: '1 hour', value: '60' },
          { label: '2 hours', value: '120' },
          { label: '4 hours', value: '240' },
        ]}
      />
      <ResourcesDayView
        date={date}
        onDateChange={setDate}
        resources={resources}
        events={resourceEvents}
        intervalMinutes={Number(intervalMinutes)}
        startScrollTime="08:00:00"
      />
    </Stack>
  );
}

export const multiHourIntervals: UIDemo = {
  defaultExpanded: false,
  type: 'code',
  component: Demo,
  code: [
    { code, language: 'tsx', fileName: '演示代码.tsx' },
    { code: dataCode, language: 'tsx', fileName: 'data.ts' },
  ],
};
