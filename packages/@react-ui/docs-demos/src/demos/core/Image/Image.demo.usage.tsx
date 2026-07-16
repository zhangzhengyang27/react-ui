import { Image } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { Image } from '@react-ui/ui';

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
