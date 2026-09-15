import 'dayjs/locale/es';

import dayjs from 'dayjs';
import { AgendaView } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const today = dayjs('2024-01-15').format('YYYY-MM-DD');

const eventsData = [
  {
    id: 'standup',
    title: 'Reunión diaria',
    start: `${today} 09:00:00`,
    end: `${today} 09:30:00`,
    color: 'blue',
  },
  {
    id: 'workshop',
    title: 'Taller de diseño',
    start: dayjs('2024-01-15').add(1, 'day').format('YYYY-MM-DD 10:00:00'),
    end: dayjs('2024-01-15').add(1, 'day').format('YYYY-MM-DD 12:00:00'),
    color: 'grape',
  },
  {
    id: 'conference',
    title: 'Conferencia',
    start: dayjs('2024-01-15').add(3, 'day').format('YYYY-MM-DD 00:00:00'),
    end: dayjs('2024-01-15').add(4, 'day').startOf('day').format('YYYY-MM-DD HH:mm:ss'),
    color: 'red',
  },
];

const code = `
import 'dayjs/locale/es';

import dayjs from 'dayjs';
import { AgendaView } from '@xiaoye-react/ui';

const today = dayjs('2024-01-15').format('YYYY-MM-DD');

const events = [
  {
    id: 'standup',
    title: 'Reunión diaria',
    start: \`\${today} 09:00:00\`,
    end: \`\${today} 09:30:00\`,
    color: 'blue',
  },
  {
    id: 'workshop',
    title: 'Taller de diseño',
    start: dayjs('2024-01-15').add(1, 'day').format('YYYY-MM-DD 10:00:00'),
    end: dayjs('2024-01-15').add(1, 'day').format('YYYY-MM-DD 12:00:00'),
    color: 'grape',
  },
  {
    id: 'conference',
    title: 'Conferencia',
    start: dayjs('2024-01-15').add(3, 'day').format('YYYY-MM-DD 00:00:00'),
    end: dayjs('2024-01-15').add(4, 'day').startOf('day').format('YYYY-MM-DD HH:mm:ss'),
    color: 'red',
  },
];

function Demo() {
  return (
    <AgendaView
      rangeStart={dayjs('2024-01-15').format('YYYY-MM-DD')}
      rangeEnd={dayjs('2024-01-15').add(7, 'day').format('YYYY-MM-DD')}
      events={events}
      locale="es"
      labels={{
        allDay: 'Todo el día',
        noEvents: 'Sin eventos',
      }}
    />
  );
}
`;

function Demo() {
  return (
    <AgendaView
      rangeStart={dayjs('2024-01-15').format('YYYY-MM-DD')}
      rangeEnd={dayjs('2024-01-15').add(7, 'day').format('YYYY-MM-DD')}
      events={eventsData}
      locale="es"
      labels={{
        allDay: 'Todo el día',
        noEvents: 'Sin eventos',
      }}
    />
  );
}

export const localization: UIDemo = {
  defaultExpanded: false,
  type: 'code',
  component: Demo,
  centered: true,
  maxWidth: 500,
  code,
};
