import { useState } from 'react';
import { Button, Menu } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { useState } from 'react';
import { Button, Menu } from '@react-ui/ui';

function Demo() {
  const [sort, setSort] = useState('newest');

  return (
    <Menu shadow="md" width={220} closeOnItemClick={false}>
      <Menu.Target>
        <Button>排序</Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>排序</Menu.Label>
        <Menu.RadioGroup value={sort} onChange={setSort}>
          <Menu.RadioItem value="newest">最新的在前</Menu.RadioItem>
          <Menu.RadioItem value="oldest">最旧的在前</Menu.RadioItem>
          <Menu.RadioItem value="popular">最受欢迎</Menu.RadioItem>
          <Menu.RadioItem value="commented">评论最多</Menu.RadioItem>
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
        <Button>排序</Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>排序</Menu.Label>
        <Menu.RadioGroup value={sort} onChange={setSort}>
          <Menu.RadioItem value="newest">最新的在前</Menu.RadioItem>
          <Menu.RadioItem value="oldest">最旧的在前</Menu.RadioItem>
          <Menu.RadioItem value="popular">最受欢迎</Menu.RadioItem>
          <Menu.RadioItem value="commented">评论最多</Menu.RadioItem>
        </Menu.RadioGroup>
      </Menu.Dropdown>
    </Menu>
  );
}

export const radioItem: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
};
