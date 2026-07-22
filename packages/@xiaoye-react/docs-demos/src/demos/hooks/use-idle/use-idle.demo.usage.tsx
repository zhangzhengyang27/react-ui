import { Badge } from '@xiaoye-react/ui';
import { useIdle } from '@xiaoye-react/hooks';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { Badge } from '@xiaoye-react/ui';
import { useIdle } from '@xiaoye-react/hooks';

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
