import { Radio, Stack } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { Radio, Stack } from '@react-ui/ui';

function Demo() {
  return (
    <Stack>
      <Radio checked={false} onChange={() => {}} label="默认单选框" />
      <Radio checked onChange={() => {}} label="已选中单选框" />
      <Radio checked variant="outline" onChange={() => {}} label="轮廓已选中单选框" />
      <Radio disabled label="已禁用单选框" />
      <Radio disabled checked onChange={() => {}} label="已禁用已选中单选框" />
    </Stack>
  );
}
`;

function Demo() {
  return (
    <Stack>
      <Radio checked={false} onChange={() => {}} label="默认单选框" />
      <Radio checked onChange={() => {}} label="已选中单选框" />
      <Radio checked variant="outline" onChange={() => {}} label="轮廓已选中单选框" />
      <Radio disabled label="已禁用单选框" />
      <Radio disabled checked onChange={() => {}} label="已禁用已选中单选框" />
    </Stack>
  );
}

export const states: UIDemo = {
  type: 'code',
  component: Demo,
  code,
};
