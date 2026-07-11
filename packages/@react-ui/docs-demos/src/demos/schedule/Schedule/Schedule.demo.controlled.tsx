import { useState } from 'react';
import { Text } from '@react-ui/ui';
import { Schedule, ScheduleViewLevel } from '@react-ui/schedule';
import { MantineDemo } from '@react-ui/demo';
import { events } from './_data';

const code = `
import { useState } from 'react';
import { Text } from '@react-ui/ui';
import { Schedule, ScheduleViewLevel } from '@react-ui/schedule';
import { events } from './data';

function Demo() {
  const [view, setView] = useState<ScheduleViewLevel>('week');
  const [date, setDate] = useState(new Date());

  return (
    <div>
      <Text size="sm" mb="md">
        Current view: <b>{view}</b>
      </Text>

      <Schedule
        view={view}
        onViewChange={setView}
        date={date}
        onDateChange={(newDate) => setDate(new Date(newDate))}
        events={events}
      />
    </div>
  );
}
`;

function Demo() {
  const [view, setView] = useState<ScheduleViewLevel>('week');
  const [date, setDate] = useState(new Date());

  return (
    <div>
      <Text size="sm" mb="md">
        Current view: <b>{view}</b>
      </Text>

      <Schedule
        view={view}
        onViewChange={setView}
        date={date}
        onDateChange={(newDate) => setDate(new Date(newDate))}
        events={events}
      />
    </div>
  );
}

export const controlled: MantineDemo = {
  defaultExpanded: false,
  type: 'code',
  component: Demo,
  code,
};
