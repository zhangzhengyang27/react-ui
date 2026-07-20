import { createTheme, UIThemeProvider, Title } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';
import classes from './Theming.demo.headingStyles.module.css';

const code = `
import { Title, UIProvider } from '@react-ui/ui';
import classes from './Demo.module.css';

const theme = createTheme({
  components: {
    Title: Title.extend({
      classNames: {
        root: classes.heading,
      },
    }),
  },
});

function Demo() {
  return (
    <UIThemeProvider theme={theme}>
      <Title order={1}>标题 1</Title>
      <Title order={2}>标题 2</Title>
      <Title order={3}>标题 3</Title>
      <Title order={4}>标题 4</Title>
      <Title order={5}>标题 5</Title>
      <Title order={6}>标题 6</Title>
    </UIThemeProvider>
  );
}
`;

const cssCode = `
.heading {
  &:is(h1) {
    font-family: Outfit, sans-serif;
    font-weight: 900;
  }

  &:is(h5, h6) {
    color: var(--ui-color-dimmed);
  }
}
`;

const theme = createTheme({
  components: {
    Title: Title.extend({
      classNames: {
        root: classes.heading,
      },
    }),
  },
});

function Demo() {
  return (
    <UIThemeProvider theme={theme}>
      <Title order={1}>标题 1</Title>
      <Title order={2}>标题 2</Title>
      <Title order={3}>标题 3</Title>
      <Title order={4}>标题 4</Title>
      <Title order={5}>标题 5</Title>
      <Title order={6}>标题 6</Title>
    </UIThemeProvider>
  );
}

export const headingsStyles: UIDemo = {
  type: 'code',
  component: Demo,
  code: [
    { fileName: '演示代码.tsx', language: 'tsx', code },
    { fileName: '演示样式.module.css', language: 'scss', code: cssCode },
  ],
};
