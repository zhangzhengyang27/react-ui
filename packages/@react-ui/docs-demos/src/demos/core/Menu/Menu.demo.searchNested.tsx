import { useState } from 'react';
import { Button, Menu, Text } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { useState } from 'react';
import { Button, Menu, Text } from '@react-ui/ui';

interface MenuNode {
  label: string;
  children?: MenuNode[];
}

const data: MenuNode[] = [
  { label: '仪表盘' },
  { label: 'Customers' },
  {
    label: 'Products',
    children: [
      { label: 'All products' },
      { label: 'Categories' },
      { label: 'Tags' },
      { label: 'Inventory' },
    ],
  },
  { label: 'Orders' },
  {
    label: '设置',
    children: [
      {
        label: 'Account',
        children: [
          { label: 'Profile' },
          { label: '安全' },
          { label: 'Two-factor authentication' },
        ],
      },
      { label: 'Notifications' },
      { label: 'Billing' },
    ],
  },
];

function filterTree(nodes: MenuNode[], query: string): MenuNode[] {
  const q = query.toLowerCase().trim();
  if (!q) {
    return nodes;
  }
  return nodes.reduce<MenuNode[]>((acc, node) => {
    const labelMatches = node.label.toLowerCase().includes(q);
    const children = node.children ? filterTree(node.children, query) : undefined;
    if (labelMatches || (children && children.length > 0)) {
      acc.push({ ...node, children: node.children ? children : undefined });
    }
    return acc;
  }, []);
}

function renderNode(node: MenuNode) {
  if (node.children) {
    return (
      <Menu.Sub key={node.label}>
        <Menu.Sub.Target>
          <Menu.Sub.Item>{node.label}</Menu.Sub.Item>
        </Menu.Sub.Target>
        <Menu.Sub.Dropdown>{node.children.map(renderNode)}</Menu.Sub.Dropdown>
      </Menu.Sub>
    );
  }
  return <Menu.Item key={node.label}>{node.label}</Menu.Item>;
}

function Demo() {
  const [query, setQuery] = useState('');
  const items = filterTree(data, query);

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
          items.map(renderNode)
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

interface MenuNode {
  label: string;
  children?: MenuNode[];
}

const data: MenuNode[] = [
  { label: '仪表盘' },
  { label: 'Customers' },
  {
    label: 'Products',
    children: [
      { label: 'All products' },
      { label: 'Categories' },
      { label: 'Tags' },
      { label: 'Inventory' },
    ],
  },
  { label: 'Orders' },
  {
    label: '设置',
    children: [
      {
        label: 'Account',
        children: [
          { label: 'Profile' },
          { label: '安全' },
          { label: 'Two-factor authentication' },
        ],
      },
      { label: 'Notifications' },
      { label: 'Billing' },
    ],
  },
];

function filterTree(nodes: MenuNode[], query: string): MenuNode[] {
  const q = query.toLowerCase().trim();
  if (!q) {
    return nodes;
  }
  return nodes.reduce<MenuNode[]>((acc, node) => {
    const labelMatches = node.label.toLowerCase().includes(q);
    const children = node.children ? filterTree(node.children, query) : undefined;
    if (labelMatches || (children && children.length > 0)) {
      acc.push({ ...node, children: node.children ? children : undefined });
    }
    return acc;
  }, []);
}

function renderNode(node: MenuNode) {
  if (node.children) {
    return (
      <Menu.Sub key={node.label}>
        <Menu.Sub.Target>
          <Menu.Sub.Item>{node.label}</Menu.Sub.Item>
        </Menu.Sub.Target>
        <Menu.Sub.Dropdown>{node.children.map(renderNode)}</Menu.Sub.Dropdown>
      </Menu.Sub>
    );
  }
  return <Menu.Item key={node.label}>{node.label}</Menu.Item>;
}

function Demo() {
  const [query, setQuery] = useState('');
  const items = filterTree(data, query);

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
          items.map(renderNode)
        ) : (
          <Text c="dimmed" size="sm" ta="center" py="xs">
            Nothing found
          </Text>
        )}
      </Menu.Dropdown>
    </Menu>
  );
}

export const searchNested: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
};
