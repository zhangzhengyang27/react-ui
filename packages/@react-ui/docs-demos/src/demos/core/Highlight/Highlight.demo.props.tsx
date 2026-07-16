import { Highlight } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { Highlight } from '@react-ui/ui';

function Demo() {
  return (
    <Highlight
      component="a"
      href="#"
      target="_blank"
      highlight="ui"
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
      href="#"
      target="_blank"
      highlight="ui"
      fw={500}
      c="var(--ui-color-anchor)"
    >
      ReactUI website
    </Highlight>
  );
}

export const props: UIDemo = {
  type: 'code',
  code,
  centered: true,
  component: Demo,
};
