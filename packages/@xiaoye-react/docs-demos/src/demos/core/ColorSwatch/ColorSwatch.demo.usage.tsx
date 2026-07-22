import { ColorSwatch, Group } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { ColorSwatch, Group } from '@xiaoye-react/ui';

function Demo() {
  return (
    <Group>
      <ColorSwatch color="#009790" />
      <ColorSwatch color="rgba(234, 22, 174, 0.5)" />
      <ColorSwatch color="var(--ui-color-orange-5)" />
    </Group>
  );
}
`;

function Demo() {
  return (
    <Group>
      <ColorSwatch color="#009790" />
      <ColorSwatch color="rgba(234, 22, 174, 0.5)" />
      <ColorSwatch color="var(--ui-color-orange-5)" />
    </Group>
  );
}

export const usage: UIDemo = {
  type: 'code',
  component: Demo,
  centered: true,
  code,
};
