import { Image } from '@react-ui/ui';
import { MantineDemo } from '@react-ui/demo';

const code = `
import { Image } from '@react-ui/ui';

function Demo() {
  return (
    <Image
      radius="md"
      src={null}
      h={200}
      fallbackSrc="https://placehold.co/600x400?text=Placeholder"
    />
  );
}
`;

function Demo() {
  return (
    <Image
      radius="md"
      src={null}
      h={200}
      fallbackSrc="https://placehold.co/600x400?text=Placeholder"
    />
  );
}

export const fallback: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
};
