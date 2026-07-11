import { List } from '@react-ui/ui';
import { MantineDemo } from '@react-ui/demo';

const code = `
import { List } from '@react-ui/ui';

function Demo() {
  return (
    <List type="ordered" start={5}>
      <List.Item>This is item #5</List.Item>
      <List.Item>This is item #6</List.Item>
      <List.Item>This is item #7</List.Item>
      <List.Item>This is item #8</List.Item>
    </List>
  );
}
`;

function Demo() {
  return (
    <List type="ordered" start={5}>
      <List.Item>This is item #5</List.Item>
      <List.Item>This is item #6</List.Item>
      <List.Item>This is item #7</List.Item>
      <List.Item>This is item #8</List.Item>
    </List>
  );
}

export const start: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
};
