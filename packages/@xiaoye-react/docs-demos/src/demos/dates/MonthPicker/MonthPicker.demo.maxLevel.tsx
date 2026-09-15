import { MonthPicker } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { MonthPicker } from '@xiaoye-react/ui';

function Demo() {
  return <MonthPicker maxLevel="year" />;
}
`;

function Demo() {
  return <MonthPicker maxLevel="year" />;
}

export const maxLevel: UIDemo = {
  type: 'code',
  centered: true,
  component: Demo,
  code,
};
