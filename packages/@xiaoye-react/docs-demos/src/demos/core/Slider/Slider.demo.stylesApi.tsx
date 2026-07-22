import { Slider } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';
import { SliderStylesApi } from '@xiaoye-react/docs-styles-api';

const code = `
import { Slider } from '@xiaoye-react/ui';

function Demo() {
  return <Slider{{props}} marks={[{ value: 20, label: '20%' }, { value: 80, label: '80%' }]} labelAlwaysOn />;
}
`;

function Demo(props: any) {
  return (
    <Slider
      marks={[
        { value: 20, label: '20%' },
        { value: 80, label: '80%' },
      ]}
      defaultValue={40}
      labelAlwaysOn
      mb={40}
      {...props}
    />
  );
}

export const stylesApi: UIDemo = {
  type: 'styles-api',
  data: SliderStylesApi,
  component: Demo,
  code,
  centered: true,
  maxWidth: 400,
};
