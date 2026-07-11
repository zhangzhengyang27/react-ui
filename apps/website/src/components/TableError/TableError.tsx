import { Anchor, Text } from '@react-ui/ui';

interface TableErrorProps {
  errorOf: string;
}

export function TableError({ errorOf }: TableErrorProps) {
  return (
    <Text>
      <Text span c="red">
        Error loading component {errorOf} data.{' '}
      </Text>
      If you see this message please let us know by{' '}
      <Anchor
        href="https://github.com/xiaoye/react-ui/issues/new"
        target="_blank"
      >
        opening an issue on GitHub
      </Anchor>
      .
    </Text>
  );
}
