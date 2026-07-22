import { WeekView } from '@xiaoye-react/schedule';
import { UIDemo } from '@xiaoye-react/demo';
import { regularEvents } from './_data';

const code = `
import { WeekView } from '@xiaoye-react/schedule';
import { events } from './data';

function Demo() {
  return (
    <WeekView
      date={new Date('2024-01-15')}
      events={events}
      startTime="08:00:00"
      endTime="18:00:00"
      highlightToday
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
      highlightToday
    />
  );
}

export const highlightToday: UIDemo = {
  defaultExpanded: false,
  type: 'code',
  component: Demo,
  code,
};
