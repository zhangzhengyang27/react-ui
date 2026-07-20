---
name: react-ui-theme-customization
description: Customize react-ui theme using UIProvider and theme tokens. Use when adjusting visual styles, colors, spacing, or other theme properties in a react-ui project.
---

# react-ui Theme Customization

Customize the visual appearance of react-ui components using the theme system.

## When to use

- Adjusting colors, spacing, radius, or typography across components
- Switching between light and dark color schemes
- Defining custom component variants or sizes
- Overriding default theme tokens

## How to customize

1. **Color schemes**: Use `UIProvider` with `defaultColorScheme="dark"` or `"light"`
2. **Theme object**: Pass a custom theme to `UIProvider` via the `theme` prop
3. **CSS variables**: All component styles use `--ui-*` CSS variables; override them globally or per-component
4. **Component-level theming**: Use `classNames`, `styles`, or `variant` props on individual components

## Key concepts

- The root element must have a `data-ui-color-scheme` attribute (set automatically by `UIProvider`)
- `global.css` defines default light theme variables in `:root`
- Theme tokens: colors, spacing, font sizes, radius, shadows, etc.
- Component CSS variables use the `--ui-*` prefix (not `--mantine-*`)

## Notes

- Theme changes propagate to all child components via React context
- Use `useMantineTheme()` hook to access the current theme in custom components
- For runtime theme switching, update `data-ui-color-scheme` on the root element
