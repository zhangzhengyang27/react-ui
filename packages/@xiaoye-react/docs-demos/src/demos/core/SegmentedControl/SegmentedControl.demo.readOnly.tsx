import { SegmentedControl } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { SegmentedControl } from '@xiaoye-react/ui';

function Demo() {
  return <SegmentedControl readOnly defaultValue="Angular" data={['React', 'Angular', 'Vue']} />;
}
`;

function Demo() {
  return <SegmentedControl readOnly defaultValue="Angular" data={['React', 'Angular', 'Vue']} />;
}

export const readOnly: UIDemo = {
  type: 'code',
  component: Demo,
  centered: true,
  code,
};
