import { Chip, Tooltip } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { Tooltip, Chip } from '@xiaoye-react/ui';

function Demo() {
  return (
    <Tooltip label="芯片提示">
      <Chip defaultChecked>带提示的芯片</Chip>
    </Tooltip>
  );
}
`;

function Demo() {
  return (
    <Tooltip label="芯片提示">
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
