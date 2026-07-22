import { Box } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { Box } from '@xiaoye-react/ui';

export function Demo() {
  return (
    <Box bg="primary" c="white" p="md" fw={700}>
      This box has virtual background color,
      it is pink in dark mode and cyan in light mode
    </Box>
  );
}
`;

const appCode = `
import { createTheme, UIProvider, virtualColor } from '@xiaoye-react/ui';
import { Demo } from './Demo';

const theme = createTheme({
  colors: {
    primary: virtualColor({
      name: 'primary',
      dark: 'pink',
      light: 'cyan',
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
    <Box bg="virtual" c="white" p="md" fw={700}>
      This box has virtual background color, it is pink in dark mode and cyan in light mode
    </Box>
  );
}

export const virtualColors: UIDemo = {
  type: 'code',
  component: Demo,
  code: [
    { fileName: '应用.tsx', code: appCode, language: 'tsx' },
    { fileName: '演示代码.tsx', code, language: 'tsx' },
  ],
};
