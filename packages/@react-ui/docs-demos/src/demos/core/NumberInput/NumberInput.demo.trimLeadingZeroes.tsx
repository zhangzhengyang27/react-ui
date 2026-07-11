import { NumberInput } from '@react-ui/ui';
import { MantineDemo } from '@react-ui/demo';

const code = `
import { NumberInput } from '@react-ui/ui';

function Demo() {
  return (
    <>
      <NumberInput
        label="Leading zeros removed on blur"
        placeholder="Type 00100 and click outside"
        trimLeadingZeroesOnBlur
        defaultValue="00100"
      />

      <NumberInput
        label="Leading zeros preserved"
        placeholder="Type 00100 and click outside"
        trimLeadingZeroesOnBlur={false}
        defaultValue="00100"
        mt="md"
      />
    </>
  );
}
`;

function Demo() {
  return (
    <>
      <NumberInput
        label="Leading zeros removed on blur"
        placeholder="Type 00100 and click outside"
        trimLeadingZeroesOnBlur
        defaultValue="00100"
      />

      <NumberInput
        label="Leading zeros preserved"
        placeholder="Type 00100 and click outside"
        trimLeadingZeroesOnBlur={false}
        defaultValue="00100"
        mt="md"
      />
    </>
  );
}

export const trimLeadingZeroes: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  maxWidth: 340,
};
