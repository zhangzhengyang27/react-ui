import { Checkbox, Stack } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { Checkbox, Stack } from '@xiaoye-react/ui';

function Demo() {
  return (
    <Stack>
      <Checkbox checked={false} onChange={() => {}} label="默认复选框" />
      <Checkbox checked={false} onChange={() => {}} indeterminate label="不确定复选框" />
      <Checkbox checked onChange={() => {}} label="已选中复选框" />
      <Checkbox checked variant="outline" onChange={() => {}} label="轮廓已选中复选框" />
      <Checkbox
        variant="outline"
        onChange={() => {}}
        indeterminate
        label="轮廓不确定复选框"
      />
      <Checkbox disabled label="已禁用复选框" />
      <Checkbox disabled checked onChange={() => {}} label="已禁用已选中复选框" />
      <Checkbox disabled indeterminate label="已禁用不确定复选框" />
    </Stack>
  );
}
`;

function Demo() {
  return (
    <Stack>
      <Checkbox checked={false} onChange={() => {}} label="默认复选框" />
      <Checkbox checked={false} onChange={() => {}} indeterminate label="不确定复选框" />
      <Checkbox checked onChange={() => {}} label="已选中复选框" />
      <Checkbox checked variant="outline" onChange={() => {}} label="轮廓已选中复选框" />
      <Checkbox
        variant="outline"
        onChange={() => {}}
        indeterminate
        label="轮廓不确定复选框"
      />
      <Checkbox disabled label="已禁用复选框" />
      <Checkbox disabled checked onChange={() => {}} label="已禁用已选中复选框" />
      <Checkbox disabled indeterminate label="已禁用不确定复选框" />
    </Stack>
  );
}

export const states: UIDemo = {
  type: 'code',
  component: Demo,
  code,
};
