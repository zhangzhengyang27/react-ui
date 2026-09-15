import { DatePicker, DatesProvider } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { DatePicker, DatesProvider } from '@xiaoye-react/ui';

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
