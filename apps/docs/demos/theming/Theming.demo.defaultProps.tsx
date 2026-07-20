import { Button, createTheme, Group, UIThemeProvider } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { UIProvider, Button, Group, createTheme } from '@react-ui/ui';

const theme = createTheme({
  components: {
    Button: Button.extend({
      defaultProps: {
        color: 'cyan',
        variant: 'outline',
      },
    }),
  },
});

function Demo() {
  return (
    <UIProvider theme={theme}>
      <Group>
        <Button>默认按钮</Button>
        <Button color="red" variant="filled">
          Button with props
        </Button>
      </Group>
    </UIProvider>
  );
}
`;

const theme = createTheme({
  components: {
    Button: Button.extend({
      defaultProps: {
        color: 'cyan',
        variant: 'outline',
      },
    }),
  },
});

function Demo() {
  return (
    <UIThemeProvider theme={theme}>
      <Group>
        <Button>默认按钮</Button>
        <Button color="red" variant="filled">
          Button with props
        </Button>
      </Group>
    </UIThemeProvider>
  );
}

export const defaultProps: UIDemo = {
  type: 'code',
  component: Demo,
  centered: true,
  code,
};
