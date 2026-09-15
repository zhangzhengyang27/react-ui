import { YearView } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';
import { regularEvents } from './_data';

const code = `
import { YearView } from '@xiaoye-react/ui';
import { events } from './data';

function Demo() {
  return <YearView date={new Date('2024-01-15')} events={events} highlightToday={false} />;
}
`;

function Demo() {
  return <YearView date={new Date('2024-01-15')} events={regularEvents} highlightToday={false} />;
}

export const highlightToday: UIDemo = {
  defaultExpanded: false,
  type: 'code',
  component: Demo,
  code,
};
