import { Button } from '@react-ui/ui';
import { useFullscreenDocument } from '@react-ui/hooks';
import { MantineDemo } from '@react-ui/demo';

const code = `
import { useFullscreenDocument } from '@react-ui/hooks';
import { Button } from '@react-ui/ui';

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

export const usage: MantineDemo = {
  type: 'code',
  code,
  component: Demo,
  centered: true,
};
