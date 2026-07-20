import { Checkbox, Stack } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { Checkbox, Stack } from '@react-ui/ui';

function Demo() {
  return (
    <Stack>
      <Checkbox label="带布尔错误" error />
      <Checkbox label="带错误信息" error="必须勾选" />
      <Checkbox label="带错误信息" error="无错误样式" withErrorStyles={false} />
    </Stack>
  );
}
`;

function Demo() {
  return (
    <Stack>
      <Checkbox label="带布尔错误" error />
      <Checkbox label="带错误信息" error="必须勾选" />
      <Checkbox label="带错误信息" error="无错误样式" withErrorStyles={false} />
    </Stack>
  );
}

export const error: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
};
