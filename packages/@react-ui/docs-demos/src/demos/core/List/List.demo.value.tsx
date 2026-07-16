import { List } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { List } from '@react-ui/ui';

function Demo() {
  return (
    <List type="ordered">
      <List.Item>第一个项目</List.Item>
      <List.Item value={5}>这是第 5 项</List.Item>
      <List.Item>This item is #6 (continues from previous)</List.Item>
      <List.Item value={10}>这是第 10 项</List.Item>
      <List.Item>这是第 11 项</List.Item>
    </List>
  );
}
`;

function Demo() {
  return (
    <List type="ordered">
      <List.Item>第一个项目</List.Item>
      <List.Item value={5}>这是第 5 项</List.Item>
      <List.Item>This item is #6 (continues from previous)</List.Item>
      <List.Item value={10}>这是第 10 项</List.Item>
      <List.Item>这是第 11 项</List.Item>
    </List>
  );
}

export const value: UIDemo = {
  type: 'code',
  component: Demo,
  code,
};
