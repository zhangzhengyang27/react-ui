import { useState } from 'react';
import { RangeSlider, Text } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { RangeSlider, Text } from '@react-ui/ui';
import { useState } from 'react';

function Demo() {
  const [value, setValue] = useState<[number, number]>([30, 60]);

  return (
    <>
      <Text size="sm" mb="xs">
        最小范围：20（滑块必须至少相距 20 个单位）
      </Text>
      <RangeSlider
        value={value}
        onChange={setValue}
        minRange={20}
      />
      <Text size="sm" mt="xs">
        值：[{value[0]}, {value[1]}] - 范围：{value[1] - value[0]}
      </Text>
    </>
  );
}
`;

function Demo() {
  const [value, setValue] = useState<[number, number]>([30, 60]);

  return (
    <>
      <Text size="sm" mb="xs">
        最小范围：20（滑块必须至少相距 20 个单位）
      </Text>
      <RangeSlider value={value} onChange={setValue} minRange={20} />
      <Text size="sm" mt="xs">
        值：[{value[0]}, {value[1]}] - 范围：{value[1] - value[0]}
      </Text>
    </>
  );
}

export const minRange: UIDemo = {
  type: 'code',
  component: Demo,
  code,
};
