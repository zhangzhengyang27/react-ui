import { AspectRatio } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { AspectRatio } from '@xiaoye-react/ui';

function Demo() {
  return (
    <AspectRatio ratio={1080 / 720} maw={300} mx="auto">
      <img
        src="https://raw.githubusercontent.com/uidev/ui/master/.demo/images/bg-5.png"
        alt="Panda"
      />
    </AspectRatio>
  );
}
`;

function Demo() {
  return (
    <AspectRatio ratio={1080 / 720} maw={300} mx="auto">
      <img
        src="https://raw.githubusercontent.com/uidev/ui/master/.demo/images/bg-5.png"
        alt="Panda"
      />
    </AspectRatio>
  );
}

export const image: UIDemo = {
  type: 'code',
  component: Demo,
  code,
};
