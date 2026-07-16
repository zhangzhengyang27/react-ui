import Fuse from 'fuse.js';
import { Highlight, Table, Text } from '@react-ui/ui';
import docgenData from '@/.docgen/docgen.json';
import { HtmlText } from '@/components/HtmlText';
import { TableError } from '@/components/TableError';
import { TableInlineCode } from '@/components/TableInlineCode';
import { prepareType } from './replace-types';
import classes from './PropsTable.module.css';

export interface DocgenProp {
  defaultValue: string | null;
  description: string;
  name: string;
  required: boolean;
  type: string | { name: string };
}

export interface Docgen {
  description: string;
  displayName: string;
  props: DocgenProp[] | Record<string, DocgenProp>;
}

const PROPS_DATA: Record<string, Docgen> = docgenData as any;

function getPropType(type: DocgenProp['type']): string {
  if (typeof type === 'string') {
    return type;
  }
  if (type && typeof type === 'object') {
    return type.name ?? '';
  }
  return '';
}

function getPropsRecord(props: Docgen['props']): Record<string, DocgenProp> {
  if (!Array.isArray(props)) {
    return props;
  }
  return props.reduce<Record<string, DocgenProp>>((acc, prop) => {
    acc[prop.name] = prop;
    return acc;
  }, {});
}

interface PropsTableProps {
  component: string;
  query: string;
}

export function PropsTable({ component, query }: PropsTableProps) {
  if (!PROPS_DATA[component]) {
    return <TableError errorOf="props" />;
  }

  const props = getPropsRecord(PROPS_DATA[component].props);
  const propsArray = Object.keys(props).map((propKey) => ({
    key: propKey,
    ...props[propKey],
    typeName: getPropType(props[propKey].type),
  }));

  let filteredPropKeys = Object.keys(props);

  if (query.trim()) {
    const fuse = new Fuse(propsArray, {
      keys: ['name', 'description', 'typeName'],
      threshold: 0.3,
      minMatchCharLength: 1,
    });

    const results = fuse.search(query);
    filteredPropKeys = results.map((result) => result.item.key);
  }

  const rows = filteredPropKeys.map((propKey) => {
    const prop = props[propKey];

    return (
      <Table.Tr key={propKey} data-props-table-row>
        <Table.Td style={{ whiteSpace: 'nowrap' }}>
          <Highlight
            className={classes.propName}
            highlight={query}
            component="span"
            data-deprecated={prop.description.includes('@deprecated') || undefined}
            title={prop.name}
          >
            {prop.name}
          </Highlight>
          {prop.required && (
            <Text component="sup" c="red">
              {' '}
              *
            </Text>
          )}
        </Table.Td>

        <Table.Td>
          <TableInlineCode>{prepareType(getPropType(prop.type))}</TableInlineCode>
        </Table.Td>
        <Table.Td>
          <HtmlText fz="sm">{prop.description}</HtmlText>
          {prop.defaultValue && (
            <HtmlText
              fz="sm"
              display="block"
            >{`默认值：<code>${prop.defaultValue}</code>`}</HtmlText>
          )}
        </Table.Td>
      </Table.Tr>
    );
  });

  return (
    <Table.ScrollContainer minWidth={800} data-visible={rows.length > 0 || undefined}>
      <Table layout="fixed">
        <Table.Thead>
          <Table.Tr>
            <Table.Th w={210}>名称</Table.Th>
            <Table.Th w={310}>类型</Table.Th>
            <Table.Th>说明</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
}
