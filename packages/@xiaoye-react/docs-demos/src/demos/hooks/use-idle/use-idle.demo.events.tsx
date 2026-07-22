import { Badge } from '@xiaoye-react/ui';
import { useIdle } from '@xiaoye-react/hooks';
import { UIDemo } from '@xiaoye-react/demo';

const eventsCode = `
import { Badge } from '@xiaoye-react/ui';
import { useIdle } from '@xiaoye-react/hooks';

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
