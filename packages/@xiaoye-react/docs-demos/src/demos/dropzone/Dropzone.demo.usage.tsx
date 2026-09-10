import { UIDemo } from '@xiaoye-react/demo'
import { BaseDemo } from './_base'

const code = `
import { Group, Text } from '@xiaoye-react/ui';
import { UploadSimpleIcon } from '@phosphor-icons/react/dist/csr/UploadSimple';
import { ImageIcon } from '@phosphor-icons/react/dist/csr/Image';
import { XIcon } from '@phosphor-icons/react/dist/csr/X';
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE } from '@xiaoye-react/dropzone';

export function BaseDemo(props: Partial<DropzoneProps>) {
  return (
    <Dropzone
      onDrop={(files) => console.log('已接受的文件', files)}
      onReject={(files) => console.log('已拒绝的文件', files)}
      maxSize={5 * 1024 ** 2}
      accept={IMAGE_MIME_TYPE}
      {...props}
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
    </Dropzone>
  );
}
`

export const usage: UIDemo = {
    type: 'code',
    component: BaseDemo,
    code
}
