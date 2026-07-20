import { Image } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { Image } from '@react-ui/ui';

function Demo() {
  return (
    <Image
      radius="md"
      h={200}
      w="auto"
      fit="contain"
      src="https://raw.githubusercontent.com/uidev/ui/master/.demo/images/bg-9.png"
    />
  );
}
`;

function Demo() {
  return (
    <Image
      radius="md"
      h={200}
      w="auto"
      fit="contain"
      src="https://raw.githubusercontent.com/uidev/ui/master/.demo/images/bg-9.png"
    />
  );
}

export const contain: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
};
