import { YearView } from '@react-ui/schedule';
import { UIDemo } from '@react-ui/demo';
import { regularEvents } from './_data';

const code = `
import { YearView } from '@react-ui/schedule';
import { events } from './data';

function Demo() {
  return <YearView date={new Date('2024-01-15')} events={events} withWeekNumbers />;
}
`;

function Demo() {
  return <YearView date={new Date('2024-01-15')} events={regularEvents} withWeekNumbers />;
}

export const withWeekNumbers: UIDemo = {
  defaultExpanded: false,
  type: 'code',
  component: Demo,
  code,
};
