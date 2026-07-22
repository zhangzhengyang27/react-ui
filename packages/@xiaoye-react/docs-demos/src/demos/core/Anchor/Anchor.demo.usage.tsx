import { Anchor } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { Anchor } from '@xiaoye-react/ui';

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
