import { MonthView } from '@react-ui/schedule';
import { MantineDemo } from '@react-ui/demo';
import { dataCode, regularEvents } from './_data';

const code = `
import { MonthView } from '@react-ui/schedule';
import { events } from './data';

function Demo() {
  return <MonthView date={new Date()} events={events} withOutsideDays={false} />;
}
`;

function Demo() {
  return <MonthView date={new Date()} events={regularEvents} withOutsideDays={false} />;
}

export const withoutOutsideDays: MantineDemo = {
  defaultExpanded: false,
  type: 'code',
  component: Demo,
  code: [
    { code, language: 'tsx', fileName: 'Demo.tsx' },
    { code: dataCode, language: 'tsx', fileName: 'data.ts' },
  ],
};
