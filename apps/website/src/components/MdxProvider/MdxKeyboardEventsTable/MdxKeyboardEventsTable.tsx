import { Code, Kbd, Table } from '@react-ui/ui';

interface KeyboardEventsTableProps {
  data: { key: string; description: string; condition: string }[];
}

export function MdxKeyboardEventsTable({ data }: KeyboardEventsTableProps) {
  const hasCondition = data.some((item) => item.condition);
  const rows = data.map((item, index) => (
    <Table.Tr key={index}>
      <Table.Td>
        <Kbd>{item.key}</Kbd>
      </Table.Td>
      <Table.Td>{item.description}</Table.Td>
      {hasCondition && <Table.Td>{item.condition ? <Code>{item.condition}</Code> : '–'}</Table.Td>}
    </Table.Tr>
  ));

  return (
    <Table.ScrollContainer minWidth={500}>
      <Table verticalSpacing="xs">
        <Table.Thead>
          <Table.Tr>
            <Table.Th>按键</Table.Th>
            <Table.Th>说明</Table.Th>
            {hasCondition && <Table.Th>条件</Table.Th>}
          </Table.Tr>
        </Table.Thead>
        <tbody>{rows}</tbody>
      </Table>
    </Table.ScrollContainer>
  );
}
