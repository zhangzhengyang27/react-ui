import { Text } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { Text } from '@react-ui/ui';

function Demo() {
  return (
    <>
      <Text size="xs">超小文本</Text>
      <Text size="sm">小文本</Text>
      <Text size="md">默认文本</Text>
      <Text size="lg">大文本</Text>
      <Text size="xl">超大文本</Text>
      <Text fw={500}>半粗体</Text>
      <Text fw={700}>粗体</Text>
      <Text fs="italic">斜体</Text>
      <Text td="underline">下划线</Text>
      <Text td="line-through">删除线</Text>
      <Text c="dimmed">暗淡文本</Text>
      <Text c="blue">蓝色文本</Text>
      <Text c="teal.4">青绿色 4 文本</Text>
      <Text tt="uppercase">大写</Text>
      <Text tt="capitalize">首字母大写文本</Text>
      <Text ta="center">居中对齐</Text>
      <Text ta="right">右对齐</Text>
    </>
  );
}
`;

function Demo() {
  return (
    <>
      <Text size="xs">超小文本</Text>
      <Text size="sm">小文本</Text>
      <Text size="md">默认文本</Text>
      <Text size="lg">大文本</Text>
      <Text size="xl">超大文本</Text>
      <Text fw={500}>半粗体</Text>
      <Text fw={700}>粗体</Text>
      <Text fs="italic">斜体</Text>
      <Text td="underline">下划线</Text>
      <Text td="line-through">删除线</Text>
      <Text c="dimmed">暗淡文本</Text>
      <Text c="blue">蓝色文本</Text>
      <Text c="teal.4">青绿色 4 文本</Text>
      <Text tt="uppercase">大写</Text>
      <Text tt="capitalize">首字母大写文本</Text>
      <Text ta="center">居中对齐</Text>
      <Text ta="right">右对齐</Text>
    </>
  );
}

export const usage: UIDemo = {
  type: 'code',
  code,
  component: Demo,
};
