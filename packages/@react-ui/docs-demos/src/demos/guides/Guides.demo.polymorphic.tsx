import { Button } from '@react-ui/ui';
import { MantineDemo } from '@react-ui/demo';

const code = `
import { Button } from '@react-ui/ui';

function Demo() {
  return (
    <Button component="a" href="https://mantine.dev/" target="_blank">
      ReactUI website
    </Button>
  );
}
`;

function Demo() {
  return (
    <Button component="a" href="https://mantine.dev/" target="_blank">
      ReactUI website
    </Button>
  );
}

export const polymorphic: MantineDemo = {
  type: 'code',
  component: Demo,
  centered: true,
  code,
};
