import { Checkbox, createTheme, UIThemeProvider } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { UIProvider, createTheme, Checkbox } from '@react-ui/ui';

const theme = createTheme({
  cursorType: 'pointer',
});

function Demo() {
  return (
    <>
      <Checkbox label="默认光标" />

      <UIProvider theme={theme}>
        <Checkbox label="指针光标" mt="md" />
      </UIProvider>
    </>
  );
}
`;

const theme = createTheme({
  cursorType: 'pointer',
});

function Demo() {
  return (
    <>
      <Checkbox label="默认光标" />

      <UIThemeProvider theme={theme}>
        <Checkbox
          label="指针光标"
          mt="md"
          styles={{ input: { cursor: 'pointer' }, label: { cursor: 'pointer' } }}
        />
      </UIThemeProvider>
    </>
  );
}

export const cursorType: UIDemo = {
  type: 'code',
  component: Demo,
  centered: true,
  code,
};
