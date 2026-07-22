import { Stack, Switch } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { Switch, Stack } from '@xiaoye-react/ui';

function Demo() {
  return (
    <Stack>
      <Switch value="value" label="默认开关" />
      <Switch checked value="value" label="已选中的开关" />
      <Switch disabled value="value" label="已禁用开关" />
      <Switch checked disabled value="value" label="已禁用且已选中开关" />
    </Stack>
  );
}
`;

function Demo() {
  return (
    <Stack>
      <Switch checked={false} value="value" label="默认开关" />
      <Switch checked value="value" label="已选中的开关" />
      <Switch disabled value="value" label="已禁用开关" />
      <Switch checked disabled value="value" label="已禁用且已选中开关" />
    </Stack>
  );
}

export const states: UIDemo = {
  type: 'code',
  centered: true,
  component: Demo,
  code,
};
