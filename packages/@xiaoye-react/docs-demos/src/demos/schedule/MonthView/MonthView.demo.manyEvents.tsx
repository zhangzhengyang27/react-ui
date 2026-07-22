import { MonthView } from '@xiaoye-react/schedule';
import { UIDemo } from '@xiaoye-react/demo';
import { manyEventsCode, manyEvents as manyEventsData } from './_data';

const code = `
import { MonthView } from '@xiaoye-react/schedule';
import { events } from './data';

function Demo() {
  return <MonthView date={new Date('2024-01-15')} events={events} />;
}
`;

function Demo() {
  return <MonthView date={new Date('2024-01-15')} events={manyEventsData} />;
}

export const manyEvents: UIDemo = {
  defaultExpanded: false,
  type: 'code',
  component: Demo,
  code: [
    { code, language: 'tsx', fileName: '演示代码.tsx' },
    { code: manyEventsCode, language: 'tsx', fileName: 'data.ts' },
  ],
};
