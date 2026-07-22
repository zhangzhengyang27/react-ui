import { Checkbox, CheckboxGroupProps, Group } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { Checkbox, Group } from '@xiaoye-react/ui';


function Demo() {
  return (
    <Checkbox.Group
      defaultValue={['react']}
      {{props}}
    >
      <Group mt="xs">
        <Checkbox value="react" label="React" />
        <Checkbox value="svelte" label="Svelte" />
        <Checkbox value="ng" label="Angular" />
        <Checkbox value="vue" label="Vue" />
      </Group>
    </Checkbox.Group>
  );
}
`;

function Wrapper(props: Partial<CheckboxGroupProps>) {
  return (
    <Checkbox.Group defaultValue={['react']} {...props}>
      <Group mt="xs">
        <Checkbox value="react" label="React" />
        <Checkbox value="svelte" label="Svelte" />
        <Checkbox value="ng" label="Angular" />
        <Checkbox value="vue" label="Vue" />
      </Group>
    </Checkbox.Group>
  );
}

export const groupConfigurator: UIDemo = {
  type: 'configurator',
  component: Wrapper,
  code,
  centered: true,
  maxWidth: '100%',
  controls: [
    {
      prop: 'label',
      type: 'string',
      initialValue: '选择你最喜欢的框架/库',
      libraryValue: '',
    },
    { prop: 'description', type: 'string', initialValue: '这是匿名的', libraryValue: '' },
    { prop: 'error', type: 'string', initialValue: '', libraryValue: '' },
    { prop: 'withAsterisk', type: 'boolean', initialValue: true, libraryValue: false },
  ],
};
