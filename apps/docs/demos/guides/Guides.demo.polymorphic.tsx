import { Button } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { Button } from '@react-ui/ui';

function Demo() {
  return (
    <Button component="a" href="#" target="_blank">
      ReactUI website
    </Button>
  );
}
`;

function Demo() {
  return (
    <Button component="a" href="#" target="_blank">
      ReactUI website
    </Button>
  );
}

export const polymorphic: UIDemo = {
  type: 'code',
  component: Demo,
  centered: true,
  code,
};
