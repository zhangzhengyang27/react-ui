import { useCallback, useState } from 'react';
import { Button } from '@react-ui/ui';
import { useEventListener } from '@react-ui/hooks';
import { UIDemo } from '@react-ui/demo';

const code = `
import { useState, useCallback } from 'react';
import { Button } from '@react-ui/ui';
import { useEventListener } from '@react-ui/hooks';

function Demo() {
  const [count, setCount] = useState(0);
  const increment = useCallback(() => setCount((c) => c + 1), []);
  const ref = useEventListener('click', increment);
  return <Button ref={ref}>Button clicks: {count}</Button>;
}
`;

function Demo() {
  const [count, setCount] = useState(0);
  const increment = useCallback(() => setCount((c) => c + 1), []);
  const ref = useEventListener('click', increment);
  return <Button ref={ref}>Button clicks: {count}</Button>;
}

export const usage: UIDemo = {
  type: 'code',
  code,
  component: Demo,
  centered: true,
};
