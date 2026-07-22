import dayjs from 'dayjs';
import { useState } from 'react';
import { YearView } from '@xiaoye-react/schedule';
import { UIDemo } from '@xiaoye-react/demo';
import { dataCode, regularEvents } from './_data';

const code = `
import dayjs from 'dayjs';
import { useState } from 'react';
import { YearView } from '@xiaoye-react/schedule';
import { events } from './data';

function Demo() {
  const [date, setDate] = useState(dayjs('2024-01-15').format('YYYY-MM-DD'));

  return (
    <YearView
      date={date}
      onDateChange={setDate}
      events={events}
    />
  );
}
`;

function Demo() {
  const [date, setDate] = useState(dayjs('2024-01-15').format('YYYY-MM-DD'));

  return <YearView date={date} onDateChange={setDate} events={regularEvents} />;
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
