import { Anchor, Group } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { Anchor, Group } from '@xiaoye-react/ui';

function Demo() {
  return (
    <Group justify="center">
      <Anchor href="#" target="_blank" underline="always">
        Underline always
      </Anchor>
      <Anchor href="#" target="_blank" underline="hover">
        Underline hover
      </Anchor>
      <Anchor href="#" target="_blank" underline="never">
        Underline never
      </Anchor>
      <Anchor href="#" target="_blank" underline="not-hover">
        Underline not-hover
      </Anchor>
    </Group>
  );
}
`;

function Demo() {
  return (
    <Group justify="center">
      <Anchor href="#" target="_blank" underline="always">
        Underline always
      </Anchor>
      <Anchor href="#" target="_blank" underline="hover">
        Underline hover
      </Anchor>
      <Anchor href="#" target="_blank" underline="never">
        Underline never
      </Anchor>
      <Anchor href="#" target="_blank" underline="not-hover">
        Underline not-hover
      </Anchor>
    </Group>
  );
}

export const decoration: UIDemo = {
  type: 'code',
  component: Demo,
  code,
};
