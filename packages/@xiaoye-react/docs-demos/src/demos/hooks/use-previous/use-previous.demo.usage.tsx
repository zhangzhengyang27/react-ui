import { Text, TextInput } from '@xiaoye-react/ui';
import { useInputState, usePrevious } from '@xiaoye-react/hooks';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { TextInput, Text } from '@xiaoye-react/ui';
import { usePrevious, useInputState } from '@xiaoye-react/hooks';

function Demo() {
  const [value, setValue] = useInputState('');
  const previousValue = usePrevious(value);

  return (
    <div>
      <TextInput
        label="在此输入一些文本"
        placeholder="在此输入一些文本"
        id="previous-demo-input"
        value={value}
        onChange={setValue}
      />
      <Text mt="md">Current value: {value}</Text>
      <Text>Previous value: {previousValue}</Text>
    </div>
  );
}
`;

function Demo() {
  const [value, setValue] = useInputState('');
  const previousValue = usePrevious(value);

  return (
    <div>
      <TextInput
        label="在此输入一些文本"
        placeholder="在此输入一些文本"
        id="previous-demo-input"
        value={value}
        onChange={setValue}
      />
      <Text mt="md">Current value: {value}</Text>
      <Text>Previous value: {previousValue}</Text>
    </div>
  );
}

export const usage: UIDemo = {
  type: 'code',
  component: Demo,
  code,
};
