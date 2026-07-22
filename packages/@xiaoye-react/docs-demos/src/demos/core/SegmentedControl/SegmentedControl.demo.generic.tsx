import { SegmentedControl } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { SegmentedControl } from '@xiaoye-react/ui';

function Demo() {
  return (
    <SegmentedControl<string | number>
      data={[
        { value: 16, label: '16' },
        { value: 17, label: '17' },
        { value: '18+', label: '18 or older' },
      ]}
    />
  );
}
`;

function Demo() {
  return (
    <SegmentedControl<string | number>
      data={[
        { value: 16, label: '16' },
        { value: 17, label: '17' },
        { value: '18+', label: '18 or older' },
      ]}
    />
  );
}

export const generic: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
};
