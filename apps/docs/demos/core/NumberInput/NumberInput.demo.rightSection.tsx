import { ChartScatterIcon } from '@phosphor-icons/react';
import { NumberInput } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { NumberInput } from '@react-ui/ui';
import { ChartScatterIcon } from '@phosphor-icons/react';

function Demo() {
  return (
    <>
      <NumberInput label="隐藏控制器" placeholder="隐藏控制器" hideControls />
      <NumberInput
        label="自定义右侧区域"
        placeholder="自定义右侧区域"
        mt="md"
        rightSection={<ChartScatterIcon />}
        rightSectionPointerEvents="none"
      />
    </>
  );
}
`;

function Demo() {
  return (
    <>
      <NumberInput label="隐藏控制器" placeholder="隐藏控制器" hideControls />
      <NumberInput
        label="自定义右侧区域"
        placeholder="自定义右侧区域"
        mt="md"
        rightSection={<ChartScatterIcon />}
        rightSectionPointerEvents="none"
      />
    </>
  );
}

export const rightSection: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  maxWidth: 340,
};
