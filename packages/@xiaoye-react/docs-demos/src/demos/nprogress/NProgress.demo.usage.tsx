import { Button, Group } from '@xiaoye-react/ui';
import { NavigationProgress, nprogress } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { Button, Group } from '@xiaoye-react/ui';
import { nprogress, NavigationProgress } from '@xiaoye-react/ui';

function Demo() {
  return (
    <>
      <NavigationProgress />
      <Group justify="center">
        <Button onClick={() => nprogress.start()}>开始</Button>
        <Button onClick={() => nprogress.stop()}>停止</Button>
        <Button onClick={() => nprogress.increment()}>增加</Button>
        <Button onClick={() => nprogress.decrement()}>减少</Button>
        <Button onClick={() => nprogress.set(50)}>Set 50%</Button>
        <Button onClick={() => nprogress.reset()}>重置</Button>
        <Button onClick={() => nprogress.complete()}>完成</Button>
      </Group>
    </>
  );
}
`;

function Demo() {
  return (
    <>
      <NavigationProgress />
      <Group justify="center">
        <Button onClick={() => nprogress.start()} variant="default">
          Start
        </Button>
        <Button onClick={() => nprogress.stop()} variant="default">
          Stop
        </Button>
        <Button onClick={() => nprogress.increment()} variant="default">
          Increment
        </Button>
        <Button onClick={() => nprogress.decrement()} variant="default">
          Decrement
        </Button>
        <Button onClick={() => nprogress.set(50)} variant="default">
          Set 50%
        </Button>
        <Button onClick={() => nprogress.reset()} variant="default">
          Reset
        </Button>
        <Button onClick={() => nprogress.complete()} variant="default">
          Complete
        </Button>
      </Group>
    </>
  );
}

export const usage: UIDemo = {
  type: 'code',
  component: Demo,
  code,
};
