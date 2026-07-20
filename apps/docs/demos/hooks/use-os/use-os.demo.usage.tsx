import { Text } from '@react-ui/ui';
import { useOs } from '@react-ui/hooks';
import { UIDemo } from '@react-ui/demo';

const code = `
import { useOs } from '@react-ui/hooks';

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
