import { WeekView } from '@react-ui/schedule';
import { UIDemo } from '@react-ui/demo';
import { regularEvents } from './_data';

const code = `
import { WeekView } from '@react-ui/schedule';
import { events } from './data';

function Demo() {
  return (
    <WeekView
      date={new Date('2024-01-15')}
      events={events}
      startTime="08:00:00"
      endTime="18:00:00"
      slotLabelFormat="h A"
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
      slotLabelFormat="h A"
    />
  );
}

export const slotLabelFormat: UIDemo = {
  defaultExpanded: false,
  type: 'code',
  component: Demo,
  code,
};
