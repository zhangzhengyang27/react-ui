import { WeekView } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';
import { regularEvents } from './_data';

const code = `
import { WeekView } from '@xiaoye-react/ui';
import { events } from './data';

function Demo() {
  return (
    <WeekView
      date={new Date('2024-01-15')}
      events={events}
      startTime="08:00:00"
      endTime="18:00:00"
      withAllDaySlots={false}
    />
  );
}
`;

function Demo() {
  return (
    <WeekView
      date={new Date('2024-01-15')}
      events={regularEvents}
      startTime="08:00:00"
      endTime="18:00:00"
      withAllDaySlots={false}
    />
  );
}

export const withoutAllDaySlots: UIDemo = {
  defaultExpanded: false,
  type: 'code',
  component: Demo,
  code,
};
