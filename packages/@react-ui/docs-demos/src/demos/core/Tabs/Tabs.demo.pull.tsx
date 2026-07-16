import { Tabs } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { Tabs } from '@react-ui/ui';

function Demo() {
  return (
    <Tabs defaultValue="chat">
      <Tabs.List>
        <Tabs.Tab value="chat">聊天</Tabs.Tab>
        <Tabs.Tab value="gallery">相册</Tabs.Tab>
        <Tabs.Tab value="settings">设置</Tabs.Tab>
        <Tabs.Tab value="account" ml="auto">
          账户
        </Tabs.Tab>
      </Tabs.List>
    </Tabs>
  );
}
`;

function Demo() {
  return (
    <Tabs defaultValue="chat">
      <Tabs.List>
        <Tabs.Tab value="chat">聊天</Tabs.Tab>
        <Tabs.Tab value="gallery">相册</Tabs.Tab>
        <Tabs.Tab value="settings">设置</Tabs.Tab>
        <Tabs.Tab value="account" ml="auto">
          账户
        </Tabs.Tab>
      </Tabs.List>
    </Tabs>
  );
}

export const pull: UIDemo = {
  type: 'code',
  component: Demo,
  code,
};
