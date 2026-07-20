import { Tabs, TabsProps } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

function Wrapper(props: TabsProps) {
  const panelProps = props.placement === 'left' ? { pl: 'xs' } : { pr: 'xs' };
  return (
    <Tabs defaultValue="gallery" orientation="vertical" {...props}>
      <Tabs.List>
        <Tabs.Tab value="gallery">相册</Tabs.Tab>
        <Tabs.Tab value="messages">消息</Tabs.Tab>
        <Tabs.Tab value="settings">设置</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="gallery" {...panelProps}>
        相册标签内容
      </Tabs.Panel>
      <Tabs.Panel value="messages" {...panelProps}>
        消息标签内容
      </Tabs.Panel>
      <Tabs.Panel value="settings" {...panelProps}>
        设置标签内容
      </Tabs.Panel>
    </Tabs>
  );
}

const code = `
import { Tabs } from '@react-ui/ui';

function Demo() {
  return (
    <Tabs defaultValue="gallery" orientation="vertical"{{props}}>
      <Tabs.List>
        <Tabs.Tab value="gallery">相册</Tabs.Tab>
        <Tabs.Tab value="messages">消息</Tabs.Tab>
        <Tabs.Tab value="settings">设置</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="gallery">相册标签内容</Tabs.Panel>
      <Tabs.Panel value="messages">消息标签内容</Tabs.Panel>
      <Tabs.Panel value="settings">设置标签内容</Tabs.Panel>
    </Tabs>
  );
}
`;

export const placement: UIDemo = {
  type: 'configurator',
  component: Wrapper,
  code,
  controls: [
    {
      prop: 'placement',
      type: 'segmented',
      initialValue: 'left',
      libraryValue: 'left',
      data: ['left', 'right'],
    },
  ],
};
