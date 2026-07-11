import { Box, Pagination } from '@react-ui/ui';
import { MantineDemo } from '@react-ui/demo';

const code = `
import { Box, Pagination } from '@react-ui/ui';

function Demo() {
  return (
    <Box style={{ resize: 'horizontal', overflow: 'auto', minWidth: 200, maxWidth: '100%' }}>
      <Pagination total={20} layout="responsive" />
    </Box>
  );
}
`;

function Demo() {
  return (
    <Box style={{ resize: 'horizontal', overflow: 'auto', minWidth: 200, maxWidth: '100%' }}>
      <Pagination total={20} layout="responsive" />
    </Box>
  );
}

export const responsive: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
};
