import { Text } from '@xiaoye-react/ui';
import { useOs } from '@xiaoye-react/hooks';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { useOs } from '@xiaoye-react/hooks';

function Demo() {
  const os = useOs();
  return <>你的操作系统是 <b>{os}</b></>;
}
`;

function Demo() {
  const os = useOs();
  return (
    <Text ta="center">
      Your os is <b>{os}</b>
    </Text>
  );
}

export const usage: UIDemo = {
  type: 'code',
  component: Demo,
  code,
};
