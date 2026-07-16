import { Anchor, Text } from '@react-ui/ui';

interface TableErrorProps {
  errorOf: string;
}

export function TableError({ errorOf }: TableErrorProps) {
  return (
    <Text>
      <Text span c="red">
        加载组件 {errorOf} 数据时出错。{' '}
      </Text>
      如果你看到这条消息，请通过{' '}
      <Anchor
        href="https://github.com/xiaoye/react-ui/issues/new"
        target="_blank"
      >
        在 GitHub 上提交 issue
      </Anchor>
      告知我们。
    </Text>
  );
}
