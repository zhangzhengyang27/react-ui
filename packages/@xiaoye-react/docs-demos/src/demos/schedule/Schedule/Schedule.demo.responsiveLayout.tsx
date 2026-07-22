import { Box } from '@xiaoye-react/ui';
import { Schedule } from '@xiaoye-react/schedule';
import { UIDemo } from '@xiaoye-react/demo';
import { events } from './_data';

const code = `
import { Box } from '@xiaoye-react/ui';
import { Schedule } from '@xiaoye-react/schedule';
import { events } from './data';

function Demo() {
  return (
    <Box style={{ resize: 'horizontal', overflow: 'auto', minWidth: 300, maxWidth: '100%' }}>
      <Schedule events={events} layout="responsive" />
    </Box>
  );
}
`;

function Demo() {
  return (
    <Box style={{ resize: 'horizontal', overflow: 'auto', minWidth: 300, maxWidth: '100%' }}>
      <Schedule events={events} layout="responsive" />
    </Box>
  );
}

export const responsiveLayout: UIDemo = {
  defaultExpanded: false,
  type: 'code',
  component: Demo,
  code,
};
