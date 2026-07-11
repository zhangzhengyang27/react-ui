import { Highlight } from '@react-ui/ui';
import { MantineDemo } from '@react-ui/demo';

const code = `
import { Highlight } from '@react-ui/ui';

function Demo() {
  return <Highlight highlight={['this', 'that']}>Highlight this and also that</Highlight>;
}
`;

function Demo() {
  return <Highlight highlight={['this', 'that']}>Highlight this and also that</Highlight>;
}

export const multiple: MantineDemo = {
  type: 'code',
  code,
  component: Demo,
};
