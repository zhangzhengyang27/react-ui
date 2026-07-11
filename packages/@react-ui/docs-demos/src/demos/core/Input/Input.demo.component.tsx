import { CaretDownIcon } from '@phosphor-icons/react';
import { Input } from '@react-ui/ui';
import { MantineDemo } from '@react-ui/demo';

const code = `
import { Input } from '@react-ui/ui';
import { CaretDownIcon } from '@phosphor-icons/react';

function Demo() {
  return (
    <>
      <Input component="button" pointer>
        Button input
      </Input>

      <Input
        component="select"
        rightSection={<CaretDownIcon size={14} />}
        pointer
        mt="md"
      >
        <option value="1">1</option>
        <option value="2">2</option>
      </Input>
    </>
  );
}
`;

function Demo() {
  return (
    <>
      <Input component="button" pointer>
        Button input
      </Input>

      <Input component="select" rightSection={<CaretDownIcon size={14} />} pointer mt="md">
        <option value="1">1</option>
        <option value="2">2</option>
      </Input>
    </>
  );
}

export const component: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
};
