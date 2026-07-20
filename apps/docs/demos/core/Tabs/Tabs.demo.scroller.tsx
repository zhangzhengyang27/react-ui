import { Scroller, Tabs } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { Scroller, Tabs } from '@react-ui/ui';

function Demo() {
  return (
    <Tabs defaultValue="tab-1">
      <Tabs.List>
        <Scroller>
          <Tabs.Tab value="tab-1">第一个标签</Tabs.Tab>
          <Tabs.Tab value="tab-2">第二个标签</Tabs.Tab>
          <Tabs.Tab value="tab-3">第三个标签</Tabs.Tab>
          <Tabs.Tab value="tab-4">第四个标签</Tabs.Tab>
          <Tabs.Tab value="tab-5">第五个标签</Tabs.Tab>
          <Tabs.Tab value="tab-6">第六个标签</Tabs.Tab>
          <Tabs.Tab value="tab-7">第七个标签</Tabs.Tab>
          <Tabs.Tab value="tab-8">第八个标签</Tabs.Tab>
          <Tabs.Tab value="tab-9">第九个标签</Tabs.Tab>
          <Tabs.Tab value="tab-10">第十个标签</Tabs.Tab>
        </Scroller>
      </Tabs.List>
    </Tabs>
  );
}
`;

function Demo() {
  return (
    <Tabs defaultValue="tab-1">
      <Tabs.List>
        <Scroller>
          <Tabs.Tab value="tab-1">第一个标签</Tabs.Tab>
          <Tabs.Tab value="tab-2">第二个标签</Tabs.Tab>
          <Tabs.Tab value="tab-3">第三个标签</Tabs.Tab>
          <Tabs.Tab value="tab-4">第四个标签</Tabs.Tab>
          <Tabs.Tab value="tab-5">第五个标签</Tabs.Tab>
          <Tabs.Tab value="tab-6">第六个标签</Tabs.Tab>
          <Tabs.Tab value="tab-7">第七个标签</Tabs.Tab>
          <Tabs.Tab value="tab-8">第八个标签</Tabs.Tab>
          <Tabs.Tab value="tab-9">第九个标签</Tabs.Tab>
          <Tabs.Tab value="tab-10">第十个标签</Tabs.Tab>
        </Scroller>
      </Tabs.List>
    </Tabs>
  );
}

export const scroller: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  maxWidth: 500,
  centered: true,
};
