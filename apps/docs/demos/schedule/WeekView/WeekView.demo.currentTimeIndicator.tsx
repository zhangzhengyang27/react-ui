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
      withCurrentTimeIndicator
      withCurrentTimeBubble
    />
  );
}
`;

function Demo() {
  return (
    <WeekView
      date={new Date('2024-01-15')}
      events={regularEvents}
      withCurrentTimeIndicator
      withCurrentTimeBubble
    />
  );
}

export const currentTimeIndicator: UIDemo = {
  defaultExpanded: false,
  type: 'code',
  component: Demo,
  code,
};
