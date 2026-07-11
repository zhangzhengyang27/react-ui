import { Schedule } from '@react-ui/schedule';
import { MantineDemo } from '@react-ui/demo';
import { dataCode, events } from './_data';

const code = `
import { Schedule } from '@react-ui/schedule';
import { events } from './data';

function Demo() {
  return <Schedule events={events} />;
}
`;

function Demo() {
  return <Schedule events={events} />;
}

export const usage: MantineDemo = {
  defaultExpanded: false,
  type: 'code',
  component: Demo,
  code: [
    { code, language: 'tsx', fileName: 'Demo.tsx' },
    { code: dataCode, language: 'tsx', fileName: 'data.ts' },
  ],
};
