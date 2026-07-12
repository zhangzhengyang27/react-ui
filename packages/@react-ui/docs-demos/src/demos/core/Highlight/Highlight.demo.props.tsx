import { Highlight } from '@react-ui/ui';
import { MantineDemo } from '@react-ui/demo';

const code = `
import { Highlight } from '@react-ui/ui';

function Demo() {
  return (
    <Highlight
      component="a"
      href="https://mantine.dev"
      target="_blank"
      highlight="mantine"
      fw={500}
      c="var(--ui-color-anchor)"
    >
      ReactUI website
    </Highlight>
  );
}

`;

function Demo() {
  return (
    <Highlight
      component="a"
      href="https://mantine.dev"
      target="_blank"
      highlight="mantine"
      fw={500}
      c="var(--ui-color-anchor)"
    >
      ReactUI website
    </Highlight>
  );
}

export const props: MantineDemo = {
  type: 'code',
  code,
  centered: true,
  component: Demo,
};
