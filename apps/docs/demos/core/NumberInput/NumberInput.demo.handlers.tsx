import { useState } from 'react';
import { Button, Group, NumberInput } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { useState } from 'react';
import { NumberInput, Group, Button } from '@xiaoye-react/ui';

function Demo() {
  const [value, setValue] = useState<number | string>(15);

  return (
    <>
      <NumberInput
        label="点击按钮修改值"
        placeholder="点击按钮"
        value={value}
        onChange={setValue}
        step={2}
        min={10}
        max={20}
      />

      <Group mt="md" justify="center">
        <Button
          onClick={() => setValue((current) => Math.max(10, Number(current) - 2))}
          variant="default"
        >
          Decrement by 2
        </Button>

        <Button
          onClick={() => setValue((current) => Math.min(20, Number(current) + 2))}
          variant="default"
        >
          Increment by 2
        </Button>
      </Group>
    </>
  );
}
`;

// NumberInput 无 handlersRef/NumberInputHandlers API,改为受控值 + 按钮步进
function Demo() {
  const [value, setValue] = useState<number | string>(15);

  return (
    <>
      <NumberInput
        label="点击按钮修改值"
        placeholder="点击按钮"
        value={value}
        onChange={setValue}
        step={2}
        min={10}
        max={20}
      />

      <Group mt="md" justify="center">
        <Button
          onClick={() => setValue((current) => Math.max(10, Number(current) - 2))}
          variant="default"
        >
          Decrement by 2
        </Button>

        <Button
          onClick={() => setValue((current) => Math.min(20, Number(current) + 2))}
          variant="default"
        >
          Increment by 2
        </Button>
      </Group>
    </>
  );
}

export const handlers: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  maxWidth: 340,
};
