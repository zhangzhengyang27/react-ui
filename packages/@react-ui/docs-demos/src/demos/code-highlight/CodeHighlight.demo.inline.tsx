import { InlineCodeHighlight } from '@react-ui/code-highlight';
import { Text } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { Text } from '@react-ui/ui';
import { InlineCodeHighlight } from '@react-ui/code-highlight';

function Demo() {
  return (
    <Text>
      You can highlight code inline:{' '}
      <InlineCodeHighlight
        code='<InlineCodeHighlight code="" language="tsx" />'
        language="tsx"
        withBorder
      />
      . Is that not cool?
    </Text>
  );
}
`;

function Demo() {
  return (
    <Text>
      You can highlight code inline:{' '}
      <InlineCodeHighlight
        code='<InlineCodeHighlight code="" language="tsx" />'
        language="tsx"
        withBorder
      />
      . Is that not cool?
    </Text>
  );
}

export const inline: UIDemo = {
  type: 'code',
  component: Demo,
  code,
};
