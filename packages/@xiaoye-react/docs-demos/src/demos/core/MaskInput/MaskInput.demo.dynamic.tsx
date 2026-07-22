import { MaskInput } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { MaskInput } from '@xiaoye-react/ui';

function Demo() {
  return (
    <MaskInput
      label="信用卡"
      placeholder="____ ____ ____ ____"
      mask="9999 9999 9999 9999"
      modify={(value) => {
        if (/^3[47]/.test(value)) {
          return { mask: '9999 999999 99999' };
        }
        return undefined;
      }}
    />
  );
}
`;

function Demo() {
  return (
    <MaskInput
      label="信用卡"
      placeholder="____ ____ ____ ____"
      mask="9999 9999 9999 9999"
      modify={(value) => {
        if (/^3[47]/.test(value)) {
          return { mask: '9999 999999 99999' };
        }
        return undefined;
      }}
    />
  );
}

export const dynamic: UIDemo = {
  type: 'code',
  code,
  component: Demo,
  centered: true,
  maxWidth: 340,
};
