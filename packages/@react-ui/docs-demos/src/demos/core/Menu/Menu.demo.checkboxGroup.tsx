import { useState } from 'react';
import { Button, Menu } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { useState } from 'react';
import { Button, Menu } from '@react-ui/ui';

function Demo() {
  const [columns, setColumns] = useState(['name', 'email']);

  return (
    <Menu shadow="md" width={220} closeOnItemClick={false}>
      <Menu.Target>
        <Button>列</Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>可见列</Menu.Label>
        <Menu.CheckboxGroup value={columns} onChange={setColumns}>
          <Menu.CheckboxItem value="name">姓名</Menu.CheckboxItem>
          <Menu.CheckboxItem value="email">邮箱</Menu.CheckboxItem>
          <Menu.CheckboxItem value="role">角色</Menu.CheckboxItem>
          <Menu.CheckboxItem value="lastSeen">最后查看</Menu.CheckboxItem>
        </Menu.CheckboxGroup>
      </Menu.Dropdown>
    </Menu>
  );
}
`;

function Demo() {
  const [columns, setColumns] = useState(['name', 'email']);

  return (
    <Menu shadow="md" width={220} closeOnItemClick={false}>
      <Menu.Target>
        <Button>列</Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>可见列</Menu.Label>
        <Menu.CheckboxGroup value={columns} onChange={setColumns}>
          <Menu.CheckboxItem value="name">姓名</Menu.CheckboxItem>
          <Menu.CheckboxItem value="email">邮箱</Menu.CheckboxItem>
          <Menu.CheckboxItem value="role">角色</Menu.CheckboxItem>
          <Menu.CheckboxItem value="lastSeen">最后查看</Menu.CheckboxItem>
        </Menu.CheckboxGroup>
      </Menu.Dropdown>
    </Menu>
  );
}

export const checkboxGroup: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
};
