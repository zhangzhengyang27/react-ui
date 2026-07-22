import { Image } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { Image } from '@xiaoye-react/ui';

function Demo() {
  return (
    <Image
      radius="md"
      src="https://raw.githubusercontent.com/uidev/ui/master/.demo/images/bg-7.png"
    />
  );
}
`;

function Demo() {
  return (
    <Image
      radius="md"
      src="https://raw.githubusercontent.com/uidev/ui/master/.demo/images/bg-7.png"
    />
  );
}

export const usage: UIDemo = {
  type: 'code',
  component: Demo,
  code,
};
