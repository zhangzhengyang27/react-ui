import { AtIcon, CaretDownIcon } from '@phosphor-icons/react';
import { Input } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';
import { InputStylesApi } from '@react-ui/docs-styles-api';

const code = `
import { Input } from '@react-ui/ui';

function Demo() {
  const at = <AtIcon size={16} />;
  const chevron = <CaretDownIcon size={16} />;
  return <Input{{props}} placeholder="输入组件" leftSection={at} rightSection={chevron} />;
}
`;

function Demo(props: any) {
  const at = <AtIcon size={16} />;
  const chevron = <CaretDownIcon size={16} />;
  return <Input placeholder="输入组件" leftSection={at} rightSection={chevron} {...props} />;
}

export const stylesApi: UIDemo = {
  type: 'styles-api',
  data: InputStylesApi,
  component: Demo,
  code,
  centered: true,
  maxWidth: 340,
};
