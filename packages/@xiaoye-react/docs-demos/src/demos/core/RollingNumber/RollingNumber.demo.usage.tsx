import { useState } from 'react';
import { Button, Group, RollingNumber } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { useState } from 'react';
import { Button, Group, RollingNumber } from '@xiaoye-react/ui';

function Demo() {
  const [value, setValue] = useState(1234);

  return (
    <>
      <RollingNumber value={value} fz="36px" />
      <Group mt="md">
        <Button onClick={() => setValue((v) => v + 1)}>增加</Button>
        <Button onClick={() => setValue((v) => v - 1)}>减少</Button>
        <Button onClick={() => setValue(Math.floor(Math.random() * 10000))}>随机</Button>
      </Group>
    </>
  );
}
`;

function Demo() {
  const [value, setValue] = useState(1234);

  return (
    <>
      <RollingNumber value={value} fz="36px" />
      <Group mt="md">
        <Button onClick={() => setValue((v) => v + 1)}>增加</Button>
        <Button onClick={() => setValue((v) => v - 1)}>减少</Button>
        <Button onClick={() => setValue(Math.floor(Math.random() * 10000))}>随机</Button>
      </Group>
    </>
  );
}

export const usage: UIDemo = {
  type: 'code',
  component: Demo,
  code,
};
