import { MaskInput } from '@react-ui/ui';
import { MantineDemo } from '@react-ui/demo';

const code = `
import { MaskInput } from '@react-ui/ui';

function Demo() {
  return (
    <MaskInput
      label="Phone number"
      placeholder="(___) ___-____"
      mask="(999) 999-9999"
      disabled
    />
  );
}
`;

function Demo() {
  return (
    <MaskInput label="Phone number" placeholder="(___) ___-____" mask="(999) 999-9999" disabled />
  );
}

export const disabled: MantineDemo = {
  type: 'code',
  code,
  component: Demo,
  centered: true,
  maxWidth: 340,
};
