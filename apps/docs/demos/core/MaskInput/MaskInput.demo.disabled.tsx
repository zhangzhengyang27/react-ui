import { MaskInput } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { MaskInput } from '@react-ui/ui';

function Demo() {
  return (
    <MaskInput
      label="电话号码"
      placeholder="(___) ___-____"
      mask="(999) 999-9999"
      disabled
    />
  );
}
`;

function Demo() {
  return (
    <MaskInput label="电话号码" placeholder="(___) ___-____" mask="(999) 999-9999" disabled />
  );
}

export const disabled: UIDemo = {
  type: 'code',
  code,
  component: Demo,
  centered: true,
  maxWidth: 340,
};
