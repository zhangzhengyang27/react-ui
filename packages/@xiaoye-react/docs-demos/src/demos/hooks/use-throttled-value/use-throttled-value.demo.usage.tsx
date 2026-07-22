import { useState } from 'react';
import { Text, TextInput } from '@xiaoye-react/ui';
import { useThrottledValue } from '@xiaoye-react/hooks';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { Text, TextInput } from '@xiaoye-react/ui';
import { useThrottledValue } from '@xiaoye-react/hooks';

function Demo() {
  const [value, setValue] = useState('');
  const throttledValue = useThrottledValue(value, 1000);

  return (
    <>
      <TextInput placeholder="搜索" onChange={(event) => setValue(event.currentTarget.value)} />
      <Text>Throttled value: {throttledValue || '–'}</Text>
    </>
  );
}
`;

function Demo() {
  const [value, setValue] = useState('');
  const throttledValue = useThrottledValue(value, 1000);

  return (
    <>
      <TextInput placeholder="搜索" onChange={(event) => setValue(event.currentTarget.value)} />
      <Text>Throttled value: {throttledValue || '–'}</Text>
    </>
  );
}

export const usage: UIDemo = {
  type: 'code',
  component: Demo,
  code,
};
