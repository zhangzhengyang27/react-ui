import { Button, UIThemeProvider } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';
import classes from './Theming.demo.activeClassName.module.css';

const tsxCode = `
import { UIProvider, Button } from '@xiaoye-react/ui';
import classes from './active.module.css';

function Demo() {
  return (
    <UIProvider theme={{ activeClassName: classes.active }}>
      <Button>按下我查看激活样式</Button>
    </UIProvider>
  );
}
`;

const cssCode = `
.active {
  transition: transform 50ms ease-in-out;

  &:active {
    transform: scale(0.97);
  }
}
`;

function Demo() {
  return (
    <UIThemeProvider theme={{ activeClassName: classes.active }}>
      <Button>按下我查看激活样式</Button>
    </UIThemeProvider>
  );
}

export const activeClassName: UIDemo = {
  type: 'code',
  component: Demo,
  centered: true,
  code: [
    { fileName: '演示代码.tsx', language: 'tsx', code: tsxCode },
    { fileName: '激活样式.module.css', language: 'scss', code: cssCode },
  ],
};
