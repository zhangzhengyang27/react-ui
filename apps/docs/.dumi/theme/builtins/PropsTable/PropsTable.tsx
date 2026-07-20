import Fuse from 'fuse.js';
import { Highlight, Table, Text } from '@react-ui/ui';
import docgenData from '@docs/docgen';
import { HtmlText } from '../HtmlText';
import { TableError } from '../TableError';
import { TableInlineCode } from '../TableInlineCode';
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

function extractEnumValues(type: string): string[] | null {
  const trimmed = type.trim();

  // Match quoted string literals separated by `|` (e.g. "default" | "primary" | "danger")
  if (/^("[^"]*"|'[^']*')(\s*\|\s*("[^"]*"|'[^']*'))*$/.test(trimmed)) {
    return trimmed
      .split('|')
      .map((part) => part.trim().replace(/^["']|["']$/g, ''))
      .filter(Boolean);
  }

  return null;
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
    const typeName = getPropType(prop.type);
    const enumValues = extractEnumValues(typeName);
    const displayType = enumValues ? 'string' : prepareType(typeName);

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
          <TableInlineCode className={classes.typeCode}>{displayType}</TableInlineCode>
        </Table.Td>

        <Table.Td>
          {enumValues ? (
            <TableInlineCode className={classes.enumCode}>
              {enumValues.join(' | ')}
            </TableInlineCode>
          ) : (
            <Text c="dimmed" fz="sm">—</Text>
          )}
        </Table.Td>

        <Table.Td>
          <HtmlText fz="sm">{prop.description}</HtmlText>
        </Table.Td>

        <Table.Td>
          {prop.defaultValue ? (
            <TableInlineCode className={classes.defaultCode}>{prop.defaultValue}</TableInlineCode>
          ) : (
            <Text c="dimmed" fz="sm">—</Text>
          )}
        </Table.Td>
      </Table.Tr>
    );
  });

  return (
    <div className={classes.scrollContainer} data-visible={rows.length > 0 || undefined}>
      <Table layout="fixed" className={classes.table}>
        <Table.Thead>
          <Table.Tr>
            <Table.Th w={180} className={classes.stickyTh}>名称</Table.Th>
            <Table.Th w={260} className={classes.stickyTh}>类型</Table.Th>
            <Table.Th w={180} className={classes.stickyTh}>可选值</Table.Th>
            <Table.Th className={classes.stickyTh}>说明</Table.Th>
            <Table.Th w={140} className={classes.stickyTh}>默认值</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </div>
  );
}
