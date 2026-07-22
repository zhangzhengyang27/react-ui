import { Highlight } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { Highlight } from '@xiaoye-react/ui';

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
