import { Tabs } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { Tabs } from '@xiaoye-react/ui';

function Demo() {
  return (
    <Tabs defaultValue="chat" inverted>
      <Tabs.Panel value="chat" pb="xs">聊天面板</Tabs.Panel>
      <Tabs.Panel value="gallery" pb="xs">相册面板</Tabs.Panel>
      <Tabs.Panel value="account" pb="xs">账户面板</Tabs.Panel>

      <Tabs.List>
        <Tabs.Tab value="chat">聊天</Tabs.Tab>
        <Tabs.Tab value="gallery">相册</Tabs.Tab>
        <Tabs.Tab value="account">账户</Tabs.Tab>
      </Tabs.List>
    </Tabs>
  );
}
`;

function Demo() {
  return (
    <Tabs defaultValue="chat" inverted>
      <Tabs.Panel value="chat" pb="xs">
        聊天面板
      </Tabs.Panel>
      <Tabs.Panel value="gallery" pb="xs">
        Gallery panel
      </Tabs.Panel>
      <Tabs.Panel value="account" pb="xs">
        Account panel
      </Tabs.Panel>

      <Tabs.List>
        <Tabs.Tab value="chat">聊天</Tabs.Tab>
        <Tabs.Tab value="gallery">相册</Tabs.Tab>
        <Tabs.Tab value="account">账户</Tabs.Tab>
      </Tabs.List>
    </Tabs>
  );
}

export const inverted: UIDemo = {
  type: 'code',
  component: Demo,
  code,
};
