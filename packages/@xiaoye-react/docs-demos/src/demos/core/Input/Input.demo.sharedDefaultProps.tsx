import {
  createTheme,
  Input,
  UIThemeProvider,
  NativeSelect,
  NumberInput,
  TextInput,
} from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { TextInput, NumberInput, NativeSelect, UIProvider, createTheme, Input } from '@xiaoye-react/ui';

const theme = createTheme({
  components: {
    Input: Input.extend({
      defaultProps: {
        size: 'md',
        radius: 'md',
      },
    }),

    InputWrapper: Input.Wrapper.extend({
      defaultProps: {
        withAsterisk: true,
      },
    }),

    NumberInput: NumberInput.extend({
      defaultProps: {
        size: 'lg',
      },
    }),
  },
});

function Demo() {
  return (
    <UIProvider theme={theme}>
      <TextInput label="文本输入" placeholder="继承 Input 的大小和圆角" />

      <NativeSelect
        mt="md"
        label="原生选择"
        data={['React', 'Angular', 'Vue', 'Svelte']}
      />

      <NumberInput mt="md" label="数字输入" placeholder="用 lg 覆盖共享大小" />
    </UIProvider>
  );
}
`;

const theme = createTheme({
  components: {
    Input: Input.extend({
      defaultProps: {
        size: 'md',
        radius: 'md',
      },
    }),

    InputWrapper: Input.Wrapper.extend({
      defaultProps: {
        withAsterisk: true,
      },
    }),

    NumberInput: NumberInput.extend({
      defaultProps: {
        size: 'lg',
      },
    }),
  },
});

function Demo() {
  return (
    <UIThemeProvider theme={theme}>
      <TextInput label="文本输入" placeholder="继承 Input 的大小和圆角" />

      <NativeSelect mt="md" label="原生选择" data={['React', 'Angular', 'Vue', 'Svelte']} />

      <NumberInput mt="md" label="数字输入" placeholder="用 lg 覆盖共享大小" />
    </UIThemeProvider>
  );
}

export const sharedDefaultProps: UIDemo = {
  type: 'code',
  component: Demo,
  centered: true,
  maxWidth: 340,
  code,
};
