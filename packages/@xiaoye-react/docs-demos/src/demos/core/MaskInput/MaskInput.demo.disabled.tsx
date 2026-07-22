import { MaskInput } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { MaskInput } from '@xiaoye-react/ui';

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
