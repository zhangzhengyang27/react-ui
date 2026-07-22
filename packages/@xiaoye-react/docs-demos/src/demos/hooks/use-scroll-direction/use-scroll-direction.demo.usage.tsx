import { Badge, Text } from '@xiaoye-react/ui';
import { useScrollDirection } from '@xiaoye-react/hooks';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { Badge, Text } from '@xiaoye-react/ui';
import { useScrollDirection } from '@xiaoye-react/hooks';

function Demo() {
  const direction = useScrollDirection();

  return (
    <>
      <Badge color={direction === 'up' ? 'teal' : direction === 'down' ? 'red' : 'gray'}>
        {direction === 'up' && '↑ Scrolling UP'}
        {direction === 'down' && '↓ Scrolling DOWN'}
        {direction === 'unknown' && 'Scroll to detect direction'}
      </Badge>
      <Text mt="xs">滚动页面查看滚动方向</Text>
    </>
  );
}
`;

function Demo() {
  const direction = useScrollDirection();

  return (
    <>
      <Badge color={direction === 'up' ? 'teal' : direction === 'down' ? 'red' : 'gray'}>
        {direction === 'up' && '↑ Scrolling UP'}
        {direction === 'down' && '↓ Scrolling DOWN'}
        {direction === 'unknown' && 'Scroll to detect direction'}
      </Badge>
      <Text mt="xs">滚动页面查看滚动方向</Text>
    </>
  );
}

export const usage: UIDemo = {
  type: 'code',
  code,
  component: Demo,
};
