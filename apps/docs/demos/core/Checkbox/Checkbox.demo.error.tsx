import { Checkbox, Stack } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { Checkbox, Stack } from '@xiaoye-react/ui';

function Demo() {
  return (
    <Stack>
      <Checkbox label="带布尔错误" error />
      <Checkbox label="带错误信息" error="必须勾选" />
    </Stack>
  );
}
`;

function Demo() {
  return (
    <Stack>
      <Checkbox label="带布尔错误" error />
      <Checkbox label="带错误信息" error="必须勾选" />
    </Stack>
  );
}

export const error: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
};
