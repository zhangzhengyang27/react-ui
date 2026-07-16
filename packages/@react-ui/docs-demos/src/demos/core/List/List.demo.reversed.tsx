import { List } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { List } from '@react-ui/ui';

function Demo() {
  return (
    <List type="ordered" reversed>
      <List.Item>这是第 3 项</List.Item>
      <List.Item>这是第 2 项</List.Item>
      <List.Item>这是第 1 项</List.Item>
    </List>
  );
}
`;

function Demo() {
  return (
    <List type="ordered" reversed>
      <List.Item>这是第 3 项</List.Item>
      <List.Item>这是第 2 项</List.Item>
      <List.Item>这是第 1 项</List.Item>
    </List>
  );
}

export const reversed: UIDemo = {
  type: 'code',
  component: Demo,
  code,
};
