import { Pagination, Text } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { Text, Pagination } from '@react-ui/ui';

function Demo() {
  return (
    <>
      <Text mb="xs">1 sibling (default)</Text>
      <Pagination total={20} siblings={1} defaultValue={10} />

      <Text mb="xs" mt="xl">2 siblings</Text>
      <Pagination total={20} siblings={2} defaultValue={10} />

      <Text mb="xs" mt="xl">3 siblings</Text>
      <Pagination total={20} siblings={3} defaultValue={10} />
    </>
  );
}
`;

function Demo() {
  return (
    <>
      <Text mb="xs">1 sibling (default)</Text>
      <Pagination total={20} siblings={1} defaultValue={10} />

      <Text mb="xs" mt="xl">
        2 siblings
      </Text>
      <Pagination total={20} siblings={2} defaultValue={10} />

      <Text mb="xs" mt="xl">
        3 siblings
      </Text>
      <Pagination total={20} siblings={3} defaultValue={10} />
    </>
  );
}

export const siblings: UIDemo = {
  type: 'code',
  code,
  component: Demo,
};
