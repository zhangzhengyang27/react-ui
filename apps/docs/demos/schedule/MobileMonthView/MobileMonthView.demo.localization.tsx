import 'dayjs/locale/es';

import dayjs from 'dayjs';
import { useState } from 'react';
import { MobileMonthView } from '@react-ui/schedule';
import { UIDemo } from '@react-ui/demo';
import { dataCode, regularEvents } from './_data';

const code = `
import 'dayjs/locale/es';
import dayjs from 'dayjs';
import { useState } from 'react';
import { MobileMonthView } from '@react-ui/schedule';
import { events } from './data';

function Demo() {
  const [date, setDate] = useState(dayjs('2024-01-15').format('YYYY-MM-DD'));
  const [selectedDate, setSelectedDate] = useState<string | null>(dayjs('2024-01-15').format('YYYY-MM-DD'));

  return (
    <MobileMonthView
      date={date}
      onDateChange={setDate}
      selectedDate={selectedDate}
      onSelectedDateChange={setSelectedDate}
      events={events}
      locale="es"
      labels={{
        day: 'Día',
        week: 'Semana',
        month: 'Mes',
        year: 'Año',
        today: 'Hoy',
        previous: 'Anterior',
        next: 'Siguiente',
        noEvents: 'Sin eventos',
      }}
    />
  );
}
`;

function Demo() {
  const [date, setDate] = useState(dayjs('2024-01-15').format('YYYY-MM-DD'));
  const [selectedDate, setSelectedDate] = useState<string | null>(dayjs('2024-01-15').format('YYYY-MM-DD'));

  return (
    <MobileMonthView
      date={date}
      onDateChange={setDate}
      selectedDate={selectedDate}
      onSelectedDateChange={setSelectedDate}
      events={regularEvents}
      locale="es"
      labels={{
        day: 'Día',
        week: 'Semana',
        month: 'Mes',
        year: 'Año',
        today: 'Hoy',
        previous: 'Anterior',
        next: 'Siguiente',
        noEvents: 'Sin eventos',
      }}
    />
  );
}

export const localization: UIDemo = {
  defaultExpanded: false,
  type: 'code',
  centered: true,
  maxWidth: 375,
  component: Demo,
  code: [
    { code, language: 'tsx', fileName: '演示代码.tsx' },
    { code: dataCode, language: 'tsx', fileName: 'data.ts' },
  ],
};
