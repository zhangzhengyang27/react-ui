import { Group, Switch } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { Switch, Group } from '@xiaoye-react/ui';

function Demo() {
  return (
    <Switch.Group
      disabled
      label="选择你最喜欢的框架/库"
      description="这是匿名的"
    >
      <Group mt="xs">
        <Switch value="react" label="React" />
        <Switch value="svelte" label="Svelte" />
        <Switch value="ng" label="Angular" />
        <Switch value="vue" label="Vue" />
      </Group>
    </Switch.Group>
  );
}
`;

function Demo() {
  return (
    <Switch.Group
      disabled
      label="选择你最喜欢的框架/库"
      description="这是匿名的"
    >
      <Group mt="xs">
        <Switch value="react" label="React" />
        <Switch value="svelte" label="Svelte" />
        <Switch value="ng" label="Angular" />
        <Switch value="vue" label="Vue" />
      </Group>
    </Switch.Group>
  );
}

export const groupDisabled: UIDemo = {
  type: 'code',
  centered: true,
  component: Demo,
  code,
};
