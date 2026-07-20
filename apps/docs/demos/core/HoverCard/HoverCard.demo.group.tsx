import { Button, Group, HoverCard, Text } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { HoverCard, Button, Text, Group } from '@react-ui/ui';

function Demo() {
  return (
    <HoverCard.Group openDelay={500} closeDelay={100}>
      <Group justify="center">
        <HoverCard shadow="md">
          <HoverCard.Target>
            <Button>第一</Button>
          </HoverCard.Target>
          <HoverCard.Dropdown>
            <Text size="sm">第一个悬停卡片内容</Text>
          </HoverCard.Dropdown>
        </HoverCard>

        <HoverCard shadow="md">
          <HoverCard.Target>
            <Button>第二</Button>
          </HoverCard.Target>
          <HoverCard.Dropdown>
            <Text size="sm">第二个悬停卡片内容</Text>
          </HoverCard.Dropdown>
        </HoverCard>

        <HoverCard shadow="md">
          <HoverCard.Target>
            <Button>第三</Button>
          </HoverCard.Target>
          <HoverCard.Dropdown>
            <Text size="sm">第三个悬停卡片内容</Text>
          </HoverCard.Dropdown>
        </HoverCard>
      </Group>
    </HoverCard.Group>
  );
}
`;

function Demo() {
  return (
    <HoverCard.Group openDelay={500} closeDelay={100}>
      <Group justify="center">
        <HoverCard shadow="md">
          <HoverCard.Target>
            <Button>第一</Button>
          </HoverCard.Target>
          <HoverCard.Dropdown>
            <Text size="sm">第一个悬停卡片内容</Text>
          </HoverCard.Dropdown>
        </HoverCard>

        <HoverCard shadow="md">
          <HoverCard.Target>
            <Button>第二</Button>
          </HoverCard.Target>
          <HoverCard.Dropdown>
            <Text size="sm">第二个悬停卡片内容</Text>
          </HoverCard.Dropdown>
        </HoverCard>

        <HoverCard shadow="md">
          <HoverCard.Target>
            <Button>第三</Button>
          </HoverCard.Target>
          <HoverCard.Dropdown>
            <Text size="sm">第三个悬停卡片内容</Text>
          </HoverCard.Dropdown>
        </HoverCard>
      </Group>
    </HoverCard.Group>
  );
}

export const group: UIDemo = {
  type: 'code',
  component: Demo,
  code,
};
