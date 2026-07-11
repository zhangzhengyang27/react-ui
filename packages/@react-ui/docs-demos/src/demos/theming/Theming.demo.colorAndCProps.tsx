import { Button } from '@react-ui/ui';
import { MantineDemo } from '@react-ui/demo';

const code = `
import { Button } from '@react-ui/ui';

function Demo() {
  return (
    <Button color="#C3FF36" c="black">
      Button with color and c props
    </Button>
  );
}
`;

function Demo() {
  return (
    <Button color="#C3FF36" c="black">
      Button with color and c props
    </Button>
  );
}

export const colorAndCProps: MantineDemo = {
  type: 'code',
  component: Demo,
  centered: true,
  code,
};
