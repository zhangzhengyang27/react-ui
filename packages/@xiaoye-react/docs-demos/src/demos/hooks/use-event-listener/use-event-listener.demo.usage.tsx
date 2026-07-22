import { useCallback, useState } from 'react';
import { Button } from '@xiaoye-react/ui';
import { useEventListener } from '@xiaoye-react/hooks';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { useState, useCallback } from 'react';
import { Button } from '@xiaoye-react/ui';
import { useEventListener } from '@xiaoye-react/hooks';

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
