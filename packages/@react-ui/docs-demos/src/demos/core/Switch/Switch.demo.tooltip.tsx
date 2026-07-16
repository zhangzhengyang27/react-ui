import { Switch, Tooltip } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { Switch, Tooltip } from '@react-ui/ui';

function Demo() {
  return (
    <Tooltip label="开关提示" refProp="rootRef">
      <Switch label="带提示的开关" />
    </Tooltip>
  );
}
`;

function Demo() {
  return (
    <Tooltip label="开关提示" refProp="rootRef">
      <Switch label="带提示的开关" />
    </Tooltip>
  );
}

export const tooltip: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
};
