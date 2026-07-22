import { WeekView } from '@xiaoye-react/schedule';
import { UIDemo } from '@xiaoye-react/demo';
import { regularEvents } from './_data';

const code = `
import { WeekView } from '@xiaoye-react/schedule';
import { events } from './data';

function Demo() {
  return (
    <WeekView
      date="2030-06-10"
      events={events}
      withCurrentTimeIndicator
      forceCurrentTimeIndicator
    />
  );
}
`;

function Demo() {
  return (
    <WeekView
      date="2030-06-10"
      events={regularEvents}
      withCurrentTimeIndicator
      forceCurrentTimeIndicator
    />
  );
}

export const forceCurrentTimeIndicator: UIDemo = {
  defaultExpanded: false,
  type: 'code',
  component: Demo,
  code,
};
