import { MaskInput, Text } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { MaskInput, Text } from '@xiaoye-react/ui';
import { formatMask, isMaskComplete } from '@xiaoye-react/hooks';

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
