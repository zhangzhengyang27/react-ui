import { Space, Text } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

function Wrapper(props: any) {
  return (
    <>
      <Text>第一行</Text>
      <Space {...props} />
      <Text>第二行</Text>
    </>
  );
}

const code = `
import { Text, Space } from '@react-ui/ui';

function Demo() {
  return (
    <>
      <Text>第一行</Text>
      <Space{{props}} />
      <Text>第二行</Text>
    </>
  );
}
`;

export const horizontal: UIDemo = {
  type: 'configurator',
  component: Wrapper,
  code,
  controls: [{ prop: 'h', type: 'size', initialValue: 'md', libraryValue: '__' }],
};
