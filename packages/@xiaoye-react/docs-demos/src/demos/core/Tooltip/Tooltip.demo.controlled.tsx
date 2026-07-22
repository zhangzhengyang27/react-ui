import { useState } from 'react';
import { Button, Tooltip } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { useState } from 'react';
import { Tooltip, Button } from '@xiaoye-react/ui';

function Demo() {
  const [opened, setOpened] = useState(true);

  return (
    <Tooltip label="Ctrl + J" opened={opened}>
      <Button onClick={() => setOpened((o) => !o)}>
        Toggle color scheme
      </Button>
    </Tooltip>
  );
}`;

export function Demo() {
  const [opened, setOpened] = useState(false);

  return (
    <Tooltip label="Ctrl + J" opened={opened}>
      <Button onClick={() => setOpened((o) => !o)}>切换颜色方案</Button>
    </Tooltip>
  );
}

export const controlled: UIDemo = {
  type: 'code',
  centered: true,
  code,
  component: Demo,
};
