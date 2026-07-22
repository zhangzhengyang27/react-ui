import { Button } from '@xiaoye-react/ui';
import { useFullscreenDocument } from '@xiaoye-react/hooks';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { useFullscreenDocument } from '@xiaoye-react/hooks';
import { Button } from '@xiaoye-react/ui';

function Demo() {
  const { toggle, fullscreen } = useFullscreenDocument();

  return (
    <Button onClick={toggle} color={fullscreen ? 'red' : 'blue'}>
      {fullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
    </Button>
  );
}
`;

function Demo() {
  const { toggle, fullscreen } = useFullscreenDocument();

  return (
    <Button onClick={toggle} color={fullscreen ? 'red' : 'blue'}>
      {fullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
    </Button>
  );
}

export const usage: UIDemo = {
  type: 'code',
  code,
  component: Demo,
  centered: true,
};
