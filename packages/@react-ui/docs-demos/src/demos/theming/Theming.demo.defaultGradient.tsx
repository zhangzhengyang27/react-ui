import { Button, createTheme, MantineThemeProvider } from '@react-ui/ui';
import { MantineDemo } from '@react-ui/demo';

const code = `
import { MantineProvider, createTheme, Button } from '@react-ui/ui';

const theme = createTheme({
  defaultGradient: {
    from: 'orange',
    to: 'red',
    deg: 45,
  },
});

function Demo() {
  return (
    <MantineProvider theme={theme}>
      <Button variant="gradient">Button with custom default gradient</Button>
    </MantineProvider>
  );
}
`;

const theme = createTheme({
  defaultGradient: {
    from: 'orange',
    to: 'red',
    deg: 45,
  },
});

function Demo() {
  return (
    <MantineThemeProvider theme={theme}>
      <Button variant="gradient">Button with custom default gradient</Button>
    </MantineThemeProvider>
  );
}

export const defaultGradient: MantineDemo = {
  type: 'code',
  component: Demo,
  centered: true,
  code,
};
