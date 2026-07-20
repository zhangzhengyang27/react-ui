import { Button, createTheme, Group, UIThemeProvider } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';
import classes from './Button.demo.customVariant.module.css';

const code = `
import { Group, Button, UIProvider, createTheme } from '@react-ui/ui';
import classes from './Demo.module.css';

const theme = createTheme({
  components: {
    Button: Button.extend({
      classNames: classes,
    }),
  },
});

function Demo() {
  return (
    <UIProvider theme={theme}>
      <Group>
        <Button variant="danger">危险变体</Button>
        <Button variant="primary">主要变体</Button>
      </Group>
    </UIProvider>
  );
}
`;

const cssCode = `
.root {
  &[data-variant='danger'] {
    background-color: var(--ui-color-red-9);
    color: var(--ui-color-red-0);
  }

  &[data-variant='primary'] {
    background: linear-gradient(45deg, #4b6cb7 10%, #253b67 90%);
    color: var(--ui-color-white);
    border-width: 0;
  }
}
`;

const theme = createTheme({
  components: {
    Button: Button.extend({
      classNames: classes,
    }),
  },
});

function Demo() {
  return (
    <UIThemeProvider theme={theme}>
      <Group>
        <Button variant="danger">危险变体</Button>
        <Button variant="primary">主要变体</Button>
      </Group>
    </UIThemeProvider>
  );
}

export const customVariant: UIDemo = {
  type: 'code',
  component: Demo,
  title: '自定义变体',
  description: '通过 createTheme 和 CSS 为 Button 定义新变体。',
  centered: true,
  code: [
    { fileName: '演示代码.tsx', code, language: 'tsx' },
    { fileName: '演示样式.module.css', code: cssCode, language: 'scss' },
  ],
};
