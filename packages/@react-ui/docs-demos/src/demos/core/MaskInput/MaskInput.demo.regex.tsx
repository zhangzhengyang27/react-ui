import { MaskInput } from '@react-ui/ui';
import { MantineDemo } from '@react-ui/demo';

const code = `
import { MaskInput } from '@react-ui/ui';

function Demo() {
  return (
    <MaskInput
      label="Time (HH:MM)"
      placeholder="__:__"
      mask={[/[0-2]/, /\\\\d/, ':', /[0-5]/, /\\\\d/]}
    />
  );
}
`;

function Demo() {
  return (
    <MaskInput
      label="Time (HH:MM)"
      placeholder="__:__"
      mask={[/[0-2]/, /\d/, ':', /[0-5]/, /\d/]}
    />
  );
}

export const regex: MantineDemo = {
  type: 'code',
  code,
  component: Demo,
  centered: true,
  maxWidth: 340,
};
