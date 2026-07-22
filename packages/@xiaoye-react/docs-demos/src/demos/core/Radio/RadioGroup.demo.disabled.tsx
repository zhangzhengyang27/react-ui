import { Group, Radio } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { Radio, Group } from '@xiaoye-react/ui';

function Demo() {
  return (
    <Radio.Group
      disabled
      name="favoriteFramework"
      label="选择你最喜欢的框架/库"
      description="这是匿名的"
    >
      <Group mt="xs">
        <Radio label="React" value="react" />
        <Radio label="Angular" value="nu" />
        <Radio label="Svelte" value="sv" />
      </Group>
    </Radio.Group>
  );
}
`;

function Demo() {
  return (
    <Radio.Group
      disabled
      name="favoriteFramework"
      label="选择你最喜欢的框架/库"
      description="这是匿名的"
    >
      <Group mt="xs">
        <Radio label="React" value="react" />
        <Radio label="Angular" value="nu" />
        <Radio label="Svelte" value="sv" />
      </Group>
    </Radio.Group>
  );
}

export const groupDisabled: UIDemo = {
  type: 'code',
  centered: true,
  component: Demo,
  code,
};
