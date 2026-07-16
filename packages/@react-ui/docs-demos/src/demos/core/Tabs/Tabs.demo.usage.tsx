import { ChatCircleIcon, GearSixIcon, ImageIcon } from '@phosphor-icons/react';
import { Tabs, TabsProps, useDirection } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

function Wrapper(props: TabsProps) {
  const { dir } = useDirection();
  const panelProps =
    props.orientation === 'vertical' ? { [dir === 'rtl' ? 'pr' : 'pl']: 'xs' } : { pt: 'xs' };

  return (
    <Tabs defaultValue="gallery" {...props}>
      <Tabs.List>
        <Tabs.Tab value="gallery" leftSection={<ImageIcon size={12} />}>
          相册
        </Tabs.Tab>
        <Tabs.Tab value="messages" leftSection={<ChatCircleIcon size={12} />}>
          消息
        </Tabs.Tab>
        <Tabs.Tab value="settings" leftSection={<GearSixIcon size={12} />}>
          设置
        </Tabs.Tab>
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
import { ImageIcon, ChatCircleIcon, GearSixIcon } from '@phosphor-icons/react';

function Demo() {
  return (
    <Tabs{{props}} defaultValue="gallery">
      <Tabs.List>
        <Tabs.Tab value="gallery" leftSection={<ImageIcon size={12} />}>
          相册
        </Tabs.Tab>
        <Tabs.Tab value="messages" leftSection={<ChatCircleIcon size={12} />}>
          消息
        </Tabs.Tab>
        <Tabs.Tab value="settings" leftSection={<GearSixIcon size={12} />}>
          设置
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="gallery">
        相册标签内容
      </Tabs.Panel>

      <Tabs.Panel value="messages">
        消息标签内容
      </Tabs.Panel>

      <Tabs.Panel value="settings">
        设置标签内容
      </Tabs.Panel>
    </Tabs>
  );
}`;

export const usage: UIDemo = {
  type: 'configurator',
  component: Wrapper,
  code,
  centered: true,
  maxWidth: '100%',
  controls: [
    { prop: 'color', type: 'color', initialValue: 'blue', libraryValue: 'blue' },
    {
      prop: 'variant',
      type: 'segmented',
      initialValue: 'default',
      libraryValue: 'default',
      data: [
        { value: 'default', label: '默认' },
        { value: 'outline', label: '轮廓' },
        { value: 'pills', label: '胶囊' },
      ],
    },
    { prop: 'radius', type: 'size', initialValue: 'md', libraryValue: 'md' },
    {
      prop: 'orientation',
      type: 'segmented',
      initialValue: 'horizontal',
      libraryValue: 'horizontal',
      data: [
        { value: 'horizontal', label: '水平' },
        { value: 'vertical', label: '垂直' },
      ],
    },
  ],
};
