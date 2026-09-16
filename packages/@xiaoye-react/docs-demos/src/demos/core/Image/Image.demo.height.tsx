import { Image } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { Image } from '@xiaoye-react/ui';

function Demo() {
  return (
    <Image
      radius="md"
      h={200}
      src="/demo/images/bg-10.png"
    />
  );
}
`;

function Demo() {
  return (
    <Image
      radius="md"
      h={200}
      src="/demo/images/bg-10.png"
    />
  );
}

export const height: UIDemo = {
  type: 'code',
  component: Demo,
  code,
};
