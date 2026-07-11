import { Code, Group } from '@react-ui/ui';
import { MantineDemo } from '@react-ui/demo';

const code = `
import { Code, Group } from '@react-ui/ui';

function Demo() {
  return (
    <Group justify="center">
      <Code color="blue.9" c="white">
        React.createElement()
      </Code>
      <Code color="var(--mantine-color-blue-light)">React.createElement()</Code>
    </Group>
  );
}
`;

function Demo() {
  return (
    <Group justify="center">
      <Code color="blue.9" c="white">
        React.createElement()
      </Code>
      <Code color="var(--mantine-color-blue-light)">React.createElement()</Code>
    </Group>
  );
}

export const colors: MantineDemo = {
  type: 'code',
  code,
  component: Demo,
};
