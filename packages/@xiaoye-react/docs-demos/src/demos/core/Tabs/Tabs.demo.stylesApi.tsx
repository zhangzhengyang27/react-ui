import { ChatCircleIcon, GearSixIcon, ImageIcon } from '@phosphor-icons/react';
import { Tabs, TabsProps } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';
import { TabsStylesApi } from '@xiaoye-react/docs-styles-api';

const code = `
import { Tabs } from '@xiaoye-react/ui';

function Demo() {
  return (
    <Tabs defaultValue="gallery"{{props}}>
      <Tabs.List>
        <Tabs.Tab value="gallery" leftSection={<ImageIcon size={12} />}>
          相册
        </Tabs.Tab>
        <Tabs.Tab value="messages" leftSection={<ChatCircleIcon size={12} />}>
          消息
        </Tabs.Tab>
        <Tabs.Tab value="settings" rightSection={<GearSixIcon size={12} />}>
          设置
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="gallery" pt="xs">
        相册标签内容
      </Tabs.Panel>

      <Tabs.Panel value="messages" pt="xs">
        消息标签内容
      </Tabs.Panel>

      <Tabs.Panel value="settings" pt="xs">
        设置标签内容
      </Tabs.Panel>
    </Tabs>
  );
}
`;

function Demo(props: TabsProps) {
  return (
    <Tabs defaultValue="gallery" {...props}>
      <Tabs.List>
        <Tabs.Tab value="gallery" leftSection={<ImageIcon size={12} />}>
          相册
        </Tabs.Tab>
        <Tabs.Tab value="messages" leftSection={<ChatCircleIcon size={12} />}>
          消息
        </Tabs.Tab>
        <Tabs.Tab value="settings" rightSection={<GearSixIcon size={12} />}>
          设置
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="gallery" pt="xs">
        相册标签内容
      </Tabs.Panel>

      <Tabs.Panel value="messages" pt="xs">
        消息标签内容
      </Tabs.Panel>

      <Tabs.Panel value="settings" pt="xs">
        设置标签内容
      </Tabs.Panel>
    </Tabs>
  );
}

export const stylesApi: UIDemo = {
  type: 'styles-api',
  data: TabsStylesApi,
  component: Demo,
  centered: true,
  maxWidth: '100%',
  code,
};
