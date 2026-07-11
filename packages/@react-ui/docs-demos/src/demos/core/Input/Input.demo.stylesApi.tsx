import { AtIcon, CaretDownIcon } from '@phosphor-icons/react';
import { Input } from '@react-ui/ui';
import { MantineDemo } from '@react-ui/demo';
import { InputStylesApi } from '@react-ui/docs-styles-api';

const code = `
import { Input } from '@react-ui/ui';

function Demo() {
  const at = <AtIcon size={16} />;
  const chevron = <CaretDownIcon size={16} />;
  return <Input{{props}} placeholder="Input component" leftSection={at} rightSection={chevron} />;
}
`;

function Demo(props: any) {
  const at = <AtIcon size={16} />;
  const chevron = <CaretDownIcon size={16} />;
  return <Input placeholder="Input component" leftSection={at} rightSection={chevron} {...props} />;
}

export const stylesApi: MantineDemo = {
  type: 'styles-api',
  data: InputStylesApi,
  component: Demo,
  code,
  centered: true,
  maxWidth: 340,
};
