import { DayView } from '@react-ui/schedule';
import { MantineDemo } from '@react-ui/demo';
import { businessEvents, businessEventsCode } from './_data';

const code = `
import { DayView } from '@react-ui/schedule';
import { events } from './data';

function Demo() {
  return (
    <DayView
      date={new Date()}
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
      date={new Date()}
      events={businessEvents}
      highlightBusinessHours
      businessHours={['09:00:00', '17:00:00']}
    />
  );
}

export const businessHours: MantineDemo = {
  defaultExpanded: false,
  type: 'code',
  component: Demo,
  code: [
    { code, language: 'tsx', fileName: 'Demo.tsx' },
    { code: businessEventsCode, language: 'tsx', fileName: 'data.ts' },
  ],
};
