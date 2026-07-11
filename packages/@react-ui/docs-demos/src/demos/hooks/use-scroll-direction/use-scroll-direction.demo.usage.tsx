import { Badge, Text } from '@react-ui/ui';
import { useScrollDirection } from '@react-ui/hooks';
import { MantineDemo } from '@react-ui/demo';

const code = `
import { Badge, Text } from '@react-ui/ui';
import { useScrollDirection } from '@react-ui/hooks';

function Demo() {
  const direction = useScrollDirection();

  return (
    <>
      <Badge color={direction === 'up' ? 'teal' : direction === 'down' ? 'red' : 'gray'}>
        {direction === 'up' && '↑ Scrolling UP'}
        {direction === 'down' && '↓ Scrolling DOWN'}
        {direction === 'unknown' && 'Scroll to detect direction'}
      </Badge>
      <Text mt="xs">Scroll the page to see the scroll direction</Text>
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
      <Text mt="xs">Scroll the page to see the scroll direction</Text>
    </>
  );
}

export const usage: MantineDemo = {
  type: 'code',
  code,
  component: Demo,
};
