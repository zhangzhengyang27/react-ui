import { DatePicker } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { DatePicker } from '@xiaoye-react/ui';

function Demo() {
  return <DatePicker weekendDays={[1, 2]} />;
}
`;

function Demo() {
  return <DatePicker weekendDays={[1, 2]} />;
}

export const weekendDays: UIDemo = {
  type: 'code',
  centered: true,
  component: Demo,
  code,
};
