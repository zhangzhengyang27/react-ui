import { Badge, Group, Scroller } from '@react-ui/ui';
import { MantineDemo } from '@react-ui/demo';

const code = `
import { Badge, Group, Scroller } from '@react-ui/ui';

function Demo() {
  return (
    <Scroller scrollAmount={300}>
      <Group gap="xs" wrap="nowrap">
        {Array.from({ length: 30 }).map((_, index) => (
          <Badge key={index} variant="light" size="lg" miw="fit-content">
            Badge {index + 1}
          </Badge>
        ))}
      </Group>
    </Scroller>
  );
}
`;

function Demo() {
  return (
    <Scroller scrollAmount={300}>
      <Group gap="xs" wrap="nowrap">
        {Array.from({ length: 30 }).map((_, index) => (
          <Badge key={index} variant="light" size="lg" miw="fit-content">
            Badge {index + 1}
          </Badge>
        ))}
      </Group>
    </Scroller>
  );
}

export const scrollAmount: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  maxWidth: 500,
};
