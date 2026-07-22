import { DayView } from '@xiaoye-react/schedule';
import { UIDemo } from '@xiaoye-react/demo';
import { dataCode, regularEvents } from './_data';

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
      slotHeight={80}
      allDaySlotHeight={60}
    />
  );
}
`;

function Demo() {
  return (
    <DayView
      date={new Date('2024-01-15')}
      events={regularEvents}
      startTime="08:00:00"
      endTime="18:00:00"
      slotHeight={80}
      allDaySlotHeight={60}
    />
  );
}

export const slotHeight: UIDemo = {
  defaultExpanded: false,
  type: 'code',
  component: Demo,
  code: [
    { code, language: 'tsx', fileName: '演示代码.tsx' },
    { code: dataCode, language: 'tsx', fileName: 'data.ts' },
  ],
};
