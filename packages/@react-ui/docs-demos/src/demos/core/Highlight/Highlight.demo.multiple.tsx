import { Highlight } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { Highlight } from '@react-ui/ui';

function Demo() {
  return <Highlight highlight={['this', 'that']}>高亮这个还有那个</Highlight>;
}
`;

function Demo() {
  return <Highlight highlight={['this', 'that']}>高亮这个还有那个</Highlight>;
}

export const multiple: UIDemo = {
  type: 'code',
  code,
  component: Demo,
};
