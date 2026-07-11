import { Button, Group, Text, TextInput } from '@react-ui/ui';
import { useMask } from '@react-ui/hooks';
import { MantineDemo } from '@react-ui/demo';

const code = `
import { Button, Group, Text, TextInput } from '@react-ui/ui';
import { useMask } from '@react-ui/hooks';

function Demo() {
  const { ref, isComplete, rawValue } = useMask({
    mask: 'AAA-9999',
    slotChar: 'XXX-0000',
    transform: (char) => char.toUpperCase(),
  });

  return (
    <>
      <TextInput ref={ref} label="Promo code" placeholder="Enter promo code" />
      <Text size="sm" mt="sm">Raw value: {rawValue}</Text>
      <Group mt="xs">
        <Button disabled={!isComplete} size="xs">Apply code</Button>
      </Group>
    </>
  );
}
`;

function Demo() {
  const { ref, isComplete, rawValue } = useMask({
    mask: 'AAA-9999',
    slotChar: 'XXX-0000',
    transform: (char) => char.toUpperCase(),
  });

  return (
    <>
      <TextInput ref={ref} label="Promo code" placeholder="Enter promo code" />
      <Text size="sm" mt="sm">
        Raw value: {rawValue}
      </Text>
      <Group mt="xs">
        <Button disabled={!isComplete} size="xs">
          Apply code
        </Button>
      </Group>
    </>
  );
}

export const complete: MantineDemo = {
  type: 'code',
  code,
  component: Demo,
};
