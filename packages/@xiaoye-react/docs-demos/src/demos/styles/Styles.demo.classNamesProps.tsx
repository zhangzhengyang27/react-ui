import cx from 'clsx';
import { createTheme, UIThemeProvider, TextInput } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';
import classes from './Styles.demo.classNamesProps.module.css';

const code = `
import cx from 'clsx';
import { UIProvider, createTheme, TextInput } from '@xiaoye-react/ui';
import classes from './Demo.module.css';

const theme = createTheme({
  components: {
    TextInput: TextInput.extend({
      classNames: (_theme, props) => ({
        label: cx({ [classes.labelRequired]: props.required }),
        input: cx({ [classes.inputError]: props.error }),
      }),
    }),
  },
});

function Demo() {
  return (
    <UIProvider theme={theme}>
      <TextInput required label="必填输入" placeholder="必填输入" />
      <TextInput error label="带错误的输入" placeholder="带错误的输入" mt="md" />
    </UIProvider>
  );
}
`;

const cssCode = `
.labelRequired {
  color: var(--ui-color-red-filled);
}

.inputError {
  background-color: var(--ui-color-red-light);
}
`;

const theme = createTheme({
  components: {
    TextInput: TextInput.extend({
      classNames: (_theme, props) => ({
        label: cx({ [classes.labelRequired]: props.required }),
        input: cx({ [classes.inputError]: props.error }),
      }),
    }),
  },
});

function Demo() {
  return (
    <UIThemeProvider theme={theme}>
      <TextInput required label="必填输入" placeholder="必填输入" />
      <TextInput error label="带错误的输入" placeholder="带错误的输入" mt="md" />
    </UIThemeProvider>
  );
}

export const classNamesProps: UIDemo = {
  type: 'code',
  component: Demo,
  code: [
    { fileName: '演示代码.tsx', code, language: 'tsx' },
    { fileName: '演示样式.module.css', code: cssCode, language: 'scss' },
  ],
};
