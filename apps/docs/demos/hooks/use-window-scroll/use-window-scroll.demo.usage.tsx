import { Button, Group, Text } from '@react-ui/ui';
import { useWindowScroll } from '@react-ui/hooks';
import { UIDemo } from '@react-ui/demo';

const code = `
import { useWindowScroll } from '@react-ui/hooks';
import { Button, Text, Group } from '@react-ui/ui';

function Demo() {
  const [scroll, scrollTo] = useWindowScroll();

  return (
    <Group justify="center">
      <Text>
        Scroll position x: {scroll.x}, y: {scroll.y}
      </Text>
      <Button onClick={() => scrollTo({ y: 0 })}>滚动到顶部</Button>
    </Group>
  );
}
`;

function Demo() {
  const [scroll, scrollTo] = useWindowScroll();

  return (
    <Group justify="center">
      <Text>
        Scroll position x: {scroll.x}, y: {scroll.y}
      </Text>
      <Button onClick={() => scrollTo({ y: 0 })}>滚动到顶部</Button>
    </Group>
  );
}

export const usage: UIDemo = {
  type: 'code',
  code,
  component: Demo,
};
