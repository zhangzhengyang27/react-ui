import cx from 'clsx';
import { Container, createTheme, UIThemeProvider } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';
import classes from './Container.demo.responsive.module.css';

const code = `
import cx from 'clsx';
import { UIProvider, Container, createTheme } from '@react-ui/ui';
import classes from './Demo.module.css';

const theme = createTheme({
  components: {
    Container: Container.extend({
      classNames: (_, { size }) => ({
        root: cx({ [classes.responsiveContainer]: size === 'responsive' }),
      }),
    }),
  },
});

function Demo() {
  return (
    <UIProvider theme={theme}>
      <Container size="responsive" bg="var(--ui-color-blue-light)">
        Container with responsive size
      </Container>
    </UIProvider>
  );
}
`;

const cssCode = `
.responsiveContainer {
  max-width: 300px;

  @media (min-width: em(400px)) {
    max-width: 400px;
  }

  @media (min-width: em(600px)) {
    max-width: 600px;
  }
}
`;

const theme = createTheme({
  components: {
    Container: Container.extend({
      classNames: (_, { size }) => ({
        root: cx({ [classes.responsiveContainer]: size === 'responsive' }),
      }),
    }),
  },
});

function Demo() {
  return (
    <UIThemeProvider theme={theme}>
      <Container size="responsive" bg="var(--ui-color-blue-light)">
        Container with responsive size
      </Container>
    </UIThemeProvider>
  );
}

export const responsive: UIDemo = {
  type: 'code',
  component: Demo,
  code: [
    { fileName: '演示代码.tsx', code, language: 'tsx' },
    { fileName: '演示样式.module.css', code: cssCode, language: 'scss' },
  ],
};
