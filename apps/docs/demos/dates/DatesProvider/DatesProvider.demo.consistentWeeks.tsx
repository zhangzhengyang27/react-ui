import { DatePicker, DatesProvider } from '@react-ui/dates';
import { UIDemo } from '@react-ui/demo';

const code = `
import { DatePicker, DatesProvider } from '@react-ui/dates';

function Demo() {
  return (
    <DatesProvider settings={{ consistentWeeks: true }}>
      <DatePicker />
    </DatesProvider>
  );
}
`;

function Demo() {
  return (
    <DatesProvider settings={{ consistentWeeks: true }}>
      <DatePicker />
    </DatesProvider>
  );
}

export const consistentWeeks: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
};
