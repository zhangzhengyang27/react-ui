import { createTheme, Input, UIThemeProvider, NativeSelect, TextInput } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { TextInput, NativeSelect, UIProvider, createTheme, Input } from '@react-ui/ui';

const theme = createTheme({
  components: {
    Input: Input.extend({
      defaultProps: {
        variant: 'filled',
      },
    }),

    InputWrapper: Input.Wrapper.extend({
      defaultProps: {
        inputWrapperOrder: ['label', 'input', 'description', 'error'],
      },
    }),
  },
});

function Demo() {
  return (
    <UIProvider theme={theme}>
      <TextInput
        label="文本输入"
        placeholder="文本输入"
        description="输入框下方的描述"
      />

      <NativeSelect
        mt="md"
        label="原生选择"
        data={['React', 'Angular', 'Vue', 'Svelte']}
        description="输入框下方的描述"
      />
    </UIProvider>
  );
}
`;

const theme = createTheme({
  components: {
    Input: Input.extend({
      defaultProps: {
        variant: 'filled',
      },
    }),

    InputWrapper: Input.Wrapper.extend({
      defaultProps: {
        inputWrapperOrder: ['label', 'input', 'description', 'error'],
      },
    }),
  },
});

function Demo() {
  return (
    <UIThemeProvider theme={theme}>
      <TextInput
        label="文本输入"
        placeholder="文本输入"
        description="输入框下方的描述"
      />

      <NativeSelect
        mt="md"
        label="原生选择"
        data={['React', 'Angular', 'Vue', 'Svelte']}
        description="输入框下方的描述"
      />
    </UIThemeProvider>
  );
}

export const defaultProps: UIDemo = {
  type: 'code',
  component: Demo,
  centered: true,
  maxWidth: 340,
  code,
};
