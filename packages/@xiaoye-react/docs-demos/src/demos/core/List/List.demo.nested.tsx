import { List } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { List } from '@xiaoye-react/ui';

function Demo() {
  return (
    <List listStyleType="disc">
      <List.Item>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
      </List.Item>
      <List.Item>一级项目</List.Item>
      <List.Item>
        First order item with list
        <List withPadding listStyleType="disc">
          <List.Item>嵌套项目</List.Item>
          <List.Item>嵌套项目</List.Item>
          <List.Item>
            Nested item with list
            <List withPadding listStyleType="disc">
              <List.Item>更深嵌套</List.Item>
              <List.Item>更深嵌套</List.Item>
            </List>
          </List.Item>
          <List.Item>嵌套项目</List.Item>
        </List>
      </List.Item>
      <List.Item>一级项目</List.Item>
    </List>
  );
}
`;

function Demo() {
  return (
    <List listStyleType="disc">
      <List.Item>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
      </List.Item>
      <List.Item>一级项目</List.Item>
      <List.Item>
        First order item with list
        <List withPadding listStyleType="disc">
          <List.Item>嵌套项目</List.Item>
          <List.Item>嵌套项目</List.Item>
          <List.Item>
            Nested item with list
            <List withPadding listStyleType="disc">
              <List.Item>更深嵌套</List.Item>
              <List.Item>更深嵌套</List.Item>
            </List>
          </List.Item>
          <List.Item>嵌套项目</List.Item>
        </List>
      </List.Item>
      <List.Item>一级项目</List.Item>
    </List>
  );
}

export const nested: UIDemo = {
  type: 'code',
  component: Demo,
  code,
};
