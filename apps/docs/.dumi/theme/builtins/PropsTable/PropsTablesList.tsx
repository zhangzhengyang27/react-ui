import { useState } from 'react';
import { Text, TextInput, Title } from '@react-ui/ui';
import { FiSearch } from 'react-icons/fi';
import { getComponentName } from './getComponentName';
import { PropsTable } from './PropsTable';
import classes from './PropsTablesList.module.css';

export interface PropsTablesListProps {
  components: string[];
  componentPrefix?: string;
}

export function PropsTablesList({ components, componentPrefix }: PropsTablesListProps) {
  const [query, setQuery] = useState('');

  const tables = components.map((component) => (
    <div key={component} className={classes.section} data-props-table-section>
      <Title order={2} className={classes.title}>
        {getComponentName({ component, componentPrefix })} 属性
      </Title>
      <PropsTable component={component} query={query} />
    </div>
  ));

  return (
    <div className={classes.root}>
      <TextInput
        className={classes.search}
        value={query}
        onChange={(event) => setQuery(event.currentTarget.value)}
        leftSection={<FiSearch className={classes.searchIcon} />}
        placeholder="搜索属性"
        radius="md"
        size="lg"
        pt={7}
      />
      {tables}
      <Text className={classes.nothingFound}>未找到...</Text>
    </div>
  );
}
