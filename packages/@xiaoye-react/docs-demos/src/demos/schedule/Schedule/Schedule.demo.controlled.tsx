import { useState } from 'react';
import { Text } from '@xiaoye-react/ui';
import { Schedule, ScheduleViewLevel } from '@xiaoye-react/schedule';
import { UIDemo } from '@xiaoye-react/demo';
import { events } from './_data';

const code = `
import { useState } from 'react';
import { Text } from '@xiaoye-react/ui';
import { Schedule, ScheduleViewLevel } from '@xiaoye-react/schedule';
import { events } from './data';

function Demo() {
  const [view, setView] = useState<ScheduleViewLevel>('week');
  const [date, setDate] = useState(new Date('2024-01-15'));

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
  const [date, setDate] = useState(new Date('2024-01-15'));

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

export const controlled: UIDemo = {
  defaultExpanded: false,
  type: 'code',
  component: Demo,
  code,
};
