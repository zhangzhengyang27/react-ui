import { Badge } from '@react-ui/ui';
import { useIdle } from '@react-ui/hooks';
import { MantineDemo } from '@react-ui/demo';

const initialStateCode = `
import { Badge } from '@react-ui/ui';
import { useIdle } from '@react-ui/hooks';

function Demo() {
  const idle = useIdle(2000, { initialState: false });
  return <Badge color={idle ? 'blue' : 'teal'}>Current state: {idle ? 'idle' : 'not idle'}</Badge>;
}
`;

function Demo() {
  const idle = useIdle(2000, { initialState: false });
  return <Badge color={idle ? 'blue' : 'teal'}>Current state: {idle ? 'idle' : 'not idle'}</Badge>;
}

export const state: MantineDemo = {
  type: 'code',
  code: initialStateCode,
  component: Demo,
  centered: true,
};
