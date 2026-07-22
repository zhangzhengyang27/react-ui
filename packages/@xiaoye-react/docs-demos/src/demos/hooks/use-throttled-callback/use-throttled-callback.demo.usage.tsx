import { useState } from 'react';
import { Text, TextInput } from '@xiaoye-react/ui';
import { useThrottledCallback } from '@xiaoye-react/hooks';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { Text, TextInput } from '@xiaoye-react/ui';
import { useThrottledCallback } from '@xiaoye-react/hooks';

function Demo() {
  const [throttledValue, setValue] = useState('');
  const throttledSetValue = useThrottledCallback((value) => setValue(value), 1000);

  return (
    <>
      <TextInput
        placeholder="搜索"
        onChange={(event) => throttledSetValue(event.currentTarget.value)}
      />
      <Text>Throttled value: {throttledValue || '–'}</Text>
    </>
  );
}
`;

function Demo() {
  const [throttledValue, setValue] = useState('');
  const throttledSetValue = useThrottledCallback((value) => setValue(value), 1000);

  return (
    <>
      <TextInput
        placeholder="搜索"
        onChange={(event) => throttledSetValue(event.currentTarget.value)}
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
