import { FingerprintIcon } from '@phosphor-icons/react/dist/csr/Fingerprint'
import { ImageIcon } from '@phosphor-icons/react/dist/csr/Image'
import { WarningIcon } from '@phosphor-icons/react/dist/csr/Warning'
import {
    darken,
    defaultVariantColorsResolver,
    Group,
    UIThemeProvider,
    parseThemeColor,
    rgba,
    ThemeIcon,
    VariantColorsResolver
} from '@xiaoye-react/ui'
import { UIDemo } from '@xiaoye-react/demo'

const code = `
import { ImageIcon } from '@phosphor-icons/react/dist/csr/Image';
import { FingerprintIcon } from '@phosphor-icons/react/dist/csr/Fingerprint';
import { WarningIcon } from '@phosphor-icons/react/dist/csr/Warning';
import {
  ThemeIcon,
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
        <ThemeIcon color="lime.4" variant="filled">
          <ImageIcon size={20} />
        </ThemeIcon>

        <ThemeIcon color="orange" variant="light">
          <FingerprintIcon size={20} />
        </ThemeIcon>

        <ThemeIcon variant="danger">
          <WarningIcon size={20} />
        </ThemeIcon>
      </Group>
    </UIProvider>
  );
}
`

const variantColorResolver: VariantColorsResolver = input => {
    const defaultResolvedColors = defaultVariantColorsResolver(input)
    const parsedColor = parseThemeColor({
        color: input.color || input.theme.primaryColor,
        theme: input.theme
    })

    // Override some properties for variant
    if (parsedColor.isThemeColor && parsedColor.color === 'lime' && input.variant === 'filled') {
        return {
            ...defaultResolvedColors,
            color: 'var(--ui-color-black)',
            hoverColor: 'var(--ui-color-black)'
        }
    }

    // Completely override variant
    if (input.variant === 'light') {
        return {
            background: rgba(parsedColor.value, 0.1),
            hover: rgba(parsedColor.value, 0.15),
            border: `1px solid ${parsedColor.value}`,
            color: darken(parsedColor.value, 0.1)
        }
    }

    // Add new variants support
    if (input.variant === 'danger') {
        return {
            background: 'var(--ui-color-red-9)',
            hover: 'var(--ui-color-red-8)',
            color: 'var(--ui-color-white)',
            border: 'none'
        }
    }

    return defaultResolvedColors
}

function Demo() {
    return (
        <UIThemeProvider theme={{ variantColorResolver }}>
            <Group>
                <ThemeIcon color="lime.4" variant="filled" size="lg">
                    <ImageIcon size={20} />
                </ThemeIcon>

                <ThemeIcon color="orange" variant="light" size="lg">
                    <FingerprintIcon size={20} />
                </ThemeIcon>

                <ThemeIcon variant="danger" size="lg">
                    <WarningIcon size={20} />
                </ThemeIcon>
            </Group>
        </UIThemeProvider>
    )
}

export const variantColorsResolver: UIDemo = {
    type: 'code',
    component: Demo,
    centered: true,
    defaultExpanded: false,
    code
}
