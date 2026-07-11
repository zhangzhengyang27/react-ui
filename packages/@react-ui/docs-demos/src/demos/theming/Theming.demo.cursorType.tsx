import { Checkbox, createTheme, MantineThemeProvider } from '@react-ui/ui';
import { MantineDemo } from '@react-ui/demo';

const code = `
import { MantineProvider, createTheme, Checkbox } from '@react-ui/ui';

const theme = createTheme({
  cursorType: 'pointer',
});

function Demo() {
  return (
    <>
      <Checkbox label="Default cursor" />

      <MantineProvider theme={theme}>
        <Checkbox label="Pointer cursor" mt="md" />
      </MantineProvider>
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
      <Checkbox label="Default cursor" />

      <MantineThemeProvider theme={theme}>
        <Checkbox
          label="Pointer cursor"
          mt="md"
          styles={{ input: { cursor: 'pointer' }, label: { cursor: 'pointer' } }}
        />
      </MantineThemeProvider>
    </>
  );
}

export const cursorType: MantineDemo = {
  type: 'code',
  component: Demo,
  centered: true,
  code,
};
