import { Title } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { Title } from '@react-ui/ui';

function Demo() {
  return (
    <>
      <Title order={1}>这是 h1 标题</Title>
      <Title order={2}>这是 h2 标题</Title>
      <Title order={3}>这是 h3 标题</Title>
      <Title order={4}>这是 h4 标题</Title>
      <Title order={5}>这是 h5 标题</Title>
      <Title order={6}>这是 h6 标题</Title>
    </>
  );
}
`;

function Demo() {
  return (
    <>
      <Title order={1}>这是 h1 标题</Title>
      <Title order={2}>这是 h2 标题</Title>
      <Title order={3}>这是 h3 标题</Title>
      <Title order={4}>这是 h4 标题</Title>
      <Title order={5}>这是 h5 标题</Title>
      <Title order={6}>这是 h6 标题</Title>
    </>
  );
}

export const usage: UIDemo = {
  type: 'code',
  code,
  component: Demo,
};
