import { Anchor } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { Anchor } from '@react-ui/ui';

function Demo() {
  return (
    <Anchor
      variant="gradient"
      gradient={{ from: 'pink', to: 'yellow' }}
      fw={500}
      fz="lg"
      href="#text-props"
    >
      A link with pink to yellow gradient
    </Anchor>
  );
}
`;

function Demo() {
  return (
    <Anchor
      variant="gradient"
      gradient={{ from: 'pink', to: 'yellow' }}
      fw={500}
      fz="lg"
      href="#text-props"
    >
      A link with pink to yellow gradient
    </Anchor>
  );
}

export const textProps: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
};
