import { Schedule } from '@react-ui/schedule';
import { MantineDemo } from '@react-ui/demo';
import { events } from './_data';

const code = `
import { Schedule } from '@react-ui/schedule';
import { events } from './data';

function Demo() {
  return <Schedule events={events} defaultView="month" />;
}
`;

function Demo() {
  return <Schedule events={events} defaultView="month" />;
}

export const defaultView: MantineDemo = {
  defaultExpanded: false,
  type: 'code',
  component: Demo,
  code,
};
