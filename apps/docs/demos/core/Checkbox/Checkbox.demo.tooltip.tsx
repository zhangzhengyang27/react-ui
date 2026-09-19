import { Checkbox, Tooltip } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { Tooltip, Checkbox } from '@xiaoye-react/ui';

function Demo() {
  return (
    <>
      <Tooltip label="带提示的复选框">
        <Checkbox label="只在复选框上显示提示" />
      </Tooltip>
    </>
  );
}
`;

function Demo() {
  return (
    <>
      <Tooltip label="带提示的复选框">
        <Checkbox label="只在复选框上显示提示" />
      </Tooltip>
    </>
  );
}

export const tooltip: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
};
