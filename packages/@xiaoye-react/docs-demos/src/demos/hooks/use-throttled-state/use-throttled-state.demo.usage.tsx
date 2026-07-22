import { Text, TextInput } from '@xiaoye-react/ui';
import { useThrottledState } from '@xiaoye-react/hooks';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { Text, TextInput } from '@xiaoye-react/ui';
import { useThrottledState } from '@xiaoye-react/hooks';

function Demo() {
  const [throttledValue, setThrottledValue] = useThrottledState('', 1000);

  return (
    <>
      <TextInput
        placeholder="搜索"
        onChange={(event) => setThrottledValue(event.currentTarget.value)}
      />
      <Text>Throttled value: {throttledValue || '–'}</Text>
    </>
  );
}
`;

function Demo() {
  const [throttledValue, setThrottledValue] = useThrottledState('', 1000);

  return (
    <>
      <TextInput
        placeholder="搜索"
        onChange={(event) => setThrottledValue(event.currentTarget.value)}
      />
      <Text>Throttled value: {throttledValue || '–'}</Text>
    </>
  );
}

export const usage: UIDemo = {
  type: 'code',
  component: Demo,
  code,
};
