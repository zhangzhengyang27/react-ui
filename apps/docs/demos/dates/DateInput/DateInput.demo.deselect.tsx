import { DateInput } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { DateInput } from '@xiaoye-react/ui';

function Demo() {
  return <DateInput allowDeselect label="日期输入" placeholder="日期输入" />;
}
`;

function Demo() {
  return <DateInput allowDeselect label="日期输入" placeholder="日期输入" />;
}

export const deselect: UIDemo = {
  type: 'code',
  centered: true,
  maxWidth: 400,
  component: Demo,
  code,
};
