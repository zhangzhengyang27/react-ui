import { Group, Switch } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { Switch, Group } from '@react-ui/ui';

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
