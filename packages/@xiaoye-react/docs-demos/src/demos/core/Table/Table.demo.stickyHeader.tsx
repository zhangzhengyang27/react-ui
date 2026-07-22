import { Table } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';
import { elements } from './_data';

const code = `
import { Table } from '@xiaoye-react/ui';

const elements = [
  { position: 6, mass: 12.011, symbol: 'C', name: 'Carbon' },
  { position: 7, mass: 14.007, symbol: 'N', name: 'Nitrogen' },
  { position: 39, mass: 88.906, symbol: 'Y', name: 'Yttrium' },
  { position: 56, mass: 137.33, symbol: 'Ba', name: 'Barium' },
  { position: 58, mass: 140.12, symbol: 'Ce', name: 'Cerium' },
];

function Demo() {
  const rows = elements.map((element) => (
    <Table.Tr key={element.name}>
      <Table.Td>{element.position}</Table.Td>
      <Table.Td>{element.name}</Table.Td>
      <Table.Td>{element.symbol}</Table.Td>
      <Table.Td>{element.mass}</Table.Td>
    </Table.Tr>
  ));

  return (
    <Table stickyHeader stickyHeaderOffset={60}>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>元素位置</Table.Th>
          <Table.Th>元素名称</Table.Th>
          <Table.Th>符号</Table.Th>
          <Table.Th>原子质量</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
      <Table.Caption>滚动页面查看粘性表头</Table.Caption>
    </Table>
  );
}
`;

export function Demo() {
  const rows = elements.map((element) => (
    <Table.Tr key={element.name}>
      <Table.Td>{element.position}</Table.Td>
      <Table.Td>{element.name}</Table.Td>
      <Table.Td>{element.symbol}</Table.Td>
      <Table.Td>{element.mass}</Table.Td>
    </Table.Tr>
  ));

  return (
    <Table stickyHeader stickyHeaderOffset="var(--docs-header-height)">
      <Table.Thead>
        <Table.Tr>
          <Table.Th>元素位置</Table.Th>
          <Table.Th>元素名称</Table.Th>
          <Table.Th>符号</Table.Th>
          <Table.Th>原子质量</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
      <Table.Caption>滚动页面查看粘性表头</Table.Caption>
    </Table>
  );
}

export const stickyHeader: UIDemo = {
  type: 'code',
  code,
  component: Demo,
};
