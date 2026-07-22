import { Tabs } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { Tabs } from '@xiaoye-react/ui';

function Demo() {
  return (
    <Tabs defaultValue="chat">
      <Tabs.List>
        <Tabs.Tab value="chat">聊天</Tabs.Tab>
        <Tabs.Tab value="gallery">相册</Tabs.Tab>
        <Tabs.Tab value="settings" disabled>
          设置
        </Tabs.Tab>
        <Tabs.Tab value="account">账户</Tabs.Tab>
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
        <Tabs.Tab value="settings" disabled>
          设置
        </Tabs.Tab>
        <Tabs.Tab value="account">账户</Tabs.Tab>
      </Tabs.List>
    </Tabs>
  );
}
export const disabled: UIDemo = {
  type: 'code',
  component: Demo,
  code,
};
