import { Stack, Switch } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { Switch, Stack } from '@xiaoye-react/ui';

function Demo() {
  return (
    <Stack gap="xs">
      <Switch label="启用通知" description="关闭后不再接收任何推送" defaultChecked />
      <Switch label="同意条款" description="必选项" error="请先阅读条款" />
    </Stack>
  );
}
`;

function Demo() {
  return (
    <Stack gap="xs">
      <Switch label="启用通知" description="关闭后不再接收任何推送" defaultChecked />
      <Switch label="同意条款" description="必选项" error="请先阅读条款" />
    </Stack>
  );
}

export const descriptionAndError: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  title: '描述与错误',
  description: '`label` 下方可以再渲染一行 `description` 或 `error`；传 `error` 时轨道改用错误色（未选中时给轨道加错误色描边）。',
};
