import { useRef } from 'react';
import { Button, Group, MaskInput } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { useRef } from 'react';
import { MaskInput, Button, Group } from '@react-ui/ui';

function Demo() {
  const resetRef = useRef<() => void>(null);

  return (
    <>
      <MaskInput
        label="电话号码"
        placeholder="(___) ___-____"
        mask="(999) 999-9999"
        resetRef={resetRef}
      />

      <Group mt="md">
        <Button onClick={() => resetRef.current?.()}>重置</Button>
      </Group>
    </>
  );
}
`;

function Demo() {
  const resetRef = useRef<() => void>(null);

  return (
    <>
      <MaskInput
        label="电话号码"
        placeholder="(___) ___-____"
        mask="(999) 999-9999"
        resetRef={resetRef}
      />

      <Group mt="md">
        <Button onClick={() => resetRef.current?.()}>重置</Button>
      </Group>
    </>
  );
}

export const resetRef: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  maxWidth: 340,
  centered: true,
};
