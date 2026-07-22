import { SegmentedControl } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';
import { SegmentedControlStylesApi } from '@xiaoye-react/docs-styles-api';

const code = `
import { SegmentedControl } from '@xiaoye-react/ui';

function Demo() {
  return <SegmentedControl{{props}} data={['React', 'Angular', 'Vue']} />;
}
`;

function Demo(props: any) {
  return <SegmentedControl data={['React', 'Angular', 'Vue']} {...props} />;
}

export const stylesApi: UIDemo = {
  type: 'styles-api',
  data: SegmentedControlStylesApi,
  component: Demo,
  code,
  centered: true,
};
