import { Box, Pagination } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { Box, Pagination } from '@xiaoye-react/ui';

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

export const responsive: UIDemo = {
  type: 'code',
  component: Demo,
  code,
};
