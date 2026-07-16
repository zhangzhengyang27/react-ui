import { List } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { List } from '@react-ui/ui';

function Demo() {
  return (
    <List type="ordered" start={5}>
      <List.Item>这是第 5 项</List.Item>
      <List.Item>这是第 6 项</List.Item>
      <List.Item>这是第 7 项</List.Item>
      <List.Item>这是第 8 项</List.Item>
    </List>
  );
}
`;

function Demo() {
  return (
    <List type="ordered" start={5}>
      <List.Item>这是第 5 项</List.Item>
      <List.Item>这是第 6 项</List.Item>
      <List.Item>这是第 7 项</List.Item>
      <List.Item>这是第 8 项</List.Item>
    </List>
  );
}

export const start: UIDemo = {
  type: 'code',
  component: Demo,
  code,
};
