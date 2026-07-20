import { Group, Table } from '@react-ui/ui';
import { useResizeObserver } from '@react-ui/hooks';
import { UIDemo } from '@react-ui/demo';
import classes from './use-resize-observer.demo.usage.module.css';

const code = `
import { Group, Table } from '@react-ui/ui';
import { useResizeObserver } from '@react-ui/hooks';

function Demo() {
  const [ref, rect] = useResizeObserver();

  return (
    <div className={classes.root}>
      <Group justify="center">
        <div ref={ref} className={classes.demo}>
          Resize me!
        </div>
      </Group>

      <Table
        captionSide="top"
        data={{
          caption: 'Resize element by dragging its right bottom corner',
          head: ['Property', 'Value'],
          body: [
            ['width', rect.width],
            ['height', rect.height],
          ],
        }}
      />
    </div>
  );
}`;

const cssCode = `.root {
  min-height: 380px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.demo {
  width: 400px;
  max-width: 800px;
  min-width: 160px;
  height: 200px;
  max-height: 220px;
  min-height: 80px;
  background-color: light-dark(var(--ui-color-blue-6), var(--ui-color-blue-8));
  resize: both;
  overflow: auto;
  color: var(--ui-color-white);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: 600;
}`;

function Demo() {
  const [ref, rect] = useResizeObserver();

  return (
    <div className={classes.root}>
      <Group justify="center">
        <div ref={ref} className={classes.demo}>
          Resize me!
        </div>
      </Group>

      <Table
        captionSide="top"
        data={{
          caption: 'Resize element by dragging its right bottom corner',
          head: ['Property', 'Value'],
          body: [
            ['width', rect.width],
            ['height', rect.height],
          ],
        }}
      />
    </div>
  );
}

export const usage: UIDemo = {
  type: 'code',
  code: [
    { code, language: 'tsx', fileName: '演示代码.tsx' },
    { code: cssCode, language: 'scss', fileName: '演示样式.module.css' },
  ],
  component: Demo,
};
