import { createTheme, Loader, UIThemeProvider } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';
import { CssLoader, cssLoaderModuleCssCode, cssLoaderTsxCode } from './_CssLoader';

const code = `
import { UIProvider, Loader } from '@react-ui/ui';
import { CssLoader } from './CssLoader';

const theme = createTheme({
  components: {
    Loader: Loader.extend({
      defaultProps: {
        loaders: { ...Loader.defaultLoaders, custom: CssLoader },
        type: 'custom',
      },
    }),
  },
});

function Demo() {
  return (
    <UIThemeProvider theme={theme}>
      <Loader />
    </UIThemeProvider>
  );
}
`;

const theme = createTheme({
  components: {
    Loader: Loader.extend({
      defaultProps: {
        loaders: { ...Loader.defaultLoaders, custom: CssLoader },
        type: 'custom',
      },
    }),
  },
});

function Demo() {
  return (
    <UIThemeProvider theme={theme}>
      <Loader />
    </UIThemeProvider>
  );
}

export const cssLoader: UIDemo = {
  type: 'code',
  component: Demo,
  centered: true,
  code: [
    { fileName: '演示代码.tsx', language: 'tsx', code },
    { fileName: 'Css加载器.tsx', language: 'tsx', code: cssLoaderTsxCode },
    { fileName: 'Css加载器样式.module.css', language: 'scss', code: cssLoaderModuleCssCode },
  ],
};
