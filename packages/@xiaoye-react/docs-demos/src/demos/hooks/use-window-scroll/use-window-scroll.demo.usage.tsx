import { Button, Group, Text } from '@xiaoye-react/ui';
import { useWindowScroll } from '@xiaoye-react/hooks';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { useWindowScroll } from '@xiaoye-react/hooks';
import { Button, Text, Group } from '@xiaoye-react/ui';

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
