import { Button, UIThemeProvider } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { UIProvider, Button } from '@xiaoye-react/ui';

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
