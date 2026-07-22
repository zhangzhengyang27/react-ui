import { Button, Group, Pagination, TextInput } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { Button, Group, Pagination, TextInput } from '@xiaoye-react/ui';

function Demo() {
  return (
    <div>
      <Group>
        <Pagination total={45} size="sm" />
        <Button size="sm">sm 按钮</Button>
        <TextInput size="sm" placeholder="sm 输入" />
      </Group>

      <Group mt="md">
        <Pagination total={45} size="input-sm" />
        <Button size="sm">sm 按钮</Button>
        <TextInput size="sm" placeholder="sm 输入" />
      </Group>
    </div>
  );
}
`;

function Demo() {
  return (
    <div>
      <Group>
        <Pagination total={45} size="sm" />
        <Button size="sm">sm 按钮</Button>
        <TextInput size="sm" placeholder="sm 输入" />
      </Group>

      <Group mt="md">
        <Pagination total={45} size="input-sm" />
        <Button size="sm">sm 按钮</Button>
        <TextInput size="sm" placeholder="sm 输入" />
      </Group>
    </div>
  );
}

export const size: UIDemo = {
  type: 'code',
  component: Demo,
  code,
};
