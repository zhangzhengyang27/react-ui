import React from 'react';
import { Button, createTheme, Group, UIThemeProvider } from '@xiaoye-react/ui';

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

export default function Demo() {
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
