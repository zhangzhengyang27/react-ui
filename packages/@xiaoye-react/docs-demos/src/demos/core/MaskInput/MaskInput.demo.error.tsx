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
      error="无效的电话号码"
    />
  );
}
`;

function Demo() {
  return (
    <MaskInput
      label="电话号码"
      placeholder="(___) ___-____"
      mask="(999) 999-9999"
      error="无效的电话号码"
    />
  );
}

export const error: UIDemo = {
  type: 'code',
  code,
  component: Demo,
  centered: true,
  maxWidth: 340,
};
