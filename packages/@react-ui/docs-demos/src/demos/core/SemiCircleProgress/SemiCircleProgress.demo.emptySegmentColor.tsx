import { SemiCircleProgress } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { SemiCircleProgress } from '@react-ui/ui';

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
