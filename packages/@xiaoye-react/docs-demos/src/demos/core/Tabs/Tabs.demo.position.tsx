import { Tabs, TabsListProps } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

function Wrapper(props: TabsListProps) {
  return (
    <Tabs defaultValue="first">
      <Tabs.List {...props}>
        <Tabs.Tab value="first">第一个标签</Tabs.Tab>
        <Tabs.Tab value="second">第二个标签</Tabs.Tab>
        <Tabs.Tab value="third">第三个标签</Tabs.Tab>
      </Tabs.List>
    </Tabs>
  );
}

const code = `
import { Tabs } from '@xiaoye-react/ui';

function Demo() {
  return (
    <Tabs defaultValue="first">
      <Tabs.List{{props}}>
        <Tabs.Tab value="first">第一个标签</Tabs.Tab>
        <Tabs.Tab value="second">第二个标签</Tabs.Tab>
        <Tabs.Tab value="third">第三个标签</Tabs.Tab>
      </Tabs.List>
    </Tabs>
  );
}
`;

export const position: UIDemo = {
  type: 'configurator',
  component: Wrapper,
  code,
  centered: true,
  maxWidth: '100%',
  controls: [
    { prop: 'grow', type: 'boolean', initialValue: false, libraryValue: false },
    {
      prop: 'justify',
      type: 'select',
      initialValue: 'flex-start',
      libraryValue: 'flex-start',
      data: ['flex-start', 'center', 'flex-end', 'space-between'],
    },
  ],
};
