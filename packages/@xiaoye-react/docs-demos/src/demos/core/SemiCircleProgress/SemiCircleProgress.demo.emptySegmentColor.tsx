import { SemiCircleProgress } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { SemiCircleProgress } from '@xiaoye-react/ui';

function Demo() {
  return <SemiCircleProgress value={30} emptySegmentColor="var(--ui-color-dimmed)" />;
}
`;

function Demo() {
  return <SemiCircleProgress value={30} emptySegmentColor="var(--ui-color-dimmed)" />;
}

export const emptySegmentColor: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
};
