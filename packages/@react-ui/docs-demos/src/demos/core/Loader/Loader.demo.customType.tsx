import { createTheme, Loader, UIThemeProvider } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';
import { RingLoader, ringLoaderCode } from './_RingLoader';

const code = `
import { UIProvider, Loader } from '@react-ui/ui';
import { RingLoader } from './RingLoader';

const theme = createTheme({
  components: {
    Loader: Loader.extend({
      defaultProps: {
        loaders: { ...Loader.defaultLoaders, ring: RingLoader },
        type: 'ring',
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
        loaders: { ...Loader.defaultLoaders, ring: RingLoader },
        type: 'ring',
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

export const customType: UIDemo = {
  type: 'code',
  component: Demo,
  centered: true,
  code: [
    { fileName: '演示代码.tsx', language: 'tsx', code },
    { fileName: '环形加载器.tsx', language: 'tsx', code: ringLoaderCode },
  ],
};
