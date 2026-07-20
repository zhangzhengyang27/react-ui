import {
  Button,
  DEFAULT_THEME,
  UIThemeProvider,
  parseThemeColor,
  Stack,
  useUITheme,
} from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = (props: Record<string, any>) => `
import { Button, createTheme, UIProvider, Stack } from '@react-ui/ui';

const theme = createTheme({
  autoContrast: true,
  luminanceThreshold: ${props.luminanceThreshold},
});

function Wrapper(props: any) {
  const buttons = Array(10)
    .fill(0)
    .map((_, index) => (
      <Button
        key={index}
        color=${
          parseThemeColor({ theme: DEFAULT_THEME, color: props.color }).isThemeColor
            ? `{\`${props.color}.\${index}\`}`
            : `"${props.color}"`
        }
      >
        Button
      </Button>
    ));

  return (
    <UIProvider theme={theme}>
      <Stack>{buttons}</Stack>
    </UIProvider>
  );
}
`;

function Wrapper(props: any) {
  const theme = useUITheme();

  const buttons = Array(10)
    .fill(0)
    .map((_, index) => (
      <Button
        key={index}
        color={
          parseThemeColor({ theme, color: props.color }).isThemeColor
            ? `${props.color}.${index}`
            : props.color
        }
      >
        Button
      </Button>
    ));

  return (
    <UIThemeProvider
      inherit
      theme={{
        autoContrast: true,
        luminanceThreshold: props.luminanceThreshold,
      }}
    >
      <Stack>{buttons}</Stack>
    </UIThemeProvider>
  );
}

export const luminanceThreshold: UIDemo = {
  type: 'configurator',
  component: Wrapper,
  code,
  centered: true,
  controls: [
    { type: 'color', prop: 'color', initialValue: 'blue', libraryValue: null },
    {
      type: 'number',
      prop: 'luminanceThreshold',
      initialValue: 0.3,
      min: 0,
      max: 1,
      step: 0.01,
      libraryValue: '__',
    },
  ],
};
