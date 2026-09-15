import { YearView } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';
import { regularEvents } from './_data';

const code = `
import { YearView } from '@xiaoye-react/ui';
import { events } from './data';

function Demo() {
  return <YearView date={new Date('2024-01-15')} events={events} mode="static" />;
}
`;

function Demo() {
  return <YearView date={new Date('2024-01-15')} events={regularEvents} mode="static" />;
}

export const staticMode: UIDemo = {
  defaultExpanded: false,
  type: 'code',
  component: Demo,
  code,
};
