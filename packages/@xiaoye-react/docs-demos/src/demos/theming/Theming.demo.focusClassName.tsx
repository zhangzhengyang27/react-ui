import { Button, UIThemeProvider } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';
import classes from './Theming.demo.focusClassName.module.css';

const tsxCode = `
import { UIProvider, Button } from '@xiaoye-react/ui';
import classes from './focus.module.css';

function Demo() {
  return (
    <UIProvider theme={{ focusClassName: classes.focus }}>
      <Button>点击按钮查看自定义聚焦环</Button>
    </UIProvider>
  );
}
`;

const cssCode = `
/* Use \`&:focus\` when you want focus ring to be visible when control is clicked */
.focus {
  &:focus {
    outline: 2px solid var(--ui-color-red-filled);
    outline-offset: 3px;
  }
}

/* Use \`&:focus-visible\` when you want focus ring to be visible
   only when user navigates with keyboard, for example by pressing Tab key */
.focus-auto {
  &:focus-visible {
    outline: 2px solid var(--ui-color-red-filled);
    outline-offset: 2px;
  }
}
`;

function Demo() {
  return (
    <UIThemeProvider inherit theme={{ focusClassName: classes.focus }}>
      <Button>点击按钮查看自定义聚焦环</Button>
    </UIThemeProvider>
  );
}

export const focusClassName: UIDemo = {
  type: 'code',
  component: Demo,
  centered: true,
  code: [
    { fileName: '演示代码.tsx', language: 'tsx', code: tsxCode },
    { fileName: '焦点样式.module.css', language: 'scss', code: cssCode },
  ],
};
