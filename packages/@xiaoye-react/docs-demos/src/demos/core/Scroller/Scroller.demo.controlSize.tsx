import { Badge, Group, Scroller } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { Badge, Group, Scroller } from '@xiaoye-react/ui';

function Demo() {
  return (
    <Scroller controlSize="xl">
      <Group gap="xs" wrap="nowrap">
        {Array.from({ length: 20 }).map((_, index) => (
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
    <Scroller controlSize="xl">
      <Group gap="xs" wrap="nowrap">
        {Array.from({ length: 20 }).map((_, index) => (
          <Badge key={index} variant="light" size="lg" miw="fit-content">
            Badge {index + 1}
          </Badge>
        ))}
      </Group>
    </Scroller>
  );
}

export const controlSize: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  maxWidth: 500,
};
