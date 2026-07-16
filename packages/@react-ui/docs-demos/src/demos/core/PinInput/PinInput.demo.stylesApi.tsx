import { PinInput } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';
import { PinInputStylesApi } from '@react-ui/docs-styles-api';

const code = `
import { PinInput } from '@react-ui/ui';

function Demo() {
  return (
    <PinInput{{props}} />
  );
}
`;

function Demo(props: any) {
  return <PinInput {...props} />;
}

export const stylesApi: UIDemo = {
  type: 'styles-api',
  data: PinInputStylesApi,
  component: Demo,
  code,
  centered: true,
};
