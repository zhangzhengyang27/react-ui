import { SegmentedControl } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { SegmentedControl } from '@react-ui/ui';

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
