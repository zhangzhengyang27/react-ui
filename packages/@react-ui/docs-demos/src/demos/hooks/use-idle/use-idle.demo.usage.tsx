import { Badge } from '@react-ui/ui';
import { useIdle } from '@react-ui/hooks';
import { UIDemo } from '@react-ui/demo';

const code = `
import { Badge } from '@react-ui/ui';
import { useIdle } from '@react-ui/hooks';

function Demo() {
  const idle = useIdle(2000);
  return <Badge color={idle ? 'blue' : 'teal'}>Current state: {idle ? 'idle' : 'not idle'}</Badge>;
}
`;

function Demo() {
  const idle = useIdle(2000);
  return <Badge color={idle ? 'blue' : 'teal'}>Current state: {idle ? 'idle' : 'not idle'}</Badge>;
}

export const usage: UIDemo = {
  type: 'code',
  code,
  component: Demo,
  centered: true,
};
