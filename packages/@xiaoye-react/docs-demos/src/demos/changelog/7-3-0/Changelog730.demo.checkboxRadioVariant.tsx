import { Checkbox, Radio, Stack } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { Radio, Checkbox, Stack } from '@xiaoye-react/ui';

function Demo() {
  return (
    <Stack gap={7}>
      <Checkbox variant="outline" label="轮廓复选框" defaultChecked />
      <Checkbox variant="outline" label="轮廓不确定复选框" indeterminate />
      <Radio variant="outline" label="轮廓单选框" defaultChecked />
    </Stack>
  );
}
`;

function Demo() {
  return (
    <Stack gap={7}>
      <Checkbox variant="outline" label="轮廓复选框" defaultChecked />
      <Checkbox variant="outline" label="轮廓不确定复选框" indeterminate />
      <Radio variant="outline" label="轮廓单选框" defaultChecked />
    </Stack>
  );
}

export const checkboxRadioVariant: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
};
