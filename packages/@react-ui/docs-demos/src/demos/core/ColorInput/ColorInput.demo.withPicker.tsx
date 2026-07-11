import { ColorInput } from '@react-ui/ui';
import { MantineDemo } from '@react-ui/demo';

const code = `
import { ColorInput } from '@react-ui/ui';

function Demo() {
  return (
    <ColorInput withPicker={false} pointer label="Without dropdown" placeholder="Enter value" />
  );
}
`;

function Demo() {
  return (
    <ColorInput withPicker={false} pointer label="Without dropdown" placeholder="Enter value" />
  );
}

export const withPicker: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  maxWidth: 340,
};
