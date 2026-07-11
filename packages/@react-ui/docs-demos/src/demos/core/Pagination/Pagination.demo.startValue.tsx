import { Pagination, Text } from '@react-ui/ui';
import { MantineDemo } from '@react-ui/demo';

const code = `
import { Text, Pagination } from '@react-ui/ui';

function Demo() {
  return (
    <>
      <Text mb="xs">Pages 5–15 (startValue=5, total=15)</Text>
      <Pagination total={15} startValue={5} defaultValue={5} />
    </>
  );
}
`;

function Demo() {
  return (
    <>
      <Text mb="xs">Pages 5–15 (startValue=5, total=15)</Text>
      <Pagination total={15} startValue={5} defaultValue={5} />
    </>
  );
}

export const startValue: MantineDemo = {
  type: 'code',
  code,
  component: Demo,
};
