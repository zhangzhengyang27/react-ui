import { useState } from 'react';
import { Box, RangeSlider, Text } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { RangeSlider, Text, Box } from '@xiaoye-react/ui';
import { useState } from 'react';

function Demo() {
  const [value, setValue] = useState<[number, number]>([25, 75]);

  return (
    <Box pb="md">
      <Text size="sm" mb="xs">
        隐藏刻度允许你在不将其视觉上显示的情况下吸附到特定值。当前值：[{value[0]}, {value[1]}]
      </Text>
      <RangeSlider
        value={value}
        onChange={setValue}
        min={0}
        max={100}
        step={1}
        minRange={10}
        restrictToMarks
        marks={[
          { value: 0, label: '0%' },
          { value: 20, hidden: true },
          { value: 40, hidden: true },
          { value: 50, label: '50%' },
          { value: 60, hidden: true },
          { value: 80, hidden: true },
          { value: 100, label: '100%' },
        ]}
      />
    </Box>
  );
}
`;

function Demo() {
  const [value, setValue] = useState<[number, number]>([25, 75]);

  return (
    <Box pb="md">
      <Text size="sm" mb="xs">
        隐藏刻度允许你在不将其视觉上显示的情况下吸附到特定值。当前值：[{value[0]}, {value[1]}]
      </Text>
      <RangeSlider
        value={value}
        onChange={setValue}
        min={0}
        max={100}
        step={1}
        minRange={10}
        restrictToMarks
        marks={[
          { value: 0, label: '0%' },
          { value: 20, hidden: true },
          { value: 40, hidden: true },
          { value: 50, label: '50%' },
          { value: 60, hidden: true },
          { value: 80, hidden: true },
          { value: 100, label: '100%' },
        ]}
      />
    </Box>
  );
}

export const hiddenMarks: UIDemo = {
  type: 'code',
  component: Demo,
  code,
};
