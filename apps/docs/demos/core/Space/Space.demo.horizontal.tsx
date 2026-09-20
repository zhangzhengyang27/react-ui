import { Space, Text, SpaceProps } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

function Wrapper(props: SpaceProps) {
  return (
    <>
      <Text>第一行</Text>
      <Space {...props} />
      <Text>第二行</Text>
    </>
  );
}

const code = `
import { Text, Space } from '@xiaoye-react/ui';

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
