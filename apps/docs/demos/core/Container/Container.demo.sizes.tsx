import { Container, createTheme, UIThemeProvider, rem } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { Container, UIProvider, createTheme, rem } from '@react-ui/ui';

const CONTAINER_SIZES: Record<string, number> = {
  xxs: 300,
  xs: 400,
  sm: 500,
  md: 600,
  lg: 700,
  xl: 800,
  xxl: 900,
};

const theme = createTheme({
  components: {
    Container: Container.extend({
      vars: (_, { size, fluid }) => ({
        root: {
          '--container-size': fluid
            ? '100%'
            : size !== undefined && size in CONTAINER_SIZES
              ? rem(CONTAINER_SIZES[size])
              : rem(size),
        },
      }),
    }),
  },
});

function Demo() {
  return (
    <UIProvider theme={theme}>
      <Container size="xxs" bg="var(--ui-color-blue-light)">
        Container with custom size
      </Container>
    </UIProvider>
  );
}

`;

const CONTAINER_SIZES: Record<string, number> = {
  xxs: 300,
  xs: 400,
  sm: 500,
  md: 600,
  lg: 700,
  xl: 800,
  xxl: 900,
};

const theme = createTheme({
  components: {
    Container: Container.extend({
      vars: (_, { size, fluid }) => ({
        root: {
          '--container-size': fluid
            ? '100%'
            : size !== undefined && size in CONTAINER_SIZES
              ? rem(CONTAINER_SIZES[size])
              : rem(size),
        },
      }),
    }),
  },
});

function Demo() {
  return (
    <UIThemeProvider theme={theme}>
      <Container size="xxs" bg="var(--ui-color-blue-light)">
        Container with custom size
      </Container>
    </UIThemeProvider>
  );
}

export const sizes: UIDemo = {
  type: 'code',
  component: Demo,
  code,
};
