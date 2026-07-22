import dayjs from 'dayjs';
import { AgendaView } from '@xiaoye-react/schedule';
import { UIDemo } from '@xiaoye-react/demo';
import { dataCode, regularEvents } from './_data';

const code = `
import dayjs from 'dayjs';
import { AgendaView } from '@xiaoye-react/schedule';
import { events } from './data';

function Demo() {
  return (
    <AgendaView
      rangeStart={dayjs('2024-01-15').startOf('month').format('YYYY-MM-DD')}
      rangeEnd={dayjs('2024-01-15').endOf('month').format('YYYY-MM-DD')}
      events={events}
      mode="static"
    />
  );
}
`;

function Demo() {
  return (
    <AgendaView
      rangeStart={dayjs('2024-01-15').startOf('month').format('YYYY-MM-DD')}
      rangeEnd={dayjs('2024-01-15').endOf('month').format('YYYY-MM-DD')}
      events={regularEvents}
      mode="static"
    />
  );
}

export const staticMode: UIDemo = {
  defaultExpanded: false,
  type: 'code',
  component: Demo,
  centered: true,
  maxWidth: 500,
  code: [
    { code, language: 'tsx', fileName: '演示代码.tsx' },
    { code: dataCode, language: 'tsx', fileName: 'data.ts' },
  ],
};
