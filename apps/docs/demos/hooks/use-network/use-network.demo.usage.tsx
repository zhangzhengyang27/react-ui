import { Table, Text } from '@xiaoye-react/ui';
import { useNetwork } from '@xiaoye-react/hooks';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { Text, Table } from '@xiaoye-react/ui';
import { useNetwork } from '@xiaoye-react/hooks';

function Demo() {
  const networkStatus = useNetwork();

  return (
    <Table maw={300} mx="auto">
      <Table.Thead>
        <Table.Tr>
          <Table.Th>属性</Table.Th>
          <Table.Th>值</Table.Th>
        </Table.Tr>
      </Table.Thead>

      <Table.Tbody>
        <Table.Tr>
          <Table.Td>在线</Table.Td>
          <Table.Td>
            <Text size="sm" c={networkStatus.online ? 'teal.6' : 'red.6'}>
              {networkStatus.online ? 'Online' : 'Offline'}
            </Text>
          </Table.Td>
        </Table.Tr>

        <Table.Tr>
          <Table.Td>rtt</Table.Td>
          <Table.Td>{networkStatus.rtt}</Table.Td>
        </Table.Tr>

        <Table.Tr>
          <Table.Td>下行链路</Table.Td>
          <Table.Td>{networkStatus.downlink}</Table.Td>
        </Table.Tr>

        <Table.Tr>
          <Table.Td>有效类型</Table.Td>
          <Table.Td>{networkStatus.effectiveType}</Table.Td>
        </Table.Tr>

        <Table.Tr>
          <Table.Td>节省数据</Table.Td>
          <Table.Td>
            <Text size="sm" c={networkStatus.saveData ? 'teal.6' : 'red.6'}>
              {networkStatus.saveData ? 'true' : 'false'}
            </Text>
          </Table.Td>
        </Table.Tr>
      </Table.Tbody>
    </Table>
  );
}
`;

function Demo() {
  const networkStatus = useNetwork();

  return (
    <Table maw={300} mx="auto">
      <Table.Thead>
        <Table.Tr>
          <Table.Th>属性</Table.Th>
          <Table.Th>值</Table.Th>
        </Table.Tr>
      </Table.Thead>

      <Table.Tbody>
        <Table.Tr>
          <Table.Td>在线</Table.Td>
          <Table.Td>
            <Text size="sm" c={networkStatus.online ? 'teal.6' : 'red.6'}>
              {networkStatus.online ? 'Online' : 'Offline'}
            </Text>
          </Table.Td>
        </Table.Tr>

        <Table.Tr>
          <Table.Td>rtt</Table.Td>
          <Table.Td>{networkStatus.rtt}</Table.Td>
        </Table.Tr>

        <Table.Tr>
          <Table.Td>下行链路</Table.Td>
          <Table.Td>{networkStatus.downlink}</Table.Td>
        </Table.Tr>

        <Table.Tr>
          <Table.Td>有效类型</Table.Td>
          <Table.Td>{networkStatus.effectiveType}</Table.Td>
        </Table.Tr>

        <Table.Tr>
          <Table.Td>节省数据</Table.Td>
          <Table.Td>
            <Text size="sm" c={networkStatus.saveData ? 'teal.6' : 'red.6'}>
              {networkStatus.saveData ? 'true' : 'false'}
            </Text>
          </Table.Td>
        </Table.Tr>
      </Table.Tbody>
    </Table>
  );
}

export const usage: UIDemo = {
  type: 'code',
  component: Demo,
  code,
};
