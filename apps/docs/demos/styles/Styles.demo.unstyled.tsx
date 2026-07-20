import { Tabs } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { Tabs } from '@react-ui/ui';

function Demo() {
  return (
    <Tabs defaultValue="chat" unstyled>
      <Tabs.List>
        <Tabs.Tab value="chat">聊天</Tabs.Tab>
        <Tabs.Tab value="gallery">相册</Tabs.Tab>
        <Tabs.Tab value="account">账户</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="chat">聊天面板</Tabs.Panel>
      <Tabs.Panel value="gallery">相册面板</Tabs.Panel>
      <Tabs.Panel value="account">账户面板</Tabs.Panel>
    </Tabs>
  );
}
`;

function Demo() {
  return (
    <Tabs defaultValue="chat" unstyled>
      <Tabs.List>
        <Tabs.Tab value="chat">聊天</Tabs.Tab>
        <Tabs.Tab value="gallery">相册</Tabs.Tab>
        <Tabs.Tab value="account">账户</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="chat">聊天面板</Tabs.Panel>
      <Tabs.Panel value="gallery">相册面板</Tabs.Panel>
      <Tabs.Panel value="account">账户面板</Tabs.Panel>
    </Tabs>
  );
}

export const unstyled: UIDemo = {
  type: 'code',
  component: Demo,
  code,
};
