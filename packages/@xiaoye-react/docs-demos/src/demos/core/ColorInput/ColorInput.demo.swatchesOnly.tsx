import { ColorInput } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { ColorInput } from '@xiaoye-react/ui';

function Demo() {
  return (
    <ColorInput
      placeholder="选择颜色"
      label="你最喜欢的颜色"
      disallowInput
      withPicker={false}
      withEyeDropper={false}
      swatches={['#2e2e2e', '#868e96', '#fa5252', '#e64980', '#be4bdb', '#7950f2', '#4c6ef5', '#228be6', '#15aabf', '#12b886', '#40c057', '#82c91e', '#fab005', '#fd7e14']}
    />
  );
}
`;

function Demo() {
  return (
    <ColorInput
      maw={320}
      mx="auto"
      placeholder="选择颜色"
      label="你最喜欢的颜色"
      disallowInput
      withPicker={false}
      withEyeDropper={false}
      swatches={[
        '#2e2e2e',
        '#868e96',
        '#fa5252',
        '#e64980',
        '#be4bdb',
        '#7950f2',
        '#4c6ef5',
        '#228be6',
        '#15aabf',
        '#12b886',
        '#40c057',
        '#82c91e',
        '#fab005',
        '#fd7e14',
      ]}
    />
  );
}

export const swatchesOnly: UIDemo = {
  type: 'code',
  component: Demo,
  code,
};
