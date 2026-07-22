---
name: react-ui-component-lookup
description: Look up react-ui React component documentation, props, and usage examples. Use when working with react-ui components and needing API details, default values, or usage patterns.
---

# react-ui Component Lookup

Look up component documentation for react-ui, a React UI library with 90+ components based on Mantine-style API design.

## When to use

- Need to know the props, default values, or type signatures of a react-ui component
- Looking for usage examples or code samples
- Understanding the difference between component variants (e.g., `variant`, `color`, `size`, `radius`)

## How to look up

1. Visit `https://react-ui.dev/components/{component-name}` (e.g., `/components/button`)
2. Each component page includes:
   - **何时使用** (When to use)
   - **代码演示** (Code examples)
   - **API** table with props, types, and defaults
   - **FAQ**

## Conventions

- react-ui uses Mantine-style explicit props: `variant` / `color` / `size` / `radius`
- All components require wrapping with `UIProvider`
- Components inherit all native HTML attributes via `ElementProps`
- CSS variables use the `--ui-*` prefix

## Notes

- For TypeScript types, refer to the component's type definitions in the `@xiaoye-react/ui` package
- Component examples show only the rendered effect by default; code is revealed by clicking the icon
