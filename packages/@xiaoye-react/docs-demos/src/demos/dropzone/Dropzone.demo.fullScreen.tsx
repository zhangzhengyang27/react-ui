/* oxlint-disable no-console */
import { useState } from 'react'
import { Button, Group } from '@xiaoye-react/ui'
import { Dropzone, IMAGE_MIME_TYPE } from '@xiaoye-react/ui'
import { UIDemo } from '@xiaoye-react/demo'
import { DropzoneDemoChildren } from './_base'

const code = `
import { useState } from 'react';
import { Group, Text, Button } from '@xiaoye-react/ui';
import { UploadSimpleIcon } from '@phosphor-icons/react/dist/csr/UploadSimple';
import { ImageIcon } from '@phosphor-icons/react/dist/csr/Image';
import { XIcon } from '@phosphor-icons/react/dist/csr/X';
import { Dropzone, IMAGE_MIME_TYPE } from '@xiaoye-react/ui';

function Demo() {
  const [active, setActive] = useState(false);

  return (
    <>
      <Group justify="center">
        <Button color={active ? 'red' : 'blue'} onClick={() => setActive((d) => !d)}>
          {active ? '退出' : '激活'}全屏拖放区
        </Button>
      </Group>

      <Dropzone.FullScreen
        active={active}
        accept={IMAGE_MIME_TYPE}
        onDrop={(files) => {
          console.log(files);
          setActive(false);
        }}
      >
        <Group justify="center" gap="xl" mih={220} style={{ pointerEvents: 'none' }}>
          <Dropzone.Accept>
            <UploadSimpleIcon size={52} color="var(--ui-color-blue-6)" />
          </Dropzone.Accept>
          <Dropzone.Reject>
            <XIcon size={52} color="var(--ui-color-red-6)" />
          </Dropzone.Reject>
          <Dropzone.Idle>
            <ImageIcon size={52} color="var(--ui-color-dimmed)" />
          </Dropzone.Idle>

          <div>
            <Text size="xl" inline>
              Drag images here or click to select files
            </Text>
            <Text size="sm" c="dimmed" inline mt={7}>
              Attach as many files as you like, each file should not exceed 5mb
            </Text>
          </div>
        </Group>
      </Dropzone.FullScreen>
    </>
  );
}
`

function Demo() {
    const [active, setActive] = useState(false)

    return (
        <>
            <Group justify="center">
                <Button color={active ? 'red' : 'blue'} onClick={() => setActive(d => !d)}>
                    {active ? '退出' : '激活'}全屏拖放区
                </Button>
            </Group>

            <Dropzone.FullScreen
                active={active}
                accept={IMAGE_MIME_TYPE}
                onDrop={files => {
                    console.log(files)
                    setActive(false)
                }}
            >
                <DropzoneDemoChildren />
            </Dropzone.FullScreen>
        </>
    )
}

export const fullScreen: UIDemo = {
    type: 'code',
    component: Demo,
    code
}
