import { Text, Title } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { Text, Title } from '@xiaoye-react/ui';

function Demo() {
  return <Title order={3}>你想在其中 <Text span c="blue" inherit>高亮</Text> 某些内容的标题</Title>;
}
`;

function Demo() {
  return (
    <Title order={3}>
      Title in which you want to{' '}
      <Text span c="blue" inherit>
        highlight
      </Text>{' '}
      something
    </Title>
  );
}

export const inherit: UIDemo = {
  type: 'code',
  component: Demo,
  code,
};
