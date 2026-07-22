import { Button } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { Button } from '@xiaoye-react/ui';

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

export const colorAndCProps: UIDemo = {
  type: 'code',
  component: Demo,
  centered: true,
  code,
};
