import { MaskInput } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { MaskInput } from '@xiaoye-react/ui';

function Demo() {
  return (
    <MaskInput
      label="十六进制颜色"
      placeholder="#______"
      mask="#hhhhhh"
      tokens={{ h: /[0-9a-fA-F]/ }}
    />
  );
}
`;

function Demo() {
  return (
    <MaskInput
      label="十六进制颜色"
      placeholder="#______"
      mask="#hhhhhh"
      tokens={{ h: /[0-9a-fA-F]/ }}
    />
  );
}

export const customTokens: UIDemo = {
  type: 'code',
  code,
  component: Demo,
  centered: true,
  maxWidth: 340,
};
