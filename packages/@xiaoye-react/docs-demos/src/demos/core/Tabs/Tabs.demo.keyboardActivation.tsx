import { Tabs } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { Tabs } from '@xiaoye-react/ui';

function Demo() {
  return (
    <Tabs defaultValue="chat" activateTabWithKeyboard={false}>
      {/* ...content */}
    </Tabs>
  );
}
`;

function Demo() {
  return (
    <Tabs defaultValue="chat" activateTabWithKeyboard={false}>
      <Tabs.List>
        <Tabs.Tab value="chat">聊天</Tabs.Tab>
        <Tabs.Tab value="gallery">相册</Tabs.Tab>
        <Tabs.Tab value="account">账户</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="chat" pt="xs">
        聊天面板
      </Tabs.Panel>
      <Tabs.Panel value="gallery" pt="xs">
        Gallery panel
      </Tabs.Panel>
      <Tabs.Panel value="account" pt="xs">
        Account panel
      </Tabs.Panel>
    </Tabs>
  );
}

export const keyboardActivation: UIDemo = {
  type: 'code',
  component: Demo,
  code,
};
