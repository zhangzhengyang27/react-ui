import { useState } from 'react';
import { Button, Menu, Text } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { useState } from 'react';
import { Button, Menu, Text } from '@react-ui/ui';

const data = [
  'Dashboard',
  'Customers',
  'Products',
  'Orders',
  'Reports',
  'Settings',
  'Integrations',
  'Billing',
  'Team members',
  'Help center',
];

function Demo() {
  const [query, setQuery] = useState('');
  const items = data.filter((item) => item.toLowerCase().includes(query.toLowerCase().trim()));

  return (
    <Menu shadow="md" width={240}>
      <Menu.Target>
        <Button>切换菜单</Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Search
          value={query}
          onChange={(event) => setQuery(event.currentTarget.value)}
          placeholder="搜索项目"
        />

        {items.length > 0 ? (
          items.map((item) => <Menu.Item key={item}>{item}</Menu.Item>)
        ) : (
          <Text c="dimmed" size="sm" ta="center" py="xs">
            Nothing found
          </Text>
        )}
      </Menu.Dropdown>
    </Menu>
  );
}
`;

const data = [
  'Dashboard',
  'Customers',
  'Products',
  'Orders',
  'Reports',
  'Settings',
  'Integrations',
  'Billing',
  'Team members',
  'Help center',
];

function Demo() {
  const [query, setQuery] = useState('');
  const items = data.filter((item) => item.toLowerCase().includes(query.toLowerCase().trim()));

  return (
    <Menu shadow="md" width={240}>
      <Menu.Target>
        <Button>切换菜单</Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Search
          value={query}
          onChange={(event) => setQuery(event.currentTarget.value)}
          placeholder="搜索项目"
        />

        {items.length > 0 ? (
          items.map((item) => <Menu.Item key={item}>{item}</Menu.Item>)
        ) : (
          <Text c="dimmed" size="sm" ta="center" py="xs">
            Nothing found
          </Text>
        )}
      </Menu.Dropdown>
    </Menu>
  );
}

export const search: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
};
