import { useState } from 'react';
import { Button, Text } from '@xiaoye-react/ui';
import { useIsFirstRender } from '@xiaoye-react/hooks';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { useState } from 'react';
import { Button, Text } from '@xiaoye-react/ui';
import { useIsFirstRender } from '@xiaoye-react/hooks';

function Demo() {
  const [counter, setCounter] = useState(0);
  const firstRender = useIsFirstRender();
  return (
    <div>
      <Text>
        Is first render:{' '}
        <Text span c={firstRender ? 'teal' : 'red'}>
          {firstRender ? '是' : '否！'}
        </Text>
      </Text>
      <Button onClick={() => setCounter((c) => c + 1)} mt="sm">
        Rerendered {counter} times, click to rerender
      </Button>
    </div>
  );
}
`;

function Demo() {
  const [counter, setCounter] = useState(0);
  const firstRender = useIsFirstRender();
  return (
    <div>
      <Text>
        Is first render:{' '}
        <Text span c={firstRender ? 'teal' : 'red'}>
          {firstRender ? '是' : '否！'}
        </Text>
      </Text>
      <Button onClick={() => setCounter((c) => c + 1)} mt="sm">
        Rerendered {counter} times, click to rerender
      </Button>
    </div>
  );
}

export const usage: UIDemo = {
  type: 'code',
  component: Demo,
  code,
};
