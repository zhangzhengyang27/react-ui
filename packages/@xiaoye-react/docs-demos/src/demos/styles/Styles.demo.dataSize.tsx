import { createTheme, Input, UIThemeProvider } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';
import classes from './Styles.demo.dataSize.module.css';

const code = `
import { Input, createTheme, UIProvider } from '@xiaoye-react/ui';
import classes from './Demo.module.css';

const theme = createTheme({
  components: {
    Input: Input.extend({ classNames: classes }),
  },
});

function Demo() {
  return (
    <UIProvider theme={theme}>
      <Input placeholder="XXL 尺寸" size="xxl" />
      <Input placeholder="XXS 尺寸" size="xxs" mt="md" />
    </UIProvider>
  );
}
`;

const cssCode = `
.wrapper {
  &[data-size='xxl'] {
    & .input {
      padding-left: 28px;
      padding-right: 28px;
      height: 68px;
      font-size: 28px;
    }
  }

  &[data-size='xxs'] {
    & .input {
      padding-left: 10px;
      padding-right: 10px;
      height: 28px;
      font-size: 10px;
    }
  }
}
`;

const theme = createTheme({
  components: {
    Input: Input.extend({ classNames: classes }),
  },
});

function Demo() {
  return (
    <UIThemeProvider theme={theme}>
      <Input placeholder="XXL 尺寸" size="xxl" />
      <Input placeholder="XXS 尺寸" size="xxs" mt="md" />
    </UIThemeProvider>
  );
}

export const dataSize: UIDemo = {
  type: 'code',
  component: Demo,
  maxWidth: 360,
  centered: true,
  code: [
    { language: 'tsx', code, fileName: '演示代码.tsx' },
    { language: 'scss', code: cssCode, fileName: '演示样式.module.css' },
  ],
};
