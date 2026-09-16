import { DotsThreeIcon } from '@phosphor-icons/react/dist/csr/DotsThree'
import { EyeIcon } from '@phosphor-icons/react/dist/csr/Eye'
import { FileZipIcon } from '@phosphor-icons/react/dist/csr/FileZip'
import { TrashIcon } from '@phosphor-icons/react/dist/csr/Trash'
import { ActionIcon, Card, Group, Image, Menu, SimpleGrid, Text } from '@xiaoye-react/ui'
import { UIDemo } from '@xiaoye-react/demo'

const code = `
import { ActionIcon, Card, Group, Image, Menu, SimpleGrid, Text } from '@xiaoye-react/ui';
import { DotsThreeIcon } from '@phosphor-icons/react/dist/csr/DotsThree';
import { EyeIcon } from '@phosphor-icons/react/dist/csr/Eye';
import { FileZipIcon } from '@phosphor-icons/react/dist/csr/FileZip';
import { TrashIcon } from '@phosphor-icons/react/dist/csr/Trash';
const images = [
  '/demo/images/bg-1.png',
  '/demo/images/bg-2.png',
  '/demo/images/bg-3.png',
];

function Demo() {
  return (
    <Card withBorder shadow="sm">
      <Card.Section withBorder inheritPadding py="xs">
        <Group justify="space-between">
          <Text fw={500}>查看图片</Text>
          <Menu withinPortal position="bottom-end" shadow="sm">
            <Menu.Target>
              <ActionIcon variant="subtle" color="gray">
                <DotsThreeIcon size={16} />
              </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item leftSection={<FileZipIcon size={14} />}>
                Download zip
              </Menu.Item>
              <Menu.Item leftSection={<EyeIcon size={14} />}>
                Preview all
              </Menu.Item>
              <Menu.Item
                leftSection={<TrashIcon size={14} />}
                color="red"
              >
                Delete all
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Card.Section>

      <Text mt="sm" c="dimmed" size="sm">
        <Text span inherit c="var(--ui-color-anchor)">
          200+ images uploaded
        </Text>{' '}
        since last visit, review them to select which one should be added to your gallery
      </Text>

      <Card.Section mt="sm">
        <Image src="/demo/images/bg-4.png" />
      </Card.Section>

      <Card.Section inheritPadding mt="sm" pb="md">
        <SimpleGrid cols={3}>
          {images.map((image) => (
            <Image src={image} key={image} radius="sm" />
          ))}
        </SimpleGrid>
      </Card.Section>
    </Card>
  );
}
`

const images = [
    '/demo/images/bg-1.png',
    '/demo/images/bg-2.png',
    '/demo/images/bg-3.png'
]

function Demo() {
    return (
        <Card withBorder shadow="sm">
            <Card.Section withBorder inheritPadding py="xs">
                <Group justify="space-between">
                    <Text fw={500}>查看图片</Text>
                    <Menu withinPortal position="bottom-end" shadow="sm">
                        <Menu.Target>
                            <ActionIcon variant="subtle" color="gray">
                                <DotsThreeIcon size={16} />
                            </ActionIcon>
                        </Menu.Target>

                        <Menu.Dropdown>
                            <Menu.Item leftSection={<FileZipIcon size={14} />}>下载压缩包</Menu.Item>
                            <Menu.Item leftSection={<EyeIcon size={14} />}>预览全部</Menu.Item>
                            <Menu.Item leftSection={<TrashIcon size={14} />} color="red">
                                Delete all
                            </Menu.Item>
                        </Menu.Dropdown>
                    </Menu>
                </Group>
            </Card.Section>

            <Text mt="sm" c="dimmed" size="sm">
                <Text span inherit c="var(--ui-color-anchor)">
                    200+ images uploaded
                </Text>{' '}
                since last visit, review them to select which one should be added to your gallery
            </Text>

            <Card.Section mt="sm">
                <Image src="/demo/images/bg-4.png" />
            </Card.Section>

            <Card.Section inheritPadding mt="sm" pb="md">
                <SimpleGrid cols={3}>
                    {images.map(image => (
                        <Image src={image} key={image} radius="sm" />
                    ))}
                </SimpleGrid>
            </Card.Section>
        </Card>
    )
}

export const section: UIDemo = {
    type: 'code',
    component: Demo,
    code,
    centered: true,
    maxWidth: 340,
    dimmed: true
}
