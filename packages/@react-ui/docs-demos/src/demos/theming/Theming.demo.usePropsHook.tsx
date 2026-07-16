import { createTheme, UIThemeProvider, useProps } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { useProps, UIThemeProvider, createTheme } from '@react-ui/ui';

interface CustomComponentProps {
  color?: string;
  children?: React.ReactNode;
}

const defaultProps = {
  color: 'red',
} satisfies Partial<CustomComponentProps>;

function CustomComponent(props: CustomComponentProps) {
  const { color, children } = useProps('CustomComponent', defaultProps, props);
  return <div style={{ color }}>{children}</div>;
}

const theme = createTheme({
  components: {
    CustomComponent: {
      defaultProps: {
        color: 'green',
      },
    },
  },
});

function Demo() {
  return (
    <div>
      <CustomComponent>默认颜色</CustomComponent>

      <UIThemeProvider theme={theme}>
        <CustomComponent>提供器颜色</CustomComponent>
        <CustomComponent color="blue">属性颜色</CustomComponent>
      </UIThemeProvider>
    </div>
  );
}
`;

interface CustomComponentProps {
  color?: string;
  children?: React.ReactNode;
}

const defaultProps = {
  color: 'red',
} satisfies Partial<CustomComponentProps>;

function CustomComponent(props: CustomComponentProps) {
  const { color, children } = useProps('CustomComponent', defaultProps, props);
  return <div style={{ color }}>{children}</div>;
}

const theme = createTheme({
  components: {
    CustomComponent: {
      defaultProps: {
        color: 'green',
      },
    },
  },
});

function Demo() {
  return (
    <div>
      <CustomComponent>默认颜色</CustomComponent>

      <UIThemeProvider theme={theme}>
        <CustomComponent>提供器颜色</CustomComponent>
        <CustomComponent color="blue">属性颜色</CustomComponent>
      </UIThemeProvider>
    </div>
  );
}

export const usePropsHook: UIDemo = {
  type: 'code',
  component: Demo,
  code,
};
