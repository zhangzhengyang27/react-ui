import { Box } from '@react-ui/ui';
import { Schedule } from '@react-ui/schedule';
import { UIDemo } from '@react-ui/demo';
import { events } from './_data';

const code = `
import { Box } from '@react-ui/ui';
import { Schedule } from '@react-ui/schedule';
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
