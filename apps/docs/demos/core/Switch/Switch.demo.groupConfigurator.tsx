import { Group, Switch, SwitchGroupProps } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { Switch, Group } from '@xiaoye-react/ui';

function Demo() {
  return (
    <Switch.Group
      defaultValue={['react']}
      {{props}}
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

function Wrapper(props: SwitchGroupProps) {
  return (
    <Switch.Group defaultValue={['react']} {...props}>
      <Group mt="xs">
        <Switch value="react" label="React" />
        <Switch value="svelte" label="Svelte" />
        <Switch value="ng" label="Angular" />
        <Switch value="vue" label="Vue" />
      </Group>
    </Switch.Group>
  );
}

export const groupConfigurator: UIDemo = {
  type: 'configurator',
  component: Wrapper,
  code,
  centered: true,
  controls: [
    {
      prop: 'label',
      type: 'string',
      initialValue: '选择你最喜欢的框架/库',
      libraryValue: '',
    },
    { prop: 'description', type: 'string', initialValue: '这是匿名的', libraryValue: '' },
    { prop: 'error', type: 'string', initialValue: '', libraryValue: '' },
    { prop: 'required', type: 'boolean', initialValue: true, libraryValue: false },
  ],
};
