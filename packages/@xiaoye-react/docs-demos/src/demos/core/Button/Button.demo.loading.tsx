import { Button, Group, Switch } from '@xiaoye-react/ui';
import { useDisclosure } from '@xiaoye-react/hooks';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { Button, Group, Switch } from '@xiaoye-react/ui';
import { useDisclosure } from '@xiaoye-react/hooks';

function Demo() {
  const [loading, { toggle }] = useDisclosure();
  return (
    <>
      <Group>
        <Button loading={loading}>填充按钮</Button>
        <Button variant="light" loading={loading}>
          浅色按钮
        </Button>
        <Button variant="outline" loading={loading}>
          描边按钮
        </Button>
      </Group>

      <Switch checked={loading} onChange={toggle} label="加载状态" mt="md" />
    </>
  );
}
`;

function Demo() {
  const [loading, { toggle }] = useDisclosure();
  return (
    <>
      <Group>
        <Button loading={loading}>填充按钮</Button>
        <Button variant="light" loading={loading}>
          浅色按钮
        </Button>
        <Button variant="outline" loading={loading}>
          描边按钮
        </Button>
      </Group>

      <Switch checked={loading} onChange={toggle} label="加载状态" mt="md" />
    </>
  );
}

export const loading: UIDemo = {
  type: 'code',
  component: Demo,
  title: '加载状态',
  description: 'loading 属性会在按钮中显示加载指示器。',
  centered: true,
  code,
};
