import { Schedule } from '@xiaoye-react/schedule';
import { UIDemo } from '@xiaoye-react/demo';
import { dataCode, events } from './_data';

const code = `
import { Schedule } from '@xiaoye-react/schedule';
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
