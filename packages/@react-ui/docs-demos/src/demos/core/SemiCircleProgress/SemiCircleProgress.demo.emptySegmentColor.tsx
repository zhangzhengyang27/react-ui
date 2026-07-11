import { SemiCircleProgress } from '@react-ui/ui';
import { MantineDemo } from '@react-ui/demo';

const code = `
import { SemiCircleProgress } from '@react-ui/ui';

function Demo() {
  return <SemiCircleProgress value={30} emptySegmentColor="var(--mantine-color-dimmed)" />;
}
`;

function Demo() {
  return <SemiCircleProgress value={30} emptySegmentColor="var(--mantine-color-dimmed)" />;
}

export const emptySegmentColor: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
};
