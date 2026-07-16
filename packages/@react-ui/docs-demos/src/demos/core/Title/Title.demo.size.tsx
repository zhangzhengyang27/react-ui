import { Title } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { Title } from '@react-ui/ui';

function Demo() {
  return (
    <>
      <Title order={3} size="h1">
        H3 heading with h1 font-size
      </Title>
      <Title size="h4">H1 标题使用 h4 字号</Title>
      <Title size={16}>H1 标题使用 16px 字号</Title>
      <Title size="xs">H1 标题使用 xs 字号</Title>
    </>
  );
}
`;

function Demo() {
  return (
    <>
      <Title order={3} size="h1">
        H3 heading with h1 font-size
      </Title>
      <Title size="h4">H1 标题使用 h4 字号</Title>
      <Title size={16}>H1 标题使用 16px 字号</Title>
      <Title size="xs">H1 标题使用 xs 字号</Title>
    </>
  );
}

export const size: UIDemo = {
  type: 'code',
  component: Demo,
  code,
};
