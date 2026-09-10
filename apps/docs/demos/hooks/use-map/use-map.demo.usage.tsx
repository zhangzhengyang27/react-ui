import { PlusIcon } from '@phosphor-icons/react/dist/csr/Plus'
import { TrashIcon } from '@phosphor-icons/react/dist/csr/Trash'
import { ActionIcon, Group, Table } from '@xiaoye-react/ui'
import { useMap } from '@xiaoye-react/hooks'
import { UIDemo } from '@xiaoye-react/demo'

const code = `
import { PlusIcon } from '@phosphor-icons/react/dist/csr/Plus';
import { TrashIcon } from '@phosphor-icons/react/dist/csr/Trash';
import { ActionIcon, Group, Table } from '@xiaoye-react/ui';
import { useMap } from '@xiaoye-react/hooks';

function Demo() {
  const map = useMap([
    ['/hooks/use-media-query', 4124],
    ['/hooks/use-clipboard', 8341],
    ['/hooks/use-fetch', 9001],
  ]);

  const rows = Array.from(map.entries()).map(([key, value]) => (
    <Table.Tr key={key}>
      <Table.Td>{key}</Table.Td>
      <Table.Td>{value}</Table.Td>
      <Table.Td>
        <Group>
          <ActionIcon variant="default" onClick={() => map.set(key, value + 1)} fw={500}>
            <PlusIcon size={18} />
          </ActionIcon>
          <ActionIcon variant="default" onClick={() => map.delete(key)} c="red">
            <TrashIcon size={18} />
          </ActionIcon>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Table layout="fixed">
      <Table.Thead>
        <Table.Tr>
          <Table.Th>页面</Table.Th>
          <Table.Th>上月浏览量</Table.Th>
          <Table.Th />
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
}
`

function Demo() {
    const map = useMap([
        ['/hooks/use-media-query', 4124],
        ['/hooks/use-clipboard', 8341],
        ['/hooks/use-fetch', 9001]
    ])

    const rows = Array.from(map.entries()).map(([key, value]) => (
        <Table.Tr key={key}>
            <Table.Td>{key}</Table.Td>
            <Table.Td>{value}</Table.Td>
            <Table.Td>
                <Group>
                    <ActionIcon variant="default" onClick={() => map.set(key, value + 1)} fw={500}>
                        <PlusIcon size={18} />
                    </ActionIcon>
                    <ActionIcon variant="default" onClick={() => map.delete(key)} c="red">
                        <TrashIcon size={18} />
                    </ActionIcon>
                </Group>
            </Table.Td>
        </Table.Tr>
    ))

    return (
        <Table layout="fixed">
            <Table.Thead>
                <Table.Tr>
                    <Table.Th>页面</Table.Th>
                    <Table.Th>上月浏览量</Table.Th>
                    <Table.Th />
                </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
        </Table>
    )
}

export const usage: UIDemo = {
    type: 'code',
    component: Demo,
    code
}
