import { Text, TextInput } from '@xiaoye-react/ui';
import { useMask } from '@xiaoye-react/hooks';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { TextInput, Text } from '@xiaoye-react/ui';
import { useMask } from '@xiaoye-react/hooks';

function Demo() {
  const { ref, rawValue } = useMask({
    mask: '\\A-9999',
  });

  return (
    <>
      <TextInput ref={ref} label="产品代码" placeholder="A-____" />
      <Text size="sm" mt="sm">Raw value: {rawValue}</Text>
    </>
  );
}
`;

function Demo() {
  const { ref, rawValue } = useMask({
    mask: '\\A-9999',
  });

  return (
    <>
      <TextInput ref={ref} label="产品代码" placeholder="A-____" />
      <Text size="sm" mt="sm">
        Raw value: {rawValue}
      </Text>
    </>
  );
}

export const escape: UIDemo = {
  type: 'code',
  code,
  component: Demo,
};
