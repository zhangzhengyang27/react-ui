import { useState } from 'react';
import { Button, Group, Paper } from '@xiaoye-react/ui';
import { useClickOutside } from '@xiaoye-react/hooks';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { useState } from 'react';
import { Paper, Button } from '@xiaoye-react/ui';
import { useClickOutside } from '@xiaoye-react/hooks';

function Demo() {
  const [opened, setOpened] = useState(false);
  const ref = useClickOutside(() => setOpened(false));

  return (
    <>
      <Button onClick={() => setOpened(true)}>打开下拉</Button>

      {opened && (
        <Paper ref={ref} shadow="sm">
          <span>点击外部关闭</span>
        </Paper>
      )}
    </>
  );
}
`;

function Demo() {
  const [opened, setOpened] = useState(false);
  const ref = useClickOutside(() => setOpened(false));

  return (
    <div style={{ position: 'relative' }}>
      <Group justify="center">
        <Button onClick={() => setOpened(true)}>打开下拉</Button>
      </Group>

      {opened && (
        <Paper
          ref={ref}
          shadow="sm"
          style={{
            width: 300,
            height: 60,
            position: 'absolute',
            top: 0,
            left: 'calc(50% - 150px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1,
          }}
        >
          <span>点击外部关闭</span>
        </Paper>
      )}
    </div>
  );
}

export const usage: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  dimmed: true,
};
