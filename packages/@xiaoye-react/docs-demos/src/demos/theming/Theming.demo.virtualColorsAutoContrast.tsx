import { Button } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const demoCode = `
import { Button } from '@xiaoye-react/ui';

export function Demo() {
  return (
    <Button color="adaptive" autoContrast>
      Button
    </Button>
  );
}
`;

const appCode = `
import { Button, colorsTuple, createTheme, UIProvider, virtualColor } from '@xiaoye-react/ui';
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
    <UIProvider theme={theme}>
      <Demo />
    </UIProvider>
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

export const virtualColorsAutoContrast: UIDemo = {
  type: 'code',
  component: Demo,
  centered: true,
  code: [
    { fileName: '应用.tsx', code: appCode, language: 'tsx' },
    { fileName: '演示代码.tsx', code: demoCode, language: 'tsx' },
  ],
};
