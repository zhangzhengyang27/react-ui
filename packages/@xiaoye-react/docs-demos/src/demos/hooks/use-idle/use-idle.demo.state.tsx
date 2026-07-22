import { Badge } from '@xiaoye-react/ui';
import { useIdle } from '@xiaoye-react/hooks';
import { UIDemo } from '@xiaoye-react/demo';

const initialStateCode = `
import { Badge } from '@xiaoye-react/ui';
import { useIdle } from '@xiaoye-react/hooks';

function Demo() {
  const idle = useIdle(2000, { initialState: false });
  return <Badge color={idle ? 'blue' : 'teal'}>Current state: {idle ? 'idle' : 'not idle'}</Badge>;
}
`;

function Demo() {
  const idle = useIdle(2000, { initialState: false });
  return <Badge color={idle ? 'blue' : 'teal'}>Current state: {idle ? 'idle' : 'not idle'}</Badge>;
}

export const state: UIDemo = {
  type: 'code',
  code: initialStateCode,
  component: Demo,
  centered: true,
};
