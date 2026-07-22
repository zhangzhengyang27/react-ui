import { SemiCircleProgress, SimpleGrid } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { SemiCircleProgress, SimpleGrid } from '@xiaoye-react/ui';

function Demo() {
  return (
    <SimpleGrid cols={{ sm:2 }} spacing="xl">
      <SemiCircleProgress
        value={60}
        orientation="up"
        fillDirection="left-to-right"
        label="向上，左→右"
        size={150}
      />
      <SemiCircleProgress
        value={60}
        orientation="up"
        fillDirection="right-to-left"
        label="向上，右→左"
        size={150}
      />
      <SemiCircleProgress
        value={60}
        orientation="down"
        fillDirection="left-to-right"
        label="向下，左→右"
        size={150}
      />
      <SemiCircleProgress
        value={60}
        orientation="down"
        fillDirection="right-to-left"
        label="向下，右→左"
        size={150}
      />
    </SimpleGrid>
  );
}
`;

function Demo() {
  return (
    <SimpleGrid cols={{ sm: 2 }} spacing="xl">
      <SemiCircleProgress
        value={60}
        orientation="up"
        fillDirection="left-to-right"
        label="向上，左→右"
        size={150}
      />
      <SemiCircleProgress
        value={60}
        orientation="up"
        fillDirection="right-to-left"
        label="向上，右→左"
        size={150}
      />
      <SemiCircleProgress
        value={60}
        orientation="down"
        fillDirection="left-to-right"
        label="向下，左→右"
        size={150}
      />
      <SemiCircleProgress
        value={60}
        orientation="down"
        fillDirection="right-to-left"
        label="向下，右→左"
        size={150}
      />
    </SimpleGrid>
  );
}

export const orientations: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  defaultExpanded: false,
  centered: true,
};
