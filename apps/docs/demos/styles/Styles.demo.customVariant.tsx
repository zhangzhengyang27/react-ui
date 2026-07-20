import { Input } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';
import classes from './Styles.demo.customVariant.module.css';

const code = `
import { Input, UIProvider, createTheme } from '@react-ui/ui';
import classes from './Demo.module.css';

// It is better to add new variants in theme.components
// This way you will be able to use them in anywhere in the app
const theme = createTheme({
  components: {
    Input: Input.extend({ classNames: classes }),
  }
});

function Demo() {
  return (
    <UIProvider theme={theme}>
      <Input variant="underline" placeholder="下划线输入" />
      <Input variant="filled" placeholder="填充输入" mt="md" />
    </UIProvider>
  );
}
`;

const cssCode = `
.input {
  &[data-variant='underline'] {
    border-bottom: 2px solid;
    border-radius: 0;
    padding-left: 0;
    padding-right: 0;

    [data-ui-color-scheme='light'] & {
      border-color: var(--ui-color-gray-3);
    }

    [data-ui-color-scheme='dark'] & {
      border-color: var(--ui-color-dark-3);
    }

    &:focus {
      border-color: var(--ui-color-blue-filled);
    }
  }
}
`;

function Demo() {
  return (
    <>
      <Input classNames={classes} variant="underline" placeholder="下划线输入" />
      <Input classNames={classes} variant="filled" placeholder="填充输入" mt="md" />
    </>
  );
}

export const customVariant: UIDemo = {
  type: 'code',
  component: Demo,
  maxWidth: 360,
  centered: true,
  code: [
    { fileName: '演示代码.tsx', code, language: 'tsx' },
    { fileName: '演示样式.module.css', code: cssCode, language: 'scss' },
  ],
};
