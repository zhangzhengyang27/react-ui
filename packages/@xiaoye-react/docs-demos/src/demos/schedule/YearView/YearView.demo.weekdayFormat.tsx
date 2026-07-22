import { YearView } from '@xiaoye-react/schedule';
import { UIDemo } from '@xiaoye-react/demo';
import { regularEvents } from './_data';

const code = `
import { YearView } from '@xiaoye-react/schedule';
import { events } from './data';

function Demo() {
  return <YearView date={new Date('2024-01-15')} events={events} weekdayFormat="dd" />;
}
`;

function Demo() {
  return <YearView date={new Date('2024-01-15')} events={regularEvents} weekdayFormat="dd" />;
}

export const weekdayFormat: UIDemo = {
  defaultExpanded: false,
  type: 'code',
  component: Demo,
  code,
};
