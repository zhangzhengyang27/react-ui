import { NumberInput } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { NumberInput } from '@xiaoye-react/ui';

function Demo() {
  return (
    <>
      <NumberInput
        label="按住时步进"
        description="按住递增/递减按钮时的步进值"
        stepHoldDelay={500}
        stepHoldInterval={100}
      />

      <NumberInput
        label="使用间隔函数步进值"
        description="按住控制按钮时步进速度会逐渐加快"
        stepHoldDelay={500}
        stepHoldInterval={(t) => Math.max(1000 / t ** 2, 25)}
      />
    </>
  );
}
`;

function Demo() {
  return (
    <>
      <NumberInput
        label="按住时步进"
        description="按住递增/递减按钮时的步进值"
        placeholder="按住控制按钮"
        stepHoldDelay={500}
        stepHoldInterval={100}
      />
      <NumberInput
        mt="md"
        label="使用间隔函数步进值"
        description="按住控制按钮时步进速度会逐渐加快"
        placeholder="按住控制按钮"
        stepHoldDelay={500}
        stepHoldInterval={(t) => Math.max(1000 / t ** 2, 25)}
      />
    </>
  );
}

export const hold: UIDemo = {
  type: 'code',
  code,
  component: Demo,
  centered: true,
  maxWidth: 340,
};
