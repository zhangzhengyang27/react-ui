import { Button } from '@react-ui/ui';
import { MantineDemo } from '@react-ui/demo';

const demoCode = `
import { Button } from '@react-ui/ui';

export function Demo() {
  return (
    <Button color="adaptive" autoContrast>
      Button
    </Button>
  );
}
`;

const appCode = `
import { Button, colorsTuple, createTheme, MantineProvider, virtualColor } from '@react-ui/ui';
import { Demo } from './Demo';

const theme = createTheme({
  colors: {
    white: colorsTuple('#FFFFFF'),
    black: colorsTuple('#000000'),
    adaptive: virtualColor({
      name: 'adaptive',
      dark: 'white',
      light: 'black',
    }),
  },
});

function App() {
  return (
    <MantineProvider theme={theme}>
      <Demo />
    </MantineProvider>
  );
}
`;

function Demo() {
  return (
    <Button color="adaptive" autoContrast>
      Button
    </Button>
  );
}

export const virtualColorsAutoContrast: MantineDemo = {
  type: 'code',
  component: Demo,
  centered: true,
  code: [
    { fileName: 'App.tsx', code: appCode, language: 'tsx' },
    { fileName: 'Demo.tsx', code: demoCode, language: 'tsx' },
  ],
};
