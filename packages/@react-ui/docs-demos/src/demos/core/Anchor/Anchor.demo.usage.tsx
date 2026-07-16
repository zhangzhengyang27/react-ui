import { Anchor } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { Anchor } from '@react-ui/ui';

function Demo() {
  return (
    <Anchor href="#" target="_blank">
      Anchor component
    </Anchor>
  );
}
`;

function Demo() {
  return (
    <Anchor href="#" target="_blank">
      Anchor component
    </Anchor>
  );
}

export const usage: UIDemo = {
  type: 'code',
  component: Demo,
  code,
};
