import { MaskInput } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { MaskInput } from '@xiaoye-react/ui';

function Demo() {
  return (
    <MaskInput
      label="时间 (HH:MM)"
      placeholder="__:__"
      mask={[/[0-2]/, /\\\\d/, ':', /[0-5]/, /\\\\d/]}
    />
  );
}
`;

function Demo() {
  return (
    <MaskInput
      label="时间 (HH:MM)"
      placeholder="__:__"
      mask={[/[0-2]/, /\d/, ':', /[0-5]/, /\d/]}
    />
  );
}

export const regex: UIDemo = {
  type: 'code',
  code,
  component: Demo,
  centered: true,
  maxWidth: 340,
};
