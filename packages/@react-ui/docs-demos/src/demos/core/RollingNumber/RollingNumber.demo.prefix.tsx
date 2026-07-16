import { useState } from 'react';
import { Button, Group, RollingNumber } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { useState } from 'react';
import { Button, Group, RollingNumber } from '@react-ui/ui';

function Demo() {
  const [value, setValue] = useState(99.99);

  return (
    <>
      <RollingNumber
        value={value}
        prefix="$ "
        suffix=" USD"
        decimalScale={2}
        fixedDecimalScale
        thousandSeparator
        fz="32px"
      />
      <Group mt="md">
        <Button onClick={() => setValue((v) => +(v + 10.5).toFixed(2))}>+10.50</Button>
        <Button onClick={() => setValue((v) => +(v - 10.5).toFixed(2))}>-10.50</Button>
        <Button onClick={() => setValue(+(Math.random() * 10000).toFixed(2))}>随机</Button>
      </Group>
    </>
  );
}
`;

function Demo() {
  const [value, setValue] = useState(99.99);

  return (
    <>
      <RollingNumber
        value={value}
        prefix="$ "
        suffix=" USD"
        decimalScale={2}
        fixedDecimalScale
        thousandSeparator
        fz="32px"
      />
      <Group mt="md">
        <Button onClick={() => setValue((v) => +(v + 10.5).toFixed(2))}>+10.50</Button>
        <Button onClick={() => setValue((v) => +(v - 10.5).toFixed(2))}>-10.50</Button>
        <Button onClick={() => setValue(+(Math.random() * 10000).toFixed(2))}>随机</Button>
      </Group>
    </>
  );
}

export const prefix: UIDemo = {
  type: 'code',
  component: Demo,
  code,
};
