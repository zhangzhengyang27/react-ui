import { DatePicker } from '@xiaoye-react/dates';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { DatePicker } from '@xiaoye-react/dates';

function Demo() {
  return <DatePicker hideOutsideDates />;
}
`;

function Demo() {
  return <DatePicker hideOutsideDates />;
}

export const hideOutsideDates: UIDemo = {
  type: 'code',
  centered: true,
  component: Demo,
  code,
};
