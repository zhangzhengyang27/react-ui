import { createTheme, Input, UIThemeProvider, NativeSelect, TextInput } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';
import classes from './Input.demo.sharedStyles.module.css';

const code = `
import { TextInput, NativeSelect, UIProvider, createTheme, Input } from '@xiaoye-react/ui';
import classes from './Demo.module.css';

const theme = createTheme({
  components: {
    Input: Input.extend({
      classNames: {
        input: classes.input,
      },
    }),

    InputWrapper: Input.Wrapper.extend({
      classNames: {
        label: classes.label,
      },
    }),
  },
});

function Demo() {
  return (
    <UIProvider theme={theme}>
      <TextInput label="文本输入" placeholder="文本输入" />

      <NativeSelect
        mt="md"
        label="原生选择"
        data={['React', 'Angular', 'Vue', 'Svelte']}
      />
    </UIProvider>
  );
}
`;

const cssCode = `
.label {
  background-color: var(--ui-color-blue-light);
}

.input {
  border: 1px solid var(--ui-color-violet-filled);
}
`;

const theme = createTheme({
  components: {
    Input: Input.extend({
      classNames: {
        input: classes.input,
      },
    }),

    InputWrapper: Input.Wrapper.extend({
      classNames: {
        label: classes.label,
      },
    }),
  },
});

function Demo() {
  return (
    <UIThemeProvider theme={theme}>
      <TextInput label="文本输入" placeholder="文本输入" />
      <NativeSelect mt="md" label="原生选择" data={['React', 'Angular', 'Vue', 'Svelte']} />
    </UIThemeProvider>
  );
}

export const sharedStyles: UIDemo = {
  type: 'code',
  component: Demo,
  centered: true,
  maxWidth: 340,
  code: [
    { fileName: '演示代码.tsx', code, language: 'tsx' },
    { fileName: '演示样式.module.css', code: cssCode, language: 'scss' },
  ],
};
