import { Fieldset, TextInput } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { Fieldset, TextInput } from '@react-ui/ui';

function Demo() {
  return (
    <Fieldset legend="Personal information"{{props}}>
      <TextInput label="你的姓名" placeholder="你的姓名" />
      <TextInput label="邮箱" placeholder="邮箱" mt="md" />
    </Fieldset>
  );
}
`;

function Wrapper(props: any) {
  return (
    <Fieldset legend="Personal information" {...props}>
      <TextInput label="你的姓名" placeholder="你的姓名" />
      <TextInput label="邮箱" placeholder="邮箱" mt="md" />
    </Fieldset>
  );
}

export const usage: UIDemo = {
  type: 'configurator',
  component: Wrapper,
  code,
  maxWidth: 500,
  centered: true,
  controls: [
    {
      type: 'segmented',
      prop: 'variant',
      initialValue: 'default',
      libraryValue: 'default',
      data: ['default', 'filled', 'unstyled'],
    },

    { type: 'size', prop: 'radius', initialValue: 'md', libraryValue: 'md' },
  ],
};
