import { Button, UIThemeProvider } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { UIProvider, Button } from '@react-ui/ui';

function Demo() {
  return (
    <UIProvider theme={{ activeClassName: '' }}>
      <Button>无激活样式</Button>
    </UIProvider>
  );
}
`;

function Demo() {
  return (
    <UIThemeProvider theme={{ activeClassName: '' }}>
      <Button>无激活样式</Button>
    </UIThemeProvider>
  );
}

export const activeClassNameEmpty: UIDemo = {
  type: 'code',
  component: Demo,
  centered: true,
  code,
};
