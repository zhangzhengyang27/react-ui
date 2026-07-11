import { Button, Group, useMantineColorScheme } from '@react-ui/ui';
import { MantineDemo } from '@react-ui/demo';

const code = `
import { useMantineColorScheme, Button, Group } from '@react-ui/ui';

function Demo() {
  const { setColorScheme, clearColorScheme } = useMantineColorScheme();

  return (
    <Group>
      <Button onClick={() => setColorScheme('light')}>Light</Button>
      <Button onClick={() => setColorScheme('dark')}>Dark</Button>
      <Button onClick={() => setColorScheme('auto')}>Auto</Button>
      <Button onClick={clearColorScheme}>Clear</Button>
    </Group>
  );
}
`;

function Demo() {
  const { setColorScheme, clearColorScheme } = useMantineColorScheme();
  return (
    <Group>
      <Button onClick={() => setColorScheme('light')}>Light</Button>
      <Button onClick={() => setColorScheme('dark')}>Dark</Button>
      <Button onClick={() => setColorScheme('auto')}>Auto</Button>
      <Button onClick={clearColorScheme}>Clear</Button>
    </Group>
  );
}

export const colorScheme: MantineDemo = {
  type: 'code',
  component: Demo,
  centered: true,
  code,
};
