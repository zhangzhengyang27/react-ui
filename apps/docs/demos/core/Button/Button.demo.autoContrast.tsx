import { Button, Group } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { Button, Group } from '@react-ui/ui';

function Demo() {
  return (
    <Group>
      <Button color="lime.4">默认</Button>
      <Button color="lime.4" autoContrast>
        自动对比度
      </Button>
    </Group>
  );
}
`;

function Demo() {
  return (
    <Group>
      <Button color="lime.4">默认</Button>
      <Button color="lime.4" autoContrast>
        自动对比度
      </Button>
    </Group>
  );
}

export const autoContrast: UIDemo = {
  type: 'code',
  component: Demo,
  title: '自动对比度',
  description: 'autoContrast 属性会根据背景自动计算文字颜色。',
  code,
  centered: true,
};
