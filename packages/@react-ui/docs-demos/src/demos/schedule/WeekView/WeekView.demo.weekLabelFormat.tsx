import { WeekView } from '@react-ui/schedule';
import { MantineDemo } from '@react-ui/demo';
import { regularEvents } from './_data';

const code = `
import { WeekView } from '@react-ui/schedule';
import { events } from './data';

function Demo() {
  return (
    <WeekView
      date={new Date()}
      events={events}
      startTime="08:00:00"
      endTime="18:00:00"
      weekLabelFormat="MMMM D, YYYY"
    />
  );
}
`;

function Demo() {
  return (
    <WeekView
      date={new Date()}
      events={regularEvents}
      startTime="08:00:00"
      endTime="18:00:00"
      weekLabelFormat="MMMM D, YYYY"
    />
  );
}

export const weekLabelFormat: MantineDemo = {
  defaultExpanded: false,
  type: 'code',
  component: Demo,
  code,
};
