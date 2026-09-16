import { Button, Stack } from '@xiaoye-react/ui';
import { useFullscreenElement } from '@xiaoye-react/hooks';
import { UIDemo } from '@xiaoye-react/demo';

const refCode = `
import { useFullscreenElement } from '@xiaoye-react/hooks';
import { Button, Stack } from '@xiaoye-react/ui';

function RefDemo() {
  const { ref, toggle, fullscreen } = useFullscreenElement();

  return (
    <Stack align="center">
      <img
        ref={ref}
        src="/demo/images/bg-4.png"
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
        src="/demo/images/bg-4.png"
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
