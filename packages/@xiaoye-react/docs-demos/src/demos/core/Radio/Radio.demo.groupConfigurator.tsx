import { Group, Radio, RadioGroupProps } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { Radio, Group } from '@xiaoye-react/ui';


function Demo() {
  return (
    <Radio.Group
      name="favoriteFramework"
      {{props}}
    >
      <Group mt="xs">
        <Radio value="react" label="React" />
        <Radio value="svelte" label="Svelte" />
        <Radio value="ng" label="Angular" />
        <Radio value="vue" label="Vue" />
      </Group>
    </Radio.Group>
  );
}
`;

function Wrapper(props: Partial<RadioGroupProps>) {
  return (
    <Radio.Group defaultValue="react" name="favoriteFramework" {...props}>
      <Group mt="xs">
        <Radio value="react" label="React" />
        <Radio value="svelte" label="Svelte" />
        <Radio value="ng" label="Angular" />
        <Radio value="vue" label="Vue" />
      </Group>
    </Radio.Group>
  );
}

export const groupConfigurator: UIDemo = {
  type: 'configurator',
  component: Wrapper,
  centered: true,
  code,
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
