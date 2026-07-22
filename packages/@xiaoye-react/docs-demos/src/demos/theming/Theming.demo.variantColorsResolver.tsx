import {
  Button,
  darken,
  defaultVariantColorsResolver,
  Group,
  UIThemeProvider,
  parseThemeColor,
  rgba,
  VariantColorsResolver,
} from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import {
  Button,
  Group,
  UIProvider,
  defaultVariantColorsResolver,
  VariantColorsResolver,
  parseThemeColor,
  rgba,
  darken,
} from '@xiaoye-react/ui';

const variantColorResolver: VariantColorsResolver = (input) => {
  const defaultResolvedColors = defaultVariantColorsResolver(input);
  const parsedColor = parseThemeColor({
    color: input.color || input.theme.primaryColor,
    theme: input.theme,
  });

  // Override some properties for variant
  if (parsedColor.isThemeColor && parsedColor.color === 'lime' && input.variant === 'filled') {
    return {
      ...defaultResolvedColors,
      color: 'var(--ui-color-black)',
      hoverColor: 'var(--ui-color-black)',
    };
  }

  // Completely override variant
  if (input.variant === 'light') {
    return {
      background: rgba(parsedColor.value, 0.1),
      hover: rgba(parsedColor.value, 0.15),
      border: \`1px solid \${parsedColor.value}\`,
      color: darken(parsedColor.value, 0.1),
    };
  }

  // Add new variants support
  if (input.variant === 'danger') {
    return {
      background: 'var(--ui-color-red-9)',
      hover: 'var(--ui-color-red-8)',
      color: 'var(--ui-color-white)',
      border: 'none',
    };
  }

  return defaultResolvedColors;
};

function Demo() {
  return (
    <UIProvider theme={{ variantColorResolver }}>
      <Group>
        <Button color="lime.4" variant="filled">
          青柠填充按钮
        </Button>

        <Button color="orange" variant="light">
          橙色浅色按钮
        </Button>

        <Button variant="danger">危险按钮</Button>
      </Group>
    </UIProvider>
  );
}
`;

const variantColorResolver: VariantColorsResolver = (input) => {
  const defaultResolvedColors = defaultVariantColorsResolver(input);
  const parsedColor = parseThemeColor({
    color: input.color || input.theme.primaryColor,
    theme: input.theme,
  });

  // Override some properties for variant
  if (parsedColor.isThemeColor && parsedColor.color === 'lime' && input.variant === 'filled') {
    return {
      ...defaultResolvedColors,
      color: 'var(--ui-color-black)',
      hoverColor: 'var(--ui-color-black)',
    };
  }

  // Completely override variant
  if (input.variant === 'light') {
    return {
      background: rgba(parsedColor.value, 0.1),
      hover: rgba(parsedColor.value, 0.15),
      border: `1px solid ${parsedColor.value}`,
      color: darken(parsedColor.value, 0.1),
    };
  }

  // Add new variants support
  if (input.variant === 'danger') {
    return {
      background: 'var(--ui-color-red-9)',
      hover: 'var(--ui-color-red-8)',
      color: 'var(--ui-color-white)',
      border: 'none',
    };
  }

  return defaultResolvedColors;
};

function Demo() {
  return (
    <UIThemeProvider theme={{ variantColorResolver }}>
      <Group>
        <Button color="lime.4" variant="filled">
          青柠填充按钮
        </Button>

        <Button color="orange" variant="light">
          橙色浅色按钮
        </Button>

        <Button variant="danger">危险按钮</Button>
      </Group>
    </UIThemeProvider>
  );
}

export const variantColorsResolver: UIDemo = {
  type: 'code',
  component: Demo,
  centered: true,
  code,
};
