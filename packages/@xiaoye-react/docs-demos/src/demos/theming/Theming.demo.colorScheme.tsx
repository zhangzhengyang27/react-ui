import { Button, Group, useUIColorScheme } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { useUIColorScheme, Button, Group } from '@xiaoye-react/ui';

function Demo() {
  const { setColorScheme, clearColorScheme } = useUIColorScheme();

  return (
    <Group>
      <Button onClick={() => setColorScheme('light')}>浅色</Button>
      <Button onClick={() => setColorScheme('dark')}>深色</Button>
      <Button onClick={() => setColorScheme('auto')}>自动</Button>
      <Button onClick={clearColorScheme}>清除</Button>
    </Group>
  );
}
`;

function Demo() {
  const { setColorScheme, clearColorScheme } = useUIColorScheme();
  return (
    <Group>
      <Button onClick={() => setColorScheme('light')}>浅色</Button>
      <Button onClick={() => setColorScheme('dark')}>深色</Button>
      <Button onClick={() => setColorScheme('auto')}>自动</Button>
      <Button onClick={clearColorScheme}>清除</Button>
    </Group>
  );
}

export const colorScheme: UIDemo = {
  type: 'code',
  component: Demo,
  centered: true,
  code,
};
