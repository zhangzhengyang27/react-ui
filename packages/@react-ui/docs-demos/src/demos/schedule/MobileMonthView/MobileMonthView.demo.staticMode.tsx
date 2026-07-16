import dayjs from 'dayjs';
import { MobileMonthView } from '@react-ui/schedule';
import { UIDemo } from '@react-ui/demo';
import { regularEvents } from './_data';

const code = `
import dayjs from 'dayjs';
import { MobileMonthView } from '@react-ui/schedule';
import { events } from './data';

function Demo() {
  return (
    <MobileMonthView
      date={dayjs('2024-01-15').format('YYYY-MM-DD')}
      selectedDate={dayjs('2024-01-15').format('YYYY-MM-DD')}
      events={regularEvents}
      mode="static"
    />
  );
}
`;

function Demo() {
  return (
    <MobileMonthView
      date={dayjs('2024-01-15').format('YYYY-MM-DD')}
      selectedDate={dayjs('2024-01-15').format('YYYY-MM-DD')}
      events={regularEvents}
      mode="static"
    />
  );
}

export const staticMode: UIDemo = {
  defaultExpanded: false,
  type: 'code',
  component: Demo,
  code,
  centered: true,
  maxWidth: 375,
};
