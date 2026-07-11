import { Button, Stack } from '@react-ui/ui';
import { useFullscreenElement } from '@react-ui/hooks';
import { MantineDemo } from '@react-ui/demo';

const refCode = `
import { useFullscreenElement } from '@react-ui/hooks';
import { Button, Stack } from '@react-ui/ui';

function RefDemo() {
  const { ref, toggle, fullscreen } = useFullscreenElement();

  return (
    <Stack align="center">
      <img
        ref={ref}
        src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-4.png"
        alt="For demo"
        width={200}
      />
      <Button onClick={toggle} color={fullscreen ? 'red' : 'blue'}>
        {fullscreen ? 'Exit Fullscreen' : 'View Image Fullscreen'}
      </Button>
    </Stack>
  );
}
`;

function RefDemo() {
  const { ref, toggle, fullscreen } = useFullscreenElement();

  return (
    <Stack align="center">
      <img
        ref={ref}
        src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-4.png"
        alt="For demo"
        width={200}
      />
      <Button onClick={toggle} color={fullscreen ? 'red' : 'blue'}>
        {fullscreen ? 'Exit Fullscreen' : 'View Image Fullscreen'}
      </Button>
    </Stack>
  );
}

export const ref: MantineDemo = {
  type: 'code',
  code: refCode,
  component: RefDemo,
};
