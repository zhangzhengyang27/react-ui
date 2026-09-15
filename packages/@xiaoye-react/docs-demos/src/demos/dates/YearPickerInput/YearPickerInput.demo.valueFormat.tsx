import { YearPickerInput } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { YearPickerInput } from '@xiaoye-react/ui';

function Demo() {
  return (
    <YearPickerInput valueFormat="YY" type="multiple" label="选择年份" placeholder="选择年份" />
  );
}
`;

function Demo() {
  return (
    <YearPickerInput valueFormat="YY" type="multiple" label="选择年份" placeholder="选择年份" />
  );
}

export const valueFormat: UIDemo = {
  type: 'code',
  centered: true,
  maxWidth: 400,
  component: Demo,
  code,
};
