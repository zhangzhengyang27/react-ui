import { Chip, Tooltip } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { Tooltip, Chip } from '@react-ui/ui';

function Demo() {
  return (
    <Tooltip label="芯片提示" refProp="rootRef">
      <Chip defaultChecked>带提示的芯片</Chip>
    </Tooltip>
  );
}
`;

function Demo() {
  return (
    <Tooltip label="芯片提示" refProp="rootRef">
      <Chip defaultChecked>带提示的芯片</Chip>
    </Tooltip>
  );
}

export const tooltip: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
};
