import { Schedule } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';
import { events } from './_data';

const code = `
import { Schedule } from '@xiaoye-react/ui';
import { events } from './data';

function Demo() {
  return <Schedule events={events} defaultView="month" />;
}
`;

function Demo() {
  return <Schedule events={events} defaultView="month" />;
}

export const defaultView: UIDemo = {
  defaultExpanded: false,
  type: 'code',
  component: Demo,
  code,
};
