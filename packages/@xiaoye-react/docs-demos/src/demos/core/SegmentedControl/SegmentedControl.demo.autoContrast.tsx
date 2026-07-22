import { SegmentedControl, Stack } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { SegmentedControl, Stack } from '@xiaoye-react/ui';

function Demo() {
  return (
    <Stack>
      <SegmentedControl color="lime.4" data={['React', 'Angular', 'Vue', 'Svelte']} />
      <SegmentedControl color="lime.4" autoContrast data={['React', 'Angular', 'Vue', 'Svelte']} />
    </Stack>
  );
}
`;

function Demo() {
  return (
    <Stack>
      <SegmentedControl color="lime.4" data={['React', 'Angular', 'Vue', 'Svelte']} />
      <SegmentedControl color="lime.4" autoContrast data={['React', 'Angular', 'Vue', 'Svelte']} />
    </Stack>
  );
}

export const autoContrast: UIDemo = {
  type: 'code',
  component: Demo,
  centered: true,
  code,
};
