import { useState } from 'react';
import { Box, Slider, Text } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { Slider, Text, Box } from '@react-ui/ui';
import { useState } from 'react';

function Demo() {
  const [value, setValue] = useState(50);

  return (
    <Box pb="md">
      <Text size="sm" mb="xs">
        隐藏刻度允许你在不将其视觉上显示的情况下吸附到特定值。当前值：{value}
      </Text>
      <Slider
        value={value}
        onChange={setValue}
        min={0}
        max={100}
        step={1}
        restrictToMarks
        marks={[
          { value: 0, label: '0%' },
          { value: 25, hidden: true },
          { value: 50, label: '50%' },
          { value: 75, hidden: true },
          { value: 100, label: '100%' },
        ]}
      />
    </Box>
  );
}
`;

function Demo() {
  const [value, setValue] = useState(50);

  return (
    <Box pb="md">
      <Text size="sm" mb="xs">
        隐藏刻度允许你在不将其视觉上显示的情况下吸附到特定值。当前值：{value}
      </Text>
      <Slider
        value={value}
        onChange={setValue}
        min={0}
        max={100}
        step={1}
        restrictToMarks
        marks={[
          { value: 0, label: '0%' },
          { value: 25, hidden: true },
          { value: 50, label: '50%' },
          { value: 75, hidden: true },
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
