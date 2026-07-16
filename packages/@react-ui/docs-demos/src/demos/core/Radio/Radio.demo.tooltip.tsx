import { Radio, Tooltip } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { Tooltip, Radio } from '@react-ui/ui';

function Demo() {
  return (
    <>
      <Tooltip label="带提示的单选框">
        <Radio label="只在单选框上显示提示" />
      </Tooltip>

      <Tooltip label="带提示的单选框" refProp="rootRef">
        <Radio label="提示整个元素" mt="md" />
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

      <Tooltip label="带提示的单选框" refProp="rootRef">
        <Radio label="提示整个元素" mt="md" />
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
