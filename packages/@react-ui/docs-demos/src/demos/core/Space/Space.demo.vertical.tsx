import { Space, Text } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

function Wrapper(props: any) {
  return (
    <div style={{ display: 'flex' }}>
      <Text>第一部分</Text>
      <Space {...props} />
      <Text>第二部分</Text>
    </div>
  );
}

const code = `
import { Text, Space } from '@react-ui/ui';

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
