import { Radio, Tooltip } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { Tooltip, Radio } from '@xiaoye-react/ui';

function Demo() {
  return (
    <>
      <Tooltip label="带提示的单选框">
        <Radio label="只在单选框上显示提示" />
      </Tooltip>
    </>
  );
}
`;

function Demo() {
  return (
    <>
      <Tooltip label="带提示的单选框">
        <Radio label="只在单选框上显示提示" />
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
