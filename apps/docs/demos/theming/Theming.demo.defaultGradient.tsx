import { Button, createTheme, UIThemeProvider } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { UIProvider, createTheme, Button } from '@react-ui/ui';

const theme = createTheme({
  defaultGradient: {
    from: 'orange',
    to: 'red',
    deg: 45,
  },
});

function Demo() {
  return (
    <UIProvider theme={theme}>
      <Button variant="gradient">自定义默认渐变按钮</Button>
    </UIProvider>
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
    <UIThemeProvider theme={theme}>
      <Button variant="gradient">自定义默认渐变按钮</Button>
    </UIThemeProvider>
  );
}

export const defaultGradient: UIDemo = {
  type: 'code',
  component: Demo,
  centered: true,
  code,
};
