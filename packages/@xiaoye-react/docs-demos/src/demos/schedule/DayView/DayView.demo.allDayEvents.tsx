import { DayView } from '@xiaoye-react/schedule';
import { UIDemo } from '@xiaoye-react/demo';
import { allDayEventsCode, allDayEvents as allDayEventsData } from './_data';

const code = `
import { DayView } from '@xiaoye-react/schedule';
import { events } from './data';

function Demo() {
  return (
    <DayView
      date={new Date('2024-01-15')}
      events={events}
      startTime="08:00:00"
      endTime="18:00:00"
    />
  );
}
`;

function Demo() {
  return (
    <DayView date={new Date('2024-01-15')} events={allDayEventsData} startTime="08:00:00" endTime="18:00:00" />
  );
}

export const allDayEvents: UIDemo = {
  defaultExpanded: false,
  type: 'code',
  component: Demo,
  code: [
    { code, language: 'tsx', fileName: '演示代码.tsx' },
    { code: allDayEventsCode, language: 'tsx', fileName: 'data.ts' },
  ],
};
