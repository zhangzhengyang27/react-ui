import { Table, TableProps } from '@react-ui/ui';
import { HtmlText } from '../HtmlText';
import { TableInlineCode } from '../TableInlineCode';
import type { StylesApiData } from './StylesApiTable';

interface SelectorsTableProps extends Omit<TableProps, 'data'> {
  data: StylesApiData;
  component: string;
  fixedLayout?: boolean;
}

export function SelectorsTable({
  data,
  component,
  fixedLayout = true,
  ...others
}: SelectorsTableProps) {
  const rows = Object.keys(data.selectors).map((selector) => (
    <Table.Tr key={selector}>
      <Table.Td>{selector}</Table.Td>
      <Table.Td>
        <TableInlineCode>
          .ui-{component}-{selector}
        </TableInlineCode>
      </Table.Td>
      <Table.Td>
        <HtmlText>{data.selectors[selector]}</HtmlText>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Table.ScrollContainer minWidth={800}>
      <Table layout={fixedLayout ? 'fixed' : undefined} {...others}>
        <Table.Thead>
          <Table.Tr>
            <Table.Th w={fixedLayout ? 210 : undefined}>选择器</Table.Th>
            <Table.Th w={fixedLayout ? 310 : undefined}>静态选择器</Table.Th>
            <Table.Th>说明</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
}
