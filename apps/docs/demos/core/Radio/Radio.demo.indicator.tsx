import { Group, Radio } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { Radio, Group } from '@react-ui/ui';

function Demo() {
  return (
    <Group>
      <Radio.Indicator />
      <Radio.Indicator checked />
      <Radio.Indicator disabled />
      <Radio.Indicator disabled checked />
    </Group>
  );
}
`;

function Demo() {
  return (
    <Group>
      <Radio.Indicator />
      <Radio.Indicator checked />
      <Radio.Indicator disabled />
      <Radio.Indicator disabled checked />
    </Group>
  );
}

export const indicator: UIDemo = {
  type: 'code',
  component: Demo,
  code,
};
