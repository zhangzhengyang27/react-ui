import 'dayjs/locale/es';

import { MonthView } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';
import { dataCode, regularEvents } from './_data';

const code = `
import 'dayjs/locale/es';
import { MonthView } from '@xiaoye-react/ui';
import { events } from './data';

function Demo() {
  return (
    <MonthView
      date={new Date('2024-01-15')}
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
        more: 'Más',
        moreLabel: (hiddenEventsCount) => \`+\${hiddenEventsCount} más\`,
      }}
    />
  );
}
`;

function Demo() {
  return (
    <MonthView
      date={new Date('2024-01-15')}
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
        more: 'Más',
        moreLabel: (hiddenEventsCount) => `+${hiddenEventsCount} más`,
      }}
    />
  );
}

export const localization: UIDemo = {
  defaultExpanded: false,
  type: 'code',
  component: Demo,
  code: [
    { code, language: 'tsx', fileName: '演示代码.tsx' },
    { code: dataCode, language: 'tsx', fileName: 'data.ts' },
  ],
};
