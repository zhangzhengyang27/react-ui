import dayjs from 'dayjs';
import { MobileMonthView } from '@react-ui/schedule';
import { MantineDemo } from '@react-ui/demo';
import { regularEvents } from './_data';

const code = `
import dayjs from 'dayjs';
import { MobileMonthView } from '@react-ui/schedule';
import { events } from './data';

function Demo() {
  return (
    <MobileMonthView
      date={dayjs().format('YYYY-MM-DD')}
      selectedDate={dayjs().format('YYYY-MM-DD')}
      events={regularEvents}
      mode="static"
    />
  );
}
`;

function Demo() {
  return (
    <MobileMonthView
      date={dayjs().format('YYYY-MM-DD')}
      selectedDate={dayjs().format('YYYY-MM-DD')}
      events={regularEvents}
      mode="static"
    />
  );
}

export const staticMode: MantineDemo = {
  defaultExpanded: false,
  type: 'code',
  component: Demo,
  code,
  centered: true,
  maxWidth: 375,
};
