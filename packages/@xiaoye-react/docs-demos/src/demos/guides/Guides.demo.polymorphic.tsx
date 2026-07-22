import { Button } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { Button } from '@xiaoye-react/ui';

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
