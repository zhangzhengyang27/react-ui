import { NumberInput } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { NumberInput } from '@react-ui/ui';

function Demo() {
  return (
    <NumberInput
      label="自定义小数分隔符"
      placeholder="你可以更改它"
      decimalSeparator=","
      defaultValue={20.573}
    />
  );
}
`;

function Demo() {
  return (
    <NumberInput
      label="自定义小数分隔符"
      placeholder="你可以更改它"
      decimalSeparator=","
      defaultValue={20.573}
    />
  );
}

export const decimalSeparator: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  maxWidth: 340,
};
