import { Badge, Button, Card, Group, Image, Text } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { Card, Image, Text, Badge, Button, Group } from '@xiaoye-react/ui';

function Demo() {
  return (
    <Card shadow="sm" padding="lg" withBorder>
      <Card.Section component="a" href="#">
        <Image
          src="https://raw.githubusercontent.com/uidev/ui/master/.demo/images/bg-8.png"
          height={160}
          alt="Norway"
        />
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>挪威峡湾探险</Text>
        <Badge color="pink">促销中</Badge>
      </Group>

      <Text size="sm" c="dimmed">
        With Fjord Tours you can explore more of the magical fjord landscapes with tours and
        activities on and around the fjords of Norway
      </Text>

      <Button color="blue" fullWidth mt="md">
        Book classic tour now
      </Button>
    </Card>
  );
}
`;

function Demo() {
  return (
    <Card shadow="sm" padding="lg" withBorder>
      <Card.Section component="a" href="#">
        <Image
          src="https://raw.githubusercontent.com/uidev/ui/master/.demo/images/bg-8.png"
          height={160}
          alt="Norway"
        />
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>挪威峡湾探险</Text>
        <Badge color="pink">促销中</Badge>
      </Group>

      <Text size="sm" c="dimmed">
        With Fjord Tours you can explore more of the magical fjord landscapes with tours and
        activities on and around the fjords of Norway
      </Text>

      <Button color="blue" fullWidth mt="md">
        Book classic tour now
      </Button>
    </Card>
  );
}

export const linkSection: UIDemo = {
  type: 'code',
  code,
  component: Demo,
  centered: true,
  maxWidth: 340,
  dimmed: true,
};
