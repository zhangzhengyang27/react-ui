import { ColorInput, ColorInputProps } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';
import { ColorInputStylesApi } from '@xiaoye-react/docs-styles-api';

const code = `
import { ColorInput } from '@xiaoye-react/ui';

function Demo() {
  return (
    <ColorInput
      label="标签"
      placeholder="颜色输入"
      description="描述"
      error="错误"
      withAsterisk
      swatches={['#000', '#fff', '#f00', '#0f0', '#00f']}
      format="rgba"
      {{props}}
    />
  );
}
`;

function Demo(props: ColorInputProps) {
  return (
    <ColorInput
      label="标签"
      placeholder="颜色输入"
      description="描述"
      error="错误"
      withAsterisk
      swatches={['#000', '#fff', '#f00', '#0f0', '#00f']}
      format="rgba"
      classNames={props.classNames}
    />
  );
}

export const stylesApi: UIDemo = {
  type: 'styles-api',
  data: ColorInputStylesApi,
  component: Demo,
  code,
  centered: true,
  maxWidth: 340,
};
