import { useState } from 'react';
import { Button } from '@xiaoye-react/ui';
import { useLogger } from '@xiaoye-react/hooks';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { useState } from 'react';
import { useLogger } from '@xiaoye-react/hooks';
import { Button } from '@xiaoye-react/ui';

function Demo() {
  const [count, setCount] = useState(0);
  useLogger('Demo', [{ count, hello: 'world' }]);
  return <Button onClick={() => setCount((c) => c + 1)}>Update state ({count})</Button>;
}
`;

function Demo() {
  const [count, setCount] = useState(0);
  useLogger('Demo', [{ count, hello: 'world' }]);
  return <Button onClick={() => setCount((c) => c + 1)}>Update state ({count})</Button>;
}

export const usage: UIDemo = {
  type: 'code',
  code,
  component: Demo,
  centered: true,
};
