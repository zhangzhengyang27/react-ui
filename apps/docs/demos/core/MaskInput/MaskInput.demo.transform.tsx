import { MaskInput, Text } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { MaskInput, Text } from '@react-ui/ui';
import { formatMask, isMaskComplete } from '@react-ui/hooks';

function Demo() {
  return (
    <>
      <MaskInput
        label="优惠码"
        placeholder="AAA-9999"
        mask="AAA-9999"
        transform={(char) => char.toUpperCase()}
        slotChar="XXX-0000"
      />
      <Text size="sm" mt="sm" c="dimmed">
        Type lowercase letters – they will be auto-uppercased
      </Text>
    </>
  );
}
`;

function Demo() {
  return (
    <>
      <MaskInput
        label="优惠码"
        placeholder="AAA-9999"
        mask="AAA-9999"
        transform={(char) => char.toUpperCase()}
        slotChar="XXX-0000"
      />
      <Text size="sm" mt="sm" c="dimmed">
        Type lowercase letters – they will be auto-uppercased
      </Text>
    </>
  );
}

export const transform: UIDemo = {
  type: 'code',
  code,
  component: Demo,
  centered: true,
  maxWidth: 340,
};
