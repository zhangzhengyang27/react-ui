import { MonthView } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';
import { dataCode, regularEvents } from './_data';

const code = `
import { MonthView } from '@xiaoye-react/ui';
import { events } from './data';

function Demo() {
  return <MonthView date={new Date('2024-01-15')} events={events} radius={0} />;
}
`;

function Demo() {
  return <MonthView date={new Date('2024-01-15')} events={regularEvents} radius={0} />;
}

export const radius: UIDemo = {
  defaultExpanded: false,
  type: 'code',
  component: Demo,
  code: [
    { code, language: 'tsx', fileName: '演示代码.tsx' },
    { code: dataCode, language: 'tsx', fileName: 'data.ts' },
  ],
};
