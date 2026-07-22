import { Text, TextInput } from '@xiaoye-react/ui';
import { useMask } from '@xiaoye-react/hooks';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { TextInput, Text } from '@xiaoye-react/ui';
import { useMask } from '@xiaoye-react/hooks';

function Demo() {
  const { ref, rawValue } = useMask({
    mask: '\\#hhhhhh',
    tokens: { h: /[0-9a-fA-F]/ },
  });

  return (
    <>
      <TextInput ref={ref} label="十六进制颜色" placeholder="#______" />
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
      <TextInput ref={ref} label="十六进制颜色" placeholder="#______" />
      <Text size="sm" mt="sm">
        Raw value: {rawValue}
      </Text>
    </>
  );
}

export const customTokens: UIDemo = {
  type: 'code',
  code,
  component: Demo,
};
