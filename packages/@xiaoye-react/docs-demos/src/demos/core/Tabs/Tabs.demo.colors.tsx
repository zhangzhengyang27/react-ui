import { Tabs } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { Tabs } from '@xiaoye-react/ui';

function Demo() {
  return (
    <Tabs color="teal" defaultValue="first">
      <Tabs.List>
        <Tabs.Tab value="first">青色标签</Tabs.Tab>
        <Tabs.Tab value="second" color="blue">
          青色标签
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="first" pt="xs">
        第一个标签颜色为青色，它从上下文获取该值
      </Tabs.Panel>

      <Tabs.Panel value="second" pt="xs">
        第二个标签颜色为蓝色，它从 props 获取该值，props 具有优先级并会覆盖上下文值
      </Tabs.Panel>
    </Tabs>
  );
}
`;

function Demo() {
  return (
    <Tabs color="teal" defaultValue="first">
      <Tabs.List>
        <Tabs.Tab value="first">青色标签</Tabs.Tab>
        <Tabs.Tab value="second" color="blue">
          青色标签
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="first" pt="xs">
        第一个标签颜色为青色，它从上下文获取该值
      </Tabs.Panel>

      <Tabs.Panel value="second" pt="xs">
        第二个标签颜色为蓝色，它从 props 获取该值，props 具有优先级并会覆盖上下文值
      </Tabs.Panel>
    </Tabs>
  );
}

export const colors: UIDemo = {
  type: 'code',
  code,
  component: Demo,
};
