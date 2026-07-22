import { Code, Group } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { Code, Group } from '@xiaoye-react/ui';

function Demo() {
  return (
    <Group justify="center">
      <Code color="blue.9" c="white">
        React.createElement()
      </Code>
      <Code color="var(--ui-color-blue-light)">React.createElement()</Code>
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
      <Code color="var(--ui-color-blue-light)">React.createElement()</Code>
    </Group>
  );
}

export const colors: UIDemo = {
  type: 'code',
  code,
  component: Demo,
};
