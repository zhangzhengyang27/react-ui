import { Button } from '@react-ui/ui';
import { upperFirst, useToggle } from '@react-ui/hooks';
import { UIDemo } from '@react-ui/demo';

const code = `
import { Button } from '@react-ui/ui';
import { useToggle } from '@react-ui/hooks';

function Demo() {
  const [value, toggle] = useToggle(['blue', 'orange', 'cyan', 'teal']);

  return (
    <Button color={value} onClick={() => toggle()}>
      {value}
    </Button>
  );
}
`;

function Demo() {
  const [value, toggle] = useToggle(['blue', 'orange', 'cyan', 'teal']);

  return (
    <Button color={value} onClick={() => toggle()}>
      {upperFirst(value)}
    </Button>
  );
}

export const usage: UIDemo = {
  type: 'code',
  code,
  component: Demo,
  centered: true,
};
