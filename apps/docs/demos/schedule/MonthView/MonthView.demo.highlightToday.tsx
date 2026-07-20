import { MonthView } from '@react-ui/schedule';
import { UIDemo } from '@react-ui/demo';
import { dataCode, regularEvents } from './_data';

const code = `
import { MonthView } from '@react-ui/schedule';
import { events } from './data';

function Demo() {
  return <MonthView date={new Date('2024-01-15')} events={events} highlightToday={false} />;
}
`;

function Demo() {
  return <MonthView date={new Date('2024-01-15')} events={regularEvents} highlightToday={false} />;
}

export const highlightToday: UIDemo = {
  defaultExpanded: false,
  type: 'code',
  component: Demo,
  code: [
    { code, language: 'tsx', fileName: '演示代码.tsx' },
    { code: dataCode, language: 'tsx', fileName: 'data.ts' },
  ],
};
