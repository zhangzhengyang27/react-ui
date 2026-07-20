import { SegmentedControl } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';
import { SegmentedControlStylesApi } from '@react-ui/docs-styles-api';

const code = `
import { SegmentedControl } from '@react-ui/ui';

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
