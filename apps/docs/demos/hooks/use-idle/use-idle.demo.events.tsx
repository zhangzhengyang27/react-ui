import { Badge } from '@react-ui/ui';
import { useIdle } from '@react-ui/hooks';
import { UIDemo } from '@react-ui/demo';

const eventsCode = `
import { Badge } from '@react-ui/ui';
import { useIdle } from '@react-ui/hooks';

function Demo() {
  const idle = useIdle(2000, { events: ['click', 'touchstart'] });
  return <Badge color={idle ? 'blue' : 'teal'}>Current state: {idle ? 'idle' : 'not idle'}</Badge>;
}
`;

function Demo() {
  const idle = useIdle(2000, { events: ['click', 'touchstart'] });
  return <Badge color={idle ? 'blue' : 'teal'}>Current state: {idle ? 'idle' : 'not idle'}</Badge>;
}

export const events: UIDemo = {
  type: 'code',
  code: eventsCode,
  component: Demo,
  centered: true,
};
