import { Fieldset, TextInput } from '@react-ui/ui';
import { MantineDemo } from '@react-ui/demo';

const code = `
import { Fieldset, TextInput } from '@react-ui/ui';

function Demo() {
  return (
    <Fieldset legend="Personal information"{{props}}>
      <TextInput label="Your name" placeholder="Your name" />
      <TextInput label="Email" placeholder="Email" mt="md" />
    </Fieldset>
  );
}
`;

function Wrapper(props: any) {
  return (
    <Fieldset legend="Personal information" {...props}>
      <TextInput label="Your name" placeholder="Your name" />
      <TextInput label="Email" placeholder="Email" mt="md" />
    </Fieldset>
  );
}

export const usage: MantineDemo = {
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
