import { useState } from 'react';
import { Button, Menu } from '@react-ui/ui';
import { MantineDemo } from '@react-ui/demo';

const code = `
import { useState } from 'react';
import { Button, Menu } from '@react-ui/ui';

function Demo() {
  const [sort, setSort] = useState('newest');

  return (
    <Menu shadow="md" width={220} closeOnItemClick={false}>
      <Menu.Target>
        <Button>Sort by</Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Order</Menu.Label>
        <Menu.RadioGroup value={sort} onChange={setSort}>
          <Menu.RadioItem value="newest">Newest first</Menu.RadioItem>
          <Menu.RadioItem value="oldest">Oldest first</Menu.RadioItem>
          <Menu.RadioItem value="popular">Most popular</Menu.RadioItem>
          <Menu.RadioItem value="commented">Most commented</Menu.RadioItem>
        </Menu.RadioGroup>
      </Menu.Dropdown>
    </Menu>
  );
}
`;

function Demo() {
  const [sort, setSort] = useState('newest');

  return (
    <Menu shadow="md" width={220} closeOnItemClick={false}>
      <Menu.Target>
        <Button>Sort by</Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Order</Menu.Label>
        <Menu.RadioGroup value={sort} onChange={setSort}>
          <Menu.RadioItem value="newest">Newest first</Menu.RadioItem>
          <Menu.RadioItem value="oldest">Oldest first</Menu.RadioItem>
          <Menu.RadioItem value="popular">Most popular</Menu.RadioItem>
          <Menu.RadioItem value="commented">Most commented</Menu.RadioItem>
        </Menu.RadioGroup>
      </Menu.Dropdown>
    </Menu>
  );
}

export const radioItem: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
};
