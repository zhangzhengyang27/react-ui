import React from 'react';
import { Table } from '@xiaoye-react/ui';
import DemoWrap from '../../_util/demoWrap';

const App: React.FC = () => (
  <DemoWrap>
    <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>名称</Table.Th>
          <Table.Th>值</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        <Table.Tr><Table.Td>React</Table.Td><Table.Td>UI</Table.Td></Table.Tr>
        <Table.Tr><Table.Td>Vue</Table.Td><Table.Td>Framework</Table.Td></Table.Tr>
      </Table.Tbody>
    </Table>
  </DemoWrap>
);

export default App;
