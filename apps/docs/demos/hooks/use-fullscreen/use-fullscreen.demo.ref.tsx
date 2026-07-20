import { Button, Stack } from '@react-ui/ui';
import { useFullscreenElement } from '@react-ui/hooks';
import { UIDemo } from '@react-ui/demo';

const refCode = `
import { useFullscreenElement } from '@react-ui/hooks';
import { Button, Stack } from '@react-ui/ui';

function RefDemo() {
  const { ref, toggle, fullscreen } = useFullscreenElement();

  return (
    <Stack align="center">
      <img
        ref={ref}
        src="https://raw.githubusercontent.com/uidev/ui/master/.demo/images/bg-4.png"
        alt="演示图片"
        width={200}
      />
      <Button onClick={toggle} color={fullscreen ? 'red' : 'blue'}>
        {fullscreen ? '退出全屏' : '全屏查看图片'}
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
        src="https://raw.githubusercontent.com/uidev/ui/master/.demo/images/bg-4.png"
        alt="演示图片"
        width={200}
      />
      <Button onClick={toggle} color={fullscreen ? 'red' : 'blue'}>
        {fullscreen ? '退出全屏' : '全屏查看图片'}
      </Button>
    </Stack>
  );
}

export const ref: UIDemo = {
  type: 'code',
  code: refCode,
  component: RefDemo,
};
