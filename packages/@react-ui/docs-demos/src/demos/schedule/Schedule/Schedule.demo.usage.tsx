import { Schedule } from '@react-ui/schedule';
import { UIDemo } from '@react-ui/demo';
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

export const usage: UIDemo = {
  defaultExpanded: false,
  type: 'code',
  component: Demo,
  code: [
    { code, language: 'tsx', fileName: '演示代码.tsx' },
    { code: dataCode, language: 'tsx', fileName: 'data.ts' },
  ],
};
