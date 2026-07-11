import { MantineColor, parseThemeColor, useMantineTheme } from '@react-ui/ui';

export interface LogoProps extends React.ComponentProps<'svg'> {
  color?: MantineColor;
  size?: number | string;
  inverted?: boolean;
}

export function useReactUILogoColors({ color, inverted }: LogoProps) {
  const theme = useMantineTheme();
  const parsedColor = parseThemeColor({ color: color || 'blue', theme });
  const mainColor = parsedColor.isThemeColor ? theme.colors[parsedColor.color][5] : color;

  return {
    background: inverted ? theme.white : mainColor,
    color: inverted ? mainColor : theme.white,
  };
}
