import { useState } from 'react';
import { RangeSlider, Text } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { RangeSlider, Text } from '@react-ui/ui';
import { useState } from 'react';

function Demo() {
  const [value, setValue] = useState<[number, number]>([20, 80]);

  return (
    <>
      <Text size="sm" mb="xs">
        最大范围：50（选择范围不能超过 50 个单位）
      </Text>
      <RangeSlider
        value={value}
        onChange={setValue}
        maxRange={50}
      />
      <Text size="sm" mt="xs">
        值：[{value[0]}, {value[1]}] - 范围：{value[1] - value[0]}
      </Text>
    </>
  );
}
`;

function Demo() {
  const [value, setValue] = useState<[number, number]>([20, 80]);

  return (
    <>
      <Text size="sm" mb="xs">
        最大范围：50（选择范围不能超过 50 个单位）
      </Text>
      <RangeSlider value={value} onChange={setValue} maxRange={50} />
      <Text size="sm" mt="xs">
        值：[{value[0]}, {value[1]}] - 范围：{value[1] - value[0]}
      </Text>
    </>
  );
}

export const maxRange: UIDemo = {
  type: 'code',
  component: Demo,
  code,
};
