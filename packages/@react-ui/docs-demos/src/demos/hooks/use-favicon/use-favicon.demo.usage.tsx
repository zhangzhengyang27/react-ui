import { useState } from 'react';
import { Button, Group } from '@react-ui/ui';
import { useFavicon } from '@react-ui/hooks';
import { MantineDemo } from '@react-ui/demo';

const code = `
import { useState } from 'react';
import { useFavicon } from '@react-ui/hooks';
import { Group, Button } from '@react-ui/ui';

function Demo() {
  const [favicon, setFavicon] = useState('https://mantine.dev/favicon.svg');
  const setMantineFavicon = () => setFavicon('https://mantine.dev/favicon.svg');
  const setMantineUIFavicon = () => setFavicon('https://ui.mantine.dev/favicon.svg');

  useFavicon(favicon);

  return (
    <Group justify="center">
      <Button onClick={setMantineFavicon}>ReactUI favicon</Button>
      <Button onClick={setMantineUIFavicon}>ReactUI UI favicon</Button>
    </Group>
  );
}
`;

function Demo() {
  const [favicon, setFavicon] = useState('https://mantine.dev/favicon.svg');
  const setMantineFavicon = () => setFavicon('https://mantine.dev/favicon.svg');
  const setMantineUIFavicon = () => setFavicon('https://ui.mantine.dev/favicon.svg');

  useFavicon(favicon);

  return (
    <Group justify="center">
      <Button onClick={setMantineFavicon}>ReactUI favicon</Button>
      <Button onClick={setMantineUIFavicon}>ReactUI UI favicon</Button>
    </Group>
  );
}

export const usage: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
};
