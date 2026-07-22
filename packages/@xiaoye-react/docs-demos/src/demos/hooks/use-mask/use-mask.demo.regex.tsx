import { Text, TextInput } from '@xiaoye-react/ui';
import { useMask } from '@xiaoye-react/hooks';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { TextInput, Text } from '@xiaoye-react/ui';
import { useMask } from '@xiaoye-react/hooks';

function Demo() {
  const { ref, rawValue } = useMask({
    mask: [/[0-2]/, /\\d/, ':', /[0-5]/, /\\d/],
  });

  return (
    <>
      <TextInput ref={ref} label="时间 (HH:MM)" placeholder="__:__" />
      <Text size="sm" mt="sm">Raw value: {rawValue}</Text>
    </>
  );
}
`;

function Demo() {
  const { ref, rawValue } = useMask({
    mask: [/[0-2]/, /\d/, ':', /[0-5]/, /\d/],
  });

  return (
    <>
      <TextInput ref={ref} label="时间 (HH:MM)" placeholder="__:__" />
      <Text size="sm" mt="sm">
        Raw value: {rawValue}
      </Text>
    </>
  );
}

export const regex: UIDemo = {
  type: 'code',
  code,
  component: Demo,
};
