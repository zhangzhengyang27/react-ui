import { Text } from '@react-ui/ui';
import { useOs } from '@react-ui/hooks';
import { MantineDemo } from '@react-ui/demo';

const code = `
import { useOs } from '@react-ui/hooks';

function Demo() {
  const os = useOs();
  return <>Your os is <b>{os}</b></>;
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

export const usage: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
};
