import { PinInput, PinInputProps } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';
import { PinInputStylesApi } from '@xiaoye-react/docs-styles-api';

const code = `
import { PinInput } from '@xiaoye-react/ui';

function Demo() {
  return (
    <PinInput{{props}} />
  );
}
`;

function Demo(props: PinInputProps) {
  return <PinInput {...props} />;
}

export const stylesApi: UIDemo = {
  type: 'styles-api',
  data: PinInputStylesApi,
  component: Demo,
  code,
  centered: true,
};
