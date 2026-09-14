import { CodeHighlight } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const exampleCode = `
import { Group, Avatar, Text } from '@xiaoye-react/ui';

interface ItemProps extends React.ComponentProps<'div'> {
  image: string;
  label: string;
  description: string;
}

const SelectItem = ({ image, label, description, ...others }: ItemProps) => (
  <div {...others}>
    <Group noWrap>
      <Avatar src={image} />
      <div>
        <Text size="sm">{label}</Text>
        <Text size="xs" opacity={0.65}>
          {description}
        </Text>
      </div>
    </Group>
  </div>
);
`;

const code = `
import { CodeHighlight } from '@xiaoye-react/ui';

const exampleCode = \`...\`;

function Demo() {
  return <CodeHighlight code={exampleCode} language="tsx" withLineNumbers />;
}
`;

function Demo() {
  return <CodeHighlight code={exampleCode} language="tsx" withLineNumbers />;
}

export const lineNumbers: UIDemo = {
  type: 'code',
  component: Demo,
  code,
};
