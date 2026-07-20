import { Mark, MarkProps, Text } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

function Wrapper(props: MarkProps) {
  return (
    <Text>
      高亮这段文字中的 <Mark {...props}>这一部分</Mark>
    </Text>
  );
}

const code = `
import { Text, Mark } from '@react-ui/ui';

function Demo() {
  return (
    <Text>
      高亮这段文字中的 <Mark{{props}}>这一部分</Mark>
    </Text>
  );
}
`;

export const usage: UIDemo = {
  type: 'configurator',
  component: Wrapper,
  code,
  centered: true,
  maxWidth: '100%',
  controls: [{ prop: 'color', type: 'color', initialValue: 'yellow', libraryValue: 'yellow' }],
};
