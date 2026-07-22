import { Group, Switch } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { Group, Switch } from '@xiaoye-react/ui';

function Demo() {
  return (
    <Switch.Group defaultValue={['react']} maxSelectedValues={2}>
      <Group>
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
    <Switch.Group defaultValue={['react']} maxSelectedValues={2}>
      <Group>
        <Switch value="react" label="React" />
        <Switch value="svelte" label="Svelte" />
        <Switch value="ng" label="Angular" />
        <Switch value="vue" label="Vue" />
      </Group>
    </Switch.Group>
  );
}

export const maxSelectedValues: UIDemo = {
  type: 'code',
  component: Demo,
  code,
};
