import { Table, TableProps } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';
import { elements } from './_data';

function Wrapper(props: TableProps) {
  return (
    <Table {...props}>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>位置</Table.Th>
          <Table.Th>姓名</Table.Th>
          <Table.Th>符号</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {elements.map((element) => (
          <Table.Tr key={element.name}>
            <Table.Td>{element.position}</Table.Td>
            <Table.Td>{element.name}</Table.Td>
            <Table.Td>{element.symbol}</Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );
}

const code = `
import { Table } from '@xiaoye-react/ui';

function Demo() {
  return (
    <Table{{props}}>
      {/* {...rows} */}
    </Table>
  );
}
`;

export const spacingConfigurator: UIDemo = {
  type: 'configurator',
  component: Wrapper,
  code,
  controls: [
    { prop: 'horizontalSpacing', type: 'size', libraryValue: 'xs', initialValue: 'xs' },
    { prop: 'verticalSpacing', type: 'size', initialValue: 'xs', libraryValue: 'xs' },
  ],
};
