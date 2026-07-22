import { Text, TextInput } from '@xiaoye-react/ui';
import { useMask } from '@xiaoye-react/hooks';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { TextInput, Text } from '@xiaoye-react/ui';
import { useMask } from '@xiaoye-react/hooks';

function Demo() {
  const { ref, value, rawValue } = useMask({ mask: '(999) 999-9999' });

  return (
    <>
      <TextInput ref={ref} label="电话号码" placeholder="(___) ___-____" />
      <Text size="sm" mt="sm">Masked value: {value}</Text>
      <Text size="sm">Raw value: {rawValue}</Text>
    </>
  );
}
`;

function Demo() {
  const { ref, value, rawValue } = useMask({ mask: '(999) 999-9999' });

  return (
    <>
      <TextInput ref={ref} label="电话号码" placeholder="(___) ___-____" />
      <Text size="sm" mt="sm">
        Masked value: {value}
      </Text>
      <Text size="sm">Raw value: {rawValue}</Text>
    </>
  );
}

export const usage: UIDemo = {
  type: 'code',
  code,
  component: Demo,
};
