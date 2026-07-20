import { Checkbox, createTheme, UIThemeProvider } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';
import classes from './Checkbox.demo.customSize.module.css';

const cssCode = `.root {
  --checkbox-size-xxl: 42px;
  --checkbox-size-xxs: 14px;

  &[data-size='xxl'] {
    .label {
      font-size: 22px;
      line-height: 40px;
    }
  }

  &[data-size='xxs'] {
    .label {
      font-size: 10px;
      line-height: 14px;
    }
  }
}
`;

const code = `
import { UIProvider, Checkbox, createTheme } from '@react-ui/ui';
import classes from './Demo.module.css';

const theme = createTheme({
  components: {
    Checkbox: Checkbox.extend({ classNames: classes }),
  },
});

function Demo() {
  return (
    <UIProvider theme={theme}>
      <Checkbox size="xxs" label="超小复选框" />
      <Checkbox size="xxl" label="超大复选框" mt="md" />
    </UIProvider>
  );
}
`;

const theme = createTheme({
  components: {
    Checkbox: Checkbox.extend({ classNames: classes }),
  },
});

function Demo() {
  return (
    <UIThemeProvider theme={theme}>
      <Checkbox size="xxs" label="超小复选框" />
      <Checkbox size="xxl" label="超大复选框" mt="md" />
    </UIThemeProvider>
  );
}

export const customSize: UIDemo = {
  type: 'code',
  centered: true,
  component: Demo,
  code: [
    { fileName: '演示代码.tsx', code, language: 'tsx' },
    { fileName: '演示样式.module.css', code: cssCode, language: 'scss' },
  ],
};
