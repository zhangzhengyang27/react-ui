import { Text, TextInput } from '@react-ui/ui';
import { useMask } from '@react-ui/hooks';
import { MantineDemo } from '@react-ui/demo';

const code = `
import { TextInput, Text } from '@react-ui/ui';
import { useMask } from '@react-ui/hooks';

function Demo() {
  const { ref, rawValue } = useMask({
    mask: '\\#hhhhhh',
    tokens: { h: /[0-9a-fA-F]/ },
  });

  return (
    <>
      <TextInput ref={ref} label="Hex color" placeholder="#______" />
      <Text size="sm" mt="sm">Raw value: {rawValue}</Text>
    </>
  );
}
`;

function Demo() {
  const { ref, rawValue } = useMask({
    mask: '\\#hhhhhh',
    tokens: { h: /[0-9a-fA-F]/ },
  });

  return (
    <>
      <TextInput ref={ref} label="Hex color" placeholder="#______" />
      <Text size="sm" mt="sm">
        Raw value: {rawValue}
      </Text>
    </>
  );
}

export const customTokens: MantineDemo = {
  type: 'code',
  code,
  component: Demo,
};
