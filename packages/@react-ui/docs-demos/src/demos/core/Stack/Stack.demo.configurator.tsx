import { Button, Stack, StackProps } from '@react-ui/ui';
import { MantineDemo } from '@react-ui/demo';

function Wrapper(props: StackProps) {
  return (
    <Stack h={300} bg="var(--ui-color-body)" {...props}>
      <Button variant="default">1</Button>
      <Button variant="default">2</Button>
      <Button variant="default">3</Button>
    </Stack>
  );
}

const code = `
import { Stack, Button } from '@react-ui/ui';

function Demo() {
  return (
    <Stack
      h={300}
      bg="var(--ui-color-body)"
      {{props}}
    >
      <Button variant="default">1</Button>
      <Button variant="default">2</Button>
      <Button variant="default">3</Button>
    </Stack>
  );
}
`;

export const configurator: MantineDemo = {
  type: 'configurator',
  component: Wrapper,
  code,
  dimmed: true,
  controls: [
    {
      prop: 'align',
      type: 'select',
      data: [
        { label: 'stretch', value: 'stretch' },
        { label: 'center', value: 'center' },
        { label: 'flex-start', value: 'flex-start' },
        { label: 'flex-end', value: 'flex-end' },
      ],
      initialValue: 'stretch',
      libraryValue: null,
    },
    {
      prop: 'justify',
      type: 'select',
      data: [
        { label: 'center', value: 'center' },
        { label: 'flex-start', value: 'flex-start' },
        { label: 'flex-end', value: 'flex-end' },
        { label: 'space-between', value: 'space-between' },
        { label: 'space-around', value: 'space-around' },
      ],
      initialValue: 'center',
      libraryValue: null,
    },
    { prop: 'gap', type: 'size', initialValue: 'md', libraryValue: null },
  ],
};
