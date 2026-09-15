import { DayView } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';
import { businessEvents, businessEventsCode } from './_data';

const code = `
import { DayView } from '@xiaoye-react/ui';
import { events } from './data';

function Demo() {
  return (
    <DayView
      date={new Date('2024-01-15')}
      events={events}
      highlightBusinessHours
      businessHours={['09:00:00', '17:00:00']}
    />
  );
}
`;

function Demo() {
  return (
    <DayView
      date={new Date('2024-01-15')}
      events={businessEvents}
      highlightBusinessHours
      businessHours={['09:00:00', '17:00:00']}
    />
  );
}

export const businessHours: UIDemo = {
  defaultExpanded: false,
  type: 'code',
  component: Demo,
  code: [
    { code, language: 'tsx', fileName: '演示代码.tsx' },
    { code: businessEventsCode, language: 'tsx', fileName: 'data.ts' },
  ],
};
