import { useState } from 'react';
import { Button, Group } from '@xiaoye-react/ui';
import { useFavicon } from '@xiaoye-react/hooks';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { useState } from 'react';
import { useFavicon } from '@xiaoye-react/hooks';
import { Group, Button } from '@xiaoye-react/ui';

function Demo() {
  const [favicon, setFavicon] = useState('https://react-ui.dev/favicon.svg');
  const setReactUIFavicon = () => setFavicon('https://react-ui.dev/favicon.svg');
  const setGitHubFavicon = () => setFavicon('https://github.com/favicon.ico');

  useFavicon(favicon);

  return (
    <Group justify="center">
      <Button onClick={setReactUIFavicon}>ReactUI 网站图标</Button>
      <Button onClick={setGitHubFavicon}>GitHub 网站图标</Button>
    </Group>
  );
}
`;

function Demo() {
  const [favicon, setFavicon] = useState('https://react-ui.dev/favicon.svg');
  const setReactUIFavicon = () => setFavicon('https://react-ui.dev/favicon.svg');
  const setGitHubFavicon = () => setFavicon('https://github.com/favicon.ico');

  useFavicon(favicon);

  return (
    <Group justify="center">
      <Button onClick={setReactUIFavicon}>ReactUI 网站图标</Button>
      <Button onClick={setGitHubFavicon}>GitHub 网站图标</Button>
    </Group>
  );
}

export const usage: UIDemo = {
  type: 'code',
  component: Demo,
  code,
};
