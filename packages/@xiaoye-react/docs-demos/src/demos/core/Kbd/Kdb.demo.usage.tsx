import { Kbd } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { Kbd } from '@xiaoye-react/ui';

function Demo() {
  return (
    <div dir="ltr">
      <Kbd>⌘</Kbd> + <Kbd>Shift</Kbd> + <Kbd>M</Kbd>
    </div>
  );
}
`;

function Demo() {
  return (
    <div dir="ltr">
      <Kbd>⌘</Kbd> + <Kbd>Shift</Kbd> + <Kbd>M</Kbd>
    </div>
  );
}

export const usage: UIDemo = {
  type: 'code',
  code,
  component: Demo,
};
