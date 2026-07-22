import { Table } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';
import { elementsLong } from './_data';

const code = `
import { Table } from '@xiaoye-react/ui';

function Demo() {
  const rows = elementsLong.map((element) => (
    <Table.Tr key={element.name}>
      <Table.Td>{element.position}</Table.Td>
      <Table.Td>{element.name}</Table.Td>
      <Table.Td>{element.symbol}</Table.Td>
      <Table.Td>{element.mass}</Table.Td>
    </Table.Tr>
  ));

  return (
    <Table.ScrollContainer minWidth={500} maxHeight={300}>
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>元素位置</Table.Th>
            <Table.Th>元素名称</Table.Th>
            <Table.Th>符号</Table.Th>
            <Table.Th>原子质量</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
}
`;

function Demo() {
  const rows = elementsLong.map((element) => (
    <Table.Tr key={element.name}>
      <Table.Td>{element.position}</Table.Td>
      <Table.Td>{element.name}</Table.Td>
      <Table.Td>{element.symbol}</Table.Td>
      <Table.Td>{element.mass}</Table.Td>
    </Table.Tr>
  ));

  return (
    <Table.ScrollContainer minWidth={500} maxHeight={300}>
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>元素位置</Table.Th>
            <Table.Th>元素名称</Table.Th>
            <Table.Th>符号</Table.Th>
            <Table.Th>原子质量</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
}

export const scrollContainerMaxHeight: UIDemo = {
  type: 'code',
  code,
  component: Demo,
};
