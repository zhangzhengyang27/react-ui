import { useState } from 'react';
import { Text } from '@xiaoye-react/ui';
import { DayView, ScheduleViewLevel } from '@xiaoye-react/schedule';
import { UIDemo } from '@xiaoye-react/demo';
import { dataCode, regularEvents } from './_data';

const code = `
import { useState } from 'react';
import { DayView, ScheduleViewLevel } from '@xiaoye-react/schedule';
import { Text } from '@xiaoye-react/ui';
import { events } from './data';

function Demo() {
  const [view, setView] = useState<ScheduleViewLevel>('day');

  return (
    <div>
      <Text mb="md">Selected view: {view}</Text>

      <DayView
        date={new Date('2024-01-15')}
        events={events}
        startTime="08:00:00"
        endTime="18:00:00"
        onViewChange={setView}
      />
    </div>
  );
}
`;

function Demo() {
  const [view, setView] = useState<ScheduleViewLevel>('day');

  return (
    <div>
      <Text mb="md">Selected view: {view}</Text>

      <DayView
        date={new Date('2024-01-15')}
        events={regularEvents}
        startTime="08:00:00"
        endTime="18:00:00"
        onViewChange={setView}
      />
    </div>
  );
}

export const viewChange: UIDemo = {
  defaultExpanded: false,
  type: 'code',
  component: Demo,
  code: [
    { code, language: 'tsx', fileName: '演示代码.tsx' },
    { code: dataCode, language: 'tsx', fileName: 'data.ts' },
  ],
};
