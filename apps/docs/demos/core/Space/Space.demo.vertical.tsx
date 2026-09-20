import { Space, Text, SpaceProps } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

function Wrapper(props: SpaceProps) {
  return (
    <div style={{ display: 'flex' }}>
      <Text>第一部分</Text>
      <Space {...props} />
      <Text>第二部分</Text>
    </div>
  );
}

const code = `
import { Text, Space } from '@xiaoye-react/ui';

function Demo() {
  return (
    <div style={{ display: 'flex' }}>
      <Text>第一行</Text>
      <Space{{props}} />
      <Text>第二行</Text>
    </div>
  );
}
`;

export const vertical: UIDemo = {
  type: 'configurator',
  component: Wrapper,
  code,
  controls: [{ prop: 'w', type: 'size', initialValue: 'md', libraryValue: '__' }],
};
