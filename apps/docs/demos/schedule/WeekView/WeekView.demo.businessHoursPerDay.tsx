import { WeekView } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';
import { businessEvents } from './_data';

const code = `
import { WeekView } from '@xiaoye-react/ui';
import { events } from './data';

function Demo() {
  return (
    <WeekView
      date={new Date('2024-01-15')}
      events={events}
      highlightBusinessHours
      businessHours={{
        1: ['09:00:00', '17:00:00'],
        2: ['09:00:00', '17:00:00'],
        3: ['09:00:00', '17:00:00'],
        4: ['09:00:00', '17:00:00'],
        5: ['09:00:00', '13:00:00'],
      }}
      startTime="07:00:00"
      endTime="20:00:00"
    />
  );
}
`;

function Demo() {
  return (
    <WeekView
      date={new Date('2024-01-15')}
      events={businessEvents}
      highlightBusinessHours
      businessHours={{
        1: ['09:00:00', '17:00:00'],
        2: ['09:00:00', '17:00:00'],
        3: ['09:00:00', '17:00:00'],
        4: ['09:00:00', '17:00:00'],
        5: ['09:00:00', '13:00:00'],
      }}
      startTime="07:00:00"
      endTime="20:00:00"
    />
  );
}

export const businessHoursPerDay: UIDemo = {
  defaultExpanded: false,
  type: 'code',
  component: Demo,
  code,
};
