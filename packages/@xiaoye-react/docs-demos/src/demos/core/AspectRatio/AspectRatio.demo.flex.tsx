import { AspectRatio, Image } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { AspectRatio, Image } from '@xiaoye-react/ui';

function Demo() {
  return (
    <div style={{ display: 'flex' }}>
      <AspectRatio ratio={1} flex="0 0 100px">
        <Image
          src="https://raw.githubusercontent.com/uidev/ui/master/.demo/avatars/avatar-6.png"
          alt="Avatar"
        />
      </AspectRatio>
    </div>
  );
}
`;

function Demo() {
  return (
    <div style={{ display: 'flex' }}>
      <AspectRatio ratio={1} flex="0 0 100px">
        <Image
          src="https://raw.githubusercontent.com/uidev/ui/master/.demo/avatars/avatar-6.png"
          alt="Avatar"
        />
      </AspectRatio>
    </div>
  );
}

export const flex: UIDemo = {
  type: 'code',
  component: Demo,
  code,
};
