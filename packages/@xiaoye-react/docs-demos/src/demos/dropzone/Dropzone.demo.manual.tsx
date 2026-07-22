import { useRef } from 'react';
import { Button, Group } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';
import { BaseDemo } from './_base';

const code = `
import { useRef } from 'react';
import { Button, Group } from '@xiaoye-react/ui';
import { Dropzone } from '@xiaoye-react/dropzone';

function Demo() {
  const openRef = useRef<() => void>(null);

  return (
    <>
      <Dropzone openRef={openRef} onDrop={() => {}}>
        {/* children */}
      </Dropzone>

      <Group justify="center" mt="md">
        <Button onClick={() => openRef.current?.()}>选择文件</Button>
      </Group>
    </>
  );
}
`;

function Demo() {
  const openRef = useRef<() => void>(null);

  return (
    <>
      <BaseDemo openRef={openRef} />
      <Group justify="center" mt="md">
        <Button onClick={() => openRef.current?.()}>选择文件</Button>
      </Group>
    </>
  );
}

export const manual: UIDemo = {
  type: 'code',
  component: Demo,
  code,
};
