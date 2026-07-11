import { Button, MantineThemeProvider } from '@react-ui/ui';
import { MantineDemo } from '@react-ui/demo';

const code = `
import { MantineProvider, Button } from '@react-ui/ui';

function Demo() {
  return (
    <MantineProvider theme={{ activeClassName: '' }}>
      <Button>No active styles</Button>
    </MantineProvider>
  );
}
`;

function Demo() {
  return (
    <MantineThemeProvider theme={{ activeClassName: '' }}>
      <Button>No active styles</Button>
    </MantineThemeProvider>
  );
}

export const activeClassNameEmpty: MantineDemo = {
  type: 'code',
  component: Demo,
  centered: true,
  code,
};
